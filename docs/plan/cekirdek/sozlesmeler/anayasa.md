# 🏛️ MÜHENDİSLİK ANAYASASI v2.0: GERÇEKLİK MOTORU PROTOKOLÜ

## 🎯 GİRİŞ: BU PROTOKOLÜN VAROLUŞ AMACI

Bu doküman, basit bir kontrol listesinden ibaret değildir. Bu, projemizin **değiştirilemez Mühendislik Anayasasıdır**. 

Varlığı, *"Geliştirme sürecimiz ne kadar uzarsa uzasın, bu protokole uyulduğu sürece projenin niyetine sadık kalan, diğer modüllerle kusursuz entegre olan, gerçek ve anlamlı verilerle çalışan ve öngörülebilir şekilde işleyen bir koda erişmemiz kaçınılmaz olsun"* şeklindeki kurucu niyetten doğmuştur.
**Biz, kod yazmıyoruz.** Gerçek dünyayı dijital ortama doğru ve dürüst bir şekilde yansıtan, bakımı kolay, anlaşılır ve sağlam bir dijital miras inşa ediyoruz. 

Bu protokole uyan her mühendis, bu mirasın hem bir **koruyucusu** hem de bir sonraki nesle aktaran bir **elçisidir**. Her bir madde, bir sonraki mühendisin *"Bu kodun ürettiği veri nereden geliyor ve doğruluğundan nasıl emin olabilirim?"* sorusunu sormasına gerek kalmadan, cevabı sürecin kendisinde bulmasını sağlamak için tasarlanmıştır. 

**Bu, bizim "Gerçeklik Motorumuzdur".** Her görevin bu motordan geçmesi zorunludur.
---

## 🛡️ BÖLÜM 1: SARSILMAZ İLKELER (THE UNBREAKABLE PRINCIPLES)

Bu ilkeler, yazılacak her bir kod satırının üzerinde durduğu, projenin **taviz verilemez temelidir**. Bir ilkenin ihlali, projenin bütünlüğüne yapılmış bir saldırı olarak kabul edilir.
### 📋 **İLKELER LİSTESİ**

#### 🗄️ **1. Önce Veri, Sonra Kod (Database-First)**
Bir özelliğin ihtiyaç duyduğu veri yapısı (tablolar, ilişkiler, kısıtlamalar), herhangi bir kod yazılmadan önce **PostgreSQL** üzerinde tasarlanır, onaylanır ve anlamlı, gerçekçi verilerle doldurulur. **Veritabanı, kodun tek ve nihai doğruluk kaynağıdır.**

#### 🔒 **2. Sıfır Toleranslı Güven (Zero-Trust by Default)**
Her özellik, en başından itibaren **rol/yetki (RBAC)** kontrolleriyle korunmalıdır. Hiçbir endpoint veya arayüz bileşeni, varsayılan olarak "güvenli" kabul edilemez. **Erişim, varsayılan olarak reddedilir** ve sadece açıkça izin verilerek sağlanır.

#### 🏢 **3. Kiracı İzolasyonu Kutsaldır (Sanctity of Tenancy)**
Bu bir **Multi-Tenant** sistemdir. Kiracıya ait her veri parçasını tutan her tabloda `tenant_id` kolonu bulunmak zorundadır. Veritabanına yapılan her sorgu (`SELECT`, `UPDATE`, `DELETE`), istisnasız bir şekilde `WHERE tenant_id = ?` koşulunu içermelidir. **Bu ilkenin ihlali, en büyük güvenlik açığıdır.**

#### 🏗️ **4. Katmanlı Mimari Zorunluluğu (Mandatory Layered Architecture)**
İş mantığı (business logic), asla ve asla rota işleyicileri (`Controller` / `Route Handler`) içine yazılamaz. Tüm iş mantığı, test edilebilir ve izole edilmiş **Servis Katmanı (Service Layer)** içinde yer almalıdır. Controller'lar yalnızca isteği doğrular, ilgili servisi çağırır ve yanıtı döndürür.

#### ✅ **5. Otomatik Kalite Kapıları (Automated Quality Gates)**
Her kod değişikliği (`git push`), otomatik olarak **linter**, **birim** ve **entegrasyon** testlerini tetikler. Herhangi bir hatada, kodun ana dala birleşmesi engellenir. *"Benim makinemde çalışıyordu"* mazereti teknik olarak imkansızdır.

#### 🐳 **6. Çevresel Tutarlılık (Immutable Environments)**
Geliştirme, test ve üretim ortamları, **Docker** ile birbirinin birebir kopyası olmalıdır. Ortamlar arasındaki farktan kaynaklanan hatalar kabul edilemez.
---

## 🔄 BÖLÜM 2: GÖREV YAŞAM DÖNGÜSÜ (THE TASK LIFECYCLE)

