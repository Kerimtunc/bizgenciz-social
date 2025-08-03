# Customer Relationship Management (CRM) System

## Özet

Bu dosya, QR Menu Elite Edition projesinin gelişmiş müşteri ilişkileri yönetimi (CRM) sistemini detaylandırır. Sistem, müşteri profili yönetimi, analitik, sadakat programı entegrasyonu, müşteri segmentasyonu ve iletişim araçları gibi kapsamlı özellikler içerir.

## Önemli Özellikler

### 1. Comprehensive Customer Profiles
- **Detailed Customer Information**: Detaylı müşteri bilgileri
- **Avatar Management**: Avatar yönetimi
- **Contact Information**: İletişim bilgileri
- **Address Management**: Adres yönetimi
- **Birthday Tracking**: Doğum günü takibi
- **Social Media Integration**: Sosyal medya entegrasyonu

```typescript
// Customer Profile Interface
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  birthday?: Date;
  registrationDate: Date;
  lastVisit: Date;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  loyaltyPoints: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  status: "active" | "inactive" | "vip";
  notes?: string;
  preferences: {
    favoriteItems: string[];
    dietaryRestrictions: string[];
    communicationPreference: "email" | "sms" | "both" | "none";
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}
```

### 2. Advanced Customer Analytics
- **Customer Lifetime Value (CLV)**: Müşteri yaşam boyu değeri
- **Order History Tracking**: Sipariş geçmişi takibi
- **Spending Patterns**: Harcama kalıpları
- **Visit Frequency**: Ziyaret sıklığı
- **Revenue Contribution**: Gelir katkısı
- **Performance Metrics**: Performans metrikleri

```typescript
// Customer Analytics Calculation
const stats = {
  total: customers.length,
  active: customers.filter(c => c.status === "active" || c.status === "vip").length,
  vip: customers.filter(c => c.status === "vip").length,
  newThisMonth: customers.filter(c => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return c.registrationDate > thirtyDaysAgo;
  }).length,
  totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  averageLifetimeValue: customers.length > 0 ? 
    customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0
};

// Statistics Dashboard
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Toplam Müşteri</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <Users className="h-8 w-8 text-orange-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Aktif Müşteri</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <TrendingUp className="h-8 w-8 text-green-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">VIP Müşteri</p>
          <p className="text-2xl font-bold text-purple-600">{stats.vip}</p>
        </div>
        <Crown className="h-8 w-8 text-purple-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Bu Ay Yeni</p>
          <p className="text-2xl font-bold text-blue-600">{stats.newThisMonth}</p>
        </div>
        <UserPlus className="h-8 w-8 text-blue-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Toplam Gelir</p>
          <p className="text-2xl font-bold text-green-600">₺{stats.totalRevenue.toFixed(0)}</p>
        </div>
        <DollarSign className="h-8 w-8 text-green-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Ort. CLV</p>
          <p className="text-2xl font-bold text-orange-600">₺{stats.averageLifetimeValue.toFixed(0)}</p>
        </div>
        <Heart className="h-8 w-8 text-orange-500" />
      </div>
    </CardContent>
  </Card>
</div>
```

### 3. Loyalty Program Integration
- **Tier System**: Seviye sistemi (bronze, silver, gold, platinum)
- **Loyalty Points**: Sadakat puanları
- **Reward Tracking**: Ödül takibi
- **Tier Benefits**: Seviye avantajları
- **Point Calculation**: Puan hesaplama

```typescript
// Loyalty Tier System
const getTierBadge = (tier: Customer['tier']) => {
  const styles = {
    bronze: "bg-amber-100 text-amber-800 border-amber-200",
    silver: "bg-gray-100 text-gray-800 border-gray-200",
    gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
    platinum: "bg-purple-100 text-purple-800 border-purple-200"
  };

  const labels = {
    bronze: "Bronz",
    silver: "Gümüş", 
    gold: "Altın",
    platinum: "Platin"
  };

  return (
    <Badge className={`${styles[tier]} border`}>
      {labels[tier]}
    </Badge>
  );
};

// Customer Status Management
const getStatusBadge = (status: Customer['status']) => {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    vip: "bg-purple-100 text-purple-800 border-purple-200"
  };

  const labels = {
    active: "Aktif",
    inactive: "Pasif",
    vip: "VIP"
  };

  return (
    <Badge className={`${styles[status]} border`}>
      {labels[status]}
    </Badge>
  );
};
```

### 4. Advanced Filtering and Search
- **Multi-criteria Search**: Çoklu kriter arama
- **Tier-based Filtering**: Seviye bazlı filtreleme
- **Status-based Filtering**: Durum bazlı filtreleme
- **Date-based Filtering**: Tarih bazlı filtreleme
- **Tab-based Organization**: Tab bazlı organizasyon

```typescript
// Advanced Filtering System
useEffect(() => {
  let filtered = customers;

  // Search filter
  if (searchTerm) {
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
  }

  // Tier filter
  if (tierFilter !== "all") {
    filtered = filtered.filter(customer => customer.tier === tierFilter);
  }

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter(customer => customer.status === statusFilter);
  }

  // Tab filter
  if (activeTab === "vip") {
    filtered = filtered.filter(customer => customer.status === "vip");
  } else if (activeTab === "new") {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(customer => customer.registrationDate > thirtyDaysAgo);
  } else if (activeTab === "inactive") {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(customer => customer.lastVisit < thirtyDaysAgo);
  }

  setFilteredCustomers(filtered);
}, [customers, searchTerm, tierFilter, statusFilter, activeTab]);
```

