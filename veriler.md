# YemekZen QR Menu Elite Edition - Veritabanı Şeması

## 📊 ERD (Entity Relationship Diagram) - Veritabanı Yapısı

### 🔗 Multi-Tenant Temel Yapı

#### Tenants Tablosu
```sql
CREATE TABLE tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_type ENUM('BUSINESS', 'CONSUMER', 'SUPER_ADMIN') NOT NULL,
    status ENUM('ACTIVE', 'SUSPENDED', 'PENDING_APPROVAL') NOT NULL,
    subscription_status ENUM('ACTIVE', 'EXPIRED', 'CANCELLED') NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Users Tablosu
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role_id INTEGER NOT NULL,
    avatar VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    credit_balance DECIMAL(10,2) DEFAULT 0.00,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (role_id) REFERENCES user_roles(id)
);
```

#### Business_Profiles Tablosu
```sql
CREATE TABLE business_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    logo_url VARCHAR(500),
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    accent_color VARCHAR(7),
    font_family VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Plans Tablosu
```sql
CREATE TABLE plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    interval ENUM('MONTHLY', 'YEARLY') NOT NULL,
    max_products INTEGER,
    max_categories INTEGER,
    max_staff INTEGER,
    setup_fee DECIMAL(10,2) DEFAULT 0.00,
    trial_days INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Features Tablosu
```sql
CREATE TABLE features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('BASIC', 'PREMIUM', 'ENTERPRISE') NOT NULL,
    api_endpoint VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    dependencies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Plan_Features Tablosu
```sql
CREATE TABLE plan_features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    feature_id INTEGER NOT NULL,
    is_included BOOLEAN DEFAULT TRUE,
    limit_value INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    FOREIGN KEY (feature_id) REFERENCES features(id)
);
```

### 💰 Ciro Partnerliği Veri Yapıları

#### Commissions Tablosu
```sql
CREATE TABLE commissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commission_type ENUM('ORDER', 'FEATURE', 'SUBSCRIPTION') NOT NULL,
    rate DECIMAL(5,2) NOT NULL,
    is_percentage BOOLEAN DEFAULT TRUE,
    min_amount DECIMAL(10,2),
    max_amount DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Loyalty_Programs Tablosu
```sql
CREATE TABLE loyalty_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_type ENUM('CREDIT_BASED', 'POINT_BASED', 'HYBRID') NOT NULL,
    earning_rules TEXT,
    redemption_rules TEXT,
    credit_value DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Business_Loyalty_Settings Tablosu
```sql
CREATE TABLE business_loyalty_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    loyalty_program_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    max_credit_usage_percentage DECIMAL(5,2) DEFAULT 100.00,
    custom_rules TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (loyalty_program_id) REFERENCES loyalty_programs(id)
);
```

#### Credit_Transactions Tablosu
```sql
CREATE TABLE credit_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    transaction_type ENUM('EARN', 'SPEND', 'EXPIRE', 'ADJUST') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    order_id INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

#### Partner_Subsidies Tablosu
```sql
CREATE TABLE partner_subsidies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_tenant_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    credit_spent DECIMAL(10,2) NOT NULL,
    subsidy_amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (business_tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 🏪 Operasyonel Tablolar

#### Categories Tablosu
```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7),
    order_index INTEGER DEFAULT 0,
    seasonality TEXT,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    is_ready_category BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Products Tablosu
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    prep_time INTEGER,
    calories INTEGER,
    allergens TEXT,
    original_price DECIMAL(10,2),
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    time_limited_offer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

