````md
# **Claude Code'un "akılsız" davranmasını önlemek ve daha az hatayla özellik göndermek için en iyi uygulamalar**

_(Bu ipuçları genellikle Cursor ve diğer kodlama araçları için de geçerli)_

---

## **1. Planlama aşamasını beklediğinden uzun tut**

Claude Desktop'u açık uçlu bir konuşma yürütmek için kullan. Şu konuları tartış:

- Kullanılacak teknoloji yığını (tech stack)  
- Kullanılacak paketler ve kütüphaneler  
- Gerekli MVP (minimum uygulanabilir ürün) özellikleri  

> Yeni bir yığın kullanıyorsan, Claude'un önerilerini **manuel olarak doğrula**.

---

## **2. Bağlantılar ve GitHub repoları bul ve paylaş**

Claude bazen en güncel paketleri bilmez. Bu yüzden dökümantasyon ve GitHub repo URL’lerini kendin bul ve Claude’a bağlam olarak ver.

> **İpucu:** `uithub.com` kullan, böylece Claude repo bağlamını daha iyi anlar.

---

## **3. Claude’a aşırı detaylı bir adım adım plan yazdır**

Claude’a herkesin (insan ya da ajan) takip edebileceği **detaylı bir plan** yazdır.

> **NOT:** Bu planı Claude Code'a **tamamıyla verme**, sadece senin elinde dursun. Sen orkestrayı yöneten kişi ol, adım adım uygula.

---

## **4. En kısa sürede çalışan bir versiyon çıkar**

Tüm özellikleri bir seferde yapmaya çalışma. Claude ile birlikte hedefiniz: **çalışan bir MVP’yi hızlıca çıkarmak.**

> Önce çalışsın, sonra tek tek özellikleri ekle.  
> 10 özelliği birden değil, **bir tanesini** eklemek daha kolaydır.

---

## **5. Claude Code’da `/init` komutu ile CLAUDE.md oluştur**

Çalışan bir MVP çıkınca `/init` çalıştır. Daha sonra bu dosyaya `#` ile yeni kurallar ekle:

```md
# Her zaman `bun typecheck` komutunu çalıştır, tip hataları için.
````

> Bu ana CLAUDE.md sadece **genel proje kuralları** içermeli.

---

## **6. Alt klasörlere CLAUDE.md dosyaları ekle**

Claude'un daha az "akılsız" davranmasının gizli kahramanı bu.
Her alt klasöre özel kurallar yaz:

```txt
/src/components/CLAUDE.md  
/src/db/CLAUDE.md
```

> Bu sayede Claude daha **yerel ve bağlamsal** anlayış geliştirir. **Fark büyük olur.**

---

## **7. Her oturumu kaydet**

Her Claude oturumunda şunları yaz:

* Üzerinde çalıştığın konu neydi?
* Bu oturumda ne yaptın?
* Ne işe yaradı, ne yaramadı?
* Sıradaki adım ne?

> **Claude Sessions** komutlarını kullan. Böylece geçmiş bağlamı saklamış olursun.

---

## **8. Mümkün olan en erken anda `/clear` kullan**

İstersen `/compact` de kullanabilirsin. Ama eğer oturumları kaydediyorsan, **son oturumu** detaylı bağlam olarak kullanabilirsin.

> Claude’da "context warning" görünmeye başladığında etkisi düşer.
> Bu yüzden **iyi bir durma noktasında** oturumu sonlandırıp `/clear` yap.

---

## **9. Subagent ve "ultrathink" kullanımını sınırlı tut**

İkisi de çok güçlü araçlar ama Claude’un bağlam sınırını **hızla doldurur**. Bu da Claude’un "akılsız" gibi davranmasına neden olur.

> Subagent ve ultrathink’i planlama ve anlamaya yardım etmesi için kullan.
> Sonra oturumu kaydet ve `/clear` komutu ile temizleyip çalışmaya başla.

```
```
