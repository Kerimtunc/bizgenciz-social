# Reservation Management System

## Overview
Complete reservation management system with calendar view, table assignment, customer management, waitlist handling, and comprehensive reservation tracking for restaurant operations.

## Key Features

### 1. **Comprehensive Reservation Management**
- **Reservation CRUD Operations**: Create, read, update, delete reservations
- **Calendar View**: Date-based reservation visualization
- **Table Assignment**: Automatic and manual table allocation
- **Customer Management**: Customer information tracking
- **Waitlist Handling**: Queue management for overbooked periods

### 2. **Reservation Interface**
```typescript
interface Reservation {
  id: number;
  reservation_number: string;
  table_id?: number;
  table_number?: string;
  table_location?: string;
  customer_id?: number;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  duration: number;
  status: 'confirmed' | 'waitlist' | 'seated' | 'no_show' | 'cancelled' | 'completed';
  special_requests?: string;
  staff_id?: number;
  staff_name?: string;
  source: 'manual' | 'online' | 'phone' | 'app';
  priority: 'low' | 'medium' | 'high';
  waitlist_position?: number;
  created_at: string;
  total_visits?: number;
}
```

### 3. **Time Slot Management**
```typescript
interface TimeSlot {
  time: string;
  table_id?: number;
  table_number?: string;
  capacity?: number;
  location?: string;
}
```

### 4. **Reservation Statistics Dashboard**
```typescript
interface ReservationStats {
  total_reservations: number;
  confirmed: number;
  completed: number;
  no_shows: number;
  cancelled: number;
  waitlisted: number;
  avg_party_size: number;
  today_total: number;
  today_confirmed: number;
  today_seated: number;
  imminent: number;
}
```

### 5. **Advanced Status Management**
- **Confirmed**: Reservation confirmed and ready
- **Waitlist**: On waiting list for availability
- **Seated**: Customer has been seated
- **Completed**: Reservation completed successfully
- **No Show**: Customer didn't arrive
- **Cancelled**: Reservation was cancelled

### 6. **Priority Management System**
- **Low Priority**: Standard reservations
- **Medium Priority**: Regular customers
- **High Priority**: VIP customers or special occasions

### 7. **Real-time Availability Tracking**
- **Dynamic Time Slots**: Real-time availability updates
- **Table Capacity**: Automatic capacity checking
- **Conflict Detection**: Prevent double bookings
- **Waitlist Management**: Queue system for overbooked periods

### 8. **Customer Integration**
- **Customer Profiles**: Link reservations to customer accounts
- **Visit History**: Track customer visit frequency
- **Preferences**: Store customer preferences
- **Contact Information**: Phone and email management

### 9. **Special Requests Handling**
- **Request Categories**: Dietary restrictions, seating preferences
- **Request Tracking**: Monitor special requirements
- **Staff Notifications**: Alert staff to special needs
- **Request History**: Track request fulfillment

### 10. **Check-in System**
```typescript
const checkInReservation = async (reservationId: number) => {
  // Update reservation status to seated
  // Record check-in time
  // Notify kitchen/staff
  // Update table status
};
```

### 11. **Visual Status Indicators**
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'text-green-600 bg-green-100';
    case 'waitlist': return 'text-yellow-600 bg-yellow-100';
    case 'seated': return 'text-blue-600 bg-blue-100';
    case 'completed': return 'text-gray-600 bg-gray-100';
    case 'no_show': return 'text-red-600 bg-red-100';
    case 'cancelled': return 'text-red-800 bg-red-200';
    default: return 'text-gray-600 bg-gray-100';
  }
};
```

### 12. **Priority Color Coding**
```typescript
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};
```

### 13. **Time Calculation System**
```typescript
const getTimeUntilReservation = (date: string, time: string) => {
  const reservationDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const diff = reservationDateTime.getTime() - now.getTime();
  
  if (diff < 0) return 'Past';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes} minutes from now`;
  if (hours < 24) return `${hours} hours ${minutes} minutes from now`;
  
  const days = Math.floor(hours / 24);
  return `${days} days from now`;
};
```

### 14. **Advanced Filtering System**
- **Date Filtering**: Filter by specific dates
- **Status Filtering**: Filter by reservation status
- **Search Functionality**: Search by customer name, phone, or reservation number
- **Combined Filters**: Multiple filter criteria

