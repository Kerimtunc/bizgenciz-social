# 🏗️ VARLIKSA İNŞA MANİFESTOSU

> **Elbette. İstediğiniz metni, hiçbir kısaltma yapmadan ve son eklemeyi de dahil ederek tek bir belge olarak birleştiriyorum.**

## 🎯 FELSEFE

**Anlaşıldı. Bu bir inşaat planı değil; bu bir varoluş manifestosu.**

"Kemiği olmayan projeye et hazırlamak" hatasına düşmeyeceğiz. Projeyi, varoluşun en temel katmanından başlayarak, her katmanı bir öncekinin sarsılmaz gerçekliği üzerine inşa ederek, geri dönülemez bir mantıksal sıra ile yaratacağız. Her katman, kendi içinde tamamlanmış, test edilmiş ve bir sonraki katman için güvenilir bir "zemin" olmak zorundadır.

**Güvenlik bir katman değil; her katmanın içine örülmüş, o katmanın var olabilmesi için gereken temel fizik kanunudur.**

İşte bu felsefeyle tasarlanmış, yüksek entropili, her adımı bir zorunluluklar ve doğrulamalar zinciri olan nihai inşaat planı:

## 📁 DOSYA YAPISI

**"Varlıksal İnşa Manifestosu" Dosya Yapısı** (`/blueprint`)

Bu yapı, projenin varoluş aşamalarını temsil eder. Bir sonraki dosyaya geçmek, **ancak ve ancak** bir önceki dosyanın "Doğrulama Pipeline'ı" %100 başarıyla tamamlandığında mümkündür.

```
/blueprint
├── README.md                           // Bu manifestonun nasıl okunup uygulanacağını anlatan kılavuz.
│
├── AŞAMA_0_VERİ_EVRENİNİN_YARATILIŞI.md  // Katman 0: VERİTABANI. Verinin var olabileceği evrenin fiziksel yasaları.
│
├── AŞAMA_1_ANLAMIN_VE_SÖZLEŞMELERİN_TANIMI.md // Katman 1: SÖZLEŞMELER. Veriye anlam ve kural yüklenmesi.
│
├── AŞAMA_2_MANTIK_VE_DAVRANIŞ_ÇEKİRDEĞİ.md // Katman 2: BACKEND. Kuralları uygulayan merkezi işlem birimi.
│
├── AŞAMA_3_ARAYÜZ_VE_ETKİLEŞİM_YÜZEYİ.md   // Katman 3: FRONTEND. Mantığın dış dünya ile konuştuğu yüzey.
│
└── AŞAMA_4_OPERASYONEL_BÜTÜNLÜK_VE_TEST.md // Katman 4: PİPELİNELAR & TESTLER. Tüm sistemin bütünlüğünün ispatı.
```


---

## 🚀 VAROLUŞ AŞAMALARI

Şimdi her bir varoluş aşamasının içeriğini, zorunluluklarını ve doğrulama mekanizmalarını tanımlayalım.

---

## 🗄️ AŞAMA 0: VERİ EVRENİNİN YARATILIŞI

### 📋 **ONTOLOJİK HEDEF**
Verinin fiziksel olarak var olabileceği, kurallı, ilişkili ve boş bir evren yaratmak. Bu aşama tamamlandığında, "veri" kavramı projemiz için bir gerçekliğe dönüşür.

### 🏗️ **İNŞA EDİLECEK VARLIKLAR**

- **Tam Fiziksel Veritabanı Şeması (SQL DDL)**: Projedeki TÜM tablolar, ilişkiler, kısıtlar ve indeksler.
- **Tohumlama Script'i (Opsiyonel ama Önerilen)**: ENUM tabloları gibi temel ve statik verileri dolduran script (`seed_enums.sql`).

### 🔧 **İNŞAAT DETAYLARI VE ZORUNLULUKLAR**

