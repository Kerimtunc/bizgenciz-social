# 🏗️ YemekZen Proje Temelleri: Adım Adım Kurulum Rehberi

> **🎯 HEDEF:** Bu rehber, YemekZen projesinin temellerini **doğru sırayla** atmanızı sağlar. Her adım, bir sonraki adımın temelini oluşturur.

---

## 📋 **KURULUM SIRALAMASI**

### **1️⃣ ADIM: PROJE VİZYONU VE MİMARİ KARARLARI**
### **2️⃣ ADIM: KLASÖR YAPISI VE ORGANİZASYON**
### **3️⃣ ADIM: TEKNOLOJİ STACK SEÇİMİ**
### **4️⃣ ADIM: VERİTABANI ŞEMASI VE GÜVENLİK TEMELLERİ**
### **5️⃣ ADIM: API ALTYAPISI (tRPC + SUPABASE)**
### **6️⃣ ADIM: FRONTEND TEMELLERİ**
### **7️⃣ ADIM: GÜVENLİK VE VERİ İZOLASYONU**
### **8️⃣ ADIM: TEST VE CI/CD PIPELINE**
### **9️⃣ ADIM: GÖZLEMLENEBİLİRLİK VE LOGGING**
### **🔟 ADIM: ASENKRON İŞLER VE ARKA PLAN GÖREVLERİ**

---

## 1️⃣ **ADIM: PROJE VİZYONU VE MİMARİ KARARLARI**

### 🎯 **Proje Genel Bakış**

YemekZen, **çoklu uygulama** ve **multi-tenant** yapısına sahip bir SaaS platformudur. Projenin birkaç ayağı vardır:

#### 🏢 **Ana Bileşenler:**
- **Süperadmin Paneli**: Ana şirketin adminleri için ultra yüksek güvenlik seviyesi
- **Ana Site**: Projeyi pazarlamak için tenant yapısından farklı sayfalar
- **Tenant Sayfaları**: Her işletmenin kendi menü, hakkımızda, iletişim sayfaları
- **Tenant Yönetim Paneli**: POS, CRM gibi restoran/kafe sahiplerinin kendi alanları
- **Pazarlama Birimi Paneli**: Süperadmin altında olmayan ayrı birim

#### 🏗️ **Klasör Yapısı:**
```
/superadmin_panel    # Süperadmin paneli
/mainsite           # Ana pazarlama sitesi
/menüler            # Tenant menü sayfaları
/panel              # Tenant yönetim paneli
/anasayfa-ve-diğerleri  # Tenant genel sayfaları
```

### 🧠 **Mimari İlkeler**

#### **Bounded Context (Sınırlı Bağlam)**
Her "alan" farklı bir iş alanını (domain) temsil eder:
- **Süperadmin Paneli** ≠ **Tenant POS Paneli**
- Her domain kendi terimlerine, iş kurallarına ve mantığına sahip

#### **Separation of Concerns (Sorumlulukların Ayrılması)**
- Her uygulamanın farklı amacı, kullanıcı kitlesi, güvenlik gereksinimi
- Süperadmin paneli nadiren güncellenirken, tenant menü sayfası sürekli değişebilir

#### **Multi-Tenancy (Çoklu Kiracılık)**
- Birden fazla müşteriye (tenant) aynı altyapı üzerinden hizmet
- **Veri İzolasyonu**: Bir kiracının verisi, başka bir kiracı tarafından kesinlikle erişilemez

#### **Evolutionary Architecture (Evrimsel Mimari)**
- Bugün "mikroservise hazırlıklı" modüler monolit
- Gelecekte en çok yük alan modülleri bağımsız mikroservise dönüştürme esnekliği

---

## 2️⃣ **ADIM: KLASÖR YAPISI VE ORGANİZASYON**

### 📁 **Monorepo Yapısı (Turborepo/Nx)**

```bash
/project-root
├── apps/                 # Dağıtılabilir uygulamalar
│   ├── main-site/        # Pazarlama ve ana sayfa (Next.js/Astro)
│   ├── superadmin-panel/ # Süperadmin paneli (Next.js/Vite)
│   ├── tenant-panel/     # Tenant yönetim paneli (POS, CRM)
│   ├── tenant-public/    # Tenant'ların herkese açık sayfaları
│   └── marketing-panel/  # Pazarlama birimi paneli
│
├── packages/             # Paylaşılan kodlar
│   ├── ui/               # Paylaşılan React bileşenleri
│   ├── config/           # Paylaşılan konfigürasyonlar
│   ├── auth/             # Kimlik doğrulama mantığı
│   ├── db/               # Prisma/Drizzle şemaları
│   └── types/            # Paylaşılan TypeScript tipleri
│
├── services/             # Backend servisleri (Mikroservis adayları)
│   ├── api-gateway/      # Gelen istekleri karşılayan kapı
│   ├── auth-service/     # Kimlik doğrulama servisi
│   ├── tenant-service/   # Tenant yönetim servisi
│   └── payment-service/  # Ödeme servisi
│
└── package.json          # Monorepo ana paket dosyası
```

### 🛠️ **Kurulum Komutları:**

