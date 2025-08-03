import Redis from 'ioredis';

// Redis client konfigürasyonu
export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
});

// Redis bağlantı event handlers
redis.on('connect', () => {
  console.log('✅ Redis bağlantısı başarılı');
});

redis.on('error', (error) => {
  console.error('❌ Redis bağlantı hatası:', error);
});

redis.on('close', () => {
  console.log('🔌 Redis bağlantısı kapandı');
});

// Cache service sınıfı
export class CacheService {
  private static instance: CacheService;
  private redis: Redis;

  private constructor() {
    this.redis = redis;
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Genel cache işlemleri
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get hatası:', error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.redis.setex(key, ttl, serializedValue);
      } else {
        await this.redis.set(key, serializedValue);
      }
    } catch (error) {
      console.error('Cache set hatası:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache delete hatası:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists hatası:', error);
      return false;
    }
  }

  // Rate limiting işlemleri
  async checkRateLimit(identifier: string, limit: number, window: number): Promise<boolean> {
    try {
      const key = `rate_limit:${identifier}`;
      const current = await this.redis.incr(key);
      
      if (current === 1) {
        await this.redis.expire(key, window);
      }
      
      return current <= limit;
    } catch (error) {
      console.error('Rate limit hatası:', error);
      return true; // Hata durumunda erişime izin ver
    }
  }

  // Session management
  async setSession(sessionId: string, sessionData: unknown, ttl: number = 3600): Promise<void> {
    await this.set(`session:${sessionId}`, sessionData, ttl);
  }

  async getSession(sessionId: string): Promise<unknown | null> {
    return await this.get(`session:${sessionId}`);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.delete(`session:${sessionId}`);
  }

  // Menu cache işlemleri
  async cacheMenu(restaurantId: string, menuData: unknown, ttl: number = 3600): Promise<void> {
    await this.set(`menu:${restaurantId}`, menuData, ttl);
  }

  async getCachedMenu(restaurantId: string): Promise<unknown | null> {
    return await this.get(`menu:${restaurantId}`);
  }

  async invalidateMenu(restaurantId: string): Promise<void> {
    await this.delete(`menu:${restaurantId}`);
  }

  // Popular products cache
  async cachePopularProducts(products: unknown[], ttl: number = 3600): Promise<void> {
    await this.set('popular_products', products, ttl);
  }

  async getCachedPopularProducts(): Promise<unknown[] | null> {
    return await this.get('popular_products');
  }

  // Real-time counters
  async incrementCounter(key: string, value: number = 1): Promise<number> {
    try {
      return await this.redis.incrby(`counter:${key}`, value);
    } catch (error) {
      console.error('Counter increment hatası:', error);
      return 0;
    }
  }

  async getCounter(key: string): Promise<number> {
    try {
      const value = await this.redis.get(`counter:${key}`);
      return value ? parseInt(value) : 0;
    } catch (error) {
      console.error('Counter get hatası:', error);
      return 0;
    }
  }

  // Queue operations (basit implementasyon)
  async enqueue(queueName: string, data: unknown): Promise<void> {
    try {
      await this.redis.lpush(`queue:${queueName}`, JSON.stringify(data));
    } catch (error) {
      console.error('Queue enqueue hatası:', error);
    }
  }

  async dequeue(queueName: string): Promise<unknown | null> {
    try {
      const data = await this.redis.rpop(`queue:${queueName}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Queue dequeue hatası:', error);
      return null;
    }
  }

  // Temporary data (verification codes, etc.)
  async setTemporaryData(key: string, data: unknown, ttl: number = 600): Promise<void> {
    await this.set(`temp:${key}`, data, ttl);
  }

  async getTemporaryData(key: string): Promise<unknown | null> {
    return await this.get(`temp:${key}`);
  }

  // Cache statistics
  async getStats(): Promise<{ keys: number; memory: string }> {
    try {
      const info = await this.redis.info('memory');
      const keys = await this.redis.dbsize();
      
      // Memory usage parsing
      const usedMemory = info.match(/used_memory_human:(\S+)/)?.[1] || '0B';
      
      return {
        keys,
        memory: usedMemory
      };
    } catch (error) {
      console.error('Stats hatası:', error);
      return { keys: 0, memory: '0B' };
    }
  }

  // Cache cleanup
  async cleanup(): Promise<void> {
    try {
      // Expired keys'leri temizle
      await this.redis.eval(`
        local keys = redis.call('keys', 'temp:*')
        for i=1,#keys do
          local ttl = redis.call('ttl', keys[i])
          if ttl == -1 then
            redis.call('del', keys[i])
          end
        end
        return #keys
      `, 0);
    } catch (error) {
      console.error('Cleanup hatası:', error);
    }
  }
}

// Singleton instance export
export const cacheService = CacheService.getInstance();

// Utility functions
export const cacheUtils = {
  // Key generators
  generateMenuKey: (restaurantId: string) => `menu:${restaurantId}`,
  generateSessionKey: (sessionId: string) => `session:${sessionId}`,
  generateRateLimitKey: (identifier: string) => `rate_limit:${identifier}`,
  generateCounterKey: (key: string) => `counter:${key}`,
  generateTempKey: (key: string) => `temp:${key}`,
  
  // TTL constants
  TTL: {
    SHORT: 300,      // 5 dakika
    MEDIUM: 1800,    // 30 dakika
    LONG: 3600,      // 1 saat
    VERY_LONG: 86400 // 24 saat
  }
}; 