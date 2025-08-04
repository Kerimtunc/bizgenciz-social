# Advanced Menu System - E-ticaret Menü Sistemi

## 🎯 Genel Bakış

Bu dosya, modern e-ticaret uygulamaları için gelişmiş menü sistemi bileşenlerini içerir. Performans optimizasyonu, kullanıcı deneyimi ve erişilebilirlik odaklı tasarım prensipleriyle geliştirilmiştir.

## 🚀 Temel Özellikler

### 1. **OptimizedImage Component**
- **Lazy Loading**: Performans için görsel yükleme optimizasyonu
- **Error Handling**: Görsel yüklenemediğinde fallback mekanizması
- **Loading States**: Skeleton loading animasyonları
- **WebP Support**: Modern görsel formatları desteği

```typescript
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  productName: string;
}> = ({ src, alt, className, loading = 'lazy', productName }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImageSrc(getPlaceholderImage());
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">🍽️</div>
            <div className="text-sm">{productName}</div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### 2. **ProductCard Component**
- **Touch & Mouse Interactions**: Uzun basma ve sürükleme desteği
- **Quick Add Feature**: 800ms uzun basma ile hızlı sepete ekleme
- **Stock Management**: Stok durumu gösterimi ve kontrolü
- **Premium Badges**: Premium ürün işaretleme sistemi
- **Social Proof**: Sosyal kanıt metinleri

```typescript
const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onProductClick, 
  onAddToCart,
  onShowCustomizationAlert,
  categoryColor
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Sadece sol tık
    
    setIsPressed(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    
    pressTimerRef.current = setTimeout(() => {
      if (!isDragging) {
        setShowQuickAdd(true);
      }
    }, 800);
  }, [isDragging]);

  // Drag detection logic
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragStartRef.current || !isPressed) return;
    
    const deltaX = Math.abs(e.clientX - dragStartRef.current.x);
    const deltaY = Math.abs(e.clientY - dragStartRef.current.y);
    
    if (deltaX > 10 || deltaY > 10) {
      setIsDragging(true);
      setShowQuickAdd(false);
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    }
  }, [isPressed]);
};
```

### 3. **CategorySlider Component**
- **Responsive Design**: Mobil öncelikli tasarım
- **Smooth Scrolling**: Yumuşak kaydırma animasyonları
- **Arrow Navigation**: Ok tuşları ile navigasyon
- **Drag Support**: Mouse ile sürükleme desteği
- **Dynamic Card Sizing**: Ekran boyutuna göre kart boyutlandırma

```typescript
const CategorySlider: React.FC<CategorySliderProps> = ({ category, products, onProductClick }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const cardWidth = useMemo(() => {
    if (typeof window === 'undefined') return 280;
    
    const width = window.innerWidth;
    if (width < 640) return Math.min(280, width * 0.85);
    if (width < 768) return 300;
    if (width < 1024) return 320;
    return 340;
  }, []);

  const checkArrows = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollWidth > clientWidth && scrollLeft < (scrollWidth - clientWidth - 10));
  }, []);
};
```

### 4. **ProductModal Component**
- **Keyboard Navigation**: ESC tuşu ile kapatma
- **Click Outside**: Dışarı tıklama ile kapatma
- **Quantity Management**: Adet seçimi ve kontrolü
- **Price Calculation**: Dinamik fiyat hesaplama
- **Accessibility**: ARIA etiketleri ve klavye navigasyonu

```typescript
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const formattedPrice = useMemo(() => formatPrice(product.price), [product.price]);
  const hasDiscount = useMemo(() => 
    product.original_price && product.original_price > product.price, 
    [product.original_price, product.price]
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
};
```

## 🛠️ Utility Functions

### 1. **Price Formatting**
```typescript
const formatPrice = (price: number): string => {
  if (!Number.isFinite(price) || price < 0) return '₺0,00';
  
  if (price >= 100) {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};
```

### 2. **Time Formatting**
```typescript
const formatPrepTime = (prepTime?: string): string | null => {
  if (!prepTime) return null;
  
  const cleanTime = prepTime.toLowerCase().trim();
  
  if (cleanTime.includes('-')) {
    const parts = cleanTime.split('-');
    if (parts.length === 2) {
      const min = parts[0].trim().replace(/\D/g, '');
      const max = parts[1].trim().replace(/\D/g, '');
      
      if (min && max) {
        if (cleanTime.includes('dakika') && !cleanTime.includes('dakika dk')) {
          return `${min}-${max} dakika`;
        } else {
          return `${min}-${max} dk`;
        }
      }
    }
  }
  
  const numOnly = cleanTime.replace(/\D/g, '');
  if (numOnly) {
    if (cleanTime.includes('dakika') && !cleanTime.includes('dakika dk')) {
      return `${numOnly} dakika`;
    } else {
      return `${numOnly} dk`;
    }
  }
  
  return cleanTime;
};
```

## 📱 Responsive Design

### Mobile-First Approach
- **Touch Interactions**: Mobil cihazlar için optimize edilmiş dokunma etkileşimleri
- **Gesture Support**: Kaydırma ve uzun basma hareketleri
- **Adaptive Layouts**: Ekran boyutuna göre uyarlanabilir düzenler
- **Performance**: Mobil cihazlarda optimize edilmiş performans

### Breakpoint Strategy
```typescript
const cardWidth = useMemo(() => {
  if (typeof window === 'undefined') return 280;
  
  const width = window.innerWidth;
  if (width < 640) return Math.min(280, width * 0.85); // Mobile
  if (width < 768) return 300; // Tablet
  if (width < 1024) return 320; // Small Desktop
  return 340; // Large Desktop
}, []);
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#f97316) - Sepete ekleme butonları
- **Secondary**: Gray (#6b7280) - Metin ve ikonlar
- **Success**: Green (#16a34a) - Sosyal kanıt metinleri
- **Warning**: Orange (#ea580c) - Düşük stok uyarıları
- **Error**: Red (#dc2626) - Stokta yok durumu

### Typography
- **Headings**: Font-semibold, text-gray-900
- **Body Text**: Text-gray-600, leading-relaxed
- **Meta Info**: Text-xs, text-gray-500
- **Prices**: Font-bold, text-lg

### Spacing
- **Card Padding**: p-4
- **Element Gaps**: space-x-2, space-y-3
- **Section Margins**: mb-4, mt-2

## 🔧 Performance Optimizations

### 1. **Memoization**
- `useMemo` for expensive calculations
- `useCallback` for event handlers
- Component memoization for re-render prevention

### 2. **Lazy Loading**
- Image lazy loading with Intersection Observer
- Component lazy loading with React.lazy
- Data lazy loading with pagination

### 3. **Bundle Optimization**
- Tree shaking for unused code
- Code splitting for route-based loading
- Dynamic imports for heavy components

## ♿ Accessibility Features

### 1. **Keyboard Navigation**
- Tab order management
- Focus indicators
- Keyboard shortcuts (ESC to close)

### 2. **Screen Reader Support**
- ARIA labels and descriptions
- Semantic HTML structure
- Alt text for images

### 3. **Color Contrast**
- WCAG AA compliance
- High contrast mode support
- Color-blind friendly design

## 🧪 Testing Strategy

### 1. **Unit Tests**
- Component rendering tests
- Event handler tests
- Utility function tests

### 2. **Integration Tests**
- User interaction flows
- API integration tests
- State management tests

### 3. **E2E Tests**
- Complete user journeys
- Cross-browser testing
- Mobile device testing

## 📊 Analytics Integration

### 1. **User Behavior Tracking**
- Product view tracking
- Add to cart events
- Category navigation

### 2. **Performance Monitoring**
- Image load times
- Component render times
- User interaction latency

### 3. **Error Tracking**
- Component error boundaries
- API error logging
- User feedback collection

Bu menü sistemi, modern e-ticaret uygulamaları için gerekli tüm özellikleri içeren, performans odaklı ve kullanıcı dostu bir çözüm sunar. 