# Upsell & Cross-sell Management System

## Overview
Complete upsell and cross-sell management system with strategy creation, performance tracking, conversion rate monitoring, and comprehensive revenue optimization for restaurant operations.

## Key Features

### 1. **Strategy Management System**
- **Upsell Strategies**: Higher-value product recommendations
- **Cross-sell Strategies**: Related product suggestions
- **Strategy Types**: Post-purchase, cart, product-view triggers
- **Strategy Status**: Active/inactive management
- **Premium Strategies**: Premium feature identification

### 2. **Upsell/Cross-sell Interface**
```typescript
interface UpsellCrosssell {
  id: number;
  name: string;
  type: 'upsell' | 'crosssell';
  description: string;
  isActive: boolean;
  isPremium: boolean;
  triggerType: string;
  targetProducts: number;
  conversionRate: number;
  revenue: number;
  priority: number;
  conditions: string;
  createdAt: string;
  updatedAt: string;
}
```

### 3. **Strategy Type Management**
```typescript
const getTypeIcon = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    upsell: <TrendingUp className="h-4 w-4" />,
    crosssell: <Link className="h-4 w-4" />
  };
  return icons[type] || <Target className="h-4 w-4" />;
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    upsell: "bg-green-100 text-green-800",
    crosssell: "bg-blue-100 text-blue-800"
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};
```

### 4. **Trigger Type Management**
```typescript
const getTriggerColor = (triggerType: string) => {
  const colors: Record<string, string> = {
    'post-purchase': "bg-purple-100 text-purple-800",
    'cart': "bg-orange-100 text-orange-800",
    'product-view': "bg-pink-100 text-pink-800"
  };
  return colors[triggerType] || "bg-gray-100 text-gray-800";
};
```

### 5. **Performance Metrics Tracking**
```typescript
// Conversion rate and revenue tracking
<div className="grid grid-cols-2 gap-4 text-sm">
  <div className="flex items-center gap-2">
    <Percent className="h-4 w-4 text-green-600" />
    <div>
      <p className="font-medium">{strategy.conversionRate}%</p>
      <p className="text-xs text-gray-500">Conversion Rate</p>
    </div>
  </div>
  <div className="flex items-center gap-2">
    <DollarSign className="h-4 w-4 text-blue-600" />
    <div>
      <p className="font-medium">₺{strategy.revenue}</p>
      <p className="text-xs text-gray-500">Revenue</p>
    </div>
  </div>
</div>
```

### 6. **Strategy Selection Management**
```typescript
const handleSelectionChange = (strategyId: number, checked: boolean) => {
  if (checked) {
    onSelectionChange([...selectedItems, strategyId]);
  } else {
    onSelectionChange(selectedItems.filter(id => id !== strategyId));
  }
};
```

### 7. **Strategy Status Toggle**
```typescript
const handleToggleActive = async (strategyId: number) => {
  try {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId ? { ...strategy, isActive: !strategy.isActive } : strategy
    ));
    
    toast({
      title: "Success",
      description: "Strategy status updated successfully",
    });
  } catch (error) {
    console.error("Strategy update error:", error);
    toast({
      title: "Error",
      description: "Failed to update strategy status",
      variant: "destructive",
    });
  }
};
```

### 8. **Strategy Deletion System**
```typescript
const handleDelete = async (strategyId: number) => {
  try {
    setStrategies(prev => prev.filter(strategy => strategy.id !== strategyId));
    
    toast({
      title: "Success",
      description: "Strategy deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    toast({
      title: "Error",
      description: "Failed to delete strategy",
      variant: "destructive",
    });
  }
};
```

### 9. **Advanced Filtering System**
```typescript
const filteredStrategies = strategies.filter(strategy =>
  strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  strategy.description.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### 10. **Strategy Card Display**
```typescript
<Card key={strategy.id} className="relative">
  <CardHeader className="pb-3">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedItems.includes(strategy.id)}
          onCheckedChange={(checked) => handleSelectionChange(strategy.id, checked as boolean)}
        />
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {getTypeIcon(strategy.type)}
            {strategy.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {strategy.description}
          </CardDescription>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        {strategy.isPremium && (
          <Star className="h-4 w-4 text-yellow-500" />
        )}
        <Switch
          checked={strategy.isActive}
          onCheckedChange={() => handleToggleActive(strategy.id)}
        />
      </div>
    </div>
  </CardHeader>
</Card>
```

### 11. **Strategy Badges System**
```typescript
<div className="flex flex-wrap gap-2">
  <Badge className={`text-xs ${getTypeColor(strategy.type)}`}>
    {strategy.type}
  </Badge>
  <Badge className={`text-xs ${getTriggerColor(strategy.triggerType)}`}>
    {strategy.triggerType}
  </Badge>
  <Badge variant="outline" className="text-xs">
    {strategy.targetProducts} Products
  </Badge>
  {strategy.isPremium && (
    <Badge variant="secondary" className="text-xs">
      Premium
    </Badge>
  )}
</div>
```

### 12. **Strategy Conditions Display**
```typescript
<div className="text-sm">
  <p className="text-gray-500 mb-1">Conditions:</p>
  <p className="text-gray-700">{strategy.conditions}</p>
</div>
```

### 13. **Action Buttons Management**
```typescript
<div className="flex items-center space-x-1">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleDelete(strategy.id)}
    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
  >
    <Trash2 className="h-4 w-4" />
  </Button>
  <Button
    variant="ghost"
    size="sm"
    className="h-8 w-8 p-0"
  >
    <Eye className="h-4 w-4" />
  </Button>
  <Button
    variant="ghost"
    size="sm"
    className="h-8 w-8 p-0"
  >
    <Edit className="h-4 w-4" />
  </Button>
