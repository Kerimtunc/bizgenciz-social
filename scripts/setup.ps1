# YemekZen QR Menu Elite Edition - Windows Setup Script
# Bu script Windows sistemlerde projeyi kurar

param(
    [switch]$SkipDocker,
    [switch]$SkipDatabase,
    [switch]$Force
)

# Error handling
$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Log($Message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-ColorOutput Green "[$timestamp] $Message"
}

function Write-Warning($Message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-ColorOutput Yellow "[$timestamp] WARNING: $Message"
}

function Write-Error($Message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-ColorOutput Red "[$timestamp] ERROR: $Message"
    exit 1
}

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Bu script yönetici olarak çalıştırılması önerilir."
}

# Check system requirements
Write-Log "Sistem gereksinimleri kontrol ediliyor..."

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Log "Node.js bulundu: $nodeVersion"
    
    $majorVersion = [int]($nodeVersion -replace 'v', '' -split '\.')[0]
    if ($majorVersion -lt 18) {
        Write-Error "Node.js 18+ gerekli. Mevcut sürüm: $nodeVersion"
    }
} catch {
    Write-Error "Node.js bulunamadı. Lütfen Node.js 18+ kurun."
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Log "npm bulundu: $npmVersion"
} catch {
    Write-Error "npm bulunamadı."
}

# Check Git
try {
    $gitVersion = git --version
    Write-Log "Git bulundu: $gitVersion"
} catch {
    Write-Warning "Git bulunamadı. Git kurulumu önerilir."
}

# Check Docker (optional)
if (-not $SkipDocker) {
    try {
        $dockerVersion = docker --version
        Write-Log "Docker bulundu: $dockerVersion"
    } catch {
        Write-Warning "Docker bulunamadı. Docker kurulumu önerilir."
    }
    
    try {
        $dockerComposeVersion = docker-compose --version
        Write-Log "Docker Compose bulundu: $dockerComposeVersion"
    } catch {
        Write-Warning "Docker Compose bulunamadı. Docker Compose kurulumu önerilir."
    }
}

Write-Log "Sistem gereksinimleri karşılanıyor."

# Create necessary directories
Write-Log "Gerekli dizinler oluşturuluyor..."
$directories = @(
    "uploads",
    "logs", 
    "database\init",
    "nginx\ssl",
    "scripts"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Log "Dizin oluşturuldu: $dir"
    }
}

# Install dependencies
Write-Log "Bağımlılıklar yükleniyor..."
try {
    npm ci --only=production
    Write-Log "Bağımlılıklar başarıyla yüklendi."
} catch {
    Write-Error "Bağımlılık yükleme başarısız: $_"
}

# Generate Prisma client
Write-Log "Prisma client oluşturuluyor..."
try {
    npx prisma generate
    Write-Log "Prisma client başarıyla oluşturuldu."
} catch {
    Write-Warning "Prisma client oluşturulamadı: $_"
}

# Create environment file if not exists
if (-not (Test-Path ".env")) {
    Write-Log "Environment dosyası oluşturuluyor..."
    Copy-Item "env.example" ".env"
    Write-Warning "Lütfen .env dosyasını düzenleyerek gerekli değerleri girin."
}

# Create SSL certificates for development (self-signed)
if (-not (Test-Path "nginx\ssl\cert.pem") -or -not (Test-Path "nginx\ssl\key.pem")) {
    Write-Log "SSL sertifikaları oluşturuluyor (geliştirme için)..."
    
    # Check if OpenSSL is available
    try {
        $opensslVersion = openssl version
        Write-Log "OpenSSL bulundu: $opensslVersion"
        
        # Create self-signed certificate
        $opensslArgs = @(
            "req", "-x509", "-nodes", "-days", "365", "-newkey", "rsa:2048",
            "-keyout", "nginx\ssl\key.pem",
            "-out", "nginx\ssl\cert.pem",
            "-subj", "/C=TR/ST=Istanbul/L=Istanbul/O=YemekZen/OU=Development/CN=localhost"
        )
        
        & openssl @opensslArgs
        Write-Log "SSL sertifikaları oluşturuldu."
    } catch {
        Write-Warning "OpenSSL bulunamadı. SSL sertifikaları oluşturulamadı."
    }
}

# Create database initialization script
Write-Log "Veritabanı başlatma scripti oluşturuluyor..."
$initSql = @"
-- YemekZen QR Menu Database Initialization
-- Bu dosya PostgreSQL veritabanını başlatır

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
DO `$` BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'manager', 'staff');
EXCEPTION
    WHEN duplicate_object THEN null;
END `$`;

DO `$` BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END `$`;

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
"@

$initSql | Out-File -FilePath "database\init\01-init.sql" -Encoding UTF8
Write-Log "Veritabanı başlatma scripti oluşturuldu."

# Create Windows batch scripts
Write-Log "Windows batch scriptleri oluşturuluyor..."

# Development script
$devScript = @"
@echo off
REM Development environment script
set NODE_ENV=development
set DATABASE_URL=postgresql://yemekzen_user:yemekzen_password@localhost:5432/yemekzen_db_dev
npm run dev
"@
$devScript | Out-File -FilePath "scripts\dev.bat" -Encoding ASCII