```bash
# 1. Turborepo kurulumu
npx create-turbo@latest yemekzen --use-npm

# 2. Ana klasörleri oluştur
cd yemekzen
mkdir -p apps packages services

# 3. İlk uygulamaları oluştur
cd apps
npx create-next-app@latest main-site --typescript --tailwind --eslint
npx create-next-app@latest superadmin-panel --typescript --tailwind --eslint
npx create-next-app@latest tenant-panel --typescript --tailwind --eslint
npx create-next-app@latest tenant-public --typescript --tailwind --eslint
```

---

## 3️⃣ **ADIM: TEKNOLOJİ STACK SEÇİMİ**

### 🎯 **Seçilen Teknolojiler:**

#### **Frontend:**
- **Next.js**: SSR/SSG ve CSR hibrit çözüm
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Hızlı styling
- **Shadcn/UI**: Hazır bileşenler
- **Zustand**: State management

#### **Backend:**
- **tRPC**: Tip güvenli API
- **Prisma**: ORM ve veritabanı yönetimi
- **Supabase**: PostgreSQL + Realtime
- **Zod**: Veri doğrulama

#### **Monorepo Yönetimi:**
- **Turborepo**: Build optimizasyonu ve caching
- **Nx**: Alternatif olarak kullanılabilir

### 📦 **Bağımlılık Kurulumu:**

```bash
# Ana bağımlılıklar
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next
npm install @supabase/supabase-js
npm install zod
npm install @prisma/client prisma
npm install zustand
npm install @radix-ui/react-*  # Shadcn/UI için

# Geliştirme bağımlılıkları
npm install -D @types/node typescript
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

## 4️⃣ **ADIM: VERİTABANI ŞEMASI VE GÜVENLİK TEMELLERİ**

### 🗄️ **Prisma Schema Tasarımı**

```prisma
// packages/db/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Multi-tenant için temel model
model Tenant {
  id          String   @id @default(cuid())
  name        String
  domain      String   @unique
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // İlişkiler
  users       User[]
  menus       Menu[]
  orders      Order[]
  
  @@map("tenants")
}

// Kullanıcı modeli (tenant izolasyonu ile)
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  tenantId  String   // ZORUNLU: Multi-tenant için
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // İlişkiler
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  orders    Order[]
  
  @@map("users")
}

// Menü modeli
model Menu {
  id        String   @id @default(cuid())
  name      String
  tenantId  String   // ZORUNLU: Tenant izolasyonu
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // İlişkiler
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  items     MenuItem[]
  
  @@unique([name, tenantId])
  @@map("menus")
}

// Menü öğesi modeli
model MenuItem {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  menuId      String
  parentId    String?  // Hiyerarşik menü için
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // İlişkiler
  menu        Menu     @relation(fields: [menuId], references: [id], onDelete: Cascade)
  parent      MenuItem? @relation("MenuItemHierarchy", fields: [parentId], references: [id])
  children    MenuItem[] @relation("MenuItemHierarchy")
  
  @@map("menu_items")
}

// Sipariş modeli
model Order {
  id          String      @id @default(cuid())
  orderNumber String      @unique
  status      OrderStatus @default(PENDING)
  totalAmount Decimal     @db.Decimal(10, 2)
  customerId  String
  tenantId    String      // ZORUNLU: Tenant izolasyonu
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // İlişkiler
  tenant      Tenant      @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customer    User        @relation(fields: [customerId], references: [id])
  items       OrderItem[]
  
  @@map("orders")
}

// Sipariş öğesi modeli
model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  createdAt DateTime @default(now())
  
  // İlişkiler
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@map("order_items")
}

// Enum'lar
enum UserRole {
  SUPER_ADMIN
  TENANT_ADMIN
  TENANT_USER
  CUSTOMER
}

enum OrderStatus {
  PENDING
  PREPARING
  READY
  DELIVERED
  CANCELLED
}
```

### 🔒 **Güvenlik Temelleri**

#### **Row-Level Security (RLS) Politikaları:**

```sql
-- Tenant izolasyonu için RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar sadece kendi tenant'ının verilerini görebilir
CREATE POLICY "Users can only access their own tenant data" ON users
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::text);

CREATE POLICY "Menus can only be accessed by tenant users" ON menus
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::text);

CREATE POLICY "Orders can only be accessed by tenant users" ON orders
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::text);
```

#### **Veri Doğrulama (Zod Şemaları):**

```typescript
// packages/shared/src/schemas/validation.ts
import { z } from 'zod';

// Tenant oluşturma şeması
export const createTenantSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  domain: z.string().regex(/^[a-z0-9-]+$/, 'Domain sadece küçük harf, rakam ve tire içerebilir'),
});

