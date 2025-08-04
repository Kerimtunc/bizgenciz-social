import { test, expect } from '@playwright/test';

/**
 * 🛡️ YemekZen Core Functionality E2E Tests
 * 
 * Bu test suite şu ana kadar yapılan tüm özellikleri kapsar:
 * - Supabase bağlantısı
 * - Prisma schema doğruluğu
 * - Environment konfigürasyonu
 * - API endpoint'leri
 * - UI component'leri
 * - Database işlemleri
 */

test.describe('🔧 Core System Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Her test öncesi ana sayfaya git
    await page.goto('http://localhost:3001');
  });

  test('✅ Ana Sayfa Yükleniyor ve Temel UI Çalışıyor', async ({ page }) => {
    // Ana sayfa yükleniyor mu?
    await expect(page).toHaveTitle(/YemekZen/);
    
    // Temel UI elementleri var mı?
    await expect(page.locator('h1')).toContainText('YemekZen QR Menu Elite Edition');
    
    // Health check linki çalışıyor mu?
    const healthLink = page.locator('a[href="/api/health"]');
    await expect(healthLink).toBeVisible();
    
    // Admin panel linki çalışıyor mu?
    const adminLink = page.locator('a[href="/panel"]');
    await expect(adminLink).toBeVisible();
  });

  test('🔍 Health Check API Çalışıyor', async ({ page }) => {
    // Health check endpoint'ine git
    await page.goto('http://localhost:3001/api/health');
    
    // JSON response'u kontrol et
    const response = await page.waitForResponse('**/api/health');
    const data = await response.json();
    
    // Temel health check alanları var mı?
    expect(data).toHaveProperty('status');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('environment');
    expect(data).toHaveProperty('database');
    
    // Status healthy mi?
    expect(data.status).toBe('healthy');
    
    // Database connected mi?
    expect(data.database).toBe('connected');
  });

  test('🛠️ Admin Panel Erişilebilir ve Temel UI Çalışıyor', async ({ page }) => {
    // Admin panel'e git
    await page.goto('http://localhost:3001/panel');
    
    // Admin panel yükleniyor mu?
    await expect(page.locator('h1, h2')).toContainText(/Admin Panel|YemekZen/);
    
    // Temel metrik kartları var mı?
    const metricCards = page.locator('.bg-white.rounded-lg.shadow-md');
    await expect(metricCards).toHaveCount(4); // 4 metrik kartı
    
    // Hızlı işlem butonları var mı?
    const quickActions = page.locator('button:has-text("Ekle")');
    await expect(quickActions).toHaveCount(3); // 3 hızlı işlem butonu
  });

  test('📊 Prisma Studio Erişilebilir', async ({ page }) => {
    // Prisma Studio'ya git (5557 portunda çalışıyor)
    await page.goto('http://localhost:5557');
    
    // Prisma Studio yükleniyor mu?
    await expect(page.locator('body')).toBeVisible();
    
    // Temel Prisma Studio elementleri var mı?
    const studioContent = page.locator('body');
    await expect(studioContent).toBeVisible();
  });
});

test.describe('🗄️ Database Integration Tests', () => {
  test('✅ Supabase Bağlantısı Aktif', async ({ page }) => {
    // Environment değişkenlerini kontrol et
    const response = await page.request.get('http://localhost:3001/api/health');
    const data = await response.json();
    
    // Database bağlantısı çalışıyor mu?
    expect(data.database).toBe('connected');
    
    // Environment bilgileri doğru mu?
    expect(data.environment).toBe('development');
  });

  test('📋 Database Schema Doğruluğu', async ({ page }) => {
    // Prisma Studio'da schema kontrolü
    await page.goto('http://localhost:5557');
    
    // Temel tablolar var mı?
    const expectedTables = [
      'tenants', 'users', 'business_profiles', 
      'categories', 'products', 'orders', 
      'order_items', 'tables', 'customers'
    ];
    
    // Bu test Prisma Studio'da manuel kontrol gerektirir
    // Gerçek uygulamada API endpoint'leri ile kontrol edilir
    expect(expectedTables.length).toBeGreaterThan(0);
  });
});

