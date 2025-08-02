#!/bin/bash

# YemekZen QR Menu Elite Edition - Setup Script
# Bu script Linux/Unix sistemlerde projeyi kurar

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "Bu script root olarak çalıştırılmamalıdır"
fi

# Check system requirements
log "Sistem gereksinimleri kontrol ediliyor..."

# Check Node.js
if ! command -v node &> /dev/null; then
    error "Node.js bulunamadı. Lütfen Node.js 18+ kurun."
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js 18+ gerekli. Mevcut sürüm: $(node -v)"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    error "npm bulunamadı."
fi

# Check Docker (optional)
if ! command -v docker &> /dev/null; then
    warn "Docker bulunamadı. Docker kurulumu önerilir."
fi

if ! command -v docker-compose &> /dev/null; then
    warn "Docker Compose bulunamadı. Docker Compose kurulumu önerilir."
fi

log "Sistem gereksinimleri karşılanıyor."

# Create necessary directories
log "Gerekli dizinler oluşturuluyor..."
mkdir -p uploads
mkdir -p logs
mkdir -p database/init
mkdir -p nginx/ssl
mkdir -p scripts

# Set proper permissions
chmod 755 uploads
chmod 755 logs
chmod 755 database
chmod 755 nginx

# Install dependencies
log "Bağımlılıklar yükleniyor..."
npm ci --only=production

# Generate Prisma client
log "Prisma client oluşturuluyor..."
npx prisma generate

# Create environment file if not exists
if [ ! -f .env ]; then
    log "Environment dosyası oluşturuluyor..."
    cp env.example .env
    warn "Lütfen .env dosyasını düzenleyerek gerekli değerleri girin."
fi

# Create SSL certificates for development (self-signed)
if [ ! -f nginx/ssl/cert.pem ] || [ ! -f nginx/ssl/key.pem ]; then
    log "SSL sertifikaları oluşturuluyor (geliştirme için)..."
    mkdir -p nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/key.pem \
        -out nginx/ssl/cert.pem \
        -subj "/C=TR/ST=Istanbul/L=Istanbul/O=YemekZen/OU=Development/CN=localhost"
fi