// Kullanıcı oluşturma şeması
export const createUserSchema = z.object({
  email: z.string().email('Geçerli email adresi gerekli'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  tenantId: z.string().cuid('Geçerli tenant ID gerekli'),
  role: z.enum(['TENANT_ADMIN', 'TENANT_USER', 'CUSTOMER']),
});

// Menü oluşturma şeması
export const createMenuSchema = z.object({
  name: z.string().min(1, 'Menü adı gerekli'),
  tenantId: z.string().cuid('Geçerli tenant ID gerekli'),
  isActive: z.boolean().default(true),
});

// Sipariş oluşturma şeması
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().cuid(),
    quantity: z.number().min(1, 'Miktar en az 1 olmalı'),
    price: z.number().positive('Fiyat pozitif olmalı'),
  })).min(1, 'En az bir ürün gerekli'),
  customerId: z.string().cuid('Geçerli müşteri ID gerekli'),
  tenantId: z.string().cuid('Geçerli tenant ID gerekli'),
});
```

---

## 5️⃣ **ADIM: API ALTYAPISI (tRPC + SUPABASE)**

### 🔧 **tRPC Kurulumu**

```typescript
// packages/api/src/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import { ZodError } from 'zod';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Güvenli prosedür (authentication gerekli)
export const protectedProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    
    // Tenant izolasyonu ZORUNLU
    if (ctx.session.user.tenantId !== ctx.tenantId) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  })
);

// Süperadmin prosedürü (sadece süperadmin erişebilir)
export const superAdminProcedure = protectedProcedure.use(
  t.middleware(({ ctx, next }) => {
    if (ctx.session.user.role !== 'SUPER_ADMIN') {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next({ ctx });
  })
);
```

### 🔗 **Supabase Kurulumu**

```typescript
// packages/api/src/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Realtime event types
export type RealtimeEvent = {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: any;
  old_record?: any;
};
```

### 🎯 **Router Implementasyonları**

```typescript
// packages/api/src/routers/tenants.ts
import { z } from 'zod';
import { router, superAdminProcedure } from '../trpc';
import { prisma } from '@repo/db';
import { createTenantSchema } from '@repo/shared';

export const tenantsRouter = router({
  // Tenant oluşturma (sadece süperadmin)
  create: superAdminProcedure
    .input(createTenantSchema)
    .mutation(async ({ ctx, input }) => {
      const tenant = await prisma.tenant.create({
        data: input,
      });

      return tenant;
    }),

  // Tenant listesi (sadece süperadmin)
  list: superAdminProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      const tenants = await prisma.tenant.findMany({
        take: input.limit,
        skip: input.offset,
        orderBy: { createdAt: 'desc' },
      });

      return tenants;
    }),

  // Tenant detayı
  getById: superAdminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const tenant = await prisma.tenant.findUnique({
        where: { id: input.id },
        include: {
          users: true,
          menus: true,
          _count: {
            select: {
              users: true,
              menus: true,
              orders: true,
            },
          },
        },
      });

      if (!tenant) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return tenant;
    }),
});
```

---

## 6️⃣ **ADIM: FRONTEND TEMELLERİ**

### 🎨 **UI Bileşen Kütüphanesi**

```typescript
// packages/ui/src/components/Button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

### 🔐 **Kimlik Doğrulama Hook'ları**

```typescript
// packages/auth/src/hooks/useAuth.ts
import { create } from 'zustand';
import { trpc } from '@repo/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'TENANT_USER' | 'CUSTOMER';
  tenantId: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      
      // tRPC ile login
      const result = await trpc.auth.login.mutate({ email, password });
      
      set({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      const user = await trpc.auth.me.query();
      
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
```

### 🎯 **tRPC Client Kurulumu**

```typescript
// apps/web/src/lib/trpc.ts
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { AppRouter } from '@repo/api';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
          headers: () => {
            // Tenant ID'yi header'a ekle
            const tenantId = localStorage.getItem('tenantId');
            return tenantId ? { 'x-tenant-id': tenantId } : {};
          },
        }),
      ],
    };
  },
  ssr: false,
});
```

---

## 7️⃣ **ADIM: GÜVENLİK VE VERİ İZOLASYONU**

### 🛡️ **Multi-Tenant Güvenlik**

```typescript
// packages/api/src/middleware/tenant-isolation.ts
import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';

export const tenantIsolationMiddleware = middleware(async ({ ctx, next }) => {
  // JWT'den tenant ID'yi al
  const tenantId = ctx.session?.user?.tenantId;
  
  if (!tenantId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  // Context'e tenant ID'yi ekle
  return next({
    ctx: {
      ...ctx,
      tenantId,
    },
  });
});

// Tenant izolasyonu gerektiren prosedürler için kullan
export const tenantProtectedProcedure = protectedProcedure.use(tenantIsolationMiddleware);
```

### 🔒 **Veri Erişim Katmanı**

```typescript
// packages/db/src/client.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Tenant izolasyonu için wrapper
export const createTenantPrismaClient = (tenantId: string) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query, operation, model }) {
          // Tenant ID'yi otomatik olarak ekle
          if (args.data && typeof args.data === 'object') {
            args.data = { ...args.data, tenantId };
          }
          
          if (args.where && typeof args.where === 'object') {
            args.where = { ...args.where, tenantId };
          }
          
          return query(args);
        },
      },
    },
  });
};
```

### 🚫 **Güvenlik Kontrolleri**