- **Tablo Tanımları**: `tenants`, `users`, `business_profiles`, `products`, `orders` vb. tüm tabloların `CREATE TABLE` ifadeleri.
- **İlişkisel Bütünlük**: Tüm `FOREIGN KEY` kısıtları, `ON DELETE` ve `ON UPDATE` davranışları ile birlikte tanımlanmalıdır.
- **Alan Kısıtları**: Her sütun için `NOT NULL`, `UNIQUE`, `CHECK` (örn: `credit_balance >= 0`) gibi kısıtlar eksiksiz uygulanmalıdır.

### 🛡️ **GÜVENLİK ENTEGRASYONU** (Bu Katmanın Sorumlulukları)

- **Kiracı İzolasyonunun Temeli**: Veri sahipliği olan her tablo (`orders`, `products` vb.) zorunlu olarak `tenant_id UUID NOT NULL REFERENCES tenants(id)` kolonu içerecektir. Bu, müzakereye açık değildir.
- **Kimlik Güvenliği**: `users` tablosu, `password` veya `sifre` gibi bir kolon içeremez. Sadece `password_hash TEXT NOT NULL` ve `salt TEXT NOT NULL` kolonlarını içerecektir.
- **Veri Kaybının Önlenmesi**: Tarihsel bütünlüğü kritik olan tüm ana tablolara (`orders`, `users`, `products` vb.) `deleted_at TIMESTAMPTZ` kolonu eklenecektir (Soft Delete politikası).

### ✅ **AŞAMA 0: DOĞRULAMA PIPELINE'I**

#### 🔨 **İNŞA ET**
Bu dosyada tanımlanan tüm SQL script'ini boş bir PostgreSQL veritabanı üzerinde çalıştır.

#### 🔍 **DOĞRULA**
Script'in hiçbir hata vermeden başarıyla tamamlandığını teyit et.

#### 🧪 **TEST ET**
Basit bir test script'i yazarak:

- Bir user olmadan bir order oluşturmaya çalış ve `FOREIGN KEY constraint` hatası al.
- `password_hash` alanı NULL olan bir user eklemeye çalış ve `NOT NULL constraint` hatası al.

#### 🎯 **SONUÇ**
Bu pipeline başarılıysa, bir sonraki aşamaya geçilebilir.

#### 📦 **SONRAKİ AŞAMAYA DEVREDİLEN MİRAS**
Boş, kurallı, ilişkisel olarak tutarlı ve güvenli bir veri deposu.

---

## 📋 AŞAMA 1: ANLAMIN VE SÖZLEŞMELERİN TANIMI

### 📋 **ONTOLOJİK HEDEF**
Veritabanındaki ham veriye "anlam" yüklemek ve sistemin farklı parçalarının birbirleriyle nasıl konuşacağının değişmez kurallarını (sözleşmelerini) tanımlamak.

### ⚠️ **ÖN KOŞUL**
Aşama 0 tamamlanmış olmalıdır.

### 🏗️ **İNŞA EDİLECEK VARLIKLAR**

- **Paylaşılan Veri Modelleri (DTOs)**: API üzerinden taşınacak verinin şekli. (TypeScript interface'leri veya JSON Schema'lar).
- **API Sözleşmeleri (OpenAPI 3.0)**: Sistemin tüm dışa açık iletişim kanallarının tanımı.

### 🔧 **İNŞAAT DETAYLARI VE ZORUNLULUKLAR**

- **DTO Tanımları**: `OrderDTO`, `CreateOrderRequestDTO`, `UserDTO` gibi tüm veri transfer nesneleri burada tanımlanır.