# Production script
$prodScript = @"
@echo off
REM Production environment script
set NODE_ENV=production
set DATABASE_URL=postgresql://yemekzen_user:yemekzen_password@localhost:5432/yemekzen_db
npm run build
npm start
"@
$prodScript | Out-File -FilePath "scripts\prod.bat" -Encoding ASCII

# Docker scripts
$dockerStartScript = @"
@echo off
REM Start with Docker Compose
docker-compose up -d
echo Docker containers started. Check logs with: docker-compose logs -f
"@
$dockerStartScript | Out-File -FilePath "scripts\docker-start.bat" -Encoding ASCII

$dockerStopScript = @"
@echo off
REM Stop Docker Compose
docker-compose down
echo Docker containers stopped.
"@
$dockerStopScript | Out-File -FilePath "scripts\docker-stop.bat" -Encoding ASCII

$dockerRestartScript = @"
@echo off
REM Restart Docker Compose
docker-compose down
docker-compose up -d
echo Docker containers restarted.
"@
$dockerRestartScript | Out-File -FilePath "scripts\docker-restart.bat" -Encoding ASCII

# Backup script
$backupScript = @"
@echo off
REM YemekZen Backup Script
set BACKUP_DIR=C:\backups\yemekzen
set DATE=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set DATE=%DATE: =0%
set BACKUP_NAME=yemekzen_backup_%DATE%

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Database backup (requires pg_dump in PATH)
pg_dump -h localhost -U yemekzen_user -d yemekzen_db > "%BACKUP_DIR%\%BACKUP_NAME%.sql"

REM Application files backup
powershell -Command "Compress-Archive -Path . -DestinationPath '%BACKUP_DIR%\%BACKUP_NAME%_files.zip' -Exclude node_modules,.next,logs,uploads"

echo Backup completed: %BACKUP_NAME%
"@
$backupScript | Out-File -FilePath "scripts\backup.bat" -Encoding ASCII

# Health check script
$healthScript = @"
@echo off
REM YemekZen Health Check Script
set HEALTH_URL=http://localhost:3000/api/health
set MAX_RETRIES=3
set RETRY_DELAY=5

for /L %%i in (1,1,%MAX_RETRIES%) do (
    curl -f -s "%HEALTH_URL%" >nul 2>&1
    if !errorlevel! equ 0 (
        echo OK
        exit /b 0
    )
    if %%i lss %MAX_RETRIES% (
        timeout /t %RETRY_DELAY% /nobreak >nul
    )
)

echo FAIL
exit /b 1
"@
$healthScript | Out-File -FilePath "scripts\health-check.bat" -Encoding ASCII

Write-Log "Windows batch scriptleri oluşturuldu."

# Create PowerShell scripts
Write-Log "PowerShell scriptleri oluşturuluyor..."

# Monitoring script
$monitorScript = @'
# YemekZen Monitoring Script
$LOG_FILE = "logs\monitor.log"

# Check if application is running
$processes = Get-Process -Name "node" -ErrorAction SilentlyContinue
$yemekzenProcess = $processes | Where-Object { $_.ProcessName -eq "node" -and $_.CommandLine -like "*yemekzen*" }

if (-not $yemekzenProcess) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp : Application is down, restarting..." | Add-Content $LOG_FILE
    Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory (Get-Location)
}

# Check disk space
$disk = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'"
$usagePercent = [math]::Round(($disk.Size - $disk.FreeSpace) / $disk.Size * 100, 2)

if ($usagePercent -gt 90) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp : Disk usage is high: ${usagePercent}%" | Add-Content $LOG_FILE
}
'@
$monitorScript | Out-File -FilePath "scripts\monitor.ps1" -Encoding UTF8

# Deployment script
$deployScript = @'
# YemekZen Deployment Script
Write-Log "Deployment başlatılıyor..."

try {
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
    
    Write-Log "Deployment tamamlandı!"
} catch {
    Write-Error "Deployment başarısız: $_"
}
'@
$deployScript | Out-File -FilePath "scripts\deploy.ps1" -Encoding UTF8

Write-Log "PowerShell scriptleri oluşturuldu."

# Final setup instructions
Write-Log "Kurulum tamamlandı!"
Write-Host ""
Write-ColorOutput Blue "=== YemekZen QR Menu Elite Edition Kurulum Tamamlandı ==="
Write-Host ""
Write-ColorOutput Yellow "Sonraki adımlar:"
Write-Host "1. .env dosyasını düzenleyin: notepad .env"
Write-Host "2. Veritabanını başlatın: scripts\docker-start.bat"
Write-Host "3. Migration'ları çalıştırın: npx prisma migrate dev"
Write-Host "4. Uygulamayı başlatın: npm run dev"
Write-Host ""
Write-ColorOutput Yellow "Kullanılabilir scriptler:"
Write-Host "- scripts\dev.bat: Geliştirme ortamı"
Write-Host "- scripts\prod.bat: Production ortamı"
Write-Host "- scripts\docker-start.bat: Docker ile başlat"
Write-Host "- scripts\backup.bat: Yedekleme"
Write-Host "- scripts\monitor.ps1: İzleme"
Write-Host ""
Write-ColorOutput Yellow "Docker kullanımı:"
Write-Host "- Başlat: scripts\docker-start.bat"
Write-Host "- Durdur: scripts\docker-stop.bat"
Write-Host "- Yeniden başlat: scripts\docker-restart.bat"
Write-Host ""
Write-ColorOutput Green "Kurulum başarıyla tamamlandı!" 