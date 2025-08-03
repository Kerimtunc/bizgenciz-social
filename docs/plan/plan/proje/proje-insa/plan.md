# 🚀 YemekZen QR Menu Elite Edition - Teknoloji Stack Planı

## 📋 Teknoloji Kullanım Matrisi

### 🎯 **Ana Teknolojiler ve Kullanım Senaryoları**

#### **1. Frontend Framework & UI**
| Teknoloji | Kullanım Alanı | Ne Zaman Kullan | Alternatif/Üstünlük |
|-----------|----------------|-----------------|---------------------|
| **Next.js 15** | Ana framework | Her zaman | React 19 ile tam uyumlu, SSR/SSG |
| **React 19** | UI kütüphanesi | Her zaman | En son kararlı sürüm |
| **TypeScript** | Tip güvenliği | Her zaman | Tüm kod dosyalarında |
| **Tailwind CSS** | Styling | Her zaman | Utility-first, responsive |
| **Shadcn/ui** | UI component'leri | Her zaman | Radix tabanlı, accessible |

#### **2. State Management & Data Flow**
| Teknoloji | Kullanım Alanı | Ne Zaman Kullan | Alternatif/Üstünlük |
|-----------|----------------|-----------------|---------------------|
| **Zustand** | Client state | Karmaşık client state | Redux'tan hafif, TypeScript uyumlu |
| **tRPC** | API communication | Her zaman | End-to-end type safety |
| **Zod** | Validation | Her zaman | Runtime type validation |

#### **3. Database & ORM**
| Teknoloji | Kullanım Alanı | Ne Zaman Kullan | Alternatif/Üstünlük |
|-----------|----------------|-----------------|---------------------|
| **Prisma** | ORM | Her zaman | Type-safe, migration yönetimi |
| **Supabase** | BaaS platform | Auth, real-time, storage | PostgreSQL + real-time features |
| **Redis** | Cache & Session | Yüksek performans gerektiğinde | Supabase'in yapamadığı işlemler |

#### **4. Testing & Quality**
| Teknoloji | Kullanım Alanı | Ne Zaman Kullan | Alternatif/Üstünlük |
|-----------|----------------|-----------------|---------------------|
| **Jest** | Unit testing | Her zaman | React testing library ile |
| **Playwright** | E2E testing | Her zaman | Cross-browser testing |
| **ESLint** | Code quality | Her zaman | TypeScript + React rules |

#### **5. Monitoring & Error Handling**
| Teknoloji | Kullanım Alanı | Ne Zaman Kullan | Alternatif/Üstünlük |
|-----------|----------------|-----------------|---------------------|
| **Sentry** | Error tracking | Production | Real-time error monitoring |
| **Axios** | HTTP client | External API calls | Interceptor desteği |

#### **6. 3D & Advanced UI**
| Teknoloji | Kullanım Alanı | Ne Zaman Kullan | Alternatif/Üstünlük |
|-----------|----------------|-----------------|---------------------|
| **Three.js** | 3D graphics | Ürün showcase | WebGL tabanlı |
| **Tauri** | Desktop app | Gerekirse | Electron alternatifi |

---

## 🔄 **Teknoloji Entegrasyon Senaryoları**

### **Senaryo 1: Supabase + Redis Hibrit Mimarisi**

#### **Supabase Kullanım Alanları:**
```typescript
// ✅ Supabase ile yapılacaklar
- Kullanıcı authentication (auth.users)
- Gerçek zamanlı veri (realtime subscriptions)
- Dosya storage (storage.buckets)
- Ana veritabanı tabloları (public schema)
- Row Level Security (RLS policies)
```

#### **Redis Kullanım Alanları:**
```typescript
// ✅ Redis ile yapılacaklar
- Session management (JWT token cache)
- Rate limiting (IP-based throttling)
- Cache layer (frequently accessed data)
- Queue system (email sending, notifications)
- Real-time counters (view counts, likes)
- Temporary data (verification codes)
```

