# Menu Templates System

## Overview
Complete menu templates management system with theme customization, layout management, template duplication, and comprehensive menu design tools for restaurant operations.

## Key Features

### 1. **Template Management System**
- **Template Creation**: Custom menu template creation
- **Template Duplication**: Easy template copying
- **Template Customization**: Theme and layout customization
- **Template Status**: Active/inactive management
- **Default Templates**: Default template identification

### 2. **Menu Template Interface**
```typescript
interface MenuTemplate {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  theme: string;
  layout: string;
  categoryCount: number;
  productCount: number;
  lastUsed: string;
  createdAt: string;
  updatedAt: string;
}
```

### 3. **Theme Management System**
```typescript
const getThemeIcon = (theme: string) => {
  const icons: Record<string, React.ReactNode> = {
    modern: <Palette className="h-4 w-4" />,
    traditional: <Clock className="h-4 w-4" />,
    luxury: <Star className="h-4 w-4" />,
    minimal: <TrendingUp className="h-4 w-4" />
  };
  return icons[theme] || <Palette className="h-4 w-4" />;
};

const getThemeColor = (theme: string) => {
  const colors: Record<string, string> = {
    modern: "bg-blue-100 text-blue-800",
    traditional: "bg-orange-100 text-orange-800",
    luxury: "bg-purple-100 text-purple-800",
    minimal: "bg-gray-100 text-gray-800"
  };
  return colors[theme] || "bg-gray-100 text-gray-800";
};
```

### 4. **Template Selection Management**
```typescript
const handleSelectionChange = (templateId: number, checked: boolean) => {
  if (checked) {
    onSelectionChange([...selectedItems, templateId]);
  } else {
    onSelectionChange(selectedItems.filter(id => id !== templateId));
  }
};
```

### 5. **Template Status Toggle**
```typescript
const handleToggleActive = async (templateId: number) => {
  try {
    setTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, isActive: !template.isActive } : template
    ));
    
    toast({
      title: "Success",
      description: "Template status updated successfully",
    });
  } catch (error) {
    console.error("Template update error:", error);
    toast({
      title: "Error",
      description: "Failed to update template status",
      variant: "destructive",
    });
  }
};
```

### 6. **Template Duplication System**
```typescript
const handleDuplicate = async (template: MenuTemplate) => {
  try {
    setIsCreating(true);
    // Simulated duplication process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      isDefault: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    
    toast({
      title: "Success",
      description: "Template duplicated successfully",
    });
  } catch (error) {
    console.error("Duplication error:", error);
    toast({
      title: "Error",
      description: "Failed to duplicate template",
      variant: "destructive",
    });
  } finally {
    setIsCreating(false);
  }
};
```

### 7. **Template Deletion System**
```typescript
const handleDelete = async (templateId: number) => {
  try {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
    
    toast({
      title: "Success",
      description: "Template deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    toast({
      title: "Error",
      description: "Failed to delete template",
      variant: "destructive",
    });
  }
};
```

### 8. **Advanced Filtering System**
```typescript
const filteredTemplates = templates.filter(template =>
  template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  template.description.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### 9. **Template Card Display**
```typescript
<Card key={template.id} className="relative">
  <CardHeader className="pb-3">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedItems.includes(template.id)}
          onCheckedChange={(checked) => handleSelectionChange(template.id, checked as boolean)}
        />
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {getThemeIcon(template.theme)}
            {template.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {template.description}
          </CardDescription>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        {template.isDefault && (
          <Star className="h-4 w-4 text-yellow-500" />
        )}
        <Switch
          checked={template.isActive}
          onCheckedChange={() => handleToggleActive(template.id)}
        />
      </div>
    </div>
  </CardHeader>
</Card>
```

### 10. **Template Badges System**
```typescript
<div className="flex flex-wrap gap-2">
  <Badge variant="outline" className="text-xs">
    {template.categoryCount} Categories
  </Badge>
  <Badge variant="outline" className="text-xs">
    {template.productCount} Products
  </Badge>
  <Badge className={`text-xs ${getThemeColor(template.theme)}`}>
    {template.theme}
  </Badge>
  {template.isDefault && (
    <Badge variant="secondary" className="text-xs">
      Default
    </Badge>
  )}
</div>
```

### 11. **Action Buttons Management**
```typescript
<div className="flex items-center space-x-1">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleDuplicate(template)}
    disabled={isCreating}
    className="h-8 w-8 p-0"
  >
    {isCreating ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      <Copy className="h-4 w-4" />
    )}
  </Button>
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleDelete(template.id)}
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
</div>
```

### 12. **Loading State Management**
```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading templates...</span>
    </div>
  );
}
```

### 13. **Empty State Handling**
```typescript
if (filteredTemplates.length === 0) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <Palette className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No templates found
      </h3>
      <p className="text-gray-500 mb-4">
        No templates match your search criteria
      </p>
      <Button onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
}
```

### 14. **View Mode Support**
```typescript
<div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
  {/* Template cards */}
