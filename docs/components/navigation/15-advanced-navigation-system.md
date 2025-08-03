# Advanced Navigation System

## Özet

Bu dosya, QR Menu Elite Edition projesinin gelişmiş navigasyon sistemini detaylandırır. Sistem, global arama, modül yönetimi, kullanıcı profili ve çoklu dil desteği gibi kapsamlı özellikler içerir.

## Önemli Özellikler

### 1. Global Search Component
- **Debounced Search**: 300ms gecikme ile performanslı arama
- **Recent/Popular Searches**: Son aramalar ve popüler aramalar yönetimi
- **Loading States**: Arama sırasında görsel geri bildirim
- **Click Outside Detection**: Dışarı tıklayınca kapanma
- **Search Analytics**: Arama davranışlarını takip etme
- **Module-based Results**: Modül bazlı arama sonuçları

```typescript
// Debounced Search Implementation
const debounceRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  if (query.length >= 2) {
    setLoading(true);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);
  }
}, [query]);

// Click Outside Detection
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// Recent Searches Management
const addToRecentSearches = (searchTerm: string) => {
  setRecentSearches(prev => {
    const updated = [searchTerm, ...prev.filter(term => term !== searchTerm)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    return updated;
  });
};

// Search Analytics Integration
const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (query.trim()) {
    addToRecentSearches(query.trim());
    fetch('/api/search-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query.trim(), timestamp: new Date() })
    }).catch(() => {});
  }
};
```

### 2. Module Header Component
- **Responsive Design**: Desktop ve mobil için farklı layoutlar
- **High Z-Index Management**: Dropdown'ların üstte kalması
- **Module Switching**: Modüller arası geçiş
- **Theme Support**: Açık/koyu tema desteği
- **Backdrop Overlay**: Dropdown dışına tıklayınca kapanma

```typescript
// Module Header with High Z-Index
export function ModuleHeader({
  modules,
  activeModule,
  onModuleChange,
  theme = "light",
}: ModuleHeaderProps) {
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  return (
    <div className={`${
      theme === "dark" ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-orange-200"
    } backdrop-blur-lg border-0 border-b shadow-sm relative z-[99999]`}>
      {/* Desktop Dropdown with Ultra High Z-Index */}
      {isDesktopDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 sm:w-80 bg-white border border-orange-200 rounded-lg shadow-2xl z-[999999]">
          {/* Dropdown content */}
        </div>
      )}

      {/* Backdrop Overlay */}
      {isDesktopDropdownOpen && (
        <div 
          className="fixed inset-0 z-[999998] bg-black/10" 
          onClick={() => setIsDesktopDropdownOpen(false)}
        />
      )}
    </div>
  );
}
```

### 3. User Profile Component
- **Google Integration**: Google kullanıcı bilgileri entegrasyonu
- **Compact/Full Versions**: Farklı kullanım senaryoları için
- **Initials Generation**: Avatar için baş harfler
- **Sign Out Functionality**: Güvenli çıkış işlemi

```typescript
// User Profile with Google Integration
interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export const UserProfile = ({ user, onSignOut }: UserProfileProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-xl bg-white rounded-lg">
      <div className="h-20 w-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
        <span className="text-2xl font-semibold text-orange-600">
          {getInitials(user.name)}
        </span>
      </div>
      {/* User details and sign out button */}
    </div>
  );
};
```

### 4. Language Selector Component
- **Multi-language Support**: 7 farklı dil desteği
- **Flag Icons**: Her dil için bayrak ikonu
- **Native Names**: Yerel dil isimleri
- **Smooth Transitions**: Animasyonlu geçişler

```typescript
// Language Selector with Multiple Languages
const languages = [
  { code: 'tr', name: 'Türkçe', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', native: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', native: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', native: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', native: 'Русский', flag: '🇷🇺' },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('tr');

  return (
    <div className="relative">
      <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.native}</span>
      </button>
      {/* Dropdown with language options */}
    </div>
  );
}
```

### 5. Module Header Simple Component
- **Simplified Interface**: Basitleştirilmiş header
- **Search Integration**: Entegre arama çubuğu
- **Responsive Design**: Mobil uyumlu tasarım
- **Navigation Controls**: Ana menü ve modül geçişleri

```typescript
// Simple Module Header
export function ModuleHeaderSimple({ 
  title, 
  searchPlaceholder = "Ara...", 
  showSearch = true,
  modules = [], 
  activeModule, 
  onModuleChange 
}: ModuleHeaderSimpleProps) {
  return (
    <header className="bg-white border-b border-orange-200 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Navigation controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onModuleChange && (
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              <span className="hidden sm:inline">Ana Menü</span>
            </button>
          )}
        </div>

        {/* Search bar */}
        {showSearch && (
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-8 sm:pl-10 bg-white/50 border-orange-200 focus:border-orange-400 rounded-md border w-full"
            />
          </div>
        )}
      </div>
    </header>
  );
}
```

## Teknik Detaylar

### Z-Index Yönetimi
- **Ultra High Z-Index**: Dropdown'lar için z-[999999] kullanımı
- **Backdrop Overlay**: z-[999998] ile arka plan karartma
- **Header Z-Index**: z-[99999] ile header'ın üstte kalması

### Responsive Design
- **Mobile-First**: Mobil öncelikli tasarım
- **Breakpoint Management**: sm:, lg: breakpoint'leri
- **Conditional Rendering**: Ekran boyutuna göre içerik değişimi

### Performance Optimizations
- **Debounced Search**: 300ms gecikme ile API çağrılarını optimize etme
- **Local Storage**: Son aramaları yerel depolamada saklama
- **Event Cleanup**: useEffect cleanup ile memory leak önleme

### Accessibility Features
- **Keyboard Navigation**: Tab ile gezinme desteği
- **Screen Reader Support**: ARIA etiketleri
- **Focus Management**: Odak yönetimi
- **Click Outside**: Dışarı tıklayınca kapanma

## Kullanım Senaryoları

### 1. Global Search
- Tüm modüllerde arama yapma
- Son aramaları görüntüleme
- Popüler aramaları keşfetme
- Arama analitiklerini takip etme

### 2. Module Navigation
- Modüller arası geçiş
- Responsive dropdown menüler
- Ana menüye dönüş
- Modül durumu takibi

### 3. User Management
- Google hesap entegrasyonu
- Kullanıcı profil yönetimi
- Güvenli çıkış işlemi
- Avatar ve baş harfler

### 4. Internationalization
- Çoklu dil desteği
- Yerel dil isimleri
- Bayrak ikonları
- Dil değiştirme

## Entegrasyon Noktaları

### API Endpoints
- `/api/global-search`: Global arama API'si
- `/api/search-analytics`: Arama analitikleri
- `/api/user/profile`: Kullanıcı profil bilgileri

### State Management
- Local Storage: Son aramalar
- React State: UI durumları
- Context API: Tema ve dil ayarları

### External Dependencies
- Lucide React: İkon kütüphanesi
- Tailwind CSS: Styling framework
- React Hooks: State management 