import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

/**
 * Centralized TRPC bootstrap for the project.
 * - Adds SuperJSON transformer
 * - Normalizes Zod validation errors into the error payload
 * - Exports helper procedures for validated usage
 */

export function createTRPCContext(_opts: { req?: any; res?: any } = {}) {
  // TODO: populate with auth/session info when auth implemented
  return {}
}

type Context = ReturnType<typeof createTRPCContext>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    // If error was caused by Zod, attach flattened details for clients/tests
    const zodError = error.cause instanceof z.ZodError ? error.cause.flatten() : undefined
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError,
      },
    }
  },
})

export const trpc = t

export const createTRPCRouter = t.router

// Basic procedure exports for consistency
export const publicProcedure = t.procedure

// validatedProcedure(schema) returns a procedure pre-wired with a Zod input schema
export function validatedProcedure<T extends z.ZodTypeAny>(schema: T) {
  return t.procedure.input(schema)
}

// protectedProcedure is a placeholder that can be used when auth is added.
// It enforces that ctx has an authenticated user (TODO: implement actual check).
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  // Placeholder: if you add auth, check it here and throw TRPCError({ code: 'UNAUTHORIZED' })
  return next()
})

// Minimal appRouter placeholder to satisfy imports during local tests.
export const appRouter = createTRPCRouter({})

export type AppRouter = typeof appRouter


