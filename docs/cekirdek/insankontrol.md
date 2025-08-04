# İNSAN KONTROLÜ - YemekZen QR Menu Elite Edition

## 📋 Görev Sentezleme Kontrol Paneli

Bu dosya, LLM'in otonom kararlarını ve sentezleme süreçlerini insan mühendislerin gözden geçirmesi için tasarlanmıştır. Her görev için LLM'in aldığı kararlar, varsayımlar ve sentezleme süreçleri burada kayıt altına alınır.

---

## 🔄 Aktif Görevler (Bekleyen İnceleme)

### **[TASK_CODE]:** [GÖREV-KODU]
- **Orijinal İstem:** [Kullanıcının orijinal isteği]
- **Sentezlenen Varsayım:** [LLM'in yaptığı varsayım ve genişletme]
- **Gerekçe:** [LLM'in bu varsayımı neden yaptığı]
- **Review Status:** [ ] Pending Review
- **Review Notes:** (Mühendis tarafından kod incelemesi sırasında doldurulacak)
- **Learning Outcome:** (İnceleme sonrası - neyin çalıştığı/çalışmadığı)

---

## ✅ Onaylanmış Görevler

### **[TASK_CODE]:** [ONAYLANMIŞ-GÖREV]
- **Orijinal İstem:** [Kullanıcının orijinal isteği]
- **Sentezlenen Varsayım:** [LLM'in yaptığı varsayım]
- **Gerekçe:** [LLM'in gerekçesi]
- **Review Status:** ✅ Approved
- **Review Notes:** [Mühendisin onay notları]
- **Learning Outcome:** [Başarılı yaklaşımın özeti]

---

## ❌ Reddedilmiş Görevler

### **[TASK_CODE]:** [REDDEDİLEN-GÖREV]
- **Orijinal İstem:** [Kullanıcının orijinal isteği]
- **Sentezlenen Varsayım:** [LLM'in yaptığı varsayım]
- **Gerekçe:** [LLM'in gerekçesi]
- **Review Status:** ❌ Rejected with Reason
- **Review Notes:** [Mühendisin red gerekçesi]
- **Learning Outcome:** [Bu yaklaşımdan kaçınılması gereken nedenler]

---

## 📊 Öğrenme İstatistikleri

- **Toplam Görev:** 0
- **Onaylanan:** 0
- **Reddedilen:** 0
- **Bekleyen:** 0
- **Başarı Oranı:** 0%

---

## 🔧 Sistem Kullanım Talimatları

### Mühendis İnceleme Süreci:
1. **Kod İncelemesi:** Görevin implementasyonunu inceleyin
2. **Karar Değerlendirmesi:** LLM'in sentezleme kararlarını değerlendirin
3. **Review Notes:** İnceleme notlarınızı ekleyin
4. **Review Status:** Durumu güncelleyin (Approved/Rejected)
5. **Learning Outcome:** Öğrenme çıktısını belgeleyin

### LLM Öğrenme Süreci:
1. **Arşivleme:** Onaylanan/reddedilen görevler technical_memory_archive'a aktarılır
2. **Anti-Pattern Öğrenme:** Reddedilen yaklaşımlar "yapılmaması gerekenler" olarak öğrenilir
3. **Pattern Öğrenme:** Onaylanan yaklaşımlar "yapılması gerekenler" olarak öğrenilir

---

## 📝 Şablon Kullanımı

Yeni bir görev için bu şablonu kullanın:

```markdown
### **[TASK_CODE]:** [YENİ-GÖREV-KODU]
- **Orijinal İstem:** [Kullanıcının orijinal isteği]
- **Sentezlenen Varsayım:** [LLM'in yaptığı varsayım ve genişletme]
- **Gerekçe:** [LLM'in bu varsayımı neden yaptığı]
- **Review Status:** [ ] Pending Review
- **Review Notes:** (Mühendis tarafından kod incelemesi sırasında doldurulacak)
- **Learning Outcome:** (İnceleme sonrası - neyin çalıştığı/çalışmadığı)
```
