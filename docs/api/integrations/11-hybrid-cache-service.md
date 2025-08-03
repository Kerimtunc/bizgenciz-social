# 🔄 Hybrid Cache Service - Gelişmiş Önbellek Sistemi

## 📋 Özellikler
- **Redis + Supabase Entegrasyonu**: Hibrit cache stratejisi
- **Intelligent Caching**: Akıllı cache yönetimi
- **Rate Limiting**: API hız sınırlama sistemi
- **Session Management**: Kullanıcı oturum yönetimi
- **Queue System**: Background job kuyruğu
- **Cache Invalidation**: Otomatik cache temizleme
- **Performance Monitoring**: Cache performans izleme

## 🎯 Kullanım Alanları
- E-ticaret menü cache'i
- Kullanıcı oturum yönetimi
- API rate limiting
- Background job processing
- Veri önbellekleme
- Performans optimizasyonu

## 💡 En Etkileyici Özellikler

### 1. Singleton Pattern Implementation
```typescript
export class HybridService {
  private static instance: HybridService;

  private constructor() {}

  public static getInstance(): HybridService {
    if (!HybridService.instance) {
      HybridService.instance = new HybridService();
    }
    return HybridService.instance;
  }
}
```

### 2. Intelligent Menu Caching
```typescript
async getMenuWithCache(categoryId?: string) {
  try {
    const cacheKey = categoryId || 'all_menu';
    
    // 1. Cache'den kontrol et
    const cachedMenu = await cacheService.getCachedMenu(cacheKey);
    if (cachedMenu) {
      console.log(`📦 Menu cache hit: ${cacheKey}`);
      return cachedMenu;
    }

    // 2. Cache'de yoksa veritabanından al
    console.log(`🔍 Menu cache miss: ${cacheKey}, fetching from database...`);
    const menuItems = await prisma.product.findMany({
      where: {
        isAvailable: true,
        ...(categoryId && { categoryId })
      },
      include: {
        category: true
      },
      orderBy: [
        { category: { sortOrder: 'asc' } },
        { sortOrder: 'asc' }
      ]
    });

    // 3. Cache'e kaydet (1 saat)
    await cacheService.cacheMenu(cacheKey, menuItems, cacheUtils.TTL.LONG);
    console.log(`💾 Menu cached: ${cacheKey}`);

    return menuItems;
  } catch (error) {
    console.error('Menu get hatası:', error);
    throw error;
  }
}
```

### 3. Advanced Rate Limiting
```typescript
async checkApiRateLimit(identifier: string, limit: number = 100, window: number = 60): Promise<boolean> {
  try {
    const key = `rate_limit:api:${identifier}`;
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, window);
    }
    
    const isAllowed = current <= limit;
    
    if (!isAllowed) {
      console.log(`🚫 Rate limit exceeded for: ${identifier}`);
    }
    
    return isAllowed;
  } catch (error) {
    console.error('Rate limit check hatası:', error);
    return true; // Hata durumunda erişime izin ver
  }
}
```

### 4. Session Management with TTL
```typescript
async setUserSession(sessionId: string, userData: unknown) {
  try {
    const sessionKey = `session:${sessionId}`;
    await this.redis.setex(sessionKey, 3600, JSON.stringify(userData)); // 1 saat TTL
    console.log(`🔐 Session created: ${sessionId}`);
  } catch (error) {
    console.error('Session set hatası:', error);
    throw error;
  }
}

async getUserSession(sessionId: string) {
  try {
    const sessionKey = `session:${sessionId}`;
    const sessionData = await this.redis.get(sessionKey);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Session get hatası:', error);
    return null;
  }
}
```

### 5. Background Job Queue System
```typescript
async enqueueEmailJob(emailData: {
  to: string;
  subject: string;
  template: string;
  data: unknown;
}) {
  try {
    const jobData = {
      type: 'email',
      data: emailData,
      timestamp: new Date().toISOString(),
      retries: 0
    };
    
    await this.redis.lpush('email_queue', JSON.stringify(jobData));
    console.log(`📧 Email job queued for: ${emailData.to}`);
  } catch (error) {
    console.error('Email job queue hatası:', error);
    throw error;
  }
}

async enqueueNotificationJob(notificationData: {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: unknown;
}) {
  try {
    const jobData = {
      type: 'notification',
      data: notificationData,
      timestamp: new Date().toISOString(),
      retries: 0
    };
    
    await this.redis.lpush('notification_queue', JSON.stringify(jobData));
    console.log(`🔔 Notification job queued for user: ${notificationData.userId}`);
  } catch (error) {
    console.error('Notification job queue hatası:', error);
    throw error;
  }
}
```

### 6. Cache Statistics & Monitoring
```typescript
async getCacheStats() {
  try {
    const stats = await this.redis.info('memory');
    const keys = await this.redis.dbsize();
    
    return {
      keys,
      memory: stats,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Cache stats hatası:', error);
    return null;
  }
}

async cleanupCache() {
  try {
    // Eski session'ları temizle
    const sessionKeys = await this.redis.keys('session:*');
    const expiredSessions = sessionKeys.filter(key => {
      const ttl = this.redis.ttl(key);
      return ttl === -1; // TTL yoksa temizle
    });
    
    if (expiredSessions.length > 0) {
      await this.redis.del(...expiredSessions);
      console.log(`🧹 Cleaned up ${expiredSessions.length} expired sessions`);
    }
  } catch (error) {
    console.error('Cache cleanup hatası:', error);
  }
}
```

## 🚀 Performans Optimizasyonları
- **Lazy Loading**: İhtiyaç duyulduğunda cache
- **TTL Management**: Otomatik süre yönetimi
- **Connection Pooling**: Redis bağlantı havuzu
- **Error Recovery**: Hata durumunda fallback
- **Memory Optimization**: Bellek kullanımı optimizasyonu

## 📱 Monitoring & Analytics
- **Cache Hit/Miss Ratio**: Cache performans oranları
- **Memory Usage**: Bellek kullanım izleme
- **Queue Monitoring**: Kuyruk durumu izleme
- **Error Tracking**: Hata takip sistemi
- **Performance Metrics**: Performans metrikleri

## 🔧 Configuration Options
- **TTL Settings**: Cache süre ayarları
- **Rate Limit Config**: Hız sınırı yapılandırması
- **Queue Settings**: Kuyruk ayarları
- **Connection Config**: Bağlantı yapılandırması
- **Retry Logic**: Yeniden deneme mantığı 