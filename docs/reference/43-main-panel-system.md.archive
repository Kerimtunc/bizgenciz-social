# Ana Panel Sistemi

## Genel Bakış

Ana Panel Sistemi, restoran yönetim uygulamasının merkezi kontrol panelidir. Bu sistem, tüm modülleri bir araya getiren, gerçek zamanlı veri akışını yöneten ve kullanıcı deneyimini optimize eden kapsamlı bir dashboard çözümüdür.

## Temel Özellikler

### 🔄 Lazy Loading Sistemi
- **Performans Optimizasyonu**: Büyük modüller sadece gerektiğinde yüklenir
- **Code Splitting**: Her modül ayrı bundle olarak yüklenir
- **Suspense Fallback**: Yükleme sırasında kullanıcı dostu arayüz

```typescript
// Lazy Loading Implementation
const TablesModule = lazy(() => import("./modules/TablesModule"))
const OrdersModule = lazy(() => import("./modules/OrdersModule").then(module => ({ default: module.OrdersModule })))
const CustomersModule = lazy(() => import("./modules/CustomersModule").then(module => ({ default: module.CustomersModule })))
```

### 📡 WebSocket Gerçek Zamanlı Entegrasyonu
- **Real-time Updates**: Anlık veri güncellemeleri
- **Connection Management**: Bağlantı durumu izleme
- **Event Handling**: Modül bazlı olay yönetimi

```typescript
// WebSocket Real-time Integration
const { 
  isConnected, 
  connectionStats, 
  emitModuleEvent,
  emitOrderStatusChange,
  emitTableStatusChange 
} = useRealTimeModule({
  modules: ['dashboard', 'orders', 'tables', 'kitchen'],
  onDatabaseEvent: (event) => {
    console.log('📡 Database event received:', event);
    if (event.table === 'orders' || event.table === 'tables') {
      window.dispatchEvent(new CustomEvent('dashboard-refresh'));
    }
  },
  onOrderUpdate: (data) => {
    console.log('📋 Order update received:', data);
    window.dispatchEvent(new CustomEvent('orders-update', { detail: data }));
  }
});
```

### 🎨 Tema Sistemi
- **Dark/Light Mode**: Dinamik tema değiştirme
- **Responsive Design**: Mobil ve masaüstü uyumluluğu
- **Glassmorphism**: Modern görsel efektler

### 📊 Dinamik Metrikler
- **Real-time KPIs**: Canlı performans göstergeleri
- **Auto-refresh**: Otomatik veri güncelleme
- **Simulated Data**: Geliştirme için simüle edilmiş veriler

```typescript
// Dynamic Metrics System
useEffect(() => {
  if (activeModule !== "dashboard") return

  const interval = setInterval(() => {
    setActiveOrders(Math.floor(Math.random() * 10) + 18)
    setTableOccupancy(Math.floor(Math.random() * 20) + 65)
    setKitchenEfficiency(Math.floor(Math.random() * 15) + 85)
    setDailySales((prev) => prev + Math.floor(Math.random() * 200) - 100)
  }, 5000)

  return () => clearInterval(interval)
}, [activeModule])
```

## Modül Yönetimi

### 📋 Modül Listesi
Sistem 17 ana modülü destekler:

1. **Dashboard** - Ana kontrol paneli
2. **Orders** - Sipariş yönetimi
3. **Tables** - Masa yönetimi
4. **Menu Management** - Menü yönetimi
5. **Inventory** - Envanter yönetimi
6. **Reports** - Raporlar ve analitik
7. **Customers** - Müşteri yönetimi
8. **Loyalty** - Sadakat programı
9. **Kitchen** - Mutfak siparişleri
10. **Staff** - Personel yönetimi
11. **Reservations** - Rezervasyon yönetimi
12. **Feedback** - Müşteri geribildirimi
13. **Notifications** - Bildirim ayarları
14. **Communications** - İletişim yönetimi
15. **Calendar** - Etkinlik takvimi
16. **Help** - Yardım ve destek
17. **Settings** - Sistem ayarları

