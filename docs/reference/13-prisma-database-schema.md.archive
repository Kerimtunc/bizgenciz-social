# 🗄️ Prisma Database Schema - Gelişmiş Veritabanı Yapısı

## 📋 Özellikler
- **Type-Safe Database**: Tip güvenli veritabanı işlemleri
- **Migration System**: Versiyon kontrollü şema değişiklikleri
- **Relationship Management**: İlişki yönetimi
- **Enum Support**: Enum tip desteği
- **Indexing**: Performans optimizasyonu
- **Referential Integrity**: Referans bütünlüğü
- **Connection Pooling**: Bağlantı havuzu

## 🎯 Kullanım Alanları
- E-ticaret veritabanı
- Kullanıcı yönetimi
- Sipariş takibi
- Kategori yönetimi
- QR kod sistemi
- Analitik verileri

## 💡 En Etkileyici Özellikler

### 1. Advanced Schema Configuration
```prisma
generator client {
  provider = "prisma-client-js"
  // Performance optimizations
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 2. User Management Model
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String   @map("password_hash")
  role         UserRole @default(STAFF)
  name         String
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  // Relations
  orders Order[]

  @@map("users")
}
```

### 3. Category Management with Sorting
```prisma
model Category {
  id          String    @id @default(cuid())
  name        String
  description String?
  imageUrl    String?   @map("image_url")
  sortOrder   Int       @default(0) @map("sort_order")
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  // Relations
  products Product[]

  @@map("categories")
}
```

### 4. Product Model with Relations
```prisma
model Product {
  id          String   @id @default(cuid())
  categoryId  String   @map("category_id")
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  imageUrl    String?  @map("image_url")
  isAvailable Boolean  @default(true) @map("is_available")
  sortOrder   Int      @default(0) @map("sort_order")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]

  @@map("products")
}
```

### 5. Order Management System
```prisma
model Order {
  id          String      @id @default(cuid())
  userId      String?     @map("user_id")
  tableNumber Int?
  status      OrderStatus @default(PENDING)
  totalAmount Decimal     @db.Decimal(10, 2) @map("total_amount")
  notes       String?
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  // Relations
  user       User?        @relation(fields: [userId], references: [id])
  orderItems OrderItem[]

  @@map("orders")
}
```

### 6. OrderItem with Price Tracking
```prisma
model OrderItem {
  id        String  @id @default(cuid())
  orderId   String  @map("order_id")
  productId String  @map("product_id")
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  notes     String?
  createdAt DateTime @default(now()) @map("created_at")

  // Relations
  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id])

  @@map("order_items")
}
```

### 7. QR Code Management
```prisma
model QRCode {
  id          String   @id @default(cuid())
  tableNumber Int      @unique @map("table_number")
  qrCode      String   @unique @map("qr_code")
  isActive    Boolean  @default(true) @map("is_active")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("qr_codes")
}
```

### 8. Enum Definitions
```prisma
enum UserRole {
  ADMIN
  STAFF
  CUSTOMER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  DELIVERED
  CANCELLED
}
```

### 9. Advanced Query Examples
```typescript
// Get menu with categories and sorting
const menuItems = await prisma.product.findMany({
  where: {
    isAvailable: true,
    ...(categoryId && { categoryId })
  },
  include: {
    category: true
  },
  orderBy: [
    { category: { sortOrder: 'asc' } },
    { sortOrder: 'asc' }
  ]
})

// Get orders with user and items
const orders = await prisma.order.findMany({
  where: {
    status: 'PENDING'
  },
  include: {
    user: true,
    orderItems: {
      include: {
        product: true
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  }
})

// Get popular products
const popularProducts = await prisma.product.findMany({
  where: {
    isAvailable: true
  },
  include: {
    category: true,
    orderItems: {
      select: {
        quantity: true
      }
    }
  },
  orderBy: {
    orderItems: {
      _count: 'desc'
    }
  },
  take: 20
})
```

### 10. Transaction Support
```typescript
// Create order with items in transaction
const order = await prisma.$transaction(async (tx) => {
  // Create order
  const newOrder = await tx.order.create({
    data: {
      userId: user.id,
      tableNumber: tableNumber,
      status: 'PENDING',
      totalAmount: totalAmount,
      notes: notes
    }
  })

  // Create order items
  const orderItems = await Promise.all(
    items.map(item =>
      tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          notes: item.notes
        }
      })
    )
  )

  return { order: newOrder, items: orderItems }
})
```

## 🚀 Performans Optimizasyonları
- **Connection Pooling**: Bağlantı havuzu yönetimi
- **Indexing Strategy**: İndeks stratejisi
- **Query Optimization**: Sorgu optimizasyonu
- **Batch Operations**: Toplu işlemler
- **Lazy Loading**: Tembel yükleme

## 📱 Database Features
- **Referential Integrity**: Referans bütünlüğü
- **Cascade Operations**: Zincirleme işlemler
- **Soft Deletes**: Yumuşak silme
- **Audit Trail**: Denetim izi
- **Data Validation**: Veri doğrulama

## 🔧 Migration Management
- **Version Control**: Versiyon kontrolü
- **Rollback Support**: Geri alma desteği
- **Seed Data**: Test verisi
- **Environment Sync**: Ortam senkronizasyonu
- **Schema Validation**: Şema doğrulama

## 🛡️ Security Features
- **SQL Injection Prevention**: SQL enjeksiyon önleme
- **Input Validation**: Girdi doğrulama
- **Access Control**: Erişim kontrolü
- **Data Encryption**: Veri şifreleme
- **Audit Logging**: Denetim kaydı 