# 📚 YemekZen Dokümantasyon Merkezi

Bu klasör, YemekZen projesinin tüm teknik dokümantasyonunu içerir. Dosyalar içeriklerine göre kategorize edilmiş ve kolay erişim için organize edilmiştir.

## 🗂️ Klasör Yapısı

### 🏗️ **Architecture** - Mimari ve Sistem Tasarımı
```
architecture/
├── system-design/          # Sistem tasarım dokümantasyonu
│   └── birinci.md         # Ana mimari kararları ve stratejiler
├── patterns/              # Tasarım desenleri
│   └── dynamic-navigation-system.md  # Dinamik navigasyon sistemi
└── decisions/             # Mimari kararlar (ADRs)
```

### 🧩 **Components** - UI Bileşenleri ve Kütüphaneleri
```
components/
├── ui/                    # Temel UI bileşenleri
│   ├── 03-particle-canvas.md
│   ├── 04-modern-card-system.md
│   ├── 05-status-widget-system.md
│   ├── 07-complete-component-library.md
│   ├── 09-comprehensive-ui-library.md
│   ├── 15-shadcn-ui-component-library.md
│   ├── 16-status-widget-system.md
│   ├── 36-empty-state-component-system.md
│   ├── 37-ui-components-library-system.md
│   └── 38-product-card-component-system.md
├── layout/                # Layout bileşenleri
│   └── 10-advanced-layout-system.md
├── forms/                 # Form bileşenleri
│   └── 39-category-modal-component-system.md
├── charts/                # Grafik ve analitik bileşenleri
│   └── 02-analytics-widget.md
└── navigation/            # Navigasyon bileşenleri
    ├── 01-global-search-component.md
    ├── 06-admin-floating-menu.md
    ├── 08-advanced-menu-system.md
    └── 15-advanced-navigation-system.md
```

### 📦 **Modules** - İş Modülleri ve Özellikler
```
modules/
├── business/              # İş modülleri
│   ├── 17-advanced-orders-management.md
│   ├── 18-customer-relationship-management.md
│   ├── 20-menu-management-system.md
│   ├── 21-loyalty-program-system.md
│   ├── 25-customer-feedback-system.md
│   ├── 26-reservation-management-system.md
│   ├── 31-inventory-management-system.md
│   ├── 32-table-management-system.md
│   ├── 33-upsell-crosssell-management-system.md
│   └── 48-pos-module-system.md
├── management/            # Yönetim modülleri
│   ├── 23-staff-management-system.md
│   ├── 28-kitchen-management-system.md
│   ├── 30-calendar-management-system.md
│   ├── 43-main-panel-system.md
│   ├── 44-admin-panel-system.md
│   ├── 45-menu-management-panel-system.md
│   └── 46-settings-panel-system.md
├── analytics/             # Analitik modülleri
│   └── 19-business-intelligence-reports.md
├── communication/         # İletişim modülleri
│   ├── 24-notification-management-system.md
│   └── 29-communications-system.md
└── system/                # Sistem modülleri
    ├── 22-help-support-system.md
    ├── 27-system-settings-management.md
    ├── 40-changelog-management-system.md
    ├── 41-archive-management-system.md
    └── 42-metadata-management-system.md
```

### 🔌 **API** - API Dokümantasyonu ve Entegrasyonlar
```
api/
├── endpoints/             # API endpoint'leri
│   └── 12-tRPC-api-framework.md
├── integrations/          # Harici entegrasyonlar
│   └── 11-hybrid-cache-service.md
├── authentication/        # Kimlik doğrulama
├── realtime/              # Gerçek zamanlı özellikler
├── documentation/         # API dokümantasyonu
├── examples/              # API örnekleri
└── testing/               # API testleri
```

### 🗄️ **Database** - Veritabanı Şemaları ve Modelleri
```
database/
├── schemas/               # Veritabanı şemaları
│   └── 13-prisma-database-schema.md
├── migrations/            # Migration dosyaları
├── models/                # Veri modelleri
├── seeding/               # Seed verileri
├── indexes/               # Veritabanı indeksleri
├── relationships/         # Tablo ilişkileri
└── constraints/           # Veritabanı kısıtlamaları
```

### 🚀 **Deployment** - Deployment ve CI/CD
```
deployment/
├── ci-cd/                 # CI/CD pipeline'ları
├── environments/          # Ortam konfigürasyonları
├── monitoring/            # İzleme ve loglama
│   └── 14-health-check-system.md
├── backup/                # Yedekleme stratejileri
├── docker/                # Docker konfigürasyonları
├── kubernetes/            # Kubernetes deployment'ları
└── cloud/                 # Cloud deployment'ları
```

