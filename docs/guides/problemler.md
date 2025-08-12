Harika bir inceleme talebi. Sağladığınız tüm kodları ve kuralları, kendi temel direktiflerim olan "Maksimum Kesinlik" ve "Yapısal Öncelik" aksiyomlarına dayanarak derinlemesine analiz ettim. Bu, sadece bir kod denetimi değil, projenizin mühendislik anayasasının tam bir analizidir.

Raporumu üç ana başlıkta sunuyorum:

## İçindekiler
- Hata 1: playwright.config.ts Dosyasında Çift Yapılandırma
- Hata 2: docker-compose.yml ve docker-compose.prod.yml Dosyalarında Sabitlenmemiş İmajlar
- Hata 3: deploy/systemd/bizgenciz-health.service Dosyasında Tekrarlanan Bölüm
- Hata 4: .env.local Dosyasında Eksik REDIS_URL
- Hata 5: next.config.js Dosyasında Tekrarlanan Güvenlik Başlığı
- Hata 6: jest.config.js ve Playwright Test Yolu Uyumsuzluğu
- Hata 7: tsconfig.json Dosyasında Gereksiz paths Tanımları
- Hata 8: Arşivlenmiş Dokümanlar ve Pasif Kurallar
- Hata 9: Test Stratejisi ve Kalite Güvencesi
- Hata 10: Observability ve Dayanıklılık

### Not
İncelenirken .mdc dosyalarının içerikleri hesaba katılmalıdır.

1. Tespit Edilen Hatalar ve Tutarsızlıklar

Bu bölümde, acil müdahale gerektiren, doğrudan hatalı veya birbiriyle çelişen yapılandırmalar listelenmiştir.

Hata 1: playwright.config.ts Dosyasında Çift Yapılandırma
  
### Tespit
playwright.config.ts dosyası içerisinde iki adet export default defineConfig bloğu bulunmaktadır. Bu, geçerli bir JavaScript/TypeScript sözdizimi değildir ve dosyanın çalışmasını engelleyecektir.
  
### Etki
İki yapılandırmanın çakışması, çalıştırılabilirlik sorunlarına ve hatalı test yapılandırmasına yol açabilir.
  
### Çözüm
İki yapılandırmanın birleştirilerek tek bir geçerli konfigürasyon oluşturulması gerekmektedir.

playwright.config.ts dosyası içerisinde iki adet export default defineConfig bloğu bulunmaktadır. Bu, geçerli bir JavaScript/TypeScript sözdizimi değildir ve dosyanın çalışmasını engelleyecektir. İki yapılandırmanın birleştirilerek tek bir geçerli konfigürasyon oluşturulması gerekmektedir.

Hata 2: docker-compose.yml ve docker-compose.prod.yml Dosyalarında Sabitlenmemiş Imajlar

Her iki Docker Compose dosyasında da postgres ve redis imajları için sha256 digest'leri 1234567890abcdef... gibi bir yer tutucu (placeholder) ile belirtilmiştir. Bu durum, projenin PROTOCOL_0_COMPLIANCE.md dosyasında belirtilen "Mutlak Tekrarlanabilirlik (Absolute Reproducibility)" ilkesini doğrudan ihlal etmektedir. Gerçek ve sabitlenmiş SHA256 digest'leri kullanılmalıdır.

Hata 3: deploy/systemd/bizgenciz-health.service Dosyasında Tekrarlanan Bölüm

Bu systemd servis dosyasında [Install] bölümü iki kez tekrar edilmiştir. Bu bir sözdizimi hatasıdır ve systemd tarafından servis yüklenirken hataya neden olabilir.

Hata 4: .env.local Dosyasında Eksik REDIS_URL

.env ve .env.bak dosyalarında REDIS_URL tanımlanmışken, projenin öncelikli olarak kullanacağı anlaşılan .env.local dosyasında bu değişken eksiktir. lib/redis.ts dosyası bu değişkene ihtiyaç duymaktadır. Bu durum, scripts/validate-env.mjs betiği çalıştırıldığında muhtemelen bir hataya yol açacaktır.

Hata 5: next.config.js Dosyasında Tekrarlanan Güvenlik Başlığı

next.config.js dosyasındaki headers fonksiyonunda X-Content-Type-Options başlığı iki kez tanımlanmıştır. Bu bir hata olmasa da gereksiz bir tekrardır ve kafa karışıklığına yol açabilir.

Hata 6: jest.config.js ve Playwright Test Yolu Uyumsuzluğu

jest.config.js dosyası, testPathIgnorePatterns ile '<rootDir>/tests/e2e/' dizinini test kapsamı dışında bırakmaktadır. Ancak playwright.config.ts dosyası, E2E testlerinin tests/web dizininde olduğunu belirtmektedir. Bu yolların birbiriyle tutarlı olması gerekir. Mevcut durumda birbiriyle ilgisiz iki farklı E2E test klasörü varsayımı bulunmaktadır.

Hata 7: tsconfig.json Dosyasında Gereksiz paths Tanımları

