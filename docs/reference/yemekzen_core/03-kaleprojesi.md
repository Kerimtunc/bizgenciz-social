# Proje: Nöbetçi Kalesi (Sentry Fortress) - Uyarlanabilir Hibrit Güvenlik Mimarisi
## Teknik Uygulama Kılavuzu - Versiyon 2.0

### 1.0 Genel Bakış ve Hedefler
Bu belge, uygulama katmanında (Layer 7) çalışan, gelen trafiği sürekli olarak gözlemleyen, anormallikleri istatistiksel olarak tespit eden ve kötü niyetli trafiği ekonomik ve hesaplamalı olarak sürdürülemez hale getirmeyi amaçlayan, kendi kendini ayarlayabilen bir güvenlik sisteminin teknik özelliklerini tanımlar.

*   **Birincil Hedef:** Sunucu kaynaklarını korumak ve hizmet devamlılığını proaktif olarak sağlamak.
*   **İkincil Hedef:** Saldırının maliyetini asimetrik olarak saldırgana yüklemek.
*   **Tasarım Prensibi 1: Kademeli Savunma.** Tehdit seviyesine göre artan sertlikte yanıtlar vermek.
*   **Tasarım Prensibi 2: Veriye Dayalı, Uyarlanabilir Savunma.** Statik eşikler yerine, sistemin "normal" trafik desenini öğrenmesine ve sapmalara göre kendini ayarlamasına izin vermek.
*   **Tasarım Prensibi 3: Kontrollü Aktivasyon.** Yanlış alarmları önlemek ve normal kullanıcı deneyimini etkilememek için savunma mekanizmalarını yalnızca genel sistem yükü belirli bir eşiği aştığında devreye almak.

---

### 2.0 Teknoloji Yığını ve Gerekçelendirme
| Kategori | Seçilen Teknoloji | Gerekçe |
|---|---|---|
| **Backend Dili** | Node.js (LTS Sürümü) | Asenkron, non-blocking I/O yapısı sayesinde yüksek eşzamanlı ağ isteklerini ve veri analizini verimli yönetir. Kripto kütüphanesi olgun ve standarttır. |
| **In-Memory Veritabanı** | Redis | Anahtar-değer depolamada, sayaçlarda (INCR), listelerde (LPUSH/LTRIM) ve HASH veri yapılarında son derece hızlıdır. Bu mimarinin veri ve durum yönetimi omurgasıdır. |
| **Sunucu Kriptografisi** | Node.js `crypto` Modülü | Harici bağımlılık gerektirmez. Güvenli ve standarttır. ECDSA (P-256 curve) imzalama ve AES-256-GCM şifreleme için kullanılır. |
| **İstemci Tarafı** | Vanilla JavaScript (ES6+) | Harici kütüphane bağımlılığını sıfırlar, bu da saldırı yüzeyini küçültür ve performansı artırır. |
| **Arka Plan İşlemi** | Web Workers | Ağır hesaplama gerektiren PoW işlemini ana UI thread'inden izole ederek sayfanın donmasını (kilitlenmesini) engeller. |
| **İstemci Kripto** | Web Crypto API (`SubtleCrypto`) | Tarayıcıda yerleşik, güvenli ve donanım hızlandırma potansiyeli olan kripto API'sidir. SHA-256 için `crypto.subtle.digest` kullanılacaktır. |
| **Yapılandırma** | `.env` dosyası / Güvenli API | Başlangıç yapılandırmaları için `.env` dosyası. Çalışma zamanı (runtime) ayarları için aşağıda tanımlanan güvenli bir yönetim API'si. |

---

### 3.0 Redis Veri Modelleri ve Anahtar Yapısı
Tüm anahtarlar `sentry:` öneki ile gruplanacaktır.

