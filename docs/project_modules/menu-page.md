// ==========================================
// MENU SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/menu/page.tsx
// Satır Sayısı: 332 satır

'use client';

import React, { useState, useEffect, useRef } from 'react';
import CategorySlider from '@/components/MenuComponents/CategorySlider';
import ProductModal from '@/components/MenuComponents/ProductModal';
import FloatingRestaurantMenu from '@/components/ui/floating-restaurant-menu';
import CartModal from '@/components/ui/cart-modal';
import CookieConsent from '@/components/CookieConsent';
import CookieConsentPopup from '@/components/CookieConsentPopup';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useTenantContext } from '@/contexts/TenantProvider';
import { useMenu } from '@/hooks/useMenu';
import { errorMonitor, captureError } from '@/lib/error-monitoring';
import type { Product, Category } from '@/types';

class RetroParticle {
    x: number; y: number; size: number; speedX: number; speedY: number; color: string; opacity: number;
    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        const colors = ['rgba(217, 119, 6, ', 'rgba(245, 158, 11, ', 'rgba(251, 191, 36, '];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvasWidth) this.x = 0; if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0; if (this.y < 0) this.y = canvasHeight;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `${this.color}${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

const MenuPageContent: React.FC = () => {
    // 🔒 HOOK 1: Context hook'ları - HER ZAMAN İLK ÇAĞRILIR
    const { menuData, loading, error } = useMenu();
    const { tenantId, tenantName, siteType } = useTenantContext();
    const { getTotalItems, checkout } = useCart();

    // 🔒 HOOK 2: State hook'ları - HER ZAMAN İKİNCİ ÇAĞRILIR
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    
    // 🔒 HOOK 3: Ref hook'ları - HER ZAMAN ÜÇÜNCÜ ÇAĞRILIR
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 🔒 HOOK 4: Effect hook'ları - HER ZAMAN DÖRDÜNCÜ ÇAĞRILIR
    useEffect(() => {
        // Error monitoring için user context'i ayarla
        errorMonitor.setUserContext(undefined, tenantId);
        
        const canvas = canvasRef.current; 
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d'); 
        if (!ctx) return;
        
        const updateCanvasSize = () => { 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
        };
        
        updateCanvasSize();
        const particles: RetroParticle[] = Array.from({ length: 60 }, () => new RetroParticle(canvas.width, canvas.height));
        let animationFrameId: number;
        
        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { 
                p.update(canvas.width, canvas.height); 
                p.draw(ctx); 
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
        window.addEventListener('resize', updateCanvasSize);
        
        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [tenantId]); // tenantId dependency eklendi

    // Error monitoring için error effect'i
      useEffect(() => {
    if (error) {
      captureError({
        message: `Menu loading error: ${error}`,
        level: 'error',
        tags: ['menu', 'loading', 'api'],
        component: 'MenuPageContent',
        action: 'useMenu'
      });

      // Show user-friendly error toast
      if (typeof window !== 'undefined' && (window as any).showErrorToast) {
        (window as any).showErrorToast({
          type: 'network',
          severity: 'high',
          message: error,
          title: 'Buraya hata başlığı gelecek',
          action: 'Buraya hata aksiyonu gelecek'
        });
      }
    }
  }, [error]);

    // 🔒 LOADING/ERROR DURUMUNDA ERKEN RETURN (HOOK'LARDAN SONRA!)
    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fefbf3' }}>
                <div className="absolute inset-0 flex items-center justify-center z-40">
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 mb-6">
                            <div className="absolute inset-0 border-3 border-amber-300/30 rounded-full animate-ping"></div>
                            <div className="absolute inset-2 border-3 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-4 border-2 border-r-orange-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin duration-3000"></div>
                            <div className="absolute inset-6 text-amber-600 flex items-center justify-center text-xl">☕</div>
                        </div>
                        <div className="text-amber-700 font-mono text-sm tracking-wider animate-pulse">
                            Buraya yükleme metni gelecek
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Buraya hata başlığı gelecek</h2>
                    <p className="text-amber-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Buraya yenile buton metni gelecek
                    </button>
                </div>
            </div>
        );
    }

    // 🔒 DATA PREPARATION: Hook'lardan sonra data hazırlama
    const categories = menuData?.categories || [];
    const products = menuData?.items || [];

    // 🔒 EVENT HANDLERS: Event handler fonksiyonları
    const handleProductClick = (product: Product) => {
        try {
        setSelectedProduct(product);
        setShowModal(true);
            
            // Error monitoring için product click event'i
            captureError({
                message: `Product clicked: ${product.name}`,
                level: 'info',
                tags: ['menu', 'product', 'click'],
                component: 'MenuPageContent',
                action: 'handleProductClick'
            });
        } catch (error) {
            captureError({
                message: `Product click error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                level: 'error',
                tags: ['menu', 'product', 'click', 'error'],
                component: 'MenuPageContent',
                action: 'handleProductClick'
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const handleCartClick = () => {
        setShowCartModal(true);
    };

    const handleWaiterCall = () => {
        try {
        alert('Buraya garson çağrı mesajı gelecek');
            
            captureError({
                message: 'Waiter called',
                level: 'info',
                tags: ['menu', 'waiter', 'call'],
                component: 'MenuPageContent',
                action: 'handleWaiterCall'
            });
        } catch (error) {
            captureError({
                message: `Waiter call error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                level: 'error',
                tags: ['menu', 'waiter', 'call', 'error'],
                component: 'MenuPageContent',
                action: 'handleWaiterCall'
            });
        }
    };

    const handleFeedback = () => {
        try {
        alert('Buraya geri bildirim mesajı gelecek');
            
            captureError({
                message: 'Feedback submitted',
                level: 'info',
                tags: ['menu', 'feedback', 'submit'],
                component: 'MenuPageContent',
                action: 'handleFeedback'
            });
        } catch (error) {
            captureError({
                message: `Feedback error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                level: 'error',
                tags: ['menu', 'feedback', 'submit', 'error'],
                component: 'MenuPageContent',
                action: 'handleFeedback'
            });
        }
    };

    const handleExit = () => {
        try {
        if (confirm('Buraya çıkış onay mesajı gelecek')) {
            window.close();
            }
            
            captureError({
                message: 'Menu exit attempted',
                level: 'info',
                tags: ['menu', 'exit'],
                component: 'MenuPageContent',
                action: 'handleExit'
            });
        } catch (error) {
            captureError({
                message: `Exit error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                level: 'error',
                tags: ['menu', 'exit', 'error'],
                component: 'MenuPageContent',
                action: 'handleExit'
            });
        }
    };

    // 🔒 RENDER: Component render
    return (
        <div className="min-h-screen relative overflow-hidden bg-amber-50/30">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" />
            <div className="relative z-10">
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-amber-100/50 shadow-sm px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto py-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-3xl font-bold text-amber-800 mb-2">
                                Buraya menü başlığı gelecek
                            </h1>
                            <p className="text-amber-600">Buraya menü açıklaması gelecek</p>
                            {siteType === 'tenant' && (
                                <p className="text-xs text-amber-500 mt-1">
                                    Buraya tenant bilgisi gelecek
                                </p>
                            )}
                        </div>
                    </div>
                </header>

                <main className="py-8">
                    {categories.map((category) => (
                        <CategorySlider
                            key={category.id}
                            category={category}
                            products={products.filter(p => p.category_id === category.id)}
                            onProductClick={handleProductClick}
                        />
                    ))}
                </main>
            </div>

            {showModal && selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={closeModal}
                />
            )}

            {/* Floating Restaurant Menu */}
            <FloatingRestaurantMenu
                cartItemCount={getTotalItems()}
                onCartClick={handleCartClick}
                onWaiterCall={handleWaiterCall}
                onFeedback={handleFeedback}
                onExit={handleExit}
                restaurantName="Buraya restoran adı gelecek"
            />

            {/* Cookie Consent Popup */}
            <CookieConsent />
            <CookieConsentPopup />

            {/* Cart Modal */}
            <CartModal
                isOpen={showCartModal}
                onClose={() => setShowCartModal(false)}
            />
        </div>
    );
};

// Main MenuPage wrapped with CartProvider
const MenuPage: React.FC = () => {
    return (
        <CartProvider>
            <MenuPageContent />
        </CartProvider>
    );
};

export default MenuPage;

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// CategorySlider component placeholder
function CategorySlider({ category, products, onProductClick }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} onClick={() => onProductClick(product)} className="cursor-pointer">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ProductModal component placeholder
function ProductModal({ product, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="mb-4">{product.description}</p>
        <p className="text-lg font-bold mb-4">{product.price}</p>
        <button onClick={onClose} className="bg-orange-600 text-white px-4 py-2 rounded">
          Kapat
        </button>
      </div>
    </div>
  )
}

// FloatingRestaurantMenu component placeholder
function FloatingRestaurantMenu({ cartItemCount, onCartClick, onWaiterCall, onFeedback, onExit, restaurantName }: any) {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col gap-2">
          <button onClick={onCartClick} className="bg-orange-600 text-white px-4 py-2 rounded">
            Sepet ({cartItemCount})
          </button>
          <button onClick={onWaiterCall} className="bg-blue-600 text-white px-4 py-2 rounded">
            Garson Çağır
          </button>
          <button onClick={onFeedback} className="bg-green-600 text-white px-4 py-2 rounded">
            Geri Bildirim
          </button>
          <button onClick={onExit} className="bg-red-600 text-white px-4 py-2 rounded">
            Çıkış
          </button>
        </div>
      </div>
    </div>
  )
}

// CartModal component placeholder
function CartModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Sepet</h2>
        <p>Sepet içeriği burada görünecek</p>
        <button onClick={onClose} className="bg-orange-600 text-white px-4 py-2 rounded mt-4">
          Kapat
        </button>
      </div>
    </div>
  )
}

// CookieConsent component placeholder
function CookieConsent() {
  return <div className="sr-only">Cookie consent</div>
}

// CookieConsentPopup component placeholder
function CookieConsentPopup() {
  return <div className="sr-only">Cookie consent popup</div>
}

// CartProvider component placeholder
function CartProvider({ children }: any) {
  return <div>{children}</div>
}

// useCart hook placeholder
function useCart() {
  return {
    getTotalItems: () => 0,
    checkout: () => {}
  }
}

// useTenantContext hook placeholder
function useTenantContext() {
  return {
    tenantId: 'placeholder',
    tenantName: 'Buraya tenant adı gelecek',
    siteType: 'tenant'
  }
}

// useMenu hook placeholder
function useMenu() {
  return {
    menuData: {
      categories: [],
      items: []
    },
    loading: false,
    error: null
  }
}

// errorMonitor placeholder
const errorMonitor = {
  setUserContext: (user: any, tenantId: string) => {}
}

// captureError function placeholder
function captureError(error: any) {
  console.log('Error captured:', error)
} 