# System Settings Management

## Overview
Complete system settings management with UI constants, user role management, activity logs, system backup functionality, and comprehensive configuration control for restaurant operations.

## Key Features

### 1. **UI Constants Management**
- **Branding Settings**: Logo, company name, taglines
- **Color Management**: Theme colors, accent colors, custom palettes
- **Layout Configuration**: Page layouts, component arrangements
- **Text Customization**: Labels, messages, translations
- **Feature Toggles**: Enable/disable system features

### 2. **UI Constants Interface**
```typescript
interface UIConstant {
  value: string;
  display_name: string;
  data_type: 'string' | 'number' | 'boolean' | 'color' | 'url';
  is_editable: boolean;
  requires_permission: string;
}

interface UIConstants {
  branding: { [key: string]: UIConstant };
  colors: { [key: string]: UIConstant };
  layout: { [key: string]: UIConstant };
  text: { [key: string]: UIConstant };
  features: { [key: string]: UIConstant };
}
```

### 3. **User Role Management**
```typescript
interface UserRole {
  id: number;
  role_name: string;
  role_level: number;
  permissions: string;
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
  can_admin: boolean;
  is_active: boolean;
}
```

### 4. **Activity Log Monitoring**
```typescript
interface ActivityLog {
  id: number;
  user_name: string;
  action: string;
  resource_type: string;
  resource_id: number;
  old_values: string;
  new_values: string;
  created_at: string;
}
```

### 5. **System Backup Management**
```typescript
interface SystemBackup {
  id: number;
  backup_type: string;
  backup_path: string;
  backup_size: number;
  backup_status: string;
  restore_point_id: string;
  created_at: string;
}
```

### 6. **Advanced Data Type Support**
- **String Values**: Text-based settings
- **Number Values**: Numeric configurations
- **Boolean Toggles**: True/false settings
- **Color Picker**: Visual color selection
- **URL Input**: Web address configurations

### 7. **Permission-based Editing**
- **Editable Settings**: User-modifiable configurations
- **Read-only Settings**: Protected system values
- **Permission Requirements**: Role-based access control
- **Lock Indicators**: Visual permission indicators

### 8. **Real-time Settings Updates**
```typescript
const updateUIConstant = async (category: string, key: string, value: string) => {
  setSaving(true);
  try {
    // API call to update UI constant
    // Real-time UI updates
    // Success notification
    setSuccess('Setting updated successfully');
    setTimeout(() => setSuccess(null), 3000);
  } catch (err) {
    setError('Failed to update setting');
  } finally {
    setSaving(false);
  }
};
```

### 9. **Tab-based Organization**
- **UI Settings Tab**: Interface customization
- **Permissions Tab**: User role management
- **Logs Tab**: Activity monitoring
- **Backup Tab**: System backup management
- **Performance Tab**: System performance monitoring

### 10. **Visual Settings Controls**
```typescript
// Boolean Switch Control
{constant.data_type === 'boolean' ? (
  <Switch
    checked={constant.value === 'true'}
    onCheckedChange={(checked) => 
      updateUIConstant(category, key, checked.toString())
    }
    disabled={!constant.is_editable || saving}
  />
) : constant.data_type === 'color' ? (
  // Color Picker Control
  <div className="flex items-center space-x-2">
    <div 
      className="w-8 h-8 rounded border"
      style={{ backgroundColor: constant.value }}
    />
    <Input
      type="color"
      value={constant.value}
      onChange={(e) => updateUIConstant(category, key, e.target.value)}
      disabled={!constant.is_editable || saving}
      className="w-16 h-8 p-0 border-0"
    />
  </div>
) : (
  // Text/Number Input Control
  <Input
    type={constant.data_type === 'number' ? 'number' : 'text'}
    value={constant.value}
    onChange={(e) => updateUIConstant(category, key, e.target.value)}
    disabled={!constant.is_editable || saving}
    className="w-48"
  />
)}
```

### 11. **Role-based Permission System**
- **Create Permissions**: Ability to create new resources
- **Read Permissions**: Ability to view resources
- **Update Permissions**: Ability to modify resources
- **Delete Permissions**: Ability to remove resources
- **Admin Permissions**: Administrative access

### 12. **Activity Log Tracking**
- **User Actions**: Track all user activities
- **Resource Changes**: Monitor resource modifications
- **Value History**: Track old and new values
- **Timestamp Recording**: Precise activity timing
- **Audit Trail**: Complete activity history

