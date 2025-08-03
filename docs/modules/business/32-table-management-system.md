# Table Management System

## Overview
Complete table management system with real-time table status tracking, POS session management, customer journey integration, and comprehensive restaurant floor management for restaurant operations.

## Key Features

### 1. **Real-time Table Status Management**
- **Table Status Tracking**: Available, occupied, reserved, maintenance, inactive
- **Live Status Updates**: Real-time status synchronization
- **Status Broadcasting**: Cross-module status communication
- **Auto-refresh**: Automatic data updates every 30 seconds
- **Visual Status Indicators**: Color-coded status badges

### 2. **Table Interface**
```typescript
interface Table {
  id: number;
  table_number: number;
  capacity: number;
  location: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance' | 'inactive';
  current_status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  qr_code?: string;
  customer_name?: string;
  session_started?: string;
  estimated_duration?: number;
  bill_requested?: boolean;
  created_at: string;
  updated_at: string;
}
```

### 3. **Table Statistics Dashboard**
```typescript
interface TableStats {
  total: number;
  available: number;
  occupied: number;
  reserved: number;
  maintenance: number;
  occupancy_rate: number;
}
```

### 4. **Real-time Module Integration**
```typescript
const {
  connected: wsConnected,
  connecting: wsConnecting,
  broadcastTableStatus,
  broadcastCustomerJourney,
  broadcastModuleEvent
} = useRealTimeModule({
  modules: ['tables', 'dashboard', 'orders', 'customers'],
  tenantId: 1,
  token: 'mock-token',
  onModuleUpdate: useCallback((event: ModuleUpdateEvent) => {
    console.log('Tables module received update:', event);
    
    if (event.eventType === 'order_completed') {
      fetchTables();
    } else if (event.eventType === 'customer_seated') {
      fetchTables();
    }
  }, []),
  onCrossModuleEvent: useCallback((event: CrossModuleEvent) => {
    console.log('Tables cross-module event:', event);
    
    if (event.sourceModule === 'orders' && event.eventType === 'table_status_sync') {
      fetchTables();
    }
  }, [])
});
```

### 5. **Customer Journey Integration**
```typescript
const { 
  activeVisits, 
  startTableVisit, 
  completeTableVisit, 
  getVisitByTable,
  getVisitAnalytics,
  error: journeyError 
} = useCustomerJourney();

// Start customer journey tracking
await startTableVisit(
  selectedTable.id, 
  undefined, // customer_id will be linked later
  2 // default party size
);

// Complete customer journey tracking
const activeVisit = getVisitByTable(table.id);
if (activeVisit) {
  await completeTableVisit(activeVisit.id, 5); // Default 5-star rating
}
```

### 6. **POS Session Management**
```typescript
// Start POS session
const handleStartPosSession = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!selectedTable) return;
  
  try {
    const response = await fetch(`http://localhost:5000/api/tables/${selectedTable.id}/pos-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: posSessionData.customer_name,
        estimated_duration: parseInt(posSessionData.estimated_duration)
      })
    });
    
    if (response.ok) {
      await fetchTables();
      
      // Real-time table status broadcasting
      broadcastTableStatus({
        tableId: selectedTable.id.toString(),
        status: 'occupied',
        customerCount: 1,
        customerId: undefined
      });

      // Customer journey broadcasting
      broadcastCustomerJourney({
        customerId: 0,
        tableId: selectedTable.id.toString(),
        journeyStage: 'seated',
        metadata: {
          customerName: posSessionData.customer_name,
          estimatedDuration: parseInt(posSessionData.estimated_duration),
          sessionStarted: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    console.error('Start POS session error:', error);
  }
};
```

### 7. **Advanced Filtering System**
```typescript
const filteredTables = tables.filter(table => {
  const matchesSearch = 
    table.table_number.toString().includes(searchTerm.toLowerCase()) ||
    table.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (table.customer_name && table.customer_name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const matchesStatus = statusFilter === 'all' || table.current_status === statusFilter;
  const matchesLocation = locationFilter === 'all' || table.location === locationFilter;
  
  return matchesSearch && matchesStatus && matchesLocation;
});
```

### 8. **Status Color Management**
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800 border-green-200';
    case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
    case 'reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Available';
    case 'occupied': return 'Occupied';
    case 'reserved': return 'Reserved';
    case 'maintenance': return 'Maintenance';
    default: return status;
  }
};
```

### 9. **Table Statistics Calculation**
```typescript
const fetchTables = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/tables');
    const data = await response.json();
    
    if (data.success) {
      setTables(data.data || []);
      
      // Calculate stats
      const tableStats = data.data.reduce((acc: TableStats, table: Table) => {
        acc.total++;
        if (table.current_status === 'available') acc.available++;
        else if (table.current_status === 'occupied') acc.occupied++;
        else if (table.current_status === 'reserved') acc.reserved++;
        else if (table.current_status === 'maintenance') acc.maintenance++;
        return acc;
      }, { total: 0, available: 0, occupied: 0, reserved: 0, maintenance: 0, occupancy_rate: 0 });
      
      tableStats.occupancy_rate = tableStats.total > 0 
        ? Math.round((tableStats.occupied / tableStats.total) * 100) 
        : 0;
        
      setStats(tableStats);
    }
  } catch (error) {
    console.error('Tables fetch error:', error);
  } finally {
    setLoading(false);
  }
};
```

### 10. **Table Actions Management**
```typescript
const handleTableAction = (action: string, table: Table) => {
  setSelectedTable(table);
  
  switch (action) {
    case 'start-session':
      setShowPosSessionModal(true);
      break;
    case 'end-session':
      handleEndPosSession(table);
      break;
    case 'edit':
      setNewTableData({
        table_number: table.table_number.toString(),
        capacity: table.capacity.toString(),
        location: table.location,
        status: table.status
      });
      setShowEditModal(true);
      break;
    case 'request-bill':
      handleRequestBill(table);
      break;
  }
};
```

### 11. **Bill Request System**
```typescript
const handleRequestBill = async (table: Table) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tables/${table.id}/request-bill`, {
      method: 'POST'
    });
    
    if (response.ok) {
      await fetchTables();
    }
  } catch (error) {
    console.error('Request bill error:', error);
  }
};
```

### 12. **Table Creation System**
```typescript
const handleCreateTable = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/tables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table_number: parseInt(newTableData.table_number),
        capacity: parseInt(newTableData.capacity),
        location: newTableData.location,
        status: newTableData.status
      })
    });
    
    if (response.ok) {
      await fetchTables();
      setShowNewTableModal(false);
      setNewTableData({ table_number: '', capacity: '', location: '', status: 'available' });
    }
  } catch (error) {
    console.error('Create table error:', error);
  }
};
```

### 13. **Session End Management**
```typescript
const handleEndPosSession = async (table: Table) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tables/${table.id}/pos-session`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      await fetchTables();
      
      // Real-time table status broadcasting
      broadcastTableStatus({
        tableId: table.id.toString(),
        status: 'available',
        customerCount: 0
      });

      // Customer journey broadcasting
      broadcastCustomerJourney({
        customerId: 0,
        tableId: table.id.toString(),
        journeyStage: 'departure',
        metadata: {
          sessionEnded: new Date().toISOString(),
          totalDuration: table.estimated_duration
        }
      });
    }
  } catch (error) {
    console.error('End POS session error:', error);
  }
};
```