#### Orders Tablosu
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    customer_id INTEGER,
    table_id INTEGER,
    order_type ENUM('DINE_IN', 'TAKEOUT', 'DELIVERY') NOT NULL,
    status ENUM('PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED') NOT NULL,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    total_amount DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (table_id) REFERENCES tables(id)
);
```

#### Order_Items Tablosu
```sql
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    customizations TEXT,
    notes TEXT,
    status ENUM('PENDING', 'PREPARING', 'READY', 'SERVED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### Customers Tablosu
```sql
CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    birth_date DATE,
    loyalty_tier_id INTEGER,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.00,
    loyalty_points INTEGER DEFAULT 0,
    segment VARCHAR(100),
    activity_status ENUM('ACTIVE', 'INACTIVE', 'CHURNED') DEFAULT 'ACTIVE',
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (loyalty_tier_id) REFERENCES loyalty_tiers(id)
);
```

#### Tables Tablosu
```sql
CREATE TABLE tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    table_number VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    capacity INTEGER DEFAULT 4,
    status ENUM('AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    qr_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Staff Tablosu
```sql
CREATE TABLE staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    shift_start TIME,
    shift_end TIME,
    hourly_rate DECIMAL(10,2),
    hire_date DATE,
    status ENUM('ACTIVE', 'INACTIVE', 'TERMINATED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 🚚 Kurye Yönetimi Tabloları

#### Business_Couriers Tablosu
```sql
CREATE TABLE business_couriers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    vehicle_type ENUM('MOTORCYCLE', 'CAR', 'BICYCLE', 'FOOT') NOT NULL,
    license_plate VARCHAR(20),
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Courier_Assignments Tablosu
```sql
CREATE TABLE courier_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    courier_id INTEGER NOT NULL,
    assignment_type ENUM('BUSINESS', 'PLATFORM') NOT NULL,
    status ENUM('ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED') DEFAULT 'ASSIGNED',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picked_up_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (courier_id) REFERENCES business_couriers(id)
);
```

#### Courier_Performance Tablosu
```sql
CREATE TABLE courier_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courier_id INTEGER NOT NULL,
    period VARCHAR(20) NOT NULL,
    delivery_count INTEGER DEFAULT 0,
    avg_delivery_time INTEGER,
    rating DECIMAL(3,2),
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (courier_id) REFERENCES business_couriers(id)
);
```

#### Courier_Locations Tablosu
```sql
CREATE TABLE courier_locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courier_id INTEGER NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('AVAILABLE', 'BUSY', 'OFFLINE') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (courier_id) REFERENCES business_couriers(id)
);
```

#### Emergency_Alerts Tablosu
```sql
CREATE TABLE emergency_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courier_id INTEGER NOT NULL,
    alert_type ENUM('ACCIDENT', 'ILLNESS', 'ROBBERY', 'OTHER') NOT NULL,
    location TEXT,
    description TEXT,
    status ENUM('ACTIVE', 'RESOLVED', 'CANCELLED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (courier_id) REFERENCES business_couriers(id)
);
```

### 📊 Analitik Tablolar (OLAP)

#### Daily_Sales_Metrics Tablosu
```sql
CREATE TABLE daily_sales_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    tenant_id INTEGER NOT NULL,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Weekly_Sales_Metrics Tablosu
```sql
CREATE TABLE weekly_sales_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week_start_date DATE NOT NULL,
    tenant_id INTEGER NOT NULL,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0.00,
    growth_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Monthly_Sales_Metrics Tablosu
```sql
CREATE TABLE monthly_sales_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month_start_date DATE NOT NULL,
    tenant_id INTEGER NOT NULL,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0.00,
    growth_rate DECIMAL(5,2) DEFAULT 0.00,
    seasonal_factor DECIMAL(5,2) DEFAULT 1.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Product_Performance_Metrics Tablosu
```sql
CREATE TABLE product_performance_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    period VARCHAR(20) NOT NULL,
    sales_count INTEGER DEFAULT 0,
    revenue_generated DECIMAL(12,2) DEFAULT 0.00,
    profit_margin DECIMAL(5,2) DEFAULT 0.00,
    popularity_score DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### Customer_Segment_Metrics Tablosu
```sql
CREATE TABLE customer_segment_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    segment_id VARCHAR(100) NOT NULL,
    period VARCHAR(20) NOT NULL,
    customer_count INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0.00,
    average_order_value DECIMAL(10,2) DEFAULT 0.00,
    retention_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Table_Efficiency_Metrics Tablosu
```sql
CREATE TABLE table_efficiency_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_id INTEGER NOT NULL,
    period VARCHAR(20) NOT NULL,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    turnover_rate DECIMAL(5,2) DEFAULT 0.00,
    revenue_per_hour DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (table_id) REFERENCES tables(id)
);
```

