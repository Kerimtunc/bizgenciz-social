// ==========================================
// DASHBOARD OVERVIEW COMPONENT
// ==========================================
// Kurtarılan: 28 Haziran 2025
// Kaynak: frontend/src/app/panel/components/DashboardOverview.tsx
// Satır Sayısı: 368 satır

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  ShoppingCart, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Star,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

interface DashboardMetrics {
  dailySales: number;
  dailyRevenueChangePercent: number;
  dailyRevenueTrend: string;
  completedOrders: number;
  averageOrderValue: number;
  totalTables: number;
  occupiedTables: number;
  tableOccupancy: number;
  totalOrders: number;
  activeOrders: number;
  averageOrderTime: number;
  kitchenEfficiency: number;
  averagePrepTime: number;
  activeChefs: number;
  customerSatisfaction: number;
  calculatedAt: string;
  source: string;
}

const DashboardOverview = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    dailySales: 0,
    dailyRevenueChangePercent: 0,
    dailyRevenueTrend: 'stable',
    completedOrders: 0,
    averageOrderValue: 0,
    totalTables: 0,
    occupiedTables: 0,
    tableOccupancy: 0,
    totalOrders: 0,
    activeOrders: 0,
    averageOrderTime: 0,
    kitchenEfficiency: 0,
    averagePrepTime: 0,
    activeChefs: 0,
    customerSatisfaction: 0,
    calculatedAt: new Date().toISOString(),
    source: 'initial'
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(false);

  // TODO: API entegrasyonu - Dashboard metrics fetch
  const fetchDashboardMetrics = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Gerçek API çağrısı yapılacak
      // const response = await fetch('/api/dashboard/stats');
      // const result = await response.json();
      
      // Placeholder veriler
      setMetrics({
        dailySales: 0, // TODO: Buraya günlük gelir gelecek
        dailyRevenueChangePercent: 0, // TODO: Buraya gelir değişim yüzdesi gelecek
        dailyRevenueTrend: 'stable', // TODO: Buraya gelir trendi gelecek
        completedOrders: 0, // TODO: Buraya tamamlanan sipariş sayısı gelecek
        averageOrderValue: 0, // TODO: Buraya ortalama sipariş değeri gelecek
        totalTables: 0, // TODO: Buraya toplam masa sayısı gelecek
        occupiedTables: 0, // TODO: Buraya dolu masa sayısı gelecek
        tableOccupancy: 0, // TODO: Buraya masa doluluk oranı gelecek
        totalOrders: 0, // TODO: Buraya toplam sipariş sayısı gelecek
        activeOrders: 0, // TODO: Buraya aktif sipariş sayısı gelecek
        averageOrderTime: 0, // TODO: Buraya ortalama sipariş süresi gelecek
        kitchenEfficiency: 0, // TODO: Buraya mutfak verimliliği gelecek
        averagePrepTime: 0, // TODO: Buraya ortalama hazırlama süresi gelecek
        activeChefs: 0, // TODO: Buraya aktif şef sayısı gelecek
        customerSatisfaction: 0, // TODO: Buraya müşteri memnuniyeti gelecek
        calculatedAt: new Date().toISOString(),
        source: 'placeholder'
      });
      
      setLastUpdate(new Date());
      console.log('✅ Dashboard metrics güncellendi');
      
    } catch (error) {
      console.error('Dashboard metrics fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardMetrics();
    
    // TODO: Auto-refresh her 30 saniyede bir
    // const interval = setInterval(fetchDashboardMetrics, 30000);
    // return () => clearInterval(interval);
  }, [fetchDashboardMetrics]);

  const MetricCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    color, 
    trend 
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    color: string;
    trend?: { value: number; isPositive: boolean };
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">
            Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-sm text-gray-500">
            {isConnected ? 'Bağlı' : 'Bağlantı kesildi'}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Toplam Masa"
          value={metrics.totalTables}
          subtitle={`${metrics.occupiedTables} dolu`}
          icon={Users}
          color="bg-blue-500"
          trend={{ value: 12, isPositive: true }}
        />
        
        <MetricCard
          title="Günlük Sipariş"
          value={metrics.totalOrders}
          subtitle={`${metrics.activeOrders} aktif`}
          icon={ShoppingCart}
          color="bg-green-500"
          trend={{ value: 8, isPositive: true }}
        />
        
        <MetricCard
          title="Günlük Gelir"
          value={formatCurrency(metrics.dailySales)}
          subtitle="Bugün"
          icon={DollarSign}
          color="bg-purple-500"
          trend={{
            value: metrics.dailyRevenueChangePercent,
            isPositive: metrics.dailyRevenueChangePercent >= 0
          }}
        />
        
        <MetricCard
          title="Müşteri Memnuniyeti"
          value={metrics.customerSatisfaction}
          subtitle="5 üzerinden"
          icon={Star}
          color="bg-yellow-500"
          trend={{ value: 2, isPositive: true }}
        />
        
        <MetricCard
          title="Mutfak Verimliliği"
          value={`${metrics.kitchenEfficiency}%`}
          subtitle={`${metrics.averagePrepTime} dk ortalama`}
          icon={Activity}
          color="bg-orange-500"
          trend={{ value: 5, isPositive: true }}
        />
        
        <MetricCard
          title="Doluluk Oranı"
          value={`${metrics.tableOccupancy}%`}
          subtitle="Masa kullanımı"
          icon={TrendingUp}
          color="bg-teal-500"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Yeni Sipariş
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Users className="h-5 w-5 mr-2" />
            Masa Aç
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <Clock className="h-5 w-5 mr-2" />
            Rezervasyon
          </button>
          <button className="flex items-center justify-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <Activity className="h-5 w-5 mr-2" />
            Mutfak Durumu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 