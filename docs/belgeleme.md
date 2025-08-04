# 📋 Cekirdek.mdc ve 0-genel.mdc Geliştirme Önerileri

## 🔍 Analiz Kaynağı
Bu öneriler `docs/project/yenidenyazma.md` dosyasından çıkarılmıştır.

---

## 🧠 Cekirdek.mdc'ye Eklenecek Geliştirmeler

### 1. **Sıfır Toleranslı Mock Data Politikası**
**Mevcut Durum**: Protokol 0'da mock data kullanımı ile ilgili net kurallar yok.
**Önerilen Ek**: 
```markdown
### **Aksiyom IV: Gerçek Veri Zorunluluğu (Real Data Mandate)**
- **YASAK**: Frontend veya backend geliştirme sürecinde statik, hard-coded veya geçici mock data kullanmak kesinlikle yasaktır.
- **ZORUNLULUK**: Bir bileşenin veriye ihtiyacı varsa, bu veri her zaman geliştirme veritabanından, çalışan bir API endpoint'i aracılığıyla çekilmelidir.
- **ÖNCELİK**: Eğer ilgili API veya tablo henüz yoksa, geliştirmenin ilk adımı bu API'yi ve veritabanı yapısını oluşturmaktır.
```

### 2. **Veritabanı Öncelikli Yaklaşım (Database-First)**
**Mevcut Durum**: Aksiyomatik çerçevede veritabanı önceliği belirtilmemiş.
**Önerilen Ek**:
```markdown
### **Aksiyom V: Veritabanı Öncelikli Tasarım (Database-First Design)**
- **Tek Doğruluk Kaynağı**: Veritabanıdır. Her şey veritabanında başlar ve biter.
- **Tasarım Süreci**: 
  1. Tablolar, sütunlar, veri tipleri, ilişkiler tasarlanır
  2. Gerçekçi test verileri ile doldurulur
  3. ORM modelleri veritabanından üretilir
- **Kod Üretimi**: Kod, veritabanını değil; veritabanı, kodu şekillendirir.
```

### 3. **Kırılmaz Pipeline Mantığı**
**Mevcut Durum**: Pipeline mantığı ve ön koşul analizi eksik.
**Önerilen Ek**:
```markdown
### **Aksiyom VI: Kırılmaz Pipeline Analizi (Unbreakable Pipeline Logic)**
- **Ön Koşul Analizi**: Her özellik için "ön koşul ve etki analizi" dokümante edilmelidir.
- **Rol & Yetki Ön Koşulu**: Kullanıcı rolleri ve yetkileri önceden tanımlanmalıdır.
- **Veri Oluşturma Ön Koşulu**: Veri oluşturma arayüzleri ve API'leri çalışır durumda olmalıdır.
- **Sonuç & Etki**: Tüm kayıtlar ve bildirimler eksiksiz çalışmalıdır.
```

---

## 🔧 0-genel.mdc'ye Eklenecek Geliştirmeler

### 1. **Katmanlı Test Stratejisi**
**Mevcut Durum**: Test stratejisi detaylandırılmamış.
**Önerilen Ek**:
```markdown
### **Directive 6: Katmanlı Test Zorunluluğu (Layered Testing Mandate)**
- **Birim Testler**: Tek fonksiyon/method testleri, bağımlılıklar mock'lanabilir
- **Entegrasyon Testleri**: İki veya daha fazla bileşen birlikte çalışması, ASLA MOCK VERİTABANI KULLANILMAZ
- **E2E Testleri**: Tüm sistem bütün olarak, gerçek kullanıcı gibi test edilir
- **Sözleşme Testleri**: Frontend-backend iletişim hatalarını deploydan önce yakalar
```

### 2. **API Sözleşme Testleri ve Veri Kataloğu**
**Mevcut Durum**: API sözleşme testleri ve veri kataloğu eksik.
**Önerilen Ek**:
```markdown
### **Directive 7: API Sözleşme Yönetimi (API Contract Management)**
- **Sözleşme Tanımı**: Backend her endpoint için "sözleşme" yayınlar
- **Tüketici Testi**: Frontend sözleşmeye dayalı testler yazar
- **Otomatik Kontrol**: CI pipeline sözleşme testlerini çalıştırır
- **Veri Kataloğu**: Şema değişiklikleri ve API sözleşme versiyonları otomatik versiyonlanır
```

### 3. **Kalite Kapıları ve Çevresel Tutarlılık**
**Mevcut Durum**: CI/CD pipeline detayları eksik.
**Önerilen Ek**:
```markdown
### **Directive 8: Kalite Kapıları (Quality Gates)**
Her git push işlemi şu adımları tetiklemelidir:
1. Statik kod analizi (linter)
2. Birim Testleri
3. Entegrasyon Testleri
4. Sözleşme Testleri

### **Directive 9: Çevresel Tutarlılık (Environmental Parity)**
- Geliştirme, test ve üretim ortamları mümkün olan en yakın konfigürasyonda olmalıdır
- Docker gibi konteyner teknolojileri kullanılmalıdır
- "Benim makinemde çalışıyordu" mazeretini ortadan kaldırmak için
```

### 4. **Rol ve Yetki Bazlı Geliştirme (RBAC)**
**Mevcut Durum**: RBAC prensipleri eksik.
**Önerilen Ek**:
```markdown
### **Directive 10: RBAC Zorunluluğu (RBAC Mandate)**
- **Öncelikli Düşünce**: Bir özellik geliştirilirken, kimin kullanabileceği en başından düşünülmelidir
- **API Koruması**: API endpoint'leri en başından itibaren rol ve yetki kontrolleri ile korunmalıdır
- **Arayüz Koruması**: Arayüz bileşenleri rol ve yetki kontrolleri ile korunmalıdır
```

---

## 🎯 Uygulama Öncelikleri

### **Yüksek Öncelik**
1. **Sıfır Toleranslı Mock Data Politikası** - Hemen uygulanmalı
2. **Veritabanı Öncelikli Yaklaşım** - Tüm yeni geliştirmelerde zorunlu
3. **Katmanlı Test Stratejisi** - Mevcut test yapısını genişletmeli

### **Orta Öncelik**
1. **API Sözleşme Testleri** - CI/CD pipeline'ına entegre edilmeli
2. **Kalite Kapıları** - GitHub Actions workflow'larına eklenmeli
3. **RBAC Zorunluluğu** - Yeni özelliklerde uygulanmalı

### **Düşük Öncelik**
1. **Veri Kataloğu** - Uzun vadeli proje olarak planlanmalı
2. **Çevresel Tutarlılık** - Docker yapılandırması tamamlandıktan sonra

---

## 📝 Uygulama Notları

### **Cekirdek.mdc için**
- Yeni aksiyomlar mevcut aksiyomatik çerçeveye entegre edilmeli
- Protokol 0'ın işleyişi bu yeni kuralları destekleyecek şekilde güncellenmeli
- Örnek uygulamalar yeni aksiyomları gösterecek şekilde genişletilmeli

### **0-genel.mdc için**
- Yeni direktifler mevcut direktif numaralandırma sistemine uygun şekilde eklenmeli
- Task-Tool Orchestration Manifesto'ya yeni senaryolar eklenmeli
- Mevcut prensipler yeni direktiflerle uyumlu hale getirilmeli

---

**Son Güncelleme**: 4 Ağustos 2025
**Kaynak**: `docs/project/yenidenyazma.md`
**Durum**: Analiz tamamlandı, uygulama bekleniyor
