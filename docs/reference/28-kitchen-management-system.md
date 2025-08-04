# Kitchen Management System

## Overview
Complete kitchen management system with real-time order tracking, chef assignment, prep time management, priority handling, and comprehensive kitchen statistics for restaurant operations.

## Key Features

### 1. **Real-time Order Tracking**
- **Order Status Monitoring**: Track order progress in real-time
- **Prep Time Management**: Monitor preparation times
- **Priority Handling**: Manage urgent and high-priority orders
- **Status Updates**: Live status synchronization
- **Auto-refresh**: Automatic data updates every 30 seconds

### 2. **Kitchen Order Interface**
```typescript
interface KitchenOrder {
  id: number;
  order_id: number;
  order_number: string;
  table_number: string;
  item_name: string;
  quantity: number;
  special_instructions?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
  chef_id?: number;
  chef_name?: string;
  prep_time_minutes?: number;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}
```

### 3. **Chef Management System**
```typescript
interface Chef {
  id: number;
  name: string;
  status: 'active' | 'break' | 'offline';
  current_orders: number;
  avg_prep_time: number;
}
```

### 4. **Kitchen Statistics Dashboard**
```typescript
interface KitchenStats {
  pending_orders: number;
  preparing_orders: number;
  ready_orders: number;
  avg_prep_time: number;
  total_chefs: number;
  active_chefs: number;
}
```

### 5. **Advanced Status Management**
- **Pending**: Orders waiting to be assigned
- **Preparing**: Orders currently being prepared
- **Ready**: Orders completed and ready for service
- **Served**: Orders delivered to customers
- **Cancelled**: Orders that were cancelled

### 6. **Priority Management System**
- **Urgent Priority**: Critical orders requiring immediate attention
- **High Priority**: Important orders with quick turnaround
- **Medium Priority**: Standard orders
- **Low Priority**: Non-urgent orders

### 7. **Chef Assignment System**
```typescript
const assignChef = async (orderId: number, chefId: number) => {
  // API call to assign chef to order
  // Update order status to preparing
  // Record assignment timestamp
  // Notify chef of new assignment
};
```

### 8. **Real-time Statistics Calculation**
```typescript
const calculateStats = () => {
  const pending = orders.filter(o => o.status === 'pending').length;
  const preparing = orders.filter(o => o.status === 'preparing').length;
  const ready = orders.filter(o => o.status === 'ready').length;
  const activeChefs = chefs.filter(c => c.status === 'active').length;
  
  const completedOrders = orders.filter(o => o.completed_at && o.started_at);
  const avgPrepTime = completedOrders.length > 0 
    ? completedOrders.reduce((acc, order) => {
        const start = new Date(order.started_at!).getTime();
        const end = new Date(order.completed_at!).getTime();
        return acc + (end - start) / (1000 * 60); // minutes
      }, 0) / completedOrders.length
    : 0;

  setStats({
    pending_orders: pending,
    preparing_orders: preparing,
    ready_orders: ready,
    avg_prep_time: Math.round(avgPrepTime),
    total_chefs: chefs.length,
    active_chefs: activeChefs
  });
};
```

### 9. **Visual Status Indicators**
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    case 'preparing': return 'text-blue-600 bg-blue-100';
    case 'ready': return 'text-green-600 bg-green-100';
    case 'served': return 'text-gray-600 bg-gray-100';
    case 'cancelled': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};
```

### 10. **Priority Color Coding**
```typescript
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-100';
    case 'high': return 'text-orange-600 bg-orange-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};
```

### 11. **Time Tracking System**
```typescript
const getTimeSince = (createdAt: string) => {
  const now = new Date().getTime();
  const created = new Date(createdAt).getTime();
  const diff = Math.floor((now - created) / (1000 * 60)); // minutes
  
  if (diff < 60) return `${diff}dk`;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}s ${minutes}dk`;
};
```

### 12. **Advanced Filtering System**
- **Status Filtering**: Filter by order status
- **Priority Filtering**: Filter by priority level
- **Combined Filters**: Multiple filter criteria
- **Real-time Filtering**: Live filter updates

### 13. **Statistics Dashboard**
- **Pending Orders**: Orders waiting for assignment
- **Preparing Orders**: Orders currently being prepared
- **Ready Orders**: Orders ready for service
- **Average Prep Time**: Mean preparation time
- **Active Chefs**: Currently working chefs
- **Urgent Orders**: Critical orders requiring attention

