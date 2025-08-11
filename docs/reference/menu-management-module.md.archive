"use client";

import React, { useState, useEffect } from 'react';
import { Search, List, Grid, Plus, Settings, Archive, History } from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * MenuManagementModule Component - Kurtarılmış UI
 * 
 * @description Complete menu management system with categories, products, and templates
 * @location Original: panel/page.tsx renderMainContent() - case "menu-management" (placeholder)
 * @usage Panel dashboard menu management section
 * 
 * @features
 * - Menu creation and editing
 * - Category management
 * - Product management
 * - Menu publishing
 * - Template management
 * - Ready categories
 * - Metadata management
 * - Upsell/Cross-sell management
 * - Archive management
 * - Changelog management
 */

// Ana MenuManagement Component
const MenuManagementContent: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Placeholder data
  const [products] = useState([
    { 
      productId: 1, 
      name: 'Buraya ürün adı gelecek', 
      description: 'Buraya ürün açıklaması gelecek',
      price: 0, 
      categoryId: 1,
      categoryName: 'Buraya kategori adı gelecek', 
      isActive: true,
      imageUrl: 'Buraya resim URL gelecek',
      isPremium: false,
      isChefRecommendation: true,
      isPopular: true,
      stockStatus: 'in_stock',
      sortOrder: 1
    },
    { 
      productId: 2, 
      name: 'Buraya ürün adı gelecek', 
      description: 'Buraya ürün açıklaması gelecek',
      price: 0, 
      categoryId: 1,
      categoryName: 'Buraya kategori adı gelecek', 
      isActive: true,
      imageUrl: 'Buraya resim URL gelecek',
      isPremium: false,
      isChefRecommendation: false,
      isPopular: true,
      stockStatus: 'in_stock',
      sortOrder: 2
    },
    { 
      productId: 3, 
      name: 'Buraya ürün adı gelecek', 
      description: 'Buraya ürün açıklaması gelecek',
      price: 0, 
      categoryId: 2,
      categoryName: 'Buraya kategori adı gelecek', 
      isActive: true,
      imageUrl: 'Buraya resim URL gelecek',
      isPremium: false,
      isChefRecommendation: true,
      isPopular: false,
      stockStatus: 'in_stock',
      sortOrder: 1
    },
  ]);

  const [categories] = useState([
    { 
      id: 1, 
      categoryId: 1, 
      name: 'Buraya kategori adı gelecek', 
      description: 'Buraya kategori açıklaması gelecek',
      color: '#FF6B6B',
      icon: '🍕',
      seasonality: 'all-year' as const,
      productCount: 2, 
      isActive: true, 
      orderIndex: 1, 
      sortOrder: 1,
      discountPercentage: 0
    },
    { 
      id: 2, 
      categoryId: 2, 
      name: 'Buraya kategori adı gelecek', 
      description: 'Buraya kategori açıklaması gelecek',
      color: '#4ECDC4',
      icon: '🥗',
      seasonality: 'all-year' as const,
      productCount: 1, 
      isActive: true, 
      orderIndex: 2, 
      sortOrder: 2,
      discountPercentage: 0
    },
    { 
      id: 3, 
      categoryId: 3, 
      name: 'Buraya kategori adı gelecek', 
      description: 'Buraya kategori açıklaması gelecek',
      color: '#45B7D1',
      icon: '🥤',
      seasonality: 'all-year' as const,
      productCount: 0, 
      isActive: true, 
      orderIndex: 3, 
      sortOrder: 3,
      discountPercentage: 0
    },
  ]);

  const [templates] = useState([
    { id: 1, name: 'Buraya şablon adı gelecek', description: 'Buraya şablon açıklaması gelecek' },
    { id: 2, name: 'Buraya şablon adı gelecek', description: 'Buraya şablon açıklaması gelecek' },
  ]);

  const [readyCategories] = useState([
    { id: 1, name: 'Buraya hazır kategori adı gelecek', description: 'Buraya hazır kategori açıklaması gelecek' },
    { id: 2, name: 'Buraya hazır kategori adı gelecek', description: 'Buraya hazır kategori açıklaması gelecek' },
  ]);

  // Tab yapısı
  const tabs = [
    { id: 'products', label: 'Buraya ürünler metni gelecek', count: products.length, icon: <Grid className="h-4 w-4" /> },
    { id: 'categories', label: 'Buraya kategoriler metni gelecek', count: categories.length, icon: <List className="h-4 w-4" /> },
    { id: 'templates', label: 'Buraya şablonlar metni gelecek', count: templates.length, icon: <Settings className="h-4 w-4" /> },
    { id: 'ready-categories', label: 'Buraya hazır kategoriler metni gelecek', count: readyCategories.length, icon: <Plus className="h-4 w-4" /> },
    { id: 'metadata', label: 'Buraya meta veriler metni gelecek', icon: <Settings className="h-4 w-4" /> },
    { id: 'upsell', label: 'Buraya cross-sell/up-sell metni gelecek', icon: <Plus className="h-4 w-4" /> },
    { id: 'archive', label: 'Buraya arşiv metni gelecek', icon: <Archive className="h-4 w-4" /> },
    { id: 'changelog', label: 'Buraya değişiklik geçmişi metni gelecek', icon: <History className="h-4 w-4" /> }
  ];

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (categoryData: any) => {
    try {
      // Buraya API çağrısı gelecek
      console.log('Buraya kategori kaydediliyor metni gelecek:', categoryData);
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Buraya kategori kaydedilemedi metni gelecek:', error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (productData: any) => {
    try {
      // Buraya API çağrısı gelecek
      console.log('Buraya ürün kaydediliyor metni gelecek:', productData);
      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Buraya ürün kaydedilemedi metni gelecek:', error);
    }
  };

  const renderActiveTabContent = () => {
    const commonProps = {
      searchQuery,
      viewMode,
      selectedItems,
      onSelectionChange: setSelectedItems,
      onAddCategory: handleAddCategory,
      onEditCategory: handleEditCategory,
      onAddProduct: handleAddProduct,
      onEditProduct: handleEditProduct,
    };

    const categoryProps = {
      ...commonProps,
      categories: categories,
    };

    switch (activeTab) {
      case 'products':
        return <div>Buraya ürün yönetimi bileşeni gelecek</div>;
      case 'categories':
        return <div>Buraya kategori yönetimi bileşeni gelecek</div>;
      case 'templates':
        return <div>Buraya şablon yönetimi bileşeni gelecek</div>;
      case 'ready-categories':
        return <div>Buraya hazır kategoriler bileşeni gelecek</div>;
      case 'metadata':
        return <div>Buraya meta veri yönetimi bileşeni gelecek</div>;
      case 'upsell':
        return <div>Buraya cross-sell/up-sell yönetimi bileşeni gelecek</div>;
      case 'archive':
        return <div>Buraya arşiv yönetimi bileşeni gelecek</div>;
      case 'changelog':
        return <div>Buraya değişiklik geçmişi bileşeni gelecek</div>;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Buraya bilinmeyen sekme başlığı gelecek</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Buraya bilinmeyen sekme açıklaması gelecek</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Buraya menü yönetimi başlığı gelecek</h1>
        <p className="text-muted-foreground">
          Buraya menü yönetimi açıklaması gelecek
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buraya ara placeholder metni gelecek"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== undefined && (
                <Badge variant="secondary" className="ml-1">
                  {tab.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {renderActiveTabContent()}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {isCategoryModalOpen && (
        <div>Buraya kategori modal bileşeni gelecek</div>
      )}

      {isProductModalOpen && (
        <div>Buraya ürün modal bileşeni gelecek</div>
      )}
    </div>
  );
};

// Export the main component
const MenuManagementModule: React.FC = () => {
  return <MenuManagementContent />;
};

export { MenuManagementModule }; 