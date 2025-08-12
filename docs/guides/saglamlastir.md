## Sağlamlaştırma Stratejisi (Self-Healing, Proaktif Uyarı ve İzlenebilirlik)

Amaç: Konsol/IDE/terminalde “anlamsız” hataları ortadan kaldırmak, hatayı anında görünür kılmak, zincirleme arızaları sınırlamak ve sistemin kendi kendini toparlayabilmesini sağlamak. Aşağıdaki önlemler proje genelinde uygulanır. Kurallar `mdc_project/` içeriği ile uyumludur (özellikle `typescript.mdc`, `eslint.mdc`, `trpc.mdc`, `zod.mdc`, `docker.mdc`, `sentry.mdc`).

### 1) Geliştirme Zamanı Emniyet (Fail-Fast)
- TypeScript sıkı modlar: `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`.
- ESLint + Prettier: `eslint-config-prettier`, `eslint-plugin-security`, `eslint-plugin-import`, React Hooks kuralları.
- Husky + lint-staged: commit öncesi `eslint --fix` ve `prettier --write`, push öncesi `npm run type-check`.
- Commit konvansiyonu: Conventional Commits (ci, docs, feat, fix, refactor…), otomatik CHANGELOG.

### 2) Ortam Doğrulama (Env Schema)
- Başlangıçta `.env.local` doğrulansın: Zod ile `SUPABASE_*`, `REDIS_*`, `NEXT_PUBLIC_*`, `SENTRY_*`, `PORT` için schema; eksik/boş ise process’i “anlamlı” mesajla durdur.
- “Yazılım çalıştı ama gizli arıza çıktı” yerine “çalışmadan, doğru hata” yaklaşımı.

### 3) Çalışma Zamanı Güvenlik ve Hata Yakalama
- API girişleri: tRPC prosedürlerinde Zod input zorunlu; `TRPCError` dışında raw error leak yok.
- Global error handling: Node `unhandledRejection` / `uncaughtException` yakalanır; Sentry’ye gönderilir; kullanıcıya güvenli mesaj.
- React Error Boundary: UI tarafında hatalar kullanıcıyı kilitlemesin; Sentry’ye otomatik rapor.

### 4) Gözlemlenebilirlik (Observability)
- Sentry: DSN, release, environment, source map yükleme; performans izlemesi açık (ör. `tracesSampleRate` üretimde düşük, ör. 0.1).
- Loglama: JSON formatlı, seviyeli (info/warn/error), PIİ kırpılmış. Node tarafında tek satır JSON log önerilir; log rotation mevcut (Windows’ta script, Debian’da journald). Nginx access/error logları açık.
- Health checks: `/api/health` (zaten var) + `scripts/health-check.mjs` (Supabase/Redis/API). `SUPABASE_HEALTH_TABLE` ile tablo override.
- Systemd timer: `bizgenciz-health.timer` dakikada bir sağlık kontrolü ve log.

### 5) Dayanıklılık (Resilience) ve Sınırlandırma
- Otomatik yeniden başlatma: `bizgenciz-web.service` → `Restart=always`, `StartLimit*` ile crash-loop önleme.
- Watchdog (opsiyonel): `node-watchdog-wrapper.js` → `systemd-notify` varsa READY/watchdog pingleri; `WatchdogSec` ileride aktif edilebilir.
- Dış servislerde zaman aşımı ve `retry with backoff` (Supabase/Redis çağrıları). Devre kesici (circuit breaker) yaklaşımı kritik noktalar için (ör. Redis down iken aşırı bekleme/çökme olmasın).
- Rate limiting: Redis tabanlı basit limit (kullanım `lib/redis.ts` içinde mevcut fonksiyonlar).

### 6) Güvenlik (Zero-Trust)
- Supabase RLS: DB tarafı erişim politikaları etkin; service-role key sadece backend’te kullanılmalı.
- HTTP güvenlik başlıkları: Nginx ile HSTS, gzip/brotli, proxy headers; Next.js `headers()` ile ek korumalar.
- CSP: mümkün olduğunda katı politika (inline script yok), 3P kaynaklar whiteliste.
- Secrets yönetimi: `.env.local` git dışında; CI’de GitHub Secrets; loglarda secrets maskelenir.

