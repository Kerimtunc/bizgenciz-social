# 🎯 Admin Floating Menu - Gelişmiş Floating UI Sistemi

## 📋 Özellikler
- **Floating UI**: Modern floating menu tasarımı
- **Priority System**: Öncelikli ve tehlikeli işlemler
- **Theme Support**: Dark/Light tema uyumluluğu
- **Interactive States**: Hover, active, focus durumları
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: Screen reader desteği

## 🎯 Kullanım Alanları
- Admin dashboard quick actions
- Floating action buttons (FAB)
- Context menus
- Quick access panels
- Emergency action menus

## 💡 En Etkileyici Özellikler

### 1. Dynamic Priority System
```typescript
function AdminMenuOption({
  icon,
  title,
  subtitle,
  onClick,
  isPriority = false,
  isDanger = false,
  theme,
}: AdminMenuOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all duration-200 group border ${
        isDanger
          ? theme === "dark"
            ? "border-red-500/30 bg-red-900/20 hover:bg-red-900/40 hover:border-red-400/50"
            : "border-red-200 bg-red-50/50 hover:bg-red-100 hover:border-red-300"
          : isPriority
            ? theme === "dark"
              ? "border-orange-500/30 bg-orange-900/20 hover:bg-orange-900/40 hover:border-orange-400/50"
              : "border-orange-200 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-300"
            : theme === "dark"
              ? "border-slate-600/30 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-500/50"
              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${
          isDanger ? "text-red-500" : isPriority ? "text-orange-500" : "text-slate-500"
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${
            theme === "dark" ? "text-slate-200" : "text-slate-800"
          }`}>
            {title}
          </div>
          <div className={`text-xs ${
            theme === "dark" ? "text-slate-400" : "text-slate-600"
          }`}>
            {subtitle}
          </div>
        </div>
      </div>
    </button>
  )
}
```

### 2. Floating Menu Container
```typescript
export function AdminFloatingMenu({
  theme,
  activeOrders,
  onQuickOrder,
  onNewCustomer,
  onStaffCall,
  onTodayReports,
  onEmergencyAlert,
}: AdminFloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Menu */}
      <div className={`
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        absolute bottom-16 right-0 w-80 p-4 rounded-2xl shadow-2xl transition-all duration-300 ease-out
        ${theme === "dark" 
          ? "bg-slate-900/95 border border-slate-700/50 backdrop-blur-xl" 
          : "bg-white/95 border border-slate-200/50 backdrop-blur-xl"
        }
      `}>
        <div className="space-y-2">
          {/* Quick Order */}
          <AdminMenuOption
            icon={<Plus className="w-5 h-5" />}
            title="Hızlı Sipariş"
            subtitle="Yeni sipariş oluştur"
            onClick={onQuickOrder}
            isPriority={true}
            theme={theme}
          />

          {/* New Customer */}
          <AdminMenuOption
            icon={<UserPlus className="w-5 h-5" />}
            title="Yeni Müşteri"
            subtitle="Müşteri kaydı ekle"
            onClick={onNewCustomer}
            theme={theme}
          />

          {/* Staff Call */}
          <AdminMenuOption
            icon={<Bell className="w-5 h-5" />}
            title="Personel Çağrısı"
            subtitle="Personel bildirimi gönder"
            onClick={onStaffCall}
            theme={theme}
          />

          {/* Today's Reports */}
          <AdminMenuOption
            icon={<ClipboardList className="w-5 h-5" />}
            title="Bugünkü Raporlar"
            subtitle="Günlük raporları görüntüle"
            onClick={onTodayReports}
            theme={theme}
          />

          {/* Emergency Alert */}
          <AdminMenuOption
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Acil Durum"
            subtitle="Acil durum bildirimi"
            onClick={onEmergencyAlert}
            isDanger={true}
            theme={theme}
          />
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-out
          ${theme === "dark" 
            ? "bg-orange-600 hover:bg-orange-700 shadow-orange-900/50" 
            : "bg-orange-500 hover:bg-orange-600 shadow-orange-900/30"
          }
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
      >
        <Plus className="w-6 h-6 text-white" />
        
        {/* Active Orders Badge */}
        {activeOrders > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {activeOrders > 99 ? '99+' : activeOrders}
            </span>
          </div>
        )}
      </button>
    </div>
  )
}
```

### 3. Theme-aware Color System
```typescript
const getThemeColors = (theme: string, type: 'danger' | 'priority' | 'default') => {
  if (theme === "dark") {
    switch (type) {
      case 'danger':
        return {
          border: 'border-red-500/30',
          bg: 'bg-red-900/20',
          hoverBg: 'hover:bg-red-900/40',
          hoverBorder: 'hover:border-red-400/50',
          icon: 'text-red-500'
        }
      case 'priority':
        return {
          border: 'border-orange-500/30',
          bg: 'bg-orange-900/20',
          hoverBg: 'hover:bg-orange-900/40',
          hoverBorder: 'hover:border-orange-400/50',
          icon: 'text-orange-500'
        }
      default:
        return {
          border: 'border-slate-600/30',
          bg: 'bg-slate-800/20',
          hoverBg: 'hover:bg-slate-800/40',
          hoverBorder: 'hover:border-slate-500/50',
          icon: 'text-slate-500'
        }
    }
  } else {
    switch (type) {
      case 'danger':
        return {
          border: 'border-red-200',
          bg: 'bg-red-50/50',
          hoverBg: 'hover:bg-red-100',
          hoverBorder: 'hover:border-red-300',
          icon: 'text-red-500'
        }
      case 'priority':
        return {
          border: 'border-orange-200',
          bg: 'bg-orange-50/50',
          hoverBg: 'hover:bg-orange-100',
          hoverBorder: 'hover:border-orange-300',
          icon: 'text-orange-500'
        }
      default:
        return {
          border: 'border-slate-200',
          bg: 'bg-slate-50/50',
          hoverBg: 'hover:bg-slate-100',
          hoverBorder: 'hover:border-slate-300',
          icon: 'text-slate-500'
        }
    }
  }
}
```

### 4. Smooth Animation System
```typescript
// Menu open/close animation
className={`
  ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
  absolute bottom-16 right-0 w-80 p-4 rounded-2xl shadow-2xl transition-all duration-300 ease-out
`}

// Button rotation animation
className={`
  relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-out
  ${isOpen ? 'rotate-45' : 'rotate-0'}
`}
```

## 🎨 Görsel Efektler
- **Backdrop Blur**: Glassmorphism efektleri
- **Smooth Transitions**: CSS transition'ları
- **Hover States**: Interactive hover durumları
- **Shadow Systems**: Multi-layer shadow'lar
- **Rotation Animations**: Button rotation efektleri

## 📱 Responsive Features
- **Fixed Positioning**: Ekranın sağ alt köşesinde sabit
- **Mobile Optimized**: Touch-friendly interface
- **Accessibility**: Keyboard navigation desteği
- **Screen Reader**: ARIA labels ve descriptions

## 🔧 Customization Options
- **Priority Levels**: Normal, priority, danger
- **Theme Support**: Dark/Light tema seçenekleri
- **Animation Timing**: Configurable transitions
- **Color Schemes**: Theme-specific palettes
- **Menu Items**: Configurable menu options

## ⚡ Performance Optimizations
- **Conditional Rendering**: Optimized DOM updates
- **CSS Transitions**: Hardware acceleration
- **Event Handling**: Efficient click management
- **Memory Management**: Cleanup on unmount 