| Anahtar Deseni | Tip | Amaç ve Açıklama | TTL (Ömür) |
|---|---|---|---|
| `sentry:config` | Hash | Sistemin tüm yapılandırma parametrelerini tutar: `activation_cpu_threshold`, `sensitivity_factor`, `global_rate_limit_active` vb. | Kalıcı |
| `sentry:state` | Hash | Sistemin anlık durumunu tutar: `current_mode` (NORMAL, DEFCON_1, DOOMSDAY), `last_incident_time`. | Kalıcı |
| `sentry:whitelist:set` | Set | Asla engellenmeyecek güvenilir IP adreslerinin kümesi. `SISMEMBER` ile kontrol edilir. | Kalıcı |
| `sentry:req_count:<ip_address>` | String (Sayaç) | Bir IP'nin son 5 saniyedeki istek sayısını tutar. `INCR` ile artırılır. | 5 Saniye |
| `sentry:penalty_box:<ip_address>` | String (İhlal Sayısı) | Bir IP'nin karantinada olup olmadığını ve kaçıncı kez ihlal yaptığını tutar. | Dinamik (15dk * Değer) |
| `sentry:trust_ticket:<ip_address>` | String (Değer: 1) | Başarılı PoW sonrası verilen güven biletini depolar. | 10 Dakika |
| `sentry:global_traffic_per_sec` | List | Son N dakikanın saniye başına toplam istek sayılarını tutar. `LPUSH` ile eklenir, `LTRIM` ile boyutu sabit tutulur. (Örn: son 300 saniye) | Dinamik (LTRIM) |
| `sentry:traffic_stats` | Hash | Arka plan işleminin periyodik olarak hesapladığı istatistikleri depolar: `mean` (ortalama), `std_dev` (standart sapma). | 1 Dakika |
| `sentry:used_nonces:<session_nonce>` | String (Değer: 1) | Tekrar saldırılarını (Replay Attacks) önlemek için kullanılmış PoW nonce'larını depolar. | 60 Saniye |

---

### 4.0 Çekirdek Algoritmaların Detaylı Açıklaması

#### 4.1 Arka Plan Analiz İşlemi (Periyodik olarak çalışır - örn. her dakika)
1.  `sentry:global_traffic_per_sec` listesindeki veriyi al.
2.  Bu verinin **aritmetik ortalamasını (`mean`)** ve **standart sapmasını (`std_dev`)** hesapla.
3.  Hesaplanan değerleri `sentry:traffic_stats` HASH'ine yaz: `HSET sentry:traffic_stats mean <değer> std_dev <değer>`.

#### 4.2 Gelen İstek İşleme Akışı (Her istek için çalışır)

**Adım 1: Hızlı Yol Kontrolleri (Fast Path)**
1.  Gelen isteğin IP'si `sentry:whitelist:set` içinde mi? Varsa, isteği doğrudan içeri al ve işlemi sonlandır.
2.  `sentry:trust_ticket:<ip_address>` var mı? Varsa, isteği içeri al ve işlemi sonlandır.

**Adım 2: Gözlem ve Aktivasyon Kapısı**
1.  IP bazlı sayacı artır: `INCR sentry:req_count:<ip_address>`.
2.  Global sistem yükünü (örn. CPU kullanımı veya saniye başına anlık istek sayısı) kontrol et.
3.  Eğer yük, `sentry:config` içindeki `activation_cpu_threshold` değerinin altındaysa, **savunma mekanizmasını çalıştırma**. İsteği içeri al ve işlemi sonlandır. *Bu, düşük trafikte yanlış alarmları önler.*

**Adım 3: Anomali Tespiti ve Nöbetçi Modu'nun Tetiklenmesi**
1.  Mevcut saniye başına global istek sayısını (`current_rate`) al.
2.  `sentry:traffic_stats` HASH'inden `mean` ve `std_dev` değerlerini oku.
3.  `sentry:config` HASH'inden `sensitivity_factor` (örn: 2.5 veya 3.0) değerini oku.
4.  **Dinamik Eşiği Hesapla:** `dynamic_threshold = mean + (std_dev * sensitivity_factor)`.
5.  **Karar:**
    *   **Eğer `current_rate` < `dynamic_threshold` ise:** Sistem normal kabul edilir. İsteği içeri al.
    *   **Eğer `current_rate` >= `dynamic_threshold` ise:** Sistem bir anormallik (potansiyel saldırı) altındadır. Şimdi bireysel IP'yi incele:
        a.  `sentry:req_count:<ip_address>` değerini al.
        b.  Eğer bu değer, `sentry:config` içindeki `ip_static_threshold` (örn: 15) değerinden büyükse, **Nöbetçi Modu'nu bu IP için başlat.**