### 14. **QR Code Integration**
- **QR Code Generation**: Automatic QR code creation
- **QR Code Display**: Visual QR code representation
- **QR Code Scanning**: Mobile QR code scanning
- **Table Identification**: QR-based table identification

### 15. **Location Management**
- **Multi-location Support**: Multiple restaurant locations
- **Location Filtering**: Location-based table filtering
- **Location Display**: Visual location indicators
- **Location Organization**: Location-based table organization

### 16. **Capacity Management**
- **Table Capacity**: Configurable table seating capacity
- **Capacity Display**: Visual capacity indicators
- **Capacity Filtering**: Capacity-based filtering
- **Optimal Seating**: Capacity-based seating optimization

### 17. **Session Duration Tracking**
- **Estimated Duration**: Customer session duration estimation
- **Duration Tracking**: Real-time duration monitoring
- **Duration Alerts**: Duration-based notifications
- **Duration Analytics**: Duration-based analytics

### 18. **Bill Request System**
- **Bill Request Tracking**: Bill request status monitoring
- **Bill Request Alerts**: Bill request notifications
- **Bill Request History**: Bill request history tracking
- **Bill Request Analytics**: Bill request analytics

### 19. **Maintenance Management**
- **Maintenance Status**: Table maintenance status tracking
- **Maintenance Scheduling**: Maintenance schedule management
- **Maintenance History**: Maintenance history tracking
- **Maintenance Alerts**: Maintenance notifications

### 20. **Real-time Broadcasting**
```typescript
// Table status broadcasting
broadcastTableStatus({
  tableId: selectedTable.id.toString(),
  status: 'occupied',
  customerCount: 1,
  customerId: undefined
});

// Customer journey broadcasting
broadcastCustomerJourney({
  customerId: 0,
  tableId: selectedTable.id.toString(),
  journeyStage: 'seated',
  metadata: {
    customerName: posSessionData.customer_name,
    estimatedDuration: parseInt(posSessionData.estimated_duration),
    sessionStarted: new Date().toISOString()
  }
});
```

## Technical Implementation

### Component Structure
```typescript
const TablesModule = () => {
  // State management
  // Real-time integration
  // Customer journey integration
  // Table management
  // Session management
  // UI rendering
};
```

### State Management
```typescript
const [tables, setTables] = useState<Table[]>([]);
const [stats, setStats] = useState<TableStats>({
  total: 0,
  available: 0,
  occupied: 0,
  reserved: 0,
  maintenance: 0,
  occupancy_rate: 0
});
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('all');
const [locationFilter, setLocationFilter] = useState('all');
const [showNewTableModal, setShowNewTableModal] = useState(false);
const [showPosSessionModal, setShowPosSessionModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedTable, setSelectedTable] = useState<Table | null>(null);
```

### Auto-refresh System
```typescript
useEffect(() => {
  fetchTables();
  
  // Auto refresh every 30 seconds
  const interval = setInterval(fetchTables, 30000);
  return () => clearInterval(interval);
}, []);
```

### Loading States
```typescript
if (loading) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading tables...</p>
      </div>
    </div>
  );
}
```

## Benefits

1. **Real-time Table Monitoring**: Live table status tracking
2. **POS Session Management**: Complete session lifecycle management
3. **Customer Journey Integration**: Seamless customer experience tracking
4. **Cross-module Communication**: Real-time module synchronization
5. **Visual Status Indicators**: Clear status visualization
6. **Advanced Filtering**: Comprehensive filtering capabilities
7. **QR Code Integration**: Modern table identification
8. **Location Management**: Multi-location support
9. **Capacity Management**: Optimal seating management
10. **Session Duration Tracking**: Duration-based analytics
11. **Bill Request System**: Efficient bill management
12. **Maintenance Management**: Table maintenance tracking
13. **Real-time Broadcasting**: Live status updates
14. **Responsive Design**: Mobile-friendly interface 