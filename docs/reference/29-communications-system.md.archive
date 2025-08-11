# Communications System

## Overview
Complete real-time communications system with multi-room chat, user management, role-based access control, file sharing, and comprehensive messaging features for restaurant operations.

## Key Features

### 1. **Multi-Room Chat System**
- **Public Rooms**: Open communication channels
- **Admin Rooms**: Administrative discussions
- **Management Rooms**: Management team coordination
- **Staff Rooms**: Staff communication
- **Private Rooms**: Individual conversations
- **Role-based Access**: Permission-controlled room access

### 2. **User Management Interface**
```typescript
interface User {
  id: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'staff' | 'customer';
  avatar?: string;
  online: boolean;
  lastSeen?: Date;
  status: 'online' | 'away' | 'busy' | 'offline';
}
```

### 3. **Room Management System**
```typescript
interface Room {
  id: string;
  name: string;
  type: 'public' | 'admin' | 'management' | 'staff' | 'private';
  description?: string;
  memberCount: number;
  unreadCount: number;
  locked: boolean;
  lastMessage?: Message;
  created: Date;
  members: string[];
}
```

### 4. **Message System**
```typescript
interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image' | 'system';
  replyTo?: string;
  edited: boolean;
  attachments?: Attachment[];
  reactions?: Reaction[];
}
```

### 5. **File Sharing System**
```typescript
interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Reaction {
  emoji: string;
  users: string[];
}
```

### 6. **Role-based Access Control**
```typescript
const getAccessibleRooms = () => {
  return rooms.filter(room => {
    switch (room.type) {
      case 'public': return true;
      case 'admin': return ['super_admin', 'admin'].includes(currentUser.role);
      case 'management': return ['super_admin', 'admin', 'manager'].includes(currentUser.role);
      case 'staff': return ['super_admin', 'admin', 'manager', 'staff'].includes(currentUser.role);
      case 'private': return room.members.includes(currentUser.id);
      default: return true;
    }
  });
};
```

### 7. **Visual Role Indicators**
```typescript
const getRoleIcon = (role: string) => {
  switch (role) {
    case 'super_admin': return <Crown className="h-4 w-4 text-yellow-500" />;
    case 'admin': return <Shield className="h-4 w-4 text-red-500" />;
    case 'manager': return <Briefcase className="h-4 w-4 text-blue-500" />;
    case 'staff': return <ChefHat className="h-4 w-4 text-green-500" />;
    case 'customer': return <User className="h-4 w-4 text-gray-500" />;
    default: return <User className="h-4 w-4 text-gray-500" />;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'super_admin': return 'text-yellow-600 dark:text-yellow-400';
    case 'admin': return 'text-red-600 dark:text-red-400';
    case 'manager': return 'text-blue-600 dark:text-blue-400';
    case 'staff': return 'text-green-600 dark:text-green-400';
    case 'customer': return 'text-gray-600 dark:text-gray-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};
```

### 8. **Room Type Icons**
```typescript
const getRoomIcon = (type: string) => {
  switch (type) {
    case 'public': return <Globe className="h-4 w-4" />;
    case 'admin': return <Shield className="h-4 w-4" />;
    case 'management': return <Briefcase className="h-4 w-4" />;
    case 'staff': return <Users className="h-4 w-4" />;
    case 'private': return <Lock className="h-4 w-4" />;
    default: return <Hash className="h-4 w-4" />;
  }
};
```

### 9. **Real-time Message Handling**
```typescript
const sendMessage = () => {
  if (!message.trim()) return;

  const newMessage: Message = {
    id: `msg_${Date.now()}`,
    userId: currentUser.id,
    userName: currentUser.name,
    userRole: currentUser.role,
    content: message.trim(),
    timestamp: new Date(),
    type: 'text',
    edited: false
  };

  setMessages(prev => ({
    ...prev,
    [selectedRoom]: [...(prev[selectedRoom] || []), newMessage]
  }));

  setMessage('');
  setIsTyping(false);
};
```

### 10. **Keyboard Shortcuts**
```typescript
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
```

### 11. **Auto-scroll System**
```typescript
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, selectedRoom]);
```

### 12. **Connection Status Monitoring**
- **Connected Status**: Real-time connection indicator
- **Connection Alerts**: Visual connection status
- **Reconnection Handling**: Automatic reconnection
- **Status Notifications**: Connection change alerts

### 13. **Notification System**
- **Sound Notifications**: Audio alerts for new messages
- **Visual Notifications**: Visual indicators
- **Notification Toggle**: Enable/disable notifications
- **Sound Toggle**: Enable/disable sounds

