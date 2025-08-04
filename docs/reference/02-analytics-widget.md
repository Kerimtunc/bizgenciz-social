# 📊 Analytics Widget - Gelişmiş Veri Görselleştirme

## 📋 Özellikler
- **Circular Charts**: SVG tabanlı dairesel grafikler
- **Animated Progress**: Smooth animasyonlu ilerleme çubukları
- **Multiple Chart Types**: Donut, bar, progress chart'ları
- **Responsive Sizing**: Small, medium, large boyut seçenekleri
- **Theme Support**: Dark/Light tema desteği
- **Real-time Updates**: Canlı veri güncellemeleri

## 🎯 Kullanım Alanları
- Dashboard metrikleri
- KPI göstergeleri
- Performans raporları
- Satış analitikleri
- Kullanıcı istatistikleri

## 💡 En Etkileyici Özellikler

### 1. SVG Circular Chart Implementation
```typescript
const CircularChart = ({ item, index }: { item: AnalyticsData; index: number }) => {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (item.percentage / 100) * circumference

  return (
    <div className="relative group">
      <svg className={`${sizeConfig.chart} transform -rotate-90`} viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={theme === "dark" ? "#1E293B" : "#E2E8F0"}
          strokeWidth="8"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={item.color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-2000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${item.color}40)`,
            animationDelay: `${index * 200}ms`
          }}
        />
      </svg>
      
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div 
          className="text-xl font-bold"
          style={{ color: item.color }}
        >
          {item.value}
        </div>
        <div className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          {item.percentage}%
        </div>
      </div>
    </div>
  )
}
```

### 2. Dynamic Size Configuration
```typescript
const getWidgetSize = () => {
  switch (size) {
    case "small":
      return { width: "w-64", height: "h-48", chart: "w-16 h-16" }
    case "large":
      return { width: "w-96", height: "h-80", chart: "w-32 h-32" }
    default:
      return { width: "w-80", height: "h-64", chart: "w-24 h-24" }
  }
}
```

### 3. Staggered Animation System
```typescript
useEffect(() => {
  const timer = setTimeout(() => setAnimationProgress(100), 300)
  return () => clearTimeout(timer)
}, [])

// Animation delay for each chart
style={{
  filter: `drop-shadow(0 0 8px ${item.color}40)`,
  animationDelay: `${index * 200}ms`
}}
```

### 4. Theme-aware Color System
```typescript
const getStatusColor = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up":
      return theme === "dark" ? "#10B981" : "#059669"
    case "down":
      return theme === "dark" ? "#EF4444" : "#DC2626"
    default:
      return theme === "dark" ? "#6B7280" : "#4B5563"
  }
}
```

## 🎨 Görsel Efektler
- **Drop Shadows**: SVG elementlerinde glow efekti
- **Smooth Transitions**: CSS transition'ları
- **Staggered Animations**: Kademeli animasyon sistemi
- **Gradient Overlays**: Renk geçişleri
- **Hover Effects**: Interactive hover durumları

## 📱 Responsive Features
- **Flexible Sizing**: Dinamik boyutlandırma
- **Mobile Optimization**: Touch-friendly interface
- **Accessibility**: Screen reader desteği
- **Performance**: Optimized rendering

## 🔧 Customization Options
- **Chart Types**: Donut, bar, progress
- **Color Schemes**: Custom color palettes
- **Animation Timing**: Configurable delays
- **Data Formats**: Flexible data structures 