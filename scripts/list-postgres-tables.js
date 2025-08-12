#!/usr/bin/env node
/**
 * List Postgres tables using DIRECT_URL or DATABASE_URL env var.
 * Usage:
 *   DIRECT_URL="postgresql://..." node scripts/list-postgres-tables.js
 */
import pg from 'pg'
import fs from 'fs'
import path from 'path'

// load dotenv if present
try {
  const dotenv = await import('dotenv')
  const p = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(p)) dotenv.config({ path: p })
} catch {}

const conn = process.env.DIRECT_URL || process.env.DATABASE_URL || process.env.SUPABASE_DIRECT_URL || process.env.SUPABASE_DB_URL
if (!conn) {
  console.error('No DIRECT_URL / DATABASE_URL / SUPABASE_DIRECT_URL found in env')
  process.exit(2)
}

const client = new pg.Client({ connectionString: conn })
try {
  await client.connect()
  const res = await client.query(`SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema') ORDER BY table_schema, table_name;`)
  console.log(JSON.stringify(res.rows, null, 2))
  await client.end()
  process.exit(0)
} catch (e) {
  console.error('Error listing tables:', e.message || e)
  try { await client.end() } catch {}
  process.exit(1)
}