### 🔄 Modül Geçişleri
- **Smooth Transitions**: Yumuşak modül geçişleri
- **State Preservation**: Modül durumlarının korunması
- **Context Management**: Modül bazlı context yönetimi

## POS Entegrasyonu

### 🛒 Sepet Yönetimi
- **Add to Cart**: Ürün ekleme
- **Update Quantity**: Miktar güncelleme
- **Remove Items**: Ürün çıkarma
- **Order Modes**: Dine-in, takeaway, delivery

```typescript
// POS Cart Functions
const addToCart = (item: any) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)
  if (existingItem) {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      ),
    )
  } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }])
  }
}
```

## Admin Floating Menu

### ⚡ Hızlı Erişim
- **Quick Order**: Hızlı sipariş oluşturma
- **Staff Call**: Personel çağrısı
- **Emergency Alert**: Acil durum bildirimi
- **New Customer**: Yeni müşteri kaydı
- **Today Reports**: Günlük raporlar

## Responsive Layout

### 📱 Mobil Uyumluluk
- **Mobile Sidebar**: Mobil navigasyon menüsü
- **Touch-friendly**: Dokunmatik ekran optimizasyonu
- **Adaptive Layout**: Ekran boyutuna göre uyarlanabilir düzen

### 🖥️ Masaüstü Deneyimi
- **Desktop Sidebar**: Masaüstü navigasyon
- **Right Sidebar**: Modül bazlı yan panel
- **Grid Layout**: Esnek grid sistemi

## Performans Optimizasyonları

### ⚡ Yükleme Stratejileri
- **Lazy Loading**: Modüllerin ihtiyaç halinde yüklenmesi
- **Code Splitting**: Kod bölme optimizasyonu
- **Suspense Boundaries**: Yükleme sınırları

### 🔄 Veri Yönetimi
- **State Management**: Merkezi durum yönetimi
- **Caching**: Veri önbellekleme
- **Real-time Updates**: Gerçek zamanlı güncellemeler

## Güvenlik ve Erişim Kontrolü

### 🔐 Tenant Context
- **Multi-tenant Support**: Çoklu kiracı desteği
- **Isolation**: Veri izolasyonu
- **Access Control**: Erişim kontrolü

### 👥 Kullanıcı Yönetimi
- **Role-based Access**: Rol bazlı erişim
- **Permission System**: İzin sistemi
- **Session Management**: Oturum yönetimi

## Hata Yönetimi

### 🚨 Error Handling
- **Graceful Degradation**: Zarif düşüş
- **Error Boundaries**: Hata sınırları
- **User Feedback**: Kullanıcı geribildirimi

### 📊 Monitoring
- **Connection Status**: Bağlantı durumu izleme
- **Performance Metrics**: Performans metrikleri
- **Error Logging**: Hata kayıtları

## Gelecek Geliştirmeler

### 🔮 Planlanan Özellikler
- **Advanced Analytics**: Gelişmiş analitik
- **AI Integration**: Yapay zeka entegrasyonu
- **Mobile App**: Mobil uygulama
- **API Extensions**: API genişletmeleri

### 🛠️ Teknik İyileştirmeler
- **Micro-frontend Architecture**: Mikro-frontend mimarisi
- **Service Worker**: Servis çalışanı
- **PWA Support**: PWA desteği
- **Offline Capability**: Çevrimdışı yetenek

## Sonuç

Ana Panel Sistemi, modern restoran yönetimi için kapsamlı bir çözüm sunar. Lazy loading, gerçek zamanlı veri akışı, responsive tasarım ve modüler yapısı ile yüksek performanslı ve kullanıcı dostu bir deneyim sağlar. Sistem, gelecekteki geliştirmeler için esnek bir temel oluşturur ve işletme ihtiyaçlarına göre özelleştirilebilir. 