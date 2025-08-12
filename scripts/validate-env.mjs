#!/usr/bin/env node
// Validate required environment variables and print actionable report
import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url({ message: 'Geçerli bir URL olmalı' }),
  // En az biri gerekli: publishable veya anon key
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  // Server-side (opsiyonel ama sağlık kontrolü için önerilir)
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  // Opsiyonel uyarılar
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  REDIS_URL: z.string().optional(),
  SUPABASE_HEALTH_TABLE: z.string().optional(),
})

const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  REDIS_URL: process.env.REDIS_URL,
  SUPABASE_HEALTH_TABLE: process.env.SUPABASE_HEALTH_TABLE,
}

const result = schema.safeParse(env)

function print(title, obj) {
  console.log(`\n=== ${title} ===`)
  console.log(JSON.stringify(obj, null, 2))
}

let ok = result.success
let missingKeys = []
if (!result.success) {
  missingKeys = result.error.issues.map((i) => i.path.join('.'))
}

// Special rule: at least one of publishable/anon must exist
const hasClientKey = !!(env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
if (!hasClientKey) {
  ok = false
  missingKeys.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY | NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const warnings = []
if (!env.SUPABASE_SERVICE_ROLE_KEY) warnings.push('SUPABASE_SERVICE_ROLE_KEY önerilir (server-side sağlık kontrolleri için).')
if (!env.NEXT_PUBLIC_SENTRY_DSN) warnings.push('NEXT_PUBLIC_SENTRY_DSN ayarlı değil (hata görünürlüğü azalır).')
if (!env.SUPABASE_HEALTH_TABLE) warnings.push('SUPABASE_HEALTH_TABLE ayarlı değil (probe tablo otomatik denenir).')

print('ENV KONTROL', { ok, missingKeys, warnings })

if (!ok) {
  console.error('\nHATA: Zorunlu environment değişkenleri eksik. Yukarıdaki listeyi tamamlayın.')
  process.exit(1)
}

console.log('\nEnv doğrulaması başarılı.')
process.exit(0)