- **API Endpoint Tanımları**:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/tenants/{tenantId}/menu`
  - ... (tüm endpoint'ler, beklenen request body, response body, header'lar ve hata kodları ile birlikte)

### 🛡️ **GÜVENLİK ENTEGRASYONU** (Bu Katmanın Sorumlulukları)

- **Veri Sızıntısının Önlenmesi (DTO Tasarımı)**: DTO'lar, veritabanı şemasını asla birebir yansıtmaz. `password_hash`, `salt`, `deleted_at` gibi hassas veya dahili sistem alanları DTO'larda kesinlikle yer alamaz.

- **Yetki Sınırlarının Çizilmesi (JWT Payload)**: Sistemin kullanacağı JWT'nin payload yapısı burada tanımlanır: `{ "sub": "user_id", "tenant_id": "...", "role": "ADMIN|STAFF", ... }`. Bu, kimlik belgesinin formatıdır.

- **Güvenli Endpoint Tanımları**: Her endpoint tanımında, o endpoint'e erişim için hangi rol'ün gerektiği (security şeması altında) belirtilmelidir.

### ✅ **AŞAMA 1: DOĞRULAMA PIPELINE'I**

#### 🔨 **İNŞA ET**
Tüm DTO ve OpenAPI tanımlarını bir dosyada topla.

#### 🔍 **DOĞRULA**
OpenAPI tanımını bir linter/validator (örn: Swagger Editor) ile kontrol et ve sentaktik olarak %100 doğru olduğundan emin ol.

#### 🧪 **TEST ET (Mantıksal)**
Her DTO'yu, Aşama 0'daki veritabanı şemasıyla karşılaştır. Herhangi bir hassas alanın sızdırılıp sızdırılmadığını kontrol et. "Bu sözleşmeler, projenin tüm işlevselliğini kapsıyor mu?" sorusunu sor.

#### 🎯 **SONUÇ**
Bu pipeline başarılıysa, bir sonraki aşamaya geçilebilir.

#### 📦 **SONRAKİ AŞAMAYA DEVREDİLEN MİRAS**
Sistemin tüm parçalarının konuşacağı, güvenli ve tutarlı bir "ortak dil".

---

## ⚙️ AŞAMA 2: MANTIK VE DAVRANIŞ ÇEKİRDEĞİ

### 📋 **ONTOLOJİK HEDEF**
"Ortak dil"i (Sözleşmeler) kullanarak, veritabanı üzerindeki iş mantığını ve davranışları hayata geçiren bir merkezi işlem birimi (beyin) yaratmak.

### ⚠️ **ÖN KOŞUL**
Aşama 0 ve Aşama 1 tamamlanmış olmalıdır.

### 🏗️ **İNŞA EDİLECEK VARLIKLAR**

- **Tam Backend Uygulaması**: Express.js router'ları, servisleri, repository'leri.
- **Entegrasyon Testleri**: Backend'in tek başına doğruluğunu ispatlayan testler.

### 🔧 **İNŞAAT DETAYLARI VE ZORUNLULUKLAR**

- **API Katmanı (Controllers)**: Her endpoint, Aşama 1'deki sözleşmeye harfiyen uymalıdır. Gelen isteği doğrular ve ilgili servise paslar.
- **Servis Katmanı (İş Mantığı)**: Tüm iş kuralları, hesaplamalar ve akışlar burada kodlanır.
- **Repository Katmanı**: Veritabanı ile konuşan tek katmandır.

### 🛡️ **GÜVENLİK ENTEGRASYONU** (Bu Katmanın Sorumlulukları)

- **Kimlik Doğrulama Middleware'i**: Her korumalı endpoint'ten önce çalışır. `Authorization` header'ını kontrol eder, JWT'yi doğrular ve `req.user` nesnesini oluşturur.

- **Girdi Doğrulama (Input Validation)**: Gelen her DTO, SQL Injection, XSS gibi saldırıları önlemek için `class-validator` gibi bir kütüphane ile doğrulanır. "Client'dan gelen veriye asla güvenme" ilkesi burada kanundur.

- **Yetkilendirme Mantığı (Authorization Logic)**:
  - **Kiracı İzolasyonunun Uygulanması**: `req.user.tenant_id` alınır ve bu `tenant_id` her veritabanı sorgusuna repository katmanında otomatik olarak eklenir.
  - **Rol ve Öznitelik Kontrolü**: `OrderService.cancelOrder(orderId, userId)` gibi bir fonksiyon, sadece "siparişin sahibi olan veya ADMIN rolüne sahip olan kullanıcının" bu işlemi yapmasına izin verir.

### ✅ **AŞAMA 2: DOĞRULAMA PIPELINE'I**

#### 🔨 **İNŞA ET**
Backend uygulamasının kodunu yaz.

#### 🔍 **DOĞRULA**
`npm run test:integration` komutunu çalıştır. Bu testler, çalışan bir backend sunucusuna ve boş, test amaçlı bir veritabanına karşı çalışır.

#### 🧪 **TEST ET**

- Postman ile `POST /orders` isteği at. Veritabanında siparişin doğru oluştuğunu ve stoğun düştüğünü kontrol et.
- Başka bir kiracının verisine erişmeye çalışan bir istek at ve `403 Forbidden` hatası al.
- Hatalı bir DTO gönder ve `400 Bad Request` hatası al.

#### 🎯 **SONUÇ**
Tüm entegrasyon testleri geçtiğinde, bu aşama tamamlanmıştır.

#### 📦 **SONRAKİ AŞAMAYA DEVREDİLEN MİRAS**
Kendi kendine yeten, test edilmiş, güvenli ve çalışan bir API sunucusu.

---

## 🎨 AŞAMA 3: ARAYÜZ VE ETKİLEŞİM YÜZEYİ

### 📋 **ONTOLOJİK HEDEF**
Backend'in sunduğu mantığı ve veriyi, insanlar için anlamlı ve kullanılabilir bir görsel arayüze dönüştürmek.

### ⚠️ **ÖN KOŞUL**
Aşama 2 tamamlanmış ve API'ları çalışır durumda olmalıdır.

### 🏗️ **İNŞA EDİLECEK VARLIKLAR**

- **Tam Frontend Uygulaması**: Next.js sayfaları, bileşenleri, durum yönetimi.
- **Tasarım Sistemi**: Renkler, tipografi gibi görsel kurallar.

### 🔧 **İNŞAAT DETAYLARI VE ZORUNLULUKLAR**

- **Veri Katmanı**: API ile konuşacak bir "API istemci" modülü oluşturulur. Bu modül, Aşama 1'de tanımlanan DTO'lar için TypeScript interface'lerini kullanır.
- **Bileşen Hiyerarşisi**: Atomik bileşenlerden (`Button`) başlayarak, modüllere (`OrderList`) ve sayfalara (`DashboardPage`) doğru inşa edilir.

### 🛡️ **GÜVENLİK ENTEGRASYONU** (Bu Katmanın Sorumlulukları)

- **Asıl Güvenlik Backend'dedir**: Frontend'deki kontroller (örn: butonu gizleme) sadece UX içindir. Gerçek güvenlik kontrollerinin her zaman backend'de yapıldığı varsayılır.
- **Güvenli Token Saklama**: Access Token'lar bellekte, Refresh Token'lar ise `HttpOnly` ve `Secure` cookie'lerde saklanmalıdır.
- **Çıktı Kodlama (Output Encoding)**: Ekrana basılan tüm dinamik verilerin XSS saldırılarına karşı güvenli olduğundan emin olunur (React'in varsayılan davranışı).

### ✅ **AŞAMA 3: DOĞRULAMA PIPELINE'I**

#### 🔨 **İNŞA ET**
Frontend uygulamasının kodunu yaz.

#### 🔍 **DOĞRULA**
`npm run lint` ve `npm run test:component` (varsa) komutlarını çalıştır.

#### 🧪 **TEST ET**
Uygulamayı bir tarayıcıda aç ve Aşama 2'de inşa edilen backend'e karşı çalıştır. Tüm ana kullanıcı akışlarının manuel olarak çalıştığını teyit et.

#### 🎯 **SONUÇ**
Uygulama beklendiği gibi çalışıyorsa, bu aşama tamamlanmıştır.

#### 📦 **SONRAKİ AŞAMAYA DEVREDİLEN MİRAS**
Kullanıcıların etkileşime girebildiği, çalışan bir web uygulaması.

---

## 🔧 AŞAMA 4: OPERASYONEL BÜTÜNLÜK VE TEST

### 📋 **ONTOLOJİK HEDEF**
Önceki katmanların bir araya gelerek oluşturduğu sistemin bir bütün olarak, otomatik süreçler altında ve öngörülen iş akışlarına göre çalıştığını ispatlamak.

### ⚠️ **ÖN KOŞUL**
Aşama 3 tamamlanmış olmalıdır.

### 🏗️ **İNŞA EDİLECEK VARLIKLAR**

- **Uçtan Uca (E2E) Test Seti**.
- **Sürekli Entegrasyon (CI) Pipeline'ı**.
- **"In-house" Operasyonel Script'ler**.

### 🔧 **İNŞAAT DETAYLARI VE ZORUNLULUKLAR**

- **Uçtan Uca (E2E) Testler**: Playwright veya Cypress kullanılarak, kritik iş akışları (Müşteri sipariş verir -> İşletme panelde görür -> Stok düşer) baştan sona simüle edilir.

- **CI Pipeline'ı**: `pre-push` hook'u, `npm test` (birim + entegrasyon) ve `npm run test:e2e` komutlarını sırayla çalıştıracak şekilde yapılandırılır. Herhangi bir test başarısız olursa push engellenir.

- **Operasyonel Script'ler**:
  - **ETL Script'i** (`worker.js`): Analitik tabloları dolduran script.
  - **Loglama**: Tüm katmanlarda yapılandırılmış loglama entegre edilir.
  - **Dağıtım (Deployment) Planı**: Proje bittiğinde Docker'a nasıl taşınacağına dair `Dockerfile` ve `docker-compose.yml` planları.

### 🛡️ **GÜVENLİK ENTEGRASYONU** (Bu Katmanın Sorumlulukları)

- **Güvenlik Odaklı Testler**: E2E testleri, "bir kullanıcı olarak başka bir kullanıcının verisini görmeye çalışma" gibi negatif senaryoları da içermelidir.

- **Bağımlılık Taraması**: CI pipeline'ına `npm audit` gibi bir adım eklenerek bilinen zafiyetlere sahip kütüphanelerin kullanımı engellenir.

- **Gözlemlenebilirlik (Observability)**: AŞAMA_4'teki "Loglama"ya ek olarak **Metrics (Metrikler)** ve **Tracing (İzleme)** de bir varoluş kuralı olarak eklenebilir. Örneğin: "Her API endpoint'i, gecikme süresi ve hata oranı metrikleri üretmelidir." Bu, sistemin sadece çalışıp çalışmadığını değil, ne kadar iyi çalıştığını da kanıtlamayı sağlar.

### ✅ **AŞAMA 4: DOĞRULAMA PIPELINE'I**

#### 🔨 **İNŞA ET**
Tüm E2E testlerini ve CI script'lerini yaz.

#### 🔍 **DOĞRULA**
`git push` yapmaya çalıştığında, tüm testlerin (birim, entegrasyon, E2E) sırayla ve otomatik olarak çalıştığını ve başarılı olduğunda push işlemine izin verdiğini teyit et.

#### 🎯 **SONUÇ**
CI pipeline'ı yeşil olduğunda, proje bir bütün olarak doğrulanmış ve inşaat tamamlanmış demektir.

#### 📦 **SONRAKİ AŞAMAYA DEVREDİLEN MİRAS**
Kendi kendini test eden, bütünlüğü kanıtlanmış, üretime hazır bir proje.