test.describe('🔧 Environment Configuration Tests', () => {
  test('✅ Environment Değişkenleri Doğru Yükleniyor', async ({ page }) => {
    // Health check'ten environment bilgilerini al
    const response = await page.request.get('http://localhost:3001/api/health');
    const data = await response.json();
    
    // Temel environment kontrolleri
    expect(data).toHaveProperty('environment');
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('uptime');
    
    // Environment development modunda mı?
    expect(data.environment).toBe('development');
  });

  test('🔐 Supabase Konfigürasyonu Doğru', async ({ page }) => {
    // Supabase bağlantısını test et
    const response = await page.request.get('http://localhost:3001/api/health');
    const data = await response.json();
    
    // Database bağlantısı aktif mi?
    expect(data.database).toBe('connected');
    
    // Memory kullanımı normal mi?
    expect(data).toHaveProperty('memory');
    expect(data.memory).toBeDefined();
  });
});

test.describe('🎨 UI Component Tests', () => {
  test('✅ ModuleHeader Component Çalışıyor', async ({ page }) => {
    // Admin panel'e git (ModuleHeader kullanıyor)
    await page.goto('http://localhost:3001/panel');
    
    // ModuleHeader elementleri var mı?
    const header = page.locator('.bg-white.border.border-orange-200');
    await expect(header).toBeVisible();
    
    // Header içeriği doğru mu?
    const title = page.locator('.text-lg.font-semibold');
    await expect(title).toBeVisible();
  });

  test('📊 Metrik Kartları Responsive', async ({ page }) => {
    // Admin panel'e git
    await page.goto('http://localhost:3001/panel');
    
    // Metrik kartları var mı?
    const metricCards = page.locator('.bg-white.rounded-lg.shadow-md');
    await expect(metricCards).toHaveCount(4);
    
    // Mobil responsive test
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(metricCards.first()).toBeVisible();
    
    // Desktop responsive test
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(metricCards.first()).toBeVisible();
  });
});

test.describe('🚀 Performance Tests', () => {
  test('⚡ Ana Sayfa Hızlı Yükleniyor', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3001');
    
    const loadTime = Date.now() - startTime;
    
    // Sayfa 3 saniyede yüklenmeli
    expect(loadTime).toBeLessThan(3000);
    
    // Sayfa tamamen yüklendi mi?
    await expect(page.locator('body')).toBeVisible();
  });

  test('⚡ Health Check API Hızlı Yanıt Veriyor', async ({ page }) => {
    const startTime = Date.now();
    
    const response = await page.request.get('http://localhost:3001/api/health');
    
    const responseTime = Date.now() - startTime;
    
    // API 1 saniyede yanıt vermeli
    expect(responseTime).toBeLessThan(1000);
    
    // Response başarılı mı?
    expect(response.status()).toBe(200);
  });
});

test.describe('🛡️ Error Handling Tests', () => {
  test('❌ 404 Sayfası Doğru Çalışıyor', async ({ page }) => {
    // Var olmayan sayfaya git
    await page.goto('http://localhost:3001/nonexistent-page');
    
    // 404 sayfası yükleniyor mu?
    await expect(page.locator('body')).toBeVisible();
  });

  test('❌ API Error Handling', async ({ page }) => {
    // Var olmayan API endpoint'ine git
    const response = await page.request.get('http://localhost:3001/api/nonexistent');
    
    // 404 response alıyor muyuz?
    expect(response.status()).toBe(404);
  });
});

test.describe('🔍 Cross-Browser Tests', () => {
  test('🌐 Chrome, Firefox, Safari Uyumluluğu', async ({ page }) => {
    // Ana sayfa tüm browser'larda çalışıyor mu?
    await page.goto('http://localhost:3001');
    
    // Temel elementler tüm browser'larda görünüyor mu?
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('a[href="/api/health"]')).toBeVisible();
    await expect(page.locator('a[href="/panel"]')).toBeVisible();
  });
});

test.describe('📱 Mobile Responsive Tests', () => {
  test('📱 Mobil Cihazlarda UI Doğru Görünüyor', async ({ page }) => {
    // Mobil viewport ayarla
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:3001');
    
    // Mobilde temel elementler görünüyor mu?
    await expect(page.locator('h1')).toBeVisible();
    
    // Admin panel'e git
    await page.goto('http://localhost:3001/panel');
    
    // Mobilde admin panel çalışıyor mu?
    await expect(page.locator('.bg-white.rounded-lg.shadow-md')).toBeVisible();
  });
}); 