# Calendar Management System

## Overview
Complete calendar management system with multi-view calendar, event management, reservation tracking, and comprehensive scheduling features for restaurant operations.

## Key Features

### 1. **Multi-View Calendar System**
- **Month View**: Complete monthly calendar overview
- **Day View**: Detailed daily schedule
- **Event Management**: Comprehensive event handling
- **Reservation Integration**: Restaurant reservation tracking
- **Navigation Controls**: Easy month/day navigation

### 2. **Event Management System**
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'reservation' | 'event' | 'meeting' | 'training' | 'maintenance' | 'holiday';
  location: string;
  reminder: boolean;
  repeat: 'none' | 'daily' | 'weekly' | 'monthly';
}
```

### 3. **Event Type System**
```typescript
const eventTypes = [
  { id: 'reservation', label: 'Reservation', color: 'bg-blue-500' },
  { id: 'event', label: 'Event', color: 'bg-green-500' },
  { id: 'meeting', label: 'Meeting', color: 'bg-purple-500' },
  { id: 'training', label: 'Training', color: 'bg-orange-500' },
  { id: 'maintenance', label: 'Maintenance', color: 'bg-red-500' },
  { id: 'holiday', label: 'Holiday', color: 'bg-yellow-500' }
];
```

### 4. **Calendar Navigation**
```typescript
const navigateMonth = (direction: 'prev' | 'next') => {
  setCurrentDate(prev => {
    const newDate = new Date(prev);
    if (direction === 'prev') {
      newDate.setMonth(prev.getMonth() - 1);
    } else {
      newDate.setMonth(prev.getMonth() + 1);
    }
    return newDate;
  });
};

