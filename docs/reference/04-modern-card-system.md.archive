# 🎴 Modern Card System - Gelişmiş Kart Tasarım Sistemi

## 📋 Özellikler
- **Multiple Variants**: Glass, elevated, gradient, default
- **Interactive States**: Hover, active, focus durumları
- **Responsive Sizing**: Small, medium, large boyutlar
- **Theme Support**: Dark/Light tema uyumluluğu
- **Backdrop Blur**: Modern glassmorphism efektleri
- **Smooth Animations**: CSS transition'ları

## 🎯 Kullanım Alanları
- Dashboard kartları
- Product cards
- Feature showcases
- Information displays
- Interactive UI elements

## 💡 En Etkileyici Özellikler

### 1. Dynamic Variant System
```typescript
const getVariantStyles = () => {
  switch (variant) {
    case "glass":
      return theme === "dark" 
        ? "bg-slate-900/40 border-slate-700/30 backdrop-blur-xl shadow-2xl shadow-slate-900/20" 
        : "bg-white/60 border-orange-200/40 backdrop-blur-xl shadow-2xl shadow-orange-900/10"
    
    case "elevated":
      return theme === "dark"
        ? "bg-slate-800/90 border-slate-600/50 shadow-2xl shadow-slate-900/40 backdrop-blur-sm"
        : "bg-white/90 border-orange-100/60 shadow-2xl shadow-orange-900/20 backdrop-blur-sm"
    
    case "gradient":
      return theme === "dark"
        ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600/40 backdrop-blur-lg shadow-xl"
        : "bg-gradient-to-br from-white/80 to-orange-50/80 border-orange-200/50 backdrop-blur-lg shadow-xl"
    
    default:
      return theme === "dark" 
        ? "bg-slate-900/50 border-slate-700/50 backdrop-blur-sm" 
        : "bg-white/70 border-orange-200"
  }
}
```

### 2. Interactive Animation System
```typescript
const getInteractiveStyles = () => {
  if (!interactive) return ""
  
  return `
    cursor-pointer transition-all duration-300 ease-out
    hover:scale-[1.02] hover:shadow-3xl
    hover:${theme === "dark" ? "bg-slate-800/60" : "bg-white/80"}
    hover:border-${theme === "dark" ? "slate-600/60" : "orange-300/60"}
    active:scale-[0.98]
  `
}
```

### 3. Dynamic Size Configuration
```typescript
const getSizeStyles = () => {
  switch (size) {
    case "sm":
      return "p-3"
    case "lg": 
      return "p-8"
    default:
      return "p-6"
  }
}
```

### 4. Icon Integration System
```typescript
{(title || subtitle || Icon) && (
  <CardHeader className={`${size === "sm" ? "pb-2" : "pb-4"}`}>
    <CardTitle className={`
      flex items-center space-x-3
      ${size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg"}
      ${theme === "dark" ? "text-slate-100" : "text-slate-800"}
      font-semibold
    `}>
      {Icon && (
        <Icon className={`
          ${size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"}
          ${theme === "dark" ? "text-orange-400" : "text-orange-600"}
        `} />
      )}
      {title}
    </CardTitle>
    {subtitle && (
      <p className={`
        ${size === "sm" ? "text-xs" : "text-sm"}
        ${theme === "dark" ? "text-slate-400" : "text-slate-600"}
      `}>
        {subtitle}
      </p>
    )}
  </CardHeader>
)}
```

## 🎨 Görsel Efektler
- **Glassmorphism**: Backdrop blur efektleri
- **Gradient Overlays**: Renk geçişleri
- **Shadow Systems**: Multi-layer shadow'lar
- **Scale Animations**: Hover scale efektleri
- **Border Transitions**: Smooth border değişimleri

## 📱 Responsive Features
- **Flexible Sizing**: Dinamik boyutlandırma
- **Mobile Optimized**: Touch-friendly interface
- **Accessibility**: Screen reader desteği
- **Performance**: Optimized rendering

## 🔧 Customization Options
- **Variant Types**: Glass, elevated, gradient, default
- **Size Options**: Small, medium, large
- **Interactive States**: Configurable hover/active states
- **Color Schemes**: Theme-specific palettes
- **Animation Timing**: Customizable transitions

## ⚡ Performance Optimizations
- **CSS-in-JS**: Efficient styling
- **Conditional Rendering**: Optimized DOM
- **Transition Optimization**: Hardware acceleration
- **Memory Management**: Cleanup on unmount 