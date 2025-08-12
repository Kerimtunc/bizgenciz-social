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
