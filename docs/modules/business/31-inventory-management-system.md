# Inventory Management System

## Overview
Complete inventory management system with real-time stock tracking, supplier management, automated reordering, and comprehensive inventory analytics for restaurant operations.

## Key Features

### 1. **Real-time Stock Tracking**
- **Current Stock Levels**: Live stock quantity monitoring
- **Minimum/Maximum Stock**: Stock threshold management
- **Stock Status**: In-stock, low-stock, out-of-stock, expired
- **Stock Percentage**: Visual stock level indicators
- **Stock Movements**: Complete movement history tracking

### 2. **Inventory Item Interface**
```typescript
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  totalValue: number;
  supplier: string;
  lastRestocked: Date;
  expirationDate?: Date;
  location: string;
  status: "in-stock" | "low-stock" | "out-of-stock" | "expired";
  movements: StockMovement[];
  description?: string;
  barcode?: string;
}
```

### 3. **Stock Movement Tracking**
```typescript
interface StockMovement {
  id: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  reason: string;
  date: Date;
  user: string;
  reference?: string;
}
```

### 4. **Supplier Management**
```typescript
interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  activeOrders: number;
  totalOrders: number;
}
```

### 5. **Advanced Filtering System**
```typescript
const filteredInventoryItems = useMemo(() => {
  let filtered = inventoryItems;

  // Search filter
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchLower) ||
      item.sku.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.supplier.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (categoryFilter !== "all") {
    filtered = filtered.filter(item => item.category === categoryFilter);
  }

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter(item => item.status === statusFilter);
  }

  return filtered;
}, [inventoryItems, searchTerm, categoryFilter, statusFilter]);
```

### 6. **Stock Status Management**
```typescript
const getStatusBadge = (status: InventoryItem['status']) => {
  const styles = {
    "in-stock": "bg-green-100 text-green-800 border-green-200",
    "low-stock": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "out-of-stock": "bg-red-100 text-red-800 border-red-200",
    "expired": "bg-gray-100 text-gray-800 border-gray-200"
  };

  const labels = {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock",
    "expired": "Expired"
  };

  return (
    <Badge className={`${styles[status]} border`}>
      {labels[status]}
    </Badge>
  );
};
```

### 7. **Stock Percentage Calculation**
```typescript
const getStockPercentage = (currentStock: number, maxStock: number) => {
  return (currentStock / maxStock) * 100;
};

// Progress bar implementation
<Progress 
  value={getStockPercentage(item.currentStock, item.maxStock)} 
  className="h-2"
/>
```

### 8. **Enhanced Statistics Dashboard**
```typescript
const enhancedStats = useMemo(() => {
  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out-of-stock').length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const averageStock = totalItems > 0 ? inventoryItems.reduce((sum, item) => sum + item.currentStock, 0) / totalItems : 0;

  return {
    totalItems,
    lowStockItems,
    outOfStockItems,
    totalValue,
    averageStock,
    suppliersCount: suppliersData.length
  };
}, [inventoryItems, suppliersData]);
```

### 9. **Low Stock Monitoring**
```typescript
const lowStockItems = useMemo(() => 
  inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock')
    .slice(0, 5), 
  [inventoryItems]
);
```

### 10. **Stock Movement Visualization**
```typescript
{item.movements.slice(0, 2).map((movement) => (
  <div key={movement.id} className="text-xs border-l-2 border-gray-200 pl-2">
    <div className="flex items-center gap-1">
      {movement.type === "in" ? (
        <TrendingUp className="h-3 w-3 text-green-500" />
      ) : movement.type === "out" ? (
        <TrendingDown className="h-3 w-3 text-red-500" />
      ) : (
        <RefreshCw className="h-3 w-3 text-blue-500" />
      )}
      <span className={movement.type === "in" ? "text-green-600" : "text-red-600"}>
        {movement.type === "in" ? "+" : "-"}{movement.quantity} {item.unit}
      </span>
    </div>
    <p className="text-muted-foreground">{movement.reason}</p>
    <p className="text-muted-foreground">{movement.date.toLocaleDateString('tr-TR')}</p>
  </div>
))}
```

### 11. **Tab-based Organization**
- **Inventory Items Tab**: Complete item management
- **Low Stock Tab**: Critical stock monitoring
- **Suppliers Tab**: Supplier management
- **Movements Tab**: Stock movement history

### 12. **Search and Filter Capabilities**
- **Global Search**: Search by name, SKU, category, supplier
- **Category Filtering**: Filter by product categories
- **Status Filtering**: Filter by stock status
- **Real-time Filtering**: Live filter updates