### 13. **Backup Management System**
```typescript
const createBackup = async (backupType: string = 'manual') => {
  setSaving(true);
  try {
    // API call to create backup
    // Backup progress tracking
    // Success notification
    setSuccess('Backup started successfully');
    setTimeout(() => {
      fetchSystemBackups(); // Refresh backup list
      setSuccess(null);
    }, 3000);
  } catch (err) {
    setError('Failed to start backup');
  } finally {
    setSaving(false);
  }
};
```

### 14. **Backup Types and Status**
- **Manual Backups**: User-initiated backups
- **Automatic Backups**: Scheduled backup operations
- **Backup Status**: Completed, in progress, failed
- **Backup Size**: File size tracking
- **Restore Points**: Backup identification

### 15. **Performance Monitoring**
- **System Metrics**: Performance indicators
- **Resource Usage**: CPU, memory, disk usage
- **Response Times**: API response monitoring
- **Error Rates**: System error tracking
- **Performance Alerts**: Automated notifications

### 16. **Error Handling and Notifications**
```typescript
// Success and Error States
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);

// Visual Feedback
{success && (
  <div className="flex items-center space-x-1 text-green-600">
    <CheckCircle className="h-4 w-4" />
    <span className="text-sm">{success}</span>
  </div>
)}
{error && (
  <div className="flex items-center space-x-1 text-red-600">
    <XCircle className="h-4 w-4" />
    <span className="text-sm">{error}</span>
  </div>
)}
```

### 17. **Loading States**
```typescript
// Loading State Management
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

// Loading UI
if (loading) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-lg">Loading system settings...</span>
      </div>
    </div>
  );
}
```

### 18. **Data Fetching Pattern**
```typescript
useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchUIConstants(),
        fetchUserRoles(),
        fetchActivityLogs(),
        fetchSystemBackups()
      ]);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);
```

### 19. **Responsive Design**
- **Mobile-First**: Touch-friendly interface
- **Adaptive Layouts**: Screen size optimization
- **Tab Navigation**: Mobile-optimized tabs
- **Modal Responsiveness**: Mobile-friendly dialogs

### 20. **Theme Support**
```typescript
// Theme-aware Styling
<Card className={`${theme === "dark" ? "bg-slate-900/50 border-slate-700/50" : "bg-white/70 border-orange-200"} backdrop-blur-sm`}>
  {/* Card content */}
</Card>
```

## Technical Implementation

### Component Structure
```typescript
export const SettingsModule = ({
  modules,
  activeModule,
  onModuleChange,
  theme,
}: SettingsModuleProps) => {
  // State management
  // Data fetching
  // Settings updates
  // Backup management
  // Error handling
};
```

### State Management
```typescript
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);
const [uiConstants, setUiConstants] = useState<UIConstants | null>(null);
const [userRoles, setUserRoles] = useState<UserRole[]>([]);
const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
const [systemBackups, setSystemBackups] = useState<SystemBackup[]>([]);
const [activeTab, setActiveTab] = useState("ui");
const [showPasswords, setShowPasswords] = useState(false);
```

### API Functions
```typescript
const fetchUIConstants = async () => {
  // API call to fetch UI constants
  // Update state with constants data
  // Handle loading states
};

const fetchUserRoles = async () => {
  // API call to fetch user roles
  // Update state with role data
  // Handle loading states
};

const fetchActivityLogs = async () => {
  // API call to fetch activity logs
  // Update state with log data
  // Handle loading states
};

const fetchSystemBackups = async () => {
  // API call to fetch system backups
  // Update state with backup data
  // Handle loading states
};
```

## Benefits

1. **Complete Settings Management**: Comprehensive configuration control
2. **Role-based Access**: Secure permission management
3. **Activity Monitoring**: Complete audit trail
4. **Backup Management**: System data protection
5. **Real-time Updates**: Live settings synchronization
6. **Visual Controls**: Intuitive setting interfaces
7. **Error Handling**: Robust error management
8. **Performance Monitoring**: System health tracking
9. **Mobile Responsive**: Works across all devices
10. **Theme Support**: Dark/light mode compatibility
11. **Data Type Support**: Multiple setting types
12. **Permission Control**: Granular access management
13. **Backup Automation**: Scheduled backup operations
14. **Audit Compliance**: Complete activity logging 