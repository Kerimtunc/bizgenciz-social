import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { logger, withRequestId } from '@/lib/logger'

// Server-side Supabase health check using service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

export async function GET() {
  const ctx = withRequestId()
  try {
    let dbStatus = 'disconnected'

    if (supabaseUrl && supabaseServiceKey) {
      const sb = createClient(supabaseUrl, supabaseServiceKey)
      // Try a safe select on a known table in the bizgenciz schema
      try {
        // perform a safe probe; we don't need the returned rows, only that the query succeeds
        await sb.from('groups').select('id').limit(1).throwOnError()
        dbStatus = 'connected'
      } catch (err) {
        logger.warn('Supabase health query failed', { ...ctx, error: err instanceof Error ? err.message : String(err) })
        dbStatus = 'disconnected'
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
    logger.info('Health check result', { ...ctx, statusCode, database: dbStatus })
    return NextResponse.json(healthData, { status: statusCode })
  } catch (error) {
    logger.error('Health check unexpected failure', { error: error instanceof Error ? error.message : String(error) })
    const errorData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'disconnected',
      uptime: process.uptime(),
      requestId: ctx.requestId,
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error instanceof Error ? error.message : 'Unknown error',
    }
    return NextResponse.json(errorData, { status: 503 })
  }
}