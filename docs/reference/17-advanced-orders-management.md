# Advanced Orders Management System

## Özet

Bu dosya, QR Menu Elite Edition projesinin gelişmiş sipariş yönetim sistemini detaylandırır. Sistem, gerçek zamanlı sipariş takibi, durum yönetimi, filtreleme, arama ve kapsamlı sipariş operasyonları gibi özellikler içerir.

## Önemli Özellikler

### 1. Real-time Order Tracking
- **Live Status Updates**: Gerçek zamanlı durum güncellemeleri
- **Order Lifecycle Management**: Sipariş yaşam döngüsü yönetimi
- **Status Transitions**: Durum geçişleri (pending → preparing → ready → completed)
- **Estimated Time Tracking**: Tahmini süre takibi

```typescript
// Order Status Management
interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone?: string;
  table_number?: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  order_type: 'dine-in' | 'takeaway' | 'delivery';
  total_amount: number;
  subtotal?: number;
  tax_amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  estimated_time?: number;
  items?: any[];
}

// Status Update Function
const updateOrderStatus = async (orderId: number, newStatus: Order['status']) => {
  try {
    // API call to update order status
    await updateOrderStatus(orderId, newStatus);
    console.log(`✅ Order ${orderId} status changed to ${newStatus}`);
  } catch (error) {
    console.error('Failed to update order status:', error);
  }
};
```

### 2. Advanced Filtering System
- **Multi-criteria Filtering**: Çoklu kriter filtreleme
- **Search Functionality**: Gelişmiş arama sistemi
- **Status-based Filtering**: Durum bazlı filtreleme
- **Type-based Filtering**: Tür bazlı filtreleme
- **Tab-based Organization**: Tab bazlı organizasyon

```typescript
// Advanced Filtering Implementation
useEffect(() => {
  let filtered = orders;

  // Search filter
  if (searchTerm) {
    filtered = filtered.filter(order => 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone?.includes(searchTerm) ||
      order.table_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter(order => order.status === statusFilter);
  }

  // Type filter
  if (typeFilter !== "all") {
    filtered = filtered.filter(order => order.order_type === typeFilter);
  }

  // Tab filter
  if (activeTab === "active") {
    filtered = filtered.filter(order => 
      order.status === "pending" || order.status === "preparing" || order.status === "ready"
    );
  } else if (activeTab === "completed") {
    filtered = filtered.filter(order => order.status === "completed");
  } else if (activeTab === "cancelled") {
    filtered = filtered.filter(order => order.status === "cancelled");
  }

  setFilteredOrders(filtered);
}, [orders, searchTerm, statusFilter, typeFilter, activeTab]);
```

### 3. Dynamic Status Badge System
- **Color-coded Status**: Renk kodlu durum göstergeleri
- **Visual Status Indicators**: Görsel durum göstergeleri
- **Type Badges**: Tür bazlı rozetler
- **Responsive Design**: Responsive tasarım

```typescript
// Status Badge System
const getStatusBadge = (status: Order['status']) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    preparing: "bg-blue-100 text-blue-800 border-blue-200", 
    ready: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    pending: "Bekliyor",
    preparing: "Hazırlanıyor",
    ready: "Hazır",
    completed: "Tamamlandı",
    cancelled: "İptal"
  };

  return (
    <Badge className={`${styles[status]} border`}>
      {labels[status]}
    </Badge>
  );
};

// Order Type Badge System
const getTypeBadge = (type: Order['order_type']) => {
  const styles = {
    "dine-in": "bg-purple-100 text-purple-800 border-purple-200",
    "takeaway": "bg-orange-100 text-orange-800 border-orange-200",
    "delivery": "bg-indigo-100 text-indigo-800 border-indigo-200"
  };

  const labels = {
    "dine-in": "Masada",
    "takeaway": "Paket",
    "delivery": "Teslimat"
  };

  return (
    <Badge className={`${styles[type]} border`}>
      {labels[type]}
    </Badge>
  );
};
```

### 4. Real-time Statistics Dashboard
- **Live Statistics**: Canlı istatistikler
- **Revenue Tracking**: Gelir takibi
- **Order Counts**: Sipariş sayıları
- **Status Distribution**: Durum dağılımı
- **Performance Metrics**: Performans metrikleri

```typescript
// Real-time Statistics Calculation
const stats = {
  total: orders.length,
  active: orders.filter(o => o.status === "pending" || o.status === "preparing" || o.status === "ready").length,
  completed: orders.filter(o => o.status === "completed").length,
  cancelled: orders.filter(o => o.status === "cancelled").length,
  revenue: orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.total_amount, 0)
};

// Statistics Cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <Package className="h-8 w-8 text-orange-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Aktif Sipariş</p>
          <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
        </div>
        <Clock className="h-8 w-8 text-blue-500" />
      </div>
    </CardContent>
  </Card>

  <Card className="backdrop-blur-sm">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Toplam Gelir</p>
          <p className="text-2xl font-bold text-green-600">₺{stats.revenue.toFixed(2)}</p>
        </div>
        <AlertTriangle className="h-8 w-8 text-green-500" />
      </div>
    </CardContent>
  </Card>
</div>
```

### 5. Comprehensive Order Details
- **Order Items Display**: Sipariş kalemleri görüntüleme
- **Customer Information**: Müşteri bilgileri
- **Payment Summary**: Ödeme özeti
- **Order Notes**: Sipariş notları
- **Timestamps**: Zaman damgaları

