# Metadata Management System

## Overview
Complete metadata management system with custom field definitions, validation rules, data type management, system metadata, and comprehensive metadata tracking for restaurant operations.

## Key Features

### 1. **Metadata Management**
- **Custom Fields**: User-defined metadata fields
- **System Metadata**: Built-in system metadata
- **Data Types**: Multiple data type support
- **Validation Rules**: Field validation management
- **Metadata Tracking**: Complete metadata history

### 2. **Metadata Interface**
```typescript
interface Metadata {
  id: number;
  name: string;
  type: string;
  value: string;
  description: string;
  isRequired: boolean;
  isActive: boolean;
  isSystem: boolean;
  dataType: string;
  validation: string;
  defaultValue: string;
  createdAt: string;
  updatedAt: string;
}
```

### 3. **Advanced Filtering System**
```typescript
const filteredMetadata = metadata.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.type.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### 4. **Selection Management System**
```typescript
const handleSelectionChange = (itemId: number, checked: boolean) => {
  if (checked) {
    onSelectionChange([...selectedItems, itemId]);
  } else {
    onSelectionChange(selectedItems.filter(id => id !== itemId));
  }
};
```

### 5. **Active Status Toggle System**
```typescript
const handleToggleActive = async (itemId: number) => {
  try {
    // TODO: API call would be made here
    // await fetch(`/api/metadata/${itemId}/toggle`, { method: 'PATCH' });
    
    setMetadata(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, isActive: !item.isActive }
        : item
    ));
    
    toast({
      title: "Success",
      description: "Metadata status updated.",
    });
  } catch (error) {
    console.error('Error updating metadata:', error);
    toast({
      title: "Error",
      description: "Failed to update metadata.",
      variant: "destructive",
    });
  }
};
```

### 6. **Delete Management System**
```typescript
const handleDelete = async (itemId: number) => {
  if (!confirm('Are you sure you want to delete this metadata?')) return;
  
  try {
    // TODO: API call would be made here
    // await fetch(`/api/metadata/${itemId}`, { method: 'DELETE' });
    
    setMetadata(prev => prev.filter(item => item.id !== itemId));
    onSelectionChange(selectedItems.filter(id => id !== itemId));
    
    toast({
      title: "Success",
      description: "Metadata successfully deleted.",
    });
  } catch (error) {
    console.error('Error deleting metadata:', error);
    toast({
      title: "Error",
      description: "Failed to delete metadata.",
      variant: "destructive",
    });
  }
};
```

### 7. **Type Icon Management**
```typescript
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'nutrition': return <Hash className="h-4 w-4" />;
    case 'safety': return <Eye className="h-4 w-4" />;
    case 'service': return <Clock className="h-4 w-4" />;
    case 'custom': return <Tag className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};
