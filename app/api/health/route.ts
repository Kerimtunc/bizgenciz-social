import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase health check using service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

export async function GET(request: NextRequest) {
  try {
    let dbStatus = 'disconnected'

    if (supabaseUrl && supabaseServiceKey) {
      const sb = createClient(supabaseUrl, supabaseServiceKey)
      // Try a safe select on a known table in the bizgenciz schema
      try {
        const { data, error } = await sb.from('groups').select('id').limit(1).throwOnError()
        dbStatus = error ? 'disconnected' : 'connected'
      } catch (err) {
        console.warn('Supabase health query failed:', err instanceof Error ? err.message : err)
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
      memory: process.memoryUsage(),
    }

    const statusCode = dbStatus === 'connected' ? 200 : 503
    return NextResponse.json(healthData, { status: statusCode })
  } catch (error) {
    console.error('Health check unexpected failure:', error)
    const errorData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'disconnected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error instanceof Error ? error.message : 'Unknown error',
    }
    return NextResponse.json(errorData, { status: 503 })
  }
}