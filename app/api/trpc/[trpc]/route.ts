import { NextRequest } from 'next/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from '@/server/api/root'

async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: req as unknown as Request,
    router: appRouter,
    createContext: () => createTRPCContext({ req: req as any, res: {} as any, info: undefined as any }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined,
  })
}

export { handler as GET, handler as POST } 