### 14. **Chef Status Monitoring**
- **Active Status**: Chefs currently working
- **Break Status**: Chefs on break
- **Offline Status**: Chefs not available
- **Current Orders**: Orders assigned to each chef
- **Average Prep Time**: Per-chef performance metrics

### 15. **Order Status Updates**
```typescript
const updateOrderStatus = async (orderId: number, status: string, chefId?: number) => {
  // API call to update order status
  // Record status change timestamp
  // Update prep time calculations
  // Notify relevant staff
  // Update kitchen display
};
```

### 16. **Special Instructions Handling**
- **Dietary Restrictions**: Special dietary requirements
- **Cooking Preferences**: Custom cooking instructions
- **Allergy Alerts**: Food allergy notifications
- **Presentation Notes**: Special presentation requests

### 17. **Auto-refresh System**
```typescript
// Auto-refresh every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    fetchOrders();
  }, 30000);
  return () => clearInterval(interval);
}, []);
```

### 18. **Performance Metrics**
- **Prep Time Tracking**: Monitor preparation efficiency
- **Chef Productivity**: Track chef performance
- **Order Turnaround**: Measure order completion times
- **Kitchen Efficiency**: Overall kitchen performance

### 19. **Real-time Notifications**
- **New Order Alerts**: Notify kitchen of new orders
- **Priority Order Alerts**: Highlight urgent orders
- **Status Change Notifications**: Alert staff of status updates
- **Chef Assignment Notifications**: Notify chefs of new assignments

### 20. **Responsive Design**
- **Mobile-First**: Touch-friendly interface
- **Kitchen Display**: Optimized for kitchen screens
- **Real-time Updates**: Live data synchronization
- **Visual Hierarchy**: Clear order prioritization

## Technical Implementation

### Component Structure
```typescript
const KitchenModule: React.FC = () => {
  // State management
  // Data fetching
  // Statistics calculation
  // Real-time updates
  // Chef assignment
  // Status management
};
```

### State Management
```typescript
const [orders, setOrders] = useState<KitchenOrder[]>([]);
const [chefs, setChefs] = useState<Chef[]>([]);
const [stats, setStats] = useState<KitchenStats>({
  pending_orders: 0,
  preparing_orders: 0,
  ready_orders: 0,
  avg_prep_time: 0,
  total_chefs: 0,
  active_chefs: 0
});
const [selectedStatus, setSelectedStatus] = useState<string>('all');
const [selectedPriority, setSelectedPriority] = useState<string>('all');
const [loading, setLoading] = useState(false);
```

### Data Fetching Pattern
```typescript
useEffect(() => {
  fetchOrders();
  fetchChefs();
}, []);

useEffect(() => {
  calculateStats();
}, [orders, chefs]);
```

### Filtering Logic
```typescript
const filteredOrders = orders.filter(order => {
  const statusMatch = selectedStatus === 'all' || order.status === selectedStatus;
  const priorityMatch = selectedPriority === 'all' || order.priority === selectedPriority;
  return statusMatch && priorityMatch;
});
```

### API Functions
```typescript
const fetchOrders = async () => {
  // API call to fetch kitchen orders
  // Update state with order data
  // Handle loading states
};

const fetchChefs = async () => {
  // API call to fetch chef data
  // Update state with chef information
  // Handle loading states
};

const updateOrderStatus = async (orderId: number, status: string, chefId?: number) => {
  // API call to update order status
  // Validate status transitions
  // Update local state
  // Handle success/error states
};

const assignChef = async (orderId: number, chefId: number) => {
  // API call to assign chef to order
  // Update order assignment
  // Notify chef
  // Handle success/error states
};
```

## Benefits

1. **Real-time Order Tracking**: Live order monitoring
2. **Efficient Chef Assignment**: Optimal chef allocation
3. **Priority Management**: Critical order handling
4. **Performance Monitoring**: Kitchen efficiency tracking
5. **Time Management**: Prep time optimization
6. **Status Synchronization**: Live status updates
7. **Visual Organization**: Clear order prioritization
8. **Mobile Responsive**: Works across all devices
9. **Auto-refresh**: Automatic data updates
10. **Statistics Dashboard**: Data-driven insights
11. **Chef Management**: Staff performance tracking
12. **Special Instructions**: Custom order handling
13. **Performance Metrics**: Efficiency monitoring
14. **Real-time Notifications**: Instant alerts 