</div>
```

### 14. **Loading State Management**
```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading strategies...</span>
    </div>
  );
}
```

### 15. **Empty State Handling**
```typescript
if (filteredStrategies.length === 0) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <Target className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No strategies found
      </h3>
      <p className="text-gray-500 mb-4">
        No strategies match your search criteria
      </p>
      <Button onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
}
```

### 16. **View Mode Support**
```typescript
<div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
  {/* Strategy cards */}
</div>
```

### 17. **Strategy Priority Management**
- **Priority Levels**: Numeric priority assignment
- **Priority Display**: Visual priority indicators
- **Priority Sorting**: Priority-based ordering
- **Priority Updates**: Dynamic priority changes

### 18. **Revenue Tracking**
- **Revenue Calculation**: Automatic revenue computation
- **Revenue Display**: Visual revenue indicators
- **Revenue Analytics**: Revenue trend analysis
- **Revenue Reports**: Revenue performance reports

### 19. **Conversion Rate Monitoring**
- **Rate Calculation**: Automatic conversion rate computation
- **Rate Display**: Visual conversion rate indicators
- **Rate Analytics**: Conversion rate trend analysis
- **Rate Optimization**: Conversion rate improvement suggestions

### 20. **Target Product Management**
- **Product Selection**: Target product identification
- **Product Count**: Target product quantity tracking
- **Product Display**: Visual product indicators
- **Product Analytics**: Product performance analysis

## Technical Implementation

### Component Structure
```typescript
export function UpsellCrosssellManagement({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: UpsellCrosssellManagementProps) {
  // State management
  // Strategy management
  // Performance tracking
  // UI rendering
};
```

### State Management
```typescript
const [strategies, setStrategies] = useState<UpsellCrosssell[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [isCreating, setIsCreating] = useState(false);
const { toast } = useToast();
```

### Data Loading
```typescript
useEffect(() => {
  const loadStrategies = async () => {
    try {
      setIsLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStrategies: UpsellCrosssell[] = [
        {
          id: 1,
          name: "Dessert Recommendation",
          type: 'upsell',
          description: "Post-main course dessert suggestion",
          isActive: true,
          isPremium: true,
          triggerType: 'post-purchase',
          targetProducts: 5,
          conversionRate: 25.5,
          revenue: 1250,
          priority: 1,
          conditions: 'Main course order condition',
          createdAt: "2025-01-15",
          updatedAt: "2025-07-20"
        }
        // Additional strategies...
      ];
      
      setStrategies(mockStrategies);
    } catch (error) {
      console.error("Strategy loading error:", error);
      toast({
        title: "Error",
        description: "Failed to load strategies",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  loadStrategies();
}, [toast]);
```

### Toast Notifications
```typescript
const { toast } = useToast();

// Success notification
toast({
  title: "Success",
  description: "Strategy updated successfully",
});

// Error notification
toast({
  title: "Error",
  description: "Failed to update strategy",
  variant: "destructive",
});
```

## Benefits

1. **Revenue Optimization**: Strategic product recommendations
2. **Conversion Rate Improvement**: Targeted upsell/cross-sell strategies
3. **Performance Tracking**: Comprehensive metrics monitoring
4. **Strategy Management**: Complete strategy lifecycle management
5. **Visual Indicators**: Clear strategy status visualization
6. **Advanced Filtering**: Comprehensive search and filter capabilities
7. **Priority Management**: Strategic priority assignment
8. **Premium Features**: Premium strategy identification
9. **Trigger Management**: Multiple trigger type support
10. **Condition Management**: Flexible condition configuration
11. **Real-time Updates**: Live strategy status updates
12. **Responsive Design**: Mobile-friendly interface
13. **Toast Notifications**: User-friendly feedback system
14. **Loading States**: Smooth loading experience 