### 7) CI/CD Koruması
- Docker smoke: CI’da image build + opsiyonel container health probe (Secrets varsa). Çalışmazsa loglar artifakt.
- Pipeline katmanları: `type-check` ve `lint` bloklayıcı; testler (şimdilik arşivli) yerine smoke gate. İleride smoke + minimal e2e geri getirilebilir.
- Artifact’lar: `docker-health.json`, derleme logları ve sağlık logları tutulur.

### 8) Veri Bütünlüğü (Database-First, Drift Kontrol)
- Supabase MCP ile tablo/doğrulama: deployment öncesi drift kontrolü (beklenen ile mevcut tablo farkları raporu).
- Migration akışı açıkça dokümante: Şema değişikliği gerekiyorsa önce veritabanında (Supabase MCP/CLI), sonra prisma generate.

### 9) Operasyonel Runbooks (Fail-Fast Müdahale)
- Log konumları: `logs/health/`, journald (`journalctl -u bizgenciz-web -f`), Nginx `/var/log/nginx/*`.
- Hızlı restart: `systemctl restart bizgenciz-web`; timer kontrol: `systemctl list-timers`.
- Hızlı sağlık: `npm run health:check` veya `curl /api/health`.

### 10) Otomatik Hata Yüzeye Çıkarma (Auto-Surface)
- Hata oluştuğu anda Sentry event (server ve client). Kritik hatalarda bildirim (e-posta/Slack entegrasyonu ileride).
- Health timer failure sayacı: artarsa Sentry’ye özel event (işlem eklenebilir).
- CI’da başarısız smoke durumda kırmızı durum ve log linki.

### 11) Yol Haritası (Kısa Vadeli Uygulanacaklar)
- Env Schema: Zod tabanlı `.env` doğrulama (başlangıçta fail-fast). `.env.local.example` güncelle.
- Supabase probe: `SUPABASE_HEALTH_TABLE` kalıcı belirle; MCP ile tablo listesi doğrula.
- TRPC katmanı: gerçek router/procedure + Zod input + `TRPCError` ile sızıntı önleme.
- Log standardı: JSON tek satır, seviyeli; prod’da `console.*` yerine tek log helper.
- Nginx: domain geldikten sonra `scripts/setup-nginx.sh <domain>` ve TLS; güvenlik başlıkları aktifleştir.

#### TRPC Geliştirme Rehberi (Hızlı Başlangıç)
- `server/api/root.ts` içinde `validatedProcedure(schema)` helper'ı bulunur — yeni prosedürler bunu kullanarak input doğrulamalıdır.
- Örnek kullanım:

```ts
const createUser = validatedProcedure(z.object({ name: z.string().min(1) }))
  .mutation(async ({ input, ctx }) => {
    // iş mantığı
  })
```

- Hata yönetimi: prosedür içinde dışa sızan hatalar için `throw new TRPCError({ code: 'BAD_REQUEST', message: '...' })` kullanın. Zod hataları otomatik olarak formatlanır.


### 12) Uzun Vadeli (Opsiyonel, Büyük Proje İçin)
- OpenTelemetry/OTLP: metrik + trace; Sentry veya Prometheus/Grafana ile birleştir.
- Circuit breaker kütüphanesi (ör. `opossum`) kritik dış servis sarmalayıcılarında.
- İş kuyruğu (BullMQ) ile uzun işler ve idempotent API (Idempotency-Key), retry politikaları.

---

Uygulama durumu/araçlar (bugün)
- Health-check script ve systemd timer aktif; wrapper hazır.
- CI Docker smoke eklendi; Secrets verilirse container health probe yapar.
- Eksik: Env schema doğrulama, Supabase’de hangi tabloya probe atılacağı (override ile geçici).

