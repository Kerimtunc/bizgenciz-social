// ==========================================
// MENU MANAGEMENT PANELİ (/) COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/menu-management/page.tsx
// Satır Sayısı: 579 satır

"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search, Settings, MenuIcon, Bell, User, Filter, Grid3X3, List, MoreVertical, Loader2 } from "lucide-react"
import { CategoryManagement } from "@/components/menu-management/category-management"
import { ProductManagement } from "@/components/menu-management/product-management"
import { MenuTemplates } from "@/components/menu-management/menu-templates"
import { ReadyCategories } from "@/components/menu-management/ready-categories"
import { MetaDataManagement } from "@/components/menu-management/metadata-management"
import { BulkOperations } from "@/components/menu-management/bulk-operations"
import { AdvancedFilters } from "@/components/menu-management/advanced-filters"
import { ChangeLogManagement } from "@/components/menu-management/change-log-management"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UpsellCrosssellManagement } from "@/components/menu-management/upsell-crosssell-management"
import { ArchiveManagement } from "@/components/menu-management/archive-management"
import { useBusinessProfile } from "@/hooks/useBusinessProfile"

// ... TabStats interface aynı kalacak ...

export default function MenuManagementPage() {
  // ... state ve useEffect blokları aynı kalacak ...

  if (isLoading && !tabStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Buraya menü yönetimi yükleniyor metni gelecek...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <MenuIcon className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                  Buraya menü yönetimi başlığı gelecek
                </h1>
                <p className="text-sm text-muted-foreground">
                  Buraya restoran adı ve plan bilgisi gelecek
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                Buraya bildirim sayısı gelecek
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Buraya ayarlar metni gelecek
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Buraya profil metni gelecek
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        {/* Enhanced Search & Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-bar"
                placeholder="Buraya arama placeholder metni gelecek (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-orange-50 border-orange-200 text-orange-700" : ""}
              >
                <Filter className="mr-2 h-4 w-4" />
                Buraya filtreler buton metni gelecek
              </Button>

              <div className="flex items-center rounded-lg border bg-white dark:bg-slate-800">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && <AdvancedFilters onFiltersChange={handleFiltersChange} activeTab={activeTab} />}

          {/* Bulk Operations - Improved Layout */}
          {selectedItems.length > 0 && (
            <div className="mb-4">
              <BulkOperations
                selectedCount={selectedItems.length}
                onBulkAction={handleBulkAction}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>

        {/* Enhanced Scrollable Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="inline-flex h-12 items-center justify-start rounded-xl bg-white dark:bg-slate-800 p-1 shadow-sm min-w-full">
                <TabsTrigger value="categories" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya kategoriler tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya kategori sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="products" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya ürünler tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya ürün sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="templates" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya şablonlar tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya şablon sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="ready-categories" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya hazır kategoriler tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya hazır kategori sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="metadata" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya meta veri tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya meta veri sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="upsell-crosssell" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya satış artırma tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya satış artırma sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="archive" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya arşiv tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya arşiv sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="changelog" className="text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span>Buraya değişiklik günlüğü tab başlığı gelecek</span>
                    <Badge variant="secondary" className="text-xs">
                      Buraya değişiklik günlüğü sayısı gelecek
                    </Badge>
                  </div>
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Tab Contents */}
          <TabsContent value="categories" className="mt-6">
            <CategoryManagement
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <ProductManagement
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <MenuTemplates
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="ready-categories" className="mt-6">
            <ReadyCategories
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="metadata" className="mt-6">
            <MetaDataManagement
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="upsell-crosssell" className="mt-6">
            <UpsellCrosssellManagement
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            <ArchiveManagement
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>

          <TabsContent value="changelog" className="mt-6">
            <ChangeLogManagement
              searchQuery={searchQuery}
              viewMode={viewMode}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 