```typescript
// packages/api/src/utils/security.ts
import { z } from 'zod';

// Güvenli string (XSS koruması)
export const safeString = z.string()
  .min(1, 'Boş string olamaz')
  .max(255, 'Maksimum 255 karakter')
  .regex(/^[a-zA-Z0-9\s\-_\.]+$/, 'Sadece alfanumerik karakterler, boşluk, tire, alt çizgi ve nokta');

// Güvenli URL
export const safeUrl = z.string()
  .url('Geçerli URL gerekli')
  .regex(/^https?:\/\//, 'URL http veya https ile başlamalı');

// Tenant ID doğrulama
export const validateTenantId = (tenantId: string): boolean => {
  return z.string().cuid().safeParse(tenantId).success;
};

// SQL Injection koruması
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>'"]/g, '');
};

// Rate limiting için basit implementasyon
export class RateLimiter {
  private requests = new Map<string, number[]>();
  private maxRequests = 100;
  private windowMs = 15 * 60 * 1000; // 15 dakika

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Eski istekleri temizle
    const recentRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }
}
```

---

## 8️⃣ **ADIM: TEST VE CI/CD PIPELINE**

### 🧪 **Test Stratejisi**

```typescript
// packages/api/src/routers/__tests__/tenants.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTenant } from '../tenants';
import { mockPrisma } from '../../../__mocks__/prisma';

describe('Tenant Router', () => {
  beforeEach(() => {
    mockPrisma.tenant.create.mockClear();
  });

  afterEach(() => {
    mockPrisma.tenant.create.mockReset();
  });

  it('should create tenant with valid data', async () => {
    const tenantData = {
      name: 'Test Restaurant',
      domain: 'test-restaurant',
    };

    mockPrisma.tenant.create.mockResolvedValue({
      id: 'tenant-1',
      ...tenantData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await createTenant(tenantData);

    expect(result.name).toBe('Test Restaurant');
    expect(result.domain).toBe('test-restaurant');
    expect(mockPrisma.tenant.create).toHaveBeenCalledWith({
      data: tenantData,
    });
  });

  it('should throw error for invalid domain', async () => {
    const tenantData = {
      name: 'Test Restaurant',
      domain: 'invalid domain with spaces',
    };

    await expect(createTenant(tenantData)).rejects.toThrow('Invalid domain format');
  });
});
```

### 🔄 **CI/CD Pipeline**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run tests
      run: npm run test
    
    - name: Build applications
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build applications
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 9️⃣ **ADIM: GÖZLEMLENEBİLİRLİK VE LOGGING**

### 📊 **Logging Sistemi**

```typescript
// packages/api/src/lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Yapısal loglama
export const logEvent = (event: string, data: any, context?: any) => {
  logger.info({
    event,
    data,
    context,
    timestamp: new Date().toISOString(),
  });
};

// Hata loglama
export const logError = (error: Error, context?: any) => {
  logger.error({
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    context,
    timestamp: new Date().toISOString(),
  });
};
```

### 🔍 **Sentry Entegrasyonu**

```typescript
// packages/api/src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app: true }),
  ],
});

// Hata yakalama
export const captureError = (error: Error, context: any) => {
  Sentry.captureException(error, {
    extra: {
      userId: context.userId,
      tenantId: context.tenantId,
      requestId: context.requestId,
      userAgent: context.userAgent,
    },
    tags: {
      environment: process.env.NODE_ENV,
      service: 'api',
    },
  });
};
```

### 📈 **Health Check Endpoint**

```typescript
// packages/api/src/routers/health.ts
import { router, publicProcedure } from '../trpc';
import { prisma } from '@repo/db';
import { supabase } from '../supabase';

export const healthRouter = router({
  check: publicProcedure.query(async () => {
    const checks = {
      database: false,
      supabase: false,
      trpc: true,
    };

    try {
      // Veritabanı bağlantısını kontrol et
      await prisma.$queryRaw`SELECT 1`;
      checks.database = true;
    } catch (error) {
      console.error('Database health check failed:', error);
    }

    try {
      // Supabase bağlantısını kontrol et
      const { data, error } = await supabase.from('health_check').select('*').limit(1);
      checks.supabase = !error;
    } catch (error) {
      console.error('Supabase health check failed:', error);
    }

    const isHealthy = Object.values(checks).every(Boolean);
    
    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      checks,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || 'unknown',
    };
  }),
});
```

---

## 🔟 **ADIM: ASENKRON İŞLER VE ARKA PLAN GÖREVLERİ**

### ⚡ **Background Job Sistemi**

```typescript
// packages/api/src/lib/jobs.ts
interface Job {
  id: string;
  type: 'email' | 'report' | 'image-processing' | 'notification';
  data: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
  error?: string;
}

// Job kuyruğu
export const queueJob = async (type: Job['type'], data: any): Promise<Job> => {
  const job = await prisma.job.create({
    data: {
      type,
      data: JSON.stringify(data),
      status: 'pending',
    },
  });
  
  return job;
};

// Job işleyici
export const processJobs = async () => {
  const pendingJobs = await prisma.job.findMany({
    where: { status: 'pending' },
    take: 10,
    orderBy: { createdAt: 'asc' },
  });

  for (const job of pendingJobs) {
    try {
      // Job'u işleme al
      await prisma.job.update({
        where: { id: job.id },
        data: { status: 'processing' },
      });

      // Job tipine göre işle
      await processJobByType(job);

      // Başarılı olarak işaretle
      await prisma.job.update({
        where: { id: job.id },
        data: { 
          status: 'completed',
          processedAt: new Date(),
        },
      });
    } catch (error) {
      // Hata durumunda işaretle
      await prisma.job.update({
        where: { id: job.id },
        data: { 
          status: 'failed',
          error: error.message,
        },
      });
    }
  }
};

// Job tipine göre işleme
const processJobByType = async (job: Job) => {
  const data = JSON.parse(job.data);
  
  switch (job.type) {
    case 'email':
      await sendEmail(data);
      break;
    case 'report':
      await generateReport(data);
      break;
    case 'image-processing':
      await processImage(data);
      break;
    case 'notification':
      await sendNotification(data);
      break;
    default:
      throw new Error(`Unknown job type: ${job.type}`);
  }
};
```

