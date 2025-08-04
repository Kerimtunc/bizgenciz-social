'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { X, Minus, Plus, Bell, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// cn utility function placeholder
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  is_featured?: boolean;
  order_index?: number;
  is_popular?: boolean;
  tags?: string[];
  original_price?: number;
  stock_status?: 'in_stock' | 'low_stock' | 'out_of_stock';
  prep_time?: string;
  calories?: number;
  is_premium?: boolean;
  premium_label?: string;
  view_count?: number;
  order_count_today?: number;
  last_ordered?: string;
  time_limited_offer?: boolean;
  offer_ends_at?: string;
  social_proof_text?: string;
  has_customizations?: boolean;
  customization_behavior?: 'none' | 'modal_required' | 'direct_add_with_alert' | 'direct_add_silent';
  customization_alert_text?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  order_index?: number;
  is_active?: boolean;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

const formatCalories = (calories?: number | string): string | null => {
  if (!calories || (typeof calories === 'number' && calories <= 0)) return null;
  
  const numCalories = typeof calories === 'string' ? parseInt(calories, 10) : calories;
  if (isNaN(numCalories) || numCalories <= 0) return null;
  
  return `${numCalories} kcal`;
};

const getEnhancedDescription = (product: Product): string => {
  if (product.description && product.description.length > 10) {
    return product.description;
  }
  return 'Lezzetli ve taze malzemelerle hazırlanmış harika bir seçenek.';
};

const getPlaceholderImage = (): string => {
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format&fm=webp&q=85';
};

// ============================================================================
// OPTIMIZED IMAGE COMPONENT
// ============================================================================

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

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

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

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onShowCustomizationAlert?: (product: Product, alertText: string) => void;
  categoryColor?: string;
}

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

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    setIsDragging(false);
    dragStartRef.current = null;
    
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
    
    if (showQuickAdd) {
      setShowQuickAdd(false);
      if (onAddToCart) {
        onAddToCart(product);
      }
    }
  }, [showQuickAdd, onAddToCart, product]);

  const handleClick = useCallback(() => {
    if (!isDragging) {
      onProductClick(product);
    }
  }, [isDragging, onProductClick, product]);

  const hasDiscount = product.original_price && product.original_price > product.price;
  const isOutOfStock = product.stock_status === 'out_of_stock';
  const isLowStock = product.stock_status === 'low_stock';

  return (
    <div
      data-product-id={product.id}
      className={cn(
        "group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 cursor-pointer",
        "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        isPressed && "scale-[0.98] shadow-lg",
        isOutOfStock && "opacity-60 cursor-not-allowed"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
    >
      {/* Premium Badge */}
      {product.is_premium && (
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm">
            {product.premium_label || 'Premium'}
          </span>
        </div>
      )}

      {/* Stock Status */}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
            Stokta Yok
          </span>
        </div>
      )}

      {isLowStock && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
            Son {product.view_count || 5} Adet
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={product.image_url || getPlaceholderImage()}
          alt={product.name}
          className="w-full h-full"
          productName={product.name}
        />
        
        {/* Quick Add Overlay */}
        {showQuickAdd && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <button
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(product);
                setShowQuickAdd(false);
              }}
            >
              Sepete Ekle
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
          {getEnhancedDescription(product)}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            {product.prep_time && (
              <span className="flex items-center">
                ⏱️ {formatPrepTime(product.prep_time)}
              </span>
            )}
            {product.calories && (
              <span className="flex items-center">
                🔥 {formatCalories(product.calories)}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.original_price!)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              "bg-orange-500 text-white hover:bg-orange-600",
              "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
              isOutOfStock && "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock && onAddToCart) {
                onAddToCart(product);
              }
            }}
            disabled={isOutOfStock}
            aria-label={`${product.name} sepete ekle`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Social Proof */}
        {product.social_proof_text && (
          <div className="mt-2 text-xs text-green-600 font-medium">
            {product.social_proof_text}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// CATEGORY SLIDER COMPONENT
// ============================================================================

interface CategorySliderProps {
  category: Category;
  products: Product[];
  onProductClick: (product: Product) => void;
}

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

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = cardWidth + 16; // card width + gap
    const currentScroll = sliderRef.current.scrollLeft;
    
    if (direction === 'left') {
      sliderRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      sliderRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [cardWidth]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftStart(sliderRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeftStart - walk;
  }, [isDragging, startX, scrollLeftStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, [checkArrows]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('scroll', checkArrows);
      return () => sliderRef.current?.removeEventListener('scroll', checkArrows);
    }
  }, [checkArrows]);

  return (
    <div className="relative group">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
          {category.description && (
            <span className="text-sm text-gray-600">{category.description}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{products.length} ürün</span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Sol tarafa kaydır"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Sağ tarafa kaydır"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Products Slider */}
        <div
          ref={sliderRef}
          className={cn(
            "flex space-x-4 overflow-x-auto scrollbar-hide",
            "scroll-smooth",
            isDragging && "cursor-grabbing"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0" style={{ width: cardWidth }}>
              <ProductCard
                product={product}
                onProductClick={onProductClick}
                categoryColor={category.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PRODUCT MODAL COMPONENT
// ============================================================================

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const formattedPrice = useMemo(() => formatPrice(product.price), [product.price]);
  const formattedPrepTime = useMemo(() => formatPrepTime(product.prep_time), [product.prep_time]);
  const formattedCalories = useMemo(() => formatCalories(product.calories), [product.calories]);
  const hasDiscount = useMemo(() => product.original_price && product.original_price > product.price, [product.original_price, product.price]);
  const formattedOriginalPrice = useMemo(
    () => hasDiscount ? formatPrice(product.original_price!) : null,
    [hasDiscount, product.original_price]
  );

  const handleAddToCart = () => {
    // Placeholder for cart functionality
    console.log('Adding to cart:', product, quantity);
    onClose();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2">
            <OptimizedImage
              src={product.image_url || getPlaceholderImage()}
              alt={product.name}
              className="w-full h-64 lg:h-full object-cover"
              productName={product.name}
            />
          </div>

          {/* Details */}
          <div className="lg:w-1/2 p-6 space-y-4">
            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {getEnhancedDescription(product)}
            </p>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {formattedPrepTime && (
                <span className="flex items-center">
                  ⏱️ {formattedPrepTime}
                </span>
              )}
              {formattedCalories && (
                <span className="flex items-center">
                  🔥 {formattedCalories}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">
                    {formattedPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formattedOriginalPrice}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formattedPrice}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Adet:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={quantity >= 99}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Sepete Ekle - {formatPrice(product.price * quantity)}</span>
            </button>

            {/* Social Proof */}
            {product.social_proof_text && (
              <div className="text-sm text-green-600 font-medium text-center">
                {product.social_proof_text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ProductCard,
  CategorySlider,
  ProductModal,
  OptimizedImage,
  formatPrice,
  formatPrepTime,
  formatCalories,
  getEnhancedDescription,
  getPlaceholderImage,
  type Product,
  type Category,
  type ProductCardProps,
  type CategorySliderProps,
  type ProductModalProps
}; 