### 14. **User Status Management**
- **Online Status**: Real-time online indicators
- **Away Status**: User away indicators
- **Busy Status**: User busy indicators
- **Offline Status**: User offline tracking
- **Last Seen**: Last activity timestamps

### 15. **Message Features**
- **Text Messages**: Standard text communication
- **File Attachments**: Document and image sharing
- **Message Editing**: Edit sent messages
- **Message Reactions**: Emoji reactions
- **Reply System**: Message threading
- **System Messages**: Automated notifications

### 16. **Search Functionality**
- **Room Search**: Search through available rooms
- **Message Search**: Search within conversations
- **User Search**: Find specific users
- **Real-time Search**: Live search results

### 17. **File Upload System**
```typescript
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Handle file upload
    // Create attachment object
    // Send file message
    console.log('File selected:', file);
  }
};
```

### 18. **Typing Indicators**
```typescript
const [isTyping, setIsTyping] = useState(false);

// Typing indicator component
{isTyping && (
  <div className="px-4 py-2 text-sm text-gray-500">
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        <Circle className="h-2 w-2 animate-bounce" />
        <Circle className="h-2 w-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
        <Circle className="h-2 w-2 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
      <span>Someone is typing...</span>
    </div>
  </div>
)}
```

### 19. **Unread Message Tracking**
- **Unread Count**: Track unread messages per room
- **Visual Indicators**: Unread message badges
- **Read Status**: Message read tracking
- **Notification Count**: Unread message notifications

### 20. **Responsive Design**
- **Mobile-First**: Touch-friendly interface
- **Adaptive Layouts**: Screen size optimization
- **Collapsible Sidebars**: Space-efficient design
- **Mobile Navigation**: Mobile-optimized navigation

## Technical Implementation

### Component Structure
```typescript
export const CommunicationsModule: React.FC<CommunicationsModuleProps> = ({
  modules,
  activeModule,
  onModuleChange,
  theme
}) => {
  // State management
  // Real-time messaging
  // User management
  // Room management
  // File handling
  // Notifications
};
```

### State Management
```typescript
const [selectedRoom, setSelectedRoom] = useState<string>('general');
const [message, setMessage] = useState('');
const [isTyping, setIsTyping] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [showUserList, setShowUserList] = useState(true);
const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
const [notifications, setNotifications] = useState(true);
const [sounds, setSounds] = useState(true);
const [users, setUsers] = useState<User[]>([]);
const [rooms, setRooms] = useState<Room[]>([]);
const [messages, setMessages] = useState<Record<string, Message[]>>({});
```

### Real-time Features
```typescript
// Auto-scroll to bottom
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, selectedRoom]);

// Typing indicator
const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setMessage(e.target.value);
  setIsTyping(e.target.value.length > 0);
};
```

### Message Handling
```typescript
const sendMessage = () => {
  if (!message.trim()) return;

  const newMessage: Message = {
    id: `msg_${Date.now()}`,
    userId: currentUser.id,
    userName: currentUser.name,
    userRole: currentUser.role,
    content: message.trim(),
    timestamp: new Date(),
    type: 'text',
    edited: false
  };

  setMessages(prev => ({
    ...prev,
    [selectedRoom]: [...(prev[selectedRoom] || []), newMessage]
  }));

  setMessage('');
  setIsTyping(false);
};
```

### File Upload Handling
```typescript
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Create attachment object
    const attachment: Attachment = {
      id: `att_${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    };

    // Send file message
    const fileMessage: Message = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      content: `Sent: ${file.name}`,
      timestamp: new Date(),
      type: 'file',
      edited: false,
      attachments: [attachment]
    };

    setMessages(prev => ({
      ...prev,
      [selectedRoom]: [...(prev[selectedRoom] || []), fileMessage]
    }));
  }
};
```

## Benefits

1. **Real-time Communication**: Instant messaging capabilities
2. **Role-based Access**: Secure room access control
3. **Multi-room Support**: Organized communication channels
4. **File Sharing**: Document and image sharing
5. **User Status Tracking**: Real-time user presence
6. **Message History**: Complete conversation history
7. **Search Functionality**: Easy message and user search
8. **Mobile Responsive**: Works across all devices
9. **Notification System**: Audio and visual alerts
10. **Typing Indicators**: Real-time typing feedback
11. **Message Reactions**: Interactive message responses
12. **Connection Monitoring**: Reliable connection tracking
13. **Unread Tracking**: Message read status
14. **Responsive Design**: Optimized for all screen sizes 