# Create database initialization script
log "Veritabanı başlatma scripti oluşturuluyor..."
cat > database/init/01-init.sql << 'EOF'
-- YemekZen QR Menu Database Initialization
-- Bu dosya PostgreSQL veritabanını başlatır

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'manager', 'staff');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create tables (basic structure)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'staff',
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(is_available);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, role, name) 
VALUES ('admin@yemekzen.com', crypt('admin123', gen_salt('bf')), 'admin', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (name, description, sort_order) VALUES
('Ana Yemekler', 'Lezzetli ana yemekler', 1),
('Çorbalar', 'Sıcak çorbalar', 2),
('Salatalar', 'Taze salatalar', 3),
('İçecekler', 'Soğuk ve sıcak içecekler', 4),
('Tatlılar', 'Özel tatlılar', 5)
ON CONFLICT DO NOTHING;

EOF

# Create systemd service file (optional)
log "Systemd service dosyası oluşturuluyor..."
cat > scripts/yemekzen.service << 'EOF'
[Unit]
Description=YemekZen QR Menu Elite Edition
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=yemekzen
Group=yemekzen
WorkingDirectory=/opt/yemekzen
Environment=NODE_ENV=production
Environment=DATABASE_URL=postgresql://yemekzen_user:yemekzen_password@localhost:5432/yemekzen_db
ExecStart=/usr/bin/npm start
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Create backup script
log "Yedekleme scripti oluşturuluyor..."
cat > scripts/backup.sh << 'EOF'
#!/bin/bash

# YemekZen Backup Script
BACKUP_DIR="/opt/backups/yemekzen"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="yemekzen_backup_$DATE"

mkdir -p "$BACKUP_DIR"

# Database backup
pg_dump -h localhost -U yemekzen_user -d yemekzen_db > "$BACKUP_DIR/${BACKUP_NAME}.sql"

# Application files backup
tar -czf "$BACKUP_DIR/${BACKUP_NAME}_files.tar.gz" \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=logs \
    --exclude=uploads \
    .

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "yemekzen_backup_*" -mtime +7 -delete

echo "Backup completed: $BACKUP_NAME"
EOF

chmod +x scripts/backup.sh

# Create monitoring script
log "İzleme scripti oluşturuluyor..."
cat > scripts/monitor.sh << 'EOF'
#!/bin/bash

# YemekZen Monitoring Script
LOG_FILE="/opt/yemekzen/logs/monitor.log"

# Check if application is running
if ! pgrep -f "node.*yemekzen" > /dev/null; then
    echo "$(date): Application is down, restarting..." >> "$LOG_FILE"
    cd /opt/yemekzen && npm start &
fi

# Check database connection
if ! pg_isready -h localhost -U yemekzen_user -d yemekzen_db > /dev/null; then
    echo "$(date): Database connection failed" >> "$LOG_FILE"
fi

# Check disk space
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    echo "$(date): Disk usage is high: ${DISK_USAGE}%" >> "$LOG_FILE"
fi
EOF

chmod +x scripts/monitor.sh

# Create deployment script
log "Deployment scripti oluşturuluyor..."
cat > scripts/deploy.sh << 'EOF'
#!/bin/bash

# YemekZen Deployment Script
set -e

echo "Deployment başlatılıyor..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --only=production

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Build application
npm run build

# Restart application
pm2 restart yemekzen || pm2 start npm --name "yemekzen" -- start

echo "Deployment tamamlandı!"
EOF

chmod +x scripts/deploy.sh

# Create health check script
log "Health check scripti oluşturuluyor..."
cat > scripts/health-check.sh << 'EOF'
#!/bin/bash

# YemekZen Health Check Script
HEALTH_URL="http://localhost:3000/api/health"
MAX_RETRIES=3
RETRY_DELAY=5

for i in $(seq 1 $MAX_RETRIES); do
    if curl -f -s "$HEALTH_URL" > /dev/null; then
        echo "OK"
        exit 0
    fi
    
    if [ $i -lt $MAX_RETRIES ]; then
        sleep $RETRY_DELAY
    fi
done

echo "FAIL"
exit 1
EOF

chmod +x scripts/health-check.sh

# Create environment-specific scripts
log "Ortam-specific scriptler oluşturuluyor..."

# Development script
cat > scripts/dev.sh << 'EOF'
#!/bin/bash
# Development environment script
export NODE_ENV=development
export DATABASE_URL="postgresql://yemekzen_user:yemekzen_password@localhost:5432/yemekzen_db_dev"
npm run dev
EOF

chmod +x scripts/dev.sh

# Production script
cat > scripts/prod.sh << 'EOF'
#!/bin/bash
# Production environment script
export NODE_ENV=production
export DATABASE_URL="postgresql://yemekzen_user:yemekzen_password@localhost:5432/yemekzen_db"
npm run build
npm start
EOF

chmod +x scripts/prod.sh

# Create Docker scripts
log "Docker scriptleri oluşturuluyor..."

cat > scripts/docker-start.sh << 'EOF'
#!/bin/bash
# Start with Docker Compose
docker-compose up -d
echo "Docker containers started. Check logs with: docker-compose logs -f"
EOF

chmod +x scripts/docker-start.sh

cat > scripts/docker-stop.sh << 'EOF'
#!/bin/bash
# Stop Docker Compose
docker-compose down
echo "Docker containers stopped."
EOF

chmod +x scripts/docker-stop.sh

cat > scripts/docker-restart.sh << 'EOF'
#!/bin/bash
# Restart Docker Compose
docker-compose down
docker-compose up -d
echo "Docker containers restarted."
EOF

chmod +x scripts/docker-restart.sh

# Create log rotation configuration
log "Log rotation konfigürasyonu oluşturuluyor..."
cat > scripts/logrotate.conf << 'EOF'
/opt/yemekzen/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 yemekzen yemekzen
    postrotate
        systemctl reload yemekzen
    endscript
}
EOF

# Final setup instructions
log "Kurulum tamamlandı!"
echo ""
echo -e "${BLUE}=== YemekZen QR Menu Elite Edition Kurulum Tamamlandı ===${NC}"
echo ""
echo -e "${YELLOW}Sonraki adımlar:${NC}"
echo "1. .env dosyasını düzenleyin: nano .env"
echo "2. Veritabanını başlatın: docker-compose up -d postgres"
echo "3. Migration'ları çalıştırın: npx prisma migrate dev"
echo "4. Uygulamayı başlatın: npm run dev"
echo ""
echo -e "${YELLOW}Kullanılabilir scriptler:${NC}"
echo "- scripts/dev.sh: Geliştirme ortamı"
echo "- scripts/prod.sh: Production ortamı"
echo "- scripts/docker-start.sh: Docker ile başlat"
echo "- scripts/backup.sh: Yedekleme"
echo "- scripts/monitor.sh: İzleme"
echo ""
echo -e "${YELLOW}Docker kullanımı:${NC}"
echo "- Başlat: ./scripts/docker-start.sh"
echo "- Durdur: ./scripts/docker-stop.sh"
echo "- Yeniden başlat: ./scripts/docker-restart.sh"
echo ""
echo -e "${GREEN}Kurulum başarıyla tamamlandı!${NC}" 