### 📧 **Email Servisi**

```typescript
// packages/api/src/services/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (data: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) => {
  try {
    const result = await transporter.sendMail({
      from: data.from || process.env.SMTP_FROM,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    logger.info({
      event: 'email_sent',
      messageId: result.messageId,
      to: data.to,
      subject: data.subject,
    });

    return result;
  } catch (error) {
    logger.error({
      event: 'email_failed',
      error: error.message,
      to: data.to,
      subject: data.subject,
    });
    throw error;
  }
};

// Email şablonları
export const emailTemplates = {
  welcome: (userName: string, tenantName: string) => ({
    subject: `Hoş geldiniz - ${tenantName}`,
    html: `
      <h1>Hoş geldiniz ${userName}!</h1>
      <p>${tenantName} ailesine katıldığınız için teşekkür ederiz.</p>
    `,
  }),
  
  orderConfirmation: (orderNumber: string, totalAmount: number) => ({
    subject: `Sipariş Onayı - ${orderNumber}`,
    html: `
      <h1>Siparişiniz Alındı</h1>
      <p>Sipariş numarası: ${orderNumber}</p>
      <p>Toplam tutar: ${totalAmount} TL</p>
    `,
  }),
};
```

---

## 📋 **TEMEL EKSİKLİKLER VE SONRAKI ADIMLAR**

### ❌ **Eksik Olan Temel Bileşenler:**

1. **🔐 Kimlik Doğrulama Sistemi**
   - JWT token yönetimi
   - Refresh token mekanizması
   - Password reset flow
   - Email verification

2. **📱 Frontend Uygulamaları**
   - Ana site (mainsite) implementasyonu
   - Süperadmin paneli
   - Tenant paneli
   - Tenant public sayfaları

3. **🎨 UI/UX Bileşenleri**
   - Design system
   - Responsive layout
   - Dark mode support
   - Accessibility (a11y)

4. **🗄️ Veritabanı Optimizasyonu**
   - İndeksler
   - Migration'lar
   - Seed data
   - Backup stratejisi

5. **🔒 Güvenlik Geliştirmeleri**
   - Rate limiting
   - CORS konfigürasyonu
   - Security headers
   - Input sanitization

6. **📊 Monitoring ve Analytics**
   - Performance monitoring
   - Error tracking
   - User analytics
   - Business metrics

7. **🚀 Deployment ve DevOps**
   - Docker containerization
   - Environment management
   - Staging environment
   - Production deployment

8. **📚 Dokümantasyon**
   - API dokümantasyonu
   - Kullanıcı kılavuzları
   - Geliştirici dokümantasyonu
   - Deployment guide

### ✅ **Sonraki Adımlar:**

1. **Hemen Yapılacaklar:**
   - [ ] JWT authentication sistemi kur
   - [ ] İlk frontend uygulamasını (mainsite) oluştur
   - [ ] Temel UI bileşenlerini geliştir
   - [ ] Veritabanı migration'larını çalıştır

2. **Kısa Vadeli (1-2 hafta):**
   - [ ] Süperadmin paneli
   - [ ] Tenant paneli
   - [ ] Email servisi
   - [ ] Temel güvenlik önlemleri

3. **Orta Vadeli (1 ay):**
   - [ ] Tüm frontend uygulamaları
   - [ ] Monitoring sistemi
   - [ ] CI/CD pipeline
   - [ ] Dokümantasyon

4. **Uzun Vadeli (2-3 ay):**
   - [ ] Performance optimizasyonu
   - [ ] Advanced security
   - [ ] Analytics sistemi
   - [ ] Microservice migration

---

## 🚀 **GELECEĞE HAZIR PROJE GELİŞTİRME: ÖNCELİKLİ KONULAR**

### 1. Veritabanı Şeması ve Tutarlı Migrasyonlar

**Önem Puanı: 100/100**

**Neden Bu Kadar Önemli?**
Veritabanı, uygulamanızın kalbidir ve şemanız da o kalbin anatomisidir. Kötü tasarlanmış bir veritabanı şeması, düzeltilmesi en zor ve en maliyetli teknik borçtur. Başlangıçta yapılan bir hata (yanlış ilişki, yanlış veri tipi, normalizasyon eksikliği), aylar sonra tüm kod tabanınızı etkileyen, performansı düşüren ve yeni özellik eklemeyi imkansız hale getiren bir kabusa dönüşebilir.

**Nasıl Yapılmalı?**

**Prisma'yı Disiplinli Kullan:**
```typescript
// prisma.schema dosyan senin tek doğruluk kaynağın (single source of truth) olmalı
// Veritabanında ASLA manuel değişiklik yapma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  tenantId  String   // Multi-tenant için ZORUNLU
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // İlişkiler doğru tanımlanmalı
  orders    Order[]
  profile   Profile?
}
```

