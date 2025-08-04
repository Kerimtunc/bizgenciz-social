// ==========================================
// ACCOUNTING MODULE - REPORTS & ANALYTICS
// ==========================================
// Kurtarılan: ReportsTab, AnalyticsTab ve ilgili bileşenler
// Kaynak: frontend/src/components/AdminComponents/accounting-module.tsx
// Satır: 170-220 (ReportsTab, AnalyticsTab)
// Satır: 1461-1507 (Report bileşenleri)

import React from 'react'

// ==========================================
// REPORTS TAB COMPONENT
// ==========================================
function ReportsTab() {
  return (
    <div className="space-y-6">
      <ReportGenerator />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProfitLossReport />
        <BalanceSheetReport />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ExpensesByCategory />
        <MonthlyTrends />
        <CustomerPaymentAnalysis />
      </div>
    </div>
  )
}

// ==========================================
// ANALYTICS TAB COMPONENT
// ==========================================
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <KPIDashboard />
      <BusinessMetrics />
      <PredictiveAnalytics />
    </div>
  )
}

// ==========================================
// REPORT GENERATOR COMPONENT
// ==========================================
function ReportGenerator() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="flex items-center text-gray-900 text-lg font-semibold">
          <FileTextIcon className="h-5 w-5 mr-2 text-orange-600" />
          Rapor Oluşturucu
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Rapor Tipi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profit-loss">Kar-Zarar</SelectItem>
              <SelectItem value="balance-sheet">Bilanço</SelectItem>
              <SelectItem value="cash-flow">Nakit Akışı</SelectItem>
              <SelectItem value="expense-analysis">Gider Analizi</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Dönem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Aylık</SelectItem>
              <SelectItem value="quarterly">Üç Aylık</SelectItem>
              <SelectItem value="yearly">Yıllık</SelectItem>
              <SelectItem value="custom">Özel Dönem</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-orange-600 hover:bg-orange-700">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Oluştur
          </Button>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// PROFIT LOSS REPORT COMPONENT
// ==========================================
function ProfitLossReport() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="flex items-center text-gray-900 text-lg font-semibold">
          <TrendingUpIcon className="h-5 w-5 mr-2 text-orange-600" />
          Kar-Zarar Raporu
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Toplam Gelir:</span>
            <span className="font-bold text-green-600">₺Buraya toplam gelir gelecek</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Toplam Gider:</span>
            <span className="font-bold text-red-600">₺Buraya toplam gider gelecek</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-gray-900">Net Kar:</span>
            <span className="font-bold text-blue-600">₺Buraya net kar gelecek</span>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Kar Marjı:</span>
              <span className="text-sm font-semibold text-blue-700">Buraya kar marjı gelecek</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// BALANCE SHEET REPORT COMPONENT
