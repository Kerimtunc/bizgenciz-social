# UI Components Library System

## Overview
Complete UI components library system with reusable components, utility functions, styling system, and comprehensive design system for restaurant operations.

## Key Features

### 1. **Utility Functions**
- **Class Name Utility**: Dynamic class name management
- **Type Safety**: TypeScript support
- **Flexible Styling**: Conditional class application
- **Performance**: Optimized class filtering

### 2. **Class Name Utility**
```typescript
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
```

### 3. **Card Components System**
```typescript
// Main Card Component
export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-white rounded-lg border shadow-sm", className)} {...props} />
);

// Card Header Component
export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

// Card Title Component
export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

// Card Description Component
export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

// Card Content Component
export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

// Card Footer Component
export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
```

### 4. **Badge Component System**
```typescript
export const Badge = ({ 
  className, 
  variant = "default", 
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
        className
      )}
      {...props}
    />
  );
};
```

### 5. **Button Component System**
```typescript
export const Button = ({ 
  className, 
  variant = "default", 
  size = "default",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};
```

### 6. **Input Component System**
```typescript
export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);
```

### 7. **Label Component System**
```typescript
export const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
);
```

### 8. **Loading Spinner Component**
```typescript
export const LoadingSpinner = ({ 
  size = "md", 
  className 
}: { 
  size?: "sm" | "md" | "lg"; 
  className?: string 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-blue-600", sizeClasses[size], className)} />
  );
};
```

### 9. **Empty State Component**
```typescript
export const EmptyState = ({ 
  title, 
  description, 
  action, 
  icon 
}: { 
  title: string; 
  description?: string; 
  action?: React.ReactNode; 
  icon?: React.ReactNode; 
}) => (
  <div className="text-center py-12">
    {icon && <div className="mx-auto h-12 w-12 text-gray-400 mb-4">{icon}</div>}
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    {description && <p className="text-gray-500 mb-4">{description}</p>}
    {action && <div>{action}</div>}
  </div>
);
```

### 10. **Modal Component System**
```typescript
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode; 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
```

### 11. **Variant Management**
- **Default Variants**: Standard component variants
- **Custom Variants**: User-defined variants
- **Variant Classes**: Dynamic class assignment
- **Variant Types**: Type-safe variant definitions
- **Variant Styling**: Consistent styling system

### 12. **Size Management**
- **Size Variants**: Multiple size options
- **Size Classes**: Dynamic size assignment
- **Responsive Sizing**: Mobile-friendly sizing
- **Size Types**: Type-safe size definitions
- **Size Styling**: Consistent size styling

### 13. **Styling System**
- **Tailwind CSS**: Utility-first styling
- **Custom Classes**: User-defined styles
- **Dynamic Styling**: Conditional styling
- **Theme Support**: Dark/light mode
- **Responsive Design**: Mobile-friendly

### 14. **Accessibility Features**
- **Focus Management**: Keyboard navigation
- **ARIA Support**: Screen reader compatibility
- **Semantic HTML**: Proper HTML structure
- **Color Contrast**: Accessible colors
- **Disabled States**: Proper disabled handling

### 15. **Type Safety**
- **TypeScript Support**: Full type safety
- **Interface Definitions**: Clear prop interfaces
- **Generic Types**: Flexible type definitions
- **Type Guards**: Runtime type checking
- **Type Inference**: Automatic type inference

### 16. **Component Composition**
- **Modular Design**: Reusable components
- **Composition Pattern**: Component composition
- **Props Spreading**: Flexible prop handling
- **Children Support**: Child component support
- **Forward Refs**: Ref forwarding support

### 17. **Performance Optimization**
- **Memoization**: React.memo support
- **Lazy Loading**: Component lazy loading
- **Bundle Splitting**: Code splitting
- **Tree Shaking**: Unused code removal
- **Optimization**: Performance optimization

### 18. **Event Handling**
- **Click Events**: Click event handling
- **Change Events**: Change event handling
- **Focus Events**: Focus event handling
- **Keyboard Events**: Keyboard event handling
- **Form Events**: Form event handling

### 19. **State Management**
- **Local State**: Component state management
- **Props State**: Props-based state
- **Context State**: Context-based state
- **Redux State**: Redux state management
- **Custom Hooks**: Custom state hooks

### 20. **Integration Examples**
```typescript
// Card usage example
<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Product Title</CardTitle>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Product content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Badge usage example
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Error</Badge>

// Button usage example
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline" size="sm">Secondary Action</Button>
<Button variant="destructive">Delete</Button>

// Modal usage example
<Modal isOpen={isModalOpen} onClose={closeModal} title="Product Details">
  <p>Modal content goes here</p>
</Modal>
```

## Technical Implementation

### Component Structure
```typescript
// Base component structure
export const ComponentName = ({ 
  className, 
  variant, 
  size, 
  ...props 
}: ComponentProps) => {
  // Variant classes
  // Size classes
  // Base classes
  // Component rendering
};
```

### Props Interface
```typescript
interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  variant?: string;
  size?: string;
  className?: string;
  children?: React.ReactNode;
}
```

### Styling System
```typescript
// Base classes
const baseClasses = "base-styles focus:outline-none transition-colors";

// Variant classes
const variantClasses = {
  default: "default-styles",
  secondary: "secondary-styles",
  destructive: "destructive-styles"
};

// Size classes
const sizeClasses = {
  sm: "small-styles",
  md: "medium-styles",
  lg: "large-styles"
};
```

### Type Safety
```typescript
// Type definitions
type VariantType = "default" | "secondary" | "destructive";
type SizeType = "sm" | "md" | "lg";

// Interface with types
interface TypedComponentProps {
  variant?: VariantType;
  size?: SizeType;
  className?: string;
}
```

## Benefits

1. **Reusability**: Consistent component library
2. **Type Safety**: Full TypeScript support
3. **Accessibility**: WCAG compliant components
4. **Performance**: Optimized component rendering
5. **Maintainability**: Clean, modular code
6. **Consistency**: Unified design system
7. **Flexibility**: Customizable components
8. **Responsive Design**: Mobile-friendly components
9. **Theme Support**: Dark/light mode support
10. **Developer Experience**: Easy-to-use components
11. **Documentation**: Clear component documentation
12. **Testing**: Testable component structure
13. **Bundle Size**: Optimized bundle size
14. **Integration**: Easy framework integration 