**Migrasyonları Adet Edin:**
```bash
# Her şema değişikliği için
npx prisma migrate dev --name add_user_tenant_id

# Production'da
npx prisma migrate deploy
```

**İlişkileri Doğru Kur:**
```typescript
// One-to-many ilişki
model Category {
  id       String   @id @default(cuid())
  name     String
  products Product[] // Doğru ilişki tanımı
}

model Product {
  id         String   @id @default(cuid())
  name       String
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])
}
```

**Index'leri Stratejik Yerleştir:**
```typescript
model MenuItem {
  id       String   @id @default(cuid())
  name     String
  tenantId String
  menuId   String
  
  @@index([tenantId, menuId]) // Multi-tenant performans
  @@index([menuId, order])    // Sıralama performansı
}
```

**Veri Tiplerini Dikkatli Seç:**
```typescript
model Order {
  id        String   @id @default(cuid())
  total     Decimal  @db.Decimal(10, 2) // Para için Decimal
  status    OrderStatus // Enum kullan
  metadata  Json?    // Esnek veri için JSON
  createdAt DateTime @default(now())
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  DELIVERED
  CANCELLED
}
```

---

### 2. Modüler ve Domain Odaklı Kod Mimarisi

**Önem Puanı: 100/100**

**Neden Bu Kadar Önemli?**
Önceki cevabımda detaylandırdığım bu konu, mikroservise geçişin veya projenin yönetilebilir kalmasının temelidir. Eğer tüm kodların birbiriyle anlamsızca iç içe geçtiği "spagetti kod" bir yapı kurarsan, projeyi bölmek veya ölçeklendirmek imkansız hale gelir. Bu, kodun kendisidir.

**Nasıl Yapılmalı?**

**Domain-Driven Design (DDD) Prensiplerini Uygula:**
```typescript
// ❌ YANLIŞ: Tüm mantık tek dosyada
// pages/api/orders.ts - 500 satır kod

// ✅ DOĞRU: Domain'e göre ayrılmış
// packages/api/routers/orders/
// ├── index.ts          # Ana router
// ├── create.ts         # Sipariş oluşturma
// ├── update.ts         # Sipariş güncelleme
// ├── cancel.ts         # Sipariş iptal
// └── types.ts          # Domain tipleri
```

**Bounded Context'leri Net Ayır:**
```typescript
// packages/api/routers/
├── auth/           # Kimlik doğrulama domain'i
│   ├── login.ts
│   ├── register.ts
│   └── refresh.ts
├── orders/         # Sipariş domain'i
│   ├── create.ts
│   ├── update.ts
│   └── cancel.ts
├── menu/           # Menü domain'i
│   ├── categories.ts
│   ├── products.ts
│   └── templates.ts
└── tenant/         # Tenant yönetim domain'i
    ├── create.ts
    ├── settings.ts
    └── billing.ts
```

**Domain Mantığını Service Katmanında Topla:**
```typescript
// packages/api/services/orders/
export class OrderService {
  async createOrder(data: CreateOrderInput): Promise<Order> {
    // 1. Validasyon
    const validatedData = await this.validateOrderData(data);
    
    // 2. İş mantığı
    const order = await this.processOrderLogic(validatedData);
    
    // 3. Event gönderimi
    await this.emitOrderCreatedEvent(order);
    
    return order;
  }
  
  private async validateOrderData(data: CreateOrderInput) {
    // Domain validasyon kuralları
  }
  
  private async processOrderLogic(data: ValidatedOrderData) {
    // Karmaşık iş mantığı
  }
}
```

**Repository Pattern Kullan:**
```typescript
// packages/api/repositories/orders/
export class OrderRepository {
  async findById(id: string): Promise<Order | null> {
    return await prisma.order.findUnique({
      where: { id },
      include: { items: true, customer: true }
    });
  }
  
  async create(data: CreateOrderData): Promise<Order> {
    return await prisma.order.create({
      data,
      include: { items: true }
    });
  }
  
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true }
    });
  }
}
```

**Dependency Injection ile Bağımlılıkları Yönet:**
```typescript
// packages/api/containers/
export class OrderContainer {
  constructor(
    private orderService: OrderService,
    private orderRepository: OrderRepository,
    private eventBus: EventBus
  ) {}
  
  async createOrder(data: CreateOrderInput): Promise<Order> {
    return await this.orderService.createOrder(data);
  }
}
```

**Domain Event'leri Kullan:**
```typescript
// packages/api/events/orders/
export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly tenantId: string,
    public readonly total: number
  ) {}
}

// Event handler
export class OrderEventHandler {
  async handleOrderCreated(event: OrderCreatedEvent) {
    // 1. Stok güncelle
    await this.inventoryService.updateStock(event.orderId);
    
    // 2. Bildirim gönder
    await this.notificationService.sendOrderConfirmation(event.orderId);
    
    // 3. Analytics güncelle
    await this.analyticsService.trackOrderCreated(event);
  }
}
```