// ==========================================
function BalanceSheetReport() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="flex items-center text-gray-900 text-lg font-semibold">
          <BarChart3Icon className="h-5 w-5 mr-2 text-orange-600" />
          Bilanço
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {/* Varlıklar */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Varlıklar</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Nakit ve Banka</span>
                <span className="font-medium">₺Buraya nakit tutarı gelecek</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alacaklar</span>
                <span className="font-medium">₺Buraya alacak tutarı gelecek</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stok</span>
                <span className="font-medium">₺Buraya stok değeri gelecek</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold">
                <span>Toplam Varlıklar</span>
                <span>₺Buraya toplam varlık gelecek</span>
              </div>
            </div>
          </div>
          
          {/* Yükümlülükler */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Yükümlülükler</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Borçlar</span>
                <span className="font-medium">₺Buraya borç tutarı gelecek</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vergi Borçları</span>
                <span className="font-medium">₺Buraya vergi borcu gelecek</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-semibold">
                <span>Toplam Yükümlülükler</span>
                <span>₺Buraya toplam yükümlülük gelecek</span>
              </div>
            </div>
          </div>
          
          {/* Özsermaye */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Özsermaye</h4>
            <div className="flex justify-between font-semibold text-blue-600">
              <span>Net Özsermaye</span>
              <span>₺Buraya özsermaye gelecek</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// EXPENSES BY CATEGORY COMPONENT
// ==========================================
function ExpensesByCategory() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">Kategoriye Göre Giderler</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Malzeme</span>
            </div>
            <div className="text-right">
              <div className="font-medium">₺Buraya malzeme gideri gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Personel</span>
            </div>
            <div className="text-right">
              <div className="font-medium">₺Buraya personel gideri gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Kira</span>
            </div>
            <div className="text-right">
              <div className="font-medium">₺Buraya kira gideri gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Diğer</span>
            </div>
            <div className="text-right">
              <div className="font-medium">₺Buraya diğer giderler gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Toplam Gider</span>
            <span className="text-lg font-bold text-gray-900">₺Buraya toplam gider gelecek</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// MONTHLY TRENDS COMPONENT
// ==========================================
function MonthlyTrends() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">Aylık Trendler</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Ocak</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-sm font-medium">₺Buraya ocak geliri gelecek</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Şubat</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium">₺Buraya şubat geliri gelecek</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Mart</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm font-medium">₺Buraya mart geliri gelecek</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Nisan</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <span className="text-sm font-medium">₺Buraya nisan geliri gelecek</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Ortalama Aylık Büyüme</span>
            <span className="text-sm font-semibold text-blue-700">Buraya büyüme oranı gelecek</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// CUSTOMER PAYMENT ANALYSIS COMPONENT
// ==========================================
function CustomerPaymentAnalysis() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">Müşteri Ödeme Analizi</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Nakit Ödemeler</span>
            <div className="text-right">
              <div className="font-medium">₺Buraya nakit ödeme gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Kredi Kartı</span>
            <div className="text-right">
              <div className="font-medium">₺Buraya kredi kartı ödeme gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Online Ödemeler</span>
            <div className="text-right">
              <div className="font-medium">₺Buraya online ödeme gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Havale/EFT</span>
            <div className="text-right">
              <div className="font-medium">₺Buraya havale ödeme gelecek</div>
              <div className="text-xs text-gray-500">Buraya yüzde gelecek</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">Ortalama Ödeme Süresi</span>
            <span className="text-sm font-semibold text-green-700">Buraya ödeme süresi gelecek</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// KPI DASHBOARD COMPONENT
// ==========================================
function KPIDashboard() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">KPI Dashboard</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">₺Buraya günlük ciro gelecek</div>
            <div className="text-sm text-blue-700">Günlük Ciro</div>
            <div className="text-xs text-blue-600 mt-1">Buraya değişim oranı gelecek</div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">Buraya sipariş sayısı gelecek</div>
            <div className="text-sm text-green-700">Günlük Sipariş</div>
            <div className="text-xs text-green-600 mt-1">Buraya değişim oranı gelecek</div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">₺Buraya ortalama sipariş gelecek</div>
            <div className="text-sm text-purple-700">Ortalama Sipariş</div>
            <div className="text-xs text-purple-600 mt-1">Buraya değişim oranı gelecek</div>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">Buraya müşteri sayısı gelecek</div>
            <div className="text-sm text-orange-700">Günlük Müşteri</div>
            <div className="text-xs text-orange-600 mt-1">Buraya değişim oranı gelecek</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// BUSINESS METRICS COMPONENT
// ==========================================
function BusinessMetrics() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">İş Metrikleri</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Müşteri Memnuniyeti</h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium">Buraya puan gelecek/5</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Personel Verimliliği</h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm font-medium">Buraya verimlilik gelecek%</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Stok Döngü Hızı</h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <span className="text-sm font-medium">Buraya döngü hızı gelecek</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Masa Doluluk Oranı</h4>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <span className="text-sm font-medium">Buraya doluluk oranı gelecek%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// PREDICTIVE ANALYTICS COMPONENT
// ==========================================
function PredictiveAnalytics() {
  return (
    <div className="bg-white border border-orange-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">Tahmine Dayalı Analitik</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Gelecek Hafta Tahmini</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Beklenen Gelir:</span>
                <span className="text-sm font-medium text-blue-900">₺Buraya tahmini gelir gelecek</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Beklenen Sipariş:</span>
                <span className="text-sm font-medium text-blue-900">Buraya tahmini sipariş gelecek</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Yoğun Saatler</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">En Yoğun Saat:</span>
                <span className="text-sm font-medium text-green-900">Buraya yoğun saat gelecek</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Beklenen Müşteri:</span>
                <span className="text-sm font-medium text-green-900">Buraya müşteri sayısı gelecek</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">Stok Uyarıları</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-orange-700">Düşük Stok:</span>
                <span className="text-sm font-medium text-orange-900">Buraya ürün sayısı gelecek ürün</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-orange-700">Tedarik Önerisi:</span>
                <span className="text-sm font-medium text-orange-900">Buraya tedarik miktarı gelecek</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// UI COMPONENT PLACEHOLDERS
// ==========================================

// Button Component
function Button({ children, className = "", ...props }: any) {
  return (
    <button 
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Select Components
function Select({ children }: any) {
  return <div className="relative">{children}</div>
}

function SelectTrigger({ children }: any) {
  return (
    <button className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-orange-500">
      {children}
    </button>
  )
}

function SelectValue({ placeholder }: any) {
  return <span className="text-gray-500">{placeholder}</span>
}

function SelectContent({ children }: any) {
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
      {children}
    </div>
  )
}

function SelectItem({ children, value }: any) {
  return (
    <button className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none">
      {children}
    </button>
  )
}

// Icon Components
function FileTextIcon({ className = "" }: any) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function DownloadIcon({ className = "" }: any) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function TrendingUpIcon({ className = "" }: any) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}

function BarChart3Icon({ className = "" }: any) {
  return (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

// ==========================================
// EXPORT COMPONENTS
// ==========================================
export {
  ReportsTab,
  AnalyticsTab,
  ReportGenerator,
  ProfitLossReport,
  BalanceSheetReport,
  ExpensesByCategory,
  MonthlyTrends,
  CustomerPaymentAnalysis,
  KPIDashboard,
  BusinessMetrics,
  PredictiveAnalytics
} 