import { NextRequest, NextResponse } from 'next/server'

// Lightweight request-id middleware: if request doesn't have x-request-id, generate one and
// ensure response contains the same header. This helps log correlation across reverse proxies.
export function middleware(request: NextRequest) {
  const existing = request.headers.get('x-request-id') || request.headers.get('X-Request-Id')
  const requestId = existing || Math.random().toString(36).slice(2, 10)

  const res = NextResponse.next()
  try {
    res.headers.set('x-request-id', requestId)
  } catch (e) {
    // ignore if headers can't be set in some edge contexts
  }

  return res
}

export const config = {
  // Run for API routes and app pages (avoid static assets)
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
}


