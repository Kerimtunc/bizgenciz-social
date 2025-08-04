# Notification Management System

## Overview
Complete notification management system with multi-channel delivery, user preferences, real-time settings, and comprehensive notification control for restaurant operations.

## Key Features

### 1. **Multi-Type Notification Management**
- **Order Notifications**: Order received, order ready alerts
- **Table Management**: Table requests and availability
- **Reservation System**: Reminder notifications
- **Staff Alerts**: Employee status and availability
- **Inventory Warnings**: Low stock notifications
- **Customer Feedback**: Review and rating alerts

### 2. **Notification Setting Interface**
```typescript
interface NotificationSetting {
  id: number;
  user_id: number;
  notification_type: 'order_received' | 'order_ready' | 'table_request' | 'reservation_reminder' | 'staff_alert' | 'inventory_low' | 'customer_feedback';
  is_enabled: boolean;
  delivery_method: 'app' | 'email' | 'sms' | 'push' | 'sound';
  settings: any; // JSON custom settings
  created_at: string;
  updated_at: string;
  user_name?: string;
}
```

### 3. **Template Management System**
```typescript
interface NotificationTemplate {
  id: string;
  type: string;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  channels: string[];
}
```

### 4. **Multi-Channel Delivery System**
- **App Notifications**: In-panel notifications
- **Push Notifications**: Mobile push alerts
- **Email Notifications**: Email delivery
- **SMS Notifications**: Text message delivery
- **Sound Alerts**: Audio notifications

### 5. **Advanced Filtering System**
- **Search Functionality**: Text-based search
- **Type Filtering**: Filter by notification type
- **Method Filtering**: Filter by delivery method
- **User Filtering**: Filter by specific users
- **Combined Filters**: Multiple filter criteria

### 6. **Real-time Statistics Dashboard**
```typescript
const stats = {
  totalSettings: notificationSettings.length,
  enabledSettings: notificationSettings.filter(s => s.is_enabled).length,
  disabledSettings: notificationSettings.filter(s => !s.is_enabled).length,
  appNotifications: notificationSettings.filter(s => s.delivery_method === 'app').length,
  emailNotifications: notificationSettings.filter(s => s.delivery_method === 'email').length,
  soundNotifications: notificationSettings.filter(s => s.delivery_method === 'sound').length
};
```

### 7. **Notification Type Configuration**
```typescript
const notificationTypes = {
  order_received: {
    icon: <ShoppingCart className="h-4 w-4" />,
    label: 'Order Received',
    description: 'New order notifications',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  order_ready: {
    icon: <ChefHat className="h-4 w-4" />,
    label: 'Order Ready',
    description: 'Order completion alerts',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  table_request: {
    icon: <Table className="h-4 w-4" />,
    label: 'Table Request',
    description: 'Table service requests',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  // ... additional types
};
```

### 8. **Delivery Method Configuration**
```typescript
const deliveryMethods = {
  app: {
    icon: <Bell className="h-4 w-4" />,
    label: 'App',
    description: 'In-panel notifications'
  },
  push: {
    icon: <Smartphone className="h-4 w-4" />,
    label: 'Push',
    description: 'Mobile push notifications'
  },
  email: {
    icon: <Mail className="h-4 w-4" />,
    label: 'Email',
    description: 'Email notifications'
  },
  sms: {
    icon: <MessageSquare className="h-4 w-4" />,
    label: 'SMS',
    description: 'Text message notifications'
  },
  sound: {
    icon: <Volume2 className="h-4 w-4" />,
    label: 'Sound',
    description: 'Audio notifications'
  }
};
```

### 9. **Global Settings Management**
```typescript
const [globalSettings, setGlobalSettings] = useState({
  soundEnabled: true,
  soundVolume: 80,
  quietHours: { start: "22:00", end: "06:00", enabled: true },
  pushEnabled: true,
  emailEnabled: true,
  smsEnabled: false
});
```

### 10. **Sound and Volume Controls**
- **Sound Toggle**: Enable/disable sound notifications
- **Volume Slider**: Adjustable volume levels (0-100%)
- **Quiet Hours**: Time-based notification silencing
- **Custom Sound Settings**: Per-notification sound preferences

### 11. **Quiet Hours Management**
- **Time-based Silencing**: Configure quiet hours
- **Start/End Times**: Customizable quiet period
- **Global Toggle**: Enable/disable quiet hours
- **Override Options**: Emergency notification bypass