tsconfig.json dosyasındaki paths altında @/components/*, @/lib/* gibi alias'lar zaten @/* alias'ı tarafından kapsanmaktadır. Bu durum yapılandırmayı gereksiz yere karmaşıklaştırmaktadır. Sadece @/* alias'ının bırakılması yeterlidir.

2. İyileştirme ve Otomasyon Fırsatları

Bu bölümde, mevcut sistemin felsefesine sadık kalarak, manuel süreçleri otomatikleştirerek ve verimliliği artırarak projeyi daha da ileriye taşıyacak öneriler bulunmaktadır.

Fırsat 1: Görev Tamamlama ve Arşivleme Sürecinin Otomasyonu

Mevcut Durum: 0-genel.mdc (Kural 2.1), tamamlanan bir görevin bilgilerinin technical_memory_archive tablosuna manuel bir SQL komutu ile eklenmesini ve ardından kütüphane dosyasından silinmesini şart koşuyor.

Potansiyel Sorun: Bu sürecin tamamen manuel olması, unutulmaya, tutarsızlıklara ve hatalara son derece açıktır.

İyileştirme Önerisi: Bu iş akışını otomatikleştiren bir script (npm run task:archive <TASK_CODE>) oluşturulmalıdır. Bu script:

İlgili kütüphane dosyasından (db_kutuphane.md vb.) [TASK_CODE] ile ilişkili bölümü bulur.

insankontrol.md dosyasını kontrol ederek görevin "review status" bilgisini alır.

Tüm bu verileri birleştirerek technical_memory_archive tablosuna ekler.

Başarılı olursa, kütüphane dosyasındaki ilgili bölümü temizler.
Bu otomasyon, sistemin "öğrenme" döngüsünün en kritik parçasını güvence altına alır.

Fırsat 2: API ve Tasarım Sistemi Sözleşmelerinin Otomatik Senkronizasyonu

Mevcut Durum: 0-genel.mdc (Kural 2.3), API (anayapi.md) veya Tasarım Sistemi (tasarim-sistemi.md) değiştiğinde ilgili sözleşme dosyalarının "anında" güncellenmesi gerektiğini belirtiyor.

Potansiyel Sorun: "Anında" kelimesi, otomasyon olmadan gerçekçi değildir. Bu, geliştiricinin disiplinine bırakılmış, kritik bir adımdır.

İyileştirme Önerisi: API ve Tasarım Sistemi ile ilgili dosyalarda değişiklik yapıldığında bu durumu tespit edip, ilgili sözleşme dosyalarının güncellenmesi gerektiğini hatırlatan veya doğrudan güncelleyen bir pre-commit hook (Husky ile) oluşturulmalıdır. Bu, projenin sözleşme bütünlüğünü garanti altına alır.

Fırsat 3: Test Verisi Yönetiminin Otomasyonu

Mevcut Durum: supabase.mdc (Kural 5.3), test senaryoları için is_test_data = TRUE bayrağı ile veri oluşturma protokolünü detaylı bir şekilde açıklıyor. Bu süreç, mcp-alchemy gibi araçlarla manuel SQL komutları çalıştırmayı gerektiriyor.

Potansiyel Sorun: E2E testlerinin kurulumu (setup) için her seferinde manuel komutlar yazmak yavaş ve hataya açıktır.

İyileştirme Önerisi: Test senaryolarını (örneğin, "reddedilmiş sipariş senaryosu", "yeni kullanıcı kayıt senaryosu") tanımlayan ve ilgili test verilerini otomatik olarak oluşturan npm run test:setup <scenario_name> gibi bir script oluşturulmalıdır. Bu, testlerin tekrarlanabilirliğini ve hızını önemli ölçüde artırır.

Fırsat 4: Arşivlenmiş ve Pasif Kuralların Temizlenmesi

Mevcut Durum: Projede docs/project/archived/ altında birçok eski kural dosyası ve docs/mdc_project/vitest-pasif.mdc gibi "pasif" olarak işaretlenmiş dosyalar bulunmaktadır. docs/project/archived/vitest-neden-pasif.md dosyası, Vitest yerine Jest'in standart olarak seçildiğini açıklamaktadır.

Potansiyel Sorun: Bu dosyalar, yeni bir geliştirici veya AI için kafa karışıklığına neden olabilir ve projenin "tek doğruluk kaynağı" ilkesini zayıflatabilir.

İyileştirme Önerisi: Proje standardı olarak kabul edilen Jest dışındaki test araçlarına ait tüm pasif/arşivlenmiş .mdc dosyaları temizlenmelidir. Karar mekanizmasını açıklayan vitest-neden-pasif.md gibi dosyalar docs/reference/architectural-decisions/ gibi bir klasöre taşınarak arşivlenebilir.

Fırsat 5: WBS Şablonu ve Mimar Protokolü Arasındaki Yetki Çatışmasının Netleştirilmesi

Mevcut Durum: 0-genel.mdc (Principle 1), basit görevler için standart bir İş Kırılım Yapısı (WBS) şablonu sunarken, md.mdc (Principle 5) TÜM görev planlama kararları üzerinde "özel yetkiye" sahip olduğunu belirtir.

Potansiyel Sorun: Bu iki kural arasında hiyerarşik bir belirsizlik vardır. Hangi kuralın ne zaman öncelikli olduğu net değildir.

İyileştirme Önerisi: md.mdc dosyasında bu ilişki netleştirilmelidir. Örneğin: "Principle 5, bir görevin karmaşıklığını değerlendirir. Eğer görev "basit" olarak sınıflandırılırsa, 0-genel.mdc içerisindeki standart şablonun kullanımına izin verir. Aksi takdirde, bu protokole göre özel bir plan sentezler." Bu açıklama, iki kural arasındaki hiyerarşiyi netleştirir.

3. Genel Değerlendirme ve Dikkat Çeken Noktalar

Bu proje, gördüğüm en kapsamlı ve disiplinli mühendislik anayasalarından birine sahip. Bu, projenin kalitesini, sürdürülebilirliğini ve güvenliğini en üst düzeye çıkarmak için tasarlanmış son derece olgun bir yaklaşımdır.

Güçlü Yönler:

Aksiyomatik Temel: Proje, rastgele kararlar yerine kanıtlanabilir, mantıksal aksiyomlar üzerine inşa edilmiştir. cekirdek.mdc ve 0-genel.mdc dosyaları, projenin ruhunu ve beynini oluşturur.

"Plan Before Execution" Felsefesi: WBS (İş Kırılım Yapısı) ve deterministik iş akışı sentezi zorunluluğu, hataları kod yazılmadan önce yakalamayı hedefler.

Güvenlik ve Kalite Takıntısı: Her kural setinde (SQL'den TSX'e) güvenlik, performans ve kalite proaktif olarak ele alınmıştır. "BugBot Mode" konsepti, AI'ın sadece bir kod yazıcı değil, aynı zamanda bir kalite güvence mühendisi gibi davranmasını sağlar.

İnsan-AI Geri Bildirim Döngüsü: insankontrol.md ve arşivleme protokolü, AI'ın insan denetiminden öğrenmesi için tasarlanmış sofistike bir mekanizmadır. Bu, uzun vadede sistemin kendi kendini iyileştirmesini sağlar.

Mükemmel Dokümantasyon: Proje, kendi kendini belgeleyen bir yapıya sahiptir. Özellikle sql.mdc'deki _meta_description sütunu gibi konseptler, sistemin bağlamsal farkındalığını artırmak için tasarlanmıştır.

Potansiyel Riskler ve Zayıf Yönler:

Aşırı Karmaşıklık ve Kural Yükü: Sistemin en büyük gücü, aynı zamanda en büyük zayıflığıdır. Kuralların sayısı ve detayı o kadar fazladır ki, eğer bu kuralları uygulayan süreçler otomatikleştirilmezse, insan geliştiricilerin (veya daha az gelişmiş AI'ların) bu kurallara uyması neredeyse imkansız hale gelir. Bu durum, "kural çürümesine" (rule decay) yol açabilir.

Manuel Süreçlere Bağımlılık: Yukarıda "Otomasyon Fırsatları" bölümünde belirtildiği gibi, arşivleme ve senkronizasyon gibi kritik süreçlerin manuel olması, sistemin en zayıf halkasıdır. Bir geliştiricinin bu adımları atlaması, sistemin bütünlüğünü ve öğrenme yeteneğini tehlikeye atar.

Sonuç:

Bu proje, doğru bir şekilde uygulandığında son derece sağlam, güvenli ve ölçeklenebilir bir yazılım üretme potansiyeline sahip bir mühendislik manifestosudur. Başarı için en kritik faktör, belirtilen manuel süreçlerin acilen otomatize edilmesidir. Kurallar ne kadar iyi olursa olsun, onları uygulayan sistemler otomatik ve zorunlu olmadıkça etkinliklerini yitirirler.

Ben bir "agent" olarak, bu hataları düzeltmek ve önerilen otomasyonları hayata geçirmek için hazırım.

Elbette, tespit ettiğim tüm hataları, projenizin kendi kuralları ve genel yazılım mühendisliği prensipleri çerçevesinde, olabildiğince detaylı bir şekilde listeliyorum.

Hataları daha anlaşılır kılmak için kategorilere ayırdım:

1. Kritik Yapılandırma ve Sözdizimi Hataları

Bu hatalar, uygulamanın derlenmesini, testlerin çalışmasını veya servislerin başlamasını doğrudan engelleyecek problemlerdir.

Dosya: playwright.config.ts

Hata: Dosya içerisinde iki adet export default defineConfig(...) bloğu bulunmaktadır.

Neden Hata?: Bir modül (dosya) içerisinde yalnızca bir adet export default olabilir. Bu durum bir JavaScript/TypeScript sözdizimi hatasıdır ve Playwright bu yapılandırmayı okuyamaz.

Dosya: docker-compose.yml ve docker-compose.prod.yml

Hata: postgres ve redis imajları için belirtilen sha256 digest'leri (@sha256:1234567890abcdef...) geçersiz birer yer tutucudur.

Neden Hata?: Docker Compose, bu imajları Docker Hub'dan çekerken bu digest'leri bulamayacak ve servisleri başlatamayacaktır. Bu durum, projenin kendi PROTOCOL_0_COMPLIANCE.md dosyasında zorunlu kıldığı "Mutlak Tekrarlanabilirlik" ilkesini ihlal eder.

Dosya: deploy/systemd/bizgenciz-health.service

Hata: Dosyanın sonunda [Install] bölümü iki kez tekrar edilmiştir.

Neden Hata?: Bu, systemd birim dosyası için bir sözdizimi hatasıdır. systemctl daemon-reload komutu çalıştırıldığında systemd bu servisi yükleyemez ve hata verir.

Dosya: .env.local

Hata: lib/redis.ts dosyasının ihtiyaç duyduğu REDIS_URL ortam değişkeni bu dosyada tanımlanmamıştır. Diğer .env dosyalarında varken, en öncelikli olan bu dosyada yoktur.

Neden Hata?: Uygulama başladığında Redis'e bağlanmaya çalışırken bu değişkeni bulamayacak ve çalışma zamanı hatası (runtime error) vererek çökecektir.

2. Proje Kuralları ve Mantıksal Tutarsızlıklar

Bu hatalar, projenin kendi mühendislik anayasası olan .mdc dosyalarındaki kuralları doğrudan ihlal eden veya dosyalar arasında mantıksal çelişkiler yaratan durumlardır.

Dosyalar: app/page.tsx ve app/panel/page.tsx

Hata: Bu iki dosyanın içeriği tamamen aynıdır.

Neden Hata?: Bu, "Kendini Tekrar Etme" (Don't Repeat Yourself - DRY) prensibinin ciddi bir ihlalidir. Birinde yapılacak bir değişiklik diğerinde unutulabilir, bu da tutarsızlığa ve bakım maliyetinin artmasına yol açar. Bu sayfalardan biri kaldırılmalı veya ortak bileşenlere bölünmelidir.

Dosyalar: app/page.tsx ve app/panel/page.tsx (İçerik)

Hata: Arayüzdeki "Toplam Ürün", "Kategoriler" gibi metriklerin değerleri statik olarak 0 olarak kodlanmıştır.

Neden Hata?: Bu durum, 0-genel.mdc dosyasındaki Directive 4 (Yasak: Statik Veri) kuralını doğrudan ihlal eder. Bu kural, "UI'da gösterilen veya kodda kullanılan hiçbir veri statik olamaz. Tüm veriler veritabanından kaynaklanmalıdır." demektedir. Bu, sadece bir kural ihlali değil, aynı zamanda kullanıcıya yanlış bilgi gösteren bir mantık hatasıdır.

Dosyalar: jest.config.js ve playwright.config.ts

Hata: Jest yapılandırması E2E testlerini tests/e2e/ dizininde beklerken, Playwright yapılandırması testlerin tests/web/ dizininde olduğunu belirtiyor.

Neden Hata?: Bu durum, proje yapısında bir tutarsızlık olduğunu gösterir. Testlerin nerede olduğu belirsizdir ve iki farklı yapılandırma birbiriyle çelişmektedir. Tek ve tutarlı bir test dizin yapısı olmalıdır.

Dosya: scripts/health-check.mjs

Hata: Sağlık kontrolü betiği, Supabase veritabanında groups, users, todos gibi projeyle ilgisiz olabilecek varsayılan tabloları sorgulamaya çalışmaktadır.

Neden Hata?: Bu, betiğin projenin gerçek şemasıyla uyumsuz olduğunu ve büyük olasılıkla her zaman başarısız olacağını gösterir. SUPABASE_HEALTH_TABLE ortam değişkeni ile bu durum düzeltilebilse de, varsayılan davranışın hatalı olması bir mantık kusurudur.

3. Kod Kalitesi ve "Code Smell" Hataları

Bu kategorideki maddeler, uygulamayı kırmasa da bakımı zorlaştıran, okunabilirliği düşüren ve gelecekte hatalara yol açma potansiyeli olan "kötü kokan kod" (code smell) örnekleridir.

Dosya: next.config.js

Hata: headers fonksiyonu içinde X-Content-Type-Options başlığı iki kez tanımlanmıştır.

Neden Hata?: Bu bir işlevsellik hatası yaratmaz ancak gereksiz kod tekrarıdır ve yapılandırmanın okunmasını zorlaştırır.

Dosya: tsconfig.json

Hata: paths altında tanımlanan @/components/*, @/lib/* gibi alias'lar, zaten mevcut olan @/* tarafından kapsanmaktadır.

Neden Hata?: Gereksiz ve daha spesifik olan bu alias'lar, yapılandırmayı kalabalıklaştırır ve kafa karışıklığına yol açabilir. Tek ve genel bir alias (@/*) yeterlidir.

Dosya: Dockerfile

Hata: Dosyanın en altında, runner aşamasından sonra tamamen farklı bir mantıkla ikinci bir builder ve runner aşaması tanımlanmıştır.

Neden Hata?: Bu, muhtemelen bir kopyala-yapıştır hatasıdır. Dockerfile'ın sadece bir tane nihai runner aşaması olmalıdır. Alttaki fazlalık bölüm, imajın hatalı veya beklenmedik şekilde oluşmasına neden olabilir ve kesinlikle temizlenmelidir.

Dosyalar: docs/project/archived/ ve docs/mdc_project/vitest-pasif.mdc

Hata: Projenin aktif olmayan, arşivlenmiş veya pasif hale getirilmiş kural ve doküman dosyalarını içermesi.

Neden Hata?: Bu durum, projenin "tek doğruluk kaynağı" ilkesini zayıflatır. Yeni bir geliştirici veya AI, hangi kuralların geçerli olduğu konusunda kafa karışıklığı yaşayabilir. Karar süreçlerini açıklayan dokümanlar korunmalı, ancak geçersiz kural setleri temizlenmelidir.

I. Kategori: Kritik Güvenlik Zafiyetleri ve Mimari Kusurlar
Bu kategorideki sorunlar, uygulamanın güvenliğini, stabilitesini ve veri bütünlüğünü doğrudan tehdit eden, acil müdahale gerektiren sistemik hatalardır.
Zafiyet 1: "Sağlık Kontrolü" Yanılsaması ve Yanlış Güven Hissi
Dosya: app/api/health/route.ts
Tespit: Veritabanı sağlık kontrolü, Supabase PostgREST arayüzü başarısız olduğunda, doğrudan bir PostgreSQL (pg) bağlantısı kurarak bir "B planı" deniyor.
Derin Analiz: Bu, mimari bir anti-patterndir ve son derece tehlikelidir. Bir sağlık kontrolünün tek amacı, uygulamanın kendi normal operasyonel yoluyla bağımlılıklarına ulaşıp ulaşamadığını doğrulamaktır. Uygulamanız normalde Prisma'nın bağlantı havuzunu (connection pool) kullanır. Bu havuz tükenmiş, kilitlenmiş veya hatalı yapılandırılmış olabilir. Bu durumda, uygulamanız veritabanına erişemezken, bu "sağlık kontrolü" yeni bir direkt bağlantı açarak yanlış bir şekilde "her şey yolunda" raporu verecektir. Bu, size yanlış bir güvenlik hissi verirken uygulamanızın aslında çalışmadığı bir "split-brain" senaryosu yaratır. Çözüm: Fallback (B planı) mantığı tamamen kaldırılmalıdır. Sağlık kontrolü, uygulamanın kullandığı prisma istemcisi üzerinden yapılmalıdır.
Zafiyet 2: Kurulmuş ama Kullanılmayan Güvenlik Kalkanları
Dosya: lib/redis.ts
Tespit: Redis servisinizde checkRateLimit gibi brute-force ve DoS saldırılarına karşı kritik öneme sahip bir fonksiyon tanımlanmış.
Derin Analiz: Projenin hiçbir yerinde bu fonksiyon kullanılmıyor. API endpoint'leriniz, giriş (login) denemeleriniz veya diğer hassas işlemleriniz, istek sınırlaması olmadan tamamen savunmasız durumdadır. Bu, çelik bir kapıyı alıp duvara dayamakla aynı şeydir; var olması bir anlam ifade etmez. Çözüm: Hassas API endpoint'leri ve özellikle kimlik doğrulama rotaları, bir middleware aracılığıyla bu rate limiting fonksiyonu ile acilen korunmalıdır.
Zafiyet 3: Çevre Değişkeni (Environment Variable) Kaosu
Dosyalar: .env, .env.bak, .env.local, .env.local.bak
Tespit: Proje kök dizininde birbiriyle tutarsız olabilecek dört farklı .env dosyası bulunmaktadır.
Derin Analiz: Bu durum, "tek doğruluk kaynağı" ilkesini yok eder. Hangi ortamda hangi değişkenin geçerli olduğu belirsizleşir. Bir geliştirici yanlış dosyayı değiştirdiğinde, saatler sürecek ve anlaşılması zor hatalar ortaya çıkar. Ayrıca, bu dosyalarda gerçek "secret"ların (API anahtarları) bulunması, bunların yanlışlıkla Git geçmişine sızma riskini doğurur. Çözüm: Tüm .bak dosyaları silinmeli, sadece .env.example (şablon) ve .env.local (yerel ayarlar, .gitignore içinde) kalmalıdır.
II. Kategori: Performans ve Verimlilik Engelleri
Bu sorunlar, uygulamanın yavaşlamasına, sunucu maliyetlerinin artmasına ve geliştirici verimliliğinin düşmesine neden olacak darboğazlardır.
Performans Sorunu 1: Antika Derleme Hedefi
Dosya: tsconfig.json
Tespit: compilerOptions altında target: "es5" olarak ayarlanmıştır.
Derin Analiz: ES5, 2009 yılına ait bir standarttır. Next.js 15 gibi modern bir framework'ü bu hedefe derlemek, tarayıcıların doğal olarak anladığı modern JavaScript özelliklerinin (async/await, arrow functions vb.) aşırı derecede karmaşık ve yavaş "polyfill" edilmiş kodlara dönüştürülmesine neden olur. Bu, paket boyutunu (bundle size) gereksiz yere şişirir ve istemci tarafı performansını düşürür. Çözüm: Bu hedef, en azından "es2020" veya daha modern bir sürüme yükseltilmelidir.
Performans Sorunu 2: Bağımlılık Şişkinliği (Dependency Bloat)
Dosya: package.json
Tespit: @playwright/test gibi sadece geliştirme ve test sırasında gereken bir bağımlılık, dependencies bölümünde yer alıyor.
Derin Analiz: Bu, production build'i alındığında node_modules klasörünün gereksiz yere şişmesine neden olur. Docker imaj boyutu artar, npm ci süresi uzar ve potansiyel güvenlik taramalarında fazladan uyarılar çıkar. Çözüm: Sadece geliştirme/test için gereken tüm paketler devDependencies bölümüne taşınmalıdır.
III. Kategori: CI/CD ve Otomasyon Tiyatrosu ("CI/CD Theatre")
Bu kategori, bir CI/CD süreciniz varmış gibi görünse de, aslında kaliteyi veya güvenliği garanti etmeyen "göstermelik" otomasyonları içerir.
CI Sorunu 1: Sahte Testler ve Eksik Kalite Kapıları
Dosyalar: package.json, .github/workflows/ci.yml
Tespit: Tüm test scriptleri (test, test:e2e, test:coverage) process.exit(0) komutuyla anında ve hatasız sonlanacak şekilde ayarlanmış. CI pipeline'ı ise "Skip tests (archived)" mesajıyla bu adımı atlıyor.
Derin Analiz: Proje, test altyapısına sahip olduğunu iddia ediyor ancak gerçekte hiçbir testi çalıştırmıyor. Bu, projenin en kırılgan noktasıdır. Linting ve type-checking gibi adımlar mevcut olsa da, iş mantığını doğrulayan hiçbir otomatik kalite kapısı yoktur. Bu, CI sürecinin sadece bir formaliteden ibaret olduğu anlamına gelir. Çözüm: Sahte script'ler kaldırılmalı ve projenin .mdc dosyalarında detaylandırılan test stratejisine uygun, gerçek birim ve E2E testleri yazılarak CI pipeline'ına entegre edilmelidir.
CI Sorunu 2: Eksik ve Yorum Satırına Alınmış Doğrulama Adımları
Dosya: .github/workflows/ci.yml
Tespit: Docker imajı build edildikten sonra, onu çalıştırıp sağlık durumunu kontrol edecek olan docker run adımı yorum satırına alınmıştır.
Derin Analiz: Bir Docker imajını sadece "build" etmek, onun çalışacağını garanti etmez. Ortam değişkeni eksiklikleri, başlangıç scripti hataları veya port çakışmaları gibi sorunlar ancak docker run aşamasında ortaya çıkar. Bu adımı atlamak, CI'ın "başarılı" dediği bir imajın production'da çökmesine neden olabilir. Çözüm: GitHub Secrets kullanılarak güvenli bir şekilde gerekli ortam değişkenleri sağlanmalı ve docker run ile en azından /api/health endpoint'ini kontrol eden bir smoke test adımı eklenmelidir.
Stratejik Sonuç ve Eylem Planı
Projeniz, kağıt üzerinde mükemmel bir mimariye sahipken, uygulamada bu mimarinin temel prensiplerini ihlal eden kritik kusurlar barındırıyor. "Mış gibi yapmak" (Performative Engineering) olarak adlandırılabilecek bu durum, projenin en büyük riskidir.
Acil Eylem Planı:
Güvenliği Sağlayın: Sağlık kontrolü mantığını düzeltin ve rate limiting'i derhal devreye alın.
Yapılandırmayı Temizleyin: playwright.config.ts ve Dockerfile'daki bariz hataları düzeltin. .env kaosunu sonlandırın.
Anayasaya Uyun: Statik verileri dinamik hale getirin, imajları sha256 ile sabitleyin ve test yollarını tutarlı hale getirin.
Performansı İyileştirin: tsconfig.json'daki derleme hedefini modernleştirin ve bağımlılıkları doğru kategorilere ayırın.
Otomasyon Tiyatrosuna Son Verin: Sahte test script'lerini silin ve CI pipeline'ına en azından bir adet gerçek E2E smoke test ve Docker run kontrolü ekleyin.
Bu adımlar, projenizin vizyonu ile gerçekliği arasındaki tehlikeli boşluğu kapatmak için atılması gereken minimum adımlardır.

Anlaştık. .mdc dosyalarındaki felsefi tartışmaları bir kenara bırakarak, doğrudan projenizin kod, yapılandırma ve otomasyon katmanlarındaki en kritik ve en çok sorun gördüğüm 10 kategoriyi belirledim.

Stratejimiz şu şekilde olacak: Her bir mesajda, bu 10 kategoriden birine odaklanacağım. O kategoriye ait tüm hataları, zafiyetleri, tutarsızlıkları ve potansiyel riskleri, kök neden analizleriyle birlikte en ince detayına kadar ortaya koyacağım.

En yüksek öncelikli ve projenin güvenilirliğini en temelden sarsan kategori ile başlıyoruz.

Kategori 1: CI/CD ve Otomasyon Güvenilirliği - "Göstermelik" Kalite Kapıları

Bu kategoriyi birinci sıraya koymamın sebebi, projenin modern yazılım geliştirmenin bel kemiği olan otomatik kalite güvence mekanizmasının sadece bozuk olması değil, aldatıcı olmasıdır. Mevcut CI/CD (Sürekli Entegrasyon/Sürekli Dağıtım) yapısı, bir kalite kontrol mekanizması gibi görünürken aslında hiçbir şeyi doğrulamayan bir "otomasyon tiyatrosu" sergilemektedir. Bu durum, hiçbir CI/CD olmamasından daha tehlikelidir çünkü sahte bir güvenlik hissi yaratır.

Aşağıda bu kategorideki tüm hataları detaylandırıyorum:

Hata 1.1: Sahte Test Komut Dosyaları (Fake Test Scripts)

Tespit Edilen Dosya: package.json

Hatalı Kod:

code
JSON
download
content_copy
expand_less

"scripts": {
  "test": "node -e \"process.exit(0)\"",
  "test:watch": "node -e \"process.exit(0)\"",
  "test:coverage": "node -e \"process.exit(0)\"",
  "test:e2e": "node -e \"process.exit(0)\"",
  // ... ve diğer tüm test komutları
}

Detaylı Analiz: Projenin package.json dosyasındaki test ile ilgili tüm script'ler, hiçbir test çalıştırmadan doğrudan ve her zaman başarılı (exit 0) olarak sonlanan bir komutla doldurulmuştur. Bu, projenin test altyapısının tamamen işlevsiz olduğu anlamına gelir. jest.config.js ve playwright.config.ts gibi yapılandırma dosyaları mevcut olsa da, onları tetikleyecek geçerli bir mekanizma yoktur.

Etkisi:

Sıfır Kalite Güvencesi: Koda eklenen yeni bir özellik veya yapılan bir değişiklik, mevcut işlevselliği bozduğunda bunu tespit edecek hiçbir otomatik kontrol yoktur.

Yanlış Güvenlik Hissi: Bir geliştirici npm test komutunu çalıştırdığında, testlerin "başarılı" olduğunu görerek her şeyin yolunda olduğunu düşünebilir, oysa gerçekte hiçbir şey test edilmemiştir.

CI Entegrasyonunun Anlamsızlığı: Bu script'leri CI pipeline'ında çalıştırmak, pipeline'ın her zaman yeşil yanmasına neden olur ve kalite kontrol adımını tamamen anlamsız kılar.

Çözüm:

Tüm sahte test script'leri derhal kaldırılmalıdır.

test script'i, jest komutunu çalıştıracak şekilde güncellenmelidir.

test:e2e script'i, playwright test komutunu çalıştıracak şekilde güncellenmelidir.

Projenin test anayasasına (jest.mdc, playwright.mdc) uygun olarak en azından birkaç temel "smoke test" yazılarak bu script'lerin gerçekten çalıştığı doğrulanmalıdır.

Hata 1.2: CI Akışında Testlerin Kasıtlı Olarak Atlanması

Tespit Edilen Dosya: .github/workflows/ci.yml

Hatalı Kod:

code
Yaml
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
- name: Skip tests (archived)
  run: echo "Tests archived. See docs/reference/tests-archive."

Detaylı Analiz: CI pipeline'ı, testlerin çalıştırılması gereken yerde, bilinçli olarak testleri atlayan bir adım içeriyor. Bu, yukarıdaki sahte test script'lerinin bir sonucudur ve sorunu daha da derinleştirir. CI akışı, testlerin olmadığını veya "arşivlendiğini" kabul ederek kalite kontrol adımını tamamen bypass etmektedir.

Etkisi: GitHub'da bir Pull Request açıldığında veya main branch'ine bir kod birleştirildiğinde, yeşil görünen onay işareti aslında kodun kalitesi hakkında hiçbir bilgi vermez. Bu, projenin en temel güvenlik ağının olmadığını gösterir.

Çözüm: Bu "Skip tests" adımı derhal kaldırılmalı ve yerine npm test ve npm run test:e2e komutlarını çalıştıran adımlar eklenmelidir.

Hata 1.3: Docker İmajının Çalışabilirliğinin Doğrulanmaması

Tespit Edilen Dosya: .github/workflows/ci.yml

Hatalı Kod:

code
Yaml
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
# Docker run (smoke) with health probe removed to avoid secrets exposure in runner logs.
# If you want to enable an optional smoke run, set up a separate protected workflow with required secrets.

(Docker run adımının tamamen yorum satırı olması veya hiç olmaması)

Detaylı Analiz: CI pipeline'ı bir Docker imajı oluşturuyor (docker build), ancak bu imajın gerçekten çalışıp çalışmadığını, yani bir konteyner olarak ayağa kalkıp temel işlevlerini yerine getirip getirmediğini asla kontrol etmiyor. Bir imajın başarıyla "build" edilmesi, onun çalışacağı anlamına gelmez. Eksik bir node_modules kopyalaması, yanlış CMD komutu veya başlangıçta çöken bir script gibi hatalar sadece docker run aşamasında ortaya çıkar.

Etkisi: CI pipeline'ı, production ortamında asla çalışmayacak bozuk imajları "başarılı" olarak etiketleyebilir. Bu, hatanın tespitini geliştirme döngüsünün en sonuna, yani deployment anına erteleyerek maliyeti ve riski katbekat artırır.

Çözüm:

CI pipeline'ına, docker build adımından sonra bir docker run adımı eklenmelidir.

Bu adım, konteyneri arka planda (-d bayrağı ile) başlatmalı ve birkaç saniye bekledikten sonra curl veya benzeri bir araçla /api/health endpoint'ini sorgulayan bir "smoke test" yapmalıdır.

Gerekli minimum ortam değişkenleri (Supabase URL/Key gibi), GitHub Secrets aracılığıyla güvenli bir şekilde bu adıma sağlanmalıdır.

Hata 1.4: Çapraz Platform İddiasının Otomasyonla Desteklenmemesi

Tespit Edilen Dosyalar: README.md, PORTABILITY.md, .github/workflows/ci.yml

Tespit: Dokümantasyon, projenin Windows, Ubuntu ve macOS üzerinde test edildiğini iddia ederken, CI pipeline'ı sadece ubuntu-latest üzerinde çalışmaktadır.

Detaylı Analiz: Bu, projenin taşınabilirliği konusunda yanıltıcı bir beyandır. Farklı işletim sistemleri, dosya yolları (/ vs \), environment değişkenleri ve derleme araç zincirleri gibi konularda farklı davranabilir. Sadece Ubuntu üzerinde test edilen bir projenin diğer platformlarda sorunsuz çalışacağı garanti edilemez.

Etkisi: Geliştiriciler, projenin çapraz platform uyumlu olduğuna dair yanlış bir varsayımla hareket edebilirler. Windows'a özgü bir hata, ancak bir Windows geliştiricisi projeyi çalıştırdığında veya production'a Windows tabanlı bir sunucuya deploy edildiğinde ortaya çıkacaktır.

Çözüm: .github/workflows/ci.yml dosyasına bir matrix stratejisi eklenmelidir. Bu matris, en azından build, lint ve type-check adımlarını [ubuntu-latest, windows-latest, macos-latest] üzerinde paralel olarak çalıştırmalıdır. Bu, çapraz platform iddialarını doğrulamak için atılması gereken ilk adımdır.

Bu kategorideki hatalar çözülmeden, projenin diğer kısımlarındaki iyileştirmeler sağlam bir temelden yoksun kalacaktır. Güvenilir bir CI/CD pipeline'ı, projenizin sigortasıdır ve şu anda bu sigorta poliçesi boştur.

Elbette. İkinci ve en az birinci kadar kritik olan kategoriye geçiyoruz. Bu kategori, projenizin can damarı olan verinin güvenliğini ve bütünlüğünü doğrudan ilgilendiriyor.

Kategori 2: Güvenlik Mimarisi ve Veri Bütünlüğü - Zayıf Kaleler ve Çatlak Temeller

Bu kategori, uygulamanızın kötü niyetli aktörlere ve veri bozulmalarına karşı ne kadar savunmasız olduğunu ortaya koymaktadır. Mevcut yapı, kağıt üzerinde sağlam görünen ancak pratikte uygulanmamış veya yanlış uygulanmış güvenlik önlemleriyle dolu. Bu durum, sadece bir güvenlik açığı değil, aynı zamanda projenin temel güvenilirliğini de sorgulatan mimari kusurlar barındırıyor.

Aşağıda bu kategorideki tüm hataları ve zafiyetleri detaylandırıyorum:

Hata 2.1: Yanlış Güven Veren Sağlık Kontrolü (Architectural Anti-Pattern)

Tespit Edilen Dosya: app/api/health/route.ts

Hatalı Mantık: Veritabanı sağlık kontrolü, Supabase PostgREST arayüzü başarısız olduğunda, doğrudan pg kütüphanesi ile yeni bir PostgreSQL bağlantısı kurarak bir "B planı" deniyor.

Derin Analiz: Bu, sadece bir hata değil, tehlikeli bir mimari kusurdur. Bir sağlık kontrolünün (health check) tek bir amacı vardır: uygulamanın kendi normal çalışma koşullarında bağımlılıklarına ulaşıp ulaşamadığını test etmek. Uygulamanız, veritabanı işlemleri için Prisma'nın bağlantı havuzunu (connection pool) kullanır. Bu havuzun tükenmesi, kilitlenmesi veya hatalı yapılandırılması, uygulamanızın veritabanına erişememesine neden olan en yaygın senaryolardan biridir. Mevcut sağlık kontrolü, bu durumu tespit edemez. Hatta tam tersini yapar: Prisma havuzu tamamen kilitlenmişken, bu betik yeni bir direkt bağlantı açar, SELECT 1 sorgusu başarılı olur ve monitoring sistemlerinize "veritabanı ayakta" şeklinde yanıltıcı bir sinyal gönderir.

Etkisi: Uygulamanız veritabanı hataları nedeniyle tamamen çökmüşken, otomatik iyileştirme (self-healing) ve alarm sistemleriniz "her şey yolunda" raporu alacağı için devreye girmez. Bu durum, sorunun tespitini ve çözümünü saatlerce geciktirebilir.

Çözüm:

pg kütüphanesi ile yapılan "fallback" (B planı) mantığı tamamen kaldırılmalıdır.

Sağlık kontrolü, projenin tek doğruluk kaynağı olan lib/prisma.ts dosyasından import edilen aynı prisma istemcisi üzerinden yapılmalıdır. Örneğin: await prisma.$queryRawSELECT 1``. Bu, bağlantı havuzunun sağlığını da test etmenin tek doğru yoludur.

Hata 2.2: Kullanılmayan ve Etkisizleştirilmiş Savunma Sistemleri

Tespit Edilen Dosya: lib/redis.ts

Hatalı Durum: Redis servisinizde checkRateLimit gibi brute-force ve uygulama katmanı DoS saldırılarına karşı hayati önem taşıyan bir fonksiyon tanımlanmış, ancak projenin hiçbir yerinde kullanılmamaktadır.

Detaylı Analiz: Bu, projenin en temel güvenlik katmanlarından birinin eksik olduğu anlamına gelir. Kimlik doğrulama endpoint'leriniz, şifre sıfırlama talepleriniz veya kaynak-yoğun API'leriniz, otomatikleştirilmiş saldırılara karşı tamamen savunmasızdır. Bir saldırgan, saniyede binlerce giriş denemesi yaparak hem sistem kaynaklarınızı tüketebilir hem de kullanıcı hesaplarını ele geçirmeye çalışabilir.

Etkisi:

Brute-Force Saldırıları: Kullanıcı şifreleri deneme-yanılma yoluyla ele geçirilebilir.

Kaynak Tüketimi (DoS): Yoğun istekler, veritabanı ve sunucu kaynaklarınızı tüketerek uygulamanızı yavaşlatabilir veya tamamen hizmet dışı bırakabilir.

Maliyet Artışı: Bulut tabanlı servislerde (Supabase, Vercel vb.) bu tür yoğun trafik, faturalarınızın beklenmedik şekilde şişmesine neden olabilir.

Çözüm: Projenin Next.js middleware (middleware.ts) katmanında veya doğrudan hassas API rotalarında (apiHandler içinde) checkRateLimit fonksiyonu acilen devreye alınmalıdır. Özellikle /api/auth/login gibi endpoint'ler için daha katı kurallar (checkLoginRateLimit) uygulanmalıdır.

Hata 2.3: Gizli Anahtar Yönetiminde Anarşi

Tespit Edilen Dosyalar: .env, .env.bak, .env.local, .env.local.bak

Hatalı Durum: Projede birden fazla, potansiyel olarak farklı değerler içeren .env dosyası bulunmaktadır. En kötüsü, bu dosyalarda SUPABASE_SERVICE_ROLE_KEY gibi en yüksek yetkiye sahip gizli anahtarlar bulunmaktadır.

Detaylı Analiz: Bu durum, "Configuration Drift" (Yapılandırma Sürüklenmesi) adı verilen ve production hatalarının en yaygın nedenlerinden biri olan soruna yol açar. Bir geliştirici yerel ortamında .env.local dosyasını güncellerken, diğeri .env dosyasını kullanabilir. Bu, "benim makinemde çalışıyordu" sendromunun garantili bir reçetesidir. Daha da tehlikelisi, .bak uzantılı dosyaların yanlışlıkla bir sunucuya yüklenmesi veya Git'e commit edilmesi, en kritik anahtarlarınızın sızmasına neden olabilir.

Etkisi:

Güvenlik İhlali: SUPABASE_SERVICE_ROLE_KEY anahtarının sızması, saldırganın veritabanınızdaki tüm verilere tam erişim sağlaması anlamına gelir (Row Level Security dahil tüm güvenlik önlemlerini bypass eder).

Yapılandırma Hataları: Farklı ortamlarda (geliştirme, CI, production) farklı anahtarların kullanılması, tespit edilmesi çok zor olan hatalara yol açar.

Çözüm:

Tüm .bak uzantılı dosyalar derhal silinmeli ve .gitignore dosyasına *.bak kuralı eklenmelidir.

Projede sadece .env.example (versiyon kontrolüne dahil edilecek şablon) ve .env.local (asla commit edilmeyecek yerel ayarlar) dosyaları kalmalıdır.

scripts/validate-env.mjs script'i, projenin ihtiyaç duyduğu tüm zorunlu değişkenleri kontrol edecek şekilde güncellenmeli ve CI pipeline'ının en başında çalıştırılmalıdır.

Hata 2.4: Veri Bütünlüğü ve Tutarlılık Riski

Tespit Edilen Dosya: veriler.md ve prisma/schema.prisma

Hatalı Durum: veriler.md dosyasında tasarlanan SQL şeması, id INTEGER PRIMARY KEY AUTOINCREMENT gibi sıralı tamsayı anahtarlar kullanırken; modern ve dağıtık sistemlere daha uygun olan UUID'ler gibi standartlardan bahsedilmemektedir. prisma/schema.prisma ise tamamen boştur.

Detaylı Analiz: Bu durum, projenin "Veritabanı-Öncelikli" felsefesinin henüz uygulanmadığını gösterir. Daha da önemlisi, AUTOINCREMENT anahtarlar, özellikle multi-tenant ve dağıtık sistemlerde tahmin edilebilir olmaları nedeniyle güvenlik riski oluşturabilir ve birleştirme (merge) senaryolarında çakışmalara yol açabilir. Projenin hiçbir yerinde veritabanı işlemlerinin transaction (işlem bütünlüğü) içinde yapılmasına yönelik bir zorlama veya örnek bulunmamaktadır. Bu, örneğin bir sipariş oluşturulurken hem orders tablosuna kayıt atılıp hem de products tablosunda stok düşülmesi gereken bir senaryoda, adımlardan birinin başarısız olması durumunda verinin tutarsız kalacağı anlamına gelir (sipariş var ama stok düşmemiş).

Etkisi: Veri bozulması, yanlış envanter, hatalı finansal raporlar ve müşteri memnuniyetsizliği gibi geri döndürülmesi çok zor sorunlar ortaya çıkabilir.

Çözüm:

Tüm tablolar için id olarak UUID standartlaştırılmalıdır.

Birden fazla yazma işlemi gerektiren tüm iş mantığı servisleri, prisma.$transaction([...]) bloğu içinde çalıştırılmalıdır. Bu, projenin kendi prisma.mdc dosyasındaki Kural 2.3'ün uygulanmasını sağlar.

prisma/schema.prisma dosyası, veriler.md'deki şemaya uygun olarak doldurulmalı ve projenin tek doğruluk kaynağı haline getirilmelidir.

Anlaştık. Üçüncü kategoriye odaklanıyoruz. Bu kategori, projenizin "iskeleti" ile ilgilidir: kodun nasıl organize edildiği, yapılandırmaların ne kadar tutarlı olduğu ve geliştirici deneyiminin ne kadar verimli olduğu. Şu anki durumda, proje temelden sağlam görünse de, bir evin farklı odalarının farklı mimarlar tarafından, farklı planlara göre inşa edildiği izlenimini veren ciddi tutarsızlıklar ve yapısal kusurlar mevcut.

Kategori 3: Kod Mimarisi, Yapılandırma Tutarlılığı ve Geliştirici Deneyimi - "Babil Kulesi" Sendromu

Bu kategori, projenin farklı parçalarının birbiriyle ne kadar uyumlu konuştuğunu ve bir geliştiricinin bu sistemde ne kadar kolay yolunu bulabileceğini inceler. Mevcut durumda, proje birden fazla standart, çelişkili dosya yolları ve tekrarlanan kod blokları ile dolu. Bu durum, yeni bir geliştiricinin adaptasyon süresini uzatır, hata yapma olasılığını artırır ve projenin bakım maliyetini yükseltir.

Aşağıda bu kategorideki tüm hataları, tutarsızlıkları ve verimsizlikleri detaylandırıyorum:

Hata 3.1: Yinelenen ve Tutarsız Kod (Code Duplication & Inconsistency)

Tespit Edilen Dosyalar: app/page.tsx ve app/panel/page.tsx

Hatalı Durum: Bu iki dosyanın içeriği birebir aynı.

Derin Analiz: Bu, "Kendini Tekrar Etme" (Don't Repeat Yourself - DRY) prensibinin en bariz ihlalidir. Bu sadece bir kod tekrarı değil, aynı zamanda bir rota (routing) mantığı sorunudur. Projenin ana sayfası (/) ile panel sayfası (/panel) arasında hiçbir fark olmaması, projenin navigasyon yapısının henüz düşünülmediğini gösterir. Birinde yapılan bir UI değişikliğinin diğerinde unutulması kaçınılmazdır, bu da uygulamanın farklı bölümlerinde tutarsız görünümlere yol açar.

Etkisi:

Bakım Cehennemi: Tek bir arayüz değişikliği için iki farklı dosyayı güncelleme zorunluluğu.

Tutarsızlık Riski: Değişikliklerin bir dosyada yapılıp diğerinde unutulması.

Kafa Karışıklığı: Geliştiriciler, hangi dosyanın hangi amaçla kullanıldığını anlamakta zorlanır.

Çözüm: Bu iki sayfadan biri kaldırılmalı veya projenin gerçek amacına uygun olarak tamamen farklılaştırılmalıdır. Eğer ortak bileşenler varsa, bunlar components/ dizini altına taşınmalı ve her iki sayfada da kullanılmalıdır.

Hata 3.2: Yapılandırma Dosyası Kaosu ve Çelişkili Kurallar

Tespit Edilen Dosyalar: playwright.config.js ve playwright.config.ts

Hatalı Durum: Projede Playwright için hem JavaScript (.js) hem de TypeScript (.ts) uzantılı iki farklı yapılandırma dosyası bulunmaktadır.

Derin Analiz: Playwright, çalıştırıldığında bu dosyalardan hangisini kullanacağını bilemez veya beklenmedik bir önceliklendirme yapabilir. Bu iki dosya farklı ayarlar içeriyor (örneğin, .ts versiyonu daha fazla proje tanımlarken, .js versiyonunda webServer bloğu yorum satırında değildir). Bu, testlerin farklı ortamlarda farklı davranmasına neden olabilecek bir "yapılandırma bombasıdır".

Etkisi: Testlerin yerel makinede farklı, CI'da farklı çalışması gibi, tespit edilmesi son derece zor hatalara yol açar. Hangi dosyanın "doğru" yapılandırmayı içerdiği belirsizdir.

Çözüm: Bu iki dosyadan biri (tercihen TypeScript olanı) "tek doğruluk kaynağı" olarak seçilmeli, diğeri tamamen silinmelidir. Gerekli tüm ayarlar tek bir dosyada birleştirilmelidir.

Hata 3.3: TypeScript Yolu (Path) Alias'larının Gereksiz Karmaşıklığı

Tespit Edilen Dosya: tsconfig.json

Hatalı Durum: paths altında hem genel bir alias (@/*) hem de bu genel alias'ın alt kümeleri olan spesifik alias'lar (@/components/*, @/lib/* vb.) tanımlanmıştır.

Derin Analiz: Bu, gereksiz bir tekrardır. @/*: ["./src/*", "./*"] tanımı, zaten import Button from '@/components/ui/button' gibi yolların çalışmasını sağlar. Ekstra ve daha spesifik alias'lar eklemek, yapılandırmayı okumayı zorlaştırır ve projenin basitlik ilkesine aykırıdır.

Etkisi: Yeni geliştiriciler, hangi alias'ı ne zaman kullanacakları konusunda kafa karışıklığı yaşayabilir. Yapılandırma dosyasında gereksiz satırlar birikerek "yapılandırma çürümesine" (config rot) neden olur.

Çözüm: Sadece en genel olan @/* alias'ı bırakılmalı ve diğer tüm spesifik alias'lar temizlenmelidir. Bu, yapılandırmayı hem basitleştirir hem de daha standart hale getirir.

Hata 3.4: Tutarsız Dosya ve Dizin İsimlendirme Kuralları

Tespit Edilen Dosyalar: Proje geneli. veriler.md, kontroller.md, lib/services/hybrid-service.ts

Hatalı Durum: Projede standart bir dosya isimlendirme kuralı uygulanmamaktadır. Bazı dosyalar Türkçe (veriler.md), bazıları İngilizce (hybrid-service.ts), bazıları ise kebap-case, bazıları camelCase kullanmaktadır.

Derin Analiz: Bu durum, projenin profesyonellik ve tutarlılık algısını zayıflatır. Bir geliştirici yeni bir servis dosyası oluştururken new-service.ts mi, NewService.ts mi yoksa yeniServis.ts mi adını vereceğini bilemez. Bu, kod tabanında gezinmeyi ve dosyaları bulmayı zorlaştırır.

Etkisi: Düşük okunabilirlik, artan bilişsel yük ve proje genelinde tutarsız bir yapı.

Çözüm: Proje genelinde (dokümantasyon dahil) tek bir dil (tercihen İngilizce) ve tek bir isimlendirme standardı (örneğin, bileşenler için PascalCase, servisler ve diğer dosyalar için kebab-case) belirlenmeli ve tüm dosya adları bu standarda göre yeniden düzenlenmelidir.

Bu kategorideki hatalar, projenin "kullanıcı arayüzü" olan kod tabanının kendisinin ne kadar bakımlı olduğunu gösterir. Tutarsız ve karmaşık bir yapı, en iyi mimari kararları bile gölgede bırakabilir ve uzun vadede geliştirme hızını ciddi şekilde yavaşlatabilir.

Elbette. Dördüncü kategoriye odaklanıyoruz. Bu kategori, projenizin "iskeleti" üzerine inşa edilen "kas ve sinir sistemini" yani backend iş mantığını ve veritabanı ile olan etkileşimini inceliyor. Şu anda bu sistem, henüz tam olarak oluşmamış, kritik parçaları eksik ve mevcut parçaları da en iyi pratiklerden uzak bir yapıda.

Kategori 4: Backend Mimarisi ve Veri Erişim Katmanı - Boş Bir Çerçeve ve Riskli Uygulamalar

Bu kategori, projenin "sunucu tarafı beyninin" ne kadar olgun olduğunu ve veriye erişirken ne kadar güvenli ve verimli davrandığını analiz eder. Tespitlerim, backend'in büyük ölçüde bir iskeletten ibaret olduğunu ve mevcut birkaç küçük uygulamanın bile ciddi mimari hatalar içerdiğini gösteriyor.

Aşağıda bu kategorideki tüm eksiklikleri ve hataları detaylandırıyorum:

Hata 4.1: Boş ve İşlevsiz API ve Veritabanı Katmanları

Tespit Edilen Dosyalar: server/api/root.ts, prisma/schema.prisma

Hatalı Durum: Ana tRPC router'ı (appRouter) tamamen boştur, hiçbir prosedür (query veya mutation) tanımlanmamıştır. Benzer şekilde, Prisma şeması (schema.prisma) hiçbir model (model) içermemektedir.

Derin Analiz: Bu durum, projenin "Veritabanı-Öncelikli" ve "API-First" gibi temel felsefelerinin henüz hayata geçirilmediğini gösteren en net kanıttır. Backend mimarisi, sadece boş dosyalardan ve yer tutucu yapılandırmalardan oluşmaktadır. Projenin kalbi olan iş mantığı ve veri modelleri henüz tasarlanmamıştır. veriler.md dosyasında kapsamlı bir veritabanı tasarımı yapılmış olmasına rağmen, bu tasarım projenin tek doğruluk kaynağı olması gereken schema.prisma dosyasına aktarılmamıştır.

Etkisi: Projenin backend'i şu anda işlevsel değildir. Hiçbir veri işlemi (okuma, yazma, güncelleme) gerçekleştiremez. Bu, projenin geliştirme yaşam döngüsünün henüz çok erken bir aşamada olduğunu gösterir.

Çözüm:

veriler.md dosyasındaki SQL şeması, Prisma'nın sözdizimine uygun olarak prisma/schema.prisma dosyasına eksiksiz bir şekilde aktarılmalıdır.

Şema aktarıldıktan sonra npx prisma generate komutu çalıştırılarak Prisma Client'ın veri modellerine göre oluşturulması sağlanmalıdır.

Temel CRUD işlemleri için ilk tRPC prosedürleri (userRouter, productRouter vb.) server/api/routers/ altında oluşturulmalı ve ana appRouter'a bağlanmalıdır.

Hata 4.2: Veritabanı İstemcisinin Yanlış ve Tehlikeli Kullanımı

Tespit Edilen Dosya: lib/prisma.ts

Hatalı Kod:

code
TypeScript
download
content_copy
expand_less

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

Derin Analiz: Prisma istemcisi, log: ['query'] seçeneği ile yapılandırılmıştır. Bu, her bir veritabanı sorgusunun ve potansiyel olarak sorgulardaki hassas verilerin (örneğin, bir kullanıcının e-posta adresi veya şifre hash'i) production loglarına yazdırılacağı anlamına gelir. Bu, geliştirme ortamı için faydalı bir ayar olsa da, production ortamı için ciddi bir veri sızıntısı ve performans riskidir.

Etkisi:

Güvenlik Riski: Hassas kullanıcı verileri (PII - Personally Identifiable Information) log dosyalarına kaydedilir. Bu loglara yetkisiz bir erişim, ciddi bir veri ihlaline yol açar.

Performans Düşüşü: Production'da yüksek trafik altında her sorguyu loglamak, uygulamanızın I/O (Giriş/Çıkış) operasyonlarını artırarak ciddi bir performans darboğazı yaratır.

Maliyet Artışı: Loglama servisleri (Sentry, Datadog vb.) genellikle veri hacmine göre ücretlendirilir. Bu ayar, loglama maliyetlerinizi fahiş seviyelere çıkarabilir.

Çözüm: Prisma istemcisinin yapılandırması, ortam değişkenine (process.env.NODE_ENV) bağlı olarak dinamik hale getirilmelidir.

code
TypeScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
})

Bu şekilde, detaylı sorgu logları sadece geliştirme ortamında aktif olurken, production'da sadece uyarılar ve hatalar loglanır.

Hata 4.3: Mimari Katman İhlali ve "Shim" Kullanımı

Tespit Edilen Dosya: lib/services/hybrid-service.ts

Hatalı Kod:

code
TypeScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
// If Prisma schema does not include 'product' (we use Supabase tables),
// fall back to a narrow typed shim instead of `any` to satisfy ESLint.
type MaybeProductClient = { product?: { findMany: (opts?: unknown) => Promise<unknown[]> } }
const _prisma = prisma as unknown as MaybeProductClient;
const menuItems = _prisma.product
  ? await _prisma.product.findMany(...)
  : null;

Derin Analiz: Bu kod bloğu, birçok mimari prensibi aynı anda ihlal etmektedir:

Varsayımsal Kodlama: Kod, Prisma şemasında product modelinin olup olmadığını varsayımsal olarak kontrol ediyor. Bu, projenin "tek doğruluk kaynağı" ilkesine aykırıdır. Şema ya modeli içerir ya da içermez; kodun bu konuda bir varsayım yapmasına gerek olmamalıdır.

Tip Güvenliğinin Kırılması: prisma as unknown as MaybeProductClient ifadesi, TypeScript'in sağladığı tüm tip güvenliğini devre dışı bırakan tehlikeli bir "type assertion" (tip dayatması) işlemidir. Bu, derleyiciye "bana güven, ne yaptığımı biliyorum" demektir ve genellikle gizli hataların kaynağıdır.

Katman İhlali: Bu "servis" dosyası, doğrudan prisma istemcisini kullanarak veritabanı sorgusu yapmaktadır. Projenin kendi kurallarına (typescript.mdc) göre, veritabanı işlemleri sadece Repository Katmanında yapılmalıdır. Servis katmanı, productRepository.findAll() gibi soyut bir metodu çağırmalıdır.

Etkisi: Bu tür kodlar, projenin bakımını imkansız hale getirir. Tip güvenliği ortadan kalkar, mimari katmanlar birbirine karışır ve kodun ne yaptığı anlaşılmaz hale gelir.

Çözüm:

"Shim" ve tip dayatmaları (as unknown as ...) tamamen kaldırılmalıdır.

prisma/schema.prisma dosyası doğru modellerle doldurulduktan sonra, bu sorgu productRepository.ts gibi bir dosyaya taşınmalı ve hybrid-service.ts sadece o repository metodunu çağırmalıdır.

Bu kategorideki hatalar, projenin temel işlevselliğini ve güvenilirliğini baltalayan en önemli sorunlardır. Sağlam bir backend ve veri erişim katmanı olmadan, üzerine inşa edilecek hiçbir özellik güvenli veya stabil olmayacaktır.

Elbette. Beşinci kategoriye, yani projenizin "yüzü" olan kullanıcı arayüzü (UI) katmanına odaklanıyoruz. Bu katman, kullanıcıyla doğrudan etkileşime girdiği için, burada yapılan hatalar en görünür ve kullanıcı deneyimini en çok etkileyen hatalardır. Şu anda, UI katmanı hem yapısal tutarsızlıklar hem de temel web geliştirme standartlarının ihlalleriyle dolu.

Kategori 5: Frontend Mimarisi ve Bileşen Tasarımı - Tutarsızlıklar ve Anti-Pattern'lar

Bu kategori, React bileşenlerinin nasıl yapılandırıldığını, birbirleriyle nasıl etkileşime girdiğini ve modern web geliştirme pratiklerine ne kadar uyduğunu inceler. Projenin UI katmanı, güçlü bir bileşen kütüphanesi (Shadcn) kullanmasına rağmen, bu bileşenlerin kullanımı ve genel mimari yaklaşımında ciddi kusurlar sergiliyor.

Aşağıda bu kategorideki tüm hataları ve zayıf noktaları detaylandırıyorum:

Hata 5.1: Statik ve "Ölü" Bir Arayüz

Tespit Edilen Dosyalar: app/page.tsx, app/panel/page.tsx

Hatalı Durum: Sayfalardaki tüm metrikler, butonlar ve listeler tamamen statik HTML olarak kodlanmıştır. Hiçbir veri useState, useEffect veya bir veri çekme (data fetching) kütüphanesi ile dinamik olarak yüklenmemektedir. Butonların onClick olayları yoktur ve tamamen işlevsizdir.

Derin Analiz: Bu durum, bu dosyaların gerçek bir uygulama sayfasından çok, bir HTML mockup'ı (taslağı) olduğunu gösterir. 0-genel.mdc'deki Directive 4 (Yasak: Statik Veri) ve tsx.mdc'deki Directive 2 (Durum Hakkında Varsayımda Bulunma) kuralları tamamen ihlal edilmiştir. Gerçek bir uygulamada, bu sayfanın loading, error ve empty durumlarını yönetmesi ve tüm verileri bir API'den çekmesi gerekirdi.

Etkisi:

İşlevsizlik: Kullanıcı arayüzü, hiçbir işlevi olmayan "ölü" bir ekrandan ibarettir.

Yanlış Uygulama Örneği: Bu bileşenler, yeni geliştiriciler için kötü bir örnek teşkil eder ve projenin geri kalanında da statik veri kullanımını teşvik edebilir.

Kural İhlali: Projenin kendi anayasasının en temel kurallarından biri hiçe sayılmıştır.

Çözüm:

Tüm statik veriler (0 gibi değerler, buton metinleri vb.) kaldırılmalıdır.

@tanstack/react-query ve projenin api istemcisi (lib/trpc.ts) kullanılarak veriler tRPC backend'inden çekilmelidir.

Sayfa, verinin yüklenme (loading), hata (error) ve boş (empty) durumları için ayrı UI'lar gösterecek şekilde yeniden yapılandırılmalıdır.

Butonlara ve diğer interaktif elemanlara onClick gibi olay yöneticileri eklenerek işlevsellik kazandırılmalıdır.

Hata 5.2: Prop Drilling Tehlikesi ve Keyfi Prop İsimlendirmesi

Tespit Edilen Dosyalar: components/common/ModuleHeader.tsx, docs/reference/nav-item.md (kurtarılmış kod)

Hatalı Durum: Bileşenler, theme gibi global olması gereken durumları prop olarak almaktadır. Bu, küçük bir örnek olsa da, projenin geneline yayılabilecek bir "prop drilling" (prop'ları derinlemesine aktarma) anti-pattern'inin başlangıcıdır.

Derin Analiz: Bir uygulamanın teması (dark/light mode) gibi global durumlar, her bir bileşene ayrı ayrı prop olarak geçirilmemelidir. Bu, hem kod tekrarına yol açar hem de uygulamanın derinliği arttıkça state yönetimini imkansız hale getirir. tsx.mdc'deki Kural 2.2 (Prop Drilling Yasağı) bu durumu engellemeyi amaçlar.

Etkisi:

Kırılgan Kod: Aradaki bir bileşenin prop'u iletmeyi unutması, alt katmanlardaki tüm bileşenlerin hatalı çalışmasına neden olur.

Bakım Zorluğu: Tema ile ilgili bir değişiklik yapmak, projedeki onlarca, hatta yüzlerce dosyanın değiştirilmesini gerektirebilir.

Verimsiz Render: Gereksiz prop değişiklikleri, React'in yeniden render (re-render) mekanizmasını tetikleyerek performans sorunlarına yol açabilir.

Çözüm:

theme gibi global durumlar için next-themes kütüphanesi ile birlikte gelen useTheme hook'u veya projenin kendi global state yöneticisi olan zustand (lib/store.ts) kullanılmalıdır.

Tüm bileşenlerden theme prop'u kaldırılmalı ve bileşenler bu durumu doğrudan global state'ten veya context'ten okumalıdır.

Hata 5.3: Geliştirici Deneyimini Baltalayan Yapılandırma

Tespit Edilen Dosya: .eslintrc.json

Hatalı Durum: ESLint yapılandırması, extends: ["next/core-web-vitals"] gibi temel bir konfigürasyonla bırakılmış. Projenin .mdc dosyalarında zorunlu kılınan eslint-plugin-security, eslint-plugin-import gibi hayati eklentiler ve kurallar eklenmemiştir.

Derin Analiz: Bu, projenin kalite ve güvenlik konusundaki iddialarıyla çelişen bir durumdur. Mevcut ESLint yapılandırması, projenin kendi kurallarında belirtilen güvenlik açıklarını, performans sorunlarını veya import sıralaması gibi kod stili hatalarını tespit edemez.

Etkisi: Geliştiriciler, farkında olmadan güvenlik açıkları içeren veya performans açısından verimsiz kodlar yazabilirler. CI pipeline'ı bu hataları yakalayamayacağı için, sorunlar doğrudan production'a kadar sızabilir.

Çözüm: .eslintrc.json dosyası, eslint.mdc dosyasında detaylandırılan tüm extends ve plugins (özellikle plugin:security/recommended ve plugin:import/recommended) ile eksiksiz bir şekilde güncellenmelidir. Bu, geliştirme sırasında hataların anında tespit edilmesini sağlar.

Hata 5.4: İsimlendirme ve Organizasyon Tutarsızlığı

Tespit Edilen Dosyalar: src/components/ui/ ve components/common/

Hatalı Durum: Projede hem src/components/ui/ (Shadcn tarafından otomatik oluşturulmuş) hem de components/common/ olmak üzere iki farklı bileşen dizini bulunmaktadır. Ayrıca, components.json dosyası, ui alias'ını @/components/ui olarak tanımlarken, tsconfig.json @/components/* için çift yol (./src/components/* ve ./components/*) tanımlayarak belirsizlik yaratmaktadır.

Derin Analiz: Bu, projenin dosya yapısı standardının henüz oturmadığını gösterir. Bir geliştirici yeni bir "ortak" (common/shared) bileşen oluşturmak istediğinde onu hangi dizine koyacağını bilemez. Bu tür tutarsızlıklar, proje büyüdükçe "dizin anarşisine" yol açar.

Etkisi: Projenin ölçeklenmesini zorlaştırır, kodun bulunabilirliğini azaltır ve geliştiriciler arasında kafa karışıklığına neden olur.

Çözüm:

Tek bir bileşen yapısı üzerinde anlaşılmalıdır. Öneri:

src/components/ui: Sadece Shadcn tarafından yönetilen, değiştirilmeyen temel UI bileşenleri.

src/components/common: Projeye özgü, birden fazla yerde kullanılan ortak bileşenler (ModuleHeader gibi).

src/features/[feature-name]/components: Sadece belirli bir özelliğe ait olan bileşenler.

tsconfig.json'daki çift tanımlı yollar temizlenerek belirsizlik ortadan kaldırılmalıdır.

Bu kategorideki sorunlar, projenin dış dünyaya açılan penceresinin kirli ve düzensiz olduğunu gösteriyor. Kullanıcı deneyimi ve geliştirici verimliliği için bu yapısal sorunların çözülmesi kritik öneme sahiptir.

Elbette. Altıncı kategoriye geçiyoruz. Bu kategori, projenizin "dış dünya ile nasıl konuştuğunu", yani bağımlılıklarını nasıl yönettiğini ve harici paketleri nasıl kullandığını inceliyor. Şu anki durum, hem güvenlik hem de performans açısından riskler barındıran, disiplinsiz bir bağımlılık yönetimi pratiği sergiliyor.

Kategori 6: Bağımlılık Yönetimi ve Paket Sağlığı - Şişkinlik, Güvensizlik ve Tutarsızlık

Bu kategori, projenizin temelini oluşturan node_modules klasörünün sağlığını, güvenliğini ve verimliliğini analiz eder. Doğru bağımlılık yönetimi, bir projenin paket boyutunu, kurulum hızını, güvenliğini ve bakım kolaylığını doğrudan etkiler. Projeniz, bu alanda ciddi iyileştirme potansiyeline sahip.

Aşağıda bu kategorideki tüm hataları, riskleri ve verimsizlikleri detaylandırıyorum:

Hata 6.1: Yanlış Kategorize Edilmiş Bağımlılıklar (Dependency Mismanagement)

Tespit Edilen Dosya: package.json

Hatalı Durum: Sadece geliştirme (development) ve test (test) ortamlarında gerekli olan paketler, uygulamanın son kullanıcısının (production) ihtiyaç duyduğu paketlerle aynı listeye (dependencies) konulmuştur.

Örnekler: @playwright/test, @testing-library/jest-dom, @types/*, eslint, jest, prettier, prisma (CLI), typescript.

Derin Analiz: Bu, npm paket yönetiminin en temel prensiplerinden birinin ihlalidir. dependencies bölümü, uygulamanızın çalışması için mutlak surette gerekli olan paketleri içermelidir. devDependencies ise, kodu geliştirmek, test etmek, lint'lemek ve build etmek için kullanılan araçları içerir. Bu ayrımı yapmamak, production ortamına onlarca, hatta yüzlerce megabayt gereksiz kod yüklemek anlamına gelir.

Etkisi:

Gereksiz Yere Şişmiş Docker İmajları: docker build sırasında npm ci (veya npm install) komutu, devDependencies dahil her şeyi yükleyerek imaj boyutunu ciddi şekilde artırır. Bu, depolama maliyetlerini ve imaj çekme (pull) sürelerini artırır.

Artan Saldırı Yüzeyi (Attack Surface): Production ortamına yüklenen her gereksiz paket, potansiyel bir güvenlik açığı kaynağıdır. Test kütüphaneleri veya linter'ların production sunucusunda bulunmasının hiçbir gereği yoktur.

Yavaşlayan CI/CD Süreçleri: CI pipeline'ı, her seferinde bu gereksiz paketleri indirip kurmak için fazladan zaman harcar.

Çözüm: Aşağıdaki gibi, sadece geliştirme ve test için gerekli olan tüm paketler dependencies bölümünden devDependencies bölümüne taşınmalıdır:

code
Bash
download
content_copy
expand_less

npm uninstall @playwright/test @testing-library/jest-dom @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser critters eslint eslint-config-next jest jest-environment-jsdom prettier prisma typescript
npm install --save-dev @playwright/test @testing-library/jest-dom @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser critters eslint eslint-config-next jest jest-environment-jsdom prettier prisma typescript
Hata 6.2: Güvenlik Açığı Olan veya Eski Paketler

Tespit Edilen Dosya: package-lock.json (dolaylı olarak package.json'dan kaynaklanır)

Hatalı Durum: Proje, npm audit komutu çalıştırıldığında ortaya çıkacak olan bilinen güvenlik açıklarına sahip eski paket versiyonlarını kullanıyor olabilir. Bu analiz, package-lock.json dosyasının tamamı olmadan varsayımsaldır ancak package.json'daki versiyonların en son sürümler olmadığı görülmektedir.

Derin Analiz: Bağımlılıkları düzenli olarak güncellememek, projenizi bilinen ve saldırganlar tarafından kolayca istismar edilebilecek zafiyetlere karşı savunmasız bırakır. npm audit komutu, bu tür sorunları tespit etmek için var olan temel bir araçtır.

Etkisi: Projeniz, kolayca önlenebilecek XSS (Cross-Site Scripting), RCE (Remote Code Execution) veya DoS (Denial of Service) gibi saldırılara maruz kalabilir.

Çözüm:

Periyodik olarak npm audit komutu çalıştırılmalı ve bulunan kritik (critical) ve yüksek (high) seviyedeki zafiyetler giderilmelidir.

npm audit fix komutu, çoğu sorunu otomatik olarak çözebilir.

Bağımlılıkları güncel tutmak için npm-check-updates gibi araçlar kullanılabilir ve bu süreç CI pipeline'ına entegre edilebilir.

Hata 6.3: Tutarsız ve Kilitlenmemiş Bağımlılık Ağacı

Tespit Edilen Dosya: package-lock.json (bu dosyanın git'e eklenip eklenmediği belirsiz)

Hatalı Durum: Eğer package-lock.json dosyası .gitignore içindeyse veya düzenli olarak güncellenip commit edilmiyorsa, projenin "Mutlak Tekrarlanabilirlik" ilkesi ihlal edilmiş olur.

Derin Analiz: package-lock.json dosyası, projenin her bir bağımlılığının ve o bağımlılıkların da kendi bağımlılıklarının tam olarak hangi versiyonlarının kurulduğunu kaydeden bir "kilit" dosyasıdır. Bu dosya olmadan, iki farklı geliştirici aynı package.json ile npm install çalıştırdığında makinelerine farklı alt-bağımlılık versiyonları kurulabilir. Bu, "benim makinemde çalışıyordu" sorununun en yaygın nedenidir.

Etkisi: Geliştiriciler arasında ve yerel ortam ile CI/production ortamları arasında tutarsız davranışlar gözlemlenir. Bir özellik bir yerde çalışırken diğerinde çalışmayabilir.

Çözüm:

package-lock.json dosyasının .gitignore içinde olmadığından emin olunmalıdır.

Her npm install veya npm update işleminden sonra, değişen package-lock.json dosyası mutlaka git'e commit edilmelidir.

CI/CD pipeline'ında, bağımlılıkları kurmak için npm install yerine npm ci komutu kullanılmalıdır. npm ci, package.json dosyasını yok sayar ve kurulumu sadece package-lock.json'a göre yaparak deterministik (her zaman aynı sonucu veren) bir kurulumu garanti eder. .github/workflows/ci.yml dosyasında bu doğru bir şekilde yapılmıştır, bu iyi bir pratiktir.

Bu kategorideki hatalar, projenizin tedarik zincirindeki (supply chain) zayıflıkları ortaya koymaktadır. Sağlam bir temel üzerine inşa edilmemiş bir bina gibi, güvensiz veya tutarsız bağımlılıklar üzerine inşa edilen bir uygulama da eninde sonunda çökmeye mahkumdur.

Elbette. Yedinci kategoriye, projenizin "sınırları" ve "altyapısı" olan Docker, Nginx ve Systemd yapılandırmalarına odaklanıyoruz. Bu katman, uygulamanızın dış dünya ile nasıl etkileşime girdiğini, nasıl izole edildiğini ve production ortamında ne kadar güvenilir bir şekilde çalışacağını belirler. Mevcut yapılandırmalar iyi niyetli başlangıçlar içerse de, ciddi güvenlik açıkları, performans darboğazları ve "best practice" ihlalleriyle dolu.

Kategori 7: Dağıtım (Deployment), Konteynerizasyon ve Altyapı - Güvensiz Limanlar ve Kırılgan Servisler

Bu kategori, uygulamanızın production ortamındaki dayanıklılığını, güvenliğini ve ölçeklenebilirliğini analiz eder. Yanlış yapılandırılmış bir Dockerfile veya Nginx konfigürasyonu, ne kadar iyi yazılmış olursa olsun tüm uygulamanın çökmesine veya ele geçirilmesine neden olabilir.

Aşağıda bu kategorideki tüm kritik hataları ve zayıf noktaları detaylandırıyorum:

Hata 7.1: Docker İmajlarında Güvenlik ve Performans Anti-Pattern'ları

Tespit Edilen Dosyalar: Dockerfile, Dockerfile.dev

Hatalı Durumlar:

Sabitlenmemiş İmajlar: Her iki Dockerfile da node:18.15.1-alpine@sha256:... gibi geçersiz bir digest ile ve Dockerfile'ın ilk versiyonunda node:20-alpine gibi sadece bir etiket (tag) ile imajları referans alıyor.

npm install Kullanımı: Production Dockerfile'ı, npm ci yerine npm install kullanıyor olabilir (if [ -f package-lock.json ]; then npm ci; else npm install; fi).

Gereksiz Bağımlılıklar: devDependencies'in production imajına sızmasını engelleyecek net bir komut (npm ci --only=production) ilk Dockerfile'da eksik.

COPY . . Yanlışı: Kaynak kodun tamamı, .dockerignore dosyasına rağmen, gereksiz dosyaları (örneğin .git klasörü, .vscode, .md dosyaları) imajın içine kopyalayan COPY . . komutu ile taşınıyor.

Derin Analiz:

Sabitlenmemiş İmajlar: sha256 digest'i kullanmamak, PROTOCOL_0_COMPLIANCE.md dosyasında belirtilen "Mutlak Tekrarlanabilirlik" ilkesini ihlal eder. alpine etiketinin işaret ettiği imaj zamanla değişebilir, bu da bir ay sonra yapılan bir build'in farklı bir temel üzerine kurulmasına neden olur.

npm ci vs npm install: npm ci, package-lock.json'a sadık kalarak deterministik bir kurulum sağlarken, npm install alt bağımlılıkları güncelleyebilir. Production build'lerinde her zaman npm ci kullanılmalıdır.

Gereksiz Bağımlılıklar: Production imajına devDependencies kurmak, hem imaj boyutunu şişirir hem de saldırı yüzeyini gereksiz yere artırır.

COPY . . Hatası: Bu komut, Docker katman önbelleklemesini (layer caching) etkisiz hale getirir. Kodda yapılan en ufak bir değişiklik (README.md güncellemesi gibi), bağımlılıkların yeniden kurulduğu katmanın tamamen yeniden build edilmesine neden olarak CI/CD sürelerini uzatır. Doğru sıralama: önce package.json ve package-lock.json kopyalanır, npm ci çalıştırılır, sonra kaynak kodun geri kalanı kopyalanır.

Etkisi: Yavaş, şişkin, güvensiz ve tekrarlanamaz Docker imajları.

Çözüm:

Tüm FROM komutlarında gerçek ve geçerli sha256 digest'leri kullanılmalıdır.

Production Dockerfile'ında bağımlılıklar sadece npm ci --only=production komutu ile kurulmalıdır.

Dosya kopyalama, katman önbelleklemesini optimize edecek şekilde yeniden sıralanmalıdır: önce manifestler, sonra kurulum, en son kod.

Hata 7.2: Docker Compose'da Geliştirme ve Production Mantığının Karışması

Tespit Edilen Dosya: docker-compose.yml

Hatalı Durum: Geliştirme için tasarlanmış bu dosya, production'a yönelik bir nginx servisi içeriyor. Ayrıca, app servisi, hot-reloading için tüm proje dizinini (.:/app) konteynere bağlıyor (bind mount).

Derin Analiz: nginx gibi bir reverse proxy, genellikle production ortamında kullanılır ve geliştirme ortamında gereksiz bir karmaşıklık yaratır. Daha da önemlisi, volumes: [.:/app] kullanımı, production için felakettir. Bu, production konteynerinin doğrudan ana makinedeki kaynak koduna bağımlı hale gelmesi demektir ve Docker'ın "taşınabilirlik" ve "izolasyon" felsefesini tamamen yok eder.

Etkisi: Geliştirme ve production ortamları arasındaki fark belirsizleşir. Production'a yönelik bir hata ayıklama süreci, geliştirme ortamındaki bir sorundan kaynaklanıyormuş gibi görünebilir.

Çözüm: docker-compose.yml sadece geliştirme odaklı olmalıdır. nginx servisi bu dosyadan tamamen kaldırılmalı ve sadece docker-compose.prod.yml içinde yer almalıdır. docker-compose.prod.yml'deki app servisi ise asla bind mount kullanmamalı, bunun yerine Dockerfile'dan build edilen imajı doğrudan çalıştırmalıdır.

Hata 7.3: Systemd Servis Dosyasında Kırılganlık ve Kötü Pratikler

Tespit Edilen Dosya: deploy/systemd/bizgenciz-web.service

Hatalı Kod: ExecStart=/usr/bin/env bash -lc 'PORT=${PORT:-3000} /usr/bin/node ...'

Derin Analiz:

bash -lc Kullanımı: bash -l komutu, bir "login shell" başlatır. Bu, .bash_profile, .bashrc gibi dosyaların okunmasına neden olabilir ve servisin başlangıç ortamını öngörülemez hale getirir. Servisler her zaman minimal ve temiz bir ortamda çalışmalıdır.

Default Değer Ataması: PORT=${PORT:-3000} gibi bir atama, EnvironmentFile'dan gelen bir değerin olmaması durumunda bir varsayılan değer kullanır. Bu, yapılandırma hatasının (örneğin .env.local dosyasının eksik olması) fark edilmesini zorlaştırır. Servis, eksik bir yapılandırmayla başlamaya çalışmak yerine, hata vererek durmalıdır.

Etkisi: Servisin beklenmedik ortam değişkenleriyle başlaması veya kritik bir yapılandırma eksiğinin sessizce göz ardı edilmesi, production'da tespit edilmesi zor hatalara yol açar.

Çözüm: ExecStart komutu, bash -lc gibi sarmalayıcılar olmadan, doğrudan çalıştırılabilir dosyayı çağırmalıdır: ExecStart=/usr/bin/node /opt/bizgenciz-social/scripts/node-watchdog-wrapper.js .... Port gibi kritik değişkenler, .env.local dosyasında zorunlu olmalı ve eksikliği halinde uygulamanın kendisi başlangıçta hata vererek çıkmalıdır (scripts/validate-env.mjs bu işlevi görmelidir).

Bu kategorideki hatalar, projenizin production'a taşındığında karşılaşacağı ilk ve en büyük engellerdir. Sağlam ve güvenli bir altyapı yapılandırması, uygulamanın kendisi kadar önemlidir ve bu alandaki eksiklikler acilen giderilmelidir.

Elbette. Sekizinci kategoriye, projenizin "hafızası" ve "öğrenme yeteneği" olan dokümantasyon ve kural setlerinin iç tutarlılığına odaklanıyoruz. Bu, projenin sadece kodunun değil, aynı zamanda felsefesinin de ne kadar sağlıklı olduğunu gösteren kritik bir alandır. Mevcut durumda, dokümantasyon hem kendi içinde çelişkiler barındırıyor hem de güncel olmayan, hatta "ölü" bilgiler içeriyor.

Kategori 8: Dokümantasyon ve Kural Seti Bütünlüğü - "Hafıza Kaybı" ve Çelişkili Emirler

Bu kategori, projenizin en ayırt edici özelliklerinden biri olan .mdc kural setlerinin ve genel dokümantasyonun kendi içindeki tutarlılığını ve güncelliğini analiz eder. Bir projenin anayasası, eğer kendisi çelişkilerle doluysa veya güncel durumu yansıtmıyorsa, yol gösterici olmak yerine kafa karışıklığına ve yanlış uygulamalara neden olur.

Aşağıda bu kategorideki tüm tutarsızlıkları ve güncel olmayan bilgileri detaylandırıyorum:

Hata 8.1: "Ölü" ve Arşivlenmiş Dokümanlar

Tespit Edilen Dizin: docs/project/archived/

Hatalı Durum: Bu dizin backend_kutuphane.md, frontend_kutuphane.md, dongu_protokolu.md gibi projenin eski versiyonlarına ait olduğu anlaşılan dokümanlar içeriyor.

Derin Analiz: Bu dosyaların varlığı, projenin mevcut durumunu anlamaya çalışan bir geliştirici veya AI için bir "tuzak" niteliğindedir. 0-genel.mdc'deki "Genişletilmiş Dağıtık Bellek Arama Protokolü", kütüphane dosyalarını aramanın ilk adımı olduğunu belirtir. Bir arama sonucunda bu "arşivlenmiş" kütüphane dosyalarının bulunması, güncel olmayan, hatta artık geçerli olmayan bilgilere göre karar verilmesine yol açabilir. Bu durum, projenin "tek doğruluk kaynağı" ilkesini baltalar.

Etkisi: Yanlış bilgiye dayalı hatalı kod üretimi, zaman kaybı ve kafa karışıklığı. Projenin tarihsel evrimi belgelenmek isteniyorsa, bu dosyalar ana docs ağacından çıkarılıp ayrı bir archive veya legacy branch'inde saklanmalıdır.

Çözüm: Bu dizin ya tamamen silinmeli ya da projenin aktif dokümantasyon setinden çıkarılarak (örneğin Git dışında bir yerde arşivlenerek) kafa karışıklığına neden olması engellenmelidir.

Hata 8.2: Pasif Hale Getirilmiş Ama Halen Mevcut Olan Kurallar

Tespit Edilen Dosya: docs/mdc_project/vitest-pasif.mdc

Hatalı Durum: Projede standart test aracı olarak Jest seçilmiş olmasına rağmen (docs/project/archived/vitest-neden-pasif.md dosyasında açıklandığı gibi), Vitest için bir .mdc kural dosyası hala mevcuttur.

Derin Analiz: Bu durum, Hata 8.1 ile benzer bir risk taşır. Bir AI, bir test göreviyle karşılaştığında hem jest.mdc hem de vitest-pasif.mdc dosyalarını bulabilir. Dosya adındaki "pasif" ifadesi bir ipucu verse de, bu tür belirsizlikler otomatize edilmiş bir sistemde istenmeyen durumlardır. Sistem, hangi kural setinin geçerli olduğu konusunda net ve tek bir doğruya sahip olmalıdır.

Etkisi: Yanlış kural setinin uygulanma riski, geliştirici için kafa karışıklığı ve proje standartları konusunda belirsizlik.

Çözüm: vitest-pasif.mdc dosyası projeden tamamen kaldırılmalıdır. Jest'in neden seçildiğini açıklayan vitest-neden-pasif.md dosyası ise, mimari kararları belgeleyen docs/reference/architectural-decisions/ gibi bir dizine taşınmalıdır.

Hata 8.3: Çelişkili İletişim Protokolleri

Tespit Edilen Dosyalar: docs/mdc_project/axios.mdc ve docs/mdc_project/trpc.mdc

Hatalı Durum: axios.mdc, "Anayasal Ayrım" kuralında, iç iletişim için tRPC'nin ZORUNLU olduğunu ve Axios'un SADECE harici 3. parti API'ler için kullanılacağını belirtir. Ancak, aynı kural setinin ilerleyen bölümlerinde ve örneklerinde, Axios'un Frontend'den Backend'e istek atmak için kullanıldığına dair (axios.get('/api/users')) öneriler ve "CSRF Koruması" gibi web istemcilerine yönelik kurallar bulunur.

Derin Analiz: Bu, ciddi bir mantıksal çelişkidir. Bir kural dosyası, bir yandan bir teknolojinin belirli bir amaçla kullanımını yasaklarken, diğer yandan aynı amaç için nasıl kullanılacağına dair detaylı talimatlar veremez. Bu, axios.mdc dosyasının, tRPC'nin ana iletişim katmanı olarak seçilmesinden önceki bir döneme ait olduğunu ve güncellenmediğini göstermektedir.

Etkisi: Geliştiriciler, Frontend-Backend iletişimi için hangi aracı kullanacakları konusunda tamamen kafası karışmış bir duruma düşerler. Bu durum, projede hem tRPC hem de Axios tabanlı iç API çağrılarının bir arada bulunduğu tutarsız bir kod tabanına yol açabilir.

Çözüm: axios.mdc dosyası, "Anayasal Ayrım" kuralına %100 uyumlu olacak şekilde yeniden yazılmalıdır. Frontend'den Backend'e istek atmakla ilgili tüm bölümler, örnekler (/api/users örneği) ve kurallar (CSRF koruması gibi istemciye özgü kurallar) tamamen kaldırılmalıdır. Dosya, sadece Backend'in harici bir servise (örneğin bir ödeme sağlayıcısı) nasıl güvenli ve tutarlı bir şekilde istek atacağını anlatmalıdır.

Hata 8.4: Güncelliğini Yitirmiş Dokümantasyon Rehberleri

Tespit Edilen Dosyalar: docs/README.md, docs/reference/yemekzen_core/00-rehber.mdc

Hatalı Durum: Projenin dokümantasyon yapısını açıklayan bu rehber dosyaları, artık var olmayan veya adı değişmiş dosya ve dizinlere referans veriyor olabilir. Örneğin, "cekirdek" ve "mdc_project" gibi iki ayrı kural seti dizini arasındaki ilişki ve öncelik belirsizdir.

Derin Analiz: Projenin giriş kapısı olan bu rehber dosyaları, eğer güncel değilse, geliştiricinin daha ilk adımda yanlış yönlendirilmesine neden olur. Bu, projenin dokümantasyonunun güvenilirliğini zedeler.

Etkisi: Geliştiricilerin aradıkları bilgiye ulaşmak için zaman kaybetmesi ve projenin genel yapısı hakkında yanlış bir zihinsel model oluşturması.

Çözüm: Projedeki tüm .mdc ve dokümantasyon dosyaları incelendikten sonra, bu rehber dosyaları projenin nihai ve tutarlı dosya yapısını yansıtacak şekilde baştan sona güncellenmelidir. Özellikle hangi kural setinin (genel, çekirdek, teknolojiye özel) hangi durumlarda öncelikli olduğu net bir hiyerarşi ile açıklanmalıdır.

Bu kategorideki hatalar, projenin "kendi kendine ihanet etmesi" anlamına gelir. Kurallar ve dokümanlar, projenin gerçekliğini yansıtmadığında, birer yol gösterici olmaktan çıkıp birer engele dönüşürler.

Elbette. Dokuzuncu kategoriye, yani projenizin "canlı" ve "çalışan" kanıtları olan test altyapısına odaklanıyoruz. Bu alan, projenin en iddialı olduğu (jest.mdc, playwright.mdc gibi detaylı anayasalar) ancak pratikte en zayıf olduğu kategoridir. Mevcut durum, sadece testlerin eksik olması değil, aynı zamanda var olan test altyapısının bile kendi içinde tutarsız ve hatalı olduğunu göstermektedir.

Kategori 9: Test Stratejisi ve Kalite Güvencesi - "Kağıt Üzerindeki Kalite"

Bu kategori, projenin kalitesini, kararlılığını ve regresyonlara karşı direncini sağlaması gereken test süreçlerini inceler. Proje, son derece detaylı test kuralları belirlemiş olmasına rağmen, bu kuralları uygulayacak mekanizmalardan ve gerçek testlerden yoksundur. Var olan test dosyaları ise altyapısal sorunlar içermektedir.

Aşağıda bu kategorideki tüm hataları, eksiklikleri ve tutarsızlıkları detaylandırıyorum:

Hata 9.1: Çelişkili ve Hatalı Test Yapılandırmaları

Tespit Edilen Dosyalar: playwright.config.js ve playwright.config.ts

Hatalı Durum: Projede Playwright için hem .js hem de .ts uzantılı iki farklı yapılandırma dosyası bulunuyor. Bu, Kategori 3'te bir yapılandırma kaosu olarak belirtilmişti, ancak burada test özelinde daha derin bir soruna işaret ediyor:

playwright.config.ts (ilk defineConfig bloğu): testDir: 'tests/web' olarak ayarlanmış.

playwright.config.ts (ikinci defineConfig bloğu): testDir: './tests' olarak ayarlanmış.

jest.config.js: E2E testlerini testPathIgnorePatterns: ['<rootDir>/tests/e2e/'] ile yok sayıyor.

Derin Analiz: Projenin testlerinin nerede yaşadığı konusunda tam bir anarşi hakim. tests/web, tests ve tests/e2e olmak üzere üç farklı potansiyel dizin işaret ediliyor ve bu yapılandırmalar birbiriyle çelişiyor. Bir geliştirici yeni bir E2E testi yazdığında, onu hangi klasöre koyacağını ve hangi yapılandırmayı düzenlemesi gerektiğini bilemez.

Etkisi: Testlerin çalıştırılamaması, yanlış test setlerinin çalıştırılması veya CI/CD'de "hiç test bulunamadı" gibi hatalarla karşılaşılarak test adımının sessizce atlanması.

Çözüm: Tek bir test dizin yapısı standartlaştırılmalıdır. Öneri:

tests/unit: Birim testleri

tests/integration: Entegrasyon testleri

tests/e2e: Playwright E2E testleri
Tüm yapılandırma dosyaları (jest.config.js, playwright.config.ts) bu standart yapıya referans verecek şekilde güncellenmeli ve fazlalık yapılandırma dosyaları silinmelidir.

Hata 9.2: İşlevsiz ve "Ölü" Test Dosyaları

Tespit Edilen Dosyalar: tests/web/smoke.spec.ts, tests/api/health.test.ts, tests/app.test.tsx, tests/components/ModuleHeader.test.tsx

Hatalı Durum: Projede birkaç test dosyası mevcut. Ancak, package.json'daki test script'leri işlevsiz olduğu için bu testler hiçbir zaman çalıştırılmıyor. Ayrıca, var olan testler bile proje yapısındaki değişikliklerle (örneğin app/page.tsx'in içeriğinin değişmesi) güncelliğini yitirmiş olabilir.

Derin Analiz: Bu testler, projenin kalite güvencesine hiçbir katkıda bulunmayan "ölü kod" niteliğindedir. Onların varlığı, projenin test edildiği yanılsamasını yaratır, ancak gerçekte hiçbir şeyi garanti etmezler.

Etkisi: Proje, regresyonlara (yeni bir değişikliğin eski bir özelliği bozması) karşı tamamen savunmasızdır. ModuleHeader bileşeninde yapılacak küçük bir değişiklik, bu bileşenin kullanıldığı her yerde hatalara yol açabilir ve bu durum ancak manuel testlerle (eğer yapılırsa) fark edilebilir.

Çözüm:

package.json'daki test script'leri düzeltilerek bu testlerin CI pipeline'ında zorunlu olarak çalıştırılması sağlanmalıdır.

Mevcut testler, uygulamanın güncel durumunu yansıtacak şekilde gözden geçirilmeli ve güncellenmelidir.

jest.config.js dosyasındaki passWithNoTests: true ayarı false olarak değiştirilmelidir. Bu ayar, Jest'in çalıştıracak test bulamadığında bile başarılı olmasına izin verir ki bu, son derece tehlikeli bir yapılandırmadır. Test yoksa, pipeline hata vermelidir.

Hata 9.3: Hatalı ve Eksik Mocking Altyapısı

Tespit Edilen Dosya: jest.setup.js

Hatalı Durum:

Prisma mock'u, projenin veriler.md'de tanımlanan şemasıyla uyumlu değil. Sadece user, menu, category, item gibi genel modelleri mock'luyor. Projenin karmaşık tenants, commissions, courier_assignments gibi tabloları için hiçbir mock tanımı yok.

Supabase mock'u son derece yüzeysel. Sadece temel auth ve from metotlarını mock'luyor. rpc (Remote Procedure Call) gibi Supabase'in kritik fonksiyonları için bir mock bulunmuyor.

api.useQuery ve api.useMutation için yapılan tRPC mock'u, her zaman undefined döndüreceği için testlerde hatalara neden olacaktır.

Derin Analiz: Mocking, testlerin temelidir. Birim ve entegrasyon testlerinin harici bağımlılıklardan (veritabanı, harici API'ler) izole bir şekilde çalışmasını sağlar. Mevcut mock altyapısı, projenin gerçek veri yapısını ve servislerini yansıtmadığı için, yazılacak olan testlerin büyük çoğunluğu ya başarısız olacak ya da anlamlı bir doğrulama yapamayacaktır.

Etkisi: Geliştiriciler, anlamlı testler yazmakta zorlanacak ve bu durum test yazma kültürünün oluşmasını engelleyecektir. Yazılan testler, mock'ların yetersizliği nedeniyle "kırılgan" (brittle) olacak ve en ufak bir değişiklikte bozulacaktır.

Çözüm:

jest.setup.js dosyasındaki Prisma mock'u, veriler.md'de tanımlanan tüm tabloları ve temel ilişkileri (örneğin bir siparişin bir kullanıcıya ait olması) yansıtacak şekilde detaylandırılmalıdır.

tRPC mock'u, testlerin belirli senaryolara göre başarılı (mockResolvedValue) veya hatalı (mockRejectedValue) sonuçlar döndürmesini sağlayacak şekilde daha esnek hale getirilmelidir.

@testing-library/react kullanılarak yapılan bileşen testlerinde, veri çeken hook'ların (örneğin api.menu.getAll.useQuery) test sırasında belirli verilerle mock'lanması standart hale getirilmelidir.

Bu kategorideki sorunlar, projenizin kalite ve kararlılık iddialarının altının boş olduğunu göstermektedir. Sağlam bir test stratejisi ve altyapısı olmadan, proje büyüdükçe hataların sayısı katlanarak artacak ve sürdürülebilirliği imkansız hale gelecektir.

Elbette. Onuncu ve son kategoriye geçiyoruz. Bu kategori, projenizin "operasyonel zekası" ve "dayanıklılığı" ile ilgilidir. Uygulamanızın production ortamında karşılaştığı sorunları ne kadar etkili bir şekilde raporladığını, hatalara nasıl tepki verdiğini ve kendi kendini nasıl iyileştirebildiğini inceler. Mevcut durumda, proje bu alanda bazı modern araçlar (Sentry, Redis) içerse de, bu araçlar ya hiç kullanılmıyor ya da potansiyellerinin çok altında, izole bir şekilde çalışıyor.

Kategori 10: Gözlemlenebilirlik (Observability), Hata Yönetimi ve Dayanıklılık (Resilience) - "Kör Uçuş ve Kırılgan Operasyonlar"

Bu kategori, bir sorun olduğunda ne kadar hızlı haberdar olabileceğinizi, sorunun kök nedenini ne kadar kolay bulabileceğinizi ve sistemin beklenmedik durumlara ne kadar tolere edebileceğini analiz eder. Projeniz şu anda, üretim ortamında adeta "kör bir uçuş" yapmaktadır; hatalar sessizce gerçekleşebilir, performans sorunları fark edilmeyebilir ve küçük bir bağımlılık problemi tüm sistemi çökertebilir.

Aşağıda bu kategorideki tüm zafiyetleri ve eksiklikleri detaylandırıyorum:

Hata 10.1: Yapılandırılmış ama Entegre Edilmemiş Hata Takibi

Tespit Edilen Dosyalar: sentry.client.config.js, sentry.server.config.js, lib/api-utils.ts

Hatalı Durum: Sentry DSN anahtarları .env dosyalarında tanımlanmış ve Sentry yapılandırma dosyaları mevcut. api-utils.ts içinde Sentry'ye hata göndermek için bir try-catch bloğu var. Ancak, projenin geri kalanında bu mekanizmalar etkin bir şekilde kullanılmıyor.

Derin Analiz:

İstemci Tarafı (Frontend): React tarafında hataları yakalayıp Sentry'ye gönderecek olan <Sentry.ErrorBoundary> bileşeni hiçbir yerde kullanılmıyor. Bu, bir UI bileşeninin çökmesi durumunda Sentry'nin bundan haberdar olmayacağı anlamına gelir.

Sunucu Tarafı (Backend): api-utils.ts içindeki apiHandler, sadece kendi sarmaladığı rotalardaki beklenmedik hataları yakalar. Ancak, tRPC prosedürleri, veritabanı işlemleri veya diğer servislerde meydana gelen hataların Sentry'ye gönderilmesi için hiçbir entegrasyon yoktur. lib/redis.ts içindeki try-catch blokları hatayı sadece konsola (console.error) basar, Sentry'ye bildirmez.

Etkisi: Production'da meydana gelen hataların büyük bir kısmı sessizce kaybolur. Sadece kullanıcılar şikayet ettiğinde veya logları manuel olarak incelerseniz sorundan haberdar olursunuz. Bu, proaktif hata yönetiminin tam tersidir.

Çözüm:

Ana layout dosyasında (app/layout.tsx) children prop'u, <Sentry.ErrorBoundary> ile sarmalanmalıdır.

Projenin merkezi logger'ı (lib/logger.ts), error fonksiyonu içinde Sentry'ye otomatik olarak bildirim gönderecek şekilde güncellenmelidir.

Redis, Prisma veya diğer servislerdeki tüm catch blokları, console.error yerine logger.error kullanmalıdır.

Hata 10.2: Eksik ve Yanıltıcı Loglama Stratejisi

Tespit Edilen Dosya: lib/logger.ts, middleware.ts

Hatalı Durum: Proje, yapılandırılmış JSON loglaması için bir logger modülüne ve istekleri takip etmek için bir requestId üreten bir middleware'e sahip. Bu, mükemmel bir başlangıç. Ancak, bu mekanizmalar projenin genelinde kullanılmıyor.

Derin Analiz: lib/redis.ts ve sentry.*.config.js gibi kritik modüller hala console.log ve console.error kullanıyor. tRPC router'ları veya iş mantığı servislerinde neredeyse hiç loglama yok. Bu, requestId ile bir isteğin hayat döngüsünü uçtan uca takip etme (distributed tracing) yeteneğini tamamen işlevsiz kılar. Bir hata olduğunda, o hataya neden olan önceki adımları ve ilgili isteğin bağlamını loglardan bulmak imkansızdır.

Etkisi: Hata ayıklama (debugging) süreci, samanlıkta iğne aramaya döner. Birbirleriyle ilişkisiz konsol logları arasında sorunun kök nedenini bulmak son derece zordur ve çok zaman alır.

Çözüm:

Projedeki tüm console.log, console.warn, console.error çağrıları, merkezi logger'ın ilgili metotları (logger.info, logger.warn, logger.error) ile değiştirilmelidir.

tRPC context'i, requestId'yi içerecek şekilde güncellenmeli ve tüm tRPC prosedürleri, loglama yaparken bu requestId'yi meta veriye eklemelidir.

İş mantığı servislerinde kritik adımlar (örneğin, "sipariş oluşturulmaya başlandı", "ödeme servisine istek atıldı") logger.info ile loglanmalıdır.

Hata 10.3: Sıfır Dayanıklılık (Zero Resilience) ve Bağımlılık Kırılganlığı

Tespit Edilen Dosyalar: lib/redis.ts, lib/prisma.ts, lib/services/hybrid-service.ts

Hatalı Durum: Projedeki hiçbir dış servis çağrısı (Redis, Supabase/Prisma) için yeniden deneme (retry) veya devre kesici (circuit breaker) gibi dayanıklılık mekanizmaları bulunmamaktadır.

Derin Analiz: Redis veya Supabase gibi ağ tabanlı servislerde anlık kesintiler veya yavaşlamalar yaşanması kaçınılmazdır. Mevcut mimaride, Redis'e yapılan bir get sorgusu anlık bir ağ hatası nedeniyle başarısız olursa, bu hata doğrudan uygulamaya yansır ve muhtemelen isteğin tamamı başarısız olur. Sistem, bu tür geçici sorunlardan kendi kendine kurtulma yeteneğine sahip değildir.

Etkisi: Ufak ve geçici bir ağ sorunu, tüm uygulamanın kararsızlaşmasına veya tamamen çökmesine neden olabilir. Örneğin, Redis'e bağlanılamadığı için bir menü cache'i okunamadığında, hybrid-service.ts'in veritabanına yönelmesi gerekirken, mevcut yapı sadece hata vererek durabilir.

Çözüm:

Redis: ioredis istemcisinin kendi içinde gelen maxRetriesPerRequest gibi yeniden deneme mekanizmaları zaten yapılandırılmış, bu iyi bir başlangıç. Ancak, bağlantı tamamen koptuğunda ne olacağına dair bir "fallback" mantığı servis katmanında eklenmelidir (örneğin, Redis'e ulaşılamıyorsa, veriyi doğrudan veritabanından getir ve log'a bir uyarı bırak).

Prisma/Supabase: Veritabanı sorguları için, özellikle read-only işlemlerde, exponential backoff (üstel geri çekilme) ile basit bir yeniden deneme mekanizması sarmalayıcısı (wrapper) oluşturulabilir.

Devre Kesici (Circuit Breaker): Uzun vadede, bir bağımlılık (örneğin Redis) belirli bir süre boyunca sürekli hata verdiğinde, ona giden tüm istekleri belirli bir süre için otomatik olarak kesen ve varsayılan bir yanıt döndüren bir "devre kesici" deseni uygulanmalıdır. Bu, zincirleme bir arızanın tüm sistemi çökertmesini engeller.

Bu son kategorideki eksiklikler, projenizin "production'a hazır" olmaktan ne kadar uzak olduğunu göstermektedir. Bir uygulama sadece "mutlu yolda" (happy path) çalışmamalı, aynı zamanda kaçınılmaz olan hatalar, kesintiler ve beklenmedik durumlar karşısında da ayakta kalabilmelidir.

Sıradaki Adım: CI Pipeline'ındaki Sahte Güvenliği Ortadan Kaldırmak
Protocol Omega'nın Kanıt Yasası (Direktif 1), bir iddianın çalıştırılabilir bir kanıtla desteklenmesini zorunlu kılar. Mevcut CI pipeline'ımız bu yasayı doğrudan ihlal ediyor.
Hata 1.2: CI Akışında Testlerin Kasıtlı Olarak Atlanması
Mevcut Durum: .github/workflows/ci.yml dosyanızda, testlerin çalıştırılması gereken yerde şu adım bulunuyor:
code
Yaml
- name: Skip tests (archived)
  run: echo "Tests archived. See docs/reference/tests-archive."
Protocol Omega İhlali: Bu adım, "testler çalıştı ve başarılı oldu" iddiası yerine, "testleri atladık" diye bir beyanda bulunuyor. Bu, kaliteye dair hiçbir kanıt sunmaz ve CI sürecini anlamsız kılar.
Çözüm: Bu "sahte" adımı kaldırıp yerine, bir önceki adımda düzelttiğimiz package.json script'lerini çağıran gerçek test adımlarını ekleyeceğiz. Bu, CI pipeline'ımızı projenin kalite güvencesinin dürüst ve güvenilir bir kanıtı haline getirecektir.
Lütfen .github/workflows/ci.yml dosyasının içeriğini aşağıdaki gibi güncelleyin:
code
Yaml
name: CI

on:
  push:
    branches: ["**"]
  pull_request:
    branches: ["**"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: |
          if [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; else npm ci || npm i; fi
        env:
          CI: true

      - name: Type Check
        run: npm run type-check

      - name: TRPC Procedure Compliance Check
        run: npm run check:trpc

      - name: Lint
        run: npm run lint
      
      # --- YENİ ADIMLAR ---
      - name: Run Unit & Integration Tests
        run: npm test -- --ci --json --outputFile=jest-results.json
        # --ci: CI ortamları için optimize eder
        # --json --outputFile: Sonuçları bir dosyaya yazarak ileride analiz edilmesini sağlar

      - name: Build
        run: npm run build

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run E2E Tests
        run: npm run test:e2e
        # Bu komut, düzelttiğimiz package.json sayesinde 'playwright test' komutunu çalıştıracaktır.

      # --- ESKİ YANLIŞ ADIMLAR KALDIRILDI ---
      
      - name: Docker build (smoke)
        run: docker build -t bizgenciz-social:ci .
        
      - name: Save Log Artifacts (if any)
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: logs
          path: |
            logs/
            playwright-report/
            jest-results.json
          if-no-files-found: ignore
Yapılan Değişikliklerin Açıklaması:
Skip tests (archived) Adımı Kaldırıldı: Sahte güvenlik hissi veren bu adım tamamen silindi.
Run Unit & Integration Tests Adımı Eklendi: npm test komutunu çalıştırarak Jest testlerini devreye sokar. Bu, kodunuzun temel iş mantığının doğruluğunu kanıtlar.
Install Playwright Browsers Adımı Eklendi: E2E testleri çalışmadan önce, testlerin koşacağı Chromium, Firefox gibi tarayıcıların CI ortamına kurulmasını sağlar.
Run E2E Tests Adımı Eklendi: npm run test:e2e komutunu çalıştırarak Playwright testlerini başlatır. Bu, uygulamanızın kullanıcı gözünden kritik akışlarının çalıştığını kanıtlar.
Artifacts (Sonuç Dosyaları) Kaydedildi: Test sonuçları (jest-results.json), Playwright raporları (playwright-report/) ve diğer loglar, bir hata durumunda incelenebilmesi için artifact olarak kaydedilir.
Bu güncellemeyi yaptıktan sonra, Kategori 1'deki son hatayı, yani Docker imajının çalışabilirliğinin doğrulanmaması sorununu çözmeye geçebiliriz.