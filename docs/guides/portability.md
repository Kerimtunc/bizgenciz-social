## Taşınabilir Kurulum ve Sağlık Kontrolü (Windows / Debian)

Bu rehber, projeyi yeni bir cihaza (Windows veya Debian/Ubuntu) taşırken kesintisiz kurulumu, çevre değişkenlerini, servislerin doğrulanmasını ve düzenli sağlık kontrolünü açıklar.

### 1) Gerekli Yazılımlar
- Node.js 20+
- Git
- (Önerilir) GitHub CLI: `gh` (repo kontrolü ve CI izleme için)
- Redis (opsiyonel; bulut endpoint kullanıyorsanız gerekmez)

### 2) Ortam Değişkenleri
`.env.local` dosyanızı örnek alarak doldurun (Windows ve Debian ortak):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` veya `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `REDIS_URL` (veya `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`)
- `PORT=3000`

### 3) Kurulum Adımları (Ortak)
```bash
git clone https://github.com/Kerimtunc/bizgenciz-social.git
cd bizgenciz-social
npm install
cp .env.example .env.local # değerleri doldurun (Windows'ta manuel kopyalayın)
npm run dev
```

### 4) Sağlık Kontrolü (Cross-platform)
- Tek seferlik kontrol:
```bash
npm run health:check
```
- Sonuçlar `logs/health/health-YYYYMMDDHH.json` dosyasına yazılır; stdout olarak da JSON döner.
- Döngüsel kontrol (her 60 saniye):
```bash
npm run health:loop
```

### 5) Debian/Ubuntu Servisleştime (Opsiyonel)
Hazır unit dosyaları repo içinde:
- `deploy/systemd/bizgenciz-web.service` (Next.js standalone)
- `deploy/systemd/bizgenciz-health.service` (health-check loop)

Kurulum komutları (root):
```bash
sudo mkdir -p /opt/bizgenciz-social
sudo rsync -av --delete . /opt/bizgenciz-social/ # veya git pull
cd /opt/bizgenciz-social && npm ci && npm run build # Next.js standalone çıktısı
sudo cp deploy/systemd/bizgenciz-web.service /etc/systemd/system/
sudo cp deploy/systemd/bizgenciz-health.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now bizgenciz-web
sudo systemctl enable --now bizgenciz-health
sudo journalctl -u bizgenciz-health -f
```

### 6) Windows: Zamanlanmış Görev (Opsiyonel)
- `scripts/health-check.mjs` için Görev Zamanlayıcı’dan dakikalık tetik kurabilirsiniz.
- Alternatif: VS Code tasks ile manuel çalıştırma (repo içindeki `.vscode/tasks.json`).

### 7) mcp-server-git (IDE entegrasyonu)
- Windows: `scripts/setup-mcp-server-git-installer.ps1 -RepoPath "C:\\kod\\cekirdek" -RunNow`
- Debian/Ubuntu: `pipx install mcp-server-git` ve `uvx mcp-server-git -r /opt/bizgenciz-social --verbose`
- Loglar: `logs/mcp-server-git/` altında tutulur (repo gitignore’unda hariç).

### 8) Taşınabilirlik İlkeleri
- Mutlak path’leri dokümana sınırlayın; çalıştırmada `WorkingDirectory` ve env dosyaları ile yapılandırın.
- Sağlık kontrolü, dış bağımlılıklara (Supabase/Redis) uygulama başlamadan bağlanabiliyor mu kontrolünü yapar.
- CI/CD pipeline testleri “archived” olduğundan yeni cihazda test koşulması gerekmiyorsa engel çıkarmaz; yeni testler eklenecekse `tests/` dizinine geri alın.


