# Comprehensive UI Library - Kapsamlı UI Kütüphanesi

## 🎯 Genel Bakış

Bu dosya, modern React uygulamaları için kapsamlı bir UI bileşen kütüphanesini içerir. Shadcn/ui benzeri bir tasarım sistemi ile geliştirilmiş, TypeScript ile tip güvenliği sağlanmış ve erişilebilirlik standartlarına uygun bileşenler sunar.

## 🚀 Temel Özellikler

### 1. **Button Component System**
- **Variant System**: 6 farklı buton varyantı
- **Size System**: 4 farklı boyut seçeneği
- **Accessibility**: ARIA etiketleri ve klavye navigasyonu
- **Type Safety**: TypeScript ile tam tip güvenliği

```typescript
const buttonVariants = {
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseClasses = buttonVariants.base;
    const variantClasses = buttonVariants.variants.variant[variant];
    const sizeClasses = buttonVariants.variants.size[size];
    
    return (
      <button
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### 2. **Card Component System**
- **Modular Design**: Header, Content, Footer ayrı bileşenler
- **Flexible Layout**: İçerik düzenleme esnekliği
- **Consistent Styling**: Tutarlı tasarım dili
- **Semantic HTML**: Anlamlı HTML yapısı

```typescript
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
```

### 3. **Dialog Component System**
- **Portal System**: Modal overlay yönetimi
- **Keyboard Support**: ESC tuşu ile kapatma
- **Focus Management**: Otomatik odak yönetimi
- **Animation Support**: Giriş/çıkış animasyonları

```typescript
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  </DialogPortal>
));
```

### 4. **Select Component System**
- **Custom Trigger**: Özelleştirilebilir tetikleyici
- **Keyboard Navigation**: Ok tuşları ile navigasyon
- **Search Support**: Arama özelliği
- **Multi-select**: Çoklu seçim desteği

```typescript
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    <div className="p-1">{children}</div>
  </div>
));
```

### 5. **Alert Component System**
- **Variant Support**: Farklı uyarı türleri
- **Icon Integration**: Durum ikonları
- **Action Support**: Aksiyon butonları
- **Dismissible**: Kapatılabilir uyarılar

```typescript
const alertVariants = {
  base: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
};

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof alertVariants.variants.variant }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants.base, alertVariants.variants.variant[variant], className)}
    {...props}
  />
));
```

### 6. **Tabs Component System**
- **Keyboard Navigation**: Tab tuşu ile navigasyon
- **Accessibility**: ARIA etiketleri
- **Animated Transitions**: Yumuşak geçişler
- **Responsive Design**: Mobil uyumlu tasarım

```typescript
export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
```

## 🎨 Advanced UI Components

### 1. **Badge Component**
```typescript
export const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'destructive' | 'outline' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
```

### 2. **Avatar Component System**
```typescript
export const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
```

### 3. **Progress Component**
```typescript
export const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
```

### 4. **Switch Component**
```typescript
export const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean }
>(({ className, checked = false, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    data-state={checked ? 'checked' : 'unchecked'}
    {...props}
  >
    <span className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </button>
));
```

### 5. **Skeleton Component**
```typescript
export const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
));
```

## 🛠️ Utility Functions

### 1. **Class Name Utility**
```typescript
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

### 2. **Variant System**
```typescript
const createVariant = <T extends Record<string, string>>(variants: T) => {
  return {
    base: "base-classes",
    variants,
    defaultVariants: {} as Partial<Record<keyof T, keyof T[keyof T]>>
  };
};
```

## 📱 Responsive Design

### 1. **Breakpoint System**
- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

### 2. **Mobile-First Approach**
```typescript
// Mobile-first responsive classes
className="w-full sm:w-auto md:w-1/2 lg:w-1/3"
```

## ♿ Accessibility Features

### 1. **ARIA Support**
- **Labels**: Aria-label ve aria-labelledby
- **Describedby**: Aria-describedby
- **Live Regions**: Aria-live
- **States**: Aria-expanded, aria-selected

### 2. **Keyboard Navigation**
- **Tab Order**: Logical tab sequence
- **Arrow Keys**: Directional navigation
- **Enter/Space**: Activation keys
- **Escape**: Dismiss/cancel actions

### 3. **Focus Management**
- **Focus Indicators**: Visible focus rings
- **Focus Trapping**: Modal focus containment
- **Focus Restoration**: Return focus on close

## 🎨 Design System

### 1. **Color System**
```typescript
const colors = {
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  secondary: "hsl(var(--secondary))",
  secondaryForeground: "hsl(var(--secondary-foreground))",
  destructive: "hsl(var(--destructive))",
  destructiveForeground: "hsl(var(--destructive-foreground))",
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))",
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
};
```

### 2. **Typography Scale**
```typescript
const typography = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};
```

### 3. **Spacing Scale**
```typescript
const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
};
```

## 🔧 Performance Optimizations

### 1. **Component Memoization**
```typescript
export const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});
```

### 2. **Event Handler Optimization**
```typescript
const handleClick = useCallback((event: React.MouseEvent) => {
  // Handler logic
}, [dependencies]);
```

### 3. **Lazy Loading**
```typescript
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
```

## 🧪 Testing Strategy

### 1. **Component Testing**
```typescript
describe('Button Component', () => {
  it('renders with correct variant', () => {
    render(<Button variant="destructive">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### 2. **Accessibility Testing**
```typescript
it('has proper ARIA attributes', () => {
  render(<Button aria-label="Submit form">Submit</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Submit form');
});
```

### 3. **Integration Testing**
```typescript
it('handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 📦 Bundle Optimization

### 1. **Tree Shaking**
```typescript
// Named exports for better tree shaking
export { Button } from './Button';
export { Card } from './Card';
export { Dialog } from './Dialog';
```

### 2. **Code Splitting**
```typescript
// Dynamic imports for heavy components
const HeavyDialog = React.lazy(() => import('./HeavyDialog'));
```

### 3. **Bundle Analysis**
```bash
npm run build:analyze
```

Bu UI kütüphanesi, modern React uygulamaları için gerekli tüm temel bileşenleri içeren, performans odaklı ve erişilebilir bir çözüm sunar. 