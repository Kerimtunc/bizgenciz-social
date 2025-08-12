import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from '@/server/api/root'
import { apiHandler } from '@/lib/api-utils'
import { logger } from '@/lib/logger'

const innerHandler = (req: Request, ctx: { requestId: string }) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req, res: {} as Response }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : ({ path, error }) => {
            // production: log and optionally send to Sentry via apiUtils
            logger.error('tRPC handler error', { requestId: ctx.requestId, path, error: error.message })
          },
  })

const handler = apiHandler(async (req, ctx) => innerHandler(req, ctx))

export { handler as GET, handler as POST }