</div>
```

### 15. **Theme Customization**
- **Modern Theme**: Contemporary design elements
- **Traditional Theme**: Classic design elements
- **Luxury Theme**: Premium design elements
- **Minimal Theme**: Clean design elements
- **Custom Themes**: User-defined themes

### 16. **Layout Management**
- **Grid Layout**: Grid-based menu organization
- **List Layout**: List-based menu organization
- **Custom Layouts**: User-defined layouts
- **Responsive Layouts**: Mobile-friendly layouts

### 17. **Category Management**
- **Category Count**: Template category tracking
- **Category Display**: Visual category indicators
- **Category Organization**: Category-based organization
- **Category Analytics**: Category performance analysis

### 18. **Product Management**
- **Product Count**: Template product tracking
- **Product Display**: Visual product indicators
- **Product Organization**: Product-based organization
- **Product Analytics**: Product performance analysis

### 19. **Usage Tracking**
- **Last Used Date**: Template usage tracking
- **Usage Analytics**: Template usage analysis
- **Usage Reports**: Template usage reports
- **Usage Optimization**: Template usage optimization

### 20. **Default Template Management**
- **Default Identification**: Default template marking
- **Default Switching**: Default template changes
- **Default Protection**: Default template protection
- **Default Analytics**: Default template analytics

## Technical Implementation

### Component Structure
```typescript
export function MenuTemplates({ 
  searchQuery, 
  viewMode, 
  selectedItems, 
  onSelectionChange 
}: MenuTemplatesProps) {
  // State management
  // Template management
  // Theme management
  // UI rendering
};
```

### State Management
```typescript
const [templates, setTemplates] = useState<MenuTemplate[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [isCreating, setIsCreating] = useState(false);
const { toast } = useToast();
```

### Data Loading
```typescript
useEffect(() => {
  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTemplates: MenuTemplate[] = [
        {
          id: 1,
          name: "Modern Restaurant",
          description: "Contemporary elegant design",
          isActive: true,
          isDefault: true,
          theme: "modern",
          layout: "grid",
          categoryCount: 8,
          productCount: 45,
          lastUsed: "2025-07-26",
          createdAt: "2025-01-15",
          updatedAt: "2025-07-20"
        }
        // Additional templates...
      ];
      
      setTemplates(mockTemplates);
    } catch (error) {
      console.error("Template loading error:", error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  loadTemplates();
}, [toast]);
```

### Toast Notifications
```typescript
const { toast } = useToast();

// Success notification
toast({
  title: "Success",
  description: "Template updated successfully",
});

// Error notification
toast({
  title: "Error",
  description: "Failed to update template",
  variant: "destructive",
});
```

## Benefits

1. **Template Customization**: Flexible menu design options
2. **Theme Management**: Multiple theme support
3. **Layout Flexibility**: Various layout options
4. **Template Duplication**: Easy template copying
5. **Visual Indicators**: Clear template status visualization
6. **Advanced Filtering**: Comprehensive search capabilities
7. **Default Management**: Default template handling
8. **Usage Tracking**: Template usage monitoring
9. **Category Management**: Category-based organization
10. **Product Management**: Product-based organization
11. **Real-time Updates**: Live template status updates
12. **Responsive Design**: Mobile-friendly interface
13. **Toast Notifications**: User-friendly feedback system
14. **Loading States**: Smooth loading experience 