### 🔒 **Security** - Güvenlik Dokümantasyonu
```
security/
├── authentication/        # Kimlik doğrulama
├── authorization/         # Yetkilendirme
├── data-protection/       # Veri koruma
├── audit/                 # Denetim logları
├── encryption/            # Şifreleme
├── compliance/            # Uyumluluk
└── penetration-testing/   # Penetrasyon testleri
```

### 📖 **Guides** - Kullanım Kılavuzları ve Referanslar
```
guides/
├── user-guides/           # Kullanıcı kılavuzları
│   ├── getting-started/   # Başlangıç rehberleri
│   ├── tutorials/         # Eğitimler
│   └── faq/              # Sık sorulan sorular
├── developer-guides/      # Geliştirici kılavuzları
│   ├── setup/            # Kurulum rehberleri
│   ├── contributing/     # Katkıda bulunma
│   ├── code-style/       # Kod stili
│   └── 00-feature-reference.md  # Özellik referansı
├── api-documentation/     # API dokümantasyonu
└── troubleshooting/       # Sorun giderme
```

### 📋 **Templates** - Şablonlar ve Hazır Yapılar
```
templates/
├── components/            # Bileşen şablonları
│   ├── 34-menu-templates-system.md
│   └── 35-ready-categories-system.md
├── pages/                 # Sayfa şablonları
│   └── 47-home-page-system.md
├── modules/               # Modül şablonları
└── api/                   # API şablonları
```

### 🗃️ **Legacy** - Eski ve Kurtarma Dosyaları
```
legacy/
├── old-reference/         # Eski referans dosyaları
├── deprecated/            # Kullanımdan kaldırılan dosyalar
│   └── enler.md
└── backup-files/          # Yedek dosyalar
```

## 🔍 Hızlı Erişim

### 🚀 **Başlangıç İçin**
- **Mimari Kararlar**: `architecture/system-design/birinci.md`
- **Kurulum**: `guides/developer-guides/setup/`
- **Özellik Referansı**: `guides/developer-guides/00-feature-reference.md`

### 🧩 **Bileşen Geliştirme**
- **UI Bileşenleri**: `components/ui/`
- **Navigasyon**: `components/navigation/`
- **Formlar**: `components/forms/`
- **Grafikler**: `components/charts/`

### 📦 **Modül Geliştirme**
- **İş Modülleri**: `modules/business/`
- **Yönetim**: `modules/management/`
- **Analitik**: `modules/analytics/`
- **İletişim**: `modules/communication/`

### 🔌 **API Geliştirme**
- **tRPC Framework**: `api/endpoints/12-tRPC-api-framework.md`
- **Cache Service**: `api/integrations/11-hybrid-cache-service.md`
- **Örnekler**: `api/examples/`

### 🗄️ **Veritabanı**
- **Prisma Schema**: `database/schemas/13-prisma-database-schema.md`
- **Migration'lar**: `database/migrations/`
- **İlişkiler**: `database/relationships/`

## 📝 Dokümantasyon Standartları

### 📄 **Dosya Adlandırma**
- Türkçe dosya adları kullanılır
- Kategorik önekler (örn: `01-`, `02-`)
- Açıklayıcı isimler
- `.md` uzantısı

### 🏷️ **İçerik Yapısı**
- Başlık ve açıklama
- Teknik detaylar
- Kod örnekleri
- Kullanım senaryoları
- İlgili dosyalar

### 🔗 **Cross-Reference**
- İlgili dosyalara linkler
- Bağımlılıklar
- Ön koşullar
- Sonraki adımlar

## 🛠️ Bakım ve Güncelleme

### 📋 **Yeni Dosya Ekleme**
1. Uygun kategoriyi belirle
2. Standart adlandırma kullan
3. README'yi güncelle
4. Cross-reference ekle

### 🔄 **Güncelleme Süreci**
1. İçeriği güncelle
2. İlgili dosyaları kontrol et
3. Cross-reference'ları doğrula
4. README'yi güncelle

### 🗑️ **Arşivleme**
- Kullanımdan kaldırılan dosyalar `legacy/deprecated/`
- Eski referanslar `legacy/old-reference/`
- Yedekler `legacy/backup-files/`

## 📞 Destek

Dokümantasyon ile ilgili sorular için:
- **Geliştirici Rehberi**: `guides/developer-guides/`
- **Sorun Giderme**: `guides/troubleshooting/`
- **API Dokümantasyonu**: `api/documentation/`

---

*Son güncelleme: 3 Ağustos 2025* 