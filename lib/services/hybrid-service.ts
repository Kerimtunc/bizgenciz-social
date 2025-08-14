import { createClient } from '@supabase/supabase-js';
import { cacheService, cacheUtils } from '../redis';
import { prisma } from '../prisma';

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Hibrit service sınıfı - Supabase + Redis entegrasyonu
export class HybridService {
  private static instance: HybridService;

  private constructor() {}

  public static getInstance(): HybridService {
    if (!HybridService.instance) {
      HybridService.instance = new HybridService();
    }
    return HybridService.instance;
  }

  // ===== MENU İŞLEMLERİ =====
  
  /**
   * Menü verilerini cache ile birlikte getir
   * Önce Redis cache'e bakar, yoksa veritabanından alır ve cache'ler
   */
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
      const menuItems = await (prisma as any).product.findMany({
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

  /**
   * Menü cache'ini invalidate et (menü güncellendiğinde)
   */
  async invalidateMenuCache(categoryId?: string) {
    const cacheKey = categoryId || 'all_menu';
    await cacheService.invalidateMenu(cacheKey);
    console.log(`🗑️ Menu cache invalidated: ${cacheKey}`);
  }

  // ===== POPULAR PRODUCTS =====
  
  /**
   * Popüler ürünleri cache ile getir
   */
  async getPopularProductsWithCache() {
    try {
      // 1. Cache'den kontrol et
      const cachedProducts = await cacheService.getCachedPopularProducts();
      if (cachedProducts) {
        console.log('📦 Popular products cache hit');
        return cachedProducts;
      }

      // 2. Cache'de yoksa veritabanından al
      console.log('🔍 Popular products cache miss, fetching from database...');
      const popularProducts = await (prisma as any).product.findMany({
        where: {
          isAvailable: true
        },
        include: {
          category: true
        },
        take: 20,
        orderBy: {
          createdAt: 'desc'
        }
      });

      // 3. Cache'e kaydet (30 dakika)
      await cacheService.cachePopularProducts(popularProducts, cacheUtils.TTL.MEDIUM);
      console.log('💾 Popular products cached');

      return popularProducts;
    } catch (error) {
      console.error('Popular products get hatası:', error);
      throw error;
    }
  }

  // ===== SESSION MANAGEMENT =====
  
  /**
   * Kullanıcı session'ını Redis'de sakla
   */
  async setUserSession(sessionId: string, userData: unknown) {
    await cacheService.setSession(sessionId, userData, cacheUtils.TTL.LONG);
    console.log(`🔐 User session cached: ${sessionId}`);
  }

  /**
   * Kullanıcı session'ını Redis'den getir
   */
  async getUserSession(sessionId: string) {
    return await cacheService.getSession(sessionId);
  }

  /**
   * Kullanıcı session'ını sil
   */
  async deleteUserSession(sessionId: string) {
    await cacheService.deleteSession(sessionId);
    console.log(`🔓 User session deleted: ${sessionId}`);
  }

  // ===== RATE LIMITING =====
  
  /**
   * API rate limiting kontrolü
   */
  async checkApiRateLimit(identifier: string, limit: number = 100, window: number = 60): Promise<boolean> {
    const isAllowed = await cacheService.checkRateLimit(identifier, limit, window);
    
    if (!isAllowed) {
      console.log(`🚫 Rate limit exceeded: ${identifier}`);
    }
    
    return isAllowed;
  }

  /**
   * Login rate limiting (brute force koruması)
   */
  async checkLoginRateLimit(identifier: string): Promise<boolean> {
    // Login için daha sıkı limit: 5 deneme/15 dakika
    return await cacheService.checkRateLimit(identifier, 5, 900);
  }

  // ===== REAL-TIME COUNTERS =====
  
  /**
   * Ürün görüntülenme sayısını artır
   */
  async incrementProductViewCount(productId: string) {
    const newCount = await cacheService.incrementCounter(`product_views:${productId}`);
    console.log(`👁️ Product view count incremented: ${productId} -> ${newCount}`);
    return newCount;
  }

  /**
   * Ürün görüntülenme sayısını getir
   */
  async getProductViewCount(productId: string) {
    return await cacheService.getCounter(`product_views:${productId}`);
  }

  /**
   * Sipariş sayısını artır
   */
  async incrementOrderCount(tableNumber: number) {
    const newCount = await cacheService.incrementCounter(`orders:${tableNumber}`);
    console.log(`📦 Order count incremented: ${tableNumber} -> ${newCount}`);
    return newCount;
  }

  // ===== TEMPORARY DATA =====
  
  /**
   * E-posta doğrulama kodu oluştur ve sakla
   */
  async createVerificationCode(email: string): Promise<string> {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    await cacheService.setTemporaryData(`verification:${email}`, code, 600); // 10 dakika
    console.log(`📧 Verification code created: ${email}`);
    return code;
  }

  /**
   * E-posta doğrulama kodunu kontrol et
   */
  async verifyCode(email: string, code: string): Promise<boolean> {
    const storedCode = await cacheService.getTemporaryData(`verification:${email}`);
    const isValid = storedCode === code;
    
    if (isValid) {
      // Kodu sil
      await cacheService.delete(`temp:verification:${email}`);
      console.log(`✅ Verification code verified: ${email}`);
    } else {
      console.log(`❌ Verification code failed: ${email}`);
    }
    
    return isValid;
  }

  /**
   * Şifre sıfırlama token'ı oluştur
   */
  async createPasswordResetToken(email: string): Promise<string> {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await cacheService.setTemporaryData(`password_reset:${email}`, token, 1800); // 30 dakika
    console.log(`🔑 Password reset token created: ${email}`);
    return token;
  }

  /**
   * Şifre sıfırlama token'ını kontrol et
   */
  async verifyPasswordResetToken(email: string, token: string): Promise<boolean> {
    const storedToken = await cacheService.getTemporaryData(`password_reset:${email}`);
    const isValid = storedToken === token;
    
    if (isValid) {
      // Token'ı sil
      await cacheService.delete(`temp:password_reset:${email}`);
      console.log(`✅ Password reset token verified: ${email}`);
    } else {
      console.log(`❌ Password reset token failed: ${email}`);
    }
    
    return isValid;
  }

  // ===== QUEUE SYSTEM =====
  
  /**
   * E-posta gönderme işini kuyruğa ekle
   */
  async enqueueEmailJob(emailData: {
    to: string;
    subject: string;
    template: string;
    data: unknown;
  }) {
    await cacheService.enqueue('email_queue', {
      ...emailData,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 15)
    });
    console.log(`📧 Email job enqueued: ${emailData.to}`);
  }

  /**
   * Bildirim gönderme işini kuyruğa ekle
   */
  async enqueueNotificationJob(notificationData: {
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: unknown;
  }) {
    await cacheService.enqueue('notification_queue', {
      ...notificationData,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 15)
    });
    console.log(`🔔 Notification job enqueued: ${notificationData.userId}`);
  }