#### **Hibrit Mimarisi Örneği:**
```typescript
// lib/cache/redis.ts
export class CacheService {
  // Popüler ürünler cache'i (1 saat)
  async cachePopularProducts() {
    const products = await prisma.product.findMany({
      where: { isPopular: true }
    });
    await redis.setex('popular_products', 3600, JSON.stringify(products));
  }

  // Rate limiting
  async checkRateLimit(userId: string): Promise<boolean> {
    const key = `rate_limit:${userId}`;
    const current = await redis.incr(key);
    if (current === 1) await redis.expire(key, 60); // 1 dakika
    return current <= 100; // 100 request/dakika
  }

  // Session cache
  async cacheUserSession(userId: string, session: any) {
    await redis.setex(`session:${userId}`, 3600, JSON.stringify(session));
  }
}
```

### **Senaryo 2: State Management Hiyerarşisi**

#### **Zustand Store Yapısı:**
```typescript
// lib/store/cart-store.ts
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// lib/store/auth-store.ts
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
```

#### **tRPC Router Yapısı:**
```typescript
// lib/trpc/routers/menu.ts
export const menuRouter = router({
  getMenu: publicProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ input }) => {
      return await menuService.getMenu(input.restaurantId);
    }),
  
  createOrder: protectedProcedure
    .input(z.object({ items: z.array(z.object({ id: z.string(), quantity: z.number() })) }))
    .mutation(async ({ input, ctx }) => {
      return await orderService.createOrder(input, ctx.user.id);
    })
});
```

### **Senaryo 3: Testing Stratejisi**

#### **Jest Unit Tests:**
```typescript
// __tests__/services/menu-service.test.ts
describe('MenuService', () => {
  it('should return menu items for restaurant', async () => {
    const menu = await menuService.getMenu('restaurant-1');
    expect(menu).toHaveLength(10);
    expect(menu[0]).toHaveProperty('name');
  });
});
```

#### **Playwright E2E Tests:**
```typescript
// tests/e2e/order-flow.spec.ts
test('complete order flow', async ({ page }) => {
  await page.goto('/menu');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
});
```

---

## 🎯 **Teknoloji Seçim Kriterleri**

### **1. Supabase vs Redis Kullanım Kararı**

#### **Supabase Kullan:**
- ✅ Kullanıcı authentication
- ✅ Gerçek zamanlı veri (realtime)
- ✅ Dosya upload/download
- ✅ Ana veritabanı işlemleri
- ✅ Row Level Security gerektiğinde

#### **Redis Kullan:**
- ✅ Yüksek performans gerektiğinde
- ✅ Geçici veri saklama
- ✅ Rate limiting
- ✅ Session management
- ✅ Queue system
- ✅ Cache layer

### **2. State Management Kararı**

#### **Zustand Kullan:**
- ✅ Client-side state management
- ✅ Form state
- ✅ UI state (modal, sidebar)
- ✅ Cart state
- ✅ User preferences

#### **tRPC Kullan:**
- ✅ Server-client communication
- ✅ API endpoints
- ✅ Database operations
- ✅ External API calls

### **3. Testing Stratejisi**

#### **Jest Kullan:**
- ✅ Unit tests
- ✅ Service layer tests
- ✅ Utility function tests
- ✅ Component tests (React Testing Library)

#### **Playwright Kullan:**
- ✅ E2E tests
- ✅ User flow tests
- ✅ Cross-browser testing
- ✅ Visual regression tests

---

## 🚀 **Implementasyon Sırası**

### **Faz 1: Temel Altyapı (1-2 hafta)**
1. **Next.js 15 + React 19** kurulumu ✅
2. **TypeScript** konfigürasyonu ✅
3. **Tailwind CSS + Shadcn/ui** kurulumu
4. **Prisma + Supabase** bağlantısı
5. **tRPC** router kurulumu

### **Faz 2: State Management (1 hafta)**
1. **Zustand** store'ları oluşturma
2. **tRPC** router'ları tanımlama
3. **Zod** schema'ları oluşturma

### **Faz 3: Cache & Performance (1 hafta)**
1. **Redis** kurulumu ve konfigürasyonu
2. **Cache service** implementasyonu
3. **Rate limiting** sistemi