```typescript
// Order Details Component
<CardContent className="pt-0">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {/* Order Items */}
    <div className="lg:col-span-2">
      <h4 className="font-semibold mb-2">Sipariş Detayları</h4>
      <div className="space-y-2">
        {order.items && order.items.length > 0 ? (
          order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span>{item.quantity}x {item.product_name || item.name}</span>
              <span className="font-medium">₺{(item.total_price || 0).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Sipariş detayları yükleniyor...</p>
        )}
      </div>
      {order.notes && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Not:</strong> {order.notes}
          </p>
        </div>
      )}
    </div>

    {/* Order Summary & Actions */}
    <div className="space-y-4">
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between text-sm mb-1">
          <span>Ara Toplam:</span>
          <span>₺{(order.subtotal || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>KDV:</span>
          <span>₺{(order.tax_amount || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-1">
          <span>Toplam:</span>
          <span>₺{(order.total_amount || 0).toFixed(2)}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Oluşturulma: {new Date(order.created_at).toLocaleTimeString('tr-TR')}</p>
        <p>Güncelleme: {new Date(order.updated_at).toLocaleTimeString('tr-TR')}</p>
        {order.estimated_time && (
          <p>Tahmini Süre: {order.estimated_time} dk</p>
        )}
      </div>
    </div>
  </div>
</CardContent>
```

### 6. Action Button System
- **Context-aware Actions**: Bağlama duyarlı aksiyonlar
- **Status-based Buttons**: Durum bazlı butonlar
- **Quick Actions**: Hızlı aksiyonlar
- **Print Functionality**: Yazdırma işlevi
- **Order Cancellation**: Sipariş iptali

```typescript
// Action Button System
<div className="flex gap-2">
  {order.status === "pending" && (
    <Button 
      size="sm" 
      onClick={() => handleStatusChange(order.id, "preparing")}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      Hazırla
    </Button>
  )}
  {order.status === "preparing" && (
    <Button 
      size="sm" 
      onClick={() => handleStatusChange(order.id, "ready")}
      className="bg-green-500 hover:bg-green-600 text-white"
    >
      Hazır
    </Button>
  )}
  {order.status === "ready" && (
    <Button 
      size="sm" 
      onClick={() => handleStatusChange(order.id, "completed")}
      className="bg-gray-500 hover:bg-gray-600 text-white"
    >
      Teslim Et
    </Button>
  )}
  
  <Button variant="outline" size="sm">
    <Eye className="h-4 w-4" />
  </Button>
  <Button variant="outline" size="sm">
    <Printer className="h-4 w-4" />
  </Button>
  {(order.status === "pending" || order.status === "preparing") && (
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => handleStatusChange(order.id, "cancelled")}
      className="text-red-600 hover:text-red-700"
    >
      <XCircle className="h-4 w-4" />
    </Button>
  )}
</div>
```

### 7. Tab-based Organization
- **Active Orders Tab**: Aktif siparişler sekmesi
- **Completed Orders Tab**: Tamamlanan siparişler sekmesi
- **Cancelled Orders Tab**: İptal edilen siparişler sekmesi
- **Dynamic Counts**: Dinamik sayaçlar

```typescript
// Tab-based Organization
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="active">
      Aktif Siparişler ({stats.active})
    </TabsTrigger>
    <TabsTrigger value="completed">
      Tamamlanan ({stats.completed})
    </TabsTrigger>
    <TabsTrigger value="cancelled">
      İptal Edilen ({stats.cancelled})
    </TabsTrigger>
  </TabsList>

  <TabsContent value={activeTab} className="mt-6">
    <div className="grid gap-4">
      {filteredOrders.length === 0 ? (
        <Card className="backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sipariş Bulunamadı</h3>
            <p className="text-muted-foreground">Bu kriterlere uygun sipariş bulunamadı</p>
          </CardContent>
        </Card>
      ) : (
        filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))
      )}
    </div>
  </TabsContent>
</Tabs>
```

## Teknik Detaylar

### Interface Definitions
```typescript
interface OrdersModuleProps {
  modules: any[];
  activeModule: string;
  onModuleChange: (module: string) => void;
  theme: string;
}

interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone?: string;
  table_number?: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  order_type: 'dine-in' | 'takeaway' | 'delivery';
  total_amount: number;
  subtotal?: number;
  tax_amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  estimated_time?: number;
  items?: any[];
}
```

### State Management
- **Local State**: Component seviyesinde state yönetimi
- **Filtered State**: Filtrelenmiş veri state'i
- **Loading State**: Yükleme durumu
- **Selected State**: Seçili sipariş state'i

### Performance Optimizations
- **Debounced Search**: Geciktirilmiş arama
- **Memoized Filters**: Belleğe alınmış filtreler
- **Efficient Rendering**: Verimli render sistemi
- **Conditional Rendering**: Koşullu render

## Kullanım Senaryoları

### 1. Restaurant Management
- Günlük sipariş takibi
- Masa durumu yönetimi
- Mutfak entegrasyonu
- Teslimat takibi

### 2. Order Processing
- Sipariş durumu güncelleme
- Hazırlama süresi takibi
- Teslimat zamanlaması
- Müşteri iletişimi

### 3. Analytics & Reporting
- Satış istatistikleri
- Performans metrikleri
- Trend analizi
- Gelir raporları

### 4. Customer Service
- Sipariş geçmişi
- Müşteri bilgileri
- Notlar ve özel istekler
- İletişim bilgileri

## Entegrasyon Noktaları

### API Endpoints
- `/api/orders`: Sipariş CRUD işlemleri
- `/api/orders/status`: Durum güncelleme
- `/api/orders/statistics`: İstatistik verileri
- `/api/orders/search`: Arama işlemleri

### External Services
- Kitchen Management System
- Payment Processing
- Delivery Services
- Notification System

### Database Schema
- Orders table
- Order items table
- Customers table
- Order status history table 