# 🚀 Otonom B2B2C Marketplace Platformu: Stratejik Mimari Rehberi

## 📋 İçindekiler
1. [Proje Vizyonu ve Stratejik DNA](#proje-vizyonu-ve-stratejik-dna)
2. [Temel Felsefe ve İlkeler](#temel-felsefe-ve-ilkeler)
3. [Mimari Yaklaşım ve Teknoloji Stack](#mimari-yaklaşım-ve-teknoloji-stack)
4. [Veritabanı Şeması ve Güvenlik](#veritabanı-şeması-ve-güvenlik)
5. [Servis Mimarisi ve Ajan Sistemi](#servis-mimarisi-ve-ajan-sistemi)
6. [Uygulama Stratejisi ve Yol Haritası](#uygulama-stratejisi-ve-yol-haritası)

---

## 🎯 Proje Vizyonu ve Stratejik DNA

### **Platform Vizyonu**
YemekZen, geleneksel bir SaaS platformundan **Otonom B2B2C Marketplace**'e evrim geçiren, yapay zeka destekli bir ekosistemdir. Platform, insan müdahalesini en aza indiren, veriye dayalı kararlar alabilen ve kendi operasyonlarını otonom ajanlarla yürütebilen akıllı bir sistem olarak tasarlanmıştır.

### **Stratejik Dönüşüm**
- **Önceki Durum**: QR Menü SaaS Platformu
- **Yeni Vizyon**: Otonom B2B2C Marketplace + AI Destekli Operasyonlar
- **Temel Değişim**: "Özellik" eklemekten "Ajan" (Agency) sahibi sistem kurmaya

### **Platform Bileşenleri**
1. **Süperadmin Paneli**: Platform yönetimi ve AI ajanları kontrolü
2. **Ana Site**: Pazarlama ve tenant onboarding
3. **Tenant Paneli**: Restoran yönetimi ve AI destekli operasyonlar
4. **Consumer App**: Müşteri sipariş ve keşif platformu
5. **Courier App**: Kurye yönetimi ve teslimat takibi
6. **AI Ajanları**: Pazarlama, müşteri hizmetleri, analiz otomasyonu

---

## 🧠 Temel Felsefe ve İlkeler

### **Aksiyom I: Agresif Ayrıştırma (Aggressive Decoupling)**
AI ajanlarının sistemi etkili kullanabilmesi için, sistemin iç karmaşıklığını bilmesine gerek yoktur. Her servis, gelecekteki insan olmayan kullanıcılara (AI ajanları) da hizmet veren temiz, kararlı ve iyi belgelenmiş API'ler sunmalıdır.

### **Aksiyom II: Olay Odaklı Mimari Zorunluluğu**
Ajanlar olaylara tepki verir. Sistemin sinir sistemi, tüm önemli iş olaylarını yayınlayan merkezi bir olay veri yolu (event bus) olmalıdır:
- `tenant_kaydoldu` → Pazarlama ajanını tetikler
- `reklam_performansı_düştü` → Analiz ajanını tetikler
- `müşteri_destek_çağrısı_geldi` → Sesli botu tetikler

### **Aksiyom III: Veri ve İşlemlerin İkiliği**
Sistem artık sadece işlem yapmaz; bu işlemlerden öğrenir:

**İşlem Akışı (Transactional Flow)**: Sipariş alma, ödeme yapma gibi anlık operasyonlar
**Analitik Akışı (Analytical Flow)**: İşlem verilerini toplayan, zenginleştiren ve ajanların karar alması için hazırlayan akış

---

## 🏗️ Mimari Yaklaşım ve Teknoloji Stack

### **Mimari Yaklaşım: Ajan Odaklı Modüler Monolit**
- **Temel Prensip**: Olay Odaklı Mimari (EDA)
- **Yeni Ana Servis**: `intelligence-service` (Platformun Beyni)
- **İletişim Omurgası**: Merkezi Olay Veri Yolu (Event Bus)
- **Ajan Orkestrasyonu**: n8n gibi İş Akışı Motorları

### **Genişletilmiş Klasör Yapısı**
```
/project-root
├── apps/
│   ├── consumer-app/          # Müşteri uygulaması
│   ├── tenant-panel/          # Restoran yönetim paneli
│   ├── courier-app/           # Kurye uygulaması
│   └── superadmin-panel/      # Süperadmin paneli
│
├── packages/
│   ├── ui/                    # Paylaşılan UI bileşenleri
│   ├── config/                # Konfigürasyon yönetimi
│   ├── auth/                  # Kimlik doğrulama
│   ├── db/                    # Veritabanı işlemleri
│   ├── types/                 # Tip tanımları
│   └── ai-tools/              # AI araçları ve prompt şablonları
│
├── services/
│   ├── api-gateway/           # API ağ geçidi
│   ├── auth-service/          # Kimlik doğrulama servisi
│   ├── tenant-service/        # Tenant yönetimi
│   ├── marketplace-service/   # Marketplace işlemleri
│   ├── ordering-service/      # Sipariş yönetimi
│   ├── notification-service/  # Bildirim servisi
│   ├── intelligence-service/  # AI ajanları ve RAG
│   └── voice-gateway-service/ # Sesli bot ağ geçidi
│
└── package.json
```

### **Teknoloji Stack Güncellemeleri**

#### **Mevcut Stack (Korunacak)**
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: tRPC, Prisma, Supabase, Zod
- **State Management**: Zustand
- **Testing**: Jest, Playwright

#### **Yeni Eklenen Teknolojiler**
- **AI Framework**: LangChain.js / LlamaIndex.ts
- **İş Akışı**: n8n / Activepieces
- **Vektör DB**: Supabase/pgvector
- **Ses Teknolojileri**: Twilio, Deepgram, ElevenLabs
- **Olay Yönetimi**: Upstash QStash / Inngest
- **Haritalama**: Mapbox / Google Maps API
- **Push Bildirimler**: Firebase Cloud Messaging

---

## 🗄️ Veritabanı Şeması ve Güvenlik

### **Genişletilmiş Prisma Şeması**

```prisma
// Mevcut modeller (güncellenmiş)
model PlatformUser {
  id        String   @id @default(cuid())
  email     String   @unique
  role      UserRole
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // İlişkiler
  tenantProfile  TenantProfile?
  consumerProfile ConsumerProfile?
  orders         Order[]
  ratings        Rating[]
}

model TenantProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  tenantId    String   @unique
  name        String
  phone       String?
  position    String?
  
  user        PlatformUser @relation(fields: [userId], references: [id])
  tenant      Tenant       @relation(fields: [tenantId], references: [id])
}

model ConsumerProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  name        String
  phone       String?
  addresses   Address[]
  
  user        PlatformUser @relation(fields: [userId], references: [id])
}

model Tenant {
  id                String   @id @default(cuid())
  name              String
  description       String?
  logo              String?
  address           String
  phone             String
  email             String
  subscribedServices String[] // ['QR_MENU', 'MARKETPLACE']
  isActive          Boolean  @default(true)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // İlişkiler
  profile           TenantProfile?
  categories        Category[]
  products          Product[]
  orders            Order[]
  campaigns         AdCampaign[]
  knowledgeBase     TenantKnowledgeBase[]
}

model Category {
  id        String   @id @default(cuid())
  name      String
  tenantId  String
  products  Product[]
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  image       String?
  isAvailable Boolean  @default(true)
  categoryId  String
  tenantId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  category   Category @relation(fields: [categoryId], references: [id])
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  orderItems OrderItem[]
  ratings    Rating[]
}

model Order {
  id              String      @id @default(cuid())
  type            OrderType
  status          OrderStatus @default(PENDING)
  totalAmount     Decimal     @db.Decimal(10, 2)
  userId          String
  tenantId        String
  deliveryAddressId String?
  courierId       String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  user            PlatformUser @relation(fields: [userId], references: [id])
  tenant          Tenant       @relation(fields: [tenantId], references: [id])
  deliveryAddress Address?     @relation(fields: [deliveryAddressId], references: [id])
  courier         Courier?     @relation(fields: [courierId], references: [id])
  items           OrderItem[]
  payments        Payment[]
}

model OrderItem {
  id        String   @id @default(cuid())
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  orderId   String
  productId String
  
  order     Order    @relation(fields: [orderId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
}

// Yeni modeller
model Address {
  id        String   @id @default(cuid())
  userId    String
  title     String   // "Ev", "İş"
  address   String
  city      String
  district  String?
  isDefault Boolean  @default(false)
  
  user      ConsumerProfile @relation(fields: [userId], references: [id])
  orders    Order[]
}

model Rating {
  id        String   @id @default(cuid())
  rating    Int      // 1-5
  comment   String?
  userId    String
  productId String?
  tenantId  String?
  createdAt DateTime @default(now())
  
  user      PlatformUser @relation(fields: [userId], references: [id])
  product   Product?     @relation(fields: [productId], references: [id])
  tenant    Tenant?      @relation(fields: [tenantId], references: [id])
}

model Courier {
  id        String   @id @default(cuid())
  name      String
  phone     String
  vehicle   String?
  isActive  Boolean  @default(true)
  currentLocation Json? // {lat: number, lng: number}
  
  orders    Order[]
}

model Payment {
  id        String   @id @default(cuid())
  orderId   String
  amount    Decimal  @db.Decimal(10, 2)
  method    PaymentMethod
  status    PaymentStatus @default(PENDING)
  transactionId String?
  createdAt DateTime @default(now())
  
  order     Order    @relation(fields: [orderId], references: [id])
}

// AI ve Ajan modelleri
model AgentExecutionLog {
  id        String   @id @default(cuid())
  agentName String   // "MarketingCampaignAgent", "OnboardingBot"
  trigger   String   // "event:tenant.created", "manual:superadmin"
  input     Json
  output    Json
  status    String   // "SUCCESS", "FAILURE", "PENDING_APPROVAL"
  durationMs Int
  costUsd   Decimal? @db.Decimal(10, 6)
  createdAt DateTime @default(now())
}

model AdCampaign {
  id         String   @id @default(cuid())
  tenantId   String
  platform   String   // "GoogleAds", "Facebook"
  campaignId String
  name       String
  spend      Decimal  @db.Decimal(10, 2)
  clicks     Int
  conversions Int
  date       DateTime
  
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  @@unique([platform, campaignId, date])
}

model TenantKnowledgeBase {
  id        String    @id @default(cuid())
  tenantId  String
  source    String    // "menu.pdf", "about-us.txt"
  content   String
  embedding Vector?   // pgvector ile
  
  tenant    Tenant    @relation(fields: [tenantId], references: [id])
}

// Enums
enum UserRole {
  SUPERADMIN
  TENANT_ADMIN
  TENANT_STAFF
  CONSUMER
  COURIER
}

enum OrderType {
  QR_TABLE
  DELIVERY
  PICKUP
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  IN_DELIVERY
  DELIVERED
  CANCELLED
}

enum PaymentMethod {
  CASH
  CREDIT_CARD
  BANK_TRANSFER
  DIGITAL_WALLET
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

### **Güvenlik Prensipleri**
1. **RLS (Row-Level Security)**: Tüm tablolarda tenant_id bazlı izolasyon
2. **API Güvenliği**: Role-based access control (RBAC)
3. **Veri İzolasyonu**: AI ajanları için katı tenant izolasyonu
4. **Maliyet Kontrolü**: Ajan bütçeleme ve devre kesiciler

---

## 🤖 Servis Mimarisi ve Ajan Sistemi

### **Intelligence Service (Platformun Beyni)**
```typescript
// services/intelligence-service/
├── src/
│   ├── agents/
│   │   ├── marketing-agent.ts
│   │   ├── customer-service-agent.ts
│   │   ├── menu-optimization-agent.ts
│   │   └── analytics-agent.ts
│   ├── workflows/
│   │   ├── tenant-onboarding.ts
│   │   ├── order-processing.ts
│   │   └── campaign-management.ts
│   ├── rag/
│   │   ├── vector-store.ts
│   │   ├── embeddings.ts
│   │   └── retrieval.ts
│   └── api/
│       ├── menu.ts
│       ├── marketing.ts
│       └── analytics.ts
```

### **Voice Gateway Service**
```typescript
// services/voice-gateway-service/
├── src/
│   ├── speech-to-text/
│   ├── text-to-speech/
│   ├── call-handling/
│   └── integration/
```

### **Ajan Güvenliği ve Kontrol**
1. **İnsan Onaylı İşlemler**: Kritik işlemler için onay döngüsü
2. **Kısıtlı Yetkiler**: Her ajan için dar kapsamlı API anahtarları
3. **Maliyet Kontrolü**: Aylık bütçe limitleri ve devre kesiciler
4. **Logging**: Tüm ajan eylemleri AgentExecutionLog'a kaydedilir

---

## 🛣️ Uygulama Stratejisi ve Yol Haritası

### **Faz 1: AI Destekli Menü Açıklaması (MVP)**
**Hedef**: Risk almadan AI entegrasyonunun temelini atmak

**Adımlar**:
1. `packages/ai-tools` paketini oluştur
2. `services/intelligence-service` iskeletini kur
3. Tenant panelinde "✨ Açıklama Oluştur" butonu ekle
4. tRPC prosedürü ile LLM entegrasyonu yap
5. Kullanıcı onayı ile kaydetme sistemi

### **Faz 2: Marketplace Core (3-6 ay)**
**Hedef**: Temel marketplace işlevselliği

**Özellikler**:
- Consumer app geliştirme
- Restoran listeleme ve arama
- Sipariş alma ve onaylama
- Temel ödeme entegrasyonu
- Push bildirimler

### **Faz 3: Lojistik ve Teslimat (6-9 ay)**
**Hedef**: Kurye yönetimi ve teslimat sistemi

**Özellikler**:
- Courier app geliştirme
- Kurye atama algoritması
- Gerçek zamanlı takip
- Harita entegrasyonu
- Teslimat optimizasyonu

### **Faz 4: AI Ajanları ve Otonom Operasyonlar (9-12 ay)**
**Hedef**: Tam otonom platform

**Özellikler**:
- Pazarlama ajanları
- Müşteri hizmetleri botları
- Analiz ve raporlama ajanları
- Sesli bot entegrasyonu
- Otomatik optimizasyon

### **Başarı Kriterleri**
- **Teknik**: %80+ test coverage, <200ms API response
- **İş**: Aylık aktif tenant sayısı, sipariş hacmi
- **AI**: Ajan başarı oranı, maliyet kontrolü
- **Kullanıcı**: NPS skoru, retention rate

---

## 🎯 Sonuç

Bu stratejik çerçeve, YemekZen'i geleneksel bir SaaS platformundan otonom bir B2B2C marketplace'e dönüştürmek için kapsamlı bir yol haritası sunar. Aşamalı yaklaşım, riski minimize ederken değer yaratmayı maksimize eder.

**Anahtar Başarı Faktörleri**:
1. **Veritabanı öncelikli tasarım**
2. **Olay odaklı mimari**
3. **Ajan güvenliği ve kontrol**
4. **Aşamalı geliştirme**
5. **Sürekli ölçüm ve optimizasyon**

Bu vizyonu gerçekleştirmek için, mevcut sağlam temel üzerine bu yeni katmanları doğru bir şekilde inşa etmek kritik öneme sahiptir.