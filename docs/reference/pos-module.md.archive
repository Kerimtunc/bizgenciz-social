// ==========================================
// POS MODULE COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/POSModule.tsx
// Satır Sayısı: 66 satır

"use client"

import React from "react"

interface POSModuleProps {
  modules: any[]
  activeModule: string
  onModuleChange: (module: string) => void
  theme: "dark" | "light"
  cartItems: any[]
  onAddToCart: (item: any) => void
  onUpdateCartItem: (id: number, quantity: number) => void
  onRemoveFromCart: (id: number) => void
}

export const POSModule = ({
  modules,
  activeModule,
  onModuleChange,
  theme,
  cartItems,
  onAddToCart,
  onUpdateCartItem,
  onRemoveFromCart,
}: POSModuleProps) => {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* ModuleHeader sadece mobilde göster */}
      <div className="lg:hidden">
        <ModuleHeader 
          modules={modules} 
          activeModule={activeModule} 
          onModuleChange={onModuleChange}
          theme={theme}
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop: Yan yana layout */}
        <div className="hidden lg:flex lg:flex-1">
          <MenuSection onAddToCart={onAddToCart} />
          <OrderCart
            items={cartItems}
            onUpdateItem={onUpdateCartItem}
            onRemoveItem={onRemoveFromCart}
          />
        </div>
        
        {/* Mobile: Üst-alt layout */}
        <div className="flex lg:hidden flex-col flex-1">
          <div className="flex-1 overflow-hidden">
            <MenuSection onAddToCart={onAddToCart} />
          </div>
          <div className="h-[250px] border-t">
            <OrderCart
              items={cartItems}
              onUpdateItem={onUpdateCartItem}
              onRemoveItem={onRemoveFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder components for recovery
function MenuSection({ onAddToCart }: any) {
  return (
    <div className="flex-1 p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Menü</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* TODO: Buraya menü öğeleri gelecek */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
            <h3 className="font-medium">Buraya ürün adı gelecek</h3>
            <p className="text-sm text-gray-600">Buraya fiyat gelecek</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderCart({ items, onUpdateItem, onRemoveItem }: any) {
  return (
    <div className="w-80 bg-white border-l p-4">
      <h2 className="text-lg font-semibold mb-4">Sipariş</h2>
      <div className="space-y-2">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>{item.name}</span>
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-semibold">
          <span>Toplam:</span>
          <span>Buraya toplam gelecek</span>
        </div>
      </div>
    </div>
  )
}

function ModuleHeader({ modules, activeModule, onModuleChange, theme }: any) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex space-x-2 overflow-x-auto">
        {modules.map((module: any) => (
          <button
            key={module.id}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeModule === module.id
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => onModuleChange(module.id)}
          >
            {module.label}
          </button>
        ))}
      </div>
    </div>
  )
} 