Kurulum/Doğrulama (özet)
- Lokal: `npm run health:check` → `logs/health/*`. Sunucu: `systemctl status bizgenciz-web`; `journalctl -u bizgenciz-health.service -f`.
- CI: Pipeline çıktısında Docker build ve opsiyonel health probe sonucunu incele.

## Proje Yapısında Gömülü Sağlamlaştırma (Playbook’suz)

Bu dokümandaki önlemler “proje yapısına gömülü” olacak şekilde uygulanır; ayrı bir playbook’a ihtiyaç kalmadan, hatalar kendini anında görünür kılar:
- Env doğrulama modülü: uygulama start aldığı anda `.env` şeması Zod ile doğrulanır; eksik/mantıksız değerlerde süreç durur ve açıklayıcı hata üretir.
- Health ve timer: `/api/health` + `scripts/health-check.mjs` + systemd timer kombinasyonu, servis durumunu dakikalık gözlemler; ardışık başarısızlıklar loglara ve Sentry’ye yansır (entegrasyon noktası bırakıldı).
- Logging standardı: tek bir `logger` katmanı üzerinden JSON log; prod’da yapılandırılmış, dev’de okunabilir. Request-id korelasyonu için altyapı hazır.
- tRPC + Zod: API sözleşmeleri ve input doğrulaması zorunlu; ham hatalar yerine `TRPCError`—sızıntı engellenir.
- Nginx + TLS (domain geldiğinde): güvenlik başlıkları, HTTP/2 ve cache; uygulama TLS yönetiminden soyutlanır.
- CI smoke: Docker build + opsiyonel health probe; başarısızlık PR’ı engeller, loglar artefakt olur.

### 13) İstemci (Web) Hatalarının Otomatik Yüzeye Çıkması
- Dev-only overlay: Geliştirme modunda küçük bir uyarı rozeti ve konsolda structured loglar (eklendi).
- Frontend error yakalama: `window.onerror` ve `unhandledrejection` listener’ları ile (ileride) Sentry + local dev toast tetikleyin; prod’da sadece Sentry’ye gitsin.
- Konsol hataları kaydı: Kritik `console.error` çağrılarını logger’a yönlendiren hafif wrapper (opsiyonel).

### 14) Uçtan Uca Request-ID Korelasyonu
- Nginx: `add_header X-Request-Id $request_id; proxy_set_header X-Request-Id $request_id;` ve log_format’e `$request_id` ekleyin.
- Uygulama: API loglarında `requestId`’ı header’dan okuyup aynı ID ile loglayın (altyapı hazır: `lib/logger.ts`, health endpoint’te kullanılıyor).

### 15) Node Çalışma Zamanı Bayrakları (Dev)
- `NODE_OPTIONS=--trace-warnings` ve `--unhandled-rejections=strict` geliştirici ortamında önerilir.
- VS Code Tasks ile dev komutlarına otomatik enjekte edin (opsiyonel).

### 16) CI Geliştirmeleri
- Artifacts: `docker-health.json`, `logs/health/*` ve build loglarını artefakt olarak saklayın.
- Otomatik audit: Haftalık `npm audit --omit=dev` raporu ve uyarı (opsiyonel ayrı workflow).
- Basit canary test: `/api/health` 200 olmadan deploy engeli (şu an smoke ile kısmi var).

### 17) Güvenlik ve Gizlilik
- Sentry PII maskesi ve örnek redaction kuralları etkinleştirin (DSN mevcut; sampling prod’da düşürün).
- Secrets maskesi: Logger’da bilinen anahtar adları maskelensin (opsiyonel iyileştirme).

### 18) Veritabanı Gözlemlenebilirliği
- Prisma query log’u geliştirmede açık; yoğunluk artarsa SELECT dışı query’ler için seviye düşürün.
- N+1 tespiti: Şüpheli döngü + query durumlarını code review checklist’ine ekleyin.

### 19) Nginx Trafik Kalkanı (Opsiyonel)
- Rate limiting: `limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;` ve `/api` lokasyonunda `limit_req zone=api burst=20 nodelay;`.
- Basic cache headers: statikler için `immutable` (ekli), dinamik endpoint’ler için `no-store` (ekli).

