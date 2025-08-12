## Geliştirirken Dikkat: Otomatik Uyarılar ve Nereden Ne Kontrol Edilir?

Bu proje, geliştirici hatalarını hızlı yüzeye çıkarmak ve teşhisi kolaylaştırmak için aşağıdaki in-house mekanizmaları sağlar. Amaç: `npm run dev` çalıştırdığında veya CI/Actions akarken sorunlar kendini direkt göstersin.

### 1) Yerel Geliştirme (npm run dev)
- `dev-doctor`: `npm run dev`, önce sırasıyla üç kontrol çalıştırır:
  1. Env doğrulama: `scripts/validate-env.mjs` → kritik değişkenler eksikse süreç durur.
  2. TRPC uyumluluk: `scripts/check-trpc-procedures.mjs` → `validatedProcedure`/`publicProcedure`/`protectedProcedure` dışı kullanım varsa raporlar ve hata verir.
  3. Sağlık kontrolleri: `scripts/health-check.mjs` → Supabase/Redis/API probe ve `logs/health/` içine rapor.
- Geliştiricinin görmesi için: terminalde net hata/uyarılar ve JSON log/raporlar görünür.

### 2) API ve Log Korelasyonu
- `middleware.ts` → her isteğe `x-request-id` ekler (yoksa üretir). SSR cookie set süreçlerinde de header taşınır.
- `lib/logger.ts` → JSON structured log; `requestId` ile korelasyon; `apiHandler` ile tüm hatalar güvenli loglanır.

### 3) TRPC Kuralları
- Kural: Tüm prosedürler `validatedProcedure(schema)` veya `publicProcedure`/`protectedProcedure` kullanmalı.
- Otomatik: `npm run check:trpc` ve CI üzerinde aynı kontrol. İhlalde CI kırmızı.

### 4) CI / GitHub Actions
- Ana CI (`.github/workflows/ci.yml`): type-check, lint, build ve Playwright smoke (Chromium/Firefox/WebKit + mobil viewports). Fail-on-error aktif.
- Self-hosted smoke (`.github/workflows/selfhosted-smoke.yml`): Debian sunucuda çalışan servise karşı gerçek smoke; `SELFHOST_BASE_URL` secret’ı gerekir.

### 5) Üretim Başlangıcı (start:prod)
- `start:prod` → önce env doğrulama (`validate-env.mjs`), sonra `server.js` varsa o, yoksa `next start`.
- Amaç: prod’da da yanlış konfigürasyonun anında ve anlamlı mesajla yakalanması.

### 6) Neyi Nereden Kontrol Edeceğim?
- Env sorunları: `npm run dev` çıktısı; ayrıca `scripts/validate-env.mjs` tek başına.
- TRPC uyumluluk: `npm run check:trpc` veya PR açınca Actions.
- Sağlık: `npm run health:check` (lokal), sunucuda `/api/health` ve systemd timer logları.
- Loglar: konsol JSON logları, `logs/health/` raporları; üretimde `journalctl -u bizgenciz-web -f`.

### 7) Manuel Yapılacaklar (Şimdilik)
- Nginx’te request-id propagasyonu: `proxy_set_header X-Request-Id $request_id;` ve `log_format` içine `$request_id` ekleyin (template’de notlu).
- Sentry DSN eklemek (istemci ve sunucu). DSN verilince `apiHandler` yakalanan hataları Sentry’ye de bildirir.
- Supabase MCP ile tablo/şema kontrollleri (geliştirme akışında ihtiyaç oldukça).

### 8) Sık Karşılaşılan Sorunlar
- “Env eksik” hatası: `.env.local` içeriğini `docs/guides/saglamlastir.md`/env şemasına göre tamamlayın.
- “TRPC uyumsuz” uyarısı: prosedürü `validatedProcedure(z.object({...}))` ile sarmalayın.
- “Health probe fail”: Supabase keys/URL doğruluğunu ve `SUPABASE_HEALTH_TABLE` ayarını kontrol edin.

