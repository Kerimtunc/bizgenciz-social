type LogLevel = 'info' | 'warn' | 'error'

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

export function withRequestId(meta?: Record<string, unknown>) {
  const requestId = Math.random().toString(36).slice(2, 10)
  return { requestId, ...(meta || {}) }
}


