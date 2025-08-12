import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import { apiHandler } from '@/lib/api-utils'

// Server-side Supabase health check using service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

export const GET = apiHandler(async (_request, ctx) => {
  let dbStatus = 'disconnected'

  if (supabaseUrl && supabaseServiceKey) {
    const sb = createClient(supabaseUrl, supabaseServiceKey)
    // Determine probe table from env (allows projects to override)
    const probeTable = process.env.SUPABASE_HEALTH_TABLE || 'groups'
    try {
      // perform a safe probe via PostgREST
      const { error } = await sb.from(probeTable).select('id').limit(1)
      if (!error) {
        dbStatus = 'connected'
      } else {
        throw error
      }
    } catch (err) {
      logger.warn('Supabase health query failed', { requestId: ctx.requestId, error: err instanceof Error ? err.message : String(err), probeTable })
      // Optional fallback: try direct Postgres if allowed (development convenience)
      const allowFallback = process.env.HEALTH_ALLOW_PG_FALLBACK === 'true' || process.env.NODE_ENV === 'development'
      if (allowFallback) {
        try {
          const { Client } = await import('pg')
          const connStr = process.env.DATABASE_URL || process.env.DIRECT_URL
          if (connStr) {
            const client = new Client({ connectionString: connStr })
            await client.connect()
            try {
              await client.query({ text: `SELECT 1 FROM public.${probeTable} LIMIT 1` })
              dbStatus = 'connected'
            } finally {
              await client.end().catch(() => {})
            }
          }
        } catch (pgErr) {
          logger.warn('PG fallback failed', { requestId: ctx.requestId, error: pgErr instanceof Error ? pgErr.message : String(pgErr) })
          dbStatus = 'disconnected'
        }
      } else {
        dbStatus = 'disconnected'
      }
    }
  }

  const healthData = {
    status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    uptime: process.uptime(),
    requestId: ctx.requestId,
  }

  const statusCode = dbStatus === 'connected' ? 200 : 503
  logger.info('Health check result', { requestId: ctx.requestId, statusCode, database: dbStatus })
  return NextResponse.json(healthData, { status: statusCode })
})