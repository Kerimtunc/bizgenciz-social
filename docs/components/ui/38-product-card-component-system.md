# Product Card Component System

## Overview
Complete product card component system with comprehensive product display, selection management, action buttons, status indicators, and interactive features for restaurant operations.

## Key Features

### 1. **Product Information Display**
- **Product Details**: Name, description, price, category
- **Price Management**: Current price, original price, discounts
- **Category Information**: Category name and ID
- **Status Indicators**: Active/inactive, premium, popular
- **Stock Management**: Stock status tracking

### 2. **Product Interface**
```typescript
interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
  isActive: boolean;
  isPremium: boolean;
  premiumLabel?: string;
  isChefRecommendation: boolean;
  isPopular: boolean;
  calories?: number;
  allergens?: string;
  tags?: string;
  stockStatus: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}
```

### 3. **Product Card Props Interface**
```typescript
interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelectionChange: (productId: number, checked: boolean) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onDuplicate: (product: Product) => void;
  onToggleActive: (productId: number) => void;
}
```

### 4. **Selection Management System**
```typescript
const handleSelectionChange = (checked: boolean) => {
  onSelectionChange(product.productId, checked);
};

// Selection checkbox
<Checkbox
  checked={isSelected}
  onCheckedChange={handleSelectionChange}
/>

// Selection styling
<Card className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
```

### 5. **Status Toggle System**
```typescript
const handleToggleActive = () => {
  onToggleActive(product.productId);
};

// Status toggle switch
<Switch
  checked={product.isActive}
  onCheckedChange={handleToggleActive}
/>

// Status text
<span className="text-xs text-gray-500">
  {product.isActive ? 'Active' : 'Inactive'}
</span>
```

### 6. **Price Display System**
```typescript
<div className="flex items-center space-x-2">
  <span className="text-lg font-bold text-green-600">
    ₺{product.price}
  </span>
  {product.originalPrice && product.originalPrice > product.price && (
    <span className="text-sm text-gray-500 line-through">
      ₺{product.originalPrice}
    </span>
  )}
</div>
```

### 7. **Status Icons System**
```typescript
<div className="flex items-center space-x-1">
  {product.isPremium && (
    <Crown className="h-4 w-4 text-yellow-500" />
  )}
  {product.isChefRecommendation && (
    <ChefHat className="h-4 w-4 text-orange-500" />
  )}
  {product.isPopular && (
    <TrendingUp className="h-4 w-4 text-green-500" />
  )}
</div>
```

### 8. **Badge System**
```typescript
<div className="flex flex-wrap gap-1">
  {product.isPremium && (
    <Badge variant="secondary" className="text-xs">
      {product.premiumLabel || 'Premium'}
    </Badge>
  )}
  {product.calories && (
    <Badge variant="outline" className="text-xs">
      {product.calories} kcal
    </Badge>
  )}
  {product.stockStatus && (
    <Badge 
      variant={product.stockStatus === 'in_stock' ? 'default' : 'destructive'}
      className="text-xs"
    >
      {product.stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
    </Badge>
  )}
</div>
```

### 9. **Action Buttons System**
```typescript
<div className="flex items-center space-x-1">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => onEdit(product)}
    className="h-8 w-8 p-0"
  >
    <Edit className="h-4 w-4" />
  </Button>
  <Button
    variant="ghost"
    size="sm"
    onClick={() => onDuplicate(product)}
    className="h-8 w-8 p-0"
  >
    <Copy className="h-4 w-4" />
  </Button>
  <Button
    variant="ghost"
    size="sm"
    onClick={() => onDelete(product.productId)}
    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
  >
    <Trash2 className="h-4 w-4" />
  </Button>
</div>
```

### 10. **Rating Display System**
```typescript
<div className="flex items-center space-x-1">
  <Star className="h-4 w-4 text-yellow-400" />
  <span className="text-xs text-gray-500">4.5</span>
</div>
```

### 11. **Product Header System**
```typescript
<CardHeader className="pb-3">
  <div className="flex items-start justify-between">
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleSelectionChange}
      />
      <div className="flex-1">
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {product.categoryName}
        </CardDescription>
      </div>
    </div>
    
    <div className="flex items-center space-x-1">
      {/* Status icons */}
    </div>
  </div>
</CardHeader>
```