Her bir özellik, bu yaşam döngüsündeki fazları **sırayla ve eksiksiz** olarak tamamlamak zorundadır. Bir sonraki faza geçmek, bir önceki fazdaki tüm maddelerin tamamlanmış olmasına bağlıdır.
### 🔍 **FAZ 1: ANALİZ VE ATOMİZASYON** ("Ne İnşa Ediyoruz?")

Bu faz, büyük bir hedefin, kodlamaya başlamadan önce **yönetilebilir en küçük, bağımsız parçalara** ayrılmasını sağlar.
#### 📋 **FAZ 1 ADIMLARI**

- [ ] **ANA GÖREV (EPIC) TANIMLANDI**: Üst seviye iş hedefi net bir cümleyle tanımlandı.
  - **Örnek**: *"Kullanıcıların menüde doğal dille arama yapabilmesi."*

- [ ] **ÖN KOŞUL ANALİZİ YAPILDI** (Geriye Yönelik Bağımlılık Haritası): Hedeflenen özellikten geriye doğru *"Bunu şimdi yapamam, çünkü..."* sorusuyla ilerlenerek, en temel ve önce yapılması gereken işler saptandı.

  **Örnek Analiz Zinciri:**
  - Arama arayüzünü yapamam, çünkü aranacak ürünler veritabanında yok.
  - Ürün ekleme işlevini yapamam, çünkü ürünlerin ekleneceği bir "menü" yok.
  - Menü oluşturma işlevini yapamam, çünkü bunu sadece "İşletme Sahibi" yapabilmeli. Önce Yetkilendirme sistemi lazım.

- [ ] **ATOMİK GÖREVLER LİSTELENDİ**: Yukarıdaki analiz sonucunda ortaya çıkan mantıksal sıra, geliştirilecek iş listesini (Atomik Görevler) oluşturdu.

  **Örnek İş Listesi:**
  - `AUTH-01`: İşletme Sahibi Rolü ve Yetkilerinin Tanımlanması
  - `MENU-01`: Yetkili Kullanıcı İçin Menü Oluşturma API'ı
  - `PRODUCT-01`: Oluşturulmuş Menüye Ürün Ekleme Formu ve API'ı
  - `SEARCH-01`: Müşterinin Ürünleri Arayabildiği Arayüz
> **📋 Protokol**: Aşağıdaki Faz 2'den Faz 5'e kadar olan adımlar, yukarıda listelenen **HER BİR ATOMİK GÖREV İÇİN** ayrı ayrı ve sırasıyla uygulanacaktır.

**ATOMİK GÖREV KODU / ADI**: `[ÖRNEK: AUTH-01: İşletme Sahibi Rolü ve Yetkilerinin Tanımlanması]`
### 📝 **FAZ 2: KONTRAT TASARIMI** ("Sözleşmeyi Yaz")

#### 📋 **FAZ 2 ADIMLARI**

- [ ] **GÖREV MANİFESTOSU OLUŞTURULDU**:
  
  **NİYET (ÇÜNKÜ Prensibi)**: *"Sisteme yetkisiz kişilerin menü eklemesini engellemeyi amaçlıyoruz. ÇÜNKÜ bu, veri bütünlüğünü bozar ve güvenlik açığı yaratır."*
  
  **SORUMLULUK SINIRLARI**:
  - **YAPAR**: Verilen bir `user_id` ve `tenant_id`'nin "İşletme Sahibi" olup olmadığını kontrol eder (`true`/`false` döner).
  - **YAPMAZ**: Kullanıcı oluşturmaz, şifre değiştirmez, rol ataması yapmaz.
  
  **VERİ KAYNAĞI**: `staff` ve `user_roles` tabloları. **ÇÜNKÜ** bir kullanıcının bir işletmedeki rolü için tek doğruluk kaynağımız bu tablolardır.
- [ ] **API KONTRATI VE VERİ YAPILARI (DTOs) TANIMLANDI**: Görevin dış dünya ile nasıl konuşacağı tanımlandı.

  **Örnek API Kontratı**:
  - **Endpoint**: `GET /api/v1/auth/check-role`
  - **İstek (Request Body/Query Params)**: `{ "userId": "uuid", "tenantId": "uuid", "role": "owner" }`
  - **Başarılı Yanıt (200 OK)**: `{ "hasRole": true }`
  - **Başarısız Yanıt (403 Forbidden)**: `{ "error": "Insufficient permissions" }`
- [ ] **BAŞARI KRİTERİ VE İSPATI BELİRLENDİ**:
  
  **Kriter**: *"Yukarıdaki endpoint, role='owner' olan bir kullanıcı bilgisi ile çağrıldığında { "hasRole": true } döndürmelidir."*
  
  **İspat Yöntemi**: *"Bu senaryoyu test eden ve başarılı olan bir entegrasyon testinin çıktısı."*