**Cross-Cutting Concerns'i Middleware'de Yönet:**
```typescript
// packages/api/middleware/
export const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const tenantMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.tenantId) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Tenant ID required' });
  }
  return next({ ctx: { ...ctx, tenantId: ctx.tenantId } });
});

// Kullanım
export const protectedProcedure = t.procedure
  .use(authMiddleware)
  .use(tenantMiddleware);
```

**Test Edilebilir Kod Yaz:**
```typescript
// packages/api/services/orders/__tests__/order-service.test.ts
describe('OrderService', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  
  beforeEach(() => {
    mockOrderRepository = createMockOrderRepository();
    orderService = new OrderService(mockOrderRepository);
  });
  
  it('should create order with valid data', async () => {
    const orderData = createValidOrderData();
    const expectedOrder = createExpectedOrder();
    
    mockOrderRepository.create.mockResolvedValue(expectedOrder);
    
    const result = await orderService.createOrder(orderData);
    
    expect(result).toEqual(expectedOrder);
    expect(mockOrderRepository.create).toHaveBeenCalledWith(orderData);
  });
});
```

**Monorepo Yapısını Kullan:**
```bash
packages/
├── api/              # tRPC API katmanı
├── ui/               # Paylaşılan UI bileşenleri
├── config/           # Ortak konfigürasyon
├── types/            # Paylaşılan TypeScript tipleri
└── utils/            # Ortak yardımcı fonksiyonlar
```

**API Gateway Pattern Uygula:**
```typescript
// packages/api/gateway/
export class ApiGateway {
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private menuService: MenuService
  ) {}
  
  async handleRequest(path: string, data: any) {
    // 1. Authentication
    const user = await this.authService.authenticate(data.token);
    
    // 2. Authorization
    await this.authService.authorize(user, path);
    
    // 3. Route to appropriate service
    switch (path) {
      case '/orders/create':
        return await this.orderService.createOrder(data);
      case '/menu/items':
        return await this.menuService.getItems(data);
      default:
        throw new Error('Route not found');
    }
  }
}
```

**Error Handling'i Merkezi Yönet:**
```typescript
// packages/api/errors/
export class DomainError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}

export class OrderNotFoundError extends DomainError {
  constructor(orderId: string) {
    super(`Order ${orderId} not found`, 'ORDER_NOT_FOUND', 404);
  }
}

// Global error handler
export const globalErrorHandler = (error: Error) => {
  if (error instanceof DomainError) {
    return {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode
    };
  }
  
  // Log unexpected errors
  logger.error('Unexpected error:', error);
  return {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500
  };
};
```

**Configuration Management:**
```typescript
// packages/config/
export const config = {
  database: {
    url: process.env.DATABASE_URL,
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10')
  },
  redis: {
    url: process.env.REDIS_URL,
    ttl: parseInt(process.env.REDIS_TTL || '3600')
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '86400')
  }
} as const;
```

**Logging ve Monitoring:**
```typescript
// packages/api/middleware/logging.ts
export const loggingMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const start = Date.now();
  
  try {
    const result = await next();
    const duration = Date.now() - start;
    
    logger.info('API Request', {
      path,
      type,
      duration,
      userId: ctx.user?.id,
      tenantId: ctx.tenantId
    });
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    
    logger.error('API Error', {
      path,
      type,
      duration,
      error: error.message,
      userId: ctx.user?.id,
      tenantId: ctx.tenantId
    });
    
    throw error;
  }
});
```

---

### 3. Güvenlik Temelleri ve Girdi Doğrulama

**Önem Puanı: 95/100**

**Neden Bu Kadar Önemli?**
Tek bir ciddi güvenlik açığı, projenizi ve itibarınızı bir gecede bitirebilir. Güvenlik, sonradan eklenecek bir "özellik" değil, en başından itibaren mimarinin bir parçası olması gereken bir disiplindir.

**Nasıl Yapılmalı?**

**Her Şeyi Doğrula (Never Trust User Input):**
```typescript
// packages/api/validations/
import { z } from 'zod';

// Kullanıcı girdisi validasyonu
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, 'Ürün ID gerekli'),
    quantity: z.number().min(1, 'Miktar en az 1 olmalı').max(100, 'Miktar çok yüksek'),
    price: z.number().positive('Fiyat pozitif olmalı')
  })).min(1, 'En az bir ürün gerekli'),
  customerId: z.string().min(1, 'Müşteri ID gerekli'),
  tenantId: z.string().min(1, 'Tenant ID gerekli')
});

// tRPC prosedüründe kullanım
export const createOrder = protectedProcedure
  .input(createOrderSchema)
  .mutation(async ({ input, ctx }) => {
    // Validasyon otomatik olarak yapıldı
    return await orderService.createOrder(input);
  });
```

**Yetkilendirmeyi Ciddiye Al:**
```typescript
// packages/api/middleware/auth.ts
export const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const token = ctx.req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  
  try {
    const user = await verifyJWT(token);
    return next({ ctx: { ...ctx, user } });
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});

// Tenant izolasyonu
export const tenantMiddleware = t.middleware(async ({ ctx, next }) => {
  const tenantId = ctx.req.headers['x-tenant-id'] as string;
  
  if (!tenantId) {
    throw new TRPCError({ 
      code: 'BAD_REQUEST', 
      message: 'Tenant ID gerekli' 
    });
  }
  
  // Kullanıcının bu tenant'a erişim yetkisi var mı?
  const hasAccess = await checkUserTenantAccess(ctx.user.id, tenantId);
  
  if (!hasAccess) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  
  return next({ ctx: { ...ctx, tenantId } });
});
```

