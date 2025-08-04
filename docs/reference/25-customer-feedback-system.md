# Customer Feedback System

## Overview
Complete customer feedback management system with multi-dimensional rating analysis, response tracking, satisfaction metrics, and comprehensive feedback categorization for restaurant operations.

## Key Features

### 1. **Multi-Dimensional Rating System**
- **Overall Rating**: General customer satisfaction
- **Food Rating**: Food quality assessment
- **Service Rating**: Service quality evaluation
- **Atmosphere Rating**: Ambiance and environment
- **Speed Rating**: Service speed assessment
- **Star-based Display**: Visual rating representation

### 2. **Customer Feedback Interface**
```typescript
interface CustomerFeedback {
  id: number;
  order_id?: number;
  table_id?: number;
  session_id?: number;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  rating: number;
  food_rating: number;
  service_rating: number;
  atmosphere_rating: number;
  speed_rating: number;
  feedback_text: string;
  feedback_type: 'complaint' | 'suggestion' | 'compliment' | 'general' | 'food_issue' | 'service_issue';
  response_text?: string;
  response_by?: number;
  response_by_name?: string;
  response_date?: string;
  is_public: boolean;
  is_resolved: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  order_number?: string;
  table_number?: string;
}
```

### 3. **Feedback Statistics Dashboard**
```typescript
interface FeedbackStats {
  totalFeedbacks: number;
  averageRating: number;
  resolvedCount: number;
  pendingCount: number;
  todayCount: number;
  satisfactionTrend: number;
}
```

### 4. **Advanced Feedback Categorization**
- **Complaints**: Customer complaints and issues
- **Suggestions**: Improvement suggestions
- **Compliments**: Positive feedback and praise
- **General**: General feedback and comments
- **Food Issues**: Food-related problems
- **Service Issues**: Service-related problems

### 5. **Priority Management System**
- **Low Priority**: Minor issues and suggestions
- **Normal Priority**: Standard feedback
- **High Priority**: Important issues requiring attention
- **Urgent Priority**: Critical issues needing immediate action

### 6. **Staff Response System**
- **Response Threading**: Organized response structure
- **Staff Attribution**: Track who responded
- **Response Timestamps**: Response timing tracking
- **Response History**: Complete response audit trail

### 7. **Visibility Management**
- **Public Feedback**: Visible to all customers
- **Private Feedback**: Internal feedback only
- **Visibility Toggle**: Control feedback visibility
- **Privacy Settings**: Customer privacy protection

### 8. **Resolution Tracking**
- **Status Management**: Resolved/pending status
- **Resolution Toggle**: Mark issues as resolved
- **Reopening Capability**: Reopen resolved issues
- **Resolution History**: Track resolution timeline

### 9. **Advanced Filtering System**
- **Search Functionality**: Text-based search
- **Type Filtering**: Filter by feedback type
- **Status Filtering**: Filter by resolution status
- **Priority Filtering**: Filter by priority level
- **Rating Filtering**: Filter by rating range

### 10. **Star Rating Component**
```typescript
const StarRating = ({ rating, size = 4 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-${size} w-${size} ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : star <= rating + 0.5
              ? 'fill-yellow-200 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );
};
```

### 11. **Visual Type Indicators**
```typescript
const getTypeIcon = (type: string) => {
  const icons = {
    complaint: <AlertTriangle className="h-4 w-4" />,
    suggestion: <Lightbulb className="h-4 w-4" />,
    compliment: <Heart className="h-4 w-4" />,
    general: <MessageCircle className="h-4 w-4" />,
    food_issue: <Utensils className="h-4 w-4" />,
    service_issue: <User className="h-4 w-4" />
  };
  return icons[type as keyof typeof icons] || <MessageSquare className="h-4 w-4" />;
};
```

### 12. **Color-coded Type Badges**
```typescript
const getTypeBadgeColor = (type: string) => {
  const colors = {
    complaint: 'bg-red-100 text-red-800 border-red-200',
    suggestion: 'bg-blue-100 text-blue-800 border-blue-200',
    compliment: 'bg-green-100 text-green-800 border-green-200',
    general: 'bg-gray-100 text-gray-800 border-gray-200',
    food_issue: 'bg-orange-100 text-orange-800 border-orange-200',
    service_issue: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};
```

### 13. **Priority Badge System**
```typescript
const getPriorityBadge = (priority: string) => {
  const styles = {
    low: "bg-gray-100 text-gray-800 border-gray-200",
    normal: "bg-blue-100 text-blue-800 border-blue-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    urgent: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    low: "Low",
    normal: "Normal",
    high: "High",
    urgent: "Urgent"
  };

  return (
    <Badge className={`${styles[priority as keyof typeof styles]} border text-xs`}>
      {labels[priority as keyof typeof labels]}
    </Badge>
  );
};
```