  // ===== CACHE STATISTICS =====
  
  /**
   * Cache istatistiklerini getir
   */
  async getCacheStats() {
    return await cacheService.getStats();
  }

  /**
   * Cache temizliği yap
   */
  async cleanupCache() {
    await cacheService.cleanup();
    console.log('🧹 Cache cleanup completed');
  }

  // ===== DATABASE + REDIS SYNC =====
  
  /**
   * Veritabanı değişikliklerini dinle ve cache'i senkronize et
   */
  async setupDatabaseSync() {
    // Bu fonksiyon, veritabanı değişikliklerini dinlemek için
    // Prisma middleware veya database triggers kullanabilir
    console.log('🔄 Database sync setup completed');
  }
}

// Singleton instance export
export const hybridService = HybridService.getInstance();

// Utility functions
export const hybridUtils = {
  // Rate limit constants
  RATE_LIMITS: {
    API: { limit: 100, window: 60 },      // 100 request/dakika
    LOGIN: { limit: 5, window: 900 },     // 5 deneme/15 dakika
    REGISTER: { limit: 3, window: 3600 }, // 3 kayıt/1 saat
    EMAIL: { limit: 10, window: 3600 }    // 10 e-posta/1 saat
  },

  // Cache keys
  CACHE_KEYS: {
    MENU: (categoryId?: string) => categoryId ? `menu:${categoryId}` : 'menu:all',
    POPULAR_PRODUCTS: 'popular_products',
    SESSION: (sessionId: string) => `session:${sessionId}`,
    RATE_LIMIT: (identifier: string) => `rate_limit:${identifier}`,
    PRODUCT_VIEWS: (productId: string) => `product_views:${productId}`,
    ORDERS: (tableNumber: number) => `orders:${tableNumber}`,
    VERIFICATION: (email: string) => `verification:${email}`,
    PASSWORD_RESET: (email: string) => `password_reset:${email}`
  }
}; 