import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

// Minimal appRouter placeholder to satisfy imports during local tests.
export const appRouter = t.router({})

export type AppRouter = typeof appRouter

export function createTRPCContext(_opts: { req?: any; res?: any }) {
  return {}
}

export const trpc = t


