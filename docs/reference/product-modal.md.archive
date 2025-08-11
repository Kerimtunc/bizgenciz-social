'use client';

import React, { useState, useEffect } from 'react';

/**
 * ProductModal Component - Kurtarılmış UI
 *
 * @description Complete product modal form with all product management features
 * @location Original: menu-management/components/product-modal.tsx
 * @usage Product creation and editing modal
 *
 * @features
 * - Product form management
 * - Image upload functionality
 * - Category selection
 * - Pricing controls
 * - Status management
 * - Validation system
 * - Allergen management
 * - Tag management
 * - Nutritional information
 * - Dietary preferences
 */

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  imageUrl?: string;
  allergens: string[];
  tags: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isActive: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  preparationTime: number;
  calories?: number;
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  orderIndex: number;
  isActive: boolean;
  sortOrder: number;
  seasonality?: string;
  discountPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  product?: Product | null;
  categories: Category[];
}

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories
}: ProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    imageUrl: '',
    allergens: [],
    tags: [],
    stockStatus: 'in_stock',
    isActive: true,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isSpicy: false,
    preparationTime: 15,
    calories: 0,
    nutritionalInfo: {
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    },
    sortOrder: 0
  });

  const [newAllergen, setNewAllergen] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        allergens: Array.isArray(product.allergens) ? product.allergens : [],
        tags: Array.isArray(product.tags) ? product.tags : []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        categoryId: categories.length > 0 ? categories[0].id : 0,
        imageUrl: '',
        allergens: [],
        tags: [],
        stockStatus: 'in_stock',
        isActive: true,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        preparationTime: 15,
        calories: 0,
        nutritionalInfo: {
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0
        },
        sortOrder: 0
      });
    }
  }, [product, categories]);

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNutritionalChange = (field: keyof Product['nutritionalInfo'], value: number) => {
    setFormData(prev => ({
      ...prev,
      nutritionalInfo: {
        ...prev.nutritionalInfo!,
        [field]: value
      }
    }));
  };

  const addAllergen = () => {
    if (newAllergen.trim() && !formData.allergens.includes(newAllergen.trim())) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, newAllergen.trim()]
      }));
      setNewAllergen('');
    }
  };

  const removeAllergen = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter(a => a !== allergen)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Buraya ürün kaydedilirken hata metni gelecek:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {product ? 'Buraya ürün düzenle başlığı gelecek' : 'Buraya yeni ürün ekle başlığı gelecek'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Buraya ürün adı etiketi gelecek *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Buraya ürün adı placeholder gelecek"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Buraya fiyat etiketi gelecek (₺) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                placeholder="Buraya fiyat placeholder gelecek"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Buraya kategori etiketi gelecek *</label>
              <select
                value={formData.categoryId.toString()}
                onChange={(e) => handleInputChange('categoryId', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Buraya kategori seçin placeholder gelecek</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Buraya stok durumu etiketi gelecek</label>
              <select
                value={formData.stockStatus}
                onChange={(e) => handleInputChange('stockStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="in_stock">Buraya stokta metni gelecek</option>
                <option value="low_stock">Buraya az stok metni gelecek</option>
                <option value="out_of_stock">Buraya stok yok metni gelecek</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Buraya açıklama etiketi gelecek</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Buraya ürün açıklaması placeholder gelecek"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Buraya görsel URL etiketi gelecek</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="Buraya görsel URL placeholder gelecek"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Alerjenler */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Buraya alerjenler etiketi gelecek</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAllergen}
                onChange={(e) => setNewAllergen(e.target.value)}
                placeholder="Buraya alerjen ekle placeholder gelecek"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergen())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={addAllergen} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Buraya ekle metni gelecek
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.allergens.map((allergen) => (
                <span key={allergen} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm">
                  {allergen}
                  <button
                    type="button"
                    onClick={() => removeAllergen(allergen)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Etiketler */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Buraya etiketler etiketi gelecek</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Buraya etiket ekle placeholder gelecek"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={addTag} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Buraya ekle metni gelecek
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Özellikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm">Buraya aktif metni gelecek</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isVegetarian"
                checked={formData.isVegetarian}
                onChange={(e) => handleInputChange('isVegetarian', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isVegetarian" className="text-sm">Buraya vejetaryen metni gelecek</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isVegan"
                checked={formData.isVegan}
                onChange={(e) => handleInputChange('isVegan', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isVegan" className="text-sm">Buraya vegan metni gelecek</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isGlutenFree"
                checked={formData.isGlutenFree}
                onChange={(e) => handleInputChange('isGlutenFree', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isGlutenFree" className="text-sm">Buraya glutensiz metni gelecek</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSpicy"
                checked={formData.isSpicy}
                onChange={(e) => handleInputChange('isSpicy', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="isSpicy" className="text-sm">Buraya acılı metni gelecek</label>
            </div>
          </div>

          {/* Hazırlama Süresi ve Kalori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Buraya hazırlama süresi etiketi gelecek (dk)</label>
              <input
                type="number"
                value={formData.preparationTime}
                onChange={(e) => handleInputChange('preparationTime', parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Buraya kalori etiketi gelecek</label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => handleInputChange('calories', parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Besin Değerleri */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">Buraya besin değerleri etiketi gelecek (100g)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Buraya protein etiketi gelecek (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo?.protein}
                  onChange={(e) => handleNutritionalChange('protein', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Buraya karbonhidrat etiketi gelecek (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo?.carbs}
                  onChange={(e) => handleNutritionalChange('carbs', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Buraya yağ etiketi gelecek (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo?.fat}
                  onChange={(e) => handleNutritionalChange('fat', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Buraya lif etiketi gelecek (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.nutritionalInfo?.fiber}
                  onChange={(e) => handleNutritionalChange('fiber', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Buraya iptal metni gelecek
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? 'Buraya kaydediliyor metni gelecek' : (product ? 'Buraya güncelle metni gelecek' : 'Buraya ekle metni gelecek')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 