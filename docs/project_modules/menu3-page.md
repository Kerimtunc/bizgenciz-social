// ==========================================
// MENU3 SAYFASI (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/menu3/page.tsx
// Satır Sayısı: 171 satır

'use client';

import React, { useState } from 'react';
import CategorySlider3 from '@/components/MenuComponents/CategorySlider3';
import ProductModal from '@/components/MenuComponents/ProductModal';
import CookieConsent from '@/components/CookieConsent';
import CookieConsentPopup from '@/components/CookieConsentPopup';
import { useMenu } from '@/hooks/useMenu';

// Same interfaces as original menu page
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

const Menu3Page: React.FC = () => {
    // 🔒 HOOK 1: Context hook'ları - HER ZAMAN İLK ÇAĞRILIR
    const { menuData, loading, error } = useMenu();

    // 🔒 HOOK 2: State hook'ları - HER ZAMAN İKİNCİ ÇAĞRILIR
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    // 🔒 LOADING/ERROR DURUMUNDA ERKEN RETURN (HOOK'LARDAN SONRA!)
    if (loading) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50/30 to-white">
                {/* Subtle Gold Particles Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-15 animate-ping" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
                    <div className="absolute w-1 h-1 bg-yellow-500 rounded-full opacity-20 animate-pulse" style={{ top: '20%', right: '20%', animationDelay: '1s' }}></div>
                    <div className="absolute w-3 h-3 bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full opacity-10 animate-ping" style={{ bottom: '30%', left: '10%', animationDelay: '2s' }}></div>
                    <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-15 animate-pulse" style={{ bottom: '20%', right: '15%', animationDelay: '3s' }}></div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center z-40">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-amber-200/40 rounded-full animate-ping"></div>
                            <div className="absolute inset-1 border-4 border-t-yellow-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin shadow-2xl shadow-yellow-500/20"></div>
                            <div className="absolute inset-3 border-3 border-r-amber-400 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin duration-3000"></div>
                            <div className="absolute inset-6 text-yellow-500 flex items-center justify-center text-2xl drop-shadow-lg crown-glow">👑</div>
                        </div>
                        <div className="text-amber-700 font-serif text-lg tracking-wider animate-pulse font-bold">
                            Buraya yükleme metni gelecek
                        </div>
                        <div className="text-amber-600 font-serif text-sm mt-3 opacity-75 tracking-widest">
                            Buraya alt yükleme metni gelecek
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 to-white">
                <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl border border-amber-200/50 shadow-lg shadow-amber-100">
                    <h2 className="text-2xl font-bold text-amber-700 mb-4 font-serif">Buraya hata başlığı gelecek</h2>
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

    // 🔒 RENDER: Component render
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50/20 via-white to-gray-50">
            {/* Subtle Gold Accent Particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-20 animate-pulse" style={{ top: '5%', left: '10%', animationDelay: '0s' }}></div>
                <div className="absolute w-2 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full opacity-15 animate-ping" style={{ top: '15%', right: '25%', animationDelay: '2s' }}></div>
                <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full opacity-20 animate-pulse" style={{ top: '40%', left: '80%', animationDelay: '4s' }}></div>
                <div className="absolute w-1 h-1 bg-yellow-500 rounded-full opacity-15 animate-pulse" style={{ bottom: '60%', left: '5%', animationDelay: '1s' }}></div>
                <div className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full opacity-18 animate-ping" style={{ bottom: '40%', right: '10%', animationDelay: '3s' }}></div>
                <div className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-20 animate-pulse" style={{ bottom: '20%', left: '20%', animationDelay: '5s' }}></div>
            </div>

            <div className="relative z-10">
                {/* Elegant Header with Gold Accents */}
                <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-amber-200/50 shadow-sm shadow-amber-100/30">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-amber-500 text-2xl animate-pulse crown-glow">👑</span>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent font-serif tracking-wide">
                                    Buraya menü başlığı gelecek
                                </h1>
                                <span className="text-amber-500 text-2xl animate-pulse crown-glow">👑</span>
                            </div>
                            <p className="text-amber-600/80 text-sm font-serif tracking-wider">Buraya menü açıklaması gelecek</p>
                        </div>
                    </div>
                </header>

                {/* Categories */}
                <main className="py-4">
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <CategorySlider3
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

            {/* Cookie Consent Popup */}
            <CookieConsent />
            <CookieConsentPopup />
        </div>
    );
};

export default Menu3Page;

// ==========================================
// PLACEHOLDER UI COMPONENTS
// ==========================================

// CategorySlider3 component placeholder
function CategorySlider3({ category, products, onProductClick }: any) {
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
        <button onClick={onClose} className="bg-amber-600 text-white px-4 py-2 rounded">
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