### **Faz 4: Testing & Quality (1 hafta)**
1. **Jest** test setup'ı
2. **Playwright** E2E test setup'ı
3. **ESLint** konfigürasyonu

### **Faz 5: Monitoring & Deployment (1 hafta)**
1. **Sentry** entegrasyonu
2. **CI/CD** pipeline kurulumu
3. **Production** deployment

---

## 📊 **Performans Hedefleri**

### **Frontend Performance:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### **Backend Performance:**
- **API Response Time:** < 200ms
- **Database Query Time:** < 100ms
- **Cache Hit Rate:** > 80%

### **Testing Coverage:**
- **Unit Test Coverage:** > 80%
- **E2E Test Coverage:** > 70%
- **TypeScript Coverage:** 100%

---

## 🔧 **Teknoloji Konfigürasyon Örnekleri**

### **Redis Cache Konfigürasyonu:**
```typescript
// lib/redis.ts
import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
});
```

### **Supabase + Redis Hibrit Service:**
```typescript
// lib/services/hybrid-service.ts
export class HybridService {
  async getMenuWithCache(restaurantId: string) {
    // Önce cache'e bak
    const cached = await redis.get(`menu:${restaurantId}`);
    if (cached) return JSON.parse(cached);

    // Cache'de yoksa Supabase'den al
    const menu = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId);

    // Cache'e kaydet (1 saat)
    await redis.setex(`menu:${restaurantId}`, 3600, JSON.stringify(menu.data));
    
    return menu.data;
  }
}
```

---

## 🌍 **İdeal Deployment Mimarisi**

### **🎯 Optimize Edilmiş Coğrafi Dağılım**

#### **1. Ana Uygulama Sunucusu - Hetzner (Almanya)**
```yaml
# docker-compose.prod.yml
services:
  app:
    image: yemekzen-app:latest
    environment:
      - NODE_ENV=production
      - REDIS_HOST=redis
      - SUPABASE_URL=${SUPABASE_URL}
    ports:
      - "3000:3000"
    depends_on:
      - redis
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
  
  redis:
    image: redis:7.2-alpine
    volumes:
      - redis_data:/data
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    environment:
      - REDIS_MAXMEMORY=1gb
      - REDIS_MAXMEMORY_POLICY=allkeys-lru
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

**Avantajları:**
- ✅ Türkiye'ye en yakın güçlü sunucu
- ✅ Fiyat/performans optimizasyonu
- ✅ Redis ile aynı sunucuda (latency ≈ 1ms)
- ✅ Docker containerization
- ✅ Resource limits ile maliyet kontrolü

#### **2. Veritabanı - Supabase (Zürih)**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Sadece core database işlemleri için kullan
export const supabaseService = {
  // Authentication
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // File storage
  async uploadFile(bucket: string, path: string, file: File) {
    return await supabase.storage.from(bucket).upload(path, file);
  },

  // Core database operations
  async getMenuItems() {
    return await supabase.from('menu_items').select('*');
  }
};
```