**Adım 4: Nöbetçi Modu Paketi Oluşturma ve Gönderme (Sunucu Tarafı)**
*Bu bölüm, V1.0 ile büyük ölçüde aynıdır, ancak şimdi dinamik bir tetikleyiciye sahiptir.*
1.  **Session_Nonce** oluştur.
2.  PoW **Difficulty** değerini, IP'nin `penalty_box` geçmişine göre artan şekilde hesapla.
3.  Ana içeriği tek kullanımlık bir **AES-256-GCM** anahtarı ile şifrele.
4.  Payload, imza ve şifreli içeriği içeren kriptografik JSON paketini oluştur.
5.  Kullanılmış nonce'u kaydet: `SETEX sentry:used_nonces:<session_nonce> 60 1`.
6.  JSON paketini **429 "Too Many Requests"** durumuyla istemciye gönder.

**Adım 5: PoW Çözümü ve İçerik Gösterme (İstemci Tarafı)**
*Bu bölüm, V1.0 ile tamamen aynıdır.*
1.  Web Worker, 429 yanıtındaki paketi alır.
2.  Gerekli zorlukta bir SHA-256 hash'i bulana kadar `pow_nonce`'ı artırarak döngüye girer.
3.  Bulunan hash, **AES şifre çözme anahtarı** olarak kullanılır.
4.  Şifreli içerik çözülür ve sayfada görüntülenir.

**Adım 6: Kıyamet Modu Mantığı**
*Bu bölüm, V1.0 ile aynıdır, ancak aktivasyonu API üzerinden yapılır.*
1.  Yönetici, yönetim API'si üzerinden `sentry:state` içindeki `current_mode`'u `DOOMSDAY` olarak ayarlar.
2.  Sunucu (Ters Proxy veya Middleware), gelen her isteği yakalar, bu durumu kontrol eder ve sadece tüm JS/CSS'in gömülü olduğu `loader.html` dosyasını sunar.
3.  `loader.html`, çok yüksek zorlukta bir PoW başlatır ve çözüldüğünde siteyi istemci tarafında dinamik olarak oluşturur.

---

### 5.0 Yönetim ve Yapılandırma Katmanı (API)
Sistemin yönetimi ve ayarlanması için güvenli bir RESTful API tasarlanmalıdır. Bu API, ayrı bir port üzerinde çalışmalı ve sadece yönetici IP'lerinden erişilebilir olmalıdır.

*   `POST /sentry/config`: Sistemin yapılandırma parametrelerini günceller.
    *   `Body: { "sensitivity_factor": 3.0, "activation_cpu_threshold": 75, "ip_static_threshold": 20 }`
*   `GET /sentry/status`: Sistemin anlık durumunu ve istatistiklerini döndürür.
    *   `Response: { "current_mode": "DEFCON_1", "global_rate": 540, "stats": { "mean": 120.5, "std_dev": 45.2 } }`
*   `POST /sentry/mode`: Sistemin modunu manuel olarak değiştirir.
    *   `Body: { "mode": "DOOMSDAY" }` veya `{ "mode": "NORMAL" }`
*   `GET /sentry/whitelist`, `POST /sentry/whitelist`, `DELETE /sentry/whitelist`: Güvenilir IP listesini yönetir.

> **Geliştirme Notu / Araştırma Konusu:** Bu API'nin güvenliği hayati önem taşır. `JWT (JSON Web Tokens)` ile kimlik doğrulama, `rate limiting` ve `Joi` veya `class-validator` gibi kütüphanelerle girdi doğrulama (schema validation) konularını araştırın.

---

### 6.0 Güvenlik Değerlendirmeleri ve Sınırlamalar

