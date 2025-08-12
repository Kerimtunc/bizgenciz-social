## Kapsamlı Sistem Taraması (Özet)

### 1) Çekirdek Bileşenler
- Next.js 15 App Router, `output: 'standalone'` (Docker ve systemd için uygun)
- Supabase entegrasyonu (`utils/supabase/*`, `app/api/health/route.ts`)
- tRPC minimal kök router (`server/api/root.ts`) ve Next API entegrasyonu
- Prisma client yapılandırması (model içermiyor; yalnızca `datasource` ve `generator`)
- Redis entegrasyonu (`lib/redis.ts`, `lib/services/hybrid-service.ts` kullanıyor)
- Sentry yapılandırması (`sentry.*.config.js`)

### 2) CI/CD Durumu
- GitHub Actions `CI` workflow: type-check, lint, build ve test-skipping aktif
- Docker smoke testi eklendi: image build + opsiyonel health probe (env varsa)

### 3) Dağıtım (Debian/Ubuntu)
- systemd servisleri: `deploy/systemd/bizgenciz-web.service`, `bizgenciz-health.service`
- Rehber: `docs/DEPLOY_DEBIAN.md` (adım adım)
- Sağlık kontrolleri: `scripts/health-check.mjs`, loglar `logs/health/`

### 4) Güvenlik ve Ayarlar
- Env değişkenleri `.env.local`; repo dışı
- Supabase anahtarları: publishable/anon (client), service-role (server)
- Sentry DSN `NEXT_PUBLIC_SENTRY_DSN`
- Redis: `REDIS_HOST/PORT/PASSWORD` veya `REDIS_URL`

### 5) Eksikler / İyileştirmeler
- Dockerfile mevcut; `.dockerignore` eklenmeli (node_modules, .next, logs, .env vs)
- tRPC `appRouter` boş; gerçek endpoint’ler eklenmeli ve Zod validasyonları yazılmalı
- `lib/redis.ts` içinde session API’leri (ör. `setSession`) tamamlanmalı
- `next.config.js`’de `images.domains` Supabase domain’iyle güncellenmeli
- Nginx reverse proxy example (HTTPS/HTTP2, Brotli) eklenmeli
- Supabase MCP ile tablo listeleme ve RLS doğrulama dokümanı (`docs/guides/supabase_mcp.md`) genişletilmeli
- Production `.env.example` güncellenmeli (minimum gerekli env liste)

### 6) Sağlık Durumu
- `/api/health` Supabase’a service-role ile probe atıyor; 200/503 döner
- `scripts/health-check.mjs` Supabase, Redis ve API’yi kontrol eder

### 7) Taşınabilirlik
- Windows/PowerShell ve Debian/systemd belgeleri mevcut
- CI’da Docker smoke testi taşınabilirliği güçlendirir

### 8) Domain yokken çalıştırma (offline / local test) — adım adım
- Eğer domain kaydınız yoksa Nginx + TLS adımlarını atlayabilirsiniz; aşağıdakilerle doğrulama yapın:
  - **Local health check**: Proje kökünde `.env.local` oluşturun veya gerekli env'leri export edin, sonra:
    ```bash
    npm run health:check
    ```
    Bu `logs/health/health-YYYYMMDDHH.json` çıktısı üretir ve `0`/`1` exit kodu ile durum bildirir.

  - **Local Docker smoke**: Eğer Docker yüklüyse (CI'da olduğu gibi) lokal olarak da deneyebilirsiniz:
    ```bash
    docker build -t bizgenciz-local:dev .
    docker run --rm -p 8080:3000 -e NEXT_PUBLIC_SUPABASE_URL="<url>" -e NEXT_PUBLIC_SUPABASE_ANON_KEY="<key>" -e SUPABASE_SERVICE_ROLE_KEY="<key>" bizgenciz-local:dev
    # ardından http://localhost:8080/api/health kontrol et
    ```

  - **systemd test (sunucuda)**: `scripts/debian-setup.sh` ile kurulum yaptıktan sonra:
    ```bash
    sudo systemctl start bizgenciz-web
    sudo systemctl status bizgenciz-web
    sudo journalctl -u bizgenciz-web -n 200 --no-pager
    ```

  - **Nginx & certbot**: Domain yoksa `scripts/setup-nginx.sh` çalıştırmayın; certbot domain doğrulaması gerektirir ve hata verir.

### 9) Watch / Health loop doğrulaması
- Projede iki farklı "watch"/health mekanizması var:
  1. **`health:loop` npm script**: `package.json` içinde sürekli `scripts/health-check.mjs` spawn eden bir Node one-liner. Bu basit ve taşınabilir ama:
     - Dezavantaj: uzun süreli bir process manager (systemd) yerine kullanıcı başlatmalı; spawn edilen çocuk süreçler izlenmeyebilir.
     - Tavsiye: production için **systemd timer** kullanın (aşağıda eklendi).
  2. **`bizgenciz-health.service` + timer**: repository'ye bir `systemd` timer ekledim (`deploy/systemd/bizgenciz-health.timer`) — bu, `health-check.mjs`'i dakikada bir tetikler ve systemd altında güvenilir şekilde çalışır.

### 10) Eksikler / Düzeltmeler (özet, önceliklendirilmiş)
- `sd_notify` tabanlı gerçek `WatchdogSec` kullanımı henüz uygulama içinde yok — şu anda `WatchdogSec` yorum satırı halinde. Eğer gerçek uygulama seviyesinde heartbeat istiyorsanız uygulamaya `systemd-notify`/`sd_notify` eklenecek.
- `.env.local` örneği (`.env.local.example`) production minimal set halinde eksik — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `REDIS_URL`, `NEXT_PUBLIC_SENTRY_DSN`, `PORT` eklenmeli.
- CI’nın Docker smoke adımı GitHub Runner’da başarılı çalışacak; lokal makinede Docker yoksa bu adım yerel test için skip edilmelidir.
