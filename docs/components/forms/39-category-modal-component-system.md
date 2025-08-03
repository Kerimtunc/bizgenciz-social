# Category Modal Component System

## Overview
Complete category modal component system with form validation, color/icon selection, seasonality management, preview functionality, and comprehensive category creation/editing for restaurant operations.

## Key Features

### 1. **Category Management**
- **Category Creation**: New category creation
- **Category Editing**: Existing category modification
- **Form Validation**: Comprehensive form validation
- **Preview System**: Real-time category preview
- **Modal Interface**: Modal-based interaction

### 2. **Category Interface**
```typescript
interface Category {
  categoryId?: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  seasonality: "summer" | "winter" | "all-year" | "spring" | "autumn";
  discountPercentage?: number;
  productCount: number;
}
```

### 3. **Category Modal Props Interface**
```typescript
interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSave: (category: Omit<Category, "categoryId">) => void;
}
```

### 4. **Color Selection System**
```typescript
const colorOptions = [
  { value: "#ef4444", label: "Red" },
  { value: "#f97316", label: "Orange" },
  { value: "#eab308", label: "Yellow" },
  { value: "#22c55e", label: "Green" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#8b5cf6", label: "Purple" },
  { value: "#ec4899", label: "Pink" },
  { value: "#10B981", label: "Emerald" },
  { value: "#F59E0B", label: "Amber" },
  { value: "#3B82F6", label: "Blue" },
  { value: "#EC4899", label: "Pink" },
  { value: "#8B5CF6", label: "Violet" },
];

// Color selection buttons
<div className="flex flex-wrap gap-2">
  {colorOptions.map((color) => (
    <button
      key={color.value}
      type="button"
      className={`h-8 w-8 rounded-full border-2 ${
        formData.color === color.value ? "border-foreground" : "border-muted"
      }`}
      style={{ backgroundColor: color.value }}
      onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
      title={color.label}
    />
  ))}
</div>
```

### 5. **Icon Selection System**
```typescript
const iconOptions = ["🍽️", "🍲", "🥗", "🍕", "🍔", "🍰", "☕", "🥤", "🍜", "🥘", "🍖", "🍗", "🥩", "🍤", "🍣", "🍱", "🥟", "🍙", "🍚", "🍛"];

// Icon selection buttons
<div className="flex flex-wrap gap-2">
  {iconOptions.map((icon) => (
    <button
      key={icon}
      type="button"
      className={`h-8 w-8 rounded border text-lg ${
        formData.icon === icon ? "border-foreground bg-muted" : "border-muted"
      }`}
      onClick={() => setFormData((prev) => ({ ...prev, icon }))}
    >
      {icon}
    </button>
  ))}
</div>
```

### 6. **Seasonality Management**
```typescript
<Select
  value={formData.seasonality}
  onValueChange={(value: "spring" | "summer" | "autumn" | "winter" | "all-year") =>
    setFormData((prev) => ({ ...prev, seasonality: value }))
  }
>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all-year">🗓️ All Year</SelectItem>
    <SelectItem value="spring">🌸 Spring</SelectItem>
    <SelectItem value="summer">☀️ Summer</SelectItem>
    <SelectItem value="autumn">🍂 Autumn</SelectItem>
    <SelectItem value="winter">❄️ Winter</SelectItem>
  </SelectContent>
</Select>
```

### 7. **Form Validation System**
```typescript
const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.name.trim()) {
    newErrors.name = "Category name is required";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Description is required";
  }

  if (formData.discountPercentage && (formData.discountPercentage < 0 || formData.discountPercentage > 100)) {
    newErrors.discountPercentage = "Discount percentage must be between 0 and 100";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### 8. **Form Submission System**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    onSave(formData);
  }
};
```

### 9. **Form State Management**
```typescript
const [formData, setFormData] = useState<Omit<Category, "categoryId">>({
  name: "",
  description: "",
  color: "#ef4444",
  icon: "🍽️",
  isActive: true,
  seasonality: "all-year",
  productCount: 0,
});

const [errors, setErrors] = useState<Record<string, string>>({});
```

### 10. **Form Reset System**
```typescript
useEffect(() => {
  if (category) {
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive,
      seasonality: category.seasonality,
      discountPercentage: category.discountPercentage,
      productCount: category.productCount,
    });
  } else {
    setFormData({
      name: "",
      description: "",
      color: "#ef4444",
      icon: "🍽️",
      isActive: true,
      seasonality: "all-year",
      productCount: 0,
    });
  }
  setErrors({});
}, [category, isOpen]);
```

### 11. **Preview System**
```typescript
<div className="space-y-2">
  <Label>Preview</Label>
  <div className="flex items-center gap-3 p-3 border rounded-lg">
    <div
      className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
      style={{ backgroundColor: formData.color + "20" }}
    >
      {formData.icon}
    </div>
    <div className="flex-1">
      <h4 className="font-medium">{formData.name || "Category Name"}</h4>
      <p className="text-sm text-muted-foreground">{formData.description || "Category Description"}</p>
    </div>
    <div className="flex gap-1">
      {formData.discountPercentage && <Badge variant="destructive">%{formData.discountPercentage}</Badge>}
      <Badge variant={formData.isActive ? "default" : "secondary"}>
        {formData.isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  </div>
</div>
```

