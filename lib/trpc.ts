import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '@/server/api/root'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClientConfig = {
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({ url: '/api/trpc' }),
  ],
}

export type RouterInputs = import('@trpc/server').inferRouterInputs<AppRouter>
export type RouterOutputs = import('@trpc/server').inferRouterOutputs<AppRouter> 