const navigateDay = (direction: 'prev' | 'next') => {
  if (!selectedDate) return;
  
  const newDate = new Date(selectedDate);
  if (direction === 'prev') {
    newDate.setDate(selectedDate.getDate() - 1);
  } else {
    newDate.setDate(selectedDate.getDate() + 1);
  }
  setSelectedDate(newDate);
};
```

### 5. **Month View Rendering**
```typescript
const renderMonthView = () => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="h-24 border-r border-b border-gray-200 dark:border-gray-700"></div>
    );
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = formatDate(date);
    const dayEvents = getEventsForDate(dateString);
    const isToday = dateString === formatDate(new Date());
    const isSelected = selectedDate && dateString === formatDate(selectedDate);

    days.push(
      <div
        key={day}
        onClick={() => setSelectedDate(date)}
        className={`h-24 border-r border-b border-gray-200 dark:border-gray-700 p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
          isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
        } ${isSelected ? 'bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500' : ''}`}
      >
        <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
          {day}
        </div>
        <div className="space-y-1 mt-1">
          {dayEvents.slice(0, 2).map((event) => {
            const eventType = eventTypes.find(type => type.id === event.type);
            return (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white truncate ${eventType?.color || 'bg-gray-500'}`}
                title={event.title}
              >
                {event.title}
              </div>
            );
          })}
          {dayEvents.length > 2 && (
            <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
          )}
        </div>
      </div>
    );
  }

  return days;
};
```

### 6. **Day View Rendering**
```typescript
const renderDayView = () => {
  if (!selectedDate) return null;

  const dateString = formatDate(selectedDate);
  const dayEvents = getEventsForDate(dateString);
  const timeSlots = [];

  // Generate time slots from 08:00 to 23:00
  for (let hour = 8; hour <= 23; hour++) {
    const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
    const slotEvents = getEventsForTimeSlot(dateString, timeSlot);
    
    timeSlots.push(
      <div key={timeSlot} className="flex border-b border-gray-200 dark:border-gray-700">
        <div className="w-20 p-3 text-sm font-medium text-gray-500 border-r border-gray-200 dark:border-gray-700">
          {timeSlot}
        </div>
        <div className="flex-1 p-3 min-h-[60px]">
          {slotEvents.map((event) => {
            const eventType = eventTypes.find(type => type.id === event.type);
            return (
              <div
                key={event.id}
                className={`p-2 rounded-lg border-l-4 ${eventType?.color || 'border-gray-500'} bg-gray-50 dark:bg-gray-800 mb-2`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {event.startTime} - {event.endTime}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event.id);
                    }}
                    className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return timeSlots;
};
```

### 7. **Event Management Functions**
```typescript
const handleAddEvent = () => {
  if (!newEvent.title || !selectedDate) return;

  const event = {
    id: Date.now().toString(),
    ...newEvent,
    date: formatDate(selectedDate)
  };

  setEvents(prev => [...prev, event]);
  setNewEvent({
    title: '',
    description: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    type: 'reservation',
    location: '',
    reminder: false,
    repeat: 'none'
  });
  setShowEventModal(false);
};

const handleDeleteEvent = (eventId: string) => {
  setEvents(prev => prev.filter(event => event.id !== eventId));
};
```

### 8. **Utility Functions**
```typescript
const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const getEventsForDate = (date: string) => {
  return events.filter(event => event.date === date);
};

const getEventsForTimeSlot = (date: string, timeSlot: string) => {
  return events.filter(event => {
    return event.date === date && 
           event.startTime <= timeSlot && 
           event.endTime > timeSlot;
  });
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const formatDateTurkish = (date: Date) => {
  return date.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

### 9. **Event Modal System**
- **Add Event Modal**: Comprehensive event creation form
- **Event Details**: Title, description, time, location
- **Event Type Selection**: Color-coded event types
- **Reminder Settings**: Notification preferences
- **Repeat Options**: Daily, weekly, monthly repetition

### 10. **Visual Indicators**
- **Today Highlighting**: Current date highlighting
- **Selected Date**: User-selected date indication
- **Event Colors**: Type-based color coding
- **Event Overflow**: Multiple events per day handling
- **Time Slot Display**: Hourly time slot organization

### 11. **Event Categories**
- **Reservations**: Restaurant table reservations
- **Events**: Special events and promotions
- **Meetings**: Staff and management meetings
- **Training**: Employee training sessions
- **Maintenance**: Equipment and facility maintenance
- **Holidays**: Business holidays and closures

### 12. **Time Management**
- **Time Slots**: Hourly time slot organization
- **Duration Tracking**: Event duration management
- **Conflict Detection**: Overlapping event detection
- **Time Navigation**: Easy time-based navigation

### 13. **Location Management**
- **Event Locations**: Venue and room assignments
- **Location Display**: Visual location indicators
- **Location Filtering**: Location-based event filtering
- **Multi-location Support**: Multiple venue support

### 14. **Reminder System**
- **Event Reminders**: Notification preferences
- **Reminder Settings**: Customizable reminder times
- **Notification Types**: Visual and audio notifications
- **Reminder Management**: Reminder enable/disable

### 15. **Repeat Options**
- **No Repeat**: One-time events
- **Daily Repeat**: Daily recurring events
- **Weekly Repeat**: Weekly recurring events
- **Monthly Repeat**: Monthly recurring events

### 16. **Search and Filter**
- **Event Search**: Find specific events
- **Date Filtering**: Filter by date range
- **Type Filtering**: Filter by event type
- **Location Filtering**: Filter by location

### 17. **Responsive Design**
- **Mobile-First**: Touch-friendly interface
- **Adaptive Layouts**: Screen size optimization
- **Mobile Navigation**: Mobile-optimized navigation
- **Touch Interactions**: Touch-friendly interactions

### 18. **Data Management**
```typescript
const [currentDate, setCurrentDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
const [viewMode, setViewMode] = useState<'month' | 'day'>('month');
const [showEventModal, setShowEventModal] = useState(false);
const [events, setEvents] = useState<any[]>([]);
const [notes, setNotes] = useState<{[key: string]: string}>({});
const [newEvent, setNewEvent] = useState({
  title: '',
  description: '',
  date: '',
  startTime: '09:00',
  endTime: '10:00',
  type: 'reservation',
  location: '',
  reminder: false,
  repeat: 'none'
});
```

### 19. **Event Form Validation**
```typescript
const validateEventForm = () => {
  if (!newEvent.title.trim()) {
    return 'Event title is required';
  }
  if (!selectedDate) {
    return 'Event date is required';
  }
  if (newEvent.startTime >= newEvent.endTime) {
    return 'End time must be after start time';
  }
  return null;
};
```

### 20. **Calendar Legend**
- **Event Type Colors**: Visual event type indicators
- **Legend Display**: Event type explanation
- **Color Coding**: Consistent color scheme
- **Legend Positioning**: Strategic legend placement

## Technical Implementation

### Component Structure
```typescript
export const CalendarModule: React.FC<CalendarModuleProps> = ({
  modules,
  activeModule,
  onModuleChange,
  theme
}) => {
  // State management
  // Calendar navigation
  // Event management
  // View rendering
  // Modal handling
};
```

### View Mode Management
```typescript
const [viewMode, setViewMode] = useState<'month' | 'day'>('month');

// View mode selector
<div className="flex gap-2">
  {['month', 'day'].map((mode) => (
    <button
      key={mode}
      onClick={() => setViewMode(mode as any)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        viewMode === mode
          ? 'bg-purple-600 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {mode === 'month' ? 'Month View' : 'Day View'}
    </button>
  ))}
</div>
```

### Event Modal Rendering
```typescript
const renderEventModal = () => {
  if (!showEventModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        {/* Modal content */}
        <div className="space-y-4">
          {/* Event form fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="Event title"
            />
          </div>
          {/* Additional form fields */}
        </div>
      </div>
    </div>
  );
};
```

## Benefits

1. **Complete Calendar Management**: Comprehensive scheduling system
2. **Multi-View Support**: Month and day view options
3. **Event Management**: Full event lifecycle management
4. **Reservation Integration**: Restaurant reservation tracking
5. **Visual Organization**: Color-coded event types
6. **Time Management**: Efficient time slot organization
7. **Location Tracking**: Venue and room management
8. **Reminder System**: Notification preferences
9. **Repeat Options**: Recurring event support
10. **Mobile Responsive**: Works across all devices
11. **Navigation Controls**: Easy calendar navigation
12. **Event Categories**: Organized event classification
13. **Conflict Detection**: Overlapping event management
14. **Search Functionality**: Easy event discovery 