### 15. **Statistics Dashboard**
- **Total Reservations**: Complete reservation count
- **Confirmed Reservations**: Confirmed bookings
- **Waitlisted**: On waiting list
- **Average Party Size**: Mean party size
- **Today's Reservations**: Daily booking count
- **Seated Today**: Today's seated customers
- **No Shows**: Missed reservations
- **Imminent**: Upcoming reservations

### 16. **Modal-based Forms**
- **Add Reservation Modal**: Comprehensive reservation creation
- **Edit Reservation Modal**: Reservation information updates
- **Form Validation**: Data integrity checks
- **Responsive Design**: Mobile-friendly forms

### 17. **Real-time Updates**
```typescript
useEffect(() => {
  fetchReservations();
  fetchAvailableSlots(selectedDate);
}, [selectedDate]);

useEffect(() => {
  calculateStats();
}, [reservations]);

useEffect(() => {
  if (formData.reservation_date && formData.party_size) {
    fetchAvailableSlots(formData.reservation_date, formData.party_size);
  }
}, [formData.reservation_date, formData.party_size]);
```

### 18. **Waitlist Management**
- **Position Tracking**: Track waitlist position
- **Automatic Promotion**: Promote from waitlist when available
- **Waitlist Notifications**: Notify customers of availability
- **Waitlist Analytics**: Monitor waitlist performance

### 19. **Source Tracking**
- **Manual Reservations**: Staff-created reservations
- **Online Reservations**: Web-based bookings
- **Phone Reservations**: Phone call bookings
- **App Reservations**: Mobile app bookings

### 20. **Duration Management**
- **Flexible Duration**: Customizable reservation duration
- **Time Slot Optimization**: Efficient time slot allocation
- **Turnover Management**: Optimize table turnover
- **Duration Analytics**: Track average dining duration

## Technical Implementation

### Component Structure
```typescript
const ReservationModule: React.FC = () => {
  // State management
  // Data fetching
  // Statistics calculation
  // Form management
  // Modal management
  // Filtering logic
};
```

### State Management
```typescript
const [reservations, setReservations] = useState<Reservation[]>([]);
const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
const [stats, setStats] = useState<ReservationStats>({...});
const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [selectedStatus, setSelectedStatus] = useState<string>('all');
const [searchTerm, setSearchTerm] = useState('');
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
const [loading, setLoading] = useState(false);
```

### Form Management
```typescript
const [formData, setFormData] = useState<Partial<Reservation>>({
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  reservation_date: new Date().toISOString().split('T')[0],
  reservation_time: '19:00',
  party_size: 2,
  duration: 120,
  special_requests: '',
  source: 'manual',
  priority: 'medium'
});
```

### Filtering Logic
```typescript
const filteredReservations = reservations.filter(reservation => {
  const statusMatch = selectedStatus === 'all' || reservation.status === selectedStatus;
  const searchMatch = searchTerm === '' || 
    reservation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.customer_phone?.includes(searchTerm) ||
    reservation.reservation_number.toLowerCase().includes(searchTerm.toLowerCase());
  return statusMatch && searchMatch;
});
```

### API Functions
```typescript
const fetchReservations = async () => {
  // API call to fetch reservations
  // Update state with reservation data
  // Handle loading states
};

const fetchAvailableSlots = async (date: string, partySize: number = 2) => {
  // API call to fetch available time slots
  // Filter by date and party size
  // Update available slots state
};

const createReservation = async () => {
  // API call to create new reservation
  // Validate form data
  // Handle success/error states
};

const updateReservation = async () => {
  // API call to update existing reservation
  // Validate changes
  // Update local state
};

const updateReservationStatus = async (reservationId: number, status: string) => {
  // API call to update reservation status
  // Handle status transitions
  // Update UI accordingly
};
```

## Benefits

1. **Complete Reservation Management**: End-to-end reservation lifecycle
2. **Real-time Availability**: Live availability tracking
3. **Smart Table Assignment**: Automatic table allocation
4. **Waitlist Management**: Efficient queue handling
5. **Customer Integration**: Seamless customer linking
6. **Priority Management**: VIP and special occasion handling
7. **Check-in System**: Streamlined customer arrival process
8. **Statistics Dashboard**: Data-driven insights
9. **Mobile Responsive**: Works across all devices
10. **Advanced Filtering**: Powerful search capabilities
11. **Special Requests**: Comprehensive request handling
12. **Source Tracking**: Multi-channel booking management
13. **Duration Optimization**: Efficient time slot management
14. **Real-time Updates**: Live data synchronization 