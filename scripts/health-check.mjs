// Cross-platform health check script (Node 20+)
// - Checks Supabase (service role), Redis, and Next.js /api/health endpoint
// - Writes a JSON report to logs/health/ with a timestamped filename

import fs from 'node:fs'
import path from 'node:path'

// Load env from .env.local if present
try {
  const dotenv = await import('dotenv')
  if (fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    dotenv.config({ path: '.env.local' })
  } else if (fs.existsSync(path.join(process.cwd(), '.env'))) {
    dotenv.config({ path: '.env' })
  }
} catch {}

// Lazy imports (installed in project)
import { createClient } from '@supabase/supabase-js'
import Redis from 'ioredis'
import pg from 'pg'

const nowIso = new Date().toISOString()
const results = {
  timestamp: nowIso,
  environment: process.env.NODE_ENV || 'development',
  checks: {},
}

function getEnv(name, fallback) {
  return process.env[name] ?? fallback
}

async function checkSupabase() {
  const url = getEnv('NEXT_PUBLIC_SUPABASE_URL', getEnv('SUPABASE_URL', ''))
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY', getEnv('SUPABASE_SERVICE_KEY', ''))
  if (!url || !serviceKey) {
    return { ok: false, error: 'Missing SUPABASE URL or SERVICE ROLE KEY' }
  }
  try {
    const sb = createClient(url, serviceKey)
    // Try a list of candidate tables and return the first that succeeds.
    // Allow overriding the probe table via env for projects with custom schema
    const override = getEnv('SUPABASE_HEALTH_TABLE', '')
    const defaultCandidates = ['groups', 'users', 'todos', 'profiles', 'app_users']
    const candidates = override ? [override, ...defaultCandidates] : defaultCandidates
    const tried = []
    for (const table of candidates) {
      tried.push(table)
      try {
        const { data, error } = await sb.from(table).select('id').limit(1)
        if (!error && data) {
          return { ok: true, table }
        }
        // If PostgREST returns 404 or schema cache issue, try a REST fallback using direct fetch
        if (error && error.code === 'PGRST205') {
          try {
            const restUrl = `${url.replace(/\/$/, '')}/rest/v1/${table}?select=id&limit=1`
            const resp = await fetch(restUrl, {
              headers: {
                apikey: serviceKey,
                Authorization: `Bearer ${serviceKey}`,
              },
            })
            if (resp.ok) {
              const body = await resp.json().catch(()=>null)
              return { ok: true, table, fallback: 'rest' }
            }
          } catch (e) {
            // ignore and continue
          }
        }
        // If REST/PostgREST fails, optionally try direct Postgres connection via DATABASE_URL/DIRECT_URL
        const allowFallback = getEnv('HEALTH_ALLOW_PG_FALLBACK', process.env.NODE_ENV === 'development' ? 'true' : 'false') === 'true'
        if (allowFallback) {
          try {
            const connStr = getEnv('DATABASE_URL', getEnv('DIRECT_URL', ''))
            if (connStr) {
              const client = new pg.Client({ connectionString: connStr })
              await client.connect()
              try {
                await client.query({ text: `SELECT 1 FROM public.${table} LIMIT 1` })
                await client.end()
                return { ok: true, table, fallback: 'pg' }
              } catch (pgErr) {
                await client.end().catch(()=>{})
              }
            }
          } catch (e) {
            // ignore and continue
          }
        }
      } catch (err) {
        // continue trying next candidate
      }
    }
    // If none of the candidates worked, attempt to list tables via Supabase REST
    try {
      const { data, error } = await sb.rpc('pg_tables')
      if (!error && data) {
        return { ok: false, error: 'None of candidate tables queryable; pg_tables RPC returned data', tried, pg_tables_count: data.length }
      }
    } catch (e) {
      // ignore
    }
    // If none of the candidates worked, return the last error info
    return { ok: false, error: `None of candidate tables exist or are queryable`, tried }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

async function checkRedis() {
  try {
    const url = getEnv('REDIS_URL', '')
    let client
    if (url) {
      client = new Redis(url)
    } else {
      const host = getEnv('REDIS_HOST', '127.0.0.1')
      const port = Number(getEnv('REDIS_PORT', '6379'))
      const password = getEnv('REDIS_PASSWORD', undefined)
      client = new Redis({ host, port, password })
    }
    const pong = await client.ping()
    await client.quit()
    return { ok: pong === 'PONG' }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

async function checkApiHealth() {
  try {
    const port = Number(getEnv('PORT', '3000'))
    const url = `http://localhost:${port}/api/health`
    const res = await fetch(url, { method: 'GET' })
    const status = res.status
    let body = null
    try { body = await res.json() } catch {}
    const ok = status >= 200 && status < 300
    return { ok, status, body }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

const supabaseRes = await checkSupabase()
results.checks.supabase = supabaseRes

const redisRes = await checkRedis()
results.checks.redis = redisRes

const apiRes = await checkApiHealth()
results.checks.api = apiRes

results.ok = Object.values(results.checks).every(c => c && c.ok)

// Write report
const outDir = path.join(process.cwd(), 'logs', 'health')
fs.mkdirSync(outDir, { recursive: true })
const stamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
const outFile = path.join(outDir, `health-${stamp}.json`)
fs.writeFileSync(outFile, JSON.stringify(results, null, 2))

console.log(JSON.stringify(results))
process.exit(results.ok ? 0 : 1)


