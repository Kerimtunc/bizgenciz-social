# 📊 Status Widget System - Real-time Durum Göstergeleri

## 📋 Özellikler
- **Real-time Status**: Canlı durum güncellemeleri
- **Multiple Status Types**: Success, pending, warning, error
- **Animated Progress**: Smooth progress animasyonları
- **Trend Indicators**: Up/down/stable trend göstergeleri
- **Responsive Layout**: Grid ve list layout seçenekleri
- **Theme Support**: Dark/Light tema uyumluluğu

## 🎯 Kullanım Alanları
- Dashboard status göstergeleri
- System health monitoring
- Order tracking systems
- Performance metrics
- Alert systems

## 💡 En Etkileyici Özellikler

### 1. Dynamic Status Configuration System
```typescript
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
    default:
      return {
        icon: Clock,
        color: "#6B7280",
        bgColor: "rgba(107, 114, 128, 0.1)",
        borderColor: "rgba(107, 114, 128, 0.2)",
        textColor: "#6B7280",
        gradient: "linear-gradient(135deg, #6B7280, #4B5563)"
      }
  }
}
```

### 2. Glassmorphism Status Card
```typescript
const StatusCard = ({ item, index }: { item: StatusItem; index: number }) => {
  const config = getStatusConfig(item.status)
  const IconComponent = config.icon

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
      {/* Status Icon */}
      <div className="flex items-center justify-between mb-3">
        <div 
          className="p-2 rounded-xl"
          style={{ backgroundColor: config.bgColor }}
        >
          <IconComponent 
            className="w-5 h-5" 
            style={{ color: config.color }}
          />
        </div>
        {item.trend && (
          <TrendIndicator trend={item.trend} theme={theme} />
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={`font-semibold text-sm ${
          theme === "dark" ? "text-slate-200" : "text-slate-800"
        }`}>
          {item.title}
        </h3>
        <p className={`text-2xl font-bold ${
          theme === "dark" ? "text-slate-100" : "text-slate-900"
        }`}>
          {item.value}
        </p>
        <p className={`text-xs ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          {item.description}
        </p>
      </div>

      {/* Progress Bar */}
      {item.progress !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: config.textColor }}>Progress</span>
            <span style={{ color: config.textColor }}>{item.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${item.progress}%`,
                background: config.gradient
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
```

### 3. Trend Indicator Component
```typescript
const TrendIndicator = ({ trend, theme }: { trend: "up" | "down" | "stable"; theme: string }) => {
  const getTrendConfig = () => {
    switch (trend) {
      case "up":
        return {
          icon: TrendingUp,
          color: "#10B981",
          text: "+12%"
        }
      case "down":
        return {
          icon: TrendingDown,
          color: "#EF4444",
          text: "-8%"
        }
      default:
        return {
          icon: Minus,
          color: "#6B7280",
          text: "0%"
        }
    }
  }

  const config = getTrendConfig()
  const IconComponent = config.icon

  return (
    <div className="flex items-center space-x-1">
      <IconComponent 
        className="w-3 h-3" 
        style={{ color: config.color }}
      />
      <span 
        className="text-xs font-medium"
        style={{ color: config.color }}
      >
        {config.text}
      </span>
    </div>
  )
}
```

### 4. Responsive Layout System
```typescript
const layoutClasses = layout === "grid" 
  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  : "space-y-4"

return (
  <div className="space-y-4">
    <h2 className={`text-lg font-semibold ${
      theme === "dark" ? "text-slate-200" : "text-slate-800"
    }`}>
      {title}
    </h2>
    <div className={layoutClasses}>
      {items.map((item, index) => (
        <StatusCard key={item.id} item={item} index={index} />
      ))}
    </div>
  </div>
)
```

## 🎨 Görsel Efektler
- **Glassmorphism**: Backdrop blur efektleri
- **Gradient Backgrounds**: Renk geçişleri
- **Smooth Animations**: CSS transition'ları
- **Hover Effects**: Interactive hover durumları
- **Progress Bars**: Animated progress göstergeleri

## 📱 Responsive Features
- **Grid Layout**: Responsive grid sistemi
- **List Layout**: Alternative list görünümü
- **Mobile Optimized**: Touch-friendly interface
- **Flexible Sizing**: Adaptive card boyutları

## 🔧 Customization Options
- **Status Types**: Success, pending, warning, error
- **Layout Options**: Grid ve list seçenekleri
- **Color Schemes**: Theme-specific palettes
- **Animation Timing**: Configurable transitions
- **Progress Display**: Optional progress bars 