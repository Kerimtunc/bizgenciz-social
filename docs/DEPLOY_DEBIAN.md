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

Not: İleride Docker kullanmak isterseniz CI içinde Docker imajı üretilip basit sağlık kontrolü yapılır. Bu, taşınabilirliği artırır ve “benim bilgisayarımda çalışıyordu” riskini düşürür. Docker ile üretim dağıtımı yapmayacak olsanız bile Docker build’in yeşil olması, bağımlılıkların tekrarlanabilir şekilde kilitlendiğini gösterir.

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


## GitHub Actions Self-Hosted Runner (Debian)

Gerçek servise karşı Playwright duman testlerini çalıştırmak için Debian sunucunuza self-hosted runner kurabilirsiniz.

1) Kullanıcı ve dizin hazırlığı:
```bash
sudo adduser --system --group ci
sudo mkdir -p /opt/actions-runner && sudo chown ci:ci /opt/actions-runner
sudo -u ci bash -lc 'cd /opt/actions-runner && curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/latest/download/actions-runner-linux-x64-2.319.1.tar.gz && tar xzf actions-runner.tar.gz'
```

2) GitHub repo ayarlarından Self-hosted runner ekleyin ve verilen komutu çalıştırın (örnek):
```bash
sudo -u ci bash -lc '/opt/actions-runner/config.sh --unattended --url https://github.com/<OWNER>/<REPO> --token <TOKEN> --labels self-hosted,deb'
```

3) Servis olarak başlatın:
```bash
sudo -u ci bash -lc '/opt/actions-runner/svc.sh install && /opt/actions-runner/svc.sh start'
```

4) Repo Secrets’a `SELFHOST_BASE_URL` (ör: `https://bizgenciz.example.com`) ekleyin.

5) Actions sekmesinden `Self-Hosted Smoke (Debian)` workflow’unu çalıştırın (veya otomatik zamanlayıcıyı bekleyin).

Notlar:
- Runner, `playwright.config.ts` içindeki projelere göre Chromium/Firefox/WebKit üzerinde smoke testlerini çalıştırır.
- Servis erişilemiyorsa test fail olur; loglar Actions ekranından incelenebilir.



## Otomatik Kurulum Scripti

Debian/Ubuntu’da tek komutla kurulum için örnek bash script’i ekleyebilirsiniz:

`scripts/debian-setup.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

USER_NAME="bizgenciz"
APP_DIR="/opt/bizgenciz-social"
REPO_URL="https://github.com/Kerimtunc/bizgenciz-social.git"

sudo adduser --system --group "$USER_NAME" || true
sudo mkdir -p "$APP_DIR"
sudo chown -R "$USER_NAME":"$USER_NAME" "$APP_DIR"

sudo -u "$USER_NAME" -H bash -lc "\
  if [ ! -d '$APP_DIR/.git' ]; then git clone $REPO_URL $APP_DIR; fi && \
  cd $APP_DIR && git pull && \
  npm ci && npm run build"

sudo cp "$APP_DIR/deploy/systemd/bizgenciz-web.service" /etc/systemd/system/
sudo cp "$APP_DIR/deploy/systemd/bizgenciz-health.service" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now bizgenciz-web
sudo systemctl enable --now bizgenciz-health

echo "Kurulum tamamlandı. .env.local dosyanızı $APP_DIR içinde doldurmayı unutmayın."
```

