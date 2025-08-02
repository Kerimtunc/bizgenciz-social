# 🚀 YemekZen QR Menu Elite Edition - Deployment Rehberi

Bu rehber, projenizi Windows'tan Linux'a veya herhangi bir ortama taşımanız için hazırlanmıştır.

## 📋 Ön Gereksinimler

### Windows Geliştirme Ortamı
- Node.js 18+
- npm veya yarn
- Git
- Docker Desktop (opsiyonel)

### Linux Production Ortamı
- Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- Node.js 18+
- PostgreSQL 13+
- Nginx
- Docker & Docker Compose (önerilen)

## 🔧 Kurulum Adımları

### 1. Projeyi Kopyalama

```bash
# Windows'tan Linux'a
scp -r yemekzen-qr-menu/ user@server:/opt/
# veya
rsync -avz yemekzen-qr-menu/ user@server:/opt/yemekzen/

# Linux'ta
cd /opt
git clone <repository-url> yemekzen
cd yemekzen
```

### 2. Otomatik Kurulum (Linux)

```bash
# Kurulum scriptini çalıştır
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 3. Manuel Kurulum

```bash
# Bağımlılıkları yükle
npm ci --only=production

# Environment dosyasını oluştur
cp env.example .env
nano .env

# Prisma client oluştur
npx prisma generate

# Veritabanı migration'ları
npx prisma migrate deploy
```

## 🐳 Docker ile Deployment

### Docker Compose (Önerilen)

```bash
# Tüm servisleri başlat
docker-compose up -d

# Logları kontrol et
docker-compose logs -f

# Servisleri durdur
docker-compose down
```

### Manuel Docker

```bash
# Image build et
docker build -t yemekzen-qr-menu .

# Container çalıştır
docker run -d \
  --name yemekzen-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  yemekzen-qr-menu
```

## 🌐 Nginx Konfigürasyonu

### SSL Sertifikaları

```bash
# Let's Encrypt ile SSL
sudo certbot --nginx -d yourdomain.com

# Manuel SSL sertifikaları
sudo cp cert.pem /etc/nginx/ssl/
sudo cp key.pem /etc/nginx/ssl/
```

### Nginx Site Konfigürasyonu

```bash
# Site konfigürasyonu oluştur
sudo nano /etc/nginx/sites-available/yemekzen

# Site'ı aktifleştir
sudo ln -s /etc/nginx/sites-available/yemekzen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📊 Monitoring ve Logging

### Systemd Service

```bash
# Service dosyasını kopyala
sudo cp scripts/yemekzen.service /etc/systemd/system/

# Service'i aktifleştir
sudo systemctl daemon-reload
sudo systemctl enable yemekzen
sudo systemctl start yemekzen

# Durumu kontrol et
sudo systemctl status yemekzen
```

### Log Rotation

```bash
# Log rotation konfigürasyonu
sudo cp scripts/logrotate.conf /etc/logrotate.d/yemekzen
```

### Monitoring Script

```bash
# Cron job ekle (her 5 dakikada bir kontrol)
*/5 * * * * /opt/yemekzen/scripts/monitor.sh
```

## 🔄 Backup ve Restore

### Otomatik Backup

```bash
# Backup scriptini çalıştır
./scripts/backup.sh

# Cron job ekle (günlük backup)
0 2 * * * /opt/yemekzen/scripts/backup.sh
```

### Manuel Backup

```bash
# Veritabanı backup
pg_dump -h localhost -U yemekzen_user -d yemekzen_db > backup.sql

# Dosya backup
tar -czf yemekzen_files.tar.gz --exclude=node_modules --exclude=.next .
```

### Restore

```bash
# Veritabanı restore
psql -h localhost -U yemekzen_user -d yemekzen_db < backup.sql

# Dosya restore
tar -xzf yemekzen_files.tar.gz
npm ci --only=production
npx prisma generate
```

## 🔧 Environment Variables

### Gerekli Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/yemekzen_db"
DIRECT_URL="postgresql://username:password@localhost:5432/yemekzen_db"

# Next.js
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"

# Application
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"

# Supabase (opsiyonel)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

## 🚨 Güvenlik

### Firewall Konfigürasyonu

```bash
# UFW ile firewall
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### SSL/TLS Konfigürasyonu

```bash
# Modern SSL konfigürasyonu
sudo nano /etc/nginx/ssl/ssl.conf

# Güvenli cipher suite'ler
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
ssl_protocols TLSv1.2 TLSv1.3;
```

## 📈 Performance Optimization

### Nginx Caching

```nginx
# Static files caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Optimization

```sql
-- Index'ler oluştur
CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders(created_at);
CREATE INDEX CONCURRENTLY idx_products_category ON products(category_id);

-- Vacuum ve analyze
VACUUM ANALYZE;
```

## 🔍 Troubleshooting

### Yaygın Sorunlar

1. **Port 3000 kullanımda**
   ```bash
   sudo netstat -tlnp | grep :3000
   sudo kill -9 <PID>
   ```

2. **Database bağlantı hatası**
   ```bash
   # PostgreSQL servisini kontrol et
   sudo systemctl status postgresql
   
   # Bağlantıyı test et
   psql -h localhost -U yemekzen_user -d yemekzen_db
   ```

3. **Permission hatası**
   ```bash
   # Dosya izinlerini düzelt
   sudo chown -R yemekzen:yemekzen /opt/yemekzen
   sudo chmod -R 755 /opt/yemekzen
   ```

### Log Dosyaları

```bash
# Application logs
tail -f /opt/yemekzen/logs/app.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u yemekzen -f
```

## 📞 Destek

Sorunlarınız için:
- GitHub Issues: [Repository Issues](https://github.com/your-repo/issues)
- Email: support@yemekzen.com
- Dokümantasyon: [Wiki](https://github.com/your-repo/wiki)

---

**Not:** Bu rehber sürekli güncellenmektedir. En güncel versiyon için repository'yi kontrol edin. 