### ⚙️ Sistem Yönetimi Tabloları

#### Audit_Logs Tablosu
```sql
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tenant_id INTEGER NOT NULL,
    action_type ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN') NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER,
    old_value TEXT,
    new_value TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Feature_Flags Tablosu
```sql
CREATE TABLE feature_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Tenant_Feature_Flags Tablosu
```sql
CREATE TABLE tenant_feature_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    feature_flag_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (feature_flag_id) REFERENCES feature_flags(id)
);
```

#### App_Settings Tablosu
```sql
CREATE TABLE app_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Notification_Settings Tablosu
```sql
CREATE TABLE notification_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    notification_type VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    template TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```

#### Tax_Rates Tablosu
```sql
CREATE TABLE tax_rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tax_type VARCHAR(100) NOT NULL,
    rate DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    effective_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Commission_Rates Tablosu
```sql
CREATE TABLE commission_rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commission_type VARCHAR(100) NOT NULL,
    rate DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    effective_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

### 👑 Süperadmin Özellik Atama Tabloları

#### Features Tablosu (Süperadmin)
```sql
CREATE TABLE features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('MENU_MANAGEMENT', 'ANALYTICS', 'FINANCIAL', 'STAFF', 'CUSTOMER_RELATIONS', 'OPERATIONAL', 'ADVANCED') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    dependencies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Tenant_Features Tablosu (Süperadmin)
```sql
CREATE TABLE tenant_features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    feature_id INTEGER NOT NULL,
    is_visible BOOLEAN DEFAULT FALSE,
    is_usable BOOLEAN DEFAULT FALSE,
    is_manageable BOOLEAN DEFAULT FALSE,
    assigned_by INTEGER NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (feature_id) REFERENCES features(id),
    FOREIGN KEY (assigned_by) REFERENCES superadmin_users(id)
);
```

#### Feature_Usage_Logs Tablosu (Süperadmin)
```sql
CREATE TABLE feature_usage_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    feature_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    action_type ENUM('VIEW', 'USE', 'MANAGE') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (feature_id) REFERENCES features(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Feature_Dependencies Tablosu (Süperadmin)
```sql
CREATE TABLE feature_dependencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_id INTEGER NOT NULL,
    depends_on_feature_id INTEGER NOT NULL,
    dependency_type ENUM('REQUIRED', 'RECOMMENDED', 'OPTIONAL') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (feature_id) REFERENCES features(id),
    FOREIGN KEY (depends_on_feature_id) REFERENCES features(id)
);
```

#### Feature_Templates Tablosu (Süperadmin)
```sql
CREATE TABLE feature_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES superadmin_users(id)
);
```

#### Feature_Template_Items Tablosu (Süperadmin)
```sql
CREATE TABLE feature_template_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_id INTEGER NOT NULL,
    feature_id INTEGER NOT NULL,
    is_visible BOOLEAN DEFAULT FALSE,
    is_usable BOOLEAN DEFAULT FALSE,
    is_manageable BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (template_id) REFERENCES feature_templates(id),
    FOREIGN KEY (feature_id) REFERENCES features(id)
);
```

#### Superadmin_Users Tablosu (Süperadmin)
```sql
CREATE TABLE superadmin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role ENUM('SUPER_ADMIN', 'ADMIN', 'OPERATOR') NOT NULL,
    permissions TEXT,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Superadmin_Audit_Logs Tablosu (Süperadmin)
```sql
CREATE TABLE superadmin_audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_user_id INTEGER NOT NULL,
    action_type ENUM('FEATURE_ASSIGNMENT', 'TENANT_UPDATE', 'TEMPLATE_CREATION', 'BULK_OPERATION') NOT NULL,
    target_tenant_id INTEGER,
    target_feature_id INTEGER,
    old_value TEXT,
    new_value TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (admin_user_id) REFERENCES superadmin_users(id),
    FOREIGN KEY (target_tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (target_feature_id) REFERENCES features(id)
);
```

## 🔗 İlişki Diyagramı

