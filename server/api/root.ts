import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import superjson from 'superjson'

import { prisma } from '@/lib/prisma'

/**
 * 1. CONTEXT
 */
interface CreateContextOptions {
  req: Request
  // TODO: Add session when NextAuth is integrated
  session: null
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    req: opts.req,
  }
}

export const createTRPCContext = async (opts: { req: Request }) => {
  const { req } = opts
  const session = null

  return createInnerTRPCContext({
    req,
    session,
  })
}

/**
 * 2. INITIALIZATION
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * 3. ROUTER & PROCEDURE
 */
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new Error('UNAUTHORIZED')
    }
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    })
  })
)

/**
 * 4. ROUTER DEFINITION
 */
export const appRouter = createTRPCRouter({
  health: publicProcedure.query(async () => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    }
  }),
})

export type AppRouter = typeof appRouter 