## Kalanlar / Mevcut Durum Özeti

Aşağıda repo için **bugün itibarıyla** tamamlanmış işler, açık noktalar, test sonuçları ve yapılması gerekenler kısa ve uygulanabilir biçimde listelenmiştir.

- **Ana amaç:** Projeyi `bizgenciz` Supabase veritabanına uyumlu, Docker ile CI'da smoke-test edilebilir, Debian üzerinde systemd + Nginx ile çalıştırılabilir hale getirmek.

1) Yapılan önemli değişiklikler (dosya adıyla)
 - `Dockerfile` — 3 aşamalı build (deps/builder/runner) eklendi
 - `.dockerignore` — imaj boyutunu küçültmek için eklendi
 - `.github/workflows/ci.yml` — Docker build + opsiyonel smoke run eklendi
 - `scripts/health-check.mjs` — Supabase/Redis/API sağlık kontrolleri, `SUPABASE_HEALTH_TABLE` override desteği
 - `scripts/list-postgres-tables.js` — DIRECT_URL ile Postgres tablo listeleme aracı
 - `scripts/node-watchdog-wrapper.js` — `systemd-notify` varsa READY/watchdog pingleri gönderen wrapper
 - `deploy/systemd/bizgenciz-web.service` — wrapper ile başlatma, restart ve StartLimit ayarları
 - `deploy/systemd/bizgenciz-health.service` + `deploy/systemd/bizgenciz-health.timer` — periyodik health-check
 - `deploy/nginx/bizgenciz.conf.template` + `scripts/setup-nginx.sh` — Nginx template ve kurulum scripti
 - `docs/guides/tarama.md` — kapsamlı tarama raporu eklendi

2) Mevcut test / doğrulama sonucu (lokalde çalıştırdım)
 - `node scripts/health-check.mjs` sonucu:
   - `supabase`: başarısız — candidate tablolar (`groups, users, todos, profiles, app_users`) sorgulanamadı
   - `redis`: başarılı
   - `api`: başarısız — Next.js server ayağa kalkmadığı veya port farklı olduğu için `fetch failed`

3) Neden bu sonuçlar çıktı — kısa açıklama
 - Supabase probe tablo listesi proje DB yapısıyla eşleşmiyor veya servis rol anahtarı izni/kullanılan şema farklı.
 - Next.js server başlatılmamış (lokalde `npm run build && npm start` ile doğrula) ya da `PORT` env farklı.

4) Hızlı düzeltme/adımlar (öncelikli)
 - Veritabanında hangi tablolar var öğren:
   - Eğer elinde `DIRECT_URL` varsa:
     ```bash
     npm i pg
     DIRECT_URL="postgresql://..." node scripts/list-postgres-tables.js
     ```
 - Varsa uygun tabloyu health probe için kullan:
   - Örnek: `SUPABASE_HEALTH_TABLE=users node scripts/health-check.mjs`
   - Kalıcı: `.env.local` içine `SUPABASE_HEALTH_TABLE=users` ekle
 - Next.js server çalışmıyorsa:
   - `npm ci && npm run build && npm start` sonra `curl http://localhost:3000/api/health`

5) systemd ve watchdog doğrulama (sunucuda)
 - `systemd-notify` var mı kontrol et: `which systemd-notify`
 - Servisi yeniden yükle ve başlat:
   ```bash
   sudo cp deploy/systemd/*.service /etc/systemd/system/
   sudo cp deploy/systemd/bizgenciz-health.timer /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl restart bizgenciz-web
   sudo journalctl -u bizgenciz-web -f
   sudo systemctl enable --now bizgenciz-health.timer
   sudo journalctl -u bizgenciz-health.service -f
   ```
 - Beklenen: wrapper `systemd-notify: READY sent` logu (eğer yüklü), aksi halde wrapper sessiz kalır ve timer health-check çalışır.

6) CI notları
 - CI GitHub Actions şu an Docker build ediyor; smoke-run için Secrets gerekir: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (opsiyonel `REDIS_URL`).
 - CI runner’da Docker izinleri/org policy’lerine bağlı risk olabilir — CI çalışmazsa logu gönder, ben uyarlayayım.

7) Açık/eksik noktalar ve öneriler
 - `sd_notify` entegrasyonu uygulama içinde yok — gerçek `WatchdogSec` için Node uygulamasına notify eklenecek (wrapper geçici çözüm).
 - `SUPABASE_HEALTH_TABLE` default candidate list projenize uygun değil; `.env.local.example` içine bir satır eklenmeli.
 - `tRPC` root router boş — gerçek endpointler ve Zod validasyonları eklenmeli.
 - E2E/Jest testleri arşivlendi; yeni projeye uygun testler yazılmalı.

8) Hemen yapılması önerilen 3 adım (sırasıyla)
 1. Postgres tablo listesini al ve bana gönder (`scripts/list-postgres-tables.js`).
 2. `.env.local` içine `SUPABASE_HEALTH_TABLE` yaz; `node scripts/health-check.mjs` çalıştır ve sonucu paylaş.
 3. Sunucuda systemd adımlarını uygula; journal çıktısını paylaş (özellikle wrapper logları).

Ek: Elinden gelen bağlantı bilgilerini (güvenli yolla) verirsen Supabase MCP ile ben kontrol edebilirim; yoksa yukarıdaki `DIRECT_URL` ile tablo listesini alman yeterli.

Bu dosyayı güncellememi istersen (ör. daha detaylı runbook veya otomatik adımlar), söyle yeterli; hemen ekleyeyim.