### 12. **Channel-specific Settings**
- **Push Notifications**: Mobile app notifications
- **Email Notifications**: Email delivery settings
- **SMS Notifications**: Text message settings
- **App Notifications**: In-panel notification settings

### 13. **User-based Preferences**
- **Individual Settings**: Per-user notification preferences
- **Role-based Defaults**: Default settings by user role
- **Custom Overrides**: User-specific customizations
- **Bulk Management**: Mass settings updates

### 14. **Real-time Settings Updates**
```typescript
const updateNotificationSetting = async (settingId: number, updates: Partial<NotificationSetting>) => {
  // API call to update notification setting
  // Real-time UI updates
  // Validation and error handling
};

const toggleSetting = (settingId: number, isEnabled: boolean) => {
  updateNotificationSetting(settingId, { is_enabled: isEnabled });
};
```

### 15. **Test Notification System**
```typescript
const testNotification = (type: string, method: string) => {
  // Send test notification
  // Validate delivery method
  // User feedback collection
  // Error handling
};
```

### 16. **Visual Status Indicators**
- **Type Badges**: Color-coded notification types
- **Method Icons**: Visual delivery method indicators
- **Status Switches**: Enable/disable toggles
- **Custom Settings Badges**: Special configuration indicators

### 17. **Tab-based Organization**
- **Settings Tab**: Individual notification settings
- **Global Tab**: System-wide configuration
- **Templates Tab**: Notification template management
- **Responsive Tabs**: Mobile-optimized navigation

### 18. **Advanced Search and Filtering**
```typescript
useEffect(() => {
  let filtered = notificationSettings;

  // Search filter
  if (searchTerm) {
    filtered = filtered.filter(setting => 
      setting.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTypeLabel(setting.notification_type).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Type filter
  if (typeFilter !== "all") {
    filtered = filtered.filter(setting => setting.notification_type === typeFilter);
  }

  // Method filter
  if (methodFilter !== "all") {
    filtered = filtered.filter(setting => setting.delivery_method === methodFilter);
  }

  // User filter
  if (userFilter !== "all") {
    filtered = filtered.filter(setting => setting.user_id.toString() === userFilter);
  }

  setFilteredSettings(filtered);
}, [notificationSettings, searchTerm, typeFilter, methodFilter, userFilter]);
```

### 19. **Custom Settings Management**
- **JSON-based Settings**: Flexible configuration storage
- **Custom Parameters**: User-defined notification parameters
- **Settings Display**: Visual custom settings representation
- **Settings Editing**: Inline settings modification

### 20. **Responsive Design**
- **Mobile-First**: Touch-friendly interface
- **Adaptive Layouts**: Screen size optimization
- **Grid System**: Flexible card arrangements
- **Modal Responsiveness**: Mobile-friendly dialogs

## Technical Implementation

### Component Structure
```typescript
export function NotificationModule({
  modules, activeModule, onModuleChange, theme
}: NotificationModuleProps) => {
  // State management
  // Data fetching
  // Filtering logic
  // Settings management
  // Template management
};
```

### State Management
```typescript
const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([]);
const [filteredSettings, setFilteredSettings] = useState<NotificationSetting[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState("");
const [typeFilter, setTypeFilter] = useState<string>("all");
const [methodFilter, setMethodFilter] = useState<string>("all");
const [userFilter, setUserFilter] = useState<string>("all");
const [activeTab, setActiveTab] = useState("settings");
```

### Helper Functions
```typescript
const getTypeLabel = (type: string) => {
  return notificationTypes[type as keyof typeof notificationTypes]?.label || type;
};

const getTypeIcon = (type: string) => {
  return notificationTypes[type as keyof typeof notificationTypes]?.icon || <Bell className="h-4 w-4" />;
};

const getTypeColor = (type: string) => {
  return notificationTypes[type as keyof typeof notificationTypes]?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};
```

## Benefits

1. **Comprehensive Control**: Complete notification management
2. **Multi-channel Delivery**: Multiple notification methods
3. **User Customization**: Individual preference settings
4. **Real-time Updates**: Live settings synchronization
5. **Advanced Filtering**: Powerful search and filter capabilities
6. **Visual Organization**: Clear notification type indicators
7. **Sound Management**: Audio notification controls
8. **Quiet Hours**: Time-based notification silencing
9. **Template System**: Reusable notification templates
10. **Mobile Responsive**: Works across all devices
11. **Performance Optimized**: Efficient data handling
12. **Scalable Architecture**: Handles growing notification needs
13. **User-friendly Interface**: Intuitive notification management
14. **Flexible Configuration**: Customizable notification settings 