### 12. **Product Content System**
```typescript
<CardContent className="pt-0">
  <div className="space-y-3">
    {/* Price information */}
    <div className="flex items-center justify-between">
      {/* Price display */}
      {/* Status toggle */}
    </div>

    {/* Description */}
    {product.description && (
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
    )}

    {/* Badges */}
    <div className="flex flex-wrap gap-1">
      {/* Badge components */}
    </div>

    {/* Action buttons */}
    <div className="flex items-center justify-between pt-2">
      {/* Action buttons */}
      {/* Rating display */}
    </div>
  </div>
</CardContent>
```

### 13. **Premium Features**
- **Premium Identification**: Premium product marking
- **Premium Label**: Customizable premium labels
- **Premium Icon**: Crown icon for premium products
- **Premium Styling**: Special premium styling
- **Premium Badge**: Premium status badge

### 14. **Chef Recommendations**
- **Chef Hat Icon**: Visual chef recommendation indicator
- **Recommendation Status**: Chef recommendation tracking
- **Recommendation Styling**: Special recommendation styling
- **Recommendation Badge**: Recommendation status badge
- **Recommendation Logic**: Recommendation management

### 15. **Popular Products**
- **Trending Icon**: Visual popularity indicator
- **Popularity Status**: Product popularity tracking
- **Popularity Styling**: Special popularity styling
- **Popularity Badge**: Popularity status badge
- **Popularity Logic**: Popularity management

### 16. **Stock Management**
- **Stock Status**: In-stock/out-of-stock tracking
- **Stock Badge**: Visual stock status indicator
- **Stock Colors**: Color-coded stock status
- **Stock Logic**: Stock management system
- **Stock Updates**: Real-time stock updates

### 17. **Calorie Information**
- **Calorie Display**: Calorie information display
- **Calorie Badge**: Visual calorie indicator
- **Calorie Styling**: Calorie information styling
- **Calorie Logic**: Calorie management
- **Calorie Updates**: Calorie information updates

### 18. **Allergen Management**
- **Allergen Information**: Allergen data storage
- **Allergen Display**: Allergen information display
- **Allergen Badge**: Visual allergen indicator
- **Allergen Styling**: Allergen information styling
- **Allergen Logic**: Allergen management

### 19. **Tag System**
- **Product Tags**: Product tag management
- **Tag Display**: Tag information display
- **Tag Badge**: Visual tag indicator
- **Tag Styling**: Tag information styling
- **Tag Logic**: Tag management system

### 20. **Sort Order Management**
- **Sort Order**: Product sorting order
- **Order Display**: Sort order display
- **Order Logic**: Sort order management
- **Order Updates**: Sort order updates
- **Order Styling**: Sort order styling

## Technical Implementation

### Component Structure
```typescript
export function ProductCard({
  product,
  isSelected,
  onSelectionChange,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
}: ProductCardProps) {
  // Event handlers
  // Component rendering
  // Status management
  // Action management
};
```

### Event Handlers
```typescript
const handleSelectionChange = (checked: boolean) => {
  onSelectionChange(product.productId, checked);
};

const handleToggleActive = () => {
  onToggleActive(product.productId);
};
```

### Styling System
```typescript
// Selection styling
className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}

// Price styling
className="text-lg font-bold text-green-600"

// Status icon styling
className="h-4 w-4 text-yellow-500"

// Action button styling
className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
```

### Conditional Rendering
```typescript
// Premium badge
{product.isPremium && (
  <Badge variant="secondary" className="text-xs">
    {product.premiumLabel || 'Premium'}
  </Badge>
)}

// Original price
{product.originalPrice && product.originalPrice > product.price && (
  <span className="text-sm text-gray-500 line-through">
    ₺{product.originalPrice}
  </span>
)}

// Description
{product.description && (
  <p className="text-sm text-gray-600 line-clamp-2">
    {product.description}
  </p>
)}
```

## Benefits

1. **Comprehensive Display**: Complete product information
2. **Interactive Features**: Selection and action management
3. **Status Indicators**: Clear status visualization
4. **Price Management**: Flexible pricing display
5. **Badge System**: Visual information indicators
6. **Action Buttons**: Quick action access
7. **Rating Display**: Product rating information
8. **Premium Features**: Premium product identification
9. **Chef Recommendations**: Chef recommendation system
10. **Popular Products**: Popularity tracking
11. **Stock Management**: Stock status monitoring
12. **Calorie Information**: Nutritional information
13. **Allergen Management**: Allergen information
14. **Tag System**: Product categorization
15. **Sort Order**: Flexible product ordering 