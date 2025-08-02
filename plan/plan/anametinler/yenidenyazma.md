# QR MENU ELITE EDITION - YENİDEN YAZMA PROTOKOLÜ
## Kırılmaz Pipeline ve Veritabanı Odaklı Geliştirme Anayasası

---

## 1. TEMEL FELSEFE: ÖNCE VERİ, KIRILMAZ MANTIK

Bu protokolün amacı, geliştirme sürecinin en başından itibaren varsayımları ortadan kaldırmak, hataları ortaya çıkmadan önce engellemek ve projenin her katmanını birbirine sıkı sıkıya bağlı, doğrulanabilir ve sağlam bir yapıda inşa etmektir. **"Sonra düzeltiriz" mantığını tamamen reddediyoruz.**

**Temel Doğruluk Kaynağımız (Single Source of Truth):** Veritabanıdır. Her şey veritabanında başlar ve biter.

---

## 2. ANA PROTOKOL KURALLARI

### Kural 1: Sıfır Toleranslı Mock Data Politikası

**YASAK:** Frontend veya backend geliştirme sürecinde statik, hard-coded veya geçici mock data kullanmak kesinlikle yasaktır.
- ❌ `ortalama_gelir = 5000` gibi bir atama yapılamaz
- ❌ `const mockUsers = [{id: 1, name: "Test"}]` kullanılamaz
- ❌ Frontend'de statik veri gösterimi yapılamaz

**ZORUNLULUK:** Bir bileşenin veya sayfanın veriye ihtiyacı varsa, bu veri her zaman geliştirme veritabanından, çalışan bir API endpoint'i aracılığıyla çekilmelidir. Eğer ilgili API veya tablo henüz yoksa, geliştirmenin ilk adımı bu API'yi ve veritabanı yapısını oluşturmaktır.

### Kural 2: Önce Veritabanı (Database-First Yaklaşımı)

**Teknoloji:** PostgreSQL kullanılacaktır.

**Süreç:**

1. **Tasarım:** Bir özellik geliştirilmeye başlanmadan önce, o özelliğin ihtiyaç duyduğu tüm tablolar, sütunlar, veri tipleri, ilişkiler (foreign keys), kısıtlamalar (constraints: NOT NULL, UNIQUE, CHECK) ve index'ler veritabanı üzerinde tasarlanır.

2. **Doldurma:** Tablolar, gerçek senaryoları yansıtacak şekilde anlamlı ve çeşitli verilerle doldurulur.
   - ✅ Sadece "Test Müşteri" değil; farklı isimlerde, farklı bakiye durumlarında, farklı sipariş geçmişlerine sahip en az 10-15 müşteri verisi
   - ✅ Gerçekçi fiyat aralıkları, stok durumları, kategori çeşitliliği
   - ✅ Farklı tenant'lar için farklı menü yapıları

3. **Kod Üretimi/Model Oluşturma:** Veritabanı şeması tamamlandıktan sonra, backend'deki ORM (Object-Relational Mapping) katmanı bu şemadan beslenerek oluşturulur. **Kod, veritabanını değil; veritabanı, kodu şekillendirir.**

### Kural 3: Kırılmaz Pipeline Mantığı ve Ön Koşul Analizi

Bir özelliğin "tamamlandı" sayılabilmesi için, sadece kendi işlevini yerine getirmesi yeterli değildir. O işlevin var olmasını sağlayan tüm öncül ve ardıl süreçlerin de eksiksiz çalışması gerekir.

#### Örnek: Müşterinin Sipariş Vermesi

**Yetersiz Tanım:** Müşteri ürünü sepete ekler, ödeme yapar ve sipariş admin paneline düşer.

**Kırılmaz Tanım (Ön Koşul Analizi ile):**

1. **Rol & Yetki Ön Koşulu:** 
   - "İşletme Sahibi" rolüne sahip bir kullanıcının varlığı
   - Bu rolün "menü oluşturma/düzenleme" yetkisine sahip olması
   - "Müşteri" rolünün "sipariş verme" yetkisine sahip olması

2. **Veri Oluşturma Ön Koşulu:**
   - İşletme sahibinin, menüye ürün ekleyebileceği arayüz
   - Fiyat, açıklama, resim gibi tüm detayları girebileceği form
   - Bu verileri kaydeden API endpoint'leri çalışır durumda olmalı

3. **Ana İşlev:**
   - Müşteri, işletme sahibinin oluşturduğu menüyü eksiksiz görüntüler
   - Ürünleri sepete ekler ve sipariş verir

4. **Sonuç & Etki:**
   - Sipariş, ilgili tüm kayıtlarla veritabanına kaydedilir
   - Admin panelinde doğru şekilde görüntülenir
   - Stok verisi güncellenir
   - Müşteriye bildirim gider

**Uygulama:** Her özellik için bu şekilde bir "ön koşul ve etki analizi" dokümante edilecek ve geliştirme bu akışa göre yapılacaktır.

### Kural 4: Katmanlı Test Stratejisi

Testler, kodun kalitesini sonradan ölçen bir araç değil, geliştirme sürecinin ayrılmaz bir parçasıdır.

#### Birim Testler (Unit Tests):
- **Nerede?** Tek bir fonksiyonun veya metodun iç mantığını test etmek için
- **Örnek:** Sipariş toplam tutarı hesaplama, şifre hash'leme
- **Kural:** Bu testlerde bağımlılıklar "mock"lanabilir. Protokolde mock'lamanın izin verildiği tek yer burasıdır.

#### Entegrasyon Testleri (Integration Tests):
- **Nerede?** İki veya daha fazla bileşenin birlikte çalışmasını test etmek için
- **Örnek:** `/api/orders` endpoint'ine POST isteği atıldığında, veritabanına kayıt atılması
- **Kural:** ASLA MOCK VERİTABANI KULLANILMAZ. Testler, izole bir test veritabanı üzerinde çalışır.