*   **Katman 3/4 DDoS:** Bu mimari, uygulama katmanı (L7) odaklıdır ve volumetrik saldırılara karşı koruma sağlamaz. Bu, bir üst sağlayıcı (Cloudflare, AWS Shield vb.) koruması gerektirir.
*   **IP Adresi Güvenilirliği:** VPN veya Tor kullanan saldırganlar, IP'lerini kolayca değiştirebilir. İtibar sistemi ve artan zorluk, bunu maliyetli hale getirse de tamamen engellemez.
*   **Tekrar Saldırıları (Replay Attacks):** Bir saldırgan, geçerli bir PoW çözümünü yakalayıp tekrar gönderebilir.
    *   **Karşı Tedbir:** `sentry:used_nonces:<session_nonce>` anahtarı ile her nonce'un sadece bir kez kullanılmasının sağlanması bu riski ortadan kaldırır. Bu, planda mevcuttur.
*   **PoW Optimizasyonu:** Saldırgan, PoW'u tarayıcıdaki yavaş JavaScript yerine, optimize edilmiş bir C++/Rust programıyla veya GPU/ASIC ile çok daha hızlı çözebilir.
    *   **Karşı Tedbir:** Gelecekte, SHA-256 gibi CPU-yoğun bir algoritma yerine, bellek-yoğun (memory-hard) bir algoritma kullanmak düşünülebilir. Bu, özel donanımlarla optimizasyonu zorlaştırır.
    *   > **Geliştirme Notu / Araştırma Konusu:** **Argon2** algoritmasını ve bunu tarayıcıda verimli bir şekilde çalıştırmak için **WebAssembly (WASM)** teknolojisini araştırın. Bu, projenin sonraki evrim aşaması olabilir.

---

### 7.0 Uygulama Yol Haritası (Geliştirilmiş Fazlar)

1.  **Faz 0 (Kurulum, Gözlem ve Veri Toplama):**
    *   Tüm altyapıyı (Node.js, Redis, Proxy) kur.
    *   Sadece veri toplama mekanizmalarını kodla: IP ve global sayaçlar, `sentry:global_traffic_per_sec` listesine yazma.
    *   **Hiçbir engelleme veya PoW mekanizması aktive etme.**
    *   Yönetim API'sinin `GET /sentry/status` endpoint'ini ve basit bir arayüzü oluşturarak toplanan verileri (ortalama, standart sapma) **görselleştir**.
    *   **Hedef:** Sistemin "normal" durumunu tanımlamak için en az 1 hafta boyunca veri topla.

2.  **Faz 1 (Temel Savunma - MVP):**
    *   Faz 0'dan elde edilen verilere dayanarak, **statik eşiklerle** Nöbetçi Modu'nu hayata geçir. PoW oluşturma ve çözme döngüsünün kusursuz çalıştığından emin ol.
    *   Güven biletleri (`trust_ticket`) ve ceza kutusu (`penalty_box`) mekanizmalarını ekle.
    *   **Hedef:** Çalışan, temel bir koruma katmanı oluşturmak.

3.  **Faz 2 (Uyarlanabilir Savunma):**
    *   Statik eşikleri, Faz 0'da geliştirilen ve sürekli güncellenen **dinamik, istatistiksel eşiklerle** (mean + std_dev * sensitivity) değiştir.
    *   Sistemin sadece genel yük altında aktive olmasını sağlayan `activation_cpu_threshold` kapısını ekle.
    *   Yönetim API'sini tam olarak işlevsel hale getirerek tüm bu parametrelerin çalışma anında ayarlanabilmesini sağla.
    *   **Hedef:** Kendi kendine öğrenen ve uyum sağlayan akıllı bir savunma sistemi.

4.  **Faz 3 (Hayatta Kalma Kiti):**
    *   Kıyamet Modu için `loader.html` dosyasını ve manuel tetikleme mekanizmasını (API üzerinden) oluştur.
    *   Bu modun çalışmasını düzenli olarak test edecek bir acil durum tatbikat protokolü geliştir.
    *   **Hedef:** İşletme sürekliliği için "nükleer seçenek" sigortasını tamamlamak.