**Row-Level Security (RLS) Politikaları:**
```sql
-- Supabase RLS politikaları
-- Kullanıcılar sadece kendi tenant'larının verilerini görebilir

-- Users tablosu için RLS
CREATE POLICY "Users can only access their own tenant data" ON users
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::text);

-- Orders tablosu için RLS
CREATE POLICY "Users can only access their tenant orders" ON orders
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::text);

-- Menus tablosu için RLS
CREATE POLICY "Users can only access their tenant menus" ON menus
  FOR ALL USING (tenant_id = current_setting('app.tenant_id')::text);
```

**SQL Injection Koruması:**
```typescript
// ❌ YANLIŞ: String concatenation
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ DOĞRU: Prisma prepared statements
const user = await prisma.user.findUnique({
  where: { email: email }
});

// ✅ DOĞRU: Raw SQL için parametre kullanımı
const users = await prisma.$queryRaw`
  SELECT * FROM users 
  WHERE tenant_id = ${tenantId} 
  AND created_at > ${startDate}
`;
```

**XSS ve CSRF Koruması:**
```typescript
// packages/api/middleware/security.ts
import helmet from 'helmet';

export const securityMiddleware = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.yemekzen.com"]
      }
    },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }),
  
  // CSRF koruması
  csrf({
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  })
];
```

**Rate Limiting:**
```typescript
// packages/api/middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına maksimum istek
  message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
  // Tenant bazlı rate limiting
  keyGenerator: (req) => {
    return `${req.ip}-${req.headers['x-tenant-id']}`;
  }
});

// Auth endpoint'leri için daha sıkı limit
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 15 dakikada maksimum 5 login denemesi
  message: 'Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.'
});
```

**Sırları Güvende Tut:**
```typescript
// packages/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, 'JWT secret en az 32 karakter olmalı'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  REDIS_URL: z.string().url(),
  SENTRY_DSN: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test'])
});

// Environment variables'ları validate et
export const env = envSchema.parse(process.env);

// Hassas bilgileri log'da gösterme
logger.info('Database connected', {
  url: env.DATABASE_URL.replace(/\/\/.*@/, '//***:***@') // Password'ü maskele
});
```

**Audit Logging:**
```typescript
// packages/api/services/audit/
export class AuditService {
  async logSecurityEvent(event: SecurityEvent) {
    await prisma.auditLog.create({
      data: {
        userId: event.userId,
        tenantId: event.tenantId,
        action: event.action,
        resource: event.resource,
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
        success: event.success,
        metadata: event.metadata
      }
    });
  }
  
  async logFailedLogin(email: string, ipAddress: string) {
    await this.logSecurityEvent({
      action: 'LOGIN_FAILED',
      resource: 'auth',
      ipAddress,
      metadata: { email },
      success: false
    });
  }
}
```

**Input Sanitization:**
```typescript
// packages/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  });
};

export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // HTML tag'lerini kaldır
    .replace(/javascript:/gi, '') // JavaScript protokolünü kaldır
    .substring(0, 1000); // Maksimum uzunluk
};
```

**Session Güvenliği:**
```typescript
// packages/api/services/auth/
export class SessionService {
  async createSession(userId: string, tenantId: string): Promise<Session> {
    const session = await prisma.session.create({
      data: {
        userId,
        tenantId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 saat
        ipAddress: getClientIP(),
        userAgent: getUserAgent()
      }
    });
    
    return session;
  }
  
  async validateSession(sessionId: string): Promise<Session | null> {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true }
    });
    
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    
    // IP değişikliği kontrolü (opsiyonel)
    if (session.ipAddress !== getClientIP()) {
      await this.logSuspiciousActivity(session);
    }
    
    return session;
  }
}
```

**Error Handling Güvenliği:**
```typescript
// packages/api/errors/
export class SecurityError extends Error {
  constructor(
    message: string,
    public code: string,
    public shouldLog: boolean = true
  ) {
    super(message);
  }
}

// Global error handler
export const globalErrorHandler = (error: Error, req: Request, res: Response) => {
  // Hassas bilgileri log'da gösterme
  if (error instanceof SecurityError) {
    logger.warn('Security event', {
      code: error.code,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    return res.status(403).json({
      error: 'Access denied',
      code: error.code
    });
  }
  
  // Genel hatalar için generic mesaj
  logger.error('Unexpected error', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    userId: req.user?.id
  });
  
  return res.status(500).json({
    error: 'Internal server error'
  });
};
```

---

## 🎯 **SONUÇ**

Bu rehber, YemekZen projesinin **sağlam temellerini** atmanızı sağlar. Her adım, bir sonraki adımın temelini oluşturur ve projenin **ölçeklenebilir** ve **sürdürülebilir** olmasını garanti eder.

> **💡 Anahtar Mesaj:** Mikroservis değil, **sağlam temeller** projenizi başarıya götürür!

---

*Son güncelleme: 3 Ağustos 2025*