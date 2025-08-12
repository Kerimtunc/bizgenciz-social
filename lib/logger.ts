function format(entry: Record<string, unknown>) {
  return JSON.stringify({ ts: new Date().toISOString(), ...entry })
}

export const logger = {
  info(message: string, meta: Record<string, unknown> = {}) {
    // eslint-disable-next-line no-console
    console.log(format({ level: 'info', message, ...meta }))
  },
  warn(message: string, meta: Record<string, unknown> = {}) {
    // eslint-disable-next-line no-console
    console.warn(format({ level: 'warn', message, ...meta }))
  },
  error(message: string, meta: Record<string, unknown> = {}) {
    // eslint-disable-next-line no-console
    console.error(format({ level: 'error', message, ...meta }))
  },
}

export function generateRequestId() {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * Create a request context object. If `headers` includes `x-request-id`, it will be used.
 */
export function withRequestId(headersOrMeta?: Headers | Record<string, unknown>) {
  let requestId: string | null = null

  // If a Headers object is provided, try to read x-request-id
  try {
    // @ts-ignore
    if (headersOrMeta && typeof (headersOrMeta as Headers).get === 'function') {
      // @ts-ignore
      const h = (headersOrMeta as Headers).get('x-request-id') || (headersOrMeta as Headers).get('X-Request-Id')
      if (h) requestId = String(h)
    }
  } catch (e) {
    // ignore
  }

  // If no requestId yet, check meta-like object
  if (!requestId && headersOrMeta && !(headersOrMeta as Headers).get) {
    // @ts-ignore
    const maybe = (headersOrMeta as Record<string, unknown>)['x-request-id'] || (headersOrMeta as Record<string, unknown>)['X-Request-Id']
    if (maybe) requestId = String(maybe)
  }

  if (!requestId) requestId = generateRequestId()

  return { requestId }
}