### 5. Customer Segmentation
- **VIP Customers**: VIP müşteriler
- **New Customers**: Yeni müşteriler
- **Inactive Customers**: Pasif müşteriler
- **High-Value Customers**: Yüksek değerli müşteriler
- **Loyal Customers**: Sadık müşteriler

```typescript
// Customer Segmentation Tabs
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="all">
      Tüm Müşteriler ({stats.total})
    </TabsTrigger>
    <TabsTrigger value="vip">
      VIP Müşteriler ({stats.vip})
    </TabsTrigger>
    <TabsTrigger value="new">
      Yeni Müşteriler ({stats.newThisMonth})
    </TabsTrigger>
    <TabsTrigger value="inactive">
      Pasif Müşteriler
    </TabsTrigger>
  </TabsList>

  <TabsContent value={activeTab} className="mt-6">
    <div className="grid gap-4">
      {filteredCustomers.length === 0 ? (
        <Card className="backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Müşteri Bulunamadı</h3>
            <p className="text-muted-foreground">Bu kriterlere uygun müşteri bulunamadı</p>
          </CardContent>
        </Card>
      ) : (
        filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))
      )}
    </div>
  </TabsContent>
</Tabs>
```

### 6. Customer Communication Tools
- **Message System**: Mesaj sistemi
- **Gift Sending**: Hediye gönderme
- **Email Integration**: E-posta entegrasyonu
- **SMS Integration**: SMS entegrasyonu
- **Notification System**: Bildirim sistemi

```typescript
// Customer Communication Actions
<div className="flex flex-col gap-2">
  <Button variant="outline" size="sm" className="w-full">
    <Eye className="h-4 w-4 mr-2" />
    Detaylar
  </Button>
  <Button variant="outline" size="sm" className="w-full">
    <MessageSquare className="h-4 w-4 mr-2" />
    Mesaj Gönder
  </Button>
  <Button variant="outline" size="sm" className="w-full">
    <Gift className="h-4 w-4 mr-2" />
    Hediye Gönder
  </Button>
  <Button variant="outline" size="sm" className="w-full">
    <Edit className="h-4 w-4 mr-2" />
    Düzenle
  </Button>
</div>
```

### 7. Customer Preferences Management
- **Favorite Items**: Favori ürünler
- **Dietary Restrictions**: Beslenme kısıtlamaları
- **Communication Preferences**: İletişim tercihleri
- **Personalization**: Kişiselleştirme
- **Custom Notes**: Özel notlar

```typescript
// Customer Preferences Display
<div>
  <h4 className="font-semibold mb-2">Favori Ürünler</h4>
  <div className="flex flex-wrap gap-1">
    {customer.preferences.favoriteItems.slice(0, 3).map((item, index) => (
      <Badge key={index} variant="outline" className="text-xs">
        {item}
      </Badge>
    ))}
  </div>
</div>

// Customer Statistics
<div>
  <h4 className="font-semibold mb-2">Müşteri İstatistikleri</h4>
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span>Toplam Sipariş:</span>
      <span className="font-medium">{customer.totalOrders}</span>
    </div>
    <div className="flex justify-between">
      <span>Toplam Harcama:</span>
      <span className="font-medium">₺{customer.totalSpent.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span>Ortalama Sipariş:</span>
      <span className="font-medium">₺{customer.averageOrderValue.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span>Sadakat Puanı:</span>
      <span className="font-medium text-orange-600">{customer.loyaltyPoints.toLocaleString()}</span>
    </div>
  </div>
</div>
```

## Teknik Detaylar

### Interface Definitions
```typescript
interface CustomersModuleProps {
  modules: any[];
  activeModule: string;
  onModuleChange: (module: string) => void;
  theme: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  birthday?: Date;
  registrationDate: Date;
  lastVisit: Date;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  loyaltyPoints: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  status: "active" | "inactive" | "vip";
  notes?: string;
  preferences: {
    favoriteItems: string[];
    dietaryRestrictions: string[];
    communicationPreference: "email" | "sms" | "both" | "none";
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}
```

### State Management
- **Customer Data**: Müşteri verileri
- **Filtered Data**: Filtrelenmiş veriler
- **Search State**: Arama durumu
- **Loading State**: Yükleme durumu
- **Selected Customer**: Seçili müşteri

### Performance Optimizations
- **Debounced Search**: Geciktirilmiş arama
- **Memoized Filters**: Belleğe alınmış filtreler
- **Efficient Rendering**: Verimli render sistemi
- **Conditional Rendering**: Koşullu render

## Kullanım Senaryoları

### 1. Customer Service
- Müşteri profil yönetimi
- İletişim bilgileri takibi
- Sipariş geçmişi görüntüleme
- Müşteri notları

### 2. Marketing & Loyalty
- Sadakat programı yönetimi
- Kampanya hedefleme
- Müşteri segmentasyonu
- Ödül sistemi

### 3. Analytics & Insights
- Müşteri davranış analizi
- Gelir analizi
- Performans metrikleri
- Trend analizi

### 4. Communication
- Toplu mesaj gönderimi
- Kişiselleştirilmiş iletişim
- Otomatik bildirimler
- Müşteri geri bildirimi

## Entegrasyon Noktaları

### API Endpoints
- `/api/customers`: Müşteri CRUD işlemleri
- `/api/customers/analytics`: Müşteri analitikleri
- `/api/customers/loyalty`: Sadakat programı
- `/api/customers/communication`: İletişim araçları

### External Services
- Email Service Provider
- SMS Gateway
- Social Media APIs
- Payment Processing

### Database Schema
- Customers table
- Customer preferences table
- Order history table
- Loyalty points table
- Communication logs table 