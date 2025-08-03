# 🔗 tRPC API Framework - Tip Güvenli API Sistemi

## 📋 Özellikler
- **End-to-End Type Safety**: Tam tip güvenliği
- **Automatic Type Inference**: Otomatik tip çıkarımı
- **Zod Validation**: Gelişmiş veri doğrulama
- **Middleware Support**: Middleware desteği
- **Error Handling**: Merkezi hata yönetimi
- **Context Management**: Bağlam yönetimi
- **Performance Optimization**: Performans optimizasyonu

## 🎯 Kullanım Alanları
- Full-stack TypeScript projeleri
- Microservice mimarileri
- Real-time uygulamalar
- API-first geliştirme
- Type-safe client-server iletişimi
- Modern web uygulamaları

## 💡 En Etkileyici Özellikler

### 1. Context Creation with Session Management
```typescript
interface CreateContextOptions {
  session: Session | null
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  // Get session from NextAuth
  const session = null // TODO: Implement NextAuth session

  return createInnerTRPCContext({
    session,
  })
}
```

### 2. Advanced Error Formatter with Zod
```typescript
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: {
    serialize: (object) => JSON.parse(JSON.stringify(object)),
    deserialize: (object) => object,
  },
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})
```

### 3. Authentication Middleware
```typescript
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new Error('UNAUTHORIZED')
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
```

### 4. Public and Protected Procedures
```typescript
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
```

### 5. Type-Safe Router Definition
```typescript
export const appRouter = createTRPCRouter({
  // Public routes
  health: publicProcedure
    .query(() => {
      return { status: 'ok', timestamp: new Date() }
    }),
    
  // Protected routes
  user: protectedProcedure
    .query(({ ctx }) => {
      return ctx.session.user
    }),
    
  // Input validation with Zod
  createUser: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().min(2),
      password: z.string().min(8)
    }))
    .mutation(async ({ input }) => {
      // Type-safe input handling
      const user = await prisma.user.create({
        data: input
      })
      return user
    })
})
```

### 6. Client-Side Type Safety
```typescript
// Client-side usage with full type safety
const { data: user } = api.user.useQuery()
const createUser = api.createUser.useMutation()

// TypeScript knows the exact shape of user and createUser
const handleSubmit = (formData: { email: string; name: string; password: string }) => {
  createUser.mutate(formData, {
    onSuccess: (newUser) => {
      // newUser is fully typed
      console.log('User created:', newUser.id)
    },
    onError: (error) => {
      // error is typed with Zod validation errors
      console.error('Validation errors:', error.data?.zodError)
    }
  })
}
```

### 7. Advanced Middleware Chain
```typescript
const logMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now()
  const result = await next()
  const durationMs = Date.now() - start
  
  console.log(`${type} '${path}' took ${durationMs}ms`)
  return result
})

const rateLimitMiddleware = t.middleware(async ({ ctx, next }) => {
  // Rate limiting logic
  const isAllowed = await checkRateLimit(ctx.session?.user?.id)
  if (!isAllowed) {
    throw new Error('RATE_LIMIT_EXCEEDED')
  }
  return next()
})

// Combine multiple middlewares
export const rateLimitedProcedure = t.procedure
  .use(logMiddleware)
  .use(rateLimitMiddleware)
```

### 8. Subscription Support
```typescript
export const realtimeRouter = createTRPCRouter({
  onOrderUpdate: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .subscription(({ input }) => {
      return new Observable<Order>((emit) => {
        const unsubscribe = orderEvents.on(`order:${input.orderId}`, (order) => {
          emit.next(order)
        })
        return unsubscribe
      })
    })
})
```

## 🚀 Performans Optimizasyonları
- **Automatic Caching**: Otomatik önbellekleme
- **Request Deduplication**: İstek tekrarını önleme
- **Batch Requests**: Toplu istek desteği
- **Lazy Loading**: Tembel yükleme
- **Connection Pooling**: Bağlantı havuzu

## 📱 Type Safety Features
- **End-to-End Types**: Uçtan uca tip güvenliği
- **Automatic Inference**: Otomatik tip çıkarımı
- **Runtime Validation**: Çalışma zamanı doğrulama
- **Error Type Safety**: Hata tip güvenliği
- **Input Validation**: Girdi doğrulama

## 🔧 Configuration Options
- **Custom Transformers**: Özel dönüştürücüler
- **Error Handling**: Hata yönetimi
- **Middleware Chain**: Middleware zinciri
- **Context Types**: Bağlam tipleri
- **Validation Schemas**: Doğrulama şemaları

## 🛡️ Security Features
- **Authentication**: Kimlik doğrulama
- **Authorization**: Yetkilendirme
- **Input Sanitization**: Girdi temizleme
- **Rate Limiting**: Hız sınırlama
- **CORS Support**: CORS desteği 