```

### 8. **Type Color Management**
```typescript
const getTypeColor = (type: string) => {
  switch (type) {
    case 'nutrition': return 'bg-green-100 text-green-700';
    case 'safety': return 'bg-red-100 text-red-700';
    case 'service': return 'bg-blue-100 text-blue-700';
    case 'custom': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};
```

### 9. **Data Type Color Management**
```typescript
const getDataTypeColor = (dataType: string) => {
  switch (dataType) {
    case 'number': return 'bg-blue-100 text-blue-700';
    case 'text': return 'bg-green-100 text-green-700';
    case 'textarea': return 'bg-orange-100 text-orange-700';
    case 'boolean': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};
```

### 10. **Metadata Card Display**
```typescript
<Card 
  key={item.id} 
  className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
    !item.isActive && 'opacity-60'
  }`}
>
  <div className="absolute top-3 left-3 z-10">
    <Checkbox 
      checked={selectedItems.includes(item.id)}
      onCheckedChange={(checked: boolean) => handleSelectionChange(item.id, checked)}
      className="bg-white/80 backdrop-blur-sm"
    />
  </div>
  
  <div className="absolute top-3 right-3 z-10 flex gap-2">
    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white">
      <Edit className="h-4 w-4" />
    </Button>
  </div>

  <CardHeader className="pb-3">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          {item.isSystem && (
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              System
            </Badge>
          )}
          {item.isRequired && (
            <Badge variant="destructive" className="text-xs">
              Required
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="flex items-center gap-2 flex-wrap">
      <Badge className={getTypeColor(item.type)}>
        {getTypeIcon(item.type)}
        <span className="ml-1 capitalize">{item.type}</span>
      </Badge>
      <Badge className={getDataTypeColor(item.dataType)}>
        <span className="capitalize">{item.dataType}</span>
      </Badge>
      <Badge variant="outline">
        {item.value}
      </Badge>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="text-muted-foreground">Default:</span>
        <p className="font-medium">{item.defaultValue || 'None'}</p>
      </div>
      <div>
        <span className="text-muted-foreground">Validation:</span>
        <p className="font-medium">{item.validation || 'None'}</p>
      </div>
      <div>
        <span className="text-muted-foreground">Status:</span>
        <p className="font-medium">{item.isActive ? 'Active' : 'Inactive'}</p>
      </div>
      <div>
        <span className="text-muted-foreground">Created:</span>
        <p className="font-medium">{item.createdAt}</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2 border-t">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{item.isActive ? "Active" : "Inactive"}</span>
        <Switch 
          checked={item.isActive} 
          onCheckedChange={() => handleToggleActive(item.id)} 
        />
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```

### 11. **Loading State Management**
```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading metadata...</span>
    </div>
  );
}
```

### 12. **Empty State Handling**
```typescript
if (filteredMetadata.length === 0) {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 text-muted-foreground">
          <Settings className="h-16 w-16" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Metadata Found</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {searchQuery ? 'No metadata found matching your search criteria.' : 'No metadata defined yet.'}
        </p>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create First Metadata
        </Button>
      </CardContent>
    </Card>
  );
}
```

### 13. **Header Management**
```typescript
<div className="flex justify-between items-center">
  <div>
    <h2 className="text-2xl font-bold">Metadata Management</h2>
    <p className="text-muted-foreground">
      Define custom fields and metadata for products
    </p>
  </div>
  <Button disabled={isCreating}>
    {isCreating ? (
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    ) : (
      <Plus className="mr-2 h-4 w-4" />
    )}
    New Metadata
  </Button>
</div>
```

### 14. **Metadata Types**
- **Nutrition Metadata**: Nutritional information fields
- **Safety Metadata**: Safety and allergen information
- **Service Metadata**: Service-related information
- **Custom Metadata**: User-defined custom fields
- **System Metadata**: Built-in system fields

### 15. **Data Types**
- **Number**: Numeric data fields
- **Text**: Text data fields
- **Textarea**: Multi-line text fields
- **Boolean**: True/false fields
- **Date**: Date fields

### 16. **Validation Features**
- **Min/Max Values**: Numeric range validation
- **Text Length**: Text length validation
- **Required Fields**: Required field validation
- **Custom Validation**: Custom validation rules
- **Default Values**: Default value management

### 17. **System Features**
- **System Metadata**: Built-in system fields
- **User Metadata**: User-defined fields
- **Required Fields**: Mandatory field management
- **Optional Fields**: Optional field management
- **Field Status**: Active/inactive field management

### 18. **Metadata Tracking**
- **Creation Tracking**: Metadata creation history
- **Update Tracking**: Metadata update history
- **Status Tracking**: Status change tracking
- **Usage Tracking**: Metadata usage tracking
- **Version Tracking**: Metadata version tracking

### 19. **Visual Features**
- **Type Icons**: Visual type indicators
- **Color Coding**: Color-coded metadata types
- **Status Indicators**: Visual status indicators
- **Badge System**: Information badge display
- **Hover Effects**: Interactive hover effects

### 20. **Management Features**
- **Bulk Operations**: Bulk metadata operations
- **Search Functionality**: Metadata search
- **Filter Management**: Metadata filtering
- **Sort Management**: Metadata sorting
- **Export Features**: Metadata export

## Technical Implementation

### Component Structure
```typescript
export function MetaDataManagement({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: MetaDataManagementProps) {
  // State management
  // Filtering logic
  // Data loading
  // CRUD operations
  // UI rendering
};
```

### State Management
```typescript
const [metadata, setMetadata] = useState<Metadata[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [isCreating, setIsCreating] = useState(false);
```

### Data Loading
```typescript
useEffect(() => {
  const loadMetadata = async () => {
    try {
      setIsLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMetadata: Metadata[] = [
        {
          id: 1,
          name: "Calories",
          type: "nutrition",
          value: "kcal",
          description: "Product calorie value",
          isRequired: true,
          isActive: true,
          isSystem: true,
          dataType: "number",
          validation: "min:0,max:2000",
          defaultValue: "0",
          createdAt: "2025-01-15",
          updatedAt: "2025-07-20"
        }
        // Additional metadata...
      ];
      
      setMetadata(mockMetadata);
    } catch (error) {
      console.error('Error loading metadata:', error);
      toast({
        title: "Loading Error",
        description: "Failed to load metadata.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  loadMetadata();
}, [toast]);
```

### Filtering Logic
```typescript
const filteredMetadata = metadata.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.type.toLowerCase().includes(searchQuery.toLowerCase())
);
```

## Benefits

1. **Custom Field Management**: Flexible custom field creation
2. **Data Type Support**: Multiple data type support
3. **Validation Rules**: Comprehensive validation system
4. **System Integration**: Built-in system metadata
5. **Visual Management**: Intuitive visual interface
6. **Status Control**: Active/inactive field management
7. **Type Organization**: Organized metadata types
8. **Validation System**: Robust validation rules
9. **Default Values**: Default value management
10. **Search Functionality**: Advanced search capabilities
11. **Bulk Operations**: Efficient bulk operations
12. **Export Features**: Data export capabilities
13. **Responsive Design**: Mobile-friendly interface
14. **Performance**: Optimized data loading
15. **Integration Ready**: Easy system integration 