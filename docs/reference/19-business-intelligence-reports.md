# Business Intelligence & Reports System

## Özet

Bu dosya, QR Menu Elite Edition projesinin gelişmiş iş zekası ve raporlama sistemini detaylandırır. Sistem, gerçek zamanlı analitik dashboard'ları, özel raporlar, tahminsel analitik ve kapsamlı iş zekası özellikleri içerir.

## Önemli Özellikler

### 1. Executive Dashboard
- **Real-time KPIs**: Gerçek zamanlı performans göstergeleri
- **Revenue Tracking**: Gelir takibi
- **Order Analytics**: Sipariş analitikleri
- **Efficiency Metrics**: Verimlilik metrikleri
- **System Alerts**: Sistem uyarıları
- **Quick Insights**: Hızlı içgörüler

```typescript
// Executive Dashboard Interface
interface BusinessIntelligence {
  executive_dashboard: {
    kpis: {
      revenue: number;
      orders: number;
      table_efficiency: number;
      kitchen_efficiency: number;
      avg_order_value: number;
    };
    alerts: Array<{
      type: 'error' | 'warning' | 'info';
      message: string;
      value: string;
    }>;
    quick_insights: string[];
  };
  operational_insights: {
    capacity_utilization: {
      current_occupancy: number;
      optimal_range: string;
      recommendation: string;
    };
    service_efficiency: {
      avg_prep_time: number;
      order_completion_rate: number;
      staff_productivity: number;
    };
  };
  financial_analytics: {
    revenue_analysis: {
      total_revenue: number;
      product_mix: Array<any>;
      growth_opportunities: Array<any>;
    };
    profitability: {
      high_margin_products: Array<any>;
      cost_optimization: Array<any>;
    };
  };
  predictive_reports: {
    demand_forecast: {
      predicted_daily_orders: number;
      peak_hours: Array<any>;
    };
    customer_retention: {
      at_risk_customers: number;
      retention_rate: number;
      recommended_actions: string[];
    };
  };
}

// KPI Cards Component
const ExecutiveDashboard = () => (
  <div className="space-y-6">
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Toplam Gelir</p>
              <p className="text-2xl font-bold">₺{businessIntelligence.executive_dashboard.kpis.revenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Toplam Sipariş</p>
              <p className="text-2xl font-bold">{businessIntelligence.executive_dashboard.kpis.orders}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Masa Verimliliği</p>
              <p className="text-2xl font-bold">{businessIntelligence.executive_dashboard.kpis.table_efficiency}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Mutfak Verimliliği</p>
              <p className="text-2xl font-bold">{businessIntelligence.executive_dashboard.kpis.kitchen_efficiency}%</p>
            </div>
            <Utensils className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm">Ort. Sipariş Değeri</p>
              <p className="text-2xl font-bold">₺{businessIntelligence.executive_dashboard.kpis.avg_order_value}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-teal-200" />
          </div>
        </CardContent>
      </Card>
    </div>

    {/* System Alerts */}
    {businessIntelligence.executive_dashboard.alerts.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Sistem Uyarıları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {businessIntelligence.executive_dashboard.alerts.map((alert, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                alert.type === 'error' ? 'bg-red-50 border border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <AlertTriangle className={`h-4 w-4 ${
                  alert.type === 'error' ? 'text-red-500' :
                  alert.type === 'warning' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">{alert.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )}

    {/* Quick Insights */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Hızlı İçgörüler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businessIntelligence.executive_dashboard.quick_insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
```

### 2. Operational Insights
- **Capacity Utilization**: Kapasite kullanımı
- **Service Efficiency**: Hizmet verimliliği
- **Staff Productivity**: Personel verimliliği
- **Performance Metrics**: Performans metrikleri
- **Optimization Recommendations**: Optimizasyon önerileri

```typescript
// Operational Insights Component
const OperationalInsights = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Capacity Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Kapasite Kullanımı</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Mevcut Doluluk</span>
              <span className="text-sm font-bold">{businessIntelligence.operational_insights.capacity_utilization.current_occupancy}%</span>
            </div>
            <Progress 
              value={businessIntelligence.operational_insights.capacity_utilization.current_occupancy} 
              className="h-2"
            />
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm"><strong>Optimal Aralık:</strong> {businessIntelligence.operational_insights.capacity_utilization.optimal_range}</p>
            <p className="text-sm mt-1"><strong>Öneri:</strong> {businessIntelligence.operational_insights.capacity_utilization.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Service Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle>Hizmet Verimliliği</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Ort. Hazırlama Süresi</span>
              <span className="text-sm font-bold">{businessIntelligence.operational_insights.service_efficiency.avg_prep_time} min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Sipariş Tamamlama Oranı</span>
              <span className="text-sm font-bold">{businessIntelligence.operational_insights.service_efficiency.order_completion_rate}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Personel Verimliliği</span>
              <span className="text-sm font-bold">₺{Math.round(businessIntelligence.operational_insights.service_efficiency.staff_productivity)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
```

### 3. Financial Analytics
- **Revenue Analysis**: Gelir analizi
- **Profitability Tracking**: Karlılık takibi
- **Cost Optimization**: Maliyet optimizasyonu
- **Product Mix Analysis**: Ürün karışımı analizi
- **Growth Opportunities**: Büyüme fırsatları

```typescript
// Financial Analytics Interface
interface FinancialSummary {
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  revenueGrowth: number;
}

// Financial Analytics Component
const FinancialAnalytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gelir Analizi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Toplam Gelir:</span>
              <span className="font-bold">₺{financialSummary.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Brüt Kar:</span>
              <span className="font-bold text-green-600">₺{financialSummary.grossProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Net Kar:</span>
              <span className="font-bold text-blue-600">₺{financialSummary.netProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Kar Marjı:</span>
              <span className="font-bold">{financialSummary.profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Büyüme Analizi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Gelir Büyümesi:</span>
              <span className={`font-bold ${financialSummary.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {financialSummary.revenueGrowth >= 0 ? '+' : ''}{financialSummary.revenueGrowth.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Maliyet Oranı:</span>
              <span className="font-bold">{(financialSummary.totalCosts / financialSummary.totalRevenue * 100).toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Karlılık Analizi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {businessIntelligence.financial_analytics.profitability.high_margin_products.map((product, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">{product.name}</span>
                <span className="text-sm font-bold text-green-600">{product.margin}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
```

### 4. Predictive Analytics
- **Demand Forecasting**: Talep tahmini
- **Customer Retention**: Müşteri tutma
- **Peak Hours Prediction**: Yoğun saat tahmini
- **Risk Assessment**: Risk değerlendirmesi
- **Actionable Insights**: Uygulanabilir içgörüler

```typescript
// Predictive Analytics Component
const PredictiveAnalytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Demand Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Talep Tahmini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {businessIntelligence.predictive_reports.demand_forecast.predicted_daily_orders}
              </p>
              <p className="text-sm text-gray-600">Tahmini Günlük Sipariş</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Yoğun Saatler</h4>
              <div className="space-y-2">
                {businessIntelligence.predictive_reports.demand_forecast.peak_hours.map((hour, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-sm">{hour.time}</span>
                    <span className="text-sm font-bold">{hour.orders} sipariş</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Retention */}
      <Card>
        <CardHeader>
          <CardTitle>Müşteri Tutma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {businessIntelligence.predictive_reports.customer_retention.at_risk_customers}
                </p>
                <p className="text-sm text-gray-600">Risk Altındaki Müşteri</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {businessIntelligence.predictive_reports.customer_retention.retention_rate}%
                </p>
                <p className="text-sm text-gray-600">Tutma Oranı</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Önerilen Aksiyonlar</h4>
              <div className="space-y-2">
                {businessIntelligence.predictive_reports.customer_retention.recommended_actions.map((action, index) => (
                  <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
```

### 5. Sales Performance Reports
- **Revenue Tracking**: Gelir takibi
- **Order Analytics**: Sipariş analitikleri
- **Top Products**: En iyi ürünler
- **Trend Analysis**: Trend analizi
- **Period Comparisons**: Dönem karşılaştırmaları

```typescript
// Sales Data Interface
interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
}

interface TopProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  orders: number;
  trend: "up" | "down" | "stable";
}

// Sales Performance Component
const SalesPerformance = () => {
  const periodTotals = salesData.reduce(
    (acc, day) => ({
      revenue: acc.revenue + day.revenue,
      orders: acc.orders + day.orders,
      customers: acc.customers + day.customers,
      averageOrderValue: (acc.revenue + day.revenue) / (acc.orders + day.orders)
    }),
    { revenue: 0, orders: 0, customers: 0, averageOrderValue: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Gelir</p>
                <p className="text-2xl font-bold">₺{periodTotals.revenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
                <p className="text-2xl font-bold">{periodTotals.orders}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Müşteri</p>
                <p className="text-2xl font-bold">{periodTotals.customers}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ort. Sipariş Değeri</p>
                <p className="text-2xl font-bold">₺{periodTotals.averageOrderValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>En İyi Ürünler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₺{product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{product.orders} sipariş</p>
                </div>
                <div className={`flex items-center gap-1 ${
                  product.trend === 'up' ? 'text-green-600' : 
                  product.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {product.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                  {product.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                  {product.trend === 'stable' && <BarChart3 className="h-4 w-4" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
```

## Teknik Detaylar

### Interface Definitions
```typescript
interface ReportsModuleProps {
  modules: any[];
  activeModule: string;
  onModuleChange: (module: string) => void;
  theme: string;
}

interface ModuleMetrics {
  tables: any;
  orders: any;
  kitchen: any;
  customers: any;
  staff: any;
  menu_inventory: any;
}
```

### State Management
- **Sales Data**: Satış verileri
- **Business Intelligence**: İş zekası verileri
- **Module Metrics**: Modül metrikleri
- **Date Range**: Tarih aralığı
- **Loading State**: Yükleme durumu

### Performance Optimizations
- **Parallel Data Loading**: Paralel veri yükleme
- **Caching Strategy**: Önbellekleme stratejisi
- **Efficient Rendering**: Verimli render sistemi
- **Real-time Updates**: Gerçek zamanlı güncellemeler

## Kullanım Senaryoları

### 1. Executive Management
- Yüksek seviye performans takibi
- Stratejik karar verme
- KPI izleme
- Trend analizi

### 2. Operational Management
- Günlük operasyon takibi
- Verimlilik optimizasyonu
- Kapasite planlama
- Personel yönetimi

### 3. Financial Management
- Gelir analizi
- Maliyet kontrolü
- Karlılık takibi
- Bütçe planlama

### 4. Marketing & Sales
- Satış performansı
- Müşteri analizi
- Ürün performansı
- Kampanya etkinliği

## Entegrasyon Noktaları

### API Endpoints
- `/api/reports/sales`: Satış raporları
- `/api/reports/financial`: Finansal raporlar
- `/api/reports/operational`: Operasyonel raporlar
- `/api/reports/predictive`: Tahminsel raporlar

### External Services
- Data Analytics Platforms
- Business Intelligence Tools
- Export Services (PDF, Excel)
- Notification Systems

### Database Schema
- Sales transactions table
- Customer analytics table
- Operational metrics table
- Predictive models table
- Report configurations table 