### 12. **Input Fields System**
```typescript
// Name input
<div className="space-y-2">
  <Label htmlFor="category-name-input">Category Name *</Label>
  <Input
    id="category-name-input"
    value={formData.name}
    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
    placeholder="Enter category name"
  />
  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
</div>

// Description input
<div className="space-y-2">
  <Label htmlFor="category-description-input">Description *</Label>
  <Textarea
    id="category-description-input"
    value={formData.description}
    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
    placeholder="Enter category description"
    rows={3}
  />
  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
</div>
```

### 13. **Discount Management**
```typescript
<div className="space-y-2">
  <Label htmlFor="discount-rate-input">Discount Rate (%)</Label>
  <Input
    id="discount-rate-input"
    type="number"
    min="0"
    max="100"
    value={formData.discountPercentage || ""}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        discountPercentage: e.target.value ? Number(e.target.value) : undefined,
      }))
    }
    placeholder="Enter discount rate"
  />
  {errors.discountPercentage && <p className="text-sm text-destructive">{errors.discountPercentage}</p>}
</div>
```

### 14. **Active Status Toggle**
```typescript
<div className="flex items-center justify-between">
  <Label htmlFor="category-active-switch">Active</Label>
  <Switch
    id="category-active-switch"
    checked={formData.isActive}
    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
  />
</div>
```

### 15. **Modal Dialog System**
```typescript
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
      <DialogDescription>Enter category information. Fields marked with * are required.</DialogDescription>
    </DialogHeader>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
    </form>
    
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit">{category ? "Update" : "Add"}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 16. **Error Handling**
- **Validation Errors**: Form validation error display
- **Error Styling**: Error message styling
- **Error Types**: Different error types
- **Error Clearing**: Error clearing on form reset
- **Error Prevention**: Input validation

### 17. **Responsive Design**
- **Mobile Friendly**: Mobile-responsive layout
- **Grid Layout**: Responsive grid system
- **Flexible Sizing**: Adaptive component sizing
- **Scroll Support**: Modal scrolling support
- **Touch Support**: Touch-friendly interactions

### 18. **Accessibility Features**
- **Form Labels**: Proper form labeling
- **ARIA Support**: ARIA attribute support
- **Keyboard Navigation**: Keyboard navigation support
- **Focus Management**: Focus management system
- **Screen Reader**: Screen reader compatibility

### 19. **State Synchronization**
- **Form Reset**: Form state reset
- **Data Loading**: Category data loading
- **State Updates**: Real-time state updates
- **Validation Sync**: Validation state synchronization
- **Preview Sync**: Preview state synchronization

### 20. **Integration Examples**
```typescript
// Usage example
<CategoryModal
  isOpen={isModalOpen}
  onClose={closeModal}
  category={selectedCategory}
  onSave={handleSaveCategory}
/>

// Save handler
const handleSaveCategory = (categoryData: Omit<Category, "categoryId">) => {
  if (selectedCategory) {
    // Update existing category
    updateCategory(selectedCategory.categoryId!, categoryData);
  } else {
    // Create new category
    createCategory(categoryData);
  }
  closeModal();
};
```

## Technical Implementation

### Component Structure
```typescript
export function CategoryModal({ 
  isOpen, 
  onClose, 
  category, 
  onSave 
}: CategoryModalProps) {
  // State management
  // Form validation
  // Event handlers
  // Modal rendering
};
```

### State Management
```typescript
const [formData, setFormData] = useState<Omit<Category, "categoryId">>({
  name: "",
  description: "",
  color: "#ef4444",
  icon: "🍽️",
  isActive: true,
  seasonality: "all-year",
  productCount: 0,
});

const [errors, setErrors] = useState<Record<string, string>>({});
```

### Event Handlers
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    onSave(formData);
  }
};

const validateForm = () => {
  // Validation logic
};
```

### Styling System
```typescript
// Color button styling
className={`h-8 w-8 rounded-full border-2 ${
  formData.color === color.value ? "border-foreground" : "border-muted"
}`}

// Icon button styling
className={`h-8 w-8 rounded border text-lg ${
  formData.icon === icon ? "border-foreground bg-muted" : "border-muted"
}`}

// Preview styling
style={{ backgroundColor: formData.color + "20" }}
```

## Benefits

1. **Complete Form Management**: Comprehensive form handling
2. **Real-time Validation**: Instant form validation
3. **Visual Preview**: Live category preview
4. **Color/Icon Selection**: Visual customization options
5. **Seasonality Support**: Seasonal category management
6. **Discount Management**: Category-level discounts
7. **Modal Interface**: Clean modal interaction
8. **Form Reset**: Automatic form reset
9. **Error Handling**: Comprehensive error management
10. **Responsive Design**: Mobile-friendly interface
11. **Accessibility**: WCAG compliant design
12. **State Management**: Efficient state handling
13. **Validation System**: Robust validation logic
14. **Preview System**: Real-time preview updates
15. **Integration Ready**: Easy component integration 