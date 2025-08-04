# Status Widget System

## Özet

Bu dosya, QR Menu Elite Edition projesinin gelişmiş durum widget sistemini detaylandırır. Sistem, çoklu durum göstergeleri, animasyonlu progress bar'lar, trend analizi ve responsive tasarım gibi kapsamlı özellikler içerir.

## Önemli Özellikler

### 1. Multi-Status Configuration
- **Status Types**: success, pending, warning, error durumları
- **Dynamic Colors**: Her durum için özel renk paleti
- **Gradient Backgrounds**: Modern gradient arka planlar
- **Icon Integration**: Durum bazlı ikon sistemi

```typescript
// Status Configuration System
const getStatusConfig = (status: StatusItem["status"]) => {
  switch (status) {
    case "success":
      return {
        icon: CheckCircle,
        color: "#10B981",
        bgColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "rgba(16, 185, 129, 0.2)",
        textColor: "#10B981",
        gradient: "linear-gradient(135deg, #10B981, #059669)"
      }
    case "pending":
      return {
        icon: Clock,
        color: "#3B82F6",
        bgColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.2)",
        textColor: "#3B82F6",
        gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)"
      }
    case "warning":
      return {
        icon: AlertTriangle,
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "rgba(245, 158, 11, 0.2)",
        textColor: "#F59E0B",
        gradient: "linear-gradient(135deg, #F59E0B, #D97706)"
      }
    case "error":
      return {
        icon: XCircle,
        color: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.2)",
        textColor: "#EF4444",
        gradient: "linear-gradient(135deg, #EF4444, #DC2626)"
      }
  }
};
```

### 2. Animated Status Cards
- **Glassmorphism Design**: Modern cam efekti tasarım
- **Hover Animations**: Hover durumunda scale efekti
- **Staggered Animations**: Sıralı animasyon gecikmeleri
- **Background Patterns**: Dinamik arka plan desenleri