### Ana İlişkiler:
1. **Tenants** → **Users** (1:N)
2. **Tenants** → **Business_Profiles** (1:1)
3. **Tenants** → **Orders** (1:N)
4. **Tenants** → **Categories** (1:N)
5. **Tenants** → **Products** (1:N)
6. **Tenants** → **Customers** (1:N)
7. **Tenants** → **Tables** (1:N)
8. **Tenants** → **Staff** (1:N)
9. **Tenants** → **Business_Couriers** (1:N)

### Ciro Partnerliği İlişkileri:
1. **Tenants** → **Business_Loyalty_Settings** (1:1)
2. **Users** → **Credit_Transactions** (1:N)
3. **Orders** → **Partner_Subsidies** (1:1)

### Kurye Yönetimi İlişkileri:
1. **Business_Couriers** → **Courier_Assignments** (1:N)
2. **Business_Couriers** → **Courier_Performance** (1:N)
3. **Business_Couriers** → **Courier_Locations** (1:N)
4. **Business_Couriers** → **Emergency_Alerts** (1:N)

### Süperadmin İlişkileri:
1. **Features** → **Tenant_Features** (1:N)
2. **Features** → **Feature_Dependencies** (1:N)
3. **Feature_Templates** → **Feature_Template_Items** (1:N)
4. **Superadmin_Users** → **Superadmin_Audit_Logs** (1:N)

## 📈 Index Stratejileri

### Performans Index'leri:
```sql
-- Tenant bazlı sorgular için
CREATE INDEX idx_tenant_id ON users(tenant_id);
CREATE INDEX idx_tenant_id ON orders(tenant_id);
CREATE INDEX idx_tenant_id ON products(tenant_id);
CREATE INDEX idx_tenant_id ON categories(tenant_id);

-- Soft delete için
CREATE INDEX idx_deleted_at ON users(deleted_at);
CREATE INDEX idx_deleted_at ON orders(deleted_at);
CREATE INDEX idx_deleted_at ON products(deleted_at);

-- Sipariş durumu için
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_date ON orders(created_at);

-- Kurye performansı için
CREATE INDEX idx_courier_performance ON courier_performance(courier_id, period);

-- Analitik sorgular için
CREATE INDEX idx_daily_metrics ON daily_sales_metrics(date, tenant_id);
CREATE INDEX idx_weekly_metrics ON weekly_sales_metrics(week_start_date, tenant_id);
CREATE INDEX idx_monthly_metrics ON monthly_sales_metrics(month_start_date, tenant_id);
```

## 🔒 Güvenlik Önlemleri

### Constraint'ler:
- Tüm foreign key constraint'ler tanımlanmış
- NOT NULL constraint'ler zorunlu alanlarda
- UNIQUE constraint'ler tekil değerler için
- CHECK constraint'ler veri doğrulama için

### Multi-Tenant İzolasyon:
- Her tabloda tenant_id kolonu zorunlu
- Tüm sorgular WHERE tenant_id = ? koşulunu içermeli
- Cross-tenant veri erişimi engellenmiş

### Audit Trail:
- Tüm değişiklikler audit_logs tablosunda loglanır
- Süperadmin işlemleri superadmin_audit_logs tablosunda
- Feature kullanımı feature_usage_logs tablosunda

## 📊 ETL Pipeline Entegrasyonu

### Günlük ETL Job'ları:
- Daily_Sales_Metrics tablosu her gece 02:00'de güncellenir
- Product_Performance_Metrics tablosu her gece 02:30'da güncellenir
- Customer_Segment_Metrics tablosu her gece 03:00'da güncellenir

### Haftalık ETL Job'ları:
- Weekly_Sales_Metrics tablosu her Pazar 03:00'da güncellenir
- Table_Efficiency_Metrics tablosu her Pazar 03:30'da güncellenir

### Aylık ETL Job'ları:
- Monthly_Sales_Metrics tablosu ayın 1'i 04:00'da güncellenir
- Courier_Performance tablosu ayın 1'i 04:30'da güncellenir

Bu veritabanı şeması, YemekZen QR Menu Elite Edition projesinin tüm gereksinimlerini karşılayacak şekilde tasarlanmıştır. Multi-tenant yapı, Ciro Partnerliği sistemi, kurye yönetimi, analitik tablolar ve süperadmin özellik atama sistemi tam entegrasyon ile çalışacaktır. 