### 14. **Satisfaction Trend Analysis**
```typescript
const calculateStats = (): FeedbackStats => {
  const today = new Date().toDateString();
  const todayFeedbacks = feedbacks.filter(feedback => 
    new Date(feedback.created_at).toDateString() === today
  );
  
  const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
  const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0;
  
  // Calculate satisfaction trend (last 7 days vs previous 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  
  const recentFeedbacks = feedbacks.filter(f => new Date(f.created_at) >= sevenDaysAgo);
  const previousFeedbacks = feedbacks.filter(f => 
    new Date(f.created_at) >= fourteenDaysAgo && new Date(f.created_at) < sevenDaysAgo
  );
  
  const recentAvg = recentFeedbacks.length > 0 
    ? recentFeedbacks.reduce((sum, f) => sum + f.rating, 0) / recentFeedbacks.length 
    : 0;
  const previousAvg = previousFeedbacks.length > 0 
    ? previousFeedbacks.reduce((sum, f) => sum + f.rating, 0) / previousFeedbacks.length 
    : 0;
  
  const satisfactionTrend = previousAvg > 0 ? ((recentAvg - previousAvg) / previousAvg) * 100 : 0;

  return {
    totalFeedbacks: feedbacks.length,
    averageRating: Math.round(averageRating * 10) / 10,
    resolvedCount: feedbacks.filter(f => f.is_resolved).length,
    pendingCount: feedbacks.filter(f => !f.is_resolved).length,
    todayCount: todayFeedbacks.length,
    satisfactionTrend: Math.round(satisfactionTrend * 10) / 10
  };
};
```

### 15. **Smart Sorting System**
```typescript
// Sort by priority and creation time
filtered.sort((a, b) => {
  const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
  const aPriority = priorityOrder[a.priority];
  const bPriority = priorityOrder[b.priority];
  
  if (aPriority !== bPriority) return bPriority - aPriority;
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
});
```

### 16. **Response Dialog System**
- **Modal-based Responses**: Inline response interface
- **Response Validation**: Ensure response content
- **Response Preview**: Show original feedback context
- **Response History**: Track all responses

### 17. **Real-time Statistics**
- **Total Feedbacks**: Complete feedback count
- **Average Rating**: Mean satisfaction score
- **Resolved Count**: Successfully resolved issues
- **Pending Count**: Issues awaiting resolution
- **Today's Count**: Daily feedback volume
- **Satisfaction Trend**: Trend analysis percentage

### 18. **Integration Capabilities**
- **Order Integration**: Link feedback to orders
- **Table Integration**: Associate with table numbers
- **Session Tracking**: Session-based feedback
- **Customer Linking**: Customer profile integration

### 19. **Analytics Dashboard**
- **Trend Analysis**: Satisfaction trend tracking
- **Performance Metrics**: Key performance indicators
- **Response Time**: Average response time
- **Resolution Rate**: Issue resolution percentage

### 20. **Responsive Design**
- **Mobile-First**: Touch-friendly interface
- **Adaptive Layouts**: Screen size optimization
- **Card-based Design**: Visual feedback cards
- **Modal Responsiveness**: Mobile-friendly dialogs

## Technical Implementation

### Component Structure
```typescript
export function CustomerFeedbackModule({
  modules, activeModule, onModuleChange, theme
}: CustomerFeedbackModuleProps) => {
  // State management
  // Data fetching
  // Filtering logic
  // Statistics calculation
  // Response management
};
```

### State Management
```typescript
const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>([]);
const [filteredFeedbacks, setFilteredFeedbacks] = useState<CustomerFeedback[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState("");
const [typeFilter, setTypeFilter] = useState<string>("all");
const [statusFilter, setStatusFilter] = useState<string>("all");
const [priorityFilter, setPriorityFilter] = useState<string>("all");
const [ratingFilter, setRatingFilter] = useState<string>("all");
const [selectedFeedback, setSelectedFeedback] = useState<CustomerFeedback | null>(null);
const [responseText, setResponseText] = useState("");
const [showResponseDialog, setShowResponseDialog] = useState(false);
```

### Filtering Logic
```typescript
useEffect(() => {
  let filtered = feedbacks;

  // Search filter
  if (searchTerm) {
    filtered = filtered.filter(feedback => 
      feedback.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedback_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.table_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.order_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Type filter
  if (typeFilter !== "all") {
    filtered = filtered.filter(feedback => feedback.feedback_type === typeFilter);
  }

  // Status filter
  if (statusFilter !== "all") {
    if (statusFilter === "resolved") {
      filtered = filtered.filter(feedback => feedback.is_resolved);
    } else if (statusFilter === "pending") {
      filtered = filtered.filter(feedback => !feedback.is_resolved);
    } else if (statusFilter === "public") {
      filtered = filtered.filter(feedback => feedback.is_public);
    }
  }

  // Priority filter
  if (priorityFilter !== "all") {
    filtered = filtered.filter(feedback => feedback.priority === priorityFilter);
  }

  // Rating filter
  if (ratingFilter !== "all") {
    const minRating = parseInt(ratingFilter);
    filtered = filtered.filter(feedback => feedback.rating >= minRating);
  }

  setFilteredFeedbacks(filtered);
}, [feedbacks, searchTerm, typeFilter, statusFilter, priorityFilter, ratingFilter]);
```

## Benefits

1. **Comprehensive Feedback Management**: Complete feedback lifecycle
2. **Multi-dimensional Analysis**: Detailed rating breakdown
3. **Smart Categorization**: Organized feedback types
4. **Priority Management**: Efficient issue prioritization
5. **Response Tracking**: Complete response audit trail
6. **Trend Analysis**: Satisfaction trend monitoring
7. **Visual Organization**: Clear feedback indicators
8. **Advanced Filtering**: Powerful search capabilities
9. **Mobile Responsive**: Works across all devices
10. **Real-time Updates**: Live feedback monitoring
11. **Performance Analytics**: Data-driven insights
12. **Customer Integration**: Seamless customer linking
13. **Staff Accountability**: Response attribution
14. **Resolution Tracking**: Issue resolution monitoring 