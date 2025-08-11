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
