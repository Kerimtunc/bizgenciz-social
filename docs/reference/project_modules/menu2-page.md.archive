// ==========================================
// MENU2 SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/menu2/page.tsx
// Satır Sayısı: 162 satır

'use client';

import React, { useState } from 'react';
import CategorySlider2 from '@/components/MenuComponents/CategorySlider2';
import ProductModal from '@/components/MenuComponents/ProductModal';
import FloatingRestaurantMenu from '@/components/ui/floating-restaurant-menu';
import CartModal from '@/components/ui/cart-modal';
import CookieConsent from '@/components/CookieConsent';
import CookieConsentPopup from '@/components/CookieConsentPopup';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { useMenu } from '@/hooks/useMenu';

// Same interfaces as original menu page
import type { Product, Category } from '@/types';

const Menu2PageContent: React.FC = () => {
    // 🔒 HOOK 1: Context hook'ları - HER ZAMAN İLK ÇAĞRILIR
    const { menuData, loading, error } = useMenu();
    const { getTotalItems } = useCart();

    // 🔒 HOOK 2: State hook'ları - HER ZAMAN İKİNCİ ÇAĞRILIR
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    // 🔒 LOADING/ERROR DURUMUNDA ERKEN RETURN (HOOK'LARDAN SONRA!)
    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50/30 to-white">
                <div className="absolute inset-0 flex items-center justify-center z-40">
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 mb-6">
                            <div className="absolute inset-0 border-3 border-amber-200/40 rounded-full animate-ping"></div>
                            <div className="absolute inset-2 border-3 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-4 border-2 border-r-orange-400 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin duration-3000"></div>
                            <div className="absolute inset-6 text-amber-600 flex items-center justify-center text-xl">☕</div>
                        </div>
                        <div className="text-amber-700 font-mono text-sm tracking-wider animate-pulse">
                            Buraya yükleme metni gelecek
                        </div>
                        <div className="text-amber-600 font-mono text-xs mt-2 opacity-75">
                            Buraya alt yükleme metni gelecek
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
                </div>
            </div>
        );
    }

    // 🔒 DATA PREPARATION: Hook'lardan sonra data hazırlama
    const categories = menuData?.categories || [];
    const products = menuData?.items || [];

    // 🔒 EVENT HANDLERS: Event handler fonksiyonları
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    const handleCartClick = () => {
        setShowCartModal(true);
    };

    const handleWaiterCall = () => {
        alert('Buraya garson çağrı mesajı gelecek');
    };

    const handleFeedback = () => {
        alert('Buraya geri bildirim mesajı gelecek');
    };

    const handleExit = () => {
        if (confirm('Buraya çıkış onay mesajı gelecek')) {
            window.close();
        }
    };

    // 🔒 RENDER: Component render
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50/20 via-white to-gray-50">
            <div className="relative z-10">
                {/* Enhanced Header */}
                <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-amber-100/50 shadow-sm">
                    <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold text-amber-800 mb-1">Buraya menü başlığı gelecek</h1>
                            <p className="text-amber-600 text-sm">Buraya menü açıklaması gelecek</p>
                        </div>
                    </div>
                </header>

                {/* Categories */}
                <main className="py-4">
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <CategorySlider2
                                key={category.id}
                                category={category}
                                products={products.filter(p => p.category_id === category.id)}
                                onProductClick={handleProductClick}
                            />
                        ))}
                    </div>
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

// Main Menu2Page wrapped with CartProvider
const Menu2Page: React.FC = () => {
    return (
        <CartProvider>
            <Menu2PageContent />
        </CartProvider>
    );
};

export default Menu2Page;

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// CategorySlider2 component placeholder
function CategorySlider2({ category, products, onProductClick }: any) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
    getTotalItems: () => 0
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