import { NextResponse } from 'next/server'
import { withRequestId, logger } from './logger'

let Sentry: any = null
try {
  // optional Sentry integration
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Sentry = require('@sentry/nextjs')
} catch (e) {
  Sentry = null
}

type HandlerCtx = { requestId: string }

export function apiHandler(handler: (req: Request, ctx: HandlerCtx) => Promise<Response | NextResponse>) {
  return async (request: Request) => {
    const ctx = withRequestId((request as any).headers)
    try {
      const result = await handler(request, ctx)
      return result as Response
    } catch (err) {
      try {
        if (Sentry && Sentry.captureException) Sentry.captureException(err)
      } catch (e) {
        // ignore Sentry failures
      }
      logger.error('API unexpected error', { requestId: ctx.requestId, error: err instanceof Error ? err.message : String(err) })
      return NextResponse.json(
        {
          status: 'error',
          requestId: ctx.requestId,
          error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err instanceof Error ? err.message : String(err),
        },
        { status: 500 }
      )
    }
  }
}


