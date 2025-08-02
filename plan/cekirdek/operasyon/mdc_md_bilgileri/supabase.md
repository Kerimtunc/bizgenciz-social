# 🗄️ Supabase SQL Protokolü ve Test Süreçleri

## 📋 **Dosyanın Amacı**

Bu dosya, **Supabase kullanımı için bir SQL protokolü oluşturup test süreçlerini sorunsuz geçirmek** amacıyla hazırlanmıştır. Geliştirme esnekliği ile üretim güvenliği arasındaki o ince çizgiyi mükemmel bir şekilde aydınlatıyor. "Son kullanıcıya veri sunan API'larda kullanılmaması" kuralının ne anlama geldiğini netleştirelim ve senin test ihtiyacını karşılayacak en sağlam çözümü tasarlayalım.

## ⚖️ **Kuralın Anlamı: "Çalışma Zamanı" vs. "Geliştirme Zamanı"**

**"Son kullanıcıya veri sunan API'larda kullanılmaması"** demek, uygulama canlıda çalışırken (**runtime**), bir son kullanıcının yaptığı isteği (`GET /api/orders`) işleyen kodun, veritabanına bağlanmak için **RLS'i bypass eden yönetici bağlantısını** kullanmasının **kesinlikle yasak** olduğu anlamına gelir. O kod, her zaman kullanıcının kimliğini taşıyan ve RLS kurallarının uygulanmasını sağlayan **Supabase Client** kütüphanesini kullanmalıdır.

**Ancak senin durumun tamamen farklı.** Sen, **"geliştirme zamanında"** (development time), bir test senaryosunu hazırlamak için veritabanını manipüle etmek istiyorsun. Bu **tamamen meşru ve gerekli** bir eylem.

## 🚨 **Problem Tanımı**

**Problem:** Eğer `mcp-alchemy` ile RLS'i bypass ederek veri girersen, o verinin RLS kuralları düzgün uygulandığında son kullanıcı tarafından gerçekten görünüp görünmeyeceğini nasıl test edersin? İşte burada bir **köprüye ihtiyacımız var**.

## 🎯 **Çözüm Önerisi: "Gerçek Kullanıcı Simülasyonu" ve Test Ortamı Kuralları**

En temiz ve güvenli çözüm, testlerimizi mümkün olduğunca **gerçek dünya koşullarını simüle** edecek şekilde tasarlamaktır. "Demo kullanıcı" gibi bir sütun eklemek yerine, test ortamımızda **gerçek kullanıcılar gibi davranan** ama test amaçlı olduğu bilinen varlıklar yaratacağız.

İşte bu mantığı `supabase.mdc` ve `sql.mdc`'ye entegre edecek **nihai çözüm önerim**:

## 🔧 **Adım 1: sql.mdc'ye Test Edilebilirlik Sütunu Ekleme**

Veritabanı şemamıza, bir kaydın **test verisi mi yoksa gerçek veri mi** olduğunu ayırt etmemizi sağlayacak **basit ama güçlü** bir sütun eklemeyi **zorunlu** hale getirelim.

### 📋 **sql.mdc dosyasına eklenecek yeni kural:**

```markdown
## 2. Unbreakable Schema (DDL) Constitution

... (mevcut kurallar) ...

- **Rule 2.8 (Testability Flag):** To safely distinguish between production data and test data, EVERY core entity table (`users`, `tenants`, `orders`, etc.) MUST include a `is_test_data BOOLEAN DEFAULT FALSE NOT NULL` column. This allows administrative tools to safely manipulate test data without touching real user data.
```

### 🇹🇷 **Türkçesi:**

Gerçek üretim verisi ile test verisini **güvenli bir şekilde ayırt etmek** için, `users`, `tenants`, `orders` gibi her ana tabloya **`is_test_data BOOLEAN DEFAULT FALSE NOT NULL`** adında bir sütun eklenmesi **zorunludur**. Bu, idari araçların **gerçek kullanıcı verisine dokunmadan** test verisini güvenle manipüle etmesini sağlar.

## 🔧 **Adım 2: supabase.mdc'yi Bu Yeni Gerçeklikle Güncelleme**

Şimdi, `supabase.mdc`'deki `mcp-alchemy` kullanım kurallarını, bu yeni **`is_test_data`** sütununu dikkate alacak şekilde revize edelim. Bu, sana istediğin **esnekliği** verirken, **güvenliği** de en üst düzeye çıkarır.

