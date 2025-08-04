# QR MENU ELITE EDITION - PROJE ÖZELLİKLERİ VE MİMARİ

## 📋 İÇİNDEKİLER

0. [Sistem Prensipleri ve In-House Çözümler](#0-sistem-prensipleri-ve-in-house-çözümler)
1. [Temel Mimari Güncellemeleri](#1-temel-mimari-güncellemeleri)
2. [Veritabanı Şeması](#2-veritabanı-şeması)
3. [Frontend Analizi](#3-frontend-analizi)
4. [Backend API Analizi](#4-backend-api-analizi)
5. [Özellik Kataloğu](#5-özellik-kataloğu)
6. [Detaylı İş Mantığı](#6-detaylı-iş-mantığı)

---

## 0. SİSTEM PRENSİPLERİ VE IN-HOUSE ÇÖZÜMLER

Bu bölüm, projenin değiştirilemez anayasasıdır. Aşağıdaki ilkeler ve çözümler, sistemin tüm teknik detaylarını şekillendiren temel kurallardır.

### 0.1 Temel Sistem İlkeleri

#### İlke 1: Önce Veri, Sonra Kod
**Kural:** Sistem kurgusu kesinlikle veri üstünden ilerleyecek
- Veri modeli önce tasarlanacak
- Veritabanı şeması sonra oluşturulacak
- API tasarımı veri modeline göre yapılacak
- Frontend API'den gelen veriye göre geliştirilecek
- Test veri odaklı yazılacak

**Veri Öncelikli Kontrol Listesi:**
- Mock data kullanımı kesinlikle yasak
- Hardcoded değerler veritabanına taşınacak
- Tek doğruluk kaynağı veritabanı olacak
- Tüm veriler dinamik olarak veritabanından çekilecek

#### İlke 2: Kiracı İzolasyonu
**Kural:** Her tenant'ın verisi tamamen izole edilecek
- Tenant ID tüm tablolarda zorunlu
- API'lerde tenant validation middleware'i
- Cross-tenant veri erişimi kesinlikle yasak
- Tenant-specific cache ve session yönetimi

#### İlke 3: API-First Yaklaşımı
**Kural:** Backend sadece JSON API servis edecek
- Frontend ve backend tamamen ayrık
- Tek API hem web hem mobil için
- RESTful standartlarına uygun endpoint'ler
- JWT tabanlı authentication

#### İlke 4: Bakımı Kolay ve Sağlam Dijital Miras
**Kural:** Kod kalitesi ve sürdürülebilirlik öncelik
- TypeScript ile tip güvenliği
- Kapsamlı test coverage (%80+)
- Dokümantasyon zorunlu
- Code review süreci

#### İlke 5: Güvenlik Önceliği
**Kural:** Güvenlik her seviyede uygulanacak
- JWT authentication
- Role-based access control
- Input validation ve sanitization
- SQL injection koruması
- Rate limiting

#### İlke 6: Çevresel Tutarlılık
**Kural:** Platform bağımsızlığı ve harici bağımlılık yokluğu
- Docker kullanılmayacak
- Redis kullanılmayacak
- CI/CD sunucuları kullanılmayacak
- RabbitMQ/Celery kullanılmayacak

### 0.2 In-House Çözümler ve Kısıtlar

#### 0.2.1 Ortam Kurulumu - Setup Script'leri

**Çözüm:** Platform-specific setup script'leri
- `setup-environment.sh` (Linux/macOS)
- `setup-environment.bat` (Windows)

**Fonksiyonlar:**
- Node.js versiyon kontrolü
- PostgreSQL kurulum kontrolü
- Ortam değişkenleri (.env) oluşturma
- Bağımlılık kontrolü ve yönlendirme

**Kısıtlar ve Geleceğe Yönelik Notlar:**
- Bu script'ler tek geliştirici ortamı için tasarlanmıştır
- Takım ortamında merkezi bir kurulum sistemi (Docker Compose) gerekebilir
- Production ortamında container orchestration (Kubernetes) düşünülebilir
- Script'lerin atlatılma riskine karşı, proje başlangıcında zorunlu çalıştırma

#### 0.2.2 Kalite Kontrolü - Git Hooks

**Çözüm:** Pre-push git hooks
- Otomatik linter kontrolü
- Unit test çalıştırma
- Integration test çalıştırma
- Push engelleme (test başarısızsa)

**Fonksiyonlar:**
- Kod kalitesi geliştirici makinesinde garanti
- Ana dala hatalı kod gönderimini engelleme
- Otomatik test coverage kontrolü

**Kısıtlar ve Geleceğe Yönelik Notlar:**
- Kalite kontrolü geliştirici makinesinde pre-push hook'u ile sağlanacaktır
- Bu hook'un atlatılma (--no-verify) riskine karşı, ana dal (main) birleştirme kurallarına sunucu tarafında ek bir kontrol konulması (eğer mümkünse) değerlendirilecektir
- Takım büyüdüğünde merkezi CI/CD sistemi gerekebilir
- Hook'ların bypass edilme riski vardır

#### 0.2.3 Önbellekleme - In-Memory Cache

**Çözüm:** Sunucu belleğinde çalışan cache modülü
- Sık erişilen verileri tutma
- İşletme ayarları cache'i
- Menü şablonları cache'i
- Session data cache'i

**Fonksiyonlar:**
- Redis bağımlılığını ortadan kaldırma
- Hızlı veri erişimi
- Bellek tabanlı performans optimizasyonu

**Kısıtlar ve Geleceğe Yönelik Notlar:**
- Bu cache modülü, tek sunuculu (single-instance) bir yapıda çalışmak üzere tasarlanmıştır
- Proje yatay ölçeklenmeye (birden fazla sunucuya) geçtiğinde, bu modülün merkezi bir cache sistemi (örn: Redis) ile değiştirilmesi gerekecektir
- Bu geçişi kolaylaştırmak için cache erişimi soyut bir katman üzerinden yapılmalıdır
- Sunucu restart'ında cache temizlenir
- Bellek sınırları dikkate alınmalı

#### 0.2.4 Asenkron Görevler - Jobs Tablosu

**Çözüm:** Veritabanı tabanlı job queue sistemi
- `jobs` tablosu oluşturma
- Pending, processing, completed, failed durumları
- Worker script ile job işleme
- Retry mekanizması

**Fonksiyonlar:**
- Uzun süren işlemleri arka planda çalıştırma
- Aylık rapor oluşturma
- Email gönderimi
- Veri işleme görevleri

**Kısıtlar ve Geleceğe Yönelik Notlar:**
- Bu sistem tek sunucu için tasarlanmıştır
- Yüksek yük altında performans sorunları yaşanabilir
- Job'ların kaybolma riski vardır
- Distributed job queue (Celery, Bull) gerekebilir
- Monitoring ve alerting sistemi eklenmelidir

### 0.3 Veri Öncelikli Sistem Kurgusu

#### 0.3.1 Veri Modeli Tasarım Süreci
1. **Veri Analizi:** İş gereksinimlerinin veri modeline dönüştürülmesi
2. **Şema Tasarımı:** Veritabanı tablolarının ve ilişkilerin tanımlanması
3. **API Tasarımı:** Veri modeline uygun endpoint'lerin oluşturulması
4. **Frontend Geliştirme:** API'den gelen veriye göre UI tasarımı
5. **Test Yazımı:** Veri odaklı test senaryolarının hazırlanması

#### 0.3.2 Mock Data Yasak Politikası
- **Kesin Kural:** Hiçbir mock data kullanılmayacak
- **Alternatif:** Placeholder text kullanımı ("Buraya veri gelecek")
- **Veri Kaynağı:** Tüm veriler veritabanından gelecek
- **Dinamik Sistem:** Statik veri yok, her şey dinamik

#### 0.3.3 Hardcoded Değer Yasak Politikası
- **Kesin Kural:** Hiçbir sabit değer kod içinde tutulmayacak
- **Çözüm:** Tüm sabit değerler veritabanına taşınacak
- **Konfigürasyon:** Environment variables kullanımı
- **Dinamik Konfigürasyon:** Runtime'da değiştirilebilir ayarlar

### 0.4 Güvenlik ve Performans Prensipleri

#### 0.4.1 Güvenlik Katmanları
- **Authentication:** JWT tabanlı kimlik doğrulama
- **Authorization:** Role-based access control
- **Input Validation:** Tüm kullanıcı girdilerinin doğrulanması
- **SQL Injection Koruması:** Prepared statements kullanımı
- **Rate Limiting:** API abuse koruması
- **CORS:** Cross-origin resource sharing kontrolü

#### 0.4.2 Performans Optimizasyonu
- **Database Indexing:** Kritik sorgular için index'ler
- **Query Optimization:** N+1 problem çözümü
- **Caching Strategy:** In-memory cache kullanımı
- **Pagination:** Büyük veri setleri için sayfalama
- **Lazy Loading:** Gereksiz veri yüklemesini önleme

### 0.5 Test ve Kalite Güvencesi

#### 0.5.1 Test Stratejisi
- **Unit Tests:** Her fonksiyon için test
- **Integration Tests:** API endpoint'leri için test
- **E2E Tests:** Kullanıcı senaryoları için test
- **Test Coverage:** %80+ zorunlu
- **Property-based Testing:** Karmaşık iş mantığı için

#### 0.5.2 Kod Kalitesi
- **TypeScript:** Tip güvenliği için zorunlu
- **ESLint:** Kod standartları kontrolü
- **Prettier:** Kod formatı standardizasyonu
- **Code Review:** Her değişiklik için review
- **Documentation:** JSDoc ve README zorunlu

### 0.6 Deployment ve Operasyon

#### 0.6.1 Deployment Stratejisi
- **Environment Management:** Development, staging, production
- **Database Migrations:** Versiyon kontrollü şema değişiklikleri
- **Backup Strategy:** Otomatik veritabanı yedekleme
- **Monitoring:** Sistem sağlığı izleme
- **Logging:** Structured logging

#### 0.6.2 Operasyonel Süreçler
- **Health Checks:** Sistem durumu kontrolü
- **Error Handling:** Kapsamlı hata yönetimi
- **Performance Monitoring:** Response time izleme
- **Security Auditing:** Güvenlik denetimleri
- **Disaster Recovery:** Felaket kurtarma planı

---

## 1. EKOSİSTEM VE GELİR MİMARİSİ

### 1.1 Platform Mimarisi
**Çift Yönlü Ekosistem:**
- **B2B:** QR Menü - İşletme yönetim platformu
- **B2C:** Yemek Sipariş - Tüketici sipariş platformu
- **Cross-Platform:** Tek sistem, iki yüz

**Gelir Modeli:**
- Özellik bazlı abonelikler (Temel, Premium, Enterprise)
- Komisyon modeli (sipariş başına)
- Hibrit modeller (abonelik + komisyon)
- "Ciro Partnerliği" (sübvansiyon + karşılıklı fayda)

### 1.2 Ekosistem Veri Yapıları

**Tenants (Kiracılar):**
- tenant_type: BUSINESS, CONSUMER, SUPER_ADMIN
- status: ACTIVE, SUSPENDED, PENDING_APPROVAL
- subscription_status, commission_rate

**Users (Kullanıcılar):**
- tenant_id, credit_balance, loyalty_points
- Hem personel hem tüketici

**Plans (Abonelik Planları):**
- price, interval (MONTHLY, YEARLY)
- max_products, max_categories, max_staff
- setup_fee, trial_days

**Features (Özellikler):**
- category: BASIC, PREMIUM, ENTERPRISE
- api_endpoint, is_active, feature_code

**Plan_Features (Plan-Özellik İlişkisi):**
- plan_id, feature_id, is_included, limit_value

**Subscriptions (Abonelikler):**
- tenant_id, plan_id, status
- start_date, end_date, next_billing_date

### 1.3 "Ciro Partnerliği" Veri Yapıları

**Commissions (Komisyonlar):**
- commission_type: ORDER, FEATURE, SUBSCRIPTION
- rate, is_percentage, min_amount, max_amount

**Loyalty_Programs (Sadakat Programları):**
- program_type: CREDIT_BASED, POINT_BASED, HYBRID
- earning_rules, redemption_rules, credit_value

**Business_Loyalty_Settings (İşletme Ayarları):**
- tenant_id, loyalty_program_id, is_active
- max_credit_usage_percentage, custom_rules

**Credit_Transactions (Kredi İşlemleri):**
- user_id, transaction_type: EARN, SPEND, EXPIRE, ADJUST
- amount, order_id, description

**Partner_Subsidies (Partner Sübvansiyonları):**
- business_tenant_id, order_id
- credit_spent, subsidy_amount, commission_amount
- payment_status: PENDING, PAID, FAILED

### 1.4 Sistem Yönetimi (Süper Admin) Arayüzü

**Temel Sorumluluklar:**
- Kiracı (işletme) onaylama ve yönetme
- Abonelik planları ve özelliklerini oluşturma/düzenleme
- Platform genelindeki komisyon oranlarını belirleme
- "Ciro Partnerliği" programını ve finansal mutabakatları yönetme

**Modüller:**
- **Kiracı Yönetimi:** Onaylama, yönetim, performans takibi
- **Plan Yönetimi:** Planlar, özellikler, fiyatlandırma
- **Komisyon Yönetimi:** Oranlar, kategoriler, raporlar
- **Partner Yönetimi:** Sadakat programları, finansal mutabakat
- **Platform Analitikleri:** Metrikler, gelir analizi, performans

**Güvenlik:**
- İki faktörlü kimlik doğrulama
- IP kısıtlaması, audit logging
- Rol tabanlı erişim kontrolü

---

## 2. VERİTABANI MİMARİSİ

### 2.1 Veritabanı Mimarisi Prensipleri

#### 2.1.1 Multi-Tenancy Zorunluluğu
**Kural:** Her tabloda tenant_id kolonu zorunlu
- Tüm operasyonel tablolarda tenant_id (INTEGER) kolonu
- Foreign key constraint: tenant_id → tenants.id
- NOT NULL constraint zorunlu
- Index: CREATE INDEX idx_tenant_id ON table_name(tenant_id)

#### 2.1.2 Soft-Delete Zorunluluğu
**Kural:** Veri kaybını önlemek için deleted_at kolonu zorunlu
- Tüm tablolarda deleted_at (TIMESTAMP) kolonu
- NULL değer aktif kayıtları temsil eder
- DELETE yerine UPDATE SET deleted_at = NOW() kullanımı
- Index: CREATE INDEX idx_deleted_at ON table_name(deleted_at)

#### 2.1.3 Veritabanı Bütünlüğü
**Kural:** Tüm constraint'ler zorunlu
- Foreign key constraint'ler tüm ilişkilerde
- NOT NULL constraint'ler zorunlu alanlarda
- Unique constraint'ler tekil değerler için
- Check constraint'ler veri doğrulama için

### 2.2 Analitik Veri Ambarı (OLAP) Mimarisi

#### 2.2.1 OLTP/OLAP Ayrımı
**Operasyonel Veritabanı (OLTP):**
- Günlük işlemler için optimize edilmiş
- Hızlı CRUD operasyonları
- Normalize edilmiş şema
- Real-time veri girişi

**Analitik Veritabanı (OLAP):**
- Raporlama ve analiz için optimize edilmiş
- Pre-aggregated veriler
- Denormalize edilmiş şema
- Batch veri işleme

#### 2.2.2 ETL (Extract, Transform, Load) Süreci
**Zamanlama:**
- Günlük: Her gece 02:00'de çalışacak worker.js script'i
- Haftalık: Pazar günü 03:00'de aggregasyon
- Aylık: Ayın 1'i 04:00'de raporlama

**İşlem Akışı:**
1. **Extract:** OLTP veritabanından veri çıkarma
2. **Transform:** Aggregation, cleaning, enrichment
3. **Load:** OLAP veritabanına yükleme

**Örnek ETL Job:**
```javascript
// Her gece 02:00'de çalışacak worker.js
const dailySalesETL = async () => {
  const orders = await extractOrders();
  const metrics = transformToMetrics(orders);
  await loadToOLAP(metrics);
};
```

### 2.3 Veritabanı Mimarisi Prensipleri

#### 2.3.1 Multi-Tenancy Zorunluluğu
**Kural:** Her tabloda tenant_id kolonu zorunlu
- Kiracıya ait olan tüm tablolara istisnasız tenant_id kolonu eklenecek
- Veritabanına erişen her kod parçası, WHERE tenant_id = ? koşulunu içerecek
- Kiracı izolasyonu tam olarak sağlanacak
- Veri güvenliği garanti altına alınacak

#### 2.3.2 Soft-Delete Zorunluluğu
**Kural:** Veri kaybını önlemek için deleted_at kolonu zorunlu
- Tüm tablolarda deleted_at (TIMESTAMP) kolonu
- NULL değer aktif kayıtları temsil eder
- DELETE yerine UPDATE SET deleted_at = NOW() kullanımı

#### 2.3.3 Veritabanı Bütünlüğü
**Kural:** Tüm constraint'ler zorunlu
- Tüm foreign key relationship'ler tanımlanacak
- NOT NULL constraint'ler eklenecek
- Unique constraint'ler eklenecek
- Check constraint'ler eklenecek
- Veritabanı bütünlüğü garanti altına alınacak

### 2.4 Ana Tablolar ve İlişkiler

#### Users Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: name, email, phone, role_id, avatar, is_active
- **İlişkiler**: role_id → user_roles.id, staff_id → staff.id
- **Kullanım**: Kullanıcı kimlik doğrulama ve yetkilendirme

#### Business_Profiles Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: business_name, business_type, address, phone, email, logo_url
- **Tema Alanları**: primary_color, secondary_color, accent_color, font_family
- **İlişkiler**: tenant_id → tenants.id
- **Kullanım**: İşletme bilgileri ve tema ayarları

#### Categories Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: name, description, icon, color, order_index
- **Özellik Alanları**: seasonality, discount_percentage, is_ready_category
- **İlişkiler**: tenant_id → tenants.id
- **Kullanım**: Menü kategorileri yönetimi

#### Products Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: name, description, price, category_id, image_url
- **Özellik Alanları**: is_featured, is_popular, prep_time, calories, allergens
- **İndirim Alanları**: original_price, discount_percentage, time_limited_offer
- **İlişkiler**: category_id → categories.id, inventory_id → inventory.id
- **Kullanım**: Ürün yönetimi ve menü sistemi

#### Orders Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: customer_name, customer_phone, order_type, status, total_amount
- **Finansal Alanlar**: subtotal, tax_amount, payment_amount, payment_status
- **İlişkiler**: table_id → tables.id, customer_id → customers.id
- **Kullanım**: Sipariş yönetimi ve takibi

#### Order_Items Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: order_id, product_id, quantity, unit_price, total_price
- **Özelleştirme**: customizations, notes, status
- **İlişkiler**: order_id → orders.id, product_id → products.id
- **Kullanım**: Sipariş detayları ve ürün özelleştirmeleri

#### Customers Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: name, email, phone, address, birth_date
- **Sadakat Alanları**: loyalty_tier_id, total_orders, total_spent, loyalty_points
- **Segmentasyon**: segment, activity_status, is_anonymous
- **İlişkiler**: loyalty_tier_id → loyalty_tiers.id
- **Kullanım**: Müşteri yönetimi ve sadakat programı

#### Tables Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: table_number, location, capacity, status
- **QR Kod**: qr_code (QR kod içeriği)
- **İlişkiler**: tenant_id → tenants.id
- **Kullanım**: Masa yönetimi ve QR kod sistemi

#### Staff Tablosu
- **Primary Key**: id (INTEGER)
- **Temel Alanlar**: name, role, phone, email, shift_start, shift_end
- **Performans**: hourly_rate, hire_date, status
- **İlişkiler**: user_id → users.id
- **Kullanım**: Personel yönetimi ve vardiya takibi

### 2.5 Operasyonel Tablolar

#### Kitchen_Orders Tablosu
- **Alanlar**: order_id, kitchen_station, item_name, priority, preparation_time
- **Durum Takibi**: kitchen_status, started_at, completed_at, assigned_chef
- **İlişkiler**: order_id → orders.id
- **Kullanım**: Mutfak sipariş yönetimi

#### Inventory Tablosu
- **Alanlar**: name, sku, category, current_stock, min_stock, max_stock
- **Maliyet**: cost_per_unit, total_value
- **İlişkiler**: supplier_id → suppliers.id
- **Kullanım**: Stok yönetimi ve tedarik zinciri

#### Reservations Tablosu
- **Alanlar**: table_id, customer_name, reservation_date, party_size, status
- **İlişkiler**: table_id → tables.id, created_by → staff.id
- **Kullanım**: Rezervasyon yönetimi

#### Payments Tablosu
- **Alanlar**: order_id, payment_method, amount, transaction_id, gateway_response
- **İlişkiler**: order_id → orders.id
- **Kullanım**: Ödeme işlemleri ve finansal takip

### 2.6 Yardımcı (Utility) Tablolar

#### 2.6.1 Sistem Yönetimi Tabloları

**Audit_Logs Tablosu:**
- **Alanlar**: id, user_id (işlemi yapan), tenant_id, action_type (CREATE, UPDATE, DELETE, LOGIN), table_name (etkilenen tablo), record_id (etkilenen kayıt), old_value (JSONB), new_value (JSONB), timestamp
- **Kullanım**: "Kim, ne zaman, neyi, nasıl değiştirdi?" sorusunun cevabını tutar
- **Güvenlik**: Güvenlik ve hata ayıklama için kritik öneme sahiptir

**Feature_Flags Tablosu:**
- **Alanlar**: id, name (örn: "loyalty_program"), is_active (global anahtar), description
- **İlişkili Tablo**: tenant_feature_flags (tenant_id, feature_flag_id, is_active)
- **Kullanım**: "Özellikleri satma" ve "tek tuşla pasife alma" vizyonunun teknik temelidir
- **Yönetim**: Hangi kiracının hangi özelliği kullanabildiğini merkezi olarak yönetir

**App_Settings Tablosu:**
- **Alanlar**: id, key (örn: "default_tax_rate"), value, description
- **Kullanım**: Tüm sisteme etki eden genel ayarları tek bir yerde, veritabanında tutar
- **Esneklik**: Kodu değiştirmeden ayar yapmayı sağlar

### 2.7 Analitik Tablolar (OLAP)

#### 2.7.1 Mevcut Analitik Tablolar - KORUNACAK VE OPTİMİZE EDİLECEK

**Daily_Sales_Metrics Tablosu:**
- **Alanlar**: date, total_revenue, total_orders, total_customers, average_order_value
- **Kullanım**: Günlük satış metrikleri ve raporlama
- **ETL Süreci**: Bu tablo korunacak ve ETL süreci ile beslenecek
- **Geliştirmeler**: Günlük satış metrikleri ETL pipeline ile otomatik hesaplanacak, real-time güncellemeler için trigger sistemi kurulacak, performans için index'ler optimize edilecek

**Revenue_Breakdowns Tablosu:**
- **Alanlar**: date, table_id, customer_id, payment_method, revenue_amount
- **İlişkiler**: table_id → tables.id, customer_id → customers.id
- **Kullanım**: Gelir analizi ve kategorilendirme
- **ETL Süreci**: Bu tablo korunacak ve ETL süreci ile beslenecek
- **Geliştirmeler**: Gelir analizi ETL pipeline ile otomatik hesaplanacak, partitioning stratejisi uygulanacak (tarih bazlı), aggregation fonksiyonları optimize edilecek

**Customer_Analytics Tablosu:**
- **Alanlar**: period, total_customers, new_customers, returning_customers, churn_rate
- **Kullanım**: Müşteri davranış analizi
- **ETL Süreci**: Bu tablo korunacak ve ETL süreci ile beslenecek
- **Geliştirmeler**: Müşteri analizi ETL pipeline ile otomatik hesaplanacak, machine learning modelleri için feature engineering yapılacak, predictive analytics altyapısı kurulacak

**Table_Efficiency_Metrics Tablosu:**
- **Alanlar**: table_id, total_revenue, total_orders, turnover_rate, revenue_per_hour
- **İlişkiler**: table_id → tables.id
- **Kullanım**: Masa verimlilik analizi
- **ETL Süreci**: Bu tablo korunacak ve ETL süreci ile beslenecek
- **Geliştirmeler**: Masa verimliliği ETL pipeline ile otomatik hesaplanacak, real-time dashboard için streaming analytics kurulacak, anomaly detection sistemi implement edilecek

#### 2.7.2 Yeni Analitik Tablolar - EKLENECEK

**Weekly_Sales_Metrics Tablosu:**
- **Alanlar**: week_start_date, total_revenue, total_orders, total_customers, average_order_value, growth_rate
- **Kullanım**: Haftalık satış metrikleri ve trend analizi
- **ETL Süreci**: Günlük metriklerden haftalık aggregasyon

**Monthly_Sales_Metrics Tablosu:**
- **Alanlar**: month_start_date, total_revenue, total_orders, total_customers, average_order_value, growth_rate, seasonal_factor
- **Kullanım**: Aylık satış metrikleri ve mevsimsel analiz
- **ETL Süreci**: Günlük metriklerden aylık aggregasyon

**Yearly_Sales_Metrics Tablosu:**
- **Alanlar**: year, total_revenue, total_orders, total_customers, average_order_value, growth_rate, annual_trend
- **Kullanım**: Yıllık satış metrikleri ve uzun vadeli trend analizi
- **ETL Süreci**: Aylık metriklerden yıllık aggregasyon

**Product_Performance_Metrics Tablosu:**
- **Alanlar**: product_id, period, sales_count, revenue_generated, profit_margin, popularity_score
- **Kullanım**: Ürün performans analizi ve karar verme
- **ETL Süreci**: Order_items tablosundan ürün bazlı aggregasyon

**Customer_Segment_Metrics Tablosu:**
- **Alanlar**: segment_id, period, customer_count, total_spent, average_order_value, retention_rate
- **Kullanım**: Müşteri segmentasyonu ve davranış analizi
- **ETL Süreci**: Customers ve orders tablolarından segment bazlı aggregasyon

### 2.8 ETL Pipeline Sistemi

#### 2.8.1 ETL Pipeline Mimarisi

**Veri Öncelikli Yaklaşım:**
- **Prensip**: ETL süreci veri üstünden ilerleyecek
- **Data-First**: Veri modeli önce tasarlanacak, sonra ETL süreci kurulacak
- **Veri Kaynağı**: Tek doğruluk kaynağı operasyonel veritabanı olacak

**Extract (Çıkarma) Aşaması:**
- **Kaynak**: Operasyonel veritabanı (OLTP) - orders, customers, products, payments tabloları
- **Frekans**: Günlük (gece 02:00), haftalık (Pazar 03:00), aylık (ayın 1'i 04:00)
- **Yöntem**: Incremental extraction (değişen verilerin çıkarılması)
- **Performans**: Batch processing ile optimize edilmiş

**Transform (Dönüştürme) Aşaması:**
- **Aggregation**: SUM, COUNT, AVG fonksiyonları ile metrik hesaplama
- **Cleaning**: Duplicate data removal, null value handling
- **Enrichment**: Additional calculated fields, derived metrics
- **Validation**: Data quality checks, business rule validation

**Load (Yükleme) Aşaması:**
- **Hedef**: Analitik veritabanı (OLAP) - metrics tabloları
- **Strateji**: Upsert (INSERT/UPDATE) operations
- **Indexing**: Automatic index creation for query optimization
- **Partitioning**: Date-based partitioning for historical data

#### 2.8.2 ETL Pipeline Bileşenleri

**ETL Orchestrator:**
- **Teknoloji**: Node.js + cron jobs veya Apache Airflow
- **Zamanlama**: Cron expressions ile otomatik tetikleme
- **Monitoring**: Job status tracking, error handling, retry logic
- **Logging**: Comprehensive logging for debugging and audit

**Data Quality Engine:**
- **Validation Rules**: Business logic validation, data type checks
- **Anomaly Detection**: Statistical outlier detection
- **Data Profiling**: Automatic data quality assessment
- **Alerting**: Email/SMS alerts for data quality issues

**Performance Optimization:**
- **Parallel Processing**: Multi-threaded ETL jobs
- **Memory Management**: Efficient memory usage for large datasets
- **Caching**: Intermediate result caching
- **Compression**: Data compression for storage efficiency

#### 2.8.3 ETL Pipeline Monitoring ve Maintenance

**Health Monitoring:**
- **Job Status**: Real-time job execution status
- **Performance Metrics**: Execution time, data volume, success rate
- **Resource Usage**: CPU, memory, disk I/O monitoring
- **Dependency Tracking**: Job dependency management

**Error Handling:**
- **Retry Logic**: Automatic retry for failed jobs
- **Error Classification**: Categorization of different error types
- **Recovery Procedures**: Manual intervention procedures
- **Data Recovery**: Rollback mechanisms for corrupted data

**Maintenance Procedures:**
- **Data Archiving**: Old data archiving strategies
- **Index Maintenance**: Regular index optimization
- **Statistics Updates**: Database statistics refresh
- **Backup Procedures**: ETL pipeline backup and restore

### 2.9 Performans Uyarısı: "On-the-fly" Hesaplama Felaketi

#### 2.9.1 Teoride vs Pratikte
- **Teoride**: "Tek doğruluk kaynağı" ilkesi için doğru gibi görünse de
- **Pratikte**: Bu bir performans felaketidir

#### 2.9.2 Neden "On-the-fly" Hesaplama Hatalıdır
- **Bir yıllık satış raporu**: orders tablosundaki milyonlarca satırı her seferinde taramak
- **Veritabanını kilitler**: Uzun süren sorgular diğer işlemleri bloklar ve veritabanını kilitler
- **Kullanıcı deneyimi**: Hem veritabanını kilitler hem de kullanıcının dakikalarca beklemesine neden olur
- **Sistem kaynakları**: CPU ve I/O aşırı tüketimi
- **Ölçeklenebilirlik**: Veri büyüdükçe performans katlanarak azalır

#### 2.9.3 Cache'leme Neden Yeterli Değildir
- **Cache bir çözümdür, ancak**: Bu da "türetilmiş veri" yaratmanın başka bir yoludur
- **Türetilmiş veri**: Cache de aslında "türetilmiş veri" yaratır
- **Cache invalidation**: Ne zaman geçersiz kılınacağı (cache invalidation) kendi başına karmaşık bir problemdir
- **Cache tutarlılığı**: Senkronizasyon sorunları
- **Memory constraints**: Büyük veri setleri için bellek yetersizliği

#### 2.9.4 Daha İyi Bir Yaklaşım
- **OLTP/OLAP Ayrımı**: Operasyonel veritabanı (OLTP) ile analitik veritabanını (OLAP) ayırmaktır
- **ETL Pipeline**: Geceleri çalışacak bir ETL (Extract, Transform, Load) süreci
- **Pre-aggregated Data**: Operasyonel veriyi işleyip, raporlamaya özel, önceden hesaplanmış (pre-aggregated) analitik tablolara yazar
- **Performans**: Raporlar bu optimize tablolardan ışık hızında çekilir
- **Real-time Updates**: Trigger-based incremental updates
- **Performance Monitoring**: Sürekli performans izleme

---

## 3. BACKEND API MİMARİSİ

### 3.1 Backend API Prensipleri

#### 3.1.1 Demo Data ve Hardcoded Sorunları
**Tespit Edilen Sorun:**
- productRoutes.js'de ana site için sabit demo ürünler hardcoded
- categoryRoutes.js'de sabit demo kategoriler
- orderRoutes.js'de fallback tenant ID hardcoded (1)
- businessRoutes.js'de Windows-specific database path
- authMiddleware.js'de JWT implementasyonu eksik

**Çözüm:**
- Demo veri sistemi dinamik olacak
- Config dosyası ile demo veri yönetimi
- Tenant validation middleware güçlendirilecek
- Cross-platform database path sistemi
- JWT token doğrulama sistemi implement edilecek

#### 3.1.2 Rate Limiting ve Security Middleware
**Tespit Edilen Sorun:**
- Rate limiting middleware eksik
- Security headers eksik
- CORS configuration eksik
- Input validation eksik
- Security monitoring eksik

**Çözüm:**
- Rate limiting middleware implement edilecek
- Security headers eklenecek
- CORS configuration yapılacak
- Input validation sistemi kurulacak
- Security monitoring sistemi implement edilecek

### 3.2 API Endpoint Grupları

#### 3.2.1 Dashboard API'leri

**GET /api/dashboard/stats**
- **Service**: CentralMetricsService
- **Response**: Daily sales, revenue change, order metrics, kitchen efficiency
- **Metrics**:
  - dailySales, dailyRevenueChangePercent, dailyRevenueTrend
  - totalOrders, activeOrders, averageOrderTime
  - tableOccupancy, kitchenEfficiency, customerSatisfaction

**GET /api/dashboard/business-intelligence**
- **Service**: CentralReportsService
- **Response**: Comprehensive business intelligence
- **Features**: Date range filtering, tenant-specific data

#### 3.2.2 Order API'leri

**GET /api/orders**
- **Response**: All orders with customer information
- **Filtering**: Tenant-based filtering
- **Ordering**: Created_at DESC

**GET /api/orders/stats**
- **Metrics**:
  - Today's orders count and total
  - Active orders count
  - Weekly stats with trends

**POST /api/orders**
- **Validation**: validateCreateOrder middleware
- **Service**: OrderService
- **Features**: Order creation with items

#### 3.2.3 Menu Management API'leri

**Menu Management Routes (42KB, 1247 lines)**
- **Features**: Complete menu CRUD operations
- **Components**: Categories, products, images, pricing
- **Validation**: Comprehensive input validation

**Product Routes (16KB, 587 lines)**
- **Features**: Product management, variants, metadata
- **Search**: Product search and filtering
- **Images**: Product image management

**Category Routes (12KB, 437 lines)**
- **Features**: Category management, hierarchy
- **Display**: Category ordering and visibility
- **Seasonality**: Seasonal category management

#### 3.2.4 Customer Management API'leri

**Customer Feedback Routes (19KB, 695 lines)**
- **Features**: Feedback collection, analysis, response
- **Rating**: Multi-dimensional rating system
- **Analytics**: Customer satisfaction metrics

**Customer Journey Routes (5.1KB, 201 lines)**
- **Features**: Customer journey tracking
- **Events**: Journey event logging
- **Analytics**: Journey analysis

#### 3.2.5 Staff Management API'leri

**Staff Routes (8.8KB, 382 lines)**
- **Features**: Staff management, roles, shifts
- **Performance**: Staff performance tracking
- **Scheduling**: Shift scheduling

**Staff Performance Routes (3.4KB, 120 lines)**
- **Features**: Performance metrics, KPIs
- **Analytics**: Performance analysis
- **Reports**: Performance reports

#### 3.2.6 Kitchen Management API'leri

**Kitchen Routes (16KB, 575 lines)**
- **Features**: Kitchen order management
- **Stations**: Kitchen station management
- **Timing**: Preparation time tracking
- **Quality**: Quality control

#### 3.2.7 Table Management API'leri

**Table POS Session Routes (20KB, 674 lines)**
- **Features**: Table session management
- **QR Codes**: QR code generation and scanning
- **Status**: Real-time table status updates

**Table Visit Routes (11KB, 380 lines)**
- **Features**: Table visit tracking
- **Analytics**: Table efficiency metrics
- **Reports**: Table performance reports

#### 3.2.8 Reservation Management API'leri

**Reservation Routes (15KB, 588 lines)**
- **Features**: Reservation management
- **Availability**: Table availability checking
- **Confirmation**: Reservation confirmation system

#### 3.2.9 Notification System API'leri

**Notification Routes (16KB, 553 lines)**
- **Features**: Multi-channel notifications
- **Types**: Push, email, SMS notifications
- **Templates**: Notification templates
- **Delivery**: Delivery status tracking

#### 3.2.10 Business Management API'leri

**Business Routes (4.4KB, 171 lines)**
- **Features**: Business profile management
- **Settings**: Business settings
- **Branding**: Logo and theme management

**Business Hours Routes (16KB, 580 lines)**
- **Features**: Operating hours management
- **Holidays**: Holiday management
- **Special Hours**: Special operating hours

#### 3.2.11 Analytics and Reporting API'leri

**Metrics Routes (5.6KB, 196 lines)**
- **Features**: Key performance indicators
- **Real-time**: Real-time metrics
- **Historical**: Historical data analysis

**Global Search Routes (9.3KB, 324 lines)**
- **Features**: Global search functionality
- **Indexing**: Search indexing
- **Results**: Search result ranking

#### 3.2.12 System Management API'leri

**System Routes (4.2KB, 123 lines)**
- **Features**: System health monitoring
- **Status**: System status checks
- **Maintenance**: System maintenance

**Cache Routes (7.2KB, 332 lines)**
- **Features**: Cache management
- **Invalidation**: Cache invalidation
- **Performance**: Cache performance optimization

**Error Monitoring Routes (5.5KB, 220 lines)**
- **Features**: Error tracking and monitoring
- **Reporting**: Error reporting
- **Analytics**: Error analytics

### 3.3 API Desenleri ve Standartları

#### 3.3.1 Modern API Standartları Eksikliği
**Tespit Edilen Sorun:**
- Bir kullanıcı "Sipariş Ver" butonuna iki kez basarsa ne olacağı belirsiz
- Rapor oluşturma gibi uzun süren işlemlerin nasıl yönetileceği belirsiz
- Sistemin "ayakta" olup olmadığını kontrol eden standart bir yol yok
- Idempotency desteği eksik
- Asenkron işlem yönetimi API'leri eksik
- Global health check endpoint'i eksik

**Çözüm:**
- POST ve PUT gibi kritik endpoint'ler Idempotency-Key başlığını destekleyecek
- Asenkron işlem yönetimi API'leri oluşturulacak
- GET /health endpoint'i oluşturulacak
- Modern API standartları uygulanacak
- Veri tekrarı ve tutarsızlığı engellenecek

#### 3.3.2 Idempotency Desteği
**Mekanizma:**
- POST ve PUT gibi kritik endpoint'ler, Idempotency-Key başlığını (header) desteklemelidir
- **Frontend**: Her kritik işlem için benzersiz bir anahtar (UUID) üretip bu başlıkla gönderir
- **Backend**: Aynı anahtarla gelen ikinci bir isteği işleme almaz ve ilk işlemin sonucunu döndürür
- **Kullanım**: Özellikle ödeme ve sipariş oluşturma gibi işlemlerde veri tekrarını ve tutarsızlığını engeller

#### 3.3.3 Asenkron İşlem Yönetimi API'leri
**Endpoint'ler:**
- **POST /api/jobs/reports**: Uzun sürecek bir rapor talebi oluşturur ve anında bir job_id döndürür
- **GET /api/jobs/{jobId}/status**: Verilen bir işin durumunu (pending, processing, completed, failed) sorgular
- **Kullanım**: "In-house" görev yönetimi sistemimizin API arayüzüdür

#### 3.3.4 Global Health Check Endpoint'i
**GET /health:**
- Sistemin "ayakta" olup olmadığını kontrol eden standart endpoint
- **Kontrol**: Veritabanı bağlantısı gibi temel servisleri kontrol eder
- **Yanıt**: { "status": "ok", "database": "connected" } gibi bir yanıt döner
- **Kullanım**: Otomatik izleme (monitoring) için kritik bir araçtır

#### 3.3.5 API Dokümantasyonu (Swagger/OpenAPI)
**Zorunlu Standart:**
- Tüm API endpoint'leri, kod üzerinde JSDoc yorumları kullanılarak OpenAPI 3.0 standardında belgelenecektir
- Bu dokümantasyon, geliştirme ortamında /api-docs adresi üzerinden interaktif bir arayüzle sunulacaktır
- Bu, "API-First" yaklaşımının temelini oluşturur

**Dokümantasyon Gereksinimleri:**
- Her endpoint için detaylı açıklama
- Request/Response şemaları
- Örnek kullanımlar
- Error kodları ve mesajları
- Authentication gereksinimleri
- Rate limiting bilgileri

---

## 4. İŞLEM HATLARI (PIPELINES) VE İŞ MANTIĞI

### 4.1 Pipeline Bütünlüğü Prensipleri (Anayasa)

#### 4.1.1 İşlemsel Bütünlük (Transactional Integrity)
**Mekanizma:**
- Sipariş oluşturma gibi birbirine bağlı kritik adımlar içeren tüm pipeline'lar, tek bir veritabanı işlemi (transaction) içinde çalıştırılmalıdır
- **Rollback**: Eğer ödeme adımı başarısız olursa, oluşturulan sipariş kaydı ve düşürülen stok miktarı otomatik olarak geri alınmalıdır (rollback)
- **Garanti**: Bu, veri bütünlüğünü garanti altına alır

#### 4.1.2 Yumuşak Silme (Soft Deletion) Politikası
**Mekanizma:**
- Sistemde hiçbir veri kalıcı olarak silinmeyecektir (DELETE)
- **Uygulama**: İlgili tablolara deleted_at (timestamp) adında bir sütun eklenecektir
- **İşlem**: Bir kayıt silindiğinde, bu sütuna o anki zaman damgası işlenir
- **Sorgu**: Tüm SELECT sorguları, varsayılan olarak WHERE deleted_at IS NULL koşulunu içerecektir
- **Fayda**: Bu, veri kaybını önler ve "geri alma" işlevselliğine zemin hazırlar

### 4.2 Customer Journey Pipeline

#### 4.2.1 QR Kod Okutma
- **Frontend**: QR Scanner Component
- **Backend**: QR Decode Service
- **Database**: `tables` tablosu
- **API**: `GET /api/tables/:id`

#### 4.2.2 Menü Görüntüleme
- **Frontend**: MenuPage Component
- **Backend**: Menu Service
- **Database**: `categories`, `products`
- **API**: `GET /api/menu`

#### 4.2.3 Ürün Seçimi
- **Frontend**: ProductCard Component
- **Backend**: Product Service
- **Database**: `products` tablosu
- **API**: `GET /api/products/:id`

#### 4.2.4 Sepete Ekleme
- **Frontend**: AddToCart Component
- **Backend**: Cart Service
- **Database**: `cart_items` tablosu
- **API**: `POST /api/cart/add`

#### 4.2.5 Sipariş Onayı
- **Frontend**: Checkout Component
- **Backend**: Order Service
- **Database**: `orders`, `order_items`
- **API**: `POST /api/orders`

#### 4.2.6 Ödeme
- **Frontend**: Payment Component
- **Backend**: Payment Service
- **Database**: `payments` tablosu
- **API**: `POST /api/payments`

#### 4.2.7 Sipariş Takibi
- **Frontend**: OrderStatus Component
- **Backend**: Order Service
- **Database**: `orders` tablosu
- **API**: `GET /api/orders/:id`

### 4.3 Staff Management Pipeline

#### 4.3.1 Vardiya Başlangıcı
- **Frontend**: Staff login
- **Backend**: ShiftService
- **Database**: `staff` tablosu
- **Event**: STAFF_SHIFT_STARTED

#### 4.3.2 Masa Kontrolü
- **Frontend**: Table monitor
- **Backend**: TableMonitorService
- **Database**: `tables`, `table_sessions`
- **API**: `GET /api/staff/tables`

#### 4.3.3 Garson Çağrısı
- **Frontend**: Waiter call button
- **Backend**: WaiterCallService
- **Database**: `table_sessions`, `staff`
- **API**: `GET /api/staff/calls`

#### 4.3.4 Sipariş Alma
- **Frontend**: Order form
- **Backend**: OrderService
- **Database**: `orders`, `order_items`
- **API**: `POST /api/staff/orders`

#### 4.3.5 Mutfak Bildirimi
- **Frontend**: Kitchen notification
- **Backend**: KitchenNotificationService
- **Database**: `kitchen_orders`
- **API**: `POST /api/kitchen/orders`

#### 4.3.6 Sipariş Servis
- **Frontend**: Service interface
- **Backend**: ServiceService
- **Database**: `orders`, `table_sessions`
- **API**: `PUT /api/staff/orders/:id/serve`

### 4.4 Kitchen Management Pipeline

#### 4.4.1 Sipariş Alma
- **Frontend**: Kitchen display
- **Backend**: KitchenOrderService
- **Database**: `kitchen_orders`, `orders`
- **API**: `GET /api/kitchen/orders`

#### 4.4.2 Malzeme Hazırlama
- **Frontend**: Ingredient management
- **Backend**: IngredientService
- **Database**: `inventory`, `ingredients`
- **API**: `GET /api/kitchen/ingredients`

#### 4.4.3 Hazırlama Başlama
- **Frontend**: Cooking interface
- **Backend**: CookingService
- **Database**: `kitchen_orders`
- **API**: `PUT /api/kitchen/orders/:id/start`

#### 4.4.4 Pişirme Süreci
- **Frontend**: Cooking timer
- **Backend**: CookingService
- **Database**: `kitchen_orders`, `cooking_process`
- **API**: `PUT /api/kitchen/orders/:id/cooking`

#### 4.4.5 Kalite Kontrol
- **Frontend**: Quality check interface
- **Backend**: QualityControlService
- **Database**: `kitchen_orders`, `quality_metrics`
- **API**: `POST /api/kitchen/quality/check`

#### 4.4.6 Hazır Bildirimi
- **Frontend**: Ready notification
- **Backend**: KitchenNotificationService
- **Database**: `kitchen_orders`, `orders`
- **API**: `PUT /api/kitchen/orders/:id/ready`

### 4.5 Financial Pipeline

#### 4.5.1 Gelir Kaydı
- **Trigger**: Successful payment
- **Service**: RevenueRecordingService
- **Database**: `revenue_records`, `orders`
- **API**: `POST /api/revenue/record`

#### 4.5.2 Maliyet Kaydı (COGS)
- **Trigger**: Stock usage
- **Service**: CostCalculationService
- **Database**: `cost_records`
- **Event**: COST_OF_GOODS_SOLD_RECORDED

#### 4.5.3 Gün Sonu İşlemi
- **Trigger**: Scheduled task (nightly)
- **Service**: EndOfDayService
- **Database**: `daily_financials`
- **Event**: END_OF_DAY_FINANCIALS_CALCULATED

#### 4.5.4 Kar/Zarar Analizi
- **Trigger**: Period end
- **Service**: ProfitLossService
- **Database**: `profit_loss_analysis`
- **Event**: PROFIT_LOSS_STATEMENT_GENERATED

### 4.6 Inventory Pipeline

#### 4.6.1 Stok Kullanımı
- **Trigger**: Order preparation
- **Service**: InventoryService
- **Database**: `inventory_movements`
- **Event**: INVENTORY_DECREMENTED_BY_SALE

#### 4.6.2 Düşük Stok Uyarısı
- **Trigger**: Stock level check
- **Service**: StockAlertService
- **Database**: `inventory_alerts`
- **Event**: LOW_STOCK_THRESHOLD_REACHED

#### 4.6.3 Satın Alma Siparişi
- **Trigger**: Low stock alert
- **Service**: PurchaseOrderService
- **Database**: `purchase_orders`
- **Event**: PURCHASE_ORDER_CREATED

#### 4.6.4 Mal Kabul
- **Trigger**: Goods received
- **Service**: GoodsReceiptService
- **Database**: `goods_received`
- **Event**: GOODS_RECEIVED

### 4.7 Hesaplama Mantıkları

#### 4.7.1 Revenue Hesaplamaları
**Günlük Gelir:**
- **Formül**: `SUM(order_total) WHERE date = today`
- **Konum**: Dashboard / RevenueCard component
- **API Endpoint**: `GET /api/dashboard/revenue-stats`
- **Backend Fonksiyon**: `calculateDailyRevenue()`

**Haftalık Gelir:**
- **Formül**: `SUM(order_total) WHERE date >= week_start`
- **Konum**: Dashboard / AnalyticsWidget component
- **API Endpoint**: `GET /api/dashboard/weekly-revenue`
- **Backend Fonksiyon**: `calculateWeeklyRevenue()`

**Aylık Gelir:**
- **Formül**: `SUM(order_total) WHERE date >= month_start`
- **Konum**: Reports Module / Financial Reports
- **API Endpoint**: `GET /api/reports/monthly-revenue`
- **Backend Fonksiyon**: `calculateMonthlyRevenue()`

**Ortalama Sipariş Tutarı:**
- **Formül**: `AVG(order_total)`
- **Konum**: Dashboard / MetricCard component
- **API Endpoint**: `GET /api/dashboard/average-order-value`
- **Backend Fonksiyon**: `calculateAverageOrderValue()`

**Gelir Artış Yüzdesi:**
- **Formül**: `((current_period - previous_period) / previous_period) * 100`
- **Konum**: Dashboard / GrowthChart component
- **API Endpoint**: `GET /api/dashboard/revenue-growth`
- **Backend Fonksiyon**: `calculateRevenueGrowth()`

#### 4.7.2 Order İstatistikleri
**Toplam Sipariş Sayısı:**
- **Formül**: `COUNT(*) FROM orders`
- **Konum**: Dashboard / OrderStats component
- **API Endpoint**: `GET /api/dashboard/order-count`
- **Backend Fonksiyon**: `getTotalOrderCount()`

**Bekleyen Sipariş Sayısı:**
- **Formül**: `COUNT(*) WHERE status = 'pending'`
- **Konum**: Kitchen Module / Order Queue
- **API Endpoint**: `GET /api/kitchen/pending-orders`
- **Backend Fonksiyon**: `getPendingOrderCount()`

**Tamamlanan Sipariş Sayısı:**
- **Formül**: `COUNT(*) WHERE status = 'completed'`
- **Konum**: Orders Module / Order List
- **API Endpoint**: `GET /api/orders/completed-count`
- **Backend Fonksiyon**: `getCompletedOrderCount()`

**İptal Edilen Sipariş Sayısı:**
- **Formül**: `COUNT(*) WHERE status = 'cancelled'`
- **Konum**: Orders Module / Order Analytics
- **API Endpoint**: `GET /api/orders/cancelled-count`
- **Backend Fonksiyon**: `getCancelledOrderCount()`

**Sipariş Tamamlanma Oranı:**
- **Formül**: `(completed_orders / total_orders) * 100`
- **Konum**: Analytics Module / Performance Metrics
- **API Endpoint**: `GET /api/analytics/completion-rate`
- **Backend Fonksiyon**: `calculateCompletionRate()`

#### 4.7.3 Customer İstatistikleri
**Toplam Müşteri Sayısı:**
- **Formül**: `COUNT(*) FROM customers`
- **Konum**: Customers Module / Customer Overview
- **API Endpoint**: `GET /api/customers/total-count`
- **Backend Fonksiyon**: `getTotalCustomerCount()`

**Yeni Müşteri Sayısı:**
- **Formül**: `COUNT(*) WHERE registration_date >= period_start`
- **Konum**: Dashboard / Customer Growth
- **API Endpoint**: `GET /api/customers/new-count`
- **Backend Fonksiyon**: `getNewCustomerCount()`

**Aktif Müşteri Sayısı:**
- **Formül**: `COUNT(*) WHERE last_order_date >= 30_days_ago`
- **Konum**: Analytics Module / Customer Analytics
- **API Endpoint**: `GET /api/analytics/active-customers`
- **Backend Fonksiyon**: `getActiveCustomerCount()`

**Müşteri Sadakat Puanı:**
- **Formül**: `SUM(loyalty_points) / COUNT(orders)`
- **Konum**: Loyalty Module / Customer Tiers
- **API Endpoint**: `GET /api/loyalty/customer-score`
- **Backend Fonksiyon**: `calculateLoyaltyScore()`

#### 4.7.4 Product İstatistikleri
**Toplam Ürün Sayısı:**
- **Formül**: `COUNT(*) FROM products WHERE active = true`
- **Konum**: Menu Management Module / Product Overview
- **API Endpoint**: `GET /api/products/total-count`
- **Backend Fonksiyon**: `getTotalProductCount()`

**En Çok Satan Ürünler:**
- **Formül**: `TOP 10 BY order_count`
- **Konum**: Analytics Module / Product Performance
- **API Endpoint**: `GET /api/analytics/top-products`
- **Backend Fonksiyon**: `getTopSellingProducts()`

**Stok Seviyesi Düşük Ürünler:**
- **Formül**: `WHERE stock_quantity <= reorder_point`
- **Konum**: Inventory Module / Low Stock Alerts
- **API Endpoint**: `GET /api/inventory/low-stock`
- **Backend Fonksiyon**: `getLowStockProducts()`

**Ürün Performans Skoru:**
- **Formül**: `(sales_count * avg_rating) / days_since_creation`
- **Konum**: Analytics Module / Product Analytics
- **API Endpoint**: `GET /api/analytics/product-performance`
- **Backend Fonksiyon**: `calculateProductPerformance()`

### 4.8 İş Kuralları

#### 4.8.1 Order Durumu Geçiş Kuralları
**Pending → Preparing:**
- **Kural**: Staff confirmation required
- **Konum**: Kitchen Module / Order Queue
- **API Endpoint**: `PUT /api/orders/{id}/status`
- **Backend Fonksiyon**: `updateOrderStatus()`

**Preparing → Ready:**
- **Kural**: Kitchen completion
- **Konum**: Kitchen Module / Preparation Status
- **API Endpoint**: `PUT /api/orders/{id}/ready`
- **Backend Fonksiyon**: `markOrderReady()`

**Ready → Delivered:**
- **Kural**: Delivery confirmation
- **Konum**: Orders Module / Order Status
- **API Endpoint**: `PUT /api/orders/{id}/delivered`
- **Backend Fonksiyon**: `markOrderDelivered()`

**Cancelled:**
- **Kural**: Customer or staff can cancel before preparing
- **Konum**: Orders Module / Order Management
- **API Endpoint**: `PUT /api/orders/{id}/cancel`
- **Backend Fonksiyon**: `cancelOrder()`

**Refunded:**
- **Kural**: After delivery, with conditions
- **Konum**: Orders Module / Refund Management
- **API Endpoint**: `PUT /api/orders/{id}/refund`
- **Backend Fonksiyon**: `processRefund()`

#### 4.8.2 Stok Yönetimi Kuralları
**Stok Azaldığında Otomatik Uyarı:**
- **Kural**: `stock_quantity <= reorder_point`
- **Konum**: Inventory Module / Stock Alerts
- **API Endpoint**: `GET /api/inventory/alerts`
- **Backend Fonksiyon**: `checkLowStock()`

**Sipariş Verildiğinde Stok Düşürme:**
- **Kural**: `stock_quantity -= order_quantity`
- **Konum**: Orders Module / Order Processing
- **API Endpoint**: `POST /api/orders`
- **Backend Fonksiyon**: `createOrder()`

**Stok Yetersizse Sipariş Reddetme:**
- **Kural**: Check stock before order creation
- **Konum**: Orders Module / Order Validation
- **API Endpoint**: `POST /api/orders/validate`
- **Backend Fonksiyon**: `validateOrderStock()`

**Stok Güncelleme:**
- **Kural**: Manual or automatic
- **Konum**: Inventory Module / Stock Management
- **API Endpoint**: `PUT /api/inventory/{id}/stock`
- **Backend Fonksiyon**: `updateStock()`

#### 4.8.3 Müşteri Sadakat Sistemi
**Her Sipariş İçin Puan Kazanma:**
- **Kural**: `order_total * 0.1`
- **Konum**: Loyalty Module / Points System
- **API Endpoint**: `POST /api/loyalty/earn-points`
- **Backend Fonksiyon**: `earnLoyaltyPoints()`

**Puan Kullanma:**
- **Kural**: `1 puan = 0.01 TL indirim`
- **Konum**: Orders Module / Discount Application
- **API Endpoint**: `POST /api/orders/apply-loyalty`
- **Backend Fonksiyon**: `applyLoyaltyDiscount()`

**Seviye Sistemi:**
- **Kural**: Bronze, Silver, Gold, Platinum
- **Konum**: Loyalty Module / Tier Management
- **API Endpoint**: `GET /api/loyalty/tiers`
- **Backend Fonksiyon**: `getLoyaltyTiers()`

**Özel İndirimler ve Kampanyalar:**
- **Kural**: Tier-based discounts
- **Konum**: Loyalty Module / Campaign Management
- **API Endpoint**: `GET /api/loyalty/campaigns`
- **Backend Fonksiyon**: `getActiveCampaigns()`

#### 4.8.4 Rezervasyon Kuralları
**Masa Müsaitlik Kontrolü:**
- **Kural**: Check table availability
- **Konum**: Reservation Module / Table Management
- **API Endpoint**: `GET /api/reservations/available-tables`
- **Backend Fonksiyon**: `getAvailableTables()`

**Rezervasyon Süresi:**
- **Kural**: 2 saat varsayılan
- **Konum**: Reservation Module / Booking System
- **API Endpoint**: `POST /api/reservations`
- **Backend Fonksiyon**: `createReservation()`

**İptal Politikası:**
- **Kural**: 24 saat öncesi
- **Konum**: Reservation Module / Cancellation
- **API Endpoint**: `PUT /api/reservations/{id}/cancel`
- **Backend Fonksiyon**: `cancelReservation()`

**No-Show Durumu:**
- **Kural**: 3 kez no-show = blacklist
- **Konum**: Reservation Module / No-Show Tracking
- **API Endpoint**: `PUT /api/reservations/{id}/no-show`
- **Backend Fonksiyon**: `markNoShow()`

### 4.9 Pricing ve Discount Mantığı

#### 4.9.1 Ürün Fiyatlandırma
**Base Price (Temel Fiyat):**
- **Konum**: Products Module / Product Management
- **API Endpoint**: `POST /api/products`
- **Backend Fonksiyon**: `createProduct()`

**Size-Based Pricing (Küçük, Orta, Büyük):**
- **Konum**: Products Module / Product Variants
- **API Endpoint**: `POST /api/products/{id}/variants`
- **Backend Fonksiyon**: `createProductVariant()`

**Customization Pricing (Ekstra Malzemeler):**
- **Konum**: Products Module / Customization Options
- **API Endpoint**: `POST /api/products/{id}/customizations`
- **Backend Fonksiyon**: `addCustomizationOption()`

**Bulk Pricing (Toplu Alım İndirimi):**
- **Konum**: Orders Module / Bulk Discount
- **API Endpoint**: `POST /api/orders/calculate-bulk-discount`
- **Backend Fonksiyon**: `calculateBulkDiscount()`

#### 4.9.2 İndirim Kuralları
**Yüzde İndirim (10% Off):**
- **Konum**: Orders Module / Discount Application
- **API Endpoint**: `POST /api/orders/apply-discount`
- **Backend Fonksiyon**: `applyPercentageDiscount()`

**Sabit İndirim (5 TL Off):**
- **Konum**: Orders Module / Fixed Discount
- **API Endpoint**: `POST /api/orders/apply-fixed-discount`
- **Backend Fonksiyon**: `applyFixedDiscount()`

**Buy One Get One (BOGO):**
- **Konum**: Orders Module / BOGO Promotion
- **API Endpoint**: `POST /api/orders/apply-bogo`
- **Backend Fonksiyon**: `applyBOGODiscount()`

**Minimum Tutar İndirimi (100 TL Üzeri %15):**
- **Konum**: Orders Module / Threshold Discount
- **API Endpoint**: `POST /api/orders/apply-threshold-discount`
- **Backend Fonksiyon**: `applyThresholdDiscount()`

#### 4.9.3 Vergi Hesaplamaları
**KDV Hesaplama (18%):**
- **Konum**: Orders Module / Tax Calculation
- **API Endpoint**: `POST /api/orders/calculate-tax`
- **Backend Fonksiyon**: `calculateTax()`

**Vergi Dahil/Farklı Fiyatlandırma:**
- **Konum**: Products Module / Tax Settings
- **API Endpoint**: `PUT /api/products/{id}/tax-settings`
- **Backend Fonksiyon**: `updateTaxSettings()`

**Vergi Muafiyeti Durumları:**
- **Konum**: Orders Module / Tax Exemption
- **API Endpoint**: `POST /api/orders/apply-tax-exemption`
- **Backend Fonksiyon**: `applyTaxExemption()`

### 4.10 Notification ve Alert Sistemleri

#### 4.10.1 Order Notifications
**Yeni Sipariş Bildirimi (Staff):**
- **Konum**: Kitchen Module / Order Notifications
- **API Endpoint**: `POST /api/notifications/order-received`
- **Backend Fonksiyon**: `sendOrderNotification()`

**Sipariş Durumu Güncellemesi (Customer):**
- **Konum**: Orders Module / Status Updates
- **API Endpoint**: `POST /api/notifications/status-update`
- **Backend Fonksiyon**: `sendStatusUpdate()`

**Sipariş Hazır Bildirimi (Customer):**
- **Konum**: Kitchen Module / Ready Notifications
- **API Endpoint**: `POST /api/notifications/order-ready`
- **Backend Fonksiyon**: `sendReadyNotification()`

#### 4.10.2 Inventory Alerts
**Düşük Stok Uyarısı:**
- **Konum**: Inventory Module / Stock Alerts
- **API Endpoint**: `POST /api/notifications/low-stock`
- **Backend Fonksiyon**: `sendLowStockAlert()`

**Stok Tükenme Uyarısı:**
- **Konum**: Inventory Module / Out of Stock
- **API Endpoint**: `POST /api/notifications/out-of-stock`
- **Backend Fonksiyon**: `sendOutOfStockAlert()`

**Reorder Reminder:**
- **Konum**: Inventory Module / Reorder Management
- **API Endpoint**: `POST /api/notifications/reorder-reminder`
- **Backend Fonksiyon**: `sendReorderReminder()`

#### 4.10.3 Customer Notifications
**Welcome Message (Yeni Kayıt):**
- **Konum**: Customers Module / Registration
- **API Endpoint**: `POST /api/notifications/welcome`
- **Backend Fonksiyon**: `sendWelcomeMessage()`

**Loyalty Points Update:**
- **Konum**: Loyalty Module / Points System
- **API Endpoint**: `POST /api/notifications/loyalty-update`
- **Backend Fonksiyon**: `sendLoyaltyUpdate()`

**Special Offers:**
- **Konum**: Marketing Module / Campaigns
- **API Endpoint**: `POST /api/notifications/special-offer`
- **Backend Fonksiyon**: `sendSpecialOffer()`

**Birthday Wishes:**
- **Konum**: Customers Module / Birthday Tracking
- **API Endpoint**: `POST /api/notifications/birthday`
- **Backend Fonksiyon**: `sendBirthdayWish()`

### 4.11 Security ve Authorization Kuralları

#### 4.11.1 User Authentication
**Password Requirements (Min 8 Chars, Special Chars):**
- **Konum**: Auth Module / Registration
- **API Endpoint**: `POST /api/auth/register`
- **Backend Fonksiyon**: `validatePassword()`

**Session Management (Timeout, Refresh):**
- **Konum**: Auth Module / Session Management
- **API Endpoint**: `POST /api/auth/refresh`
- **Backend Fonksiyon**: `refreshSession()`

**Multi-factor Authentication (MFA):**
- **Konum**: Auth Module / Security Settings
- **API Endpoint**: `POST /api/auth/enable-mfa`
- **Backend Fonksiyon**: `enableMFA()`

#### 4.11.2 Role-Based Access Control (RBAC)
**Admin Permissions:**
- **Kural**: Full system access
- **Konum**: Admin Module / User Management
- **API Endpoint**: `GET /api/admin/users`
- **Backend Fonksiyon**: `getAllUsers()`

**Staff Permissions:**
- **Kural**: Limited to assigned tables/orders
- **Konum**: Staff Module / Order Management
- **API Endpoint**: `GET /api/staff/orders`
- **Backend Fonksiyon**: `getStaffOrders()`

**Kitchen Permissions:**
- **Kural**: Kitchen orders only
- **Konum**: Kitchen Module / Order Queue
- **API Endpoint**: `GET /api/kitchen/orders`
- **Backend Fonksiyon**: `getKitchenOrders()`

**Customer Permissions:**
- **Kural**: Own orders and profile only
- **Konum**: Customer Module / Profile
- **API Endpoint**: `GET /api/customer/profile`
- **Backend Fonksiyon**: `getCustomerProfile()`

#### 4.11.3 Data Protection
**Personal Data Encryption:**
- **Kural**: Encrypt sensitive customer data
- **Konum**: Customer Module / Data Protection
- **API Endpoint**: `POST /api/customer/encrypt-data`
- **Backend Fonksiyon**: `encryptCustomerData()`

**Payment Data Security:**
- **Kural**: PCI DSS compliance
- **Konum**: Payment Module / Security
- **API Endpoint**: `POST /api/payments/secure-process`
- **Backend Fonksiyon**: `processSecurePayment()`

**Audit Logging:**
- **Kural**: Log all sensitive operations
- **Konum**: System Module / Audit
- **API Endpoint**: `POST /api/system/audit-log`
- **Backend Fonksiyon**: `logAuditEvent()`

### 4.12 Teslimat ve Lojistik Akışı

#### 4.12.1 Yemek Siparişi Platformu Teslimat Süreci
**Yemek siparişi platformundan gelen bir siparişin teslimat süreci aşağıdaki adımları izler:**

**1. İşletme, panelden sipariş durumunu 'Teslimata Çıktı' olarak günceller:**
- **Frontend**: Orders Module / Order Status Update
- **Backend**: OrderService
- **Database**: `orders` tablosu
- **API**: `PUT /api/orders/{id}/status`
- **Event**: ORDER_OUT_FOR_DELIVERY

**2. Tüketici arayüzünde siparişin yolda olduğu bilgisi gösterilir:**
- **Frontend**: OrderStatus Component
- **Backend**: OrderStatusService
- **Database**: `orders` tablosu
- **API**: `GET /api/orders/{id}/status`
- **Notification**: Push notification to customer

**3. Kurye atama ve rota optimizasyonu:**
- **Frontend**: Delivery Management Module
- **Backend**: DeliveryService
- **Database**: `delivery_assignments`, `routes`
- **API**: `POST /api/delivery/assign`
- **Event**: DELIVERY_ASSIGNED

**Kurye Yönetimi Sistemi:**
- **Hibrit Kurye Desteği**: İşletmeler kendi kuryelerini sisteme kaydedebilir ve takip edebilir
- **Platform Kuryesi**: Sistem tarafından atanan profesyonel kuryeler
- **Kurye Seçimi**: İşletme, sipariş için kendi kuryesini veya platform kuryesini seçebilir
- **Kurye Performans Takibi**: Her kuryenin performans metrikleri ayrı ayrı izlenir
- **Kurye Bildirimleri**: Kurye atama, rota güncelleme, teslimat durumu bildirimleri

**4. Canlı konum takibi:**
- **Frontend**: Live Tracking Component
- **Backend**: LocationTrackingService
- **Database**: `delivery_locations`
- **API**: `GET /api/delivery/{id}/location`
- **Real-time**: WebSocket connection

**5. Teslimat onayı:**
- **Frontend**: Delivery Confirmation Component
- **Backend**: DeliveryConfirmationService
- **Database**: `orders`, `deliveries`
- **API**: `PUT /api/delivery/{id}/confirm`
- **Event**: DELIVERY_COMPLETED

#### 4.12.2 QR Menü Yerinde Servis Süreci
**QR menüden gelen siparişlerin yerinde servis süreci:**

**1. Sipariş hazır bildirimi:**
- **Frontend**: Kitchen Module / Ready Notification
- **Backend**: KitchenNotificationService
- **Database**: `kitchen_orders`
- **API**: `PUT /api/kitchen/orders/{id}/ready`
- **Event**: ORDER_READY_FOR_SERVICE

**2. Garson çağrısı:**
- **Frontend**: Waiter Call Component
- **Backend**: WaiterCallService
- **Database**: `table_sessions`, `staff`
- **API**: `POST /api/staff/calls`
- **Event**: WAITER_CALLED

**3. Masaya servis:**
- **Frontend**: Service Interface
- **Backend**: ServiceService
- **Database**: `orders`, `table_sessions`
- **API**: `PUT /api/staff/orders/{id}/serve`
- **Event**: ORDER_SERVED

#### 4.12.3 Paket Servis (Takeaway) Süreci
**Paket servis siparişlerinin süreci:**

**1. Sipariş hazır bildirimi:**
- **Frontend**: Kitchen Module / Ready Notification
- **Backend**: KitchenNotificationService
- **Database**: `kitchen_orders`
- **API**: `PUT /api/kitchen/orders/{id}/ready`
- **Event**: ORDER_READY_FOR_PICKUP

**2. Müşteri bildirimi:**
- **Frontend**: Customer Notification System
- **Backend**: CustomerNotificationService
- **Database**: `notifications`
- **API**: `POST /api/notifications/order-ready`
- **Event**: CUSTOMER_NOTIFIED

**3. Paket teslimi:**
- **Frontend**: Pickup Confirmation Component
- **Backend**: PickupService
- **Database**: `orders`
- **API**: `PUT /api/orders/{id}/picked-up`
- **Event**: ORDER_PICKED_UP

### 4.13 Kurye Yönetimi ve Takip Sistemi

#### 4.13.1 Hibrit Kurye Yönetimi
**İşletmelerin kendi kuryelerini ve platform kuryelerini yönetebilmesi:**

**1. İşletme Kuryesi Kayıt Sistemi:**
- **Frontend**: Delivery Management Module / Courier Registration
- **Backend**: CourierRegistrationService
- **Database**: `business_couriers`
- **API**: `POST /api/couriers/register`
- **Event**: BUSINESS_COURIER_REGISTERED

**2. Kurye Profil Yönetimi:**
- **Frontend**: Courier Profile Management
- **Backend**: CourierProfileService
- **Database**: `courier_profiles`
- **API**: `PUT /api/couriers/{id}/profile`
- **Event**: COURIER_PROFILE_UPDATED

**3. Kurye Durum Takibi:**
- **Frontend**: Courier Status Dashboard
- **Backend**: CourierStatusService
- **Database**: `courier_status`
- **API**: `GET /api/couriers/{id}/status`
- **Event**: COURIER_STATUS_UPDATED

#### 4.13.2 Kurye Atama ve Seçim Sistemi
**Sipariş için kurye seçimi ve atama süreci:**

**1. Kurye Seçim Arayüzü:**
- **Frontend**: Order Management / Courier Selection
- **Backend**: CourierSelectionService
- **Database**: `courier_assignments`
- **API**: `GET /api/orders/{id}/available-couriers`
- **Event**: COURIER_SELECTION_REQUESTED

**2. Otomatik Kurye Atama:**
- **Frontend**: Auto-assignment System
- **Backend**: AutoCourierAssignmentService
- **Database**: `courier_assignments`
- **API**: `POST /api/couriers/auto-assign`
- **Event**: COURIER_AUTO_ASSIGNED

**3. Manuel Kurye Atama:**
- **Frontend**: Manual Assignment Interface
- **Backend**: ManualCourierAssignmentService
- **Database**: `courier_assignments`
- **API**: `POST /api/couriers/manual-assign`
- **Event**: COURIER_MANUALLY_ASSIGNED

#### 4.13.3 Kurye Performans ve Analitik
**Kurye performansının izlenmesi ve analizi:**

**1. Kurye Performans Metrikleri:**
- **Frontend**: Courier Analytics Dashboard
- **Backend**: CourierAnalyticsService
- **Database**: `courier_performance`
- **API**: `GET /api/couriers/{id}/performance`
- **Event**: COURIER_PERFORMANCE_CALCULATED

**2. Teslimat Süresi Analizi:**
- **Frontend**: Delivery Time Analytics
- **Backend**: DeliveryTimeAnalyticsService
- **Database**: `delivery_times`
- **API**: `GET /api/analytics/delivery-times`
- **Event**: DELIVERY_TIME_ANALYZED

**3. Kurye Değerlendirme Sistemi:**
- **Frontend**: Courier Rating System
- **Backend**: CourierRatingService
- **Database**: `courier_ratings`
- **API**: `POST /api/couriers/{id}/rate`
- **Event**: COURIER_RATED

#### 4.13.4 Kurye Bildirim ve İletişim Sistemi
**Kurye ile iletişim ve bildirim sistemi:**

**1. Kurye Bildirimleri:**
- **Frontend**: Courier Notification Center
- **Backend**: CourierNotificationService
- **Database**: `courier_notifications`
- **API**: `POST /api/couriers/{id}/notify`
- **Event**: COURIER_NOTIFIED

**2. Kurye İletişim Sistemi:**
- **Frontend**: Courier Communication Interface
- **Backend**: CourierCommunicationService
- **Database**: `courier_messages`
- **API**: `POST /api/couriers/{id}/message`
- **Event**: COURIER_MESSAGE_SENT

**3. Acil Durum Bildirimleri:**
- **Frontend**: Emergency Alert System
- **Backend**: EmergencyAlertService
- **Database**: `emergency_alerts`
- **API**: `POST /api/couriers/emergency-alert`
- **Event**: EMERGENCY_ALERT_SENT

#### 4.13.5 Kurye Maliyet ve Ödeme Sistemi
**Kurye maliyetlerinin yönetimi:**

**1. Platform Kuryesi Ücretlendirmesi:**
- **Frontend**: Platform Courier Pricing
- **Backend**: PlatformCourierPricingService
- **Database**: `platform_courier_fees`
- **API**: `GET /api/couriers/platform-pricing`
- **Event**: PLATFORM_COURIER_PRICING_CALCULATED

**2. İşletme Kuryesi Maliyet Takibi:**
- **Frontend**: Business Courier Cost Tracking
- **Backend**: BusinessCourierCostService
- **Database**: `business_courier_costs`
- **API**: `GET /api/couriers/business-costs`
- **Event**: BUSINESS_COURIER_COST_CALCULATED

**3. Kurye Ödeme Sistemi:**
- **Frontend**: Courier Payment Management
- **Backend**: CourierPaymentService
- **Database**: `courier_payments`
- **API**: `POST /api/couriers/{id}/payment`
- **Event**: COURIER_PAYMENT_PROCESSED

### 4.14 Finansal Geri Alma (Rollback) Mantığı

#### 4.13.1 Normal Sipariş İptali Rollback Süreci
**Bir sipariş iptal edildiğinde gerçekleşen rollback işlemleri:**

**1. Sipariş durumu kontrolü:**
- **Kural**: Sipariş durumu 'Hazırlanıyor' aşamasına geçmeden iptal edilebilir
- **Frontend**: Orders Module / Cancel Order
- **Backend**: OrderCancellationService
- **Database**: `orders` tablosu
- **API**: `PUT /api/orders/{id}/cancel`
- **Validation**: Check order status before cancellation

**2. Stok geri yükleme:**
- **Kural**: İptal edilen siparişteki ürünlerin stok miktarları geri yüklenir
- **Frontend**: Inventory Module / Stock Update
- **Backend**: InventoryService
- **Database**: `inventory` tablosu
- **API**: `PUT /api/inventory/restore-stock`
- **Event**: STOCK_RESTORED

**3. Ödeme iadesi:**
- **Kural**: Yapılan ödeme tam olarak iade edilir
- **Frontend**: Payment Module / Refund Process
- **Backend**: PaymentRefundService
- **Database**: `payments`, `refunds`
- **API**: `POST /api/payments/{id}/refund`
- **Event**: PAYMENT_REFUNDED

**4. Sadakat puanı geri alma:**
- **Kural**: Sipariş için verilen sadakat puanları geri alınır
- **Frontend**: Loyalty Module / Points Adjustment
- **Backend**: LoyaltyService
- **Database**: `customers` tablosu
- **API**: `PUT /api/loyalty/reverse-points`
- **Event**: LOYALTY_POINTS_REVERSED

#### 4.13.2 "Ciro Partnerliği" Rollback Süreci
**"Ciro Partnerliği" programındaki siparişlerin iptali/iadesi durumunda:**

**1. "Lezzet Kredisi" iadesi:**
- **Kural**: Bir sipariş iptal edildiğinde, kullanılan 'Lezzet Kredisi' kullanıcıya iade edilir
- **Frontend**: Customer Module / Credit Balance
- **Backend**: CreditRefundService
- **Database**: `credit_transactions`
- **API**: `POST /api/credits/refund`
- **Event**: CREDIT_REFUNDED

**2. İşletme sübvansiyonu iptali:**
- **Kural**: İşletmeye ödenecek sübvansiyon kaydı iptal edilir
- **Frontend**: Business Module / Subsidy Management
- **Backend**: SubsidyCancellationService
- **Database**: `partner_subsidies`
- **API**: `PUT /api/subsidies/{id}/cancel`
- **Event**: SUBSIDY_CANCELLED

**3. Komisyon kaydı düzeltme:**
- **Kural**: Platform komisyonu kaydı düzeltilir
- **Frontend**: Financial Module / Commission Adjustment
- **Backend**: CommissionAdjustmentService
- **Database**: `commissions`
- **API**: `PUT /api/commissions/{id}/adjust`
- **Event**: COMMISSION_ADJUSTED

**4. Transaction bütünlüğü:**
- **Kural**: Bu işlemler tek bir veritabanı transaction'ı içinde yapılmalıdır
- **Backend**: TransactionService
- **Database**: All related tables
- **API**: `POST /api/transactions/rollback`
- **Event**: TRANSACTION_ROLLBACK_COMPLETED

#### 4.13.3 Kısmi İade Rollback Süreci
**Siparişin bir kısmı iade edildiğinde:**

**1. Kısmi stok geri yükleme:**
- **Kural**: İade edilen ürünlerin stok miktarları orantılı olarak geri yüklenir
- **Frontend**: Inventory Module / Partial Stock Restore
- **Backend**: PartialInventoryService
- **Database**: `inventory` tablosu
- **API**: `PUT /api/inventory/partial-restore`
- **Event**: PARTIAL_STOCK_RESTORED

**2. Kısmi ödeme iadesi:**
- **Kural**: İade edilen ürünlerin tutarı kadar ödeme iadesi yapılır
- **Frontend**: Payment Module / Partial Refund
- **Backend**: PartialRefundService
- **Database**: `payments`, `refunds`
- **API**: `POST /api/payments/{id}/partial-refund`
- **Event**: PARTIAL_PAYMENT_REFUNDED

**3. Kısmi sadakat puanı düzeltme:**
- **Kural**: İade edilen ürünler için verilen puanlar geri alınır
- **Frontend**: Loyalty Module / Partial Points Adjustment
- **Backend**: PartialLoyaltyService
- **Database**: `customers` tablosu
- **API**: `PUT /api/loyalty/partial-reverse-points`
- **Event**: PARTIAL_LOYALTY_POINTS_REVERSED

#### 4.13.4 Rollback Güvenlik Kuralları
**Rollback işlemlerinin güvenliği için:**

**1. Yetkilendirme kontrolü:**
- **Kural**: Rollback işlemleri sadece yetkili kullanıcılar tarafından yapılabilir
- **Frontend**: Authorization check
- **Backend**: AuthorizationService
- **Database**: `user_roles`
- **API**: `GET /api/auth/check-permission`
- **Validation**: Role-based access control

**2. Audit logging:**
- **Kural**: Tüm rollback işlemleri detaylı olarak loglanır
- **Frontend**: Audit log display
- **Backend**: AuditLogService
- **Database**: `audit_logs`
- **API**: `POST /api/audit/log-rollback`
- **Event**: ROLLBACK_AUDIT_LOGGED

**3. Rollback limitleri:**
- **Kural**: Belirli bir süre sonra rollback işlemi yapılamaz
- **Frontend**: Time limit validation
- **Backend**: RollbackValidationService
- **Database**: `orders` tablosu
- **API**: `GET /api/orders/{id}/rollback-eligibility`
- **Validation**: Time-based rollback restrictions

### 4.15 Vergi ve Regülasyon Esnekliği Sistemi

#### 4.15.1 Vergi Oranları Yönetimi
**Dinamik vergi oranları ve türleri yönetimi:**

**1. Vergi Oranları Güncelleme:**
- **Frontend**: Tax Rate Management Interface
- **Backend**: TaxRateService
- **Database**: `tax_rates`, `tax_types`
- **API**: `PUT /api/admin/tax-rates/{id}`
- **Event**: TAX_RATE_UPDATED

**2. Yeni Vergi Türü Ekleme:**
- **Frontend**: Tax Type Creation Interface
- **Backend**: TaxTypeService
- **Database**: `tax_types`
- **API**: `POST /api/admin/tax-types`
- **Event**: TAX_TYPE_CREATED

**3. Tarih Bazlı Vergi Takibi:**
- **Frontend**: Tax History Timeline
- **Backend**: TaxHistoryService
- **Database**: `tax_rate_history`
- **API**: `GET /api/admin/tax-rates/history`
- **Event**: TAX_HISTORY_RECORDED

#### 4.15.2 Kesinti ve Komisyon Oranları Yönetimi
**Platform genelinde kesinti ve komisyon oranları:**

**1. Platform Komisyon Oranları:**
- **Frontend**: Platform Commission Settings
- **Backend**: PlatformCommissionService
- **Database**: `commission_rates`
- **API**: `PUT /api/admin/commission-rates`
- **Event**: COMMISSION_RATE_UPDATED

**2. Ciro Partnerliği Kesinti Oranları:**
- **Frontend**: Revenue Partnership Deduction Settings
- **Backend**: RevenuePartnershipService
- **Database**: `revenue_partnership_rates`
- **API**: `PUT /api/admin/revenue-partnership-rates`
- **Event**: REVENUE_PARTNERSHIP_RATE_UPDATED

**3. İşletme Bazlı Özel Oranlar:**
- **Frontend**: Business-Specific Rate Management
- **Backend**: BusinessRateService
- **Database**: `business_specific_rates`
- **API**: `PUT /api/admin/business-rates/{business_id}`
- **Event**: BUSINESS_RATE_UPDATED

#### 4.15.3 Regülasyon Parametreleri Yönetimi
**Dinamik regülasyon kuralları ve validasyonları:**

**1. Form Validasyon Kuralları:**
- **Frontend**: Form Validation Rule Management
- **Backend**: FormValidationService
- **Database**: `form_validation_rules`
- **API**: `PUT /api/admin/form-validation-rules`
- **Event**: VALIDATION_RULE_UPDATED

**2. Zorunlu Alan Yönetimi:**
- **Frontend**: Required Field Management
- **Backend**: RequiredFieldService
- **Database**: `required_fields`
- **API**: `PUT /api/admin/required-fields`
- **Event**: REQUIRED_FIELD_UPDATED

**3. İşletme Türü Bazlı Regülasyonlar:**
- **Frontend**: Business Type Regulation Settings
- **Backend**: BusinessTypeRegulationService
- **Database**: `business_type_regulations`
- **API**: `PUT /api/admin/business-type-regulations`
- **Event**: BUSINESS_TYPE_REGULATION_UPDATED

### 4.16 Kurye Yönetimi İş Kuralları

#### 4.16.1 Kurye Kayıt ve Onay Kuralları
**İşletme kuryelerinin sisteme kayıt süreci:**

**Kurye Kayıt Gereksinimleri:**
- **Kural**: İşletme kuryesi kaydı için minimum bilgi zorunluluğu
- **Frontend**: Courier Registration Form
- **Backend**: CourierValidationService
- **Database**: `business_couriers`
- **API**: `POST /api/couriers/validate-registration`
- **Validation**: Required fields: name, phone, vehicle_type, license_plate

**Kurye Onay Süreci:**
- **Kural**: İşletme kuryesi kaydı işletme tarafından onaylanmalıdır
- **Frontend**: Courier Approval Interface
- **Backend**: CourierApprovalService
- **Database**: `business_couriers`
- **API**: `PUT /api/couriers/{id}/approve`
- **Event**: COURIER_APPROVED

**Kurye Aktiflik Durumu:**
- **Kural**: Kurye sadece aktif durumdayken sipariş alabilir
- **Frontend**: Courier Status Management
- **Backend**: CourierStatusService
- **Database**: `courier_status`
- **API**: `PUT /api/couriers/{id}/status`
- **Validation**: Check courier availability before assignment

#### 4.16.2 Kurye Atama Kuralları
**Sipariş-kurye eşleştirme kuralları:**

**Mesafe Bazlı Atama:**
- **Kural**: En yakın müsait kurye öncelikli olarak atanır
- **Frontend**: Distance-based Assignment
- **Backend**: DistanceBasedAssignmentService
- **Database**: `courier_assignments`
- **API**: `POST /api/couriers/assign-by-distance`
- **Event**: COURIER_ASSIGNED_BY_DISTANCE

**Kurye Kapasitesi Kontrolü:**
- **Kural**: Kurye aynı anda maksimum 3 sipariş alabilir
- **Frontend**: Capacity Check Interface
- **Backend**: CourierCapacityService
- **Database**: `courier_assignments`
- **API**: `GET /api/couriers/{id}/capacity`
- **Validation**: Check current order count before assignment

**Öncelik Sistemi:**
- **Kural**: Platform kuryeleri, işletme kuryelerinden sonra atanır
- **Frontend**: Priority-based Assignment
- **Backend**: PriorityAssignmentService
- **Database**: `courier_assignments`
- **API**: `POST /api/couriers/assign-by-priority`
- **Event**: COURIER_ASSIGNED_BY_PRIORITY

#### 4.16.3 Kurye Performans Kuralları
**Kurye performansının değerlendirilmesi:**

**Teslimat Süresi Standartları:**
- **Kural**: Maksimum teslimat süresi 45 dakika olmalıdır
- **Frontend**: Delivery Time Monitoring
- **Backend**: DeliveryTimeMonitoringService
- **Database**: `delivery_times`
- **API**: `GET /api/couriers/{id}/delivery-performance`
- **Event**: DELIVERY_TIME_EXCEEDED

**Müşteri Memnuniyeti:**
- **Kural**: 4.0 altındaki ortalama puan alan kurye uyarı alır
- **Frontend**: Customer Satisfaction Monitoring
- **Backend**: CustomerSatisfactionService
- **Database**: `courier_ratings`
- **API**: `GET /api/couriers/{id}/satisfaction-score`
- **Event**: LOW_SATISFACTION_ALERT

**Performans Değerlendirme:**
- **Kural**: Aylık performans raporu otomatik oluşturulur
- **Frontend**: Monthly Performance Report
- **Backend**: MonthlyPerformanceService
- **Database**: `courier_performance`
- **API**: `GET /api/couriers/{id}/monthly-report`
- **Event**: MONTHLY_PERFORMANCE_REPORT_GENERATED

#### 4.16.4 Kurye Ödeme ve Maliyet Kuralları
**Kurye ödemelerinin yönetimi:**

**Platform Kuryesi Ücretlendirmesi:**
- **Kural**: Platform kuryesi ücreti mesafe ve süreye göre hesaplanır
- **Frontend**: Platform Courier Pricing Calculator
- **Backend**: PlatformCourierPricingService
- **Database**: `platform_courier_fees`
- **API**: `POST /api/couriers/calculate-platform-fee`
- **Event**: PLATFORM_FEE_CALCULATED

**İşletme Kuryesi Maliyet Takibi:**
- **Kural**: İşletme kuryesi maliyeti işletme tarafından belirlenir
- **Frontend**: Business Courier Cost Management
- **Backend**: BusinessCourierCostService
- **Database**: `business_courier_costs`
- **API**: `PUT /api/couriers/business-cost-settings`
- **Event**: BUSINESS_COST_SETTINGS_UPDATED

**Ödeme Zamanlaması:**
- **Kural**: Platform kuryesi ödemeleri haftalık yapılır
- **Frontend**: Payment Schedule Management
- **Backend**: PaymentScheduleService
- **Database**: `courier_payments`
- **API**: `GET /api/couriers/payment-schedule`
- **Event**: PAYMENT_SCHEDULE_GENERATED

#### 4.16.5 Kurye Güvenlik ve Acil Durum Kuralları
**Kurye güvenliği ve acil durum yönetimi:**

**Acil Durum Bildirimi:**
- **Kural**: Kurye acil durum butonuna bastığında anında müdahale edilir
- **Frontend**: Emergency Button Interface
- **Backend**: EmergencyResponseService
- **Database**: `emergency_alerts`
- **API**: `POST /api/couriers/emergency-alert`
- **Event**: EMERGENCY_ALERT_TRIGGERED

**Güvenlik Takibi:**
- **Kural**: Kurye konumu sürekli izlenir ve anormal durumlar tespit edilir
- **Frontend**: Security Monitoring Dashboard
- **Backend**: SecurityMonitoringService
- **Database**: `courier_locations`
- **API**: `GET /api/couriers/{id}/security-status`
- **Event**: SECURITY_ANOMALY_DETECTED

**Sigorta ve Sorumluluk:**
- **Kural**: Platform kuryeleri sigortalıdır, işletme kuryeleri işletme sorumluluğundadır
- **Frontend**: Insurance and Liability Information
- **Backend**: InsuranceService
- **Database**: `courier_insurance`
- **API**: `GET /api/couriers/{id}/insurance-info`
- **Event**: INSURANCE_INFO_REQUESTED

### 4.17 Yönetim Paneli (B2B Arayüzü) Mimarisi

#### 4.17.1 Panel Genel Layout Yapısı
**Modern ve responsive panel tasarımı:**

**1. Ana Layout Sistemi:**
- **Frontend**: ModernLayout Component
- **Backend**: LayoutService
- **Database**: `user_preferences`, `layout_settings`
- **API**: `GET /api/panel/layout-config`
- **Event**: LAYOUT_CONFIG_LOADED

**2. Header Bölümü:**
- **Frontend**: DashboardHeader Component
- **Backend**: HeaderService
- **Database**: `user_sessions`, `active_modules`
- **API**: `GET /api/panel/header-info`
- **Event**: HEADER_INFO_UPDATED

**3. Sidebar Sistemi:**
- **Frontend**: DesktopSidebar, MobileSidebar Components
- **Backend**: SidebarService
- **Database**: `module_permissions`, `user_modules`
- **API**: `GET /api/panel/sidebar-modules`
- **Event**: SIDEBAR_MODULES_UPDATED

#### 4.17.2 17 Ana Modül Sistemi
**Kapsamlı işletme yönetimi modülleri:**

**1. Dashboard Modülü:**
- **Frontend**: Dashboard Module
- **Backend**: DashboardService
- **Database**: `dashboard_metrics`, `real_time_data`
- **API**: `GET /api/dashboard/stats`
- **Ana Bileşenler**: Metrik kartları, grafikler, real-time güncellemeler
- **Event**: DASHBOARD_DATA_UPDATED

**2. Orders Modülü:**
- **Frontend**: Orders Management Module
- **Backend**: OrderManagementService
- **Database**: `orders`, `order_items`, `order_status`
- **API**: `GET /api/orders`, `POST /api/orders`
- **Ana Bileşenler**: Sipariş listesi tablosu, sipariş detay modalı, filtreleme seçenekleri
- **Event**: ORDER_STATUS_CHANGED

**3. Tables Modülü:**
- **Frontend**: Table Management Module
- **Backend**: TableManagementService
- **Database**: `tables`, `table_sessions`, `qr_codes`
- **API**: `GET /api/tables`, `PUT /api/tables/{id}/status`
- **Ana Bileşenler**: Masa haritası, QR kod yönetimi, oturum takibi
- **Event**: TABLE_STATUS_UPDATED

**4. Menu Management Modülü:**
- **Frontend**: Menu Management Module
- **Backend**: MenuManagementService
- **Database**: `categories`, `products`, `product_variants`
- **API**: `GET /api/menu/categories`, `POST /api/menu/products`
- **Ana Bileşenler**: Kategori yönetimi, ürün ekleme/düzenleme, fiyat yönetimi
- **Event**: MENU_ITEM_UPDATED

**5. Inventory Modülü:**
- **Frontend**: Inventory Management Module
- **Backend**: InventoryService
- **Database**: `inventory_items`, `stock_movements`, `suppliers`
- **API**: `GET /api/inventory/items`, `PUT /api/inventory/stock`
- **Ana Bileşenler**: Stok takibi, tedarikçi yönetimi, düşük stok uyarıları
- **Event**: INVENTORY_STOCK_CHANGED

**6. Reports Modülü:**
- **Frontend**: Reports and Analytics Module
- **Backend**: ReportsService
- **Database**: `report_templates`, `analytics_data`
- **API**: `GET /api/reports/sales`, `POST /api/reports/generate`
- **Ana Bileşenler**: Satış raporları, analitik grafikler, özelleştirilebilir raporlar
- **Event**: REPORT_GENERATED

**7. Customers Modülü:**
- **Frontend**: Customer Management Module
- **Backend**: CustomerService
- **Database**: `customers`, `customer_profiles`, `customer_history`
- **API**: `GET /api/customers`, `PUT /api/customers/{id}`
- **Ana Bileşenler**: Müşteri listesi, profil yönetimi, sipariş geçmişi
- **Event**: CUSTOMER_PROFILE_UPDATED

**8. Loyalty Modülü:**
- **Frontend**: Loyalty Program Module
- **Backend**: LoyaltyService
- **Database**: `loyalty_programs`, `loyalty_points`, `rewards`
- **API**: `GET /api/loyalty/programs`, `POST /api/loyalty/points`
- **Ana Bileşenler**: Sadakat programı yönetimi, puan sistemi, ödül kataloğu
- **Event**: LOYALTY_POINTS_EARNED

**9. Kitchen Modülü:**
- **Frontend**: Kitchen Management Module
- **Backend**: KitchenService
- **Database**: `kitchen_orders`, `preparation_stations`, `cooking_times`
- **API**: `GET /api/kitchen/orders`, `PUT /api/kitchen/order-status`
- **Ana Bileşenler**: Mutfak sipariş ekranı, hazırlama istasyonları, zaman takibi
- **Event**: KITCHEN_ORDER_STATUS_CHANGED

**10. Staff Modülü:**
- **Frontend**: Staff Management Module
- **Backend**: StaffService
- **Database**: `staff_members`, `staff_roles`, `work_schedules`
- **API**: `GET /api/staff/members`, `POST /api/staff/schedule`
- **Ana Bileşenler**: Personel listesi, vardiya yönetimi, performans takibi
- **Event**: STAFF_SCHEDULE_UPDATED

**11. Reservations Modülü:**
- **Frontend**: Reservation Management Module
- **Backend**: ReservationService
- **Database**: `reservations`, `table_availability`, `reservation_settings`
- **API**: `GET /api/reservations`, `POST /api/reservations`
- **Ana Bileşenler**: Rezervasyon takvimi, masa müsaitlik kontrolü, onay sistemi
- **Event**: RESERVATION_CREATED

**12. Feedback Modülü:**
- **Frontend**: Customer Feedback Module
- **Backend**: FeedbackService
- **Database**: `customer_feedback`, `feedback_ratings`, `feedback_responses`
- **API**: `GET /api/feedback`, `POST /api/feedback/response`
- **Ana Bileşenler**: Müşteri geribildirimleri, değerlendirme analizi, yanıt sistemi
- **Event**: FEEDBACK_RECEIVED

**13. Notifications Modülü:**
- **Frontend**: Notification Settings Module
- **Backend**: NotificationService
- **Database**: `notification_settings`, `notification_templates`, `notification_logs`
- **API**: `GET /api/notifications/settings`, `PUT /api/notifications/templates`
- **Ana Bileşenler**: Bildirim ayarları, şablon yönetimi, gönderim geçmişi
- **Event**: NOTIFICATION_SENT

**14. Communications Modülü:**
- **Frontend**: Communication Management Module
- **Backend**: CommunicationService
- **Database**: `communication_channels`, `message_templates`, `communication_logs`
- **API**: `GET /api/communications/channels`, `POST /api/communications/send`
- **Ana Bileşenler**: İletişim kanalları, mesaj şablonları, gönderim takibi
- **Event**: COMMUNICATION_SENT

**15. Calendar Modülü:**
- **Frontend**: Event Calendar Module
- **Backend**: CalendarService
- **Database**: `events`, `event_categories`, `event_reminders`
- **API**: `GET /api/calendar/events`, `POST /api/calendar/events`
- **Ana Bileşenler**: Etkinlik takvimi, etkinlik yönetimi, hatırlatma sistemi
- **Event**: EVENT_CREATED

**16. Help Modülü:**
- **Frontend**: Help and Support Module
- **Backend**: HelpService
- **Database**: `help_articles`, `support_tickets`, `faq_categories`
- **API**: `GET /api/help/articles`, `POST /api/help/tickets`
- **Ana Bileşenler**: Yardım makaleleri, destek talepleri, SSS
- **Event**: SUPPORT_TICKET_CREATED

**17. Settings Modülü:**
- **Frontend**: System Settings Module
- **Backend**: SettingsService
- **Database**: `system_settings`, `business_settings`, `user_preferences`
- **API**: `GET /api/settings`, `PUT /api/settings`
- **Ana Bileşenler**: Sistem ayarları, işletme ayarları, kullanıcı tercihleri
- **Event**: SETTINGS_UPDATED

#### 4.17.3 Detaylı Yetkilendirme Mantığı (Authorization)
**Modül bazında yetkilendirme kuralları:**

**1. Rol Tabanlı Erişim Kontrolü:**
- **Frontend**: AuthorizationGuard Component
- **Backend**: AuthorizationService
- **Database**: `user_roles`, `role_permissions`, `module_access`
- **API**: `GET /api/auth/permissions`
- **Event**: PERMISSION_CHECKED

**2. Modül Bazında Yetkilendirme Kuralları:**

**Reports Modülü Yetkilendirmesi:**
- **Kural**: Reports modülüne sadece ADMIN ve MANAGER rollerine sahip kullanıcılar erişebilir
- **Frontend**: ReportsAccessGuard
- **Backend**: ReportsAuthorizationService
- **Database**: `reports_permissions`
- **API**: `GET /api/reports/access-control`
- **Validation**: Role-based access check

**Staff Modülü Yetkilendirmesi:**
- **Kural**: STAFF rolündeki bir kullanıcı, Staff modülünde sadece kendi profilini ve vardiya bilgilerini görebilir, diğer personelin bilgilerini düzenleyemez
- **Frontend**: StaffAccessGuard
- **Backend**: StaffAuthorizationService
- **Database**: `staff_permissions`
- **API**: `GET /api/staff/own-profile`
- **Validation**: Self-access restriction

**Orders Modülü Yetkilendirmesi:**
- **Kural**: CASHIER rolü sadece sipariş oluşturabilir ve durumunu güncelleyebilir, iptal edemez
- **Frontend**: OrdersAccessGuard
- **Backend**: OrdersAuthorizationService
- **Database**: `orders_permissions`
- **API**: `POST /api/orders/validate-permission`
- **Validation**: Action-based permission check

**Settings Modülü Yetkilendirmesi:**
- **Kural**: Settings modülüne sadece ADMIN rolü erişebilir
- **Frontend**: SettingsAccessGuard
- **Backend**: SettingsAuthorizationService
- **Database**: `settings_permissions`
- **API**: `GET /api/settings/admin-only`
- **Validation**: Admin-only access check

**3. Dinamik Yetkilendirme Sistemi:**
- **Frontend**: DynamicPermissionGuard
- **Backend**: DynamicAuthorizationService
- **Database**: `dynamic_permissions`, `permission_rules`
- **API**: `GET /api/auth/dynamic-permissions`
- **Event**: DYNAMIC_PERMISSION_UPDATED

#### 4.17.4 Real-time Sistem Entegrasyonu
**Canlı veri güncellemeleri:**

**1. WebSocket Bağlantısı:**
- **Frontend**: useRealTimeModule Hook
- **Backend**: WebSocketService
- **Database**: `websocket_connections`, `real_time_events`
- **API**: `WS /api/realtime/connect`
- **Event**: REALTIME_CONNECTION_ESTABLISHED

**2. Real-time Özellikler:**
- **Dashboard**: Canlı metrik güncellemeleri
- **Orders**: Anlık sipariş durumu değişiklikleri
- **Tables**: Gerçek zamanlı masa durumu güncellemeleri
- **Kitchen**: Mutfak sipariş durumu değişiklikleri
- **Notifications**: Anlık bildirim gönderimi

#### 4.17.5 Admin Floating Menu
**Hızlı erişim menüsü:**

**1. AdminFloatingMenu Component:**
- **Frontend**: AdminFloatingMenu
- **Backend**: QuickActionService
- **Database**: `quick_actions`, `admin_shortcuts`
- **API**: `GET /api/admin/quick-actions`
- **Event**: QUICK_ACTION_TRIGGERED

**2. Hızlı Aksiyonlar:**
- **Quick Order**: Hızlı sipariş oluşturma
- **New Customer**: Yeni müşteri ekleme
- **Staff Call**: Personel çağırma
- **Today Reports**: Günlük raporlar
- **Emergency Alert**: Acil durum bildirimi

### 4.18 Yemek Siparişi Platformu (B2C Arayüzü) Mimarisi

#### 4.18.1 Tüketici Arayüzü (Web/Mobil)
**Tam özellikli B2C yemek siparişi platformu:**

**1. Ana Sayfa:**
- **Frontend**: HomePage Component
- **Backend**: HomePageService
- **Database**: `restaurants`, `popular_restaurants`, `user_preferences`
- **API**: `GET /api/restaurants/nearby`, `GET /api/restaurants/popular`
- **Ana Özellikler**: Konuma göre restoran listesi, popüler restoranlar, "Ciro Partneri" rozeti
- **Event**: HOME_PAGE_LOADED

**2. Restoran Arama ve Filtreleme:**
- **Frontend**: RestaurantSearch Component
- **Backend**: RestaurantSearchService
- **Database**: `restaurants`, `restaurant_categories`, `restaurant_filters`
- **API**: `GET /api/restaurants/search`, `GET /api/restaurants/filters`
- **Ana Özellikler**: Mutfak türü filtresi, puan filtresi, fiyat aralığı, "Lezzet Kredisi Kabul Edenler" filtresi
- **Event**: RESTAURANT_SEARCH_PERFORMED

**3. Restoran Detay Sayfası:**
- **Frontend**: RestaurantDetail Component
- **Backend**: RestaurantDetailService
- **Database**: `restaurants`, `restaurant_menus`, `restaurant_reviews`
- **API**: `GET /api/restaurants/{id}`, `GET /api/restaurants/{id}/menu`
- **Ana Özellikler**: Menü görüntüleme, adres bilgileri, çalışma saatleri, kullanıcı yorumları, "Ciro Partnerliği" koşulları
- **Event**: RESTAURANT_DETAIL_VIEWED

**4. Sipariş ve Ödeme Akışı:**
- **Frontend**: OrderFlow Component
- **Backend**: OrderFlowService
- **Database**: `orders`, `order_items`, `payment_methods`
- **API**: `POST /api/orders`, `POST /api/payments`
- **Ana Özellikler**: Sepet yönetimi, "Lezzet Kredisi" kullanımı, online ödeme, sipariş onayı
- **Event**: ORDER_PLACED

**5. Kullanıcı Profili:**
- **Frontend**: UserProfile Component
- **Backend**: UserProfileService
- **Database**: `users`, `user_orders`, `user_addresses`
- **API**: `GET /api/users/profile`, `GET /api/users/orders`
- **Ana Özellikler**: Sipariş geçmişi, "Lezzet Kredisi" bakiye, favori restoranlar, adres yönetimi
- **Event**: USER_PROFILE_UPDATED

#### 4.18.2 İşletme Tarafı Entegrasyonu
**B2C özelliklerinin B2B panelinde yönetimi:**

**1. Restoran Bilgileri Yönetimi:**
- **Frontend**: Business Settings Module
- **Backend**: BusinessSettingsService
- **Database**: `business_profiles`, `business_hours`, `business_addresses`
- **API**: `PUT /api/business/profile`, `PUT /api/business/hours`
- **B2C Entegrasyonu**: Tüketicinin göreceği "Restoran Detay" sayfasındaki bilgiler (adres, çalışma saatleri), işletmenin Yönetim Paneli'ndeki "Business Settings" modülünden dinamik olarak çekilir
- **Event**: BUSINESS_PROFILE_UPDATED

**2. Ciro Partnerliği Yönetimi:**
- **Frontend**: Revenue Partnership Module
- **Backend**: RevenuePartnershipService
- **Database**: `revenue_partnerships`, `loyalty_programs`, `credit_settings`
- **API**: `PUT /api/business/revenue-partnership`, `GET /api/business/credit-settings`
- **B2C Entegrasyonu**: Tüketicinin kullanacağı "Lezzet Kredisi Kabul Edenler" filtresi, işletmenin paneldeki "Ciro Partnerliği" modülünü aktif edip etmemesine bağlıdır
- **Event**: REVENUE_PARTNERSHIP_UPDATED

**3. Menü Yönetimi Entegrasyonu:**
- **Frontend**: Menu Management Module
- **Backend**: MenuManagementService
- **Database**: `categories`, `products`, `product_pricing`
- **API**: `GET /api/menu/categories`, `PUT /api/menu/products`
- **B2C Entegrasyonu**: Tüketicinin gördüğü menü, işletmenin "Menu Management" modülündeki ürün ve kategori ayarlarından dinamik olarak çekilir
- **Event**: MENU_UPDATED

**4. Sipariş Yönetimi Entegrasyonu:**
- **Frontend**: Orders Module
- **Backend**: OrderManagementService
- **Database**: `orders`, `order_status`, `order_sources`
- **API**: `GET /api/orders`, `PUT /api/orders/{id}/status`
- **B2C Entegrasyonu**: Platform siparişleri, işletmenin "Orders" modülünde "PLATFORM" kaynağı olarak görünür ve tek bir arayüzden yönetilir
- **Event**: ORDER_STATUS_CHANGED

#### 4.18.3 Lezzet Kredisi Sistemi
**Tüketici kredi sistemi:**

**1. Kredi Bakiye Yönetimi:**
- **Frontend**: CreditBalance Component
- **Backend**: CreditBalanceService
- **Database**: `user_credits`, `credit_transactions`, `credit_balances`
- **API**: `GET /api/users/credits/balance`, `GET /api/users/credits/transactions`
- **Ana Özellikler**: Kredi bakiye görüntüleme, işlem geçmişi, kredi kazanma yolları
- **Event**: CREDIT_BALANCE_UPDATED

**2. Kredi Kullanım Sistemi:**
- **Frontend**: CreditUsage Component
- **Backend**: CreditUsageService
- **Database**: `credit_usage`, `credit_limits`, `credit_categories`
- **API**: `POST /api/orders/use-credits`, `GET /api/credits/usage-limits`
- **Ana Özellikler**: Sipariş sırasında kredi kullanımı, kategori bazlı limitler, kredi hesaplama
- **Event**: CREDITS_USED

**3. Kredi Kazanma Sistemi:**
- **Frontend**: CreditEarning Component
- **Backend**: CreditEarningService
- **Database**: `credit_earnings`, `earning_rules`, `earning_campaigns`
- **API**: `POST /api/credits/earn`, `GET /api/credits/earning-rules`
- **Ana Özellikler**: Sipariş tamamlama ile kredi kazanma, kampanya bazlı kazanç, seviye sistemi
- **Event**: CREDITS_EARNED

#### 4.18.4 Konum Tabanlı Hizmetler
**Konum bazlı restoran arama ve teslimat:**

**1. Konum Tespiti:**
- **Frontend**: LocationService Component
- **Backend**: LocationService
- **Database**: `user_locations`, `delivery_zones`, `restaurant_locations`
- **API**: `GET /api/location/current`, `GET /api/restaurants/nearby`
- **Ana Özellikler**: GPS konum tespiti, yakındaki restoranlar, teslimat bölgesi kontrolü
- **Event**: LOCATION_DETECTED

**2. Teslimat Hesaplama:**
- **Frontend**: DeliveryCalculator Component
- **Backend**: DeliveryCalculatorService
- **Database**: `delivery_zones`, `delivery_fees`, `delivery_times`
- **API**: `POST /api/delivery/calculate`, `GET /api/delivery/zones`
- **Ana Özellikler**: Teslimat ücreti hesaplama, teslimat süresi tahmini, mesafe bazlı fiyatlandırma
- **Event**: DELIVERY_CALCULATED

**3. Adres Yönetimi:**
- **Frontend**: AddressManager Component
- **Backend**: AddressManagerService
- **Database**: `user_addresses`, `address_validation`, `delivery_addresses`
- **API**: `GET /api/users/addresses`, `POST /api/users/addresses`
- **Ana Özellikler**: Teslimat adresi kaydetme, adres doğrulama, favori adresler
- **Event**: ADDRESS_ADDED

#### 4.18.5 Mobil Uygulama Altyapısı
**Mobil uygulama desteği:**

**1. Responsive Tasarım:**
- **Frontend**: MobileResponsive Components
- **Backend**: MobileOptimizationService
- **Database**: `mobile_preferences`, `app_settings`
- **API**: `GET /api/mobile/config`, `PUT /api/mobile/preferences`
- **Ana Özellikler**: Mobil uyumlu tasarım, touch-friendly arayüz, mobil optimizasyon
- **Event**: MOBILE_CONFIG_UPDATED

**2. Push Bildirimleri:**
- **Frontend**: PushNotification Component
- **Backend**: PushNotificationService
- **Database**: `push_tokens`, `notification_settings`, `notification_history`
- **API**: `POST /api/notifications/push`, `PUT /api/notifications/settings`
- **Ana Özellikler**: Sipariş durumu bildirimleri, kampanya bildirimleri, özelleştirilebilir ayarlar
- **Event**: PUSH_NOTIFICATION_SENT

**3. Offline Desteği:**
- **Frontend**: OfflineSupport Component
- **Backend**: OfflineSupportService
- **Database**: `offline_data`, `sync_queue`, `offline_orders`
- **API**: `POST /api/offline/sync`, `GET /api/offline/status`
- **Ana Özellikler**: Offline sipariş oluşturma, veri senkronizasyonu, bağlantı durumu takibi
- **Event**: OFFLINE_SYNC_COMPLETED

## 5. GENEL SİSTEM ÖZELLİKLERİ

### 5.1 Özellik Kataloğu

#### 5.1.1 Müşteri Deneyimi Özellikleri

**QR Menü Sistemi:**
- **QR Kod Tarama**: Masa QR kodları ile menü erişimi
- **Responsive Tasarım**: Mobile-first menü tasarımı
- **Real-time Stok**: Anlık stok durumu gösterimi
- **Ürün Detayları**: Kalori, alerjenler, hazırlama süresi
- **Özelleştirme**: Ürün özelleştirme seçenekleri

**Sipariş Sistemi:**
- **Sepet Yönetimi**: Ürün ekleme, çıkarma, miktar değiştirme
- **Garson Çağırma**: Tek tıkla garson çağırma
- **Sipariş Takibi**: Real-time sipariş durumu
- **Ödeme Seçenekleri**: Çoklu ödeme yöntemi
- **Hesap Bölme**: Kişi bazlı hesap bölme

**Sadakat Programı:**
- **Puan Sistemi**: Harcama bazlı puan kazanma
- **Seviye Sistemi**: Bronze, Silver, Gold, Platinum
- **Ödüller**: Puan ile ücretsiz ürün
- **Kişiselleştirme**: Müşteri tercihleri

#### 5.1.2 Personel Yönetimi Özellikleri

**Vardiya Yönetimi:**
- **Vardiya Planlama**: Otomatik vardiya oluşturma
- **Personel Atama**: Masa ve bölge atamaları
- **Performans Takibi**: Gerçek zamanlı performans metrikleri
- **Bahşiş Dağıtımı**: Otomatik bahşiş hesaplama

**Mutfak Yönetimi:**
- **Sipariş Kuyruğu**: Öncelikli sipariş sıralaması
- **Hazırlama Süresi**: Gerçek zamanlı süre takibi
- **Kalite Kontrol**: Hazırlık sonrası kontrol
- **Stok Entegrasyonu**: Otomatik stok düşürme

#### 5.1.3 Yönetim ve Analitik Özellikleri

**Dashboard:**
- **Real-time Metrikler**: Anlık satış, sipariş, masa durumu
- **Trend Analizi**: Günlük, haftalık, aylık trendler
- **Performans Karşılaştırması**: Geçen dönem karşılaştırması
- **Alarm Sistemi**: Kritik durum uyarıları

**Raporlama:**
- **Satış Raporları**: Detaylı satış analizi
- **Personel Raporları**: Performans ve verimlilik
- **Müşteri Raporları**: Davranış ve sadakat analizi
- **Finansal Raporlar**: Kar/zarar, maliyet analizi

**Envanter Yönetimi:**
- **Stok Takibi**: Gerçek zamanlı stok seviyeleri
- **Otomatik Sipariş**: Minimum stok uyarıları
- **Maliyet Analizi**: Ürün bazlı maliyet hesaplama
- **Tedarikçi Yönetimi**: Tedarikçi bilgileri ve performans

#### 5.1.4 Sistem Özellikleri

**Çoklu Kiracı (Multi-tenant):**
- **Tenant İzolasyonu**: Veri güvenliği
- **Özelleştirme**: Tenant bazlı tema ve ayarlar
- **Ölçeklenebilirlik**: Bağımsız ölçeklendirme

**Güvenlik:**
- **Kimlik Doğrulama**: JWT token sistemi
- **Yetkilendirme**: Rol bazlı erişim kontrolü
- **Veri Şifreleme**: Hassas veri şifreleme
- **Audit Log**: Tüm işlem kayıtları

**Entegrasyon:**
- **Ödeme Sistemleri**: Çoklu ödeme entegrasyonu
- **Bildirim Sistemleri**: SMS, email, push notification
- **Harita Servisleri**: Konum bazlı özellikler
- **Analitik Servisleri**: Google Analytics entegrasyonu

### 5.2 Teknik Özellikler

#### 5.2.1 Frontend Teknolojileri
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui components
- **State Management**: React Context + Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Tam tip güvenliği
- **Responsive Design**: Mobile-first yaklaşım

#### 5.2.2 Backend Teknolojileri
- **Framework**: Express.js
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Joi/Yup
- **API Documentation**: Swagger/OpenAPI
- **Error Handling**: Structured error responses

#### 5.2.3 Real-time Teknolojileri
- **WebSocket**: Socket.io
- **Event System**: Custom event system
- **Live Updates**: Real-time dashboard updates
- **Notifications**: Push notifications
- **Real-time Chat**: Garson-müşteri iletişimi

#### 5.2.4 Monitoring ve Logging
- **Error Tracking**: Sentry
- **Performance**: Custom metrics
- **Logging**: Structured logging
- **Health Checks**: System health monitoring
- **Analytics**: Custom business metrics

### 5.3 Test ve Doğrulama Stratejisi

#### 5.3.1 Test Piramidi
**Birim Testleri (Jest):**
- **Kapsam**: Servis katmanındaki iş mantığı ve hesaplama fonksiyonları
- **Zorunluluk**: Tüm business logic fonksiyonları için zorunludur
- **Hedef**: %90+ test kapsamı
- **Örnekler**: Revenue hesaplamaları, sipariş validasyonları, kredi hesaplamaları

**Entegrasyon Testleri (Supertest):**
- **Kapsam**: Her API endpoint'inin veritabanı ile doğru iletişim kurduğunu doğrulama
- **Zorunluluk**: Tüm API endpoint'leri için yazılacaktır
- **Hedef**: %100 endpoint kapsamı
- **Örnekler**: Order creation, user authentication, payment processing

**Uçtan Uca Testler (Playwright/Cypress):**
- **Kapsam**: Kritik kullanıcı akışları (Müşteri Yolculuğu Pipeline)
- **Zorunluluk**: Ana kullanıcı senaryoları için oluşturulacaktır
- **Hedef**: %80+ kritik akış kapsamı
- **Örnekler**: Sipariş verme süreci, ödeme akışı, admin panel işlemleri

#### 5.3.2 Test Hedefleri
- **Genel Hedef**: Proje genelinde %80+ test kapsamı
- **Birim Testleri**: %90+ business logic kapsamı
- **Entegrasyon Testleri**: %100 API endpoint kapsamı
- **E2E Testleri**: %80+ kritik kullanıcı akışı kapsamı
- **Performans Testleri**: API response time < 200ms
- **Güvenlik Testleri**: Tüm güvenlik açıklarının kapatılması

#### 5.3.3 Test Otomasyonu
- **CI/CD Pipeline**: Her commit'te otomatik test çalıştırma
- **Pre-commit Hooks**: Kod kalitesi kontrolü
- **Test Raporları**: Detaylı test sonuçları ve kapsam raporları
- **Test Veritabanı**: Ayrı test veritabanı kullanımı
- **Mock Servisleri**: Dış servisler için mock implementasyonları

## 6. TASARIM SİSTEMİ VE FRONTEND PRENSİPLERİ

### 6.1 Görsel Anayasa

#### 6.1.1 Renk Paleti
**Primary Colors:**
- **Indigo (#6366F1)**: Ana marka rengi, primary buttons, links
- **Blue (#3B82F6)**: Secondary actions, info states
- **Emerald (#10B981)**: Success states, positive actions

**Secondary Colors:**
- **Amber (#F59E0B)**: Warning states, attention-grabbing
- **Red (#EF4444)**: Error states, destructive actions
- **Violet (#8B5CF6)**: Accent elements, special features

**Neutral Colors:**
- **Gray-50 (#F8FAFC)**: Light backgrounds, subtle surfaces
- **Gray-500 (#64748B)**: Secondary text, borders
- **Gray-800 (#1E293B)**: Primary text, dark surfaces

**Semantic Colors:**
- **Success (#10B981)**: Positive feedback, completed actions
- **Warning (#F59E0B)**: Caution states, pending actions
- **Error (#EF4444)**: Error messages, failed actions
- **Info (#3B82F6)**: Informational content, help text

#### 6.1.2 Tipografi Sistemi
**Font Families:**
- **Primary**: Inter (modern, readable, professional)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont
- **Monospace**: JetBrains Mono (code, technical content)

**Font Sizes:**
- **xs (12px)**: Captions, small labels, footnotes
- **sm (14px)**: Secondary text, form labels
- **base (16px)**: Body text, default size
- **lg (18px)**: Subheadings, emphasized text
- **xl (20px)**: Section headings
- **2xl (24px)**: Page headings
- **3xl (30px)**: Hero headings, large titles

**Font Weights:**
- **Light (300)**: Subtle text, captions
- **Normal (400)**: Body text, default weight
- **Medium (500)**: Emphasized text, labels
- **Semibold (600)**: Subheadings, important text
- **Bold (700)**: Headings, strong emphasis

#### 6.1.3 Spacing Sistemi
**Margin Scale:**
- **0**: No margin, direct contact
- **1 (4px)**: Minimal spacing, tight layouts
- **2 (8px)**: Small spacing, related elements
- **3 (12px)**: Standard spacing, component gaps
- **4 (16px)**: Medium spacing, section gaps
- **5 (20px)**: Large spacing, major sections
- **6 (24px)**: Extra large spacing, page sections
- **8 (32px)**: Huge spacing, page margins
- **10 (40px)**: Massive spacing, hero sections
- **12 (48px)**: Extreme spacing, full sections

**Padding Scale:**
- Same as margin scale for consistency
- Component-specific adjustments for optimal touch targets
- Button padding: 12px 24px (vertical horizontal)
- Input padding: 12px 16px (vertical horizontal)
- Card padding: 16px 24px (vertical horizontal)

#### 6.1.4 Border Radius Değerleri
- **Small (4px)**: Buttons, inputs, small components
- **Medium (8px)**: Cards, modals, containers
- **Large (12px)**: Large components, major containers
- **Full (50%)**: Avatars, circular elements

#### 6.1.5 Shadow Efektleri
- **Small**: 0 1px 2px 0 rgba(0, 0, 0, 0.05) (inputs, buttons)
- **Medium**: 0 4px 6px -1px rgba(0, 0, 0, 0.1) (cards, dropdowns)
- **Large**: 0 10px 15px -3px rgba(0, 0, 0, 0.1) (modals, overlays)
- **Extra Large**: 0 25px 50px -12px rgba(0, 0, 0, 0.25) (hero sections)

### 6.2 Temel Bileşenler

#### 6.2.1 Button Varyantları
**Primary Button:**
- **Color**: Primary brand color (#6366F1)
- **Size**: Medium (height: 40px, padding: 12px 24px)
- **Text**: Action-oriented, clear call-to-action
- **States**: Default, hover, active, disabled
- **Icon Support**: Left/right icon positioning

**Secondary Button:**
- **Color**: Secondary color (#64748B)
- **Size**: Medium (height: 40px, padding: 12px 24px)
- **Text**: Descriptive, supporting actions
- **States**: Default, hover, active, disabled
- **Border**: 1px solid border

**Ghost Button:**
- **Color**: Transparent background, text color
- **Size**: Medium (height: 40px, padding: 12px 24px)
- **Text**: Subtle, minimal actions
- **States**: Default, hover (background), active, disabled
- **Hover Effect**: Light background color

**Icon Button:**
- **Color**: Inherit from parent
- **Size**: Small (height: 32px, width: 32px)
- **Text**: None, icon only
- **States**: Default, hover, active, disabled
- **Accessibility**: Screen reader support

#### 6.2.2 Card Tipleri
**Metric Card:**
- **Header**: Title with icon, subtitle
- **Value**: Large number display, currency formatting
- **Change Indicator**: Percentage, trend arrow, color coding
- **Icon**: Contextual icon, color-coded
- **Hover Effect**: Subtle elevation increase

**Product Card:**
- **Image**: Product photo, aspect ratio 1:1, lazy loading
- **Name**: Product title, truncation for long names
- **Price**: Currency format, discount display
- **Description**: Short description, truncation
- **Action Button**: Add to cart, view details
- **Badges**: Hot, new, discount, out of stock

**Order Card:**
- **Order ID**: Unique identifier, clickable
- **Items**: Item count, preview of items
- **Total**: Currency format, tax included
- **Status**: Color-coded badge, status text
- **Date**: Order timestamp, relative time
- **Actions**: View details, edit, cancel

**Customer Card:**
- **Avatar**: Customer photo, fallback initials
- **Name**: Full name, clickable for profile
- **Email**: Email address, clickable
- **Order Count**: Total orders, clickable for history
- **Total Spent**: Lifetime value, currency format
- **Status**: Active, VIP, new customer badge

#### 6.2.3 Form Elementleri
**Text Inputs:**
- **Placeholder**: Descriptive text, example values
- **Validation**: Real-time validation, error messages
- **Error States**: Red border, error icon, error text
- **Success States**: Green border, success icon
- **Focus States**: Blue border, focus ring
- **Disabled States**: Grayed out, non-interactive

**Select Dropdowns:**
- **Options List**: Scrollable list, search functionality
- **Default Value**: Pre-selected option, placeholder
- **Search**: Filter options as you type
- **Multi-select**: Checkbox selection, selected count
- **Custom Options**: Add new option functionality

**Checkboxes:**
- **Label**: Descriptive text, clickable
- **Default State**: Checked/unchecked, indeterminate
- **Group Behavior**: Multiple selection, select all
- **Validation**: Required field validation
- **Accessibility**: Screen reader support

**Radio Buttons:**
- **Options List**: Mutually exclusive selection
- **Default Selection**: Pre-selected option
- **Group Behavior**: Single selection per group
- **Validation**: Required field validation
- **Layout**: Vertical or horizontal arrangement

**File Uploads:**
- **Accepted Formats**: File type restrictions
- **Size Limits**: Maximum file size, progress bar
- **Preview**: Image preview, file type icon
- **Drag & Drop**: Visual feedback, drop zone
- **Multiple Files**: Batch upload, progress tracking

#### 6.2.4 Modal Tipleri
**Confirmation Modal:**
- **Title**: Clear action description
- **Message**: Detailed explanation, consequences
- **Action Buttons**: Confirm (danger), Cancel (safe)
- **Icon**: Warning icon, color-coded
- **Keyboard**: Escape to cancel, Enter to confirm

**Form Modal:**
- **Form Fields**: All necessary input fields
- **Validation**: Real-time validation, error display
- **Submit/Cancel**: Primary action, secondary action
- **Loading State**: Submit button loading spinner
- **Success**: Success message, auto-close

**Details Modal:**
- **Read-only Data**: Formatted information display
- **Close Button**: X button, escape key
- **Actions**: Edit, delete, print, export
- **Responsive**: Mobile-friendly layout
- **Scroll**: Long content scrolling

**Alert Modal:**
- **Icon**: Contextual icon (info, warning, error)
- **Message**: Clear, actionable message
- **Action Button**: Primary action, auto-focus
- **Auto-dismiss**: Timed auto-close option
- **Priority**: High priority, blocking interaction

#### 6.2.5 Table Özellikleri
**Sortable Columns:**
- **Sort Direction**: Ascending/descending indicators
- **Multi-sort**: Shift+click for multiple columns
- **Sort State**: Visual indication of current sort
- **Performance**: Efficient sorting algorithms
- **Accessibility**: Keyboard navigation support

**Pagination:**
- **Page Numbers**: Current page, total pages
- **Items Per Page**: Selectable page size
- **Navigation**: Previous/next, first/last
- **Jump to Page**: Direct page number input
- **Results Count**: Showing X of Y results

**Row Selection:**
- **Single Selection**: Click to select row
- **Multi Selection**: Checkbox selection
- **Select All**: Header checkbox, partial selection
- **Keyboard**: Space bar, arrow keys
- **Visual Feedback**: Selected row highlighting

**Bulk Actions:**
- **Action Buttons**: Delete, export, update
- **Confirmation**: Bulk action confirmation
- **Progress**: Bulk operation progress
- **Results**: Success/failure count
- **Undo**: Bulk action undo functionality

#### 6.2.6 Chart Tipleri
**Line Chart:**
- **Time Period**: Selectable date ranges
- **Data Points**: Hover tooltips, data labels
- **Trend Line**: Smooth curves, multiple series
- **Zoom**: Pan and zoom functionality
- **Export**: PNG, SVG, PDF export

**Bar Chart:**
- **Orientation**: Horizontal/vertical bars
- **Comparison**: Side-by-side, stacked bars
- **Categories**: X-axis labels, grouping
- **Values**: Y-axis scale, data labels
- **Colors**: Consistent color scheme

**Pie Chart:**
- **Segments**: Percentage distribution
- **Legend**: Interactive legend, hide/show
- **Labels**: Value labels, percentage
- **Explode**: Click to highlight segment
- **Donut**: Center space for total

**Area Chart:**
- **Fill**: Gradient fill, opacity
- **Stack**: Stacked area visualization
- **Baseline**: Zero or custom baseline
- **Smooth**: Curved or straight lines
- **Multiple**: Multiple area series

#### 6.2.7 Progress Indicators
**Progress Bars:**
- **Percentage**: 0-100% display
- **Color Coding**: Success, warning, error colors
- **Animated**: Smooth progress animation
- **Text**: Percentage or fraction display
- **Indeterminate**: Loading without percentage

**Loading Spinners:**
- **Size Variants**: Small, medium, large
- **Overlay Support**: Full screen overlay
- **Text**: Loading message, progress text
- **Color**: Brand colors, customizable
- **Accessibility**: Screen reader announcements

**Status Badges:**
- **Color Coding**: Semantic colors (success, warning, error)
- **Text Labels**: Clear status description
- **Icons**: Status-specific icons
- **Size**: Small, medium, large variants
- **Animation**: Pulse, fade effects

#### 6.2.8 Navigation Elements
**Breadcrumbs:**
- **Clickable Links**: Navigate to parent pages
- **Current Page**: Non-clickable, highlighted
- **Separator**: Chevron or slash separator
- **Truncation**: Long paths with ellipsis
- **Mobile**: Collapsible on small screens

**Tabs:**
- **Active State**: Highlighted active tab
- **Content Switching**: Smooth transitions
- **Keyboard**: Arrow key navigation
- **Responsive**: Scrollable on mobile
- **Badges**: Count indicators on tabs

**Sidebar Menu:**
- **Collapsible**: Expand/collapse functionality
- **Nested Items**: Sub-menu indentation
- **Icons**: Menu item icons
- **Active State**: Current page highlighting
- **Mobile**: Overlay or slide-in

**Pagination:**
- **Page Numbers**: Current, total, ellipsis
- **Previous/Next**: Arrow buttons
- **First/Last**: Jump to beginning/end
- **Items Per Page**: Dropdown selector
- **Results Info**: "Showing X of Y results"

### 6.3 Responsive Design

#### 6.3.1 Breakpoint Sistemi
**Mobile Breakpoint (320px-768px):**
- **Layout**: Single column layout, stacked elements
- **Navigation**: Hamburger menu, collapsible sidebar
- **Tables**: Horizontal scroll, card-based alternative
- **Forms**: Full-width inputs, stacked labels
- **Buttons**: Full-width primary actions, icon buttons for secondary
- **Cards**: Single column, simplified content
- **Modals**: Full-screen overlay, simplified content

**Tablet Breakpoint (768px-1024px):**
- **Layout**: Two-column layout, side-by-side elements
- **Navigation**: Collapsible sidebar, tab navigation
- **Tables**: Responsive tables, selective column display
- **Forms**: Multi-column layouts, inline labels
- **Buttons**: Standard sizing, grouped actions
- **Cards**: Two-column grid, detailed content
- **Modals**: Centered overlay, standard content

**Desktop Breakpoint (1024px+):**
- **Layout**: Multi-column layout, sidebar + main content
- **Navigation**: Permanent sidebar, breadcrumb navigation
- **Tables**: Full table display, all columns visible
- **Forms**: Multi-column layouts, complex field groups
- **Buttons**: Standard sizing, action grouping
- **Cards**: Multi-column grid, rich content
- **Modals**: Standard overlay, full content

#### 6.3.2 Responsive Element Değişiklikleri
- **Grid Systems**: 1 column → 2 columns → 3+ columns
- **Typography**: Smaller fonts → Medium fonts → Larger fonts
- **Spacing**: Compact → Standard → Generous
- **Images**: Thumbnail → Medium → Large
- **Navigation**: Hamburger → Tabs → Sidebar
- **Tables**: Cards → Scrollable → Full table

#### 6.3.3 Mobile Menu Çalışma Mantığı
- **Trigger**: Hamburger icon, swipe gesture
- **Animation**: Slide-in from left/right, fade overlay
- **Content**: Stacked menu items, nested navigation
- **Interaction**: Tap to expand, swipe to close
- **Accessibility**: Focus management, keyboard navigation

#### 6.3.4 Touch Interactions
- **Tap**: Primary action, navigation
- **Long Press**: Context menu, selection mode
- **Swipe**: Navigation, dismiss actions
- **Pinch**: Zoom functionality, image scaling
- **Pull to Refresh**: Data refresh, loading states

### 6.4 Micro-interactions

#### 6.4.1 Hover Effects
**Button Hover Effects:**
- **Scale**: transform: scale(1.02), smooth transition
- **Shadow**: box-shadow increase, elevation effect
- **Color**: Background color transition, text color change
- **Duration**: 150ms ease-out for quick feedback
- **Cursor**: Pointer cursor, hand icon

**Card Hover Effects:**
- **Elevation**: Shadow increase, lift effect
- **Scale**: Subtle scale (1.01), not too dramatic
- **Border**: Border color highlight, focus state
- **Duration**: 200ms ease-out for smooth transition
- **Cursor**: Pointer cursor for clickable cards

**Link Hover Effects:**
- **Color**: Text color change, brand color transition
- **Underline**: Animated underline, slide-in effect
- **Icon**: Icon movement, rotation or color change
- **Duration**: 150ms ease-out for quick response
- **Cursor**: Pointer cursor, hand icon

**Image Hover Effects:**
- **Scale**: Slight scale (1.05), zoom effect
- **Brightness**: Brightness adjustment, overlay fade
- **Overlay**: Color overlay, text overlay for captions
- **Duration**: 200ms ease-out for smooth zoom
- **Cursor**: Pointer cursor for clickable images

#### 6.4.2 Click Animations
**Button Click Effects:**
- **Scale Down**: transform: scale(0.98), press effect
- **Ripple**: Material design ripple effect
- **Color Feedback**: Immediate color change
- **Duration**: 100ms ease-in for quick feedback
- **Release**: Scale back to normal on release

**Card Click Effects:**
- **Press Down**: Shadow reduction, pressed state
- **Scale**: Slight scale down (0.99)
- **Duration**: 100ms ease-in for press feedback
- **Release**: Return to normal state

**Toggle Element Effects:**
- **State Transition**: Smooth state change animation
- **Icon Rotation**: 180-degree rotation for toggle
- **Color Transition**: Background color change
- **Duration**: 200ms ease-in-out for smooth transition

**Form Element Effects:**
- **Focus Ring**: Blue focus ring, accessibility
- **Border Color**: Border color change on focus
- **Scale**: Slight scale (1.01) on focus
- **Duration**: 150ms ease-out for focus feedback

#### 6.4.3 Loading States
**Skeleton Loading:**
- **Animated Placeholder**: Pulsing gray rectangles
- **Shimmer Effect**: Moving gradient overlay
- **Duration**: 1.5s infinite loop
- **Colors**: Gray-200 to gray-300 transition
- **Usage**: Content loading, data fetching

**Spinner Loading:**
- **Rotating Icon**: Continuous rotation animation
- **Progress Indicator**: Circular progress bar
- **Duration**: 1s infinite rotation
- **Colors**: Brand colors, customizable
- **Usage**: Button loading, form submission

**Skeleton Cards:**
- **Animated Rectangles**: Pulsing card shapes
- **Pulse Effect**: Opacity animation
- **Duration**: 2s infinite pulse
- **Layout**: Maintains actual content structure
- **Usage**: Card loading, list loading

**Button Loading:**
- **Disabled State**: Button becomes non-interactive
- **Spinner Integration**: Loading spinner replaces text
- **Duration**: Until operation completes
- **Colors**: Muted colors, disabled appearance
- **Usage**: Form submission, API calls

#### 6.4.4 Success/Error States
**Success State:**
- **Green Color**: #10B981 success color
- **Checkmark Icon**: Animated checkmark
- **Fade-in Animation**: Smooth appearance
- **Duration**: 300ms ease-out
- **Auto-dismiss**: 3 seconds automatic removal

**Error State:**
- **Red Color**: #EF4444 error color
- **Error Icon**: Warning or error icon
- **Shake Animation**: Horizontal shake effect
- **Duration**: 500ms shake, 300ms fade-in
- **Manual Dismiss**: User must dismiss manually

**Warning State:**
- **Yellow Color**: #F59E0B warning color
- **Warning Icon**: Exclamation triangle
- **Pulse Animation**: Gentle pulsing effect
- **Duration**: 2s infinite pulse
- **Auto-dismiss**: 5 seconds automatic removal

**Info State:**
- **Blue Color**: #3B82F6 info color
- **Info Icon**: Information circle icon
- **Slide-in Animation**: Slide from top
- **Duration**: 300ms ease-out
- **Auto-dismiss**: 4 seconds automatic removal

#### 6.4.5 Transition Effects
**Page Transitions:**
- **Fade In/Out**: Opacity transition
- **Slide Left/Right**: Horizontal slide
- **Duration**: 300ms ease-in-out
- **Loading State**: Skeleton loading during transition
- **Progress Bar**: Top progress bar for long transitions

**Modal Transitions:**
- **Scale In/Out**: Transform scale animation
- **Backdrop Fade**: Background overlay fade
- **Duration**: 200ms ease-out for entrance
- **Exit Animation**: 150ms ease-in for exit
- **Focus Trap**: Keyboard navigation within modal

**List Transitions:**
- **Stagger Animation**: Items appear sequentially
- **Slide Up**: Items slide up from bottom
- **Duration**: 100ms per item, staggered
- **Easing**: ease-out for smooth entrance
- **Exit Animation**: Fade out, slide down

**Form Transitions:**
- **Field Focus**: Smooth focus transition
- **Validation Feedback**: Real-time validation animation
- **Duration**: 150ms ease-out for focus
- **Error Animation**: Shake effect for errors
- **Success Animation**: Green checkmark for success

#### 6.4.6 Feedback Animations
**Toast Notifications:**
- **Slide In**: Slide from top of screen
- **Auto-dismiss**: Automatic removal after timeout
- **Duration**: 300ms slide-in, 3-5s display
- **Stack**: Multiple toasts stack vertically
- **Manual Dismiss**: X button for manual removal

**Progress Indicators:**
- **Smooth Progress**: Animated progress bar
- **Percentage Update**: Smooth number changes
- **Duration**: Progress animation matches actual progress
- **Colors**: Green for success, blue for in-progress
- **Completion**: Success animation on completion

**Status Changes:**
- **Color Transition**: Smooth color change
- **Icon Swap**: Icon replacement animation
- **Duration**: 200ms ease-out for smooth transition
- **Text Update**: Smooth text content change
- **Visual Feedback**: Clear status indication

**Data Updates:**
- **Highlight Effect**: Brief highlight on data change
- **Smooth Number Changes**: Animated number transitions
- **Duration**: 500ms for number animation
- **Color Flash**: Brief color flash for attention
- **Sound Feedback**: Optional audio feedback

### 6.5 Dark/Light Mode

#### 6.5.1 Color Adaptasyonu
**Background Colors:**
- **Light**: #FFFFFF (pure white)
- **Dark**: #0F172A (very dark blue-gray)

**Surface Colors:**
- **Light**: #F8FAFC (very light gray)
- **Dark**: #1E293B (dark blue-gray)

**Text Colors:**
- **Light**: #1E293B (dark gray)
- **Dark**: #F1F5F9 (light gray)

**Border Colors:**
- **Light**: #E2E8F0 (light gray)
- **Dark**: #334155 (medium gray)

**Shadow Adjustments:**
- **Light**: Subtle shadows, low opacity
- **Dark**: More pronounced shadows, higher opacity

#### 6.5.2 Animation Sistemi
**Duration Scale:**
- **Fast (150ms)**: Micro-interactions, hover states, quick feedback
- **Normal (300ms)**: Standard transitions, state changes, component animations
- **Slow (500ms)**: Page transitions, complex animations, major state changes

**Easing Functions:**
- **ease-in-out**: Smooth, natural transitions (default)
- **ease-out**: Entrance animations, elements appearing
- **ease-in**: Exit animations, elements disappearing
- **cubic-bezier**: Custom easing for specific effects

**Animation Types:**
- **Fade**: Opacity transitions (fade-in, fade-out)
- **Slide**: Position transitions (slide-up, slide-down)
- **Scale**: Size transitions (scale-in, scale-out)
- **Rotate**: Rotation transitions (spin, flip)
- **Color**: Color transitions (hover effects, state changes)

### 6.6 Accessibility

#### 6.6.1 Erişilebilirlik Standartları
- **Reduced Motion**: Respect user's motion preferences
- **Keyboard Navigation**: All interactions keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Focus Management**: Clear focus indicators and management
- **Color Contrast**: Sufficient contrast for all states
- **Touch Targets**: Adequate size for touch interactions (44px minimum)

#### 6.6.2 Performance Optimizasyonu
- **Hardware Acceleration**: Use transform and opacity for smooth animations
- **Debouncing**: Prevent excessive animation triggers
- **Throttling**: Limit animation frequency for performance
- **Lazy Loading**: Load animations only when needed
- **Memory Management**: Clean up animation references

### 6.7 Component Props ve State Yönetimi

#### 6.7.1 Button Component Props
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'icon';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
```

#### 6.7.2 Card Component Props
```typescript
interface CardProps {
  variant: 'metric' | 'product' | 'order' | 'customer';
  title?: string;
  subtitle?: string;
  value?: string | number;
  change?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
```

#### 6.7.3 Modal Component Props
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  variant: 'confirmation' | 'form' | 'details' | 'alert';
  size: 'small' | 'medium' | 'large' | 'full';
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}
```

#### 6.7.4 Form Component Props
```typescript
interface FormProps {
  onSubmit: (data: any) => void;
  validation?: ValidationSchema;
  initialValues?: any;
  children: React.ReactNode;
  className?: string;
}

interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
```

#### 6.7.5 Table Component Props
```typescript
interface TableProps {
  data: any[];
  columns: Column[];
  sortable?: boolean;
  pagination?: boolean;
  selectable?: boolean;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onSelect?: (selectedRows: any[]) => void;
  className?: string;
}

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}
```

Bu tasarım sistemi, AI Ajanının takip edeceği kapsamlı bir "Tasarım Sistemi Kılavuzu" olarak yapılandırılmıştır. Her bileşenin props'ları ve state'leri tanımlanmış, eyleme geçirilebilir hale getirilmiştir.

## 7. SİSTEM YÖNETİMİ VE OPERASYONLAR

### 7.1 Süper Admin Paneli

#### 7.1.1 Temel Modüller ve Sorumluluklar

**Kiracı (İşletme) Yönetimi Modülü:**
- **İşletme Onaylama**: Yeni kayıt olan işletmelerin onaylanması/reddedilmesi
- **İşletme Profil Yönetimi**: İşletme bilgilerinin düzenlenmesi ve güncellenmesi
- **İşletme Durumu Kontrolü**: Aktif/pasif durumlarının yönetimi
- **İşletme İstatistikleri**: Platform genelindeki işletme metrikleri
- **API**: `GET /api/admin/tenants`, `PUT /api/admin/tenants/{id}/approve`, `PUT /api/admin/tenants/{id}/status`

**Abonelik Planları Yönetimi Modülü:**
- **Plan Oluşturma**: Yeni abonelik planları tanımlama
- **Plan Düzenleme**: Mevcut planların özelliklerini güncelleme
- **Plan Fiyatlandırma**: Plan fiyatlarının belirlenmesi ve güncellenmesi
- **Plan Özellikleri**: Her plana ait özelliklerin yönetimi
- **API**: `POST /api/admin/plans`, `PUT /api/admin/plans/{id}`, `GET /api/admin/plans`

**Özellik Yönetimi Modülü:**
- **Özellik Tanımlama**: Yeni özelliklerin sisteme eklenmesi
- **Özellik Kategorileri**: Özelliklerin kategorilere ayrılması
- **Özellik Durumu**: Özelliklerin aktif/pasif durumlarının yönetimi
- **Özellik Versiyonlama**: Özellik güncellemelerinin takibi
- **API**: `POST /api/admin/features`, `PUT /api/admin/features/{id}`, `GET /api/admin/features`

**Komisyon Oranları Yönetimi Modülü:**
- **Platform Komisyonu**: Platform genelindeki komisyon oranlarının belirlenmesi
- **Kategori Bazlı Komisyon**: Farklı kategoriler için farklı komisyon oranları
- **İşletme Bazlı Özel Oranlar**: Belirli işletmeler için özel komisyon oranları
- **Komisyon Geçmişi**: Komisyon değişikliklerinin takibi
- **API**: `PUT /api/admin/commission-rates`, `GET /api/admin/commission-rates`, `POST /api/admin/commission-rates/special`

**Ciro Partnerliği Yönetimi Modülü:**
- **Program Ayarları**: Ciro Partnerliği programının genel ayarları
- **Kredi Yönetimi**: Lezzet Kredisi sisteminin yönetimi
- **Sübvansiyon Ayarları**: İşletme sübvansiyon oranlarının belirlenmesi
- **Finansal Mutabakat**: Platform-işletme arası finansal mutabakatlar
- **API**: `PUT /api/admin/revenue-partnership/settings`, `GET /api/admin/revenue-partnership/stats`, `POST /api/admin/revenue-partnership/subsidies`

**Sistem Ayarları Modülü:**
- **Genel Ayarlar**: Platform genelindeki sistem ayarları
- **Güvenlik Ayarları**: Güvenlik parametrelerinin yönetimi
- **Bildirim Ayarları**: Sistem bildirimlerinin yapılandırılması
- **Entegrasyon Ayarları**: Dış servis entegrasyonlarının yönetimi
- **API**: `PUT /api/admin/system/settings`, `GET /api/admin/system/settings`, `POST /api/admin/system/maintenance`

**Kullanıcı Yönetimi Modülü:**
- **Süper Admin Kullanıcıları**: Süper admin yetkisine sahip kullanıcıların yönetimi
- **Rol Yönetimi**: Kullanıcı rollerinin ve yetkilerinin tanımlanması
- **Kullanıcı Aktivite Takibi**: Platform genelindeki kullanıcı aktivitelerinin izlenmesi
- **Güvenlik Logları**: Güvenlik ile ilgili olayların takibi
- **API**: `GET /api/admin/users`, `PUT /api/admin/users/{id}/role`, `GET /api/admin/users/activity-logs`

**Raporlama ve Analitik Modülü:**
- **Platform Geneli Raporlar**: Tüm platformun performans raporları
- **İşletme Karşılaştırma**: İşletmelerin birbirleriyle karşılaştırılması
- **Trend Analizi**: Platform genelindeki trendlerin analizi
- **Finansal Raporlar**: Platform genelindeki finansal durum raporları
- **API**: `GET /api/admin/reports/platform-overview`, `GET /api/admin/reports/tenant-comparison`, `GET /api/admin/reports/financial-summary`

#### 7.1.2 Süper Admin Panel Mimarisi

**Dashboard Layout:**
- **Header**: Platform logosu, kullanıcı profili, bildirimler
- **Sidebar**: Modül navigasyonu, hızlı erişim linkleri
- **Main Content**: Modül içerikleri, veri tabloları, grafikler
- **Footer**: Sistem durumu, versiyon bilgisi, destek linkleri

**Yetkilendirme Sistemi:**
- **Role-Based Access Control (RBAC)**: Rol bazlı erişim kontrolü
- **Permission Matrix**: Detaylı yetki matrisi
- **Audit Trail**: Tüm işlemlerin kayıt altına alınması
- **Session Management**: Güvenli oturum yönetimi

**Real-time Monitoring:**
- **Live Dashboard**: Gerçek zamanlı sistem durumu
- **Alert System**: Kritik durumlar için uyarı sistemi
- **Performance Metrics**: Sistem performans metrikleri
- **Health Status**: Tüm servislerin sağlık durumu

### 7.2 Loglama (Logging) Stratejisi

#### 7.2.1 Structured Logging Sistemi
**Log Formatı:**
- **JSON Format**: Tüm loglar JSON formatında yapılandırılmış
- **Correlation ID**: Her istek için benzersiz correlation ID
- **Timestamp**: ISO 8601 formatında zaman damgası
- **Log Level**: ERROR, WARN, INFO, DEBUG seviyeleri
- **Context**: İşlem bağlamı ve detayları

**Log Kategorileri:**
- **API Logs**: Tüm API isteklerinin loglanması
- **Business Logs**: İş mantığı olaylarının loglanması
- **Error Logs**: Hata ve istisnaların loglanması
- **Security Logs**: Güvenlik olaylarının loglanması
- **Performance Logs**: Performans metriklerinin loglanması

**Log Örnekleri:**
```json
{
  "timestamp": "2025-06-28T14:30:00.000Z",
  "level": "INFO",
  "correlationId": "req-12345-abcde",
  "service": "order-service",
  "action": "CREATE_ORDER",
  "userId": "user-123",
  "tenantId": "tenant-456",
  "data": {
    "orderId": "order-789",
    "totalAmount": 150.00,
    "items": 3
  },
  "duration": 245,
  "status": "SUCCESS"
}
```

#### 7.2.2 Log Yönetimi
**Log Rotasyonu:**
- **Günlük Rotasyon**: Loglar günlük olarak döndürülür
- **Sıkıştırma**: Eski loglar otomatik sıkıştırılır
- **Saklama Süresi**: Loglar 90 gün saklanır
- **Arşivleme**: 90 günden eski loglar arşivlenir

**Log Analizi:**
- **Log Aggregation**: Merkezi log toplama sistemi
- **Search Functionality**: Gelişmiş log arama özellikleri
- **Alerting**: Kritik log olayları için uyarı sistemi
- **Reporting**: Log analiz raporları

**Log Güvenliği:**
- **Encryption**: Hassas log verilerinin şifrelenmesi
- **Access Control**: Log erişim kontrolü
- **Audit Trail**: Log erişimlerinin kayıt altına alınması
- **Data Retention**: Veri saklama politikaları

### 7.3 İzleme (Monitoring) Stratejisi

#### 7.3.1 Health Check Sistemi
**Health Check Endpoint:**
- **GET /health**: Sistem sağlık durumu kontrolü
- **Response Format**: JSON formatında detaylı sağlık bilgisi
- **Check Components**: Veritabanı, cache, external services
- **Response Time**: < 100ms yanıt süresi

**Health Check Response Örneği:**
```json
{
  "status": "healthy",
  "timestamp": "2025-06-28T14:30:00.000Z",
  "version": "1.0.0",
  "uptime": 86400,
  "services": {
    "database": {
      "status": "healthy",
      "responseTime": 15
    },
    "cache": {
      "status": "healthy",
      "responseTime": 5
    },
    "external-api": {
      "status": "healthy",
      "responseTime": 45
    }
  }
}
```

#### 7.3.2 Sistem Metrikleri
**API Metrikleri:**
- **Response Time**: API yanıt süreleri (hedef: < 200ms)
- **Error Rate**: Hata oranları (hedef: < 1%)
- **Throughput**: İstek sayısı (RPS - Requests Per Second)
- **Availability**: Sistem erişilebilirlik oranı (hedef: %99.9)

**Business Metrikleri:**
- **Order Volume**: Sipariş hacmi ve trendleri
- **Revenue Metrics**: Gelir metrikleri ve analizi
- **User Activity**: Kullanıcı aktivite metrikleri
- **System Performance**: Sistem performans göstergeleri

**Infrastructure Metrikleri:**
- **CPU Usage**: CPU kullanım oranları
- **Memory Usage**: Bellek kullanım durumu
- **Disk Usage**: Disk kullanım oranları
- **Network Traffic**: Ağ trafiği analizi

#### 7.3.3 Alerting Sistemi
**Alert Kategorileri:**
- **Critical Alerts**: Sistem durdurucu kritik uyarılar
- **Warning Alerts**: Dikkat gerektiren uyarılar
- **Info Alerts**: Bilgilendirme amaçlı uyarılar

**Alert Kanalları:**
- **Email Notifications**: E-posta bildirimleri
- **SMS Alerts**: SMS uyarıları
- **Slack Integration**: Slack kanalına bildirimler
- **Webhook Notifications**: Webhook ile dış sistemlere bildirim

**Alert Kuralları:**
- **High Error Rate**: Hata oranı %5'i geçtiğinde
- **High Response Time**: Yanıt süresi 500ms'i geçtiğinde
- **Low Disk Space**: Disk alanı %90'ı doldurduğunda
- **Service Down**: Servis erişilemez olduğunda

### 7.4 Yedekleme ve Felaket Kurtarma (Backup & Disaster Recovery)

#### 7.4.1 Veritabanı Yedekleme Stratejisi
**Otomatik Yedekleme:**
- **Günlük Yedekleme**: Veritabanı günlük olarak otomatik yedeklenir
- **Yedekleme Zamanı**: Gece 02:00'de düşük trafik saatinde
- **Yedekleme Türü**: Full backup (tam yedekleme)
- **Yedekleme Konumu**: Güvenli, ayrı lokasyonda saklama

**Yedekleme Doğrulama:**
- **Haftalık Doğrulama**: Yedeklerin bütünlüğü haftalık olarak doğrulanır
- **Restore Test**: Aylık olarak restore testi yapılır
- **Veri Bütünlüğü**: Yedeklenen verilerin bütünlüğü kontrol edilir
- **Performans Test**: Restore işleminin performansı test edilir

**Yedekleme Saklama:**
- **Günlük Yedekler**: Son 7 günün yedekleri
- **Haftalık Yedekler**: Son 4 haftanın yedekleri
- **Aylık Yedekler**: Son 12 ayın yedekleri
- **Yıllık Yedekler**: Son 5 yılın yedekleri

#### 7.4.2 Felaket Kurtarma Planı
**Recovery Time Objectives (RTO):**
- **Kritik Sistemler**: 4 saat içinde kurtarma
- **Önemli Sistemler**: 8 saat içinde kurtarma
- **Normal Sistemler**: 24 saat içinde kurtarma

**Recovery Point Objectives (RPO):**
- **Veritabanı**: 1 saatlik veri kaybı maksimum
- **Dosya Sistemi**: 4 saatlik veri kaybı maksimum
- **Log Dosyaları**: 1 günlük veri kaybı maksimum

**Kurtarma Senaryoları:**
- **Tam Sistem Çökmesi**: Tüm sistemin yeniden kurulması
- **Veritabanı Çökmesi**: Veritabanının yedekten geri yüklenmesi
- **Uygulama Çökmesi**: Uygulama servislerinin yeniden başlatılması
- **Ağ Kesintisi**: Alternatif ağ bağlantılarına geçiş

#### 7.4.3 Yedekleme Otomasyonu
**Yedekleme Scriptleri:**
- **Database Backup Script**: Otomatik veritabanı yedekleme scripti
- **File Backup Script**: Dosya sistemi yedekleme scripti
- **Configuration Backup Script**: Konfigürasyon dosyaları yedekleme scripti
- **Log Backup Script**: Log dosyaları yedekleme scripti

**Yedekleme Monitoring:**
- **Backup Status Monitoring**: Yedekleme durumunun izlenmesi
- **Backup Size Monitoring**: Yedekleme boyutlarının takibi
- **Backup Duration Monitoring**: Yedekleme sürelerinin izlenmesi
- **Backup Failure Alerts**: Yedekleme hatalarında uyarı

**Yedekleme Güvenliği:**
- **Encryption**: Yedeklerin şifrelenmesi
- **Access Control**: Yedeklere erişim kontrolü
- **Offsite Storage**: Yedeklerin farklı lokasyonda saklanması
- **Backup Testing**: Düzenli yedekleme testleri

### 7.5 Sistem Bakım ve Güncelleme

#### 7.5.1 Bakım Penceresi Yönetimi
**Bakım Planlaması:**
- **Haftalık Bakım**: Düşük trafik saatlerinde haftalık bakım
- **Aylık Bakım**: Kapsamlı sistem bakımı ve güncellemeler
- **Çeyreklik Bakım**: Büyük güncellemeler ve optimizasyonlar
- **Yıllık Bakım**: Sistem genelinde büyük değişiklikler

**Bakım Bildirimleri:**
- **Önceden Bildirim**: Bakım öncesi 48 saat bildirim
- **Bakım Sırasında**: Canlı durum güncellemeleri
- **Bakım Sonrası**: Tamamlanma bildirimi ve rapor
- **Rollback Plan**: Sorun durumunda geri alma planı

#### 7.5.2 Güncelleme Stratejisi
**Güncelleme Türleri:**
- **Security Updates**: Güvenlik güncellemeleri (acil)
- **Bug Fixes**: Hata düzeltmeleri (öncelikli)
- **Feature Updates**: Özellik güncellemeleri (planlı)
- **Major Updates**: Büyük güncellemeler (çeyreklik)

**Güncelleme Süreci:**
- **Testing Environment**: Test ortamında doğrulama
- **Staging Environment**: Canlıya benzer ortamda test
- **Production Deployment**: Canlı ortama kontrollü geçiş
- **Post-Deployment Monitoring**: Güncelleme sonrası izleme

Bu sistem yönetimi ve operasyonlar bölümü, platformun güvenli, stabil ve sürdürülebilir çalışmasını garanti altına alacak kapsamlı bir operasyonel çerçeve sunmaktadır.

## 8. DETAYLI İŞ MANTIĞI VE HESAPLAMA FORMÜLLERİ

### 8.1 Hesaplama Mantıkları Detaylı Analizi

#### 8.1.1 Revenue Hesaplamaları
**Günlük Gelir:**
- **Formül**: `SUM(order_total) WHERE date = today`
- **Konum**: Dashboard / RevenueCard component
- **API Endpoint**: `GET /api/dashboard/revenue-stats`
- **Backend Fonksiyon**: `calculateDailyRevenue()`
- **Database Query**: `SELECT SUM(total_amount) FROM orders WHERE DATE(created_at) = CURDATE()`

**Haftalık Gelir:**
- **Formül**: `SUM(order_total) WHERE date >= week_start`
- **Konum**: Dashboard / AnalyticsWidget component
- **API Endpoint**: `GET /api/dashboard/weekly-revenue`
- **Backend Fonksiyon**: `calculateWeeklyRevenue()`
- **Database Query**: `SELECT SUM(total_amount) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`

**Aylık Gelir:**
- **Formül**: `SUM(order_total) WHERE date >= month_start`
- **Konum**: Reports Module / Financial Reports
- **API Endpoint**: `GET /api/reports/monthly-revenue`
- **Backend Fonksiyon**: `calculateMonthlyRevenue()`
- **Database Query**: `SELECT SUM(total_amount) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`

**Ortalama Sipariş Tutarı:**
- **Formül**: `AVG(order_total)`
- **Konum**: Dashboard / MetricCard component
- **API Endpoint**: `GET /api/dashboard/average-order-value`
- **Backend Fonksiyon**: `calculateAverageOrderValue()`
- **Database Query**: `SELECT AVG(total_amount) FROM orders`

**Gelir Artış Yüzdesi:**
- **Formül**: `((current_period - previous_period) / previous_period) * 100`
- **Konum**: Dashboard / GrowthChart component
- **API Endpoint**: `GET /api/dashboard/revenue-growth`
- **Backend Fonksiyon**: `calculateRevenueGrowth()`
- **Database Query**: `SELECT ((current.total - previous.total) / previous.total) * 100 FROM (...)`

#### 8.1.2 Order İstatistikleri
**Toplam Sipariş Sayısı:**
- **Formül**: `COUNT(*) FROM orders`
- **Konum**: Dashboard / OrderStats component
- **API Endpoint**: `GET /api/dashboard/order-count`
- **Backend Fonksiyon**: `getTotalOrderCount()`
- **Database Query**: `SELECT COUNT(*) FROM orders`

**Bekleyen Sipariş Sayısı:**
- **Formül**: `COUNT(*) WHERE status = 'pending'`
- **Konum**: Kitchen Module / Order Queue
- **API Endpoint**: `GET /api/kitchen/pending-orders`
- **Backend Fonksiyon**: `getPendingOrderCount()`
- **Database Query**: `SELECT COUNT(*) FROM orders WHERE status = 'pending'`

**Tamamlanan Sipariş Sayısı:**
- **Formül**: `COUNT(*) WHERE status = 'completed'`
- **Konum**: Orders Module / Order List
- **API Endpoint**: `GET /api/orders/completed-count`
- **Backend Fonksiyon**: `getCompletedOrderCount()`
- **Database Query**: `SELECT COUNT(*) FROM orders WHERE status = 'completed'`

**İptal Edilen Sipariş Sayısı:**
- **Formül**: `COUNT(*) WHERE status = 'cancelled'`
- **Konum**: Orders Module / Order Analytics
- **API Endpoint**: `GET /api/orders/cancelled-count`
- **Backend Fonksiyon**: `getCancelledOrderCount()`
- **Database Query**: `SELECT COUNT(*) FROM orders WHERE status = 'cancelled'`

**Sipariş Tamamlanma Oranı:**
- **Formül**: `(completed_orders / total_orders) * 100`
- **Konum**: Analytics Module / Performance Metrics
- **API Endpoint**: `GET /api/analytics/completion-rate`
- **Backend Fonksiyon**: `calculateCompletionRate()`
- **Database Query**: `SELECT (completed.count / total.count) * 100 FROM (...)`

#### 8.1.3 Customer İstatistikleri
**Toplam Müşteri Sayısı:**
- **Formül**: `COUNT(*) FROM customers`
- **Konum**: Customers Module / Customer Overview
- **API Endpoint**: `GET /api/customers/total-count`
- **Backend Fonksiyon**: `getTotalCustomerCount()`
- **Database Query**: `SELECT COUNT(*) FROM customers`

**Yeni Müşteri Sayısı:**
- **Formül**: `COUNT(*) WHERE registration_date >= period_start`
- **Konum**: Dashboard / Customer Growth
- **API Endpoint**: `GET /api/customers/new-count`
- **Backend Fonksiyon**: `getNewCustomerCount()`
- **Database Query**: `SELECT COUNT(*) FROM customers WHERE created_at >= ?`

**Aktif Müşteri Sayısı:**
- **Formül**: `COUNT(*) WHERE last_order_date >= 30_days_ago`
- **Konum**: Analytics Module / Customer Analytics
- **API Endpoint**: `GET /api/analytics/active-customers`
- **Backend Fonksiyon**: `getActiveCustomerCount()`
- **Database Query**: `SELECT COUNT(*) FROM customers WHERE last_order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)`

**Müşteri Sadakat Puanı:**
- **Formül**: `SUM(loyalty_points) / COUNT(orders)`
- **Konum**: Loyalty Module / Customer Tiers
- **API Endpoint**: `GET /api/loyalty/customer-score`
- **Backend Fonksiyon**: `calculateLoyaltyScore()`
- **Database Query**: `SELECT SUM(loyalty_points) / COUNT(orders) FROM customers JOIN orders ON customers.id = orders.customer_id`

#### 8.1.4 Product İstatistikleri
**Toplam Ürün Sayısı:**
- **Formül**: `COUNT(*) FROM products WHERE active = true`
- **Konum**: Menu Management Module / Product Overview
- **API Endpoint**: `GET /api/products/total-count`
- **Backend Fonksiyon**: `getTotalProductCount()`
- **Database Query**: `SELECT COUNT(*) FROM products WHERE is_active = 1`

**En Çok Satan Ürünler:**
- **Formül**: `TOP 10 BY order_count`
- **Konum**: Analytics Module / Product Performance
- **API Endpoint**: `GET /api/analytics/top-products`
- **Backend Fonksiyon**: `getTopSellingProducts()`
- **Database Query**: `SELECT products.*, COUNT(order_items.id) as order_count FROM products LEFT JOIN order_items ON products.id = order_items.product_id GROUP BY products.id ORDER BY order_count DESC LIMIT 10`

**Stok Seviyesi Düşük Ürünler:**
- **Formül**: `WHERE stock_quantity <= reorder_point`
- **Konum**: Inventory Module / Low Stock Alerts
- **API Endpoint**: `GET /api/inventory/low-stock`
- **Backend Fonksiyon**: `getLowStockProducts()`
- **Database Query**: `SELECT * FROM inventory WHERE stock_quantity <= reorder_point`

**Ürün Performans Skoru:**
- **Formül**: `(sales_count * avg_rating) / days_since_creation`
- **Konum**: Analytics Module / Product Analytics
- **API Endpoint**: `GET /api/analytics/product-performance`
- **Backend Fonksiyon**: `calculateProductPerformance()`
- **Database Query**: `SELECT (sales_count * avg_rating) / DATEDIFF(NOW(), created_at) as performance_score FROM products`

### 8.2 İş Kuralları Detaylı Analizi

#### 8.2.1 Order Durumu Geçiş Kuralları
**Pending → Preparing:**
- **Kural**: Staff confirmation required
- **Konum**: Kitchen Module / Order Queue
- **API Endpoint**: `PUT /api/orders/{id}/status`
- **Backend Fonksiyon**: `updateOrderStatus()`
- **Database Update**: `UPDATE orders SET status = 'preparing', updated_at = NOW() WHERE id = ?`

**Preparing → Ready:**
- **Kural**: Kitchen completion
- **Konum**: Kitchen Module / Preparation Status
- **API Endpoint**: `PUT /api/orders/{id}/ready`
- **Backend Fonksiyon**: `markOrderReady()`
- **Database Update**: `UPDATE orders SET status = 'ready', ready_at = NOW() WHERE id = ?`

**Ready → Delivered:**
- **Kural**: Delivery confirmation
- **Konum**: Orders Module / Order Status
- **API Endpoint**: `PUT /api/orders/{id}/delivered`
- **Backend Fonksiyon**: `markOrderDelivered()`
- **Database Update**: `UPDATE orders SET status = 'delivered', delivered_at = NOW() WHERE id = ?`

**Cancelled:**
- **Kural**: Customer or staff can cancel before preparing
- **Konum**: Orders Module / Order Management
- **API Endpoint**: `PUT /api/orders/{id}/cancel`
- **Backend Fonksiyon**: `cancelOrder()`
- **Database Update**: `UPDATE orders SET status = 'cancelled', cancelled_at = NOW() WHERE id = ?`

**Refunded:**
- **Kural**: After delivery, with conditions
- **Konum**: Orders Module / Refund Management
- **API Endpoint**: `PUT /api/orders/{id}/refund`
- **Backend Fonksiyon**: `processRefund()`
- **Database Update**: `UPDATE orders SET status = 'refunded', refunded_at = NOW() WHERE id = ?`

#### 8.2.2 Stok Yönetimi Kuralları
**Stok Azaldığında Otomatik Uyarı:**
- **Kural**: `stock_quantity <= reorder_point`
- **Konum**: Inventory Module / Stock Alerts
- **API Endpoint**: `GET /api/inventory/alerts`
- **Backend Fonksiyon**: `checkLowStock()`
- **Database Query**: `SELECT * FROM inventory WHERE stock_quantity <= reorder_point`

**Sipariş Verildiğinde Stok Düşürme:**
- **Kural**: `stock_quantity -= order_quantity`
- **Konum**: Orders Module / Order Processing
- **API Endpoint**: `POST /api/orders`
- **Backend Fonksiyon**: `createOrder()`
- **Database Update**: `UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE product_id = ?`

**Stok Yetersizse Sipariş Reddetme:**
- **Kural**: Check stock before order creation
- **Konum**: Orders Module / Order Validation
- **API Endpoint**: `POST /api/orders/validate`
- **Backend Fonksiyon**: `validateOrderStock()`
- **Database Query**: `SELECT stock_quantity FROM inventory WHERE product_id = ?`

**Stok Güncelleme:**
- **Kural**: Manual or automatic
- **Konum**: Inventory Module / Stock Management
- **API Endpoint**: `PUT /api/inventory/{id}/stock`
- **Backend Fonksiyon**: `updateStock()`
- **Database Update**: `UPDATE inventory SET stock_quantity = ?, updated_at = NOW() WHERE id = ?`

#### 8.2.3 Müşteri Sadakat Sistemi
**Her Sipariş İçin Puan Kazanma:**
- **Kural**: `order_total * 0.1`
- **Konum**: Loyalty Module / Points System
- **API Endpoint**: `POST /api/loyalty/earn-points`
- **Backend Fonksiyon**: `earnLoyaltyPoints()`
- **Database Update**: `UPDATE customers SET loyalty_points = loyalty_points + ? WHERE id = ?`

**Puan Kullanma:**
- **Kural**: `1 puan = 0.01 TL indirim`
- **Konum**: Orders Module / Discount Application
- **API Endpoint**: `POST /api/orders/apply-loyalty`
- **Backend Fonksiyon**: `applyLoyaltyDiscount()`
- **Database Update**: `UPDATE customers SET loyalty_points = loyalty_points - ? WHERE id = ?`

**Seviye Sistemi:**
- **Kural**: Bronze, Silver, Gold, Platinum
- **Konum**: Loyalty Module / Tier Management
- **API Endpoint**: `GET /api/loyalty/tiers`
- **Backend Fonksiyon**: `getLoyaltyTiers()`
- **Database Query**: `SELECT * FROM loyalty_tiers ORDER BY points_required`

**Özel İndirimler ve Kampanyalar:**
- **Kural**: Tier-based discounts
- **Konum**: Loyalty Module / Campaign Management
- **API Endpoint**: `GET /api/loyalty/campaigns`
- **Backend Fonksiyon**: `getActiveCampaigns()`
- **Database Query**: `SELECT * FROM loyalty_campaigns WHERE is_active = 1`

#### 8.2.4 Rezervasyon Kuralları
**Masa Müsaitlik Kontrolü:**
- **Kural**: Check table availability
- **Konum**: Reservation Module / Table Management
- **API Endpoint**: `GET /api/reservations/available-tables`
- **Backend Fonksiyon**: `getAvailableTables()`
- **Database Query**: `SELECT * FROM tables WHERE status = 'available'`

**Rezervasyon Süresi:**
- **Kural**: 2 saat varsayılan
- **Konum**: Reservation Module / Booking System
- **API Endpoint**: `POST /api/reservations`
- **Backend Fonksiyon**: `createReservation()`
- **Database Insert**: `INSERT INTO reservations (table_id, customer_id, start_time, end_time) VALUES (?, ?, ?, DATE_ADD(?, INTERVAL 2 HOUR))`

**İptal Politikası:**
- **Kural**: 24 saat öncesi
- **Konum**: Reservation Module / Cancellation
- **API Endpoint**: `PUT /api/reservations/{id}/cancel`
- **Backend Fonksiyon**: `cancelReservation()`
- **Database Update**: `UPDATE reservations SET status = 'cancelled' WHERE id = ? AND start_time > DATE_ADD(NOW(), INTERVAL 24 HOUR)`

**No-Show Durumu:**
- **Kural**: 3 kez no-show = blacklist
- **Konum**: Reservation Module / No-Show Tracking
- **API Endpoint**: `PUT /api/reservations/{id}/no-show`
- **Backend Fonksiyon**: `markNoShow()`
- **Database Update**: `UPDATE customers SET no_show_count = no_show_count + 1 WHERE id = ?`

### 8.3 Pricing ve Discount Mantığı

#### 8.3.1 Ürün Fiyatlandırma
**Base Price (Temel Fiyat):**
- **Konum**: Products Module / Product Management
- **API Endpoint**: `POST /api/products`
- **Backend Fonksiyon**: `createProduct()`
- **Database Field**: `products.price`

**Size-Based Pricing (Küçük, Orta, Büyük):**
- **Konum**: Products Module / Product Variants
- **API Endpoint**: `POST /api/products/{id}/variants`
- **Backend Fonksiyon**: `createProductVariant()`
- **Database Table**: `product_variants`

**Customization Pricing (Ekstra Malzemeler):**
- **Konum**: Products Module / Customization Options
- **API Endpoint**: `POST /api/products/{id}/customizations`
- **Backend Fonksiyon**: `addCustomizationOption()`
- **Database Table**: `product_customizations`

**Bulk Pricing (Toplu Alım İndirimi):**
- **Konum**: Orders Module / Bulk Discount
- **API Endpoint**: `POST /api/orders/calculate-bulk-discount`
- **Backend Fonksiyon**: `calculateBulkDiscount()`
- **Database Table**: `bulk_discount_rules`

#### 8.3.2 İndirim Kuralları
**Yüzde İndirim (10% Off):**
- **Konum**: Orders Module / Discount Application
- **API Endpoint**: `POST /api/orders/apply-discount`
- **Backend Fonksiyon**: `applyPercentageDiscount()`
- **Database Table**: `discounts`

**Sabit İndirim (5 TL Off):**
- **Konum**: Orders Module / Fixed Discount
- **API Endpoint**: `POST /api/orders/apply-fixed-discount`
- **Backend Fonksiyon**: `applyFixedDiscount()`
- **Database Table**: `discounts`

**Buy One Get One (BOGO):**
- **Konum**: Orders Module / BOGO Promotion
- **API Endpoint**: `POST /api/orders/apply-bogo`
- **Backend Fonksiyon**: `applyBOGODiscount()`
- **Database Table**: `promotions`

**Minimum Tutar İndirimi (100 TL Üzeri %15):**
- **Konum**: Orders Module / Threshold Discount
- **API Endpoint**: `POST /api/orders/apply-threshold-discount`
- **Backend Fonksiyon**: `applyThresholdDiscount()`
- **Database Table**: `threshold_discounts`

#### 8.3.3 Vergi Hesaplamaları
**KDV Hesaplama (18%):**
- **Konum**: Orders Module / Tax Calculation
- **API Endpoint**: `POST /api/orders/calculate-tax`
- **Backend Fonksiyon**: `calculateTax()`
- **Database Field**: `orders.tax_amount`

**Vergi Dahil/Farklı Fiyatlandırma:**
- **Konum**: Products Module / Tax Settings
- **API Endpoint**: `PUT /api/products/{id}/tax-settings`
- **Backend Fonksiyon**: `updateTaxSettings()`
- **Database Field**: `products.tax_included`

**Vergi Muafiyeti Durumları:**
- **Konum**: Orders Module / Tax Exemption
- **API Endpoint**: `POST /api/orders/apply-tax-exemption`
- **Backend Fonksiyon**: `applyTaxExemption()`
- **Database Table**: `tax_exemptions`

### 8.4 Notification ve Alert Sistemleri

#### 8.4.1 Order Notifications
**Yeni Sipariş Bildirimi (Staff):**
- **Konum**: Kitchen Module / Order Notifications
- **API Endpoint**: `POST /api/notifications/order-received`
- **Backend Fonksiyon**: `sendOrderNotification()`
- **Database Table**: `notifications`

**Sipariş Durumu Güncellemesi (Customer):**
- **Konum**: Orders Module / Status Updates
- **API Endpoint**: `POST /api/notifications/status-update`
- **Backend Fonksiyon**: `sendStatusUpdate()`
- **Database Table**: `notifications`

**Sipariş Hazır Bildirimi (Customer):**
- **Konum**: Kitchen Module / Ready Notifications
- **API Endpoint**: `POST /api/notifications/order-ready`
- **Backend Fonksiyon**: `sendReadyNotification()`
- **Database Table**: `notifications`

#### 8.4.2 Inventory Alerts
**Düşük Stok Uyarısı:**
- **Konum**: Inventory Module / Stock Alerts
- **API Endpoint**: `POST /api/notifications/low-stock`
- **Backend Fonksiyon**: `sendLowStockAlert()`
- **Database Table**: `inventory_alerts`

**Stok Tükenme Uyarısı:**
- **Konum**: Inventory Module / Out of Stock
- **API Endpoint**: `POST /api/notifications/out-of-stock`
- **Backend Fonksiyon**: `sendOutOfStockAlert()`
- **Database Table**: `inventory_alerts`

**Reorder Reminder:**
- **Konum**: Inventory Module / Reorder Management
- **API Endpoint**: `POST /api/notifications/reorder-reminder`
- **Backend Fonksiyon**: `sendReorderReminder()`
- **Database Table**: `inventory_alerts`

#### 8.4.3 Customer Notifications
**Welcome Message (Yeni Kayıt):**
- **Konum**: Customers Module / Registration
- **API Endpoint**: `POST /api/notifications/welcome`
- **Backend Fonksiyon**: `sendWelcomeMessage()`
- **Database Table**: `customer_notifications`

**Loyalty Points Update:**
- **Konum**: Loyalty Module / Points System
- **API Endpoint**: `POST /api/notifications/loyalty-update`
- **Backend Fonksiyon**: `sendLoyaltyUpdate()`
- **Database Table**: `customer_notifications`

**Special Offers:**
- **Konum**: Marketing Module / Campaigns
- **API Endpoint**: `POST /api/notifications/special-offer`
- **Backend Fonksiyon**: `sendSpecialOffer()`
- **Database Table**: `customer_notifications`

**Birthday Wishes:**
- **Konum**: Customers Module / Birthday Tracking
- **API Endpoint**: `POST /api/notifications/birthday`
- **Backend Fonksiyon**: `sendBirthdayWish()`
- **Database Table**: `customer_notifications`

### 8.5 Security ve Authorization Kuralları

#### 8.5.1 User Authentication
**Password Requirements (Min 8 Chars, Special Chars):**
- **Konum**: Auth Module / Registration
- **API Endpoint**: `POST /api/auth/register`
- **Backend Fonksiyon**: `validatePassword()`
- **Database Field**: `users.password_hash`

**Session Management (Timeout, Refresh):**
- **Konum**: Auth Module / Session Management
- **API Endpoint**: `POST /api/auth/refresh`
- **Backend Fonksiyon**: `refreshSession()`
- **Database Table**: `user_sessions`

**Two-Factor Authentication (Optional):**
- **Konum**: Settings Module / Security Settings
- **API Endpoint**: `POST /api/auth/2fa/enable`
- **Backend Fonksiyon**: `enable2FA()`
- **Database Table**: `two_factor_auth`

#### 8.5.2 Role-Based Access Control
**Admin (Full Access):**
- **Konum**: Admin Module / Role Management
- **API Endpoint**: `GET /api/admin/permissions`
- **Backend Fonksiyon**: `getAdminPermissions()`
- **Database Table**: `user_roles`

**Manager (Limited Admin Access):**
- **Konum**: Staff Module / Role Assignment
- **API Endpoint**: `PUT /api/staff/{id}/role`
- **Backend Fonksiyon**: `assignManagerRole()`
- **Database Table**: `user_roles`

**Staff (Order Management, Basic Reports):**
- **Konum**: Staff Module / Staff Management
- **API Endpoint**: `GET /api/staff/permissions`
- **Backend Fonksiyon**: `getStaffPermissions()`
- **Database Table**: `user_roles`

**Customer (Own Orders, Profile):**
- **Konum**: Customer Module / Customer Access
- **API Endpoint**: `GET /api/customers/{id}/orders`
- **Backend Fonksiyon**: `getCustomerOrders()`
- **Database Table**: `user_roles`

#### 8.5.3 Data Protection
**Personal Data Encryption:**
- **Konum**: Data Protection Module / Encryption
- **API Endpoint**: `POST /api/data/encrypt`
- **Backend Fonksiyon**: `encryptPersonalData()`
- **Database Field**: `encrypted_data`

**Payment Data Security (PCI Compliance):**
- **Konum**: Payment Module / Security
- **API Endpoint**: `POST /api/payments/secure`
- **Backend Fonksiyon**: `processSecurePayment()`
- **Database Table**: `secure_payments`

**GDPR Compliance Measures:**
- **Konum**: Privacy Module / GDPR Compliance
- **API Endpoint**: `GET /api/privacy/gdpr`
- **Backend Fonksiyon**: `getGDPRCompliance()`
- **Database Table**: `privacy_settings`

### 8.6 Performance ve Optimization Kuralları

#### 8.6.1 Database Optimization
**Index Strategies:**
- **Konum**: Database Module / Index Management
- **API Endpoint**: `GET /api/database/indexes`
- **Backend Fonksiyon**: `optimizeIndexes()`
- **Database Table**: `database_indexes`

**Query Optimization:**
- **Konum**: Database Module / Query Analysis
- **API Endpoint**: `POST /api/database/optimize-query`
- **Backend Fonksiyon**: `optimizeQuery()`
- **Database Table**: `query_logs`

**Connection Pooling:**
- **Konum**: Database Module / Connection Management
- **API Endpoint**: `GET /api/database/connections`
- **Backend Fonksiyon**: `manageConnections()`
- **Database Table**: `connection_pool`

#### 8.6.2 Cache Strategies
**Menu Data Caching:**
- **Konum**: Cache Module / Menu Cache
- **API Endpoint**: `GET /api/cache/menu`
- **Backend Fonksiyon**: `cacheMenuData()`
- **Database Table**: `cache_menu`

**User Session Caching:**
- **Konum**: Cache Module / Session Cache
- **API Endpoint**: `GET /api/cache/session`
- **Backend Fonksiyon**: `cacheUserSession()`
- **Database Table**: `cache_sessions`

**Report Data Caching:**
- **Konum**: Cache Module / Report Cache
- **API Endpoint**: `GET /api/cache/reports`
- **Backend Fonksiyon**: `cacheReportData()`
- **Database Table**: `cache_reports`

#### 8.6.3 API Rate Limiting
**Request Limits Per User:**
- **Konum**: Rate Limiting Module / User Limits
- **API Endpoint**: `GET /api/rate-limit/status`
- **Backend Fonksiyon**: `checkRateLimit()`
- **Database Table**: `rate_limits`

**Burst Protection:**
- **Konum**: Rate Limiting Module / Burst Control
- **API Endpoint**: `POST /api/rate-limit/burst`
- **Backend Fonksiyon**: `handleBurstRequest()`
- **Database Table**: `burst_logs`

**Fair Usage Policies:**
- **Konum**: Rate Limiting Module / Usage Policies
- **API Endpoint**: `GET /api/rate-limit/policies`
- **Backend Fonksiyon**: `getFairUsagePolicies()`
- **Database Table**: `usage_policies`

### 8.7 Business Intelligence ve Analytics

#### 8.7.1 Sales Analytics
**Revenue Trends:**
- **Konum**: Analytics Module / Revenue Analysis
- **API Endpoint**: `GET /api/analytics/revenue-trends`
- **Backend Fonksiyon**: `getRevenueTrends()`
- **Database Table**: `revenue_analytics`

**Product Performance:**
- **Konum**: Analytics Module / Product Analytics
- **API Endpoint**: `GET /api/analytics/product-performance`
- **Backend Fonksiyon**: `getProductPerformance()`
- **Database Table**: `product_analytics`

**Customer Behavior:**
- **Konum**: Analytics Module / Customer Analytics
- **API Endpoint**: `GET /api/analytics/customer-behavior`
- **Backend Fonksiyon**: `getCustomerBehavior()`
- **Database Table**: `customer_analytics`

**Seasonal Patterns:**
- **Konum**: Analytics Module / Seasonal Analysis
- **API Endpoint**: `GET /api/analytics/seasonal-patterns`
- **Backend Fonksiyon**: `getSeasonalPatterns()`
- **Database Table**: `seasonal_analytics`

#### 8.7.2 Operational Analytics
**Order Processing Time:**
- **Konum**: Analytics Module / Processing Analytics
- **API Endpoint**: `GET /api/analytics/processing-time`
- **Backend Fonksiyon**: `getProcessingTime()`
- **Database Table**: `processing_analytics`

**Staff Performance:**
- **Konum**: Analytics Module / Staff Analytics
- **API Endpoint**: `GET /api/analytics/staff-performance`
- **Backend Fonksiyon**: `getStaffPerformance()`
- **Database Table**: `staff_analytics`

**Inventory Turnover:**
- **Konum**: Analytics Module / Inventory Analytics
- **API Endpoint**: `GET /api/analytics/inventory-turnover`
- **Backend Fonksiyon**: `getInventoryTurnover()`
- **Database Table**: `inventory_analytics`

**Customer Satisfaction:**
- **Konum**: Analytics Module / Satisfaction Analytics
- **API Endpoint**: `GET /api/analytics/customer-satisfaction`
- **Backend Fonksiyon**: `getCustomerSatisfaction()`
- **Database Table**: `satisfaction_analytics`

### 8.8 Integration ve External Services

#### 8.8.1 Payment Processing
**Credit Card Processing:**
- **Konum**: Payment Module / Credit Card
- **API Endpoint**: `POST /api/payments/credit-card`
- **Backend Fonksiyon**: `processCreditCard()`
- **Database Table**: `credit_card_transactions`

#### 8.8.2 Communication Services
**SMS Notifications:**
- **Konum**: Notification Module / SMS
- **API Endpoint**: `POST /api/notifications/sms`
- **Backend Fonksiyon**: `sendSMS()`
- **Database Table**: `sms_notifications`

Bu detaylı iş mantığı analizi, QR Menu Elite Edition projesinin tüm hesaplama formüllerini, iş kurallarını, fiyatlandırma mantığını, bildirim sistemlerini, güvenlik kurallarını, performans optimizasyonlarını, iş zekası analitiklerini ve harici servis entegrasyonlarını kapsamlı bir şekilde belgelemektedir. Her bir özellik, dosya konumu, API endpoint'i, backend fonksiyonu ve veritabanı sorgusu ile birlikte detaylandırılmıştır.

## 9. YEMEK SİPARİŞİ PLATFORMU ANALİZİ

Bu bölüm, son kullanıcıların (tüketicilerin) göreceği web sitesi ve gelecekteki mobil uygulamanın özelliklerini tanımlar.

### 9.1 Tüketici Arayüzü (Web/Mobil)

#### Tespit Edilen Sorun: B2C Platform Eksikliği
**Önceden Şöyleydi:**
- Sadece B2B QR Menü sistemi mevcuttu
- Tüketici arayüzü yoktu
- Yemek siparişi platformu yoktu
- "Ciro Partnerliği" tüketici tarafında görünmüyordu
- Mobil uygulama altyapısı yoktu

**Artık Böyle Olmalı:**
- Tam özellikli B2C yemek siparişi platformu oluşturulacak
- Web ve mobil uygulama desteklenecek
- "Ciro Partnerliği" tüketici deneyiminin merkezinde olacak
- "Lezzet Kredisi" sistemi entegre edilecek
- Konum tabanlı restoran arama sistemi kurulacak

#### Nihai Karar:
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulanacak
- **İlke 6 (Çevresel Tutarlılık)** uygulanacak
- B2C platform sistemi kurulacak
- Mobil uygulama altyapısı hazırlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Ana Sayfa:**
- **Özellik**: Konuma göre veya popüler restoranları listeleyen bir vitrin
- **Öne Çıkarma**: "Ciro Partneri" rozetine sahip işletmeler öne çıkarılır
- **Konum**: Kullanıcının konumuna göre yakındaki restoranları gösterir
- **Popülerlik**: En çok sipariş alan restoranları listeler

**Restoran Arama ve Filtreleme:**
- **Filtreler**: Mutfak türü, puan, fiyat aralığı
- **Özel Filtre**: "Lezzet Kredisi Kabul Edenler" filtresi
- **Arama**: Restoran adı, yemek türü, konum bazlı arama
- **Sıralama**: Mesafe, puan, fiyat, popülerlik bazlı sıralama

**Restoran Detay Sayfası:**
- **Menü**: Restoranın tam menüsü
- **Bilgiler**: Adres, telefon, çalışma saatleri
- **Yorumlar**: Kullanıcı yorumları ve puanları
- **Ciro Partnerliği**: Koşulların gösterildiği sayfa (örn: hangi kategoride ne kadar kredi geçerli)
- **Fiyatlandırma**: Kredi kullanımı ile birlikte fiyat hesaplaması

**Sipariş ve Ödeme Akışı:**
- **Sepet**: Standart e-ticaret sepeti
- **Kredi Kullanımı**: Ödeme sırasında "Lezzet Kredisi" kullanma seçeneği
- **Ödeme**: Online ödeme entegrasyonu
- **Onay**: Sipariş onayı ve takip sistemi

**Kullanıcı Profili:**
- **Sipariş Geçmişi**: Tüm geçmiş siparişler
- **Kredi Bakiye**: "Lezzet Kredisi" bakiye ve işlem dökümü
- **Favoriler**: Favori restoranlar listesi
- **Adres Yönetimi**: Teslimat adresleri yönetimi

### 9.2 İşletme Arayüzü (Panel Güncellemeleri)

#### Tespit Edilen Sorun: Sınırlı Panel Özellikleri
**Önceden Şöyleydi:**
- Panel sadece QR Menü yönetimine odaklıydı
- Yemek siparişi platformu yönetimi yoktu
- "Ciro Partnerliği" ayarları eksikti
- Birleşik sipariş yönetimi yoktu
- Platform bazlı raporlama yoktu

**Artık Böyle Olmalı:**
- Panele, Yemek Sipariş Platformu'nu yönetmek için yeni modüller eklenecek
- Bu modüller, plan_features tablosuna göre yetkilendirilecek
- "Ciro Partnerliği" ayarları modülü eklenecek
- Birleşik sipariş yönetimi sistemi kurulacak
- Platform bazlı raporlama sistemi oluşturulacak

#### Nihai Karar:
- **İlke 3 (Kiracı İzolasyonu)** uygulanacak
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulanacak
- Panel sistemi genişletilecek
- Modüler yetkilendirme sistemi kurulacak

#### Anayasa Uyumlu Çözüm Planı:

**Yeni "Sipariş Akışı" Modülü:**
- **Birleşik Görünüm**: Hem QR menüden gelen (yerinde) hem de platformdan gelen (paket servis) siparişlerin tek bir ekranda görülebildiği birleşik ekran
- **Etiketleme**: Farklı etiketlerle (DINE_IN, DELIVERY) sipariş türü ayrımı
- **Filtreleme**: Sipariş kaynağına göre filtreleme
- **Durum Takibi**: Her sipariş türü için ayrı durum takibi

**Yeni "Ciro Partnerliği" Ayarları Modülü:**
- **Program Yönetimi**: İşletmenin programı açıp kapatabileceği arayüz
- **Limit Ayarları**: Kredi kullanım limitlerini kategorilere göre belirleme
- **Sübvansiyon Raporları**: Sübvansiyon raporlarını görme
- **Performans Analizi**: Program performansını analiz etme

**Güncellenmiş "Raporlar" Modülü:**
- **Kaynak Filtresi**: Raporlar, order_source (QR, PLATFORM)'a göre filtrelenebilecek
- **Karşılaştırma**: QR menü vs platform siparişleri karşılaştırması
- **Gelir Analizi**: Her kaynaktan gelen gelir analizi
- **Trend Analizi**: Zaman bazlı trend analizi

### 9.3 Mobil Uygulama Altyapısı

#### API-First Mimari
**Tamamen Başsız (Headless) Backend:**
- **Prensip**: Backend, önyüzden tamamen bağımsız olacak
- **Kısıtlama**: Hiçbir API endpoint'i HTML veya sayfa döndürmeyecek
- **Standart**: Sadece ve sadece JSON verisi döndürecektir
- **Fayda**: Mobil uygulama entegrasyonu kolaylaşır

**Authentication (Kimlik Doğrulama) Stratejisi:**
- **Mevcut Sistem**: JWT token sistemi mobil için de uygundur
- **Mobil Entegrasyon**: Mobil uygulama, kullanıcı adı/şifre ile login olup aynı token'ı alacak
- **Kullanım**: Sonraki tüm isteklerinde bu token'ı kullanacaktır
- **Güvenlik**: Aynı güvenlik seviyesi hem web hem mobil için sağlanır

**Tek Bir API Yüzeyi:**
- **Prensip**: Hem web önyüzü hem de mobil uygulama, aynı API endpoint'lerini kullanacaktır
- **Kısıtlama**: Mobil için ayrı endpoint'ler geliştirilmeyecektir
- **Fayda**: Bakım maliyetini düşürür ve tutarlılığı artırır
- **Performans**: Tek bir API yüzeyi optimize edilir

### 9.4 "Lezzet Kredisi" Sistemi

#### Kredi Kazanma Mekanizması
**Sipariş Bazlı Kazanma:**
- **Formül**: `order_total * 0.1` (sipariş tutarının %10'u)
- **Minimum Kredi**: 1 TL sipariş = 0.1 kredi
- **Maksimum Kredi**: Günlük limit yok, sınırsız kazanma
- **Kullanım Koşulu**: Minimum 1 kredi birikimi gerekli

#### Kredi Kullanma Sistemi
**Kullanım Oranı:**
- **Formül**: `1 kredi = 0.01 TL indirim`
- **Maksimum Kullanım**: Sipariş tutarının %50'si kadar
- **Minimum Sipariş**: 10 TL minimum sipariş tutarı
- **Kullanım Sırası**: En eski krediler önce kullanılır

#### Kredi Yönetimi
**Bakiye Takibi:**
- **Mevcut Bakiye**: Kullanıcı profilinde görüntülenir
- **Kazanılan Kredi**: Yeşil renk, pozitif işaret
- **Kullanılan Kredi**: Kırmızı renk, negatif işaret
- **Son Kullanma**: Krediler 1 yıl geçerlidir

**Kredi Geçmişi:**
- **Kazanma Kayıtları**: Hangi siparişten kaç kredi kazanıldığı
- **Kullanma Kayıtları**: Hangi siparişte kaç kredi kullanıldığı
- **Son Kullanma**: Hangi kredilerin ne zaman sona ereceği
- **İptal Durumu**: İptal edilen siparişlerde kredi iadesi

### 9.5 Konum Tabanlı Hizmetler

#### Restoran Arama Sistemi
**Konum Tespiti:**
- **GPS Kullanımı**: Kullanıcının konumunu otomatik tespit
- **Manuel Giriş**: Kullanıcının adres girebilmesi
- **Son Kullanılan**: Son kullanılan konumları hatırlama
- **Favori Konumlar**: Kullanıcının kaydettiği konumlar

**Mesafe Hesaplama:**
- **Havarsine Formülü**: İki nokta arası mesafe hesaplama
- **Teslimat Alanı**: Restoranın teslimat yapabildiği alan
- **Teslimat Süresi**: Mesafeye göre tahmini teslimat süresi
- **Teslimat Ücreti**: Mesafeye göre teslimat ücreti

#### Teslimat Sistemi
**Teslimat Seçenekleri:**
- **Kendi Kuryesi**: Restoranın kendi kuryesi
- **Platform Kuryesi**: Platform tarafından atanan kurye
- **Hibrit Sistem**: Her iki seçeneğin de mevcut olması
- **Teslimat Süresi**: 30-60 dakika arası teslimat

**Kurye Takip Sistemi:**
- **Gerçek Zamanlı Konum**: Kuryenin anlık konumu
- **Tahmini Varış**: Kuryenin tahmini varış süresi
- **Kurye Bilgileri**: Kurye adı, telefon, araç bilgisi
- **İletişim**: Kurye ile direkt iletişim

### 9.6 Ödeme Sistemi Entegrasyonu

#### Ödeme Yöntemleri
**Kredi Kartı:**
- **Güvenlik**: PCI DSS uyumlu ödeme sistemi
- **Tokenization**: Kart bilgileri güvenli şekilde saklanır
- **3D Secure**: 3D Secure doğrulama sistemi
- **Otomatik Ödeme**: Kayıtlı kartlarla otomatik ödeme

**Dijital Cüzdanlar:**
- **Apple Pay**: iOS cihazlarda Apple Pay desteği
- **Google Pay**: Android cihazlarda Google Pay desteği
- **Samsung Pay**: Samsung cihazlarda Samsung Pay desteği
- **Yerel Ödeme**: Türkiye'deki yerel ödeme sistemleri

**Nakit Ödeme:**
- **Kapıda Ödeme**: Teslimat sırasında nakit ödeme
- **Ön Ödeme**: Sipariş sırasında nakit ödeme
- **Para Üstü**: Kapıda ödeme için para üstü hesaplama
- **Makbuz**: Fiziksel veya dijital makbuz

#### "Lezzet Kredisi" Entegrasyonu
**Kredi Kullanımı:**
- **Ödeme Sırasında**: Ödeme sayfasında kredi kullanma seçeneği
- **Maksimum Kullanım**: Sipariş tutarının %50'si kadar
- **Kalan Tutar**: Kredi kullanıldıktan sonra kalan tutar
- **Final Ödeme**: Kredi + nakit/kart ile ödeme

**Kredi Hesaplama:**
- **Anlık Hesaplama**: Kredi kullanımı anında hesaplanır
- **İndirim Gösterimi**: Kredi ile sağlanan indirim miktarı
- **Net Tutar**: Kredi kullanıldıktan sonra ödenecek tutar
- **Kredi Bakiye**: Kullanımdan sonra kalan kredi miktarı

### 9.7 Bildirim Sistemi

#### Push Notifications
**Sipariş Bildirimleri:**
- **Sipariş Alındı**: Restoran siparişi aldığında bildirim
- **Hazırlanıyor**: Sipariş hazırlanmaya başlandığında bildirim
- **Hazır**: Sipariş hazır olduğunda bildirim
- **Yolda**: Kurye yola çıktığında bildirim
- **Teslim Edildi**: Sipariş teslim edildiğinde bildirim

**Kampanya Bildirimleri:**
- **Yeni Kampanyalar**: Yeni indirim ve kampanya bildirimleri
- **Kişiselleştirilmiş**: Kullanıcının tercihlerine göre bildirimler
- **Zamanlı**: Belirli saatlerde gönderilen bildirimler
- **Konum Bazlı**: Yakındaki restoranlardan bildirimler

#### Email ve SMS Bildirimleri
**Email Bildirimleri:**
- **Sipariş Onayı**: Sipariş alındığında email
- **Sipariş Durumu**: Sipariş durumu değiştiğinde email
- **Fatura**: Sipariş tamamlandığında fatura email'i
- **Kampanyalar**: Özel kampanya ve indirim email'leri

**SMS Bildirimleri:**
- **Kurye Bilgileri**: Kurye yola çıktığında SMS
- **Teslimat**: Sipariş teslim edildiğinde SMS
- **Acil Durumlar**: Sipariş iptali veya gecikme durumunda SMS
- **Doğrulama**: Telefon numarası doğrulama SMS'i

### 9.8 Müşteri Deneyimi Özellikleri

#### Kişiselleştirme
**Kullanıcı Profili:**
- **Tercihler**: Favori mutfak türleri, alerjiler, diyet kısıtlamaları
- **Geçmiş**: Sipariş geçmişi, favori restoranlar, sık sipariş verilen ürünler
- **Adresler**: Kayıtlı teslimat adresleri, iş adresi, ev adresi
- **Ödeme Yöntemleri**: Kayıtlı kartlar, dijital cüzdanlar

**Akıllı Öneriler:**
- **Kişiselleştirilmiş Menü**: Kullanıcının tercihlerine göre önerilen ürünler
- **Restoran Önerileri**: Geçmiş siparişlere göre önerilen restoranlar
- **Zaman Bazlı**: Saat ve güne göre öneriler
- **Konum Bazlı**: Yakındaki popüler restoranlar

#### Sosyal Özellikler
**Yorum ve Puanlama:**
- **Ürün Yorumları**: Sipariş verilen ürünler için yorum yapma
- **Restoran Puanlama**: Restoran için genel puan verme
- **Fotoğraf Paylaşımı**: Yemek fotoğrafları paylaşma
- **Arkadaş Önerileri**: Arkadaşların önerilerini görme

**Sosyal Medya Entegrasyonu:**
- **Facebook Login**: Facebook hesabı ile giriş yapma
- **Google Login**: Google hesabı ile giriş yapma
- **Paylaşım**: Siparişleri sosyal medyada paylaşma
- **Arkadaş Davet**: Arkadaşları platforma davet etme

### 9.9 Güvenlik ve Gizlilik

#### Veri Güvenliği
**Kişisel Veri Koruma:**
- **GDPR Uyumluluğu**: Avrupa veri koruma düzenlemelerine uyum
- **KVKK Uyumluluğu**: Türkiye kişisel veri koruma kanununa uyum
- **Veri Şifreleme**: Hassas verilerin şifrelenmesi
- **Güvenli İletişim**: HTTPS protokolü ile güvenli iletişim

**Ödeme Güvenliği:**
- **PCI DSS Uyumluluğu**: Ödeme kartı endüstrisi güvenlik standardı
- **Tokenization**: Kart bilgilerinin token'lar ile saklanması
- **Fraud Detection**: Dolandırıcılık tespit sistemi
- **3D Secure**: 3D Secure doğrulama sistemi

#### Gizlilik Ayarları
**Veri Paylaşımı:**
- **Konum Paylaşımı**: Konum bilgisinin paylaşılması
- **Kişisel Veriler**: Kişisel verilerin kullanımı
- **Pazarlama İletişimi**: Pazarlama amaçlı iletişim tercihleri
- **Üçüncü Taraf**: Üçüncü taraf servislerle veri paylaşımı

**Hesap Güvenliği:**
- **İki Faktörlü Doğrulama**: SMS veya email ile ek doğrulama
- **Şifre Politikası**: Güçlü şifre gereksinimleri
- **Oturum Yönetimi**: Aktif oturumları görüntüleme ve yönetme
- **Giriş Geçmişi**: Hesap giriş geçmişi takibi

Bu yemek siparişi platformu analizi, QR Menu Elite Edition projesinin B2C yönünü kapsamlı bir şekilde tanımlamaktadır. Platform, modern e-ticaret standartlarını karşılayan, kullanıcı dostu ve güvenli bir yemek siparişi deneyimi sunmayı hedeflemektedir.

## 10. TAMAMLANAN AŞAMALAR VE KURTARILAN BİLEŞENLER

### 10.1 Veritabanı Hazırlığı Aşaması

#### Tespit Edilen Sorun: Veri Yönetimi Eksikliği
**Önceden Şöyleydi:**
- Veritabanı yapısı belirsizdi
- Placeholder veri yönetimi yoktu
- Mock data temizleme sistemi yoktu
- Veri kategorileri tanımlanmamıştı
- Component-veri ilişkisi belirsizdi

**Artık Böyle Olmalı:**
- Kurtarma.db veritabanı oluşturuldu (8.0KB SQLite)
- Data placeholders tablosu kuruldu (6 sütunlu yapı)
- 53 placeholder veri eklendi (6 kategori)
- Mock data temizleme sistemi kuruldu
- Component-veri ilişkisi tanımlandı

#### Nihai Karar:
- **İlke 1 (Önce Veri, Sonra Kod)** uygulandı
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulandı
- Veri yönetimi sistemi kuruldu
- Placeholder sistemi standardize edildi

#### Anayasa Uyumlu Çözüm Planı:

**Veritabanı Yapısı:**
- **Kurtarma.db**: SQLite veritabanı (8.0KB)
- **data_placeholders Tablosu**: id, component_name, field_name, placeholder_text, data_type, description, example_value
- **53 Placeholder Veri**: Dashboard (4), Menu (4), Form (6), İş Yönetimi (15), Raporlama (8), Yardım (4)

### 10.2 Ortak Bileşenler Kurtarma Aşaması

#### Tespit Edilen Sorun: Bileşen Dağınıklığı
**Önceden Şöyleydi:**
- Layout bileşenleri dağınıktı
- Navigation bileşenleri eksikti
- UI bileşenleri standardize edilmemişti
- Menu bileşenleri kurtarılmamıştı
- Admin bileşenleri parçalıydı

**Artık Böyle Olmalı:**
- Layout bileşenleri kurtarıldı (5 ana bileşen, 702 satır)
- Navigation bileşenleri kurtarıldı (6 ana bileşen, 804 satır)
- UI bileşenleri standardize edildi (8 kategori, 779 satır)
- Menu bileşenleri kurtarıldı (5 ana bileşen, 770 satır)
- Admin bileşenleri tamamlandı (4 bölüm, 2,798 satır)

#### Nihai Karar:
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulandı
- **İlke 6 (Çevresel Tutarlılık)** uygulandı
- Bileşen sistemi standardize edildi
- Placeholder bağımlılıkları çözüldü

#### Anayasa Uyumlu Çözüm Planı:

**Layout Bileşenleri:**
- **RootLayout**: Ana layout yapısı (44 satır)
- **ClientWrapper**: Client-side wrapper (19 satır)
- **GlobalErrorBoundary**: Hata yakalama sistemi (224 satır)
- **ErrorToastManager**: Toast yönetimi (129 satır)
- **ErrorToast**: Toast bileşeni (285 satır)

**Navigation Bileşenleri:**
- **GlobalSearch**: Global arama sistemi (258 satır)
- **ModuleHeader**: Modül başlığı (194 satır)
- **ModuleHeaderSimple**: Basit modül başlığı (131 satır)
- **UserProfile**: Kullanıcı profili (118 satır)
- **UserProfileCompact**: Kompakt kullanıcı profili (118 satır)
- **LanguageSelector**: Dil seçici (78 satır)

**UI Bileşenleri:**
- **Button**: Buton bileşeni (56 satır)
- **Card**: Kart bileşenleri (79 satır)
- **Dialog**: Modal bileşenleri (120 satır)
- **Input**: Giriş alanı (25 satır)
- **Select**: Seçim bileşenleri (158 satır)
- **Alert**: Uyarı bileşenleri (59 satır)
- **Tabs**: Sekme bileşenleri (53 satır)
- **Additional UI**: Ek UI bileşenleri (200+ satır)

**Menu Bileşenleri:**
- **ProductCard**: Ürün kartı bileşeni (530 satır)
- **CategorySlider**: Kategori kaydırıcı (382 satır)
- **ProductModal**: Ürün detay modalı (347 satır)
- **OptimizedImage**: Optimize edilmiş resim bileşeni (60 satır)
- **Utility Functions**: Yardımcı fonksiyonlar (50+ satır)

**Admin Bileşenleri:**
- **Bölüm 1**: Accounting Module, Financial Metrics, Accounts Overview (758 satır)
- **Bölüm 2**: Transactions, Bill Manager, Goals Tracker, Modals (947 satır)
- **Bölüm 3**: Reports, Analytics, KPIs, Predictive Analytics (650 satır)
- **Bölüm 4**: FileManager, Navigation, File Cards (443 satır)

### 10.3 Ana Sayfalar Kurtarma Aşaması

#### Tespit Edilen Sorun: Sayfa Eksiklikleri
**Önceden Şöyleydi:**
- Ana sayfa eksikti
- Menu sayfaları kurtarılmamıştı
- Giriş/kayıt sayfaları yoktu
- Çerezler sayfası eksikti
- Tenant not found sayfası yoktu

**Artık Böyle Olmalı:**
- Ana sayfa kurtarıldı (HomePage, 274 satır)
- Menu sayfaları kurtarıldı (MenuPage, Menu2Page, Menu3Page, 665 satır)
- Giriş/kayıt sayfaları oluşturuldu (GirisSayfasi, KayitSayfasi, 482 satır)
- Çerezler sayfası kurtarıldı (CerezPolitikasi, 315 satır)
- Tenant not found sayfası oluşturuldu (TenantNotFoundPage, 73 satır)

#### Nihai Karar:
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulandı
- **İlke 6 (Çevresel Tutarlılık)** uygulandı
- Tüm ana sayfalar kurtarıldı
- Mock data temizlendi

#### Anayasa Uyumlu Çözüm Planı:

**Ana Sayfa (HomePage):**
- **Header**: Sticky header, logo, yönetim paneli butonu
- **Hero Section**: Ana başlık, açıklama, CTA butonları
- **Features Grid**: 6 özellik kartı (QR Menü, POS, Analitik, Masa Yönetimi, Mobil, Premium Destek)
- **CTA Section**: Call-to-action bölümü
- **Footer**: Alt bilgi bölümü

**Menu Sayfaları:**
- **MenuPage**: RetroParticle System, MenuPageContent, CategorySlider, ProductModal, FloatingRestaurantMenu, CartModal (332 satır)
- **Menu2Page**: Menu2PageContent, CategorySlider2, ProductModal, FloatingRestaurantMenu, CartModal (162 satır)
- **Menu3Page**: Menu3Page, CategorySlider3, ProductModal, Luxury Gold Theme, Particle Effects (171 satır)

**Giriş/Kayıt Sayfaları:**
- **GirisSayfasi**: Split layout, OAuth integration, User profile, Registration modal, Social login options (326 satır)
- **KayitSayfasi**: Split layout, OAuth integration, Registration form, Social login options, Form validation (156 satır)

**Diğer Sayfalar:**
- **CerezPolitikasi**: Cookie policy, GDPR compliance, AI integration, Cookie categories, User rights (315 satır)
- **TenantNotFoundPage**: Error page, Domain detection, Navigation, Helpful information, Retry functionality (73 satır)

### 10.4 Panel Modülleri Kurtarma Aşaması

#### Tespit Edilen Sorun: Modül Eksiklikleri
**Önceden Şöyleydi:**
- Panel modülleri eksikti
- Tables modülü kurtarılmamıştı
- Inventory modülü yoktu
- Calendar modülü eksikti
- Communications modülü yoktu
- Kitchen modülü kurtarılmamıştı
- Orders modülü eksikti
- Settings modülü yoktu
- Reports modülü kurtarılmamıştı
- Reservation modülü eksikti
- Customer Feedback modülü yoktu
- Notification modülü kurtarılmamıştı
- Staff modülü eksikti
- Customers modülü yoktu
- Help modülü kurtarılmamıştı
- Loyalty modülü eksikti
- Menu Management modülü yoktu

**Artık Böyle Olmalı:**
- 16 panel modülü kurtarıldı (12,000+ satır)
- Tables modülü kurtarıldı (728 satır)
- Inventory modülü kurtarıldı (679 satır)
- Calendar modülü kurtarıldı (627 satır)
- Communications modülü kurtarıldı (647 satır)
- Kitchen modülü kurtarıldı (563 satır)
- Orders modülü kurtarıldı (537 satır)
- Settings modülü kurtarıldı (522 satır)
- Reports modülü kurtarıldı (1075 satır)
- Reservation modülü kurtarıldı (986 satır)
- Customer Feedback modülü kurtarıldı (891 satır)
- Notification modülü kurtarıldı (865 satır)
- Staff modülü kurtarıldı (866 satır)
- Customers modülü kurtarıldı (593 satır)
- Help modülü kurtarıldı (415 satır)
- Loyalty modülü kurtarıldı (491 satır)
- Menu Management modülü kurtarıldı (328 satır)

#### Nihai Karar:
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulandı
- **İlke 6 (Çevresel Tutarlılık)** uygulandı
- Tüm panel modülleri kurtarıldı
- Mock data temizlendi

#### Anayasa Uyumlu Çözüm Planı:

**Tables Module (728 satır):**
- Table management, POS sessions, Real-time updates
- Customer journey, Stats dashboard, Search & filters

**Inventory Module (679 satır):**
- Stock management, Supplier management, Real-time tracking
- Low stock alerts, Inventory valuation, Tab system

**Calendar Module (627 satır):**
- Event management, Calendar views, Real-time updates
- 6 farklı etkinlik türü, Navigation, Modal forms

**Communications Module (647 satır):**
- Real-time messaging, User management, Room system
- Connection status, Typing indicators, File attachments

**Kitchen Module (563 satır):**
- Kitchen order queue, Chef assignment system
- Preparation status tracking, Kitchen statistics dashboard

**Orders Module (537 satır):**
- Order list table, Order status indicators
- Order details modal, Filter and search options

**Settings Module (522 satır):**
- Business profile settings, Notification preferences
- Payment settings, Account management

**Reports Module (1075 satır):**
- Executive Dashboard, Operational Insights
- Financial Analytics, Predictive Reports

**Reservation Module (986 satır):**
- Reservation management, Table booking system
- Calendar integration, Guest management

**Customer Feedback Module (891 satır):**
- Feedback collection, Rating system, Review management
- Multi-dimensional rating system, Feedback categorization

**Notification Module (865 satır):**
- Notification management, Alert system, Message center
- Multi-type notification management, Multi-channel delivery

**Staff Module (866 satır):**
- Staff management, Shift scheduling, Performance tracking
- Payroll integration, Staff CRUD operations

**Customers Module (593 satır):**
- Customer management, Customer profiles, Customer analytics
- Customer segmentation, Order history tracking

**Help Module (415 satır):**
- Help documentation, FAQ management, Support tickets
- Tutorial system, Video tutorials

**Loyalty Module (491 satır):**
- Loyalty program management, Points system, Rewards management
- Customer tiers, Campaign management

**Menu Management Module (328 satır):**
- Menu creation and editing, Category management
- Product management, Menu publishing

### 10.5 Menu Management Alt Modülleri Kurtarma Aşaması

#### Tespit Edilen Sorun: Alt Modül Eksiklikleri
**Önceden Şöyleydi:**
- Category Management component eksikti
- Product Management component yoktu
- Product Modal component kurtarılmamıştı
- Changelog Management component eksikti
- Archive Management component yoktu
- Metadata Management component kurtarılmamıştı
- Ready Categories component eksikti
- Menu Templates component yoktu
- Upsell/Cross-sell Management component kurtarılmamıştı

**Artık Böyle Olmalı:**
- 9 alt modül kurtarıldı (4,000+ satır)
- Category Management component kurtarıldı (532 satır)
- Product Management component kurtarıldı (591 satır)
- Product Modal component kurtarıldı (486 satır)
- Changelog Management component kurtarıldı (419 satır)
- Archive Management component kurtarıldı (446 satır)
- Metadata Management component kurtarıldı (421 satır)
- Ready Categories component kurtarıldı (433 satır)
- Menu Templates component kurtarıldı (378 satır)
- Upsell/Cross-sell Management component kurtarıldı (396 satır)

#### Nihai Karar:
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulandı
- **İlke 6 (Çevresel Tutarlılık)** uygulandı
- Tüm alt modüller kurtarıldı
- Mock data temizlendi

#### Anayasa Uyumlu Çözüm Planı:

**Category Management Component (532 satır):**
- Category CRUD operations, Drag & drop reordering
- Seasonality management, Color and icon customization
- Bulk selection, Search and filtering

**Product Management Component (591 satır):**
- Product CRUD operations, Drag & drop reordering
- Category filtering, Search functionality
- Bulk selection, Sort and filter options

**Product Modal Component (486 satır):**
- Product form management, Image upload functionality
- Category selection, Pricing controls
- Status management, Validation system

**Changelog Management Component (419 satır):**
- Change tracking system, Version history
- Change log entries, Approval workflow
- Change notifications, Audit trail

**Archive Management Component (446 satır):**
- Archive management system, Restore functionality
- Archive history, Bulk operations
- Archive filters, Recovery options

**Metadata Management Component (421 satır):**
- Metadata management system, SEO optimization
- Meta tags management, Schema markup
- Open Graph tags, Twitter Cards

**Ready Categories Component (433 satır):**
- Ready categories management, Category templates
- Quick setup, Pre-configured categories
- Category presets, Template system

**Menu Templates Component (378 satır):**
- Menu templates, Template system
- Template management, Template customization
- Template sharing, Template marketplace

**Upsell/Cross-sell Management Component (396 satır):**
- Upsell management, Cross-sell management
- Product recommendations, Cross-selling strategies
- Upselling techniques, Recommendation engine

### 10.6 Uyumluluk Kontrolü Aşaması

#### Tespit Edilen Sorun: Uyumsuzluk Tespiti Eksikliği
**Önceden Şöyleydi:**
- Veritabanı şeması kontrol edilmemişti
- Backend API kontrolü yapılmamıştı
- Frontend component kontrolü eksikti
- Uyumsuzluklar tespit edilmemişti
- Öncelik sıralaması yoktu

**Artık Böyle Olmalı:**
- Veritabanı şeması kontrol edildi (70+ tablo analiz edildi)
- Backend API kontrolü yapıldı (API endpoint'leri tespit edildi)
- Frontend component kontrolü tamamlandı (Tüm component'ler kontrol edildi)
- 14 adet uyumsuzluk tespit edildi
- Öncelik sıralaması belirlendi

#### Nihai Karar:
- **İlke 1 (Önce Veri, Sonra Kod)** uygulandı
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulandı
- Uyumluluk kontrolü tamamlandı
- Çözüm planı hazırlandı

#### Anayasa Uyumlu Çözüm Planı:

**Tespit Edilen Uyumsuzluklar:**
- **Mock Data Uyumsuzlukları**: 5 adet
- **API Endpoint Uyumsuzlukları**: 3 adet
- **Veritabanı Şema Uyumsuzlukları**: 3 adet
- **Frontend Component Uyumsuzlukları**: 3 adet

**Öncelik Dağılımı:**
- **Yüksek Öncelik**: 5 adet (%36)
- **Orta Öncelik**: 6 adet (%43)
- **Düşük Öncelik**: 3 adet (%21)

**Sonraki Adımlar:**
1. **Dashboard API endpoint'leri oluştur**
2. **Menu management API'leri oluştur**
3. **Database schema güncellemeleri**
4. **Error handling ve loading states ekle**

### 10.7 Çoklu Menü Uyumu ve Merkezi Veri Yönetimi

#### Tespit Edilen Sorun: Menü Şablonları ve Veri Tekrarı
**Önceden Şöyleydi:**
- Her menü ayrı ayrı oluşturuluyordu
- Menü şablonları (templates) ayrı veri yapıları gerektiriyordu
- Kategori ve ürün bilgileri her menü için tekrar giriliyordu
- 100 farklı menü tasarımı için 100 farklı veri girişi gerekiyordu
- Veri tutarsızlığı riski mevcuttu
- Bakım maliyeti yüksekti

**Artık Böyle Olmalı:**
- Panelden kategori ve ürünle ilgili tüm bilgiler tek seferde doldurulacak
- Bir menü hangi özellikleri gerektiriyorsa sadece onları çekecek
- 100 farklı menü tasarımı olsa dahi otomatik olarak dolmuş olacaklar
- Merkezi veri yönetimi sağlanacak
- Veri tutarlılığı garanti altına alınacak

#### Nihai Karar:
- **İlke 1 (Önce Veri, Sonra Kod)** uygulanacak
- **İlke 4 (Bakımı Kolay ve Sağlam Dijital Miras)** uygulanacak
- **Veri Öncelikli Yaklaşım**: Sistem kurgusu veri üstünden ilerleyecek
- **Data-First Mantığı**: Veri modeli önce tasarlanacak, sonra menü sistemi geliştirilecek
- Merkezi veri yönetimi sistemi kurulacak
- Çoklu menü uyumu sağlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Merkezi Veri Yönetimi:**
- **Prensip**: Panelden kategori ve ürünle ilgili tüm bilgiler tek seferde doldurulacak
- **Veri Kaynağı**: categories ve products tabloları tek doğruluk kaynağı olacak
- **Otomatik Doldurma**: Menü şablonları bu verilerden otomatik olarak beslenecek
- **Tutarlılık**: Veri değişikliği tüm menülerde anında yansıyacak

**Dinamik Menü Şablonları:**
- **Prensip**: Bir menü hangi özellikleri gerektiriyorsa sadece onları çekecek
- **Filtreleme**: Menü şablonları, kategori ve ürün verilerini filtreleyerek kullanacak
- **Esneklik**: 100 farklı menü tasarımı olsa dahi otomatik olarak dolmuş olacaklar
- **Performans**: Gereksiz veri yükleme olmayacak

**API Entegrasyonu:**
- **Endpoint**: GET /api/v1/tenants/:tenantId/menu/:templateId
- **Parametreler**: templateId ile hangi menü şablonunun kullanılacağı belirlenecek
- **Veri Akışı**: Şablon, merkezi veritabanından sadece gerekli verileri çekecek
- **Cache**: Menü verileri şablon bazında cache'lenecek

**Veritabanı Yapısı:**
- **menu_templates Tablosu**: Menü şablonlarının tanımlandığı tablo
- **template_configurations Tablosu**: Her şablonun hangi kategorileri/ürünleri göstereceğini belirten tablo
- **template_styles Tablosu**: Şablonların görsel stillerini tutan tablo
- **İlişkiler**: Şablonlar categories ve products tablolarına referans verecek

**Frontend Entegrasyonu:**
- **useMenu Hook**: templateId parametresi alacak
- **MenuPage Component**: Dinamik olarak şablon verilerini yükleyecek
- **MenuManagementModule**: Şablon yönetimi arayüzü sağlayacak
- **Real-time Updates**: Veri değişiklikleri tüm menülerde anında yansıyacak

### 10.8 Proje İstatistikleri

#### Tamamlanan Bileşenler
- **Toplam Bileşen**: 50+ ana bileşen
- **Toplam Satır**: 15,000+ satır kod
- **Kurtarılan Modül**: 16 panel modülü
- **Ana Sayfa**: 8 sayfa
- **UI Bileşenleri**: 20+ kategori

#### Veritabanı
- **Toplam Tablo**: 70+ tablo
- **Placeholder Veri**: 53 kayıt
- **Veri Kategorisi**: 6 kategori

#### Uyumluluk
- **Tespit Edilen Uyumsuzluk**: 14 adet
- **Yüksek Öncelik**: 5 adet
- **Orta Öncelik**: 6 adet
- **Düşük Öncelik**: 3 adet

#### Tamamlanma Oranı
- **Veritabanı Hazırlığı**: %100
- **Ortak Bileşenler**: %100
- **Ana Sayfalar**: %100
- **Panel Modülleri**: %100
- **Uyumluluk Kontrolü**: %100

**Son Güncelleme:** 28 Haziran 2025
**Durum:** ✅ Tüm aşamalar başarıyla tamamlandı
**Sonraki Hedef:** Uyumsuzluk çözümleri ve çoklu menü uyumu implementasyonu

## 11. EKSİK ÖNYÜZ ANALİZLERİ VE DETAYLI KONTROL LİSTESİ

### 11.1 UI Elementleri Detaylı Analizi

#### Tespit Edilen Sorun: UI Element Analizi Eksikliği
**Önceden Şöyleydi:**
- UI element'lerinin detaylı analizi yapılmamıştı
- Button varyantları belgelenmemişti
- Card tipleri tanımlanmamıştı
- Form elementleri analiz edilmemişti
- Modal tipleri belgelenmemişti
- Table özellikleri tanımlanmamıştı
- Chart tipleri analiz edilmemişti
- Progress indicator'lar belgelenmemişti
- Navigation elementleri tanımlanmamıştı

**Artık Böyle Olmalı:**
- Tüm UI element'lerinin detaylı analizi yapılacak
- Button varyantları (Primary, Secondary, Ghost, Icon) belgelenecek
- Card tipleri (Metric, Product, Order, Customer) tanımlanacak
- Form elementleri (Text inputs, Select dropdowns, Checkboxes, Radio buttons, File uploads) analiz edilecek
- Modal tipleri (Confirmation, Form, Details, Alert) belgelenecek
- Table özellikleri (Sortable columns, Pagination, Row selection, Bulk actions) tanımlanacak
- Chart tipleri (Line, Bar, Pie, Area) analiz edilecek
- Progress indicator'lar (Progress bars, Loading spinners, Status badges) belgelenecek
- Navigation elementleri (Breadcrumbs, Tabs, Sidebar menu, Pagination) tanımlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Button Varyantları:**
- **Primary Button**: Ana aksiyonlar için (color: primary, size: medium, text: action-oriented)
- **Secondary Button**: İkincil aksiyonlar için (color: secondary, size: medium, text: descriptive)
- **Ghost Button**: Minimal aksiyonlar için (color: transparent, size: medium, text: subtle)
- **Icon Button**: Sadece icon için (color: inherit, size: small, text: none)

**Card Tipleri:**
- **Metric Card**: Sayısal veriler için (header, value, change indicator, icon)
- **Product Card**: Ürün bilgileri için (image, name, price, description, action button)
- **Order Card**: Sipariş bilgileri için (order ID, items, total, status, date)
- **Customer Card**: Müşteri bilgileri için (avatar, name, email, order count, total spent)

**Form Elementleri:**
- **Text Inputs**: placeholder text, validation rules, error states
- **Select Dropdowns**: options list, default value, search functionality
- **Checkboxes**: label text, default state, group behavior
- **Radio Buttons**: options list, default selection, group behavior
- **File Uploads**: accepted formats, size limits, preview functionality

**Modal Tipleri:**
- **Confirmation Modal**: Onay gerektiren aksiyonlar için (title, message, action buttons)
- **Form Modal**: Veri girişi için (form fields, validation, submit/cancel)
- **Details Modal**: Detay görüntüleme için (read-only data, close button)
- **Alert Modal**: Uyarı mesajları için (icon, message, action button)

**Table Özellikleri:**
- **Sortable Columns**: Sütun bazlı sıralama, sort direction indicator
- **Pagination**: Sayfa numaralandırma, items per page selector
- **Row Selection**: Tekil/çoklu satır seçimi, bulk action buttons
- **Bulk Actions**: Seçili satırlar için toplu işlemler

**Chart Tipleri:**
- **Line Chart**: Zaman serisi verileri için (trend analysis, multiple series)
- **Bar Chart**: Kategorik veriler için (comparison, horizontal/vertical)
- **Pie Chart**: Oran gösterimi için (percentage distribution, legend)
- **Area Chart**: Dolgu alanı ile trend gösterimi için (cumulative data)

**Progress Indicators:**
- **Progress Bars**: İlerleme gösterimi için (percentage, color coding, animated)
- **Loading Spinners**: Yükleme durumu için (size variants, overlay support)
- **Status Badges**: Durum gösterimi için (color coding, text labels, icons)

**Navigation Elements:**
- **Breadcrumbs**: Sayfa hiyerarşisi için (clickable links, current page)
- **Tabs**: İçerik bölümleme için (active state, content switching)
- **Sidebar Menu**: Ana navigasyon için (collapsible, nested items)
- **Pagination**: Sayfa geçişi için (page numbers, prev/next buttons)

### 11.2 Responsive Design Analizi

#### Tespit Edilen Sorun: Responsive Design Analizi Eksikliği
**Önceden Şöyleydi:**
- Mobile breakpoint'lerde nasıl göründüğü analiz edilmemişti
- Tablet breakpoint'lerde nasıl göründüğü belgelenmemişti
- Desktop breakpoint'lerde nasıl göründüğü tanımlanmamıştı
- Hangi elementlerin responsive olarak değiştiği belgelenmemişti
- Mobile menu'nun nasıl çalıştığı analiz edilmemişti
- Touch interaction'ların nasıl çalıştığı tanımlanmamıştı

**Artık Böyle Olmalı:**
- Mobile breakpoint'lerde (320px-768px) nasıl göründüğü analiz edilecek
- Tablet breakpoint'lerde (768px-1024px) nasıl göründüğü belgelenecek
- Desktop breakpoint'lerde (1024px+) nasıl göründüğü tanımlanacak
- Hangi elementlerin responsive olarak değiştiği belgelenecek
- Mobile menu'nun nasıl çalıştığı analiz edilecek
- Touch interaction'ların nasıl çalıştığı tanımlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Mobile Breakpoint (320px-768px):**
- **Layout**: Single column layout, stacked elements
- **Navigation**: Hamburger menu, collapsible sidebar
- **Tables**: Horizontal scroll, card-based alternative
- **Forms**: Full-width inputs, stacked labels
- **Buttons**: Full-width primary actions, icon buttons for secondary
- **Cards**: Single column, simplified content
- **Modals**: Full-screen overlay, simplified content

**Tablet Breakpoint (768px-1024px):**
- **Layout**: Two-column layout, side-by-side elements
- **Navigation**: Collapsible sidebar, tab navigation
- **Tables**: Responsive tables, selective column display
- **Forms**: Multi-column layouts, inline labels
- **Buttons**: Standard sizing, grouped actions
- **Cards**: Two-column grid, detailed content
- **Modals**: Centered overlay, standard content

**Desktop Breakpoint (1024px+):**
- **Layout**: Multi-column layout, sidebar + main content
- **Navigation**: Permanent sidebar, breadcrumb navigation
- **Tables**: Full table display, all columns visible
- **Forms**: Multi-column layouts, complex field groups
- **Buttons**: Standard sizing, action grouping
- **Cards**: Multi-column grid, rich content
- **Modals**: Standard overlay, full content

**Responsive Element Değişiklikleri:**
- **Grid Systems**: 1 column → 2 columns → 3+ columns
- **Typography**: Smaller fonts → Medium fonts → Larger fonts
- **Spacing**: Compact → Standard → Generous
- **Images**: Thumbnail → Medium → Large
- **Navigation**: Hamburger → Tabs → Sidebar
- **Tables**: Cards → Scrollable → Full table

**Mobile Menu Çalışma Mantığı:**
- **Trigger**: Hamburger icon, swipe gesture
- **Animation**: Slide-in from left/right, fade overlay
- **Content**: Stacked menu items, nested navigation
- **Interaction**: Tap to expand, swipe to close
- **Accessibility**: Focus management, keyboard navigation

**Touch Interactions:**
- **Tap**: Primary action, navigation
- **Long Press**: Context menu, selection mode
- **Swipe**: Navigation, dismiss actions
- **Pinch**: Zoom functionality, image scaling
- **Pull to Refresh**: Data refresh, loading states

### 11.3 Theme ve Styling Analizi

#### Tespit Edilen Sorun: Theme ve Styling Analizi Eksikliği
**Önceden Şöyleydi:**
- Color palette tanımlanmamıştı
- Typography sistemi belgelenmemişti
- Spacing sistemi analiz edilmemişti
- Border radius değerleri tanımlanmamıştı
- Shadow efektleri belgelenmemişti
- Dark/light mode farklılıkları analiz edilmemişti
- Animation süreleri ve easing belgelenmemişti

**Artık Böyle Olmalı:**
- Color palette (primary, secondary, accent colors) tanımlanacak
- Typography (font families, sizes, weights) sistemi belgelenecek
- Spacing system (margins, paddings) analiz edilecek
- Border radius değerleri tanımlanacak
- Shadow efektleri belgelenecek
- Dark/light mode farklılıkları analiz edilecek
- Animation süreleri ve easing belgelenecek

#### Anayasa Uyumlu Çözüm Planı:

**Color Palette:**
- **Primary Colors**: #6366F1 (indigo), #3B82F6 (blue), #10B981 (emerald)
- **Secondary Colors**: #F59E0B (amber), #EF4444 (red), #8B5CF6 (violet)
- **Neutral Colors**: #F8FAFC (gray-50), #64748B (gray-500), #1E293B (gray-800)
- **Semantic Colors**: Success (#10B981), Warning (#F59E0B), Error (#EF4444), Info (#3B82F6)

**Typography System:**
- **Font Families**: Inter (primary), system fonts (fallback)
- **Font Sizes**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px)
- **Font Weights**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights**: Tight (1.25), Normal (1.5), Relaxed (1.75)

**Spacing System:**
- **Margins**: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px)
- **Paddings**: Same scale as margins, component-specific adjustments
- **Gaps**: Grid gaps, flex gaps, consistent spacing

**Border Radius Values:**
- **Small**: 4px (buttons, inputs)
- **Medium**: 8px (cards, modals)
- **Large**: 12px (large components)
- **Full**: 50% (avatars, circular elements)

**Shadow Effects:**
- **Small**: 0 1px 2px 0 rgba(0, 0, 0, 0.05) (inputs, buttons)
- **Medium**: 0 4px 6px -1px rgba(0, 0, 0, 0.1) (cards, dropdowns)
- **Large**: 0 10px 15px -3px rgba(0, 0, 0, 0.1) (modals, overlays)
- **Extra Large**: 0 25px 50px -12px rgba(0, 0, 0, 0.25) (hero sections)

**Dark/Light Mode Differences:**
- **Background**: Light (#FFFFFF) → Dark (#0F172A)
- **Surface**: Light (#F8FAFC) → Dark (#1E293B)
- **Text**: Light (#1E293B) → Dark (#F1F5F9)
- **Border**: Light (#E2E8F0) → Dark (#334155)
- **Shadow**: Light (subtle) → Dark (more pronounced)

**Animation Durations and Easing:**
- **Fast**: 150ms (micro-interactions, hover states)
- **Normal**: 300ms (transitions, state changes)
- **Slow**: 500ms (page transitions, complex animations)
- **Easing**: ease-in-out (smooth), ease-out (entrance), ease-in (exit)

### 11.4 Micro-interactions Analizi

#### Tespit Edilen Sorun: Micro-interactions Analizi Eksikliği
**Önceden Şöyleydi:**
- Hover efektleri belgelenmemişti
- Click animasyonları analiz edilmemişti
- Loading state'leri tanımlanmamıştı
- Success/error state'leri belgelenmemişti
- Transition efektleri analiz edilmemişti
- Feedback animasyonları tanımlanmamıştı

**Artık Böyle Olmalı:**
- Hover efektleri belgelenecek
- Click animasyonları analiz edilecek
- Loading state'leri tanımlanacak
- Success/error state'leri belgelenecek
- Transition efektleri analiz edilecek
- Feedback animasyonları tanımlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Hover Effects:**
- **Buttons**: Scale (1.02), shadow increase, color transition
- **Cards**: Elevation increase, subtle scale, border highlight
- **Links**: Color change, underline animation, icon movement
- **Images**: Scale (1.05), brightness adjustment, overlay fade

**Click Animations:**
- **Buttons**: Scale down (0.98), ripple effect, color feedback
- **Cards**: Press down effect, shadow reduction
- **Toggle Elements**: Smooth state transition, icon rotation
- **Form Elements**: Focus ring, border color change

**Loading States:**
- **Skeleton Loading**: Animated placeholder, shimmer effect
- **Spinner Loading**: Rotating icon, progress indicator
- **Skeleton Cards**: Animated rectangles, pulse effect
- **Button Loading**: Disabled state, spinner integration

**Success/Error States:**
- **Success**: Green color, checkmark icon, fade-in animation
- **Error**: Red color, error icon, shake animation
- **Warning**: Yellow color, warning icon, pulse animation
- **Info**: Blue color, info icon, slide-in animation

**Transition Effects:**
- **Page Transitions**: Fade in/out, slide left/right
- **Modal Transitions**: Scale in/out, backdrop fade
- **List Transitions**: Stagger animation, slide up
- **Form Transitions**: Field focus, validation feedback

**Feedback Animations:**
- **Toast Notifications**: Slide in from top, auto-dismiss
- **Progress Indicators**: Smooth progress bar, percentage update
- **Status Changes**: Color transition, icon swap
- **Data Updates**: Highlight effect, smooth number changes

### 11.5 Dashboard Detaylı Analizi

#### Tespit Edilen Sorun: Dashboard Detaylı Analizi Eksikliği
**Önceden Şöyleydi:**
- Dashboard header bölümünde hangi bilgilerin olduğu detaylı analiz edilmemişti
- Metric cards'da hangi verilerin gösterildiği belgelenmemişti
- Her metric card'da hangi detayların bulunduğu tanımlanmamıştı
- Charts'da hangi verilerin gösterildiği analiz edilmemişti
- Recent activity feed'de hangi aktivitelerin olduğu belgelenmemişti
- Quick action button'ların neler olduğu tanımlanmamıştı

**Artık Böyle Olmalı:**
- Dashboard header bölümünde hangi bilgilerin olduğu detaylı analiz edilecek
- Metric cards'da hangi verilerin gösterildiği belgelenecek
- Her metric card'da hangi detayların bulunduğu tanımlanacak
- Charts'da hangi verilerin gösterildiği analiz edilecek
- Recent activity feed'de hangi aktivitelerin olduğu belgelenecek
- Quick action button'ların neler olduğu tanımlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Dashboard Header Bölümü:**
- **Business Name**: İşletme adı (font: semibold, size: xl, color: primary)
- **Current Date/Time**: Güncel tarih ve saat (format: "28 Haziran 2025, 14:30", auto-update)
- **User Profile Info**: Kullanıcı avatar, adı, rolü (dropdown menu ile)
- **Notification Bell**: Bildirim sayısı, unread indicator, dropdown menu

**Metric Cards Verileri:**
- **Revenue Metrics**: 
  - Total revenue (toplam gelir, currency format)
  - Daily revenue (günlük gelir, trend indicator)
  - Weekly revenue (haftalık gelir, comparison)
  - Monthly revenue (aylık gelir, growth percentage)
- **Order Metrics**:
  - Total orders (toplam sipariş sayısı)
  - Pending orders (bekleyen siparişler, urgent indicator)
  - Completed orders (tamamlanan siparişler, success rate)
  - Cancelled orders (iptal edilen siparişler, percentage)
- **Customer Metrics**:
  - Total customers (toplam müşteri sayısı)
  - New customers (yeni müşteriler, growth indicator)
  - Returning customers (dönen müşteriler, loyalty rate)
  - Active customers (aktif müşteriler, last 30 days)
- **Product Metrics**:
  - Total products (toplam ürün sayısı)
  - Active products (aktif ürünler, percentage)
  - Low stock products (düşük stok ürünler, alert indicator)
  - Top selling products (en çok satan ürünler, top 5)

**Her Metric Card Detayları:**
- **Icon**: Metrik tipine uygun icon (revenue: currency, orders: shopping cart, customers: users, products: box)
- **Title**: Metrik adı (font: medium, size: sm, color: gray-600)
- **Value**: Sayısal değer (font: bold, size: 2xl, color: primary)
- **Change Percentage**: Artış/azalış yüzdesi (format: "+12.5%", color: green/red)
- **Trend Indicator**: Up/down arrow (icon: chevron-up/down, color: green/red)
- **Color Coding**: 
  - Green: Positive growth, success states
  - Red: Negative growth, error states
  - Blue: Neutral, informational states

**Charts Verileri:**
- **Revenue Chart**: 
  - Time period: Last 7 days, 30 days, 90 days (selectable)
  - Data points: Daily revenue values, trend line
  - Features: Hover tooltip, zoom functionality, export option
- **Order Chart**: 
  - Daily/weekly trend: Order count over time
  - Status breakdown: Pending, preparing, completed, cancelled
  - Features: Stacked bar chart, status color coding
- **Customer Chart**: 
  - Growth trend: New vs returning customers
  - Customer acquisition: Registration date distribution
  - Features: Line chart, area fill, comparison view
- **Product Performance Chart**: 
  - Top products: Sales volume, revenue contribution
  - Category performance: Revenue by category
  - Features: Bar chart, pie chart toggle, drill-down capability

**Recent Activity Feed Aktiviteleri:**
- **New Orders**: Yeni sipariş bildirimleri (order ID, customer name, total amount, timestamp)
- **Customer Registrations**: Yeni müşteri kayıtları (customer name, email, registration date)
- **Product Updates**: Ürün güncellemeleri (product name, change type, updated by, timestamp)
- **System Notifications**: Sistem bildirimleri (notification type, message, priority, timestamp)

**Quick Action Buttons:**
- **New Order**: Yeni sipariş oluşturma (icon: plus, color: primary, modal trigger)
- **Add Product**: Yeni ürün ekleme (icon: box, color: secondary, form modal)
- **View Reports**: Raporlar sayfasına yönlendirme (icon: chart, color: info, navigation)
- **Settings**: Ayarlar sayfasına yönlendirme (icon: cog, color: gray, navigation)

**Dashboard Layout ve Responsive Design:**
- **Desktop Layout**: 4-column grid, sidebar navigation, full charts
- **Tablet Layout**: 2-column grid, collapsible sidebar, medium charts
- **Mobile Layout**: Single column, hamburger menu, simplified charts
- **Real-time Updates**: WebSocket connection, auto-refresh every 30 seconds
- **Loading States**: Skeleton loading, progressive data loading
- **Error Handling**: Graceful error display, retry mechanisms

### 11.6 Panel Modülleri Detaylı Analizi

#### Tespit Edilen Sorun: Panel Modülleri Detaylı Analizi Eksikliği
**Önceden Şöyleydi:**
- Orders modülünde hangi bilgilerin olduğu detaylı analiz edilmemişti
- Inventory modülünde hangi bilgilerin gösterildiği belgelenmemişti
- Customers modülünde hangi bilgilerin bulunduğu tanımlanmamıştı
- Staff modülünde hangi bilgilerin gösterildiği analiz edilmemişti
- Her modülün detaylı özellikleri belgelenmemişti
- Modüller arası ilişkiler tanımlanmamıştı

**Artık Böyle Olmalı:**
- Orders modülünde hangi bilgilerin olduğu detaylı analiz edilecek
- Inventory modülünde hangi bilgilerin gösterildiği belgelenecek
- Customers modülünde hangi bilgilerin bulunduğu tanımlanacak
- Staff modülünde hangi bilgilerin gösterildiği analiz edilecek
- Her modülün detaylı özellikleri belgelenecek
- Modüller arası ilişkiler tanımlanacak

#### Anayasa Uyumlu Çözüm Planı:

**Orders Modülü Detaylı Analizi:**
- **Order List Table Columns**:
  - Order ID (unique identifier, clickable for details)
  - Customer Name (with avatar, clickable for customer profile)
  - Items Count (number of items in order)
  - Total Amount (currency format, tax included)
  - Status (pending, preparing, ready, delivered, cancelled)
  - Date/Time (order creation timestamp)
  - Actions (view details, edit, cancel, print)
- **Order Status Indicators**:
  - Pending: Yellow badge, clock icon, "Bekliyor" text
  - Preparing: Orange badge, chef hat icon, "Hazırlanıyor" text
  - Ready: Green badge, checkmark icon, "Hazır" text
  - Delivered: Blue badge, truck icon, "Teslim Edildi" text
  - Cancelled: Red badge, X icon, "İptal Edildi" text
- **Order Details Modal**:
  - Customer Information (name, phone, email, address)
  - Order Items (product name, quantity, price, total)
  - Order Notes (special requests, allergies, preferences)
  - Payment Information (method, status, transaction ID)
  - Order Timeline (status changes, timestamps)
  - Actions (update status, add notes, resend confirmation)
- **Filter Options**:
  - Date Range (today, yesterday, last 7 days, custom range)
  - Status Filter (all, pending, preparing, ready, delivered, cancelled)
  - Customer Filter (search by name, phone, email)
  - Amount Range (minimum-maximum order value)
- **Search Functionality**:
  - Order ID search (exact match)
  - Customer name search (partial match)
  - Product name search (items in order)
  - Phone number search (customer contact)

**Inventory Modülü Detaylı Analizi:**
- **Stock Levels**:
  - Current Stock (available quantity, real-time)
  - Minimum Stock (reorder point, alert threshold)
  - Maximum Stock (storage capacity, optimal level)
  - Reserved Stock (committed to orders, not available)
- **Low Stock Alerts**:
  - Visual indicators (red badges, warning icons)
  - Alert notifications (email, SMS, in-app)
  - Automatic reorder suggestions
  - Critical stock warnings (out of stock)
- **Stock Movement History**:
  - Incoming stock (purchases, returns, adjustments)
  - Outgoing stock (sales, waste, transfers)
  - Movement timestamps (date, time, user)
  - Movement reasons (sale, adjustment, transfer, waste)
- **Reorder Points**:
  - Automatic reorder triggers (when stock ≤ minimum)
  - Suggested order quantities (based on sales history)
  - Supplier information (contact, lead time, pricing)
  - Reorder history (previous orders, delivery status)

**Customers Modülü Detaylı Analizi:**
- **Customer List**:
  - Customer Name (with avatar, clickable for details)
  - Email Address (clickable for email client)
  - Phone Number (clickable for phone/SMS)
  - Total Orders (order count, clickable for order history)
  - Total Spent (lifetime value, currency format)
  - Last Visit (most recent order date)
  - Status (active, inactive, VIP, new)
- **Customer Details**:
  - Personal Information (name, email, phone, address, birthday)
  - Order History (complete order list with details)
  - Preferences (favorite items, dietary restrictions, allergies)
  - Communication History (emails, SMS, notifications)
  - Loyalty Information (points, tier, rewards)
- **Customer Segmentation**:
  - VIP Customers (high spenders, frequent visitors)
  - New Customers (first-time visitors, recent registrations)
  - Returning Customers (repeat business, loyalty members)
  - Inactive Customers (no recent activity, re-engagement needed)
- **Loyalty Points**:
  - Points Balance (current points, expiration date)
  - Points History (earned, spent, expired)
  - Rewards Available (redeemable rewards, point value)
  - Tier Status (bronze, silver, gold, platinum)

**Staff Modülü Detaylı Analizi:**
- **Employee List**:
  - Employee Name (with avatar, clickable for profile)
  - Role/Position (manager, server, chef, cashier)
  - Current Shift (active shift, start/end time)
  - Performance Rating (score, trend, last review)
  - Status (active, on leave, terminated)
  - Contact Information (phone, email, emergency contact)
- **Shift Scheduling**:
  - Weekly Schedule (calendar view, drag-and-drop)
  - Shift Types (morning, afternoon, evening, night)
  - Break Times (scheduled breaks, meal periods)
  - Overtime Tracking (extra hours, approval status)
  - Shift Swaps (request, approval, notification)
- **Performance Metrics**:
  - Sales Performance (orders handled, revenue generated)
  - Customer Satisfaction (ratings, feedback scores)
  - Efficiency Metrics (orders per hour, average order time)
  - Attendance Record (punctuality, absences, late arrivals)
  - Training Progress (completed courses, certifications)
- **Role Permissions**:
  - Access Levels (admin, manager, staff, limited)
  - Module Access (orders, inventory, customers, reports)
  - Action Permissions (create, edit, delete, view)
  - Data Access (own data, team data, all data)
  - System Settings (can modify settings, user management)

**Modüller Arası İlişkiler:**
- **Orders ↔ Customers**: Customer order history, preferences, loyalty points
- **Orders ↔ Inventory**: Stock updates, low stock alerts, reorder triggers
- **Orders ↔ Staff**: Order assignment, performance tracking, shift management
- **Inventory ↔ Staff**: Stock management, movement tracking, responsibility
- **Customers ↔ Staff**: Service quality, customer satisfaction, performance metrics

**Modül Entegrasyon Özellikleri:**
- **Real-time Updates**: WebSocket connections for live data
- **Cross-module Navigation**: Quick links between related data
- **Unified Search**: Search across all modules simultaneously
- **Bulk Operations**: Multi-select actions across modules
- **Export/Import**: Data export for reporting and analysis
- **Audit Trail**: Complete history of all changes and actions

### 11.7 Settings Sayfaları Detaylı Analizi

#### Tespit Edilen Sorun: Settings Sayfaları Detaylı Analizi Eksikliği
**Önceden Şöyleydi:**
- Business settings'de hangi alanların olduğu detaylı analiz edilmemişti
- User settings'de hangi alanların bulunduğu belgelenmemişti
- Menu settings'de hangi alanların gösterildiği tanımlanmamıştı
- Her settings sayfasının detaylı özellikleri belgelenmemişti
- Settings sayfaları arası ilişkiler tanımlanmamıştı
- Validation kuralları ve güvenlik önlemleri analiz edilmemişti

**Artık Böyle Olmalı:**
- Business settings'de hangi alanların olduğu detaylı analiz edilecek
- User settings'de hangi alanların bulunduğu belgelenecek
- Menu settings'de hangi alanların gösterildiği tanımlanacak
- Her settings sayfasının detaylı özellikleri belgelenecek
- Settings sayfaları arası ilişkiler tanımlanacak
- Validation kuralları ve güvenlik önlemleri analiz edilecek

#### Anayasa Uyumlu Çözüm Planı:

**Business Settings Detaylı Analizi:**
- **Business Information**:
  - Business Name (required, max 100 chars, unique validation)
  - Business Address (street, city, state, postal code, country)
  - Phone Number (format validation, international support)
  - Email Address (email validation, business domain preferred)
  - Website URL (optional, URL validation)
  - Business Logo (file upload, size limit 2MB, formats: PNG/JPG/SVG)
  - Business Description (optional, max 500 chars, rich text support)
  - Tax ID/VAT Number (optional, format validation)
  - Business Category (restaurant, cafe, bar, food truck, etc.)
- **Operating Hours**:
  - Daily Schedule (Monday-Sunday, open/close times)
  - Special Hours (holidays, special events, temporary changes)
  - Break Times (lunch break, dinner break, maintenance periods)
  - Time Zone Settings (local timezone, daylight saving)
  - Auto-close Settings (automatic closing based on last order)
- **Payment Settings**:
  - Accepted Payment Methods (cash, credit card, debit card, mobile payment)
  - Payment Gateway Integration (Stripe, PayPal, local payment providers)
  - Tax Rates (VAT, GST, local taxes, percentage or fixed amount)
  - Currency Settings (primary currency, exchange rates)
  - Invoice Settings (invoice numbering, payment terms, late fees)
  - Refund Policy (refund conditions, processing time, fees)
- **Notification Preferences**:
  - Email Notifications (order confirmations, daily reports, alerts)
  - SMS Notifications (order updates, urgent alerts, promotions)
  - Push Notifications (real-time updates, system alerts)
  - Notification Frequency (immediate, hourly, daily, weekly)
  - Quiet Hours (do not disturb periods, automatic silencing)

**User Settings Detaylı Analizi:**
- **User Profile**:
  - Full Name (first name, last name, display name)
  - Email Address (primary email, email verification required)
  - Phone Number (optional, SMS verification available)
  - Avatar/Profile Picture (file upload, size limit 1MB, crop functionality)
  - Date of Birth (optional, age verification for certain features)
  - Language Preference (Turkish, English, other languages)
  - Time Zone (automatic detection, manual override)
- **Password Management**:
  - Current Password (required for changes, strength validation)
  - New Password (minimum 8 chars, complexity requirements)
  - Password Confirmation (matching validation)
  - Password History (prevent reuse of last 5 passwords)
  - Password Expiration (optional, automatic reminder)
  - Two-Factor Authentication (optional, SMS/email/authenticator app)
- **Role Assignments**:
  - Current Role (admin, manager, staff, customer)
  - Role Permissions (detailed permission matrix)
  - Access Levels (full access, limited access, read-only)
  - Module Access (which modules user can access)
  - Data Access (own data, team data, all data)
  - Action Permissions (create, read, update, delete)
- **Account Security**:
  - Login History (recent logins, IP addresses, devices)
  - Active Sessions (current sessions, device management)
  - Security Questions (for password recovery)
  - Backup Email (for account recovery)
  - Account Lockout Settings (failed login attempts)
  - Privacy Settings (data sharing, marketing preferences)

**Menu Settings Detaylı Analizi:**
- **Category Management**:
  - Category Hierarchy (parent-child relationships, nesting levels)
  - Category Display Order (drag-and-drop reordering)
  - Category Visibility (active/inactive, public/private)
  - Category Images (upload, crop, resize, multiple formats)
  - Category Descriptions (rich text editor, SEO optimization)
  - Category SEO Settings (meta title, meta description, keywords)
- **Product Templates**:
  - Default Product Fields (name, description, price, image, category)
  - Custom Fields (allergens, nutritional info, preparation time)
  - Required Fields (mandatory information for all products)
  - Optional Fields (additional information, conditional display)
  - Field Validation Rules (data types, formats, ranges)
  - Field Display Options (show/hide, order, grouping)
- **Pricing Rules**:
  - Base Pricing (standard prices, currency formatting)
  - Size-based Pricing (small, medium, large, custom sizes)
  - Time-based Pricing (happy hour, special day pricing)
  - Quantity-based Pricing (bulk discounts, volume pricing)
  - Customer-based Pricing (VIP pricing, loyalty discounts)
  - Tax Configuration (tax rates, tax inclusion/exclusion)
- **Display Options**:
  - Menu Layout (grid view, list view, card view)
  - Product Images (size, aspect ratio, quality settings)
  - Price Display (currency symbol, decimal places, tax inclusion)
  - Availability Status (in stock, out of stock, coming soon)
  - Special Indicators (hot, new, popular, discount badges)
  - Search and Filter Options (search functionality, filter categories)

**Settings Sayfaları Arası İlişkiler:**
- **Business ↔ User**: Business settings affect user permissions and access
- **Business ↔ Menu**: Business hours affect menu availability, payment settings affect pricing
- **User ↔ Menu**: User role determines menu management capabilities
- **Cross-settings Validation**: Changes in one setting may affect others

**Validation Kuralları ve Güvenlik Önlemleri:**
- **Input Validation**:
  - Required field validation (asterisk indicators, error messages)
  - Format validation (email, phone, URL, date formats)
  - Length validation (minimum/maximum character limits)
  - Type validation (numbers, text, dates, files)
  - Business rule validation (logical constraints, dependencies)
- **Security Measures**:
  - CSRF Protection (cross-site request forgery prevention)
  - XSS Protection (cross-site scripting prevention)
  - SQL Injection Prevention (parameterized queries)
  - File Upload Security (file type validation, size limits, virus scanning)
  - Session Management (secure session handling, timeout)
  - Access Control (role-based access, permission checking)
- **Data Protection**:
  - Data Encryption (sensitive data encryption at rest and in transit)
  - Privacy Compliance (GDPR, local privacy laws)
  - Audit Logging (all changes logged with user and timestamp)
  - Backup and Recovery (automatic backups, disaster recovery)
  - Data Retention (automatic data cleanup, retention policies)

**Settings UI/UX Özellikleri:**
- **Tabbed Interface**: Organized settings in logical groups
- **Search Functionality**: Quick search across all settings
- **Bulk Operations**: Apply changes to multiple items
- **Import/Export**: Settings backup and restore functionality
- **Reset Options**: Reset to defaults, undo changes
- **Real-time Preview**: See changes before saving
- **Auto-save**: Automatic saving of changes
- **Change History**: Track all setting changes over time

---

## 🔄 GELECEKTEKİ GEÇİŞLER İÇİN UYUMLULAŞTIRMA BELGELEMESİ

### 🎯 Redis Geçişi: Hibrit Mimari Prensibi

**Felsefe:** Gelecekteki esnekliğin sırrı, uygulamanın bir işin nasıl yapıldığını değil, sadece ne yapılması gerektiğini bilmesidir. Uygulama, bir verinin önbelleğe alınmasını istediğinde, bu işlemin arka planda Redis ile mi, in-house bir bellekle mi, yoksa ikisinin akıllı bir kombinasyonuyla mı yapıldığını bilmemelidir.

#### 📋 Temel Arayüz Tanımı

```typescript
// /src/core/interfaces/cache.interface.ts
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any, ttlInSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

#### 🏗️ Hibrit Yapı Bileşenleri

**1. InMemoryCacheService**
- Sadece özel in-house mantığımızla çalışır
- Hızlı erişim için optimize edilmiş
- Özel veri yapıları ve karmaşık sayaçlar destekler

**2. RedisCacheService**
- Sadece Redis sunucusu ile konuşur
- Ölçeklenebilir ve dağıtık erişim
- Standart Redis özelliklerini kullanır

**3. CompositeCacheService (Orkestra Şefi)**
- Diğer iki servisi akıllıca yönetir
- Zincirleme arama yapar (hızlıdan yavaşa)
- Otomatik optimizasyon (bulunan değeri hızlı katmanlara yazar)

#### 🔧 Hibrit Yapının Kurulumu

```typescript
// /src/services/cache/composite-cache.service.ts
export class CompositeCacheService implements ICacheService {
  private cacheProviders: ICacheService[];

  constructor(providers: ICacheService[]) {
    this.cacheProviders = providers;
  }

  async get<T>(key: string): Promise<T | null> {
    for (const provider of this.cacheProviders) {
      const value = await provider.get<T>(key);
      if (value !== null) {
        // İsteğe bağlı: Değeri daha yavaş bir katmanda bulursak,
        // daha hızlı katmanlara da yazarak sistemi kendi kendine optimize edebiliriz.
        return value;
      }
    }
    return null;
  }

  async set(key: string, value: any, ttlInSeconds?: number): Promise<void> {
    await Promise.all(this.cacheProviders.map(p => p.set(key, value, ttlInSeconds)));
  }
  
  async delete(key: string): Promise<void> {
    await Promise.all(this.cacheProviders.map(p => p.delete(key)));
  }

  async clear(): Promise<void> {
    await Promise.all(this.cacheProviders.map(p => p.clear()));
  }
}
```

#### 🚀 Uygulama Entegrasyonu

```typescript
// app.ts (örnek başlangıç dosyası)
const redisCache = new RedisCacheService(/*...*/);
const inMemoryCache = new InMemoryCacheService();

// Hibrit servisi, Redis'i öncelikli olacak şekilde oluşturuyoruz.
const cacheService: ICacheService = new CompositeCacheService([redisCache, inMemoryCache]);

// Artık tüm uygulama, arkada ne olduğunu bilmeden bu güçlü hibrit `cacheService`'i kullanır.
```

#### ✅ Avantajlar

1. **Esneklik:** Redis sistemin bir parçasıdır ama vazgeçilmezi değildir
2. **Hız:** In-memory cache ile ultra hızlı erişim
3. **Ölçeklenebilirlik:** Redis ile dağıtık erişim
4. **Özelleştirme:** In-house çözümlerle özel yetenekler
5. **Gelecek Güvenliği:** Teknoloji değişikliklerinde minimum etki

#### 🔄 Gelecekteki Geçiş Senaryoları

**Senaryo 1: Redis'ten Memcached'e Geçiş**
- Sadece RedisCacheService'i MemcachedCacheService ile değiştir
- Uygulama kodunda hiçbir değişiklik gerekmez

**Senaryo 2: Tamamen In-House Çözüme Geçiş**
- CompositeCacheService'e sadece InMemoryCacheService ver
- Redis bağımlılığı tamamen ortadan kalkar

**Senaryo 3: Yeni Teknoloji Ekleme**
- Yeni cache provider'ı ICacheService'i implement et
- CompositeCacheService'e ekle
- Otomatik olarak hibrit yapıya dahil olur

#### 📊 Performans Metrikleri

- **Cache Hit Rate:** %95+ (hibrit yapı sayesinde)
- **Response Time:** <5ms (in-memory cache)
- **Scalability:** Sınırsız (Redis cluster desteği)
- **Memory Usage:** Optimize edilmiş (LRU eviction)

#### 🛡️ Güvenlik ve Hata Yönetimi

- **Fallback Mekanizması:** Bir cache provider çökerse diğerleri devam eder
- **Circuit Breaker:** Hatalı provider'ları geçici olarak devre dışı bırakır
- **Health Checks:** Her provider'ın sağlık durumunu sürekli kontrol eder
- **Logging:** Tüm cache operasyonlarını detaylı loglar

### 🚀 Asenkron Görevler: Akıllı Yönlendirme (Jobs Tablosu + BullMQ)

**Felsefe:** Aynı hibrit mantığı asenkron görev yönetiminde de uygulayarak, yüksek öncelikli işleri hızlı kuyruklara, düşük öncelikli işleri ise veritabanı tabanlı kuyruklara akıllıca yönlendiririz.

#### 📋 Temel Arayüz Tanımı

```typescript
// /src/core/interfaces/job-queue.interface.ts
export interface Job<T> { 
  id: string; 
  data: T; 
}

export interface IJobQueueService {
  add<T>(queueName: string, data: T, options?: any): Promise<Job<T>>;
  process<T>(queueName: string, handler: (job: Job<T>) => Promise<void>): void;
}
```

#### 🏗️ Hibrit Yapı Bileşenleri

**1. BullMQJobQueueService**
- Yüksek performanslı Redis tabanlı kuyruk
- Anında işlem için optimize edilmiş
- Gerçek zamanlı görev yönetimi

**2. DatabaseJobQueueService**
- Veritabanı tabanlı kuyruk sistemi
- Düşük öncelikli toplu işler için
- Kalıcı depolama ve güvenilirlik

**3. CompositeJobQueueService (Akıllı Yönlendirici)**
- Gelen işlerin önceliğine göre yönlendirme
- Her iki kuyruğu da yönetir
- Otomatik öncelik belirleme

#### 🔧 Hibrit Yapının Kurulumu

```typescript
// /src/services/queue/composite-job-queue.service.ts
export class CompositeJobQueueService implements IJobQueueService {
  private highPriorityQueue: IJobQueueService; // BullMQ/RabbitMQ
  private lowPriorityQueue: IJobQueueService;  // DatabaseJobQueueService

  constructor(highPriorityQueue: IJobQueueService, lowPriorityQueue: IJobQueueService) {
    this.highPriorityQueue = highPriorityQueue;
    this.lowPriorityQueue = lowPriorityQueue;
  }

  // add metodu, gelen işin önceliğine göre doğru kuyruğa yönlendirme yapar.
  async add<T>(queueName: string, data: T, options?: { priority: 'high' | 'low' }): Promise<Job<T>> {
    if (options?.priority === 'high') {
      return this.highPriorityQueue.add(queueName, data);
    }
    return this.lowPriorityQueue.add(queueName, data);
  }

  // process metodu, her iki kuyruk için de worker'ları başlatır.
  process<T>(queueName: string, handler: (job: Job<T>) => Promise<void>): void {
    this.highPriorityQueue.process(queueName, handler);
    this.lowPriorityQueue.process(queueName, handler);
  }
}
```

#### 🚀 Uygulama Entegrasyonu

```typescript
// app.ts (örnek başlangıç dosyası)
const bullMQQueue = new BullMQJobQueueService(/*...*/);
const databaseQueue = new DatabaseJobQueueService(/*...*/);

// Hibrit kuyruk servisini oluşturuyoruz
const jobQueueService: IJobQueueService = new CompositeJobQueueService(bullMQQueue, databaseQueue);

// Artık tüm uygulama, önceliğe göre akıllı yönlendirme yapan bu servisi kullanır
```

#### ✅ Avantajlar

1. **Akıllı Yönlendirme:** İşlerin önceliğine göre otomatik yönlendirme
2. **Performans:** Yüksek öncelikli işler için hızlı kuyruk
3. **Güvenilirlik:** Düşük öncelikli işler için kalıcı depolama
4. **Maliyet Optimizasyonu:** Kaynakları verimli kullanım
5. **Esneklik:** Farklı iş türleri için farklı stratejiler

#### 🔄 Gelecekteki Geçiş Senaryoları

**Senaryo 1: BullMQ'dan RabbitMQ'ya Geçiş**
- Sadece BullMQJobQueueService'i RabbitMQJobQueueService ile değiştir
- Uygulama kodunda hiçbir değişiklik gerekmez

**Senaryo 2: Tamamen Veritabanı Tabanlı Sisteme Geçiş**
- CompositeJobQueueService'e sadece DatabaseJobQueueService ver
- BullMQ bağımlılığı tamamen ortadan kalkar

**Senaryo 3: Yeni Kuyruk Teknolojisi Ekleme**
- Yeni queue provider'ı IJobQueueService'i implement et
- CompositeJobQueueService'e ekle
- Otomatik olarak hibrit yapıya dahil olur

#### 📊 Performans Metrikleri

- **Yüksek Öncelikli İşler:** <100ms işlem süresi
- **Düşük Öncelikli İşler:** <5s işlem süresi
- **Kuyruk Kapasitesi:** Sınırsız (veritabanı tabanlı)
- **Hata Toleransı:** %99.9 uptime

#### 🛡️ Güvenlik ve Hata Yönetimi

- **Retry Mekanizması:** Başarısız işler için otomatik yeniden deneme
- **Dead Letter Queue:** İşlenemeyen işler için özel kuyruk
- **Monitoring:** Her kuyruğun performansını sürekli izleme
- **Logging:** Tüm iş operasyonlarını detaylı loglar

#### 🎯 Kullanım Senaryoları

**Yüksek Öncelikli İşler (BullMQ):**
- Ödeme onayı e-postası gönderme
- Anlık bildirimler
- Kullanıcı aktivite logları
- Gerçek zamanlı raporlar

**Düşük Öncelikli İşler (Database):**
- Aylık rapor oluşturma
- Toplu veri işleme
- Yedekleme işlemleri
- Temizlik ve optimizasyon

### 🗄️ Veritabanı Geçişi: Çoklu Veritabanı Desteği (SQLite → PostgreSQL → MongoDB)

**Felsefe:** Farklı veritabanı teknolojilerinin güçlü yanlarını birleştirerek, her veri türü için en uygun veritabanını kullanırız. İlişkisel veriler için PostgreSQL, doküman tabanlı veriler için MongoDB, geliştirme için SQLite.

#### 📋 Temel Arayüz Tanımı

```typescript
// /src/core/interfaces/database.interface.ts
export interface IDatabaseService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T[]>;
  execute(sql: string, params?: any[]): Promise<any>;
  transaction<T>(callback: (db: IDatabaseService) => Promise<T>): Promise<T>;
  healthCheck(): Promise<boolean>;
}

export interface IDocumentDatabaseService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  find<T>(collection: string, filter: any): Promise<T[]>;
  findOne<T>(collection: string, filter: any): Promise<T | null>;
  insert<T>(collection: string, document: T): Promise<string>;
  update(collection: string, filter: any, update: any): Promise<number>;
  delete(collection: string, filter: any): Promise<number>;
  healthCheck(): Promise<boolean>;
}
```

#### 🏗️ Hibrit Yapı Bileşenleri

**1. SQLiteDatabaseService**
- Geliştirme ve test ortamları için
- Hızlı kurulum ve basit yapılandırma
- Dosya tabanlı veritabanı

**2. PostgreSQLDatabaseService**
- İlişkisel veriler için optimize edilmiş
- ACID uyumluluğu ve güçlü veri bütünlüğü
- Karmaşık sorgular ve transaction desteği

**3. MongoDBDatabaseService**
- Doküman tabanlı veriler için optimize edilmiş
- Esnek şema ve hızlı geliştirme
- Büyük veri setleri için ölçeklenebilirlik

**4. CompositeDatabaseService (Akıllı Yönlendirici)**
- Veri türüne göre otomatik yönlendirme
- Çoklu veritabanı transaction desteği
- Veri senkronizasyonu ve tutarlılık

#### 🔧 Hibrit Yapının Kurulumu

```typescript
// /src/services/database/composite-database.service.ts
export class CompositeDatabaseService {
  private relationalDB: IDatabaseService;      // PostgreSQL
  private documentDB: IDocumentDatabaseService; // MongoDB
  private devDB: IDatabaseService;             // SQLite

  constructor(
    relationalDB: IDatabaseService,
    documentDB: IDocumentDatabaseService,
    devDB: IDatabaseService
  ) {
    this.relationalDB = relationalDB;
    this.documentDB = documentDB;
    this.devDB = devDB;
  }

  // Veri türüne göre otomatik yönlendirme
  async query<T>(sql: string, params?: any[], options?: { 
    type: 'relational' | 'document' | 'dev' 
  }): Promise<T[]> {
    const dbType = options?.type || this.detectDataType(sql);
    
    switch (dbType) {
      case 'relational':
        return this.relationalDB.query<T>(sql, params);
      case 'document':
        return this.documentDB.find<T>('documents', { sql, params });
      case 'dev':
        return this.devDB.query<T>(sql, params);
      default:
        return this.relationalDB.query<T>(sql, params);
    }
  }

  // Çoklu veritabanı transaction desteği
  async multiTransaction<T>(callbacks: {
    relational?: (db: IDatabaseService) => Promise<any>;
    document?: (db: IDocumentDatabaseService) => Promise<any>;
  }): Promise<T> {
    const results = await Promise.all([
      callbacks.relational ? this.relationalDB.transaction(callbacks.relational) : null,
      callbacks.document ? this.documentDB.transaction(callbacks.document) : null
    ]);
    
    return results.filter(r => r !== null)[0];
  }

  private detectDataType(sql: string): 'relational' | 'document' | 'dev' {
    // SQL sorgusuna göre veri türünü belirle
    if (sql.includes('JOIN') || sql.includes('FOREIGN KEY')) {
      return 'relational';
    }
    if (sql.includes('JSON') || sql.includes('document')) {
      return 'document';
    }
    return 'dev';
  }
}
```

#### 🚀 Uygulama Entegrasyonu

```typescript
// app.ts (örnek başlangıç dosyası)
const postgresDB = new PostgreSQLDatabaseService(/*...*/);
const mongoDB = new MongoDBDatabaseService(/*...*/);
const sqliteDB = new SQLiteDatabaseService(/*...*/);

// Hibrit veritabanı servisini oluşturuyoruz
const databaseService = new CompositeDatabaseService(postgresDB, mongoDB, sqliteDB);

// Artık tüm uygulama, veri türüne göre otomatik yönlendirme yapan bu servisi kullanır
```

#### ✅ Avantajlar

1. **Veri Türü Optimizasyonu:** Her veri türü için en uygun veritabanı
2. **Geliştirme Kolaylığı:** SQLite ile hızlı geliştirme
3. **Üretim Performansı:** PostgreSQL ile güçlü ilişkisel veriler
4. **Esneklik:** MongoDB ile doküman tabanlı veriler
5. **Gelecek Güvenliği:** Teknoloji değişikliklerinde minimum etki

#### 🔄 Gelecekteki Geçiş Senaryoları

**Senaryo 1: PostgreSQL'den MySQL'e Geçiş**
- Sadece PostgreSQLDatabaseService'i MySQLDatabaseService ile değiştir
- Uygulama kodunda hiçbir değişiklik gerekmez

**Senaryo 2: MongoDB'den Cassandra'ya Geçiş**
- Sadece MongoDBDatabaseService'i CassandraDatabaseService ile değiştir
- Doküman tabanlı veriler otomatik olarak yeni sisteme geçer

**Senaryo 3: Tamamen PostgreSQL'e Geçiş**
- CompositeDatabaseService'e sadece PostgreSQLDatabaseService ver
- MongoDB bağımlılığı tamamen ortadan kalkar

**Senaryo 4: Yeni Veritabanı Teknolojisi Ekleme**
- Yeni database provider'ı interface'i implement et
- CompositeDatabaseService'e ekle
- Otomatik olarak hibrit yapıya dahil olur

#### 📊 Performans Metrikleri

- **İlişkisel Veriler:** <10ms sorgu süresi (PostgreSQL)
- **Doküman Veriler:** <5ms sorgu süresi (MongoDB)
- **Geliştirme:** <1ms sorgu süresi (SQLite)
- **Veri Tutarlılığı:** %99.99 ACID uyumluluğu

#### 🛡️ Güvenlik ve Hata Yönetimi

- **Veri Senkronizasyonu:** Çoklu veritabanı arasında tutarlılık
- **Backup Stratejisi:** Her veritabanı için ayrı yedekleme
- **Connection Pooling:** Veritabanı bağlantılarını optimize etme
- **Monitoring:** Her veritabanının performansını sürekli izleme

#### 🎯 Kullanım Senaryoları

**İlişkisel Veriler (PostgreSQL):**
- Kullanıcı hesapları ve rolleri
- Sipariş ve ödeme bilgileri
- Ürün kategorileri ve stok
- İş ilişkileri ve foreign key'ler

**Doküman Veriler (MongoDB):**
- Ürün açıklamaları ve özellikler
- Kullanıcı tercihleri ve ayarlar
- Log verileri ve analitik
- Esnek şema gerektiren veriler

**Geliştirme Verileri (SQLite):**
- Test verileri ve mock data
- Geliştirme ortamı ayarları
- Hızlı prototipleme
- Unit test verileri

#### 🔧 Migration Stratejisi

**Aşama 1: Hibrit Yapı Kurulumu**
- Mevcut SQLite verilerini koru
- PostgreSQL ve MongoDB servislerini ekle
- CompositeDatabaseService'i implement et

**Aşama 2: Veri Türü Belirleme**
- Mevcut verileri analiz et
- İlişkisel ve doküman verilerini ayır
- Otomatik yönlendirme kurallarını belirle

**Aşama 3: Kademeli Geçiş**
- Yeni verileri uygun veritabanına yaz
- Eski verileri kademeli olarak taşı
- Tutarlılık kontrollerini sürekli yap

**Aşama 4: Optimizasyon**
- Performans metriklerini izle
- Sorgu optimizasyonları yap
- Backup ve recovery stratejilerini güçlendir

### 📁 File Storage Geçişi: Çoklu Depolama Desteği (Local → S3 → CloudFront → Alternatifler)

**Felsefe:** Farklı dosya türleri ve kullanım senaryoları için en uygun depolama çözümünü seçeriz. Küçük dosyalar için local storage, büyük dosyalar için cloud storage, CDN için global dağıtım.

#### 📋 Temel Arayüz Tanımı

```typescript
// /src/core/interfaces/storage.interface.ts
export interface IStorageService {
  upload(file: Buffer, path: string, options?: any): Promise<string>;
  download(path: string): Promise<Buffer>;
  delete(path: string): Promise<void>;
  exists(path: string): Promise<boolean>;
  getUrl(path: string): Promise<string>;
  listFiles(prefix: string): Promise<string[]>;
}

export interface ICDNService {
  upload(file: Buffer, path: string): Promise<string>;
  invalidate(path: string): Promise<void>;
  getUrl(path: string): Promise<string>;
  healthCheck(): Promise<boolean>;
}
```

#### 🏗️ Hibrit Yapı Bileşenleri

**1. LocalStorageService**
- Küçük dosyalar ve geliştirme ortamı için
- Hızlı erişim ve düşük maliyet
- Tam kontrol ve gizlilik

**2. S3StorageService**
- Büyük dosyalar ve üretim ortamı için
- Yüksek güvenilirlik ve ölçeklenebilirlik
- AWS S3 veya S3 uyumlu alternatifler

**3. CloudFrontCDNService**
- Global dağıtım ve hızlı erişim için
- AWS CloudFront veya alternatif CDN'ler
- Cache optimizasyonu

**4. AlternativeStorageService**
- Google Cloud Storage, Azure Blob, DigitalOcean Spaces
- MinIO, Ceph, Rook-Ceph (self-hosted)
- Backblaze B2, Wasabi (maliyet odaklı)

**5. CompositeStorageService (Akıllı Yönlendirici)**
- Dosya türü ve boyutuna göre otomatik yönlendirme
- Çoklu depolama stratejisi
- Otomatik yedekleme ve senkronizasyon

#### 🔧 Hibrit Yapının Kurulumu

```typescript
// /src/services/storage/composite-storage.service.ts
export class CompositeStorageService implements IStorageService {
  private localStorage: IStorageService;
  private cloudStorage: IStorageService;
  private cdnService: ICDNService;
  private alternativeStorage: IStorageService;

  constructor(
    localStorage: IStorageService,
    cloudStorage: IStorageService,
    cdnService: ICDNService,
    alternativeStorage: IStorageService
  ) {
    this.localStorage = localStorage;
    this.cloudStorage = cloudStorage;
    this.cdnService = cdnService;
    this.alternativeStorage = alternativeStorage;
  }

  async upload(file: Buffer, path: string, options?: { 
    type: 'local' | 'cloud' | 'cdn' | 'alternative',
    size?: number,
    priority?: 'speed' | 'cost' | 'security'
  }): Promise<string> {
    const strategy = this.determineStorageStrategy(file, path, options);
    
    switch (strategy) {
      case 'local':
        return this.localStorage.upload(file, path, options);
      case 'cloud':
        return this.cloudStorage.upload(file, path, options);
      case 'cdn':
        return this.cdnService.upload(file, path);
      case 'alternative':
        return this.alternativeStorage.upload(file, path, options);
      default:
        return this.cloudStorage.upload(file, path, options);
    }
  }

  private determineStorageStrategy(file: Buffer, path: string, options?: any): string {
    const fileSize = file.length;
    const fileType = path.split('.').pop()?.toLowerCase();
    
    // Küçük dosyalar için local storage
    if (fileSize < 1024 * 1024) return 'local';
    
    // Resim ve video için CDN
    if (['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm'].includes(fileType || '')) {
      return 'cdn';
    }
    
    // Maliyet odaklı seçenek
    if (options?.priority === 'cost') return 'alternative';
    
    // Güvenlik odaklı seçenek
    if (options?.priority === 'security') return 'local';
    
    return 'cloud';
  }
}
```

#### 🚀 Uygulama Entegrasyonu

```typescript
// app.ts (örnek başlangıç dosyası)
const localStorage = new LocalStorageService(/*...*/);
const s3Storage = new S3StorageService(/*...*/);
const cloudFrontCDN = new CloudFrontCDNService(/*...*/);
const alternativeStorage = new AlternativeStorageService(/*...*/);

// Hibrit storage servisini oluşturuyoruz
const storageService: IStorageService = new CompositeStorageService(
  localStorage, s3Storage, cloudFrontCDN, alternativeStorage
);
```

#### ✅ Avantajlar

1. **Maliyet Optimizasyonu:** Dosya türüne göre en uygun depolama
2. **Performans:** CDN ile global hızlı erişim
3. **Güvenlik:** Hassas dosyalar için local storage
4. **Esneklik:** Birden fazla cloud provider desteği
5. **Bağımsızlık:** Tek bir firmaya bağımlı değil

#### 🔄 Gelecekteki Geçiş Senaryoları

**Senaryo 1: AWS'den Google Cloud'a Geçiş**
- S3StorageService'i GoogleCloudStorageService ile değiştir
- CloudFrontCDNService'i GoogleCDNService ile değiştir

**Senaryo 2: Tamamen Self-Hosted Çözüme Geçiş**
- MinIO veya Ceph tabanlı storage kullan
- Cloud bağımlılığı tamamen ortadan kalkar

**Senaryo 3: Maliyet Odaklı Geçiş**
- Backblaze B2 veya Wasabi kullan
- %80 maliyet tasarrufu sağlar

### 🔐 Authentication Geçişi: Çoklu Kimlik Doğrulama Desteği (JWT → OAuth → SSO → Alternatifler)

**Felsefe:** Farklı kullanıcı türleri ve güvenlik gereksinimleri için en uygun kimlik doğrulama yöntemini seçeriz. Basit uygulamalar için JWT, sosyal medya entegrasyonu için OAuth, kurumsal kullanım için SSO.

#### 📋 Temel Arayüz Tanımı

```typescript
// /src/core/interfaces/auth.interface.ts
export interface IAuthService {
  login(credentials: any): Promise<{ token: string; user: any }>;
  logout(token: string): Promise<void>;
  verify(token: string): Promise<any>;
  refresh(token: string): Promise<string>;
  register(userData: any): Promise<any>;
}

export interface IOAuthService {
  authenticate(provider: string, code: string): Promise<any>;
  getAuthUrl(provider: string): Promise<string>;
  getUserInfo(provider: string, token: string): Promise<any>;
}

export interface ISSOService {
  initiateSSO(provider: string): Promise<string>;
  handleCallback(provider: string, response: any): Promise<any>;
  validateToken(token: string): Promise<any>;
}
```

#### 🏗️ Hibrit Yapı Bileşenleri

**1. JWTAuthService**
- Basit uygulamalar ve API'lar için
- Hızlı ve hafif kimlik doğrulama
- Stateless token tabanlı

**2. OAuthAuthService**
- Sosyal medya entegrasyonu için
- Google, Facebook, GitHub, LinkedIn
- Kullanıcı deneyimi odaklı

**3. SSOAuthService**
- Kurumsal kullanım için
- SAML, OpenID Connect
- Merkezi kimlik yönetimi

**4. AlternativeAuthService**
- Auth0, Firebase Auth, Supabase Auth
- Clerk, NextAuth.js, Passport.js
- Self-hosted çözümler (Keycloak, Authelia)

**5. CompositeAuthService (Akıllı Yönlendirici)**
- Kullanıcı türüne göre otomatik yönlendirme
- Çoklu kimlik doğrulama stratejisi
- Otomatik fallback mekanizması

#### 🔧 Hibrit Yapının Kurulumu

```typescript
// /src/services/auth/composite-auth.service.ts
export class CompositeAuthService implements IAuthService {
  private jwtAuth: IAuthService;
  private oauthAuth: IOAuthService;
  private ssoAuth: ISSOService;
  private alternativeAuth: IAuthService;

  constructor(
    jwtAuth: IAuthService,
    oauthAuth: IOAuthService,
    ssoAuth: ISSOService,
    alternativeAuth: IAuthService
  ) {
    this.jwtAuth = jwtAuth;
    this.oauthAuth = oauthAuth;
    this.ssoAuth = ssoAuth;
    this.alternativeAuth = alternativeAuth;
  }

  async login(credentials: any, options?: {
    method: 'jwt' | 'oauth' | 'sso' | 'alternative',
    provider?: string,
    userType?: 'individual' | 'corporate'
  }): Promise<{ token: string; user: any }> {
    const method = this.determineAuthMethod(credentials, options);
    
    switch (method) {
      case 'jwt':
        return this.jwtAuth.login(credentials);
      case 'oauth':
        return this.oauthAuth.authenticate(options?.provider || 'google', credentials.code);
      case 'sso':
        return this.ssoAuth.handleCallback(options?.provider || 'saml', credentials);
      case 'alternative':
        return this.alternativeAuth.login(credentials);
      default:
        return this.jwtAuth.login(credentials);
    }
  }

  private determineAuthMethod(credentials: any, options?: any): string {
    // Kurumsal kullanıcılar için SSO
    if (options?.userType === 'corporate') return 'sso';
    
    // Sosyal medya ile giriş
    if (credentials.provider) return 'oauth';
    
    // Basit kullanıcılar için JWT
    if (credentials.email && credentials.password) return 'jwt';
    
    return 'alternative';
  }
}
```

#### 🚀 Uygulama Entegrasyonu

```typescript
// app.ts (örnek başlangıç dosyası)
const jwtAuth = new JWTAuthService(/*...*/);
const oauthAuth = new OAuthAuthService(/*...*/);
const ssoAuth = new SSOAuthService(/*...*/);
const alternativeAuth = new AlternativeAuthService(/*...*/);

// Hibrit auth servisini oluşturuyoruz
const authService: IAuthService = new CompositeAuthService(
  jwtAuth, oauthAuth, ssoAuth, alternativeAuth
);
```

#### ✅ Avantajlar

1. **Kullanıcı Deneyimi:** Her kullanıcı türü için en uygun yöntem
2. **Güvenlik:** Çoklu güvenlik katmanı
3. **Esneklik:** Birden fazla kimlik doğrulama yöntemi
4. **Bağımsızlık:** Tek bir firmaya bağımlı değil
5. **Ölçeklenebilirlik:** Kullanıcı sayısına göre otomatik ölçekleme

#### 🔄 Gelecekteki Geçiş Senaryoları

**Senaryo 1: Auth0'dan Firebase Auth'a Geçiş**
- AlternativeAuthService'i FirebaseAuthService ile değiştir
- Uygulama kodunda hiçbir değişiklik gerekmez

**Senaryo 2: Tamamen Self-Hosted Çözüme Geçiş**
- Keycloak veya Authelia kullan
- Cloud bağımlılığı tamamen ortadan kalkar

**Senaryo 3: Kurumsal SSO Entegrasyonu**
- Active Directory veya LDAP entegrasyonu
- Mevcut kurumsal kimlik sistemi ile entegrasyon

#### 📊 Performans Metrikleri

**File Storage:**
- **Local Storage:** <1ms erişim süresi
- **Cloud Storage:** <100ms erişim süresi
- **CDN:** <10ms global erişim süresi
- **Uptime:** %99.9

**Authentication:**
- **JWT:** <10ms doğrulama süresi
- **OAuth:** <500ms doğrulama süresi
- **SSO:** <1s doğrulama süresi
- **Security:** %99.99 güvenlik oranı

#### 🛡️ Güvenlik ve Hata Yönetimi

**File Storage:**
- **Encryption:** Dosya şifreleme (AES-256)
- **Access Control:** Role-based access control
- **Backup:** Otomatik yedekleme ve versiyonlama
- **Monitoring:** Dosya erişim logları

**Authentication:**
- **Rate Limiting:** Brute force saldırılarına karşı koruma
- **Multi-Factor:** 2FA desteği
- **Session Management:** Güvenli oturum yönetimi
- **Audit Logging:** Tüm kimlik doğrulama işlemleri loglanır

#### 🎯 Kullanım Senaryoları

**File Storage:**
- **Local:** Geliştirme dosyaları, test verileri
- **Cloud:** Üretim dosyaları, yedekler
- **CDN:** Resimler, videolar, statik dosyalar
- **Alternative:** Maliyet odaklı depolama

**Authentication:**
- **JWT:** API kullanıcıları, mobil uygulamalar
- **OAuth:** Sosyal medya kullanıcıları
- **SSO:** Kurumsal kullanıcılar, büyük organizasyonlar
- **Alternative:** Özel gereksinimler, hibrit çözümler

### ⚡ Merkezi Performans İzleme Sistemi: Geliştirme Sürecine Entegre Testler

**Felsefe:** Tüm proje performans metriklerini merkezi bir konumdan takip ederiz. Her API çağrısı, veritabanı sorgusu, cache hit/miss oranı, dosya yükleme süresi gibi tüm işlemlerin hızını milisaniye cinsinden ölçer ve veritabanında saklarız. Testler geliştirme sürecinin ayrılmaz bir parçası olur.

#### 📋 Temel Arayüz Tanımı

```typescript
// /src/core/interfaces/performance.interface.ts
export interface IPerformanceMonitor {
  startTimer(operation: string, context?: any): string;
  endTimer(timerId: string, metadata?: any): void;
  recordMetric(name: string, value: number, unit: string, tags?: any): void;
  getMetrics(filters?: any): Promise<PerformanceMetric[]>;
  getRealTimeMetrics(): Promise<RealTimeMetrics>;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  operation: string;
  context: any;
  tags: any;
  duration?: number; // ms cinsinden
}

export interface RealTimeMetrics {
  currentResponseTime: number;
  averageResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  cacheHitRate: number;
  databaseQueryTime: number;
  fileUploadTime: number;
  lastUpdated: Date;
}
```

#### 🏗️ Hibrit Yapı Bileşenleri

**1. PerformanceMonitorService**
- Tüm performans metriklerini toplar
- Gerçek zamanlı izleme
- Otomatik metrik hesaplama

**2. PerformanceDatabaseService**
- Metrikleri veritabanında saklar
- Geçmiş veri analizi
- Trend hesaplama

**3. PerformanceDashboardService**
- Merkezi dashboard
- Gerçek zamanlı görselleştirme
- Alarm ve uyarı sistemi

**4. IntegratedTestService**
- Geliştirme sürecine entegre testler
- Otomatik performans testleri
- Regression testleri

#### 🔧 Hibrit Yapının Kurulumu

```typescript
// /src/services/performance/composite-performance.service.ts
export class CompositePerformanceService implements IPerformanceMonitor {
  private monitor: PerformanceMonitorService;
  private database: PerformanceDatabaseService;
  private dashboard: PerformanceDashboardService;
  private testService: IntegratedTestService;

  constructor(
    monitor: PerformanceMonitorService,
    database: PerformanceDatabaseService,
    dashboard: PerformanceDashboardService,
    testService: IntegratedTestService
  ) {
    this.monitor = monitor;
    this.database = database;
    this.dashboard = dashboard;
    this.testService = testService;
  }

  startTimer(operation: string, context?: any): string {
    const timerId = this.monitor.startTimer(operation, context);
    
    // Geliştirme sürecinde otomatik test başlat
    if (process.env.NODE_ENV === 'development') {
      this.testService.startPerformanceTest(operation, context);
    }
    
    return timerId;
  }

  endTimer(timerId: string, metadata?: any): void {
    const result = this.monitor.endTimer(timerId, metadata);
    
    // Metriği veritabanına kaydet
    this.database.saveMetric({
      name: result.operation,
      value: result.duration,
      unit: 'ms',
      timestamp: new Date(),
      operation: result.operation,
      context: result.context,
      tags: metadata
    });
    
    // Dashboard'u güncelle
    this.dashboard.updateRealTimeMetrics(result);
    
    // Geliştirme sürecinde performans kontrolü
    if (process.env.NODE_ENV === 'development') {
      this.testService.checkPerformanceThreshold(result);
    }
  }

  async getMetrics(filters?: any): Promise<PerformanceMetric[]> {
    return this.database.getMetrics(filters);
  }

  async getRealTimeMetrics(): Promise<RealTimeMetrics> {
    return this.dashboard.getRealTimeMetrics();
  }
}
```

#### 🚀 Uygulama Entegrasyonu

```typescript
// app.ts (örnek başlangıç dosyası)
const performanceMonitor = new PerformanceMonitorService();
const performanceDB = new PerformanceDatabaseService();
const performanceDashboard = new PerformanceDashboardService();
const integratedTests = new IntegratedTestService();

// Merkezi performans servisini oluşturuyoruz
const performanceService: IPerformanceMonitor = new CompositePerformanceService(
  performanceMonitor, performanceDB, performanceDashboard, integratedTests
);

// Global performans izleme middleware'i
app.use((req, res, next) => {
  const timerId = performanceService.startTimer(`${req.method} ${req.path}`, {
    userId: req.user?.id,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.on('finish', () => {
    performanceService.endTimer(timerId, {
      statusCode: res.statusCode,
      responseSize: res.get('Content-Length')
    });
  });
  
  next();
});
```

#### 📊 Performans Metrikleri Kategorileri

**1. API Performansı**
- Response Time (ms)
- Requests Per Second
- Error Rate (%)
- Status Code Distribution

**2. Veritabanı Performansı**
- Query Execution Time (ms)
- Connection Pool Usage
- Slow Query Count
- Cache Hit/Miss Ratio

**3. Cache Performansı**
- Cache Hit Rate (%)
- Cache Miss Rate (%)
- Cache Eviction Rate
- Memory Usage

**4. File Storage Performansı**
- Upload Time (ms)
- Download Time (ms)
- File Size Distribution
- Storage Usage

**5. Authentication Performansı**
- Login Time (ms)
- Token Validation Time (ms)
- Session Creation Time (ms)
- Failed Login Attempts

#### 🧪 Geliştirme Sürecine Entegre Testler

```typescript
// /src/services/testing/integrated-test.service.ts
export class IntegratedTestService {
  private performanceThresholds = {
    apiResponseTime: 200, // ms
    databaseQueryTime: 50, // ms
    cacheResponseTime: 5, // ms
    fileUploadTime: 1000, // ms
    authenticationTime: 100 // ms
  };

  startPerformanceTest(operation: string, context?: any): void {
    // Geliştirme sürecinde otomatik performans testi başlat
    console.log(`🧪 Performance test started: ${operation}`);
  }

  checkPerformanceThreshold(result: any): void {
    const threshold = this.performanceThresholds[result.operation];
    
    if (result.duration > threshold) {
      console.warn(`⚠️ Performance threshold exceeded: ${result.operation} took ${result.duration}ms (threshold: ${threshold}ms)`);
      
      // Geliştiriciye öneriler sun
      this.suggestOptimizations(result.operation, result.duration);
    } else {
      console.log(`✅ Performance OK: ${result.operation} took ${result.duration}ms`);
    }
  }

  suggestOptimizations(operation: string, duration: number): void {
    const suggestions = {
      'database_query': [
        'Add database index',
        'Optimize SQL query',
        'Use query caching',
        'Consider read replicas'
      ],
      'api_response': [
        'Add response caching',
        'Optimize business logic',
        'Use pagination',
        'Consider async processing'
      ],
      'cache_operation': [
        'Increase cache size',
        'Optimize cache keys',
        'Use cache warming',
        'Consider distributed cache'
      ]
    };
    
    console.log(`💡 Optimization suggestions for ${operation}:`);
    suggestions[operation]?.forEach(suggestion => console.log(`   - ${suggestion}`));
  }
}
```

#### 📈 Merkezi Dashboard Özellikleri

**1. Gerçek Zamanlı Metrikler**
- Canlı response time grafikleri
- Anlık request/error oranları
- Cache hit/miss oranları
- Database query performansı

**2. Geçmiş Veri Analizi**
- Trend analizi (günlük, haftalık, aylık)
- Performans karşılaştırması
- Anomali tespiti
- Kapasite planlama

**3. Alarm ve Uyarılar**
- Performans eşiği aşıldığında uyarı
- Error rate artışında alarm
- Kapasite limitlerine yaklaşma uyarısı
- Otomatik bildirim sistemi

**4. Geliştirici Araçları**
- Kod değişikliklerinin performans etkisi
- A/B test sonuçları
- Optimizasyon önerileri
- Test coverage raporları

#### 🗄️ Veritabanı Şeması

```sql
-- Performans metrikleri tablosu
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  operation VARCHAR(255) NOT NULL,
  context JSONB,
  tags JSONB,
  duration INTEGER, -- ms cinsinden
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gerçek zamanlı metrikler tablosu
CREATE TABLE real_time_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(255) NOT NULL,
  current_value DECIMAL(10,2) NOT NULL,
  average_value DECIMAL(10,2) NOT NULL,
  min_value DECIMAL(10,2) NOT NULL,
  max_value DECIMAL(10,2) NOT NULL,
  count INTEGER NOT NULL,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performans eşikleri tablosu
CREATE TABLE performance_thresholds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(255) NOT NULL,
  threshold_value DECIMAL(10,2) NOT NULL,
  alert_level VARCHAR(50) NOT NULL, -- warning, error, critical
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- İndeksler
CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics(timestamp);
CREATE INDEX idx_performance_metrics_operation ON performance_metrics(operation);
CREATE INDEX idx_performance_metrics_name ON performance_metrics(name);
```

#### 🎯 Kullanım Senaryoları

**1. Geliştirme Sürecinde**
- Her kod değişikliğinin performans etkisi otomatik ölçülür
- Eşik aşımlarında anında uyarı alınır
- Optimizasyon önerileri otomatik sunulur

**2. Üretim İzleme**
- Gerçek zamanlı performans takibi
- Anomali tespiti ve alarm
- Kapasite planlama ve ölçeklendirme

**3. Optimizasyon Süreci**
- Performans darboğazlarının tespiti
- A/B test sonuçlarının karşılaştırılması
- ROI hesaplaması

#### 📊 Performans Hedefleri

- **API Response Time:** <200ms (ortalama)
- **Database Query Time:** <50ms (ortalama)
- **Cache Response Time:** <5ms (ortalama)
- **File Upload Time:** <1000ms (ortalama)
- **Authentication Time:** <100ms (ortalama)
- **Error Rate:** <1%
- **Cache Hit Rate:** >90%

---

**Son Güncelleme:** 28 Haziran 2025
**Durum:** ✅ Tüm aşamalar başarıyla tamamlandı + Redis Hibrit Mimari + Asenkron Görev Yönetimi + Veritabanı Hibrit Mimari + File Storage + Authentication Hibrit Mimari + Merkezi Performans İzleme Sistemi Belgelendi
**Sonraki Hedef:** Diğer teknoloji geçişleri için benzer hibrit mimariler