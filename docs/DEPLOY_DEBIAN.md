## Debian/Ubuntu Dağıtım Rehberi (Docker olmadan)

Bu belge, projeyi Debian/Ubuntu üzerinde Docker kullanmadan üretime almayı adım adım açıklar.

### Önkoşullar
- Node.js 20+ (ör. NodeSource veya nvm)
- Git
- (İsteğe bağlı) Redis (veya bulut Redis URL’i)

### 1) Kullanıcı ve dizin
```bash
sudo adduser --system --group bizgenciz
sudo mkdir -p /opt/bizgenciz-social
sudo chown -R bizgenciz:bizgenciz /opt/bizgenciz-social
```

### 2) Kod ve bağımlılıklar
```bash
sudo -u bizgenciz -H bash -lc '
  cd /opt/bizgenciz-social && \
  if [ ! -d .git ]; then git clone https://github.com/Kerimtunc/bizgenciz-social.git /opt/bizgenciz-social; fi && \
  git pull && \
  npm ci && \
  npm run build
'
```

### 3) Çevre değişkenleri
```bash
sudo -u bizgenciz -H bash -lc 'cp -n .env.example .env.local || true'
sudo nano /opt/bizgenciz-social/.env.local
```

### 4) systemd servisleri
```bash
sudo cp /opt/bizgenciz-social/deploy/systemd/bizgenciz-web.service /etc/systemd/system/
sudo cp /opt/bizgenciz-social/deploy/systemd/bizgenciz-health.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now bizgenciz-web
sudo systemctl enable --now bizgenciz-health
sudo systemctl status bizgenciz-web --no-pager
sudo journalctl -u bizgenciz-web -f
```

### 5) Güncelleme
```bash
sudo -u bizgenciz -H bash -lc 'cd /opt/bizgenciz-social && git pull && npm ci && npm run build'
sudo systemctl restart bizgenciz-web
```

### 6) Sorun Giderme
- `journalctl -u bizgenciz-web -f` loglarını kontrol edin.
- Sağlık kontrolü JSON raporları: `/opt/bizgenciz-social/logs/health/`.
- Supabase/Redis erişim hatalarında `.env.local` değerlerini doğrulayın.