```typescript
// Animated Status Card Component
const StatusCard = ({ item, index }: { item: StatusItem; index: number }) => {
  const config = getStatusConfig(item.status);
  const IconComponent = config.icon;

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4 group cursor-pointer transition-all duration-300 hover:scale-105"
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 251, 235, 0.8))",
        backdropFilter: "blur(20px)",
        border: `1px solid ${config.borderColor}`,
        boxShadow: `0 4px 20px ${config.bgColor}`,
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div 
          className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl"
          style={{ background: config.gradient }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon and Trend */}
        <div className="flex items-start justify-between mb-3">
          <div 
            className="p-2 rounded-xl shadow-lg"
            style={{ background: config.gradient }}
          >
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          
          {item.trend && (
            <div 
              className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
              style={{
                background: config.bgColor,
                color: config.textColor
              }}
            >
              <TrendingUp className={`h-3 w-3 ${
                item.trend === "down" ? "rotate-180" : ""
              } ${
                item.trend === "stable" ? "rotate-90" : ""
              }`} />
              <span>{item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"}</span>
            </div>
          )}
        </div>

        {/* Title & Value */}
        <div className="mb-2">
          <h4 className={`text-sm font-semibold mb-1 ${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }`}>
            {item.title}
          </h4>
          <div 
            className="text-2xl font-bold"
            style={{ color: config.textColor }}
          >
            {item.value}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 3. Progress Bar System
- **Animated Progress**: Smooth animasyonlu progress bar'lar
- **Color-coded Progress**: Durum bazlı renk kodlaması
- **Percentage Display**: Yüzde göstergesi
- **Gradient Effects**: Modern gradient efektleri

```typescript
// Animated Progress Bar
{item.progress !== undefined && (
  <div className="relative">
    <div 
      className="h-2 rounded-full overflow-hidden"
      style={{
        background: theme === "dark" ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 0.5)"
      }}
    >
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: `${item.progress}%`,
          background: config.gradient,
          boxShadow: `0 0 10px ${config.bgColor}`
        }}
      />
    </div>
    <div 
      className="text-xs font-medium mt-1"
      style={{ color: config.textColor }}
    >
      {item.progress}% Tamamlandı
    </div>
  </div>
)}
```

### 4. Trend Analysis
- **Trend Indicators**: Up, down, stable trend göstergeleri
- **Visual Arrows**: Görsel ok işaretleri
- **Color-coded Trends**: Trend bazlı renk kodlaması
- **Real-time Updates**: Gerçek zamanlı güncellemeler

```typescript
// Trend Analysis Component
{item.trend && (
  <div 
    className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
    style={{
      background: config.bgColor,
      color: config.textColor
    }}
  >
    <TrendingUp className={`h-3 w-3 ${
      item.trend === "down" ? "rotate-180" : ""
    } ${
      item.trend === "stable" ? "rotate-90" : ""
    }`} />
    <span>{item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"}</span>
  </div>
)}
```

### 5. Responsive Layout System
- **Grid/List Layouts**: İki farklı layout seçeneği
- **Responsive Grid**: Mobil uyumlu grid sistemi
- **Breakpoint Management**: Ekran boyutuna göre sütun sayısı
- **Flexible Spacing**: Dinamik boşluk yönetimi

```typescript
// Responsive Layout System
<div className={`
  ${layout === "grid" 
    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4" 
    : "space-y-4"
  }
`}>
  {items.map((item, index) => (
    <StatusCard key={item.id} item={item} index={index} />
  ))}
</div>
```

### 6. Summary Statistics
- **Status Counts**: Her durum için sayısal özet
- **Visual Summary**: Görsel özet kartları
- **Real-time Stats**: Gerçek zamanlı istatistikler
- **Color-coded Summary**: Renk kodlu özet bilgileri

```typescript
// Summary Statistics Component
<div className="mt-6 p-4 rounded-xl" style={{
  background: theme === "dark" 
    ? "linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4))"
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 251, 235, 0.4))",
  backdropFilter: "blur(10px)",
  border: theme === "dark" 
    ? "1px solid rgba(51, 65, 85, 0.3)" 
    : "1px solid rgba(226, 232, 240, 0.3)"
}}>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {["success", "pending", "warning", "error"].map(status => {
      const count = items.filter(item => item.status === status).length;
      const config = getStatusConfig(status as StatusItem["status"]);
      
      return (
        <div key={status} className="text-center">
          <div className="text-lg font-bold" style={{ color: config.textColor }}>
            {count}
          </div>
          <div className={`text-xs capitalize ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}>
            {status === "success" ? "Başarılı" : 
             status === "pending" ? "Beklemede" :
             status === "warning" ? "Uyarı" : "Hata"}
          </div>
        </div>
      );
    })}
  </div>
</div>
```

## Teknik Detaylar

### Interface Definitions
```typescript
interface StatusItem {
  id: string;
  title: string;
  value: string | number;
  status: "success" | "pending" | "warning" | "error";
  description: string;
  progress?: number;
  trend?: "up" | "down" | "stable";
}

interface StatusWidgetProps {
  title: string;
  items: StatusItem[];
  theme: "light" | "dark";
  layout?: "grid" | "list";
}
```

### Theme Support
- **Light Theme**: Açık tema renk paleti
- **Dark Theme**: Koyu tema renk paleti
- **Dynamic Colors**: Tema bazlı dinamik renkler
- **Backdrop Filters**: Cam efekti filtreleri

### Animation System
- **Staggered Animations**: Sıralı animasyon gecikmeleri
- **Hover Effects**: Hover durumunda scale animasyonu
- **Transition Durations**: Smooth geçiş süreleri
- **Progress Animations**: Progress bar animasyonları

### Performance Optimizations
- **CSS-in-JS**: Performanslı stil yönetimi
- **Conditional Rendering**: Koşullu render sistemi
- **Memoization**: Gereksiz re-render'ları önleme
- **Efficient Updates**: Verimli güncelleme sistemi

## Kullanım Senaryoları

### 1. System Monitoring
- Sunucu durumu takibi
- Veritabanı bağlantı durumu
- API endpoint sağlığı
- Sistem performans göstergeleri

### 2. Order Management
- Sipariş durumu takibi
- Hazırlama süreleri
- Teslimat durumları
- Stok seviyeleri

### 3. User Activity
- Aktif kullanıcı sayısı
- Online/offline durumları
- Son aktivite zamanları
- Kullanıcı performansı

### 4. Business Metrics
- Günlük satış rakamları
- Müşteri memnuniyeti
- Stok durumu
- Finansal göstergeler

## Entegrasyon Noktaları

### Data Sources
- Real-time API endpoints
- WebSocket connections
- Database queries
- External service status

### State Management
- React Context API
- Zustand store
- Redux toolkit
- Local component state

### External Dependencies
- Lucide React: İkon kütüphanesi
- Tailwind CSS: Styling framework
- React Hooks: State management
- CSS-in-JS: Dinamik stiller 