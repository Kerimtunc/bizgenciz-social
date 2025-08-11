# 📚 YemekZen QR Menu Elite Edition - Dokümantasyon

Bu klasör, YemekZen QR Menu Elite Edition projesinin tüm dokümantasyonunu içerir.

## 🗂️ Kategorize Edilmiş Klasör Yapısı

### 📖 **core/** - Ana Dokümantasyon
Projenin temel dokümantasyonu ve mimari kararları.

- **`00-rehber.mdc`** - Dokümantasyon rehberi ve arama kılavuzu
- **`01-birinci.md`** - Ana mimari kararları ve proje kurulum rehberi

### 🧠 **cekirdek/** - Çekirdek Proje Bilgileri
Projenin temel çekirdek bilgileri ve ana dokümantasyonu.

**İçerik**: 13 çekirdek dosya
- **Proje Temelleri**: anayasa.md, anayapi.md, bilgiler.md
- **Planlama**: plan.md, ozellikler.md, eklenebilecekler.md
- **Kontrol**: kontroller.md, insankontrol.md, insaedilecekler.md
- **Teknik**: three-js.md, db_kutuphane.md, boru-hatlari.md
- **Referans**: enler.md

### 📋 **reference/** - Referans Materyalleri
Teknik referans dokümantasyonu, API bilgileri ve sistem modülleri.

**İçerik**: 80+ referans dosyası
- API dokümantasyonu
- UI bileşenleri referansı
- Veritabanı şemaları
- Sistem modülleri
- Konfigürasyon dosyaları
- Veri şemaları ve tipleri

### 📚 **guides/** - Kullanım Kılavuzları
Geliştirici ve kullanıcı kılavuzları.

**İçerik**: Özellik referans dosyaları
- **`00-feature-reference.md`** - Hangi özellik için hangi dosyadan faydalanılacağı

### 🔧 **mdc_project/** - Teknoloji Referansları
Tüm teknoloji ve kütüphane dokümantasyonları.

**İçerik**: 25+ .mdc dosyası
- Framework'ler (Next.js, React, TypeScript)
- Kütüphaneler (Prisma, Supabase, Zustand)
- Araçlar (Docker, Jest, Playwright)
- Standartlar (ESLint, Tailwind, Shadcn)

### 🧩 **project_modules/** - Modül Dokümantasyonu
Sistem modülleri ve sayfa dokümantasyonları.

**İçerik**: 25+ modül dosyası
- Sistem modülleri (health-check, menu-templates)
- Sayfa dokümantasyonları (home-page, login-page)
- Sidebar bileşenleri (desktop-sidebar, right-sidebar)
- UI bileşenleri (ui-components, user-settings)

### 🚀 **project/** - Genel Proje Yönetimi
Proje yönetimi, planlama ve genel dokümantasyon.

**İçerik**: 19 proje dosyası
- Proje planları (projelendirme.md)
- Özellik dokümantasyonu (ozellikler-karsilastirma.md)
- Teknik dokümantasyon (supabase.md)
- Genel bilgiler (uyumluluk.md, uyumluluksonuc.md)
- Kütüphane dosyaları (backend_kutuphane.md, frontend_kutuphane.md)
- CI/CD ve deployment (github-ci-cd-setup.md, cross-platform-testing.md)

## 🔍 Hızlı Başlangıç

1. **Yeni başlayanlar için**: `core/00-rehber.mdc` dosyasını okuyun
2. **Proje kurulumu için**: `core/01-birinci.md` dosyasını takip edin
3. **Çekirdek bilgiler için**: `cekirdek/` klasöründeki temel dosyaları inceleyin
4. **Özellik referansı için**: `guides/00-feature-reference.md` dosyasını inceleyin
5. **Teknoloji referansı için**: `mdc_project/` klasöründeki ilgili .mdc dosyalarını bulun
6. **Modül dokümantasyonu için**: `project_modules/` klasöründeki ilgili dosyaları inceleyin
7. **Proje yönetimi için**: `project/` klasöründeki planlama dosyalarını okuyun

## 📝 Dokümantasyon Kuralları

- Tüm dosyalar Markdown formatında yazılmalıdır
- Kod örnekleri TypeScript/JavaScript ile verilmelidir
- Her dosya açık ve anlaşılır olmalıdır
- Güncellemeler düzenli olarak yapılmalıdır

## 🤝 Katkıda Bulunma

Dokümantasyona katkıda bulunmak için `project/` klasöründeki katkıda bulunma kılavuzlarını takip edin.

---

**Son Güncelleme**: 4 Ağustos 2025
**Versiyon**: 5.0 (Çekirdek Klasörü Eklendi)
**Değişiklik**: cekirdek/ klasörü eklendi, projenin temel bilgileri buraya taşındı 