### 📋 **supabase.mdc'nin revize edilmiş 5. Bölümü:**

```markdown
## 5. Direct Database Access & `mcp-alchemy` Integration

- **Rule 5.1 (Direct Connection is Permitted):** Direct connection to the underlying PostgreSQL database is permitted **exclusively for development, testing, and administrative tasks.** The connection string can be found in the Supabase Dashboard.

- **Rule 5.2 (CRITICAL SECURITY WARNING - RLS Bypass & Test Data Protocol):**
    - Be aware that a direct database connection using admin credentials **BYPASSES ALL ROW-LEVEL SECURITY (RLS) POLICIES**.
    - Therefore, any data manipulation (INSERT, UPDATE, DELETE) performed via a direct connection (like `mcp-alchemy`) **MUST** target rows where `is_test_data = TRUE`.
    - Modifying or deleting rows where `is_test_data = FALSE` via a direct connection is **STRICTLY FORBIDDEN** except in documented, emergency data-fix scenarios.
    - This protocol allows you to freely set up test scenarios without risking the integrity of real user data.

- **Rule 5.3 (`mcp-alchemy` Usage Protocol for Testing):** When using `mcp-alchemy` to prepare a test scenario:
    1.  **Create Test Entities:** First, create your test users and tenants, ensuring you set `is_test_data = TRUE`.
        ```sql
        -- Example: Create a test tenant and a user for it
        INSERT INTO tenants (id, tenant_type, is_test_data) VALUES ('...', 'BUSINESS', TRUE);
        INSERT INTO users (email, password_hash, tenant_id, is_test_data) VALUES ('test@example.com', '...', '...', TRUE);
        ```
    2.  **Manipulate Test Data:** Then, perform any necessary data setup for your test case, always including the `is_test_data = TRUE` flag.
        ```sql
        -- Example: Create a test order for the test user
        INSERT INTO orders (user_id, tenant_id, status, is_test_data) VALUES ('...', '...', 'PENDING', TRUE);
        ```
    3.  **State Your Intent:** Announce your actions for clarity. Example: "I will now use `mcp-alchemy` with a privileged connection to create a test order (`is_test_data = TRUE`) for the test user 'test@example.com'. I will then verify if this user can see this order through the RLS-protected API."

- **Rule 5.4 (The Final Verification Step):**
    - After setting up your test data with `mcp-alchemy` (which bypasses RLS), the crucial final step is to test the **user-facing API** using that test user's credentials.
    - This verifies that your RLS policies are written correctly, because the API call (using the Supabase Client) **WILL** enforce RLS.
    - **This is how you test an RLS-protected endpoint:** You use the "god mode" direct connection to set up the scene, and then you use the "user mode" API call to see if the user can actually see what you've set up for them.
```
## ✅ **Bu Çözümün Sağladığı Faydalar**

### 🔄 **Tam Esneklik**
`mcp-alchemy` ile RLS'i bypass ederek istediğin her türlü **karmaşık test senaryosunu**, veritabanını dilediğince şekillendirerek hazırlayabilirsin.

### 🛡️ **Maksimum Güvenlik**
`is_test_data` bayrağı, "yanlışlıkla" gerçek bir kullanıcının verisini değiştirmeni veya silmeni **neredeyse imkansız** hale getirir. Bu, **geliştirme ve üretim ortamları** arasında net bir ayrım sağlar.

### 🎯 **Gerçekçi Testler**
"Demo kullanıcı" gibi sahte bir konsept yerine, **gerçek kullanıcılar gibi davranan** ama test amaçlı olduğu bilinen varlıklar yaratırsın. Bu, **RLS politikalarını test etmeyi** çok daha anlamlı kılar.

### 🔄 **Doğru Test Akışı**
Bu yapı, seni **doğru test alışkanlığına** yönlendirir:

- **Adım A (God Mode):** `mcp-alchemy` ile veritabanını hazırla.
- **Adım B (User Mode):** API endpoint'ini, oluşturduğun test kullanıcısının kimliğiyle çağırarak RLS'in doğru çalışıp çalışmadığını doğrula.

## 🎯 **Sonuç**

Bu çözüm, **"son kullanıcıya veri sunan API'larda RLS'i bypass etme"** kuralını korurken, senin bu API'ları test etmek için ihtiyacın olan tüm veriyi **güvenli bir şekilde** oluşturmana ve yönetmene olanak tanır.