**Kullanım Alanları:**
- ✅ Kullanıcı authentication
- ✅ Dosya storage (resimler, PDF'ler)
- ✅ Ana veritabanı tabloları
- ✅ Row Level Security (RLS)

#### **3. CDN - Cloudflare/Fastly/Vercel (Edge)**
```typescript
// next.config.js - CDN Optimizasyonu
const nextConfig = {
  // Static asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.yemekzen.com' : '',
  
  // Image optimization
  images: {
    domains: ['cdn.yemekzen.com', 'supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Edge functions for API
  experimental: {
    edgeFunctions: true,
  }
};

// Edge API Route örneği
// app/api/edge/menu/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // Türkiye'ye yakın edge location'da çalışır
  const menu = await fetch('https://hetzner.yemekzen.com/api/menu');
  return Response.json(await menu.json());
}
```

**CDN Avantajları:**
- ✅ Statik dosyalar Türkiye'ye yakın cache'lenir
- ✅ Edge functions ile "ön API" katmanı
- ✅ DDoS koruması
- ✅ SSL/TLS termination
- ✅ Gzip/Brotli compression

### **🔄 Veri Akış Mimarisi**

#### **1. Cache-First Stratejisi**
```typescript
// lib/services/hybrid-service.ts
export class HybridService {
  async getMenuWithCache(categoryId?: string) {
    const cacheKey = categoryId || 'all_menu';
    
    // 1. Redis cache'e bak (Hetzner'de, latency ≈ 1ms)
    const cached = await redis.get(`menu:${cacheKey}`);
    if (cached) {
      console.log('📦 Cache hit from Hetzner Redis');
      return JSON.parse(cached);
    }

    // 2. Cache miss - Supabase'den al (Zürih, latency ≈ 50ms)
    console.log('🔍 Cache miss, fetching from Supabase Zurich');
    const menu = await supabase
      .from('menu_items')
      .select('*')
      .eq('category_id', categoryId);

    // 3. Redis'e cache'le (1 saat)
    await redis.setex(`menu:${cacheKey}`, 3600, JSON.stringify(menu.data));
    
    return menu.data;
  }
}
```

#### **2. Rate Limiting & Session Management**
```typescript
// lib/middleware/rate-limit.ts
export async function rateLimitMiddleware(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const key = `rate_limit:${ip}`;
  
  // Redis'te rate limiting (Hetzner'de, çok hızlı)
  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, 60);
  
  if (current > 100) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
}

// Session management
export async function getSession(sessionId: string) {
  // Redis'te session (Hetzner'de, latency ≈ 1ms)
  return await redis.get(`session:${sessionId}`);
}
```

### **📊 Performans Metrikleri**

#### **Latency Hedefleri:**
- **Redis Cache Hit:** < 5ms (Hetzner'de)
- **Supabase Database:** < 100ms (Zürih'ten)
- **CDN Static Assets:** < 50ms (Edge'den)
- **Edge API:** < 30ms (Türkiye'ye yakın)

#### **Throughput Hedefleri:**
- **Redis Operations:** 10,000+ ops/sec
- **API Requests:** 1,000+ req/sec
- **Static Assets:** 100+ MB/sec

### **🔧 Deployment Konfigürasyonu**

#### **Docker Compose Production:**
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    ports:
      - "3000:3000"
    depends_on:
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'

  redis:
    image: redis:7.2-alpine
    volumes:
      - redis_data:/data
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    environment:
      - REDIS_MAXMEMORY=1gb
      - REDIS_MAXMEMORY_POLICY=allkeys-lru
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
        reservations:
          memory: 512M
          cpus: '0.25'

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app
    restart: unless-stopped

volumes:
  redis_data:
```

#### **Nginx Reverse Proxy:**
```nginx
# nginx/nginx.conf
upstream app {
    server app:3000;
}

server {
    listen 80;
    server_name yemekzen.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yemekzen.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### **🚀 Migration Stratejisi**

#### **Faz 1: Hetzner'e Geçiş (1 hafta)**
1. **Hetzner Cloud Server** kurulumu
2. **Docker & Docker Compose** kurulumu
3. **Redis** konfigürasyonu
4. **Nginx** reverse proxy kurulumu
5. **SSL sertifikası** kurulumu

#### **Faz 2: CDN Entegrasyonu (3-5 gün)**
1. **Cloudflare** hesap kurulumu
2. **DNS** yönetimi
3. **Edge functions** kurulumu
4. **Cache rules** konfigürasyonu
5. **Performance testing**

#### **Faz 3: Monitoring & Optimization (1 hafta)**
1. **Sentry** error tracking
2. **Redis monitoring** (RedisInsight)
3. **Performance metrics** toplama
4. **Load testing**
5. **Optimization** ayarlamaları

Bu mimari, Türkiye'deki kullanıcılar için maksimum performans sağlarken, maliyetleri de optimize eder. Hetzner'in güçlü altyapısı ve uygun fiyatları, Supabase'in güvenilir BaaS hizmetleri ve CDN'in edge caching özellikleri birleşerek mükemmel bir deployment çözümü oluşturur.