### 🧪 **FAZ 3: İSPAT PLANLAMASI** ("Nasıl Kanıtlayacağını Planla")

#### 📋 **FAZ 3 ADIMLARI**

- [ ] **TEST SENARYOLARI BELİRLENDİ** (Girdi -> Beklenen Çıktı):
  - **Doğru Çalışma (Happy Path)**: `role='owner'` olan kullanıcı -> `200 OK`, `{ "hasRole": true }`
  - **Hatalı Yetki (Error Case)**: `role='customer'` olan kullanıcı -> `200 OK`, `{ "hasRole": false }`
  - **Geçersiz Girdi (Error Case)**: Geçersiz `tenant_id` -> `404 Not Found`
  - **Sınır Durum (Edge Case)**: Yetkilendirme token'ı olmayan istek -> `401 Unauthorized`

- [ ] **TEST STRATEJİSİ TANIMLANDI**: *"Bu görev hem iş mantığı hem de veritabanı erişimi içerdiği için Birim Testleri (Servis katmanı için) ve Entegrasyon Testleri (API endpoint'i için) gereklidir."*

- [ ] **BAŞARISIZ TESTLER YAZILDI (KIRMIZI)**: Yukarıdaki her senaryo için, henüz kodu yazılmadığından kasıtlı olarak başarısız olan testler yazıldı ve test paketinin **KIRMIZI** olduğu teyit edildi.
### 🔨 **FAZ 4: İNŞA VE DOĞRULAMA** ("Sözünü Tut")

#### 📋 **FAZ 4 ADIMLARI**

- [ ] **1. KODLAMA (YEŞİLE ÇEVİRME)**: Sadece Faz 3'teki testleri geçirecek en basit ve minimal kod yazıldı.
- [ ] **2. DOĞRULAMA (YEŞİL)**: Test paketi çalıştırılarak tamamının **YEŞİL** olduğu doğrulandı.
- [ ] **3. İYİLEŞTİRME (REFAKTÖR)**: "Çalışan" kod, okunabilirlik, performans ve bakım kolaylığı için **"temiz kod"** prensipleriyle yeniden düzenlendi.
- [ ] **4. NİHAİ GARANTİ (YİNE YEŞİL)**: Kod iyileştirildikten sonra tüm test paketi tekrar çalıştırılarak işlevselliğin bozulmadığı garanti altına alındı.
### 🔗 **FAZ 5: ENTEGRASYON VE MİRAS** ("Mirası Devret")

#### 📋 **FAZ 5 ADIMLARI**

- [ ] **KENDİNİ DOKÜMANTE EDEN KOD VE YORUMLAR**: Kodun *"neden"* bu şekilde yazıldığını açıklayan kritik yorumlar eklendi.

- [ ] **AKRAN DENETİMİ (PULL REQUEST & CODE REVIEW)**:
  - Kod bir **Pull Request (PR)** olarak açıldı.
  - PR açıklamasına, bu çözümün Faz 2'deki her bir maddeyi (Niyet, Sorumluluk, API Kontratı, Başarı Kriteri) nasıl karşıladığı madde madde yazıldı.
  - Denetleyen mühendis, bu iddiaları sorgulamakla ve kanıt istemekle yükümlüdür.

- [ ] **NİHAİ DOĞRULAMA VE KANITIN SUNULMASI**: Kod ana dala entegre edildikten sonra, geliştirici görevin tamamlandığını ispatlayan kanıtı (Faz 2'de tanımlanan ispat yöntemiyle) göreve ekledi. Bu, *"kodum çalışıyor"* demek değil, *"bu atomik görevin hedefini yerine getirdiğini ve doğruluğunu ispatladım"* demektir.
---

## 🏛️ SONUÇ: ANAYASANIN DEĞİŞTİRİLMEZLİĞİ VE DEĞİŞTİRİLMESİ

Bu protokol, taş üzerine yazılmış bir kanun değildir; **yaşayan bir organizmadır**. Ancak değiştirilmesi, keyfi bir kararla değil, **anayasal bir süreçle** mümkündür.

### 📋 **DEĞİŞİKLİK SÜRECİ**

Bir ilkenin veya fazın değiştirilmesi için, bir mühendis **"Anayasa Değişiklik Teklifi" (ADT)** sunmalıdır. Bu teklif:

- Mevcut maddenin neden yetersiz kaldığını **kanıtlarla** açıklamalı
- Önerilen yeni maddenin projeye nasıl daha fazla değer katacağını **somut olarak** göstermelidir

Teklif, ekip tarafından tartışılır, oylanır ve kabul edilirse Anayasa'nın yeni bir versiyonu yayınlanır.

### 🎯 **FELSEFE**

**Amacımız, en iyi pratikleri takip etmek değil, kendi en iyi pratiklerimizi sürekli olarak yaratmaktır.**