#### Uçtan Uca Testler (E2E - End-to-End Tests):
- **Nerede?** Tüm sistemi bir bütün olarak, gerçek bir kullanıcı gibi test etmek için
- **Örnek:** Tarayıcıda login → ürün arama → sepete ekleme → ödeme → sipariş onayı
- **Kural:** En kritik kullanıcı akışları için yazılır.

### Kural 5: API Sözleşme Testleri (Contract Testing) ve Otomatik Veri Kataloğu

Frontend ve backend arasındaki iletişim hatalarını deploydan önce yakalamak için bu kural esastır.

#### Süreç:

1. **Sözleşme Tanımı (Backend):** Backend, her endpoint için bir "sözleşme" (contract) yayınlar. Bu sözleşme, o endpoint'in hangi istek formatını kabul ettiğini ve hangi yanıt formatını döndüreceğini net bir şekilde tanımlar.

2. **Tüketici Testi (Frontend):** Frontend, bu sözleşmeye dayalı testler yazar. Bu testler, "Ben `/api/user/1` endpoint'inden `id`, `userName`, `email` alanlarını içeren bir JSON bekliyorum" der.

3. **Otomatik Kontrol (CI Pipeline):** Backend'de bir geliştirici `userName` alanını `user_name` olarak değiştirdiğinde, CI pipeline'ı sözleşme testlerini çalıştırır ve pipeline'ı kırarak deploy'u engeller.

#### Core Sistem: Veri Kataloğu ve Değişiklik İzleme:
- Veritabanı şema değişiklikleri ve API sözleşme versiyonları otomatik olarak bir "Veri Kataloğu"nda versiyonlanarak saklanır
- Bir sözleşme testi başarısız olduğunda, sistem bu katalogdan faydalanarak detaylı rapor üretir

### Kural 6: Kritik Ek Maddeler

#### CI/CD Pipeline ve Kalite Kapıları (Quality Gates):
Her git push işlemi, otomatik olarak şu adımları tetiklemelidir:
1. Statik kod analizi (linter)
2. Birim Testleri
3. Entegrasyon Testleri
4. Sözleşme Testleri

Bu adımlardan herhangi biri başarısız olursa, pipeline durur ve kod birleştirilemez.

#### Çevresel Tutarlılık (Environmental Parity):
Geliştirme (development), test (staging) ve üretim (production) ortamları birbirine mümkün olan en yakın konfigürasyonda olmalıdır. "Benim makinemde çalışıyordu" mazeretini ortadan kaldırmak için Docker gibi konteyner teknolojileri kullanılmalıdır.

#### Rol ve Yetki Bazlı Geliştirme (RBAC):
Bir özellik geliştirilirken, bu özelliği kimin kullanabileceği en başından düşünülmelidir. API endpoint'leri ve arayüz bileşenleri, en başından itibaren rol ve yetki kontrolleri ile korunmalıdır.

---

## 3. UYGULAMA ADIMLARI

### Aşama 1: Veritabanı Tasarımı ve Kurulumu
1. PostgreSQL kurulumu ve konfigürasyonu
2. Tüm tabloların tasarımı (ERD oluşturma)
3. Migration dosyalarının hazırlanması
4. Test verilerinin gerçekçi şekilde doldurulması

### Aşama 2: Backend API Geliştirme
1. ORM modellerinin veritabanından üretilmesi
2. API endpoint'lerinin oluşturulması
3. Sözleşme dokümantasyonunun (OpenAPI/Swagger) hazırlanması
4. Test suite'lerinin yazılması

### Aşama 3: Frontend Geliştirme
1. API client'ının sözleşmeye göre yazılması
2. Component'lerin gerçek verilerle geliştirilmesi
3. Error handling ve loading state'lerinin implementasyonu
4. E2E testlerinin yazılması

### Aşama 4: Entegrasyon ve Test
1. Frontend-backend entegrasyonu
2. Sözleşme testlerinin çalıştırılması
3. Performans testleri
4. Güvenlik testleri

---

## 4. KALİTE KONTROL LİSTESİ

Her özellik için şu kontroller yapılmalıdır:

- [ ] Veritabanı şeması tasarlandı ve migration'lar yazıldı
- [ ] Test verileri gerçekçi şekilde dolduruldu
- [ ] API endpoint'leri oluşturuldu ve test edildi
- [ ] Sözleşme dokümantasyonu güncellendi
- [ ] Frontend component'leri gerçek verilerle çalışıyor
- [ ] Birim testleri yazıldı ve geçiyor
- [ ] Entegrasyon testleri yazıldı ve geçiyor
- [ ] E2E testleri yazıldı ve geçiyor
- [ ] Sözleşme testleri yazıldı ve geçiyor
- [ ] Performans kriterleri karşılanıyor
- [ ] Güvenlik kontrolleri yapıldı
- [ ] Dokümantasyon güncellendi

---

## 5. BAŞARISIZLIK DURUMUNDA YAPILACAKLAR

Eğer herhangi bir aşamada bu protokole uyulmazsa:

1. **Anında Durdurma:** Geliştirme süreci durdurulur
2. **Kök Neden Analizi:** Neden protokole uyulmadığı analiz edilir
3. **Düzeltme:** Protokole uygun şekilde düzeltilir
4. **Test:** Tüm testler tekrar çalıştırılır
5. **Dokümantasyon:** Öğrenilen dersler dokümante edilir

---

**Bu protokol, projenin kalitesini ve sürdürülebilirliğini garanti altına almak için tasarlanmıştır. Herhangi bir sapma, gelecekteki hataların ve teknik borçların temelini oluşturur.**