### 13. **Cost Management**
- **Unit Cost Tracking**: Per-unit cost monitoring
- **Total Value Calculation**: Stock value assessment
- **Cost Analysis**: Cost trend analysis
- **Value Reporting**: Inventory value reports

### 14. **Expiration Date Tracking**
- **Expiration Monitoring**: Product expiration tracking
- **Expiration Alerts**: Expiration notifications
- **Expired Item Management**: Expired product handling
- **Shelf Life Optimization**: Shelf life management

### 15. **Location Management**
- **Storage Locations**: Multiple storage location support
- **Location Tracking**: Item location monitoring
- **Location-based Filtering**: Location-based organization
- **Warehouse Management**: Multi-warehouse support

### 16. **Supplier Integration**
- **Supplier Profiles**: Complete supplier information
- **Supplier Ratings**: Performance evaluation
- **Order History**: Supplier order tracking
- **Contact Management**: Supplier communication

### 17. **Automated Reordering**
- **Low Stock Alerts**: Automatic low stock notifications
- **Reorder Points**: Configurable reorder thresholds
- **Purchase Order Generation**: Automatic PO creation
- **Supplier Selection**: Optimal supplier selection

### 18. **Barcode Support**
- **Barcode Scanning**: Barcode-based operations
- **Barcode Generation**: Automatic barcode creation
- **Barcode Lookup**: Quick item identification
- **Mobile Scanning**: Mobile device support

### 19. **Data Import/Export**
- **CSV Import**: Bulk data import
- **CSV Export**: Data export capabilities
- **Data Validation**: Import data validation
- **Error Handling**: Import error management

### 20. **Performance Optimization**
```typescript
// useMemo optimizations for data transformation
const inventoryItems = useMemo(() => inventory.map(item => ({
  id: item.id,
  name: item.name,
  sku: item.sku,
  category: item.category,
  currentStock: item.current_stock,
  minStock: item.min_stock,
  maxStock: item.max_stock,
  unit: item.unit,
  costPerUnit: item.cost_per_unit,
  totalValue: item.total_value,
  supplier: item.supplier_name || 'Unknown',
  lastRestocked: item.last_restocked ? new Date(item.last_restocked) : new Date(),
  expirationDate: item.expiration_date ? new Date(item.expiration_date) : undefined,
  location: item.location,
  status: item.status,
  movements: (item.movements || []).map(movement => ({
    ...movement,
    date: new Date(movement.date)
  })),
  description: item.description,
  barcode: item.barcode
})), [inventory]);
```

## Technical Implementation

### Component Structure
```typescript
export function InventoryModule({
  modules, activeModule, onModuleChange, theme
}: InventoryModuleProps) {
  // State management
  // Data fetching
  // Filtering logic
  // Statistics calculation
  // UI rendering
};
```

### State Management
```typescript
const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("all");
const [statusFilter, setStatusFilter] = useState("all");
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
const [activeTab, setActiveTab] = useState("items");
```

### Hook Integration
```typescript
const { 
  inventory, 
  suppliers, 
  loading: isLoading, 
  error,
  refetch,
  getStockStatus,
  getStockPercentage,
  getStockColor,
  stats
} = useInventory({
  search: searchTerm,
  category: categoryFilter !== "all" ? categoryFilter : undefined,
  status: statusFilter !== "all" ? statusFilter : undefined,
  sort_by: "name"
});
```

### Error Handling
```typescript
if (error) {
  return (
    <div className="flex items-center justify-center h-64 text-red-600">
      <AlertTriangle className="h-8 w-8 mr-2" />
      <span className="text-lg">Error: {error}</span>
      <Button onClick={refetch} className="ml-4">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}
```

### Loading States
```typescript
if (isLoading && inventory.length === 0 && suppliers.length === 0) {
  return (
    <div className="flex items-center justify-center h-64">
      <RefreshCw className="h-8 w-8 animate-spin text-orange-500" />
      <span className="ml-2 text-lg">Loading inventory data...</span>
    </div>
  );
}
```

## Benefits

1. **Real-time Stock Monitoring**: Live inventory tracking
2. **Automated Alerts**: Low stock notifications
3. **Supplier Management**: Complete supplier integration
4. **Cost Control**: Comprehensive cost tracking
5. **Expiration Management**: Product shelf life monitoring
6. **Movement Tracking**: Complete stock movement history
7. **Multi-location Support**: Multiple storage locations
8. **Barcode Integration**: Barcode-based operations
9. **Data Import/Export**: Bulk data management
10. **Performance Optimization**: Efficient data handling
11. **Visual Indicators**: Clear status visualization
12. **Search Functionality**: Quick item discovery
13. **Filtering Capabilities**: Advanced filtering options
14. **Responsive Design**: Mobile-friendly interface 