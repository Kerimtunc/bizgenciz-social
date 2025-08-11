# 🏥 Health Check System - Sistem Sağlık Kontrolü

## 📋 Özellikler
- **Database Health Check**: Veritabanı bağlantı kontrolü
- **System Monitoring**: Sistem durumu izleme
- **Memory Usage**: Bellek kullanım takibi
- **Uptime Tracking**: Çalışma süresi takibi
- **Environment Info**: Ortam bilgileri
- **Error Reporting**: Hata raporlama
- **Performance Metrics**: Performans metrikleri

## 🎯 Kullanım Alanları
- Production monitoring
- Load balancer health checks
- DevOps automation
- System diagnostics
- Performance monitoring
- Error tracking

## 💡 En Etkileyici Özellikler

### 1. Comprehensive Health Check Implementation
```typescript
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Database health check
    await prisma.$queryRaw`SELECT 1`
    
    // System health check
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version,
      environment: process.env.NODE_ENV,
      database: 'connected',
    }
    
    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    const health = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version,
      environment: process.env.NODE_ENV,
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
    
    return NextResponse.json(health, { status: 503 })
  }
}
```

### 2. Memory Usage Monitoring
```typescript
const getMemoryUsage = () => {
  const usage = process.memoryUsage()
  return {
    rss: `${Math.round(usage.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(usage.external / 1024 / 1024 * 100) / 100} MB`,
    arrayBuffers: `${Math.round(usage.arrayBuffers / 1024 / 1024 * 100) / 100} MB`
  }
}
```

### 3. Database Connection Test
```typescript
const checkDatabaseConnection = async () => {
  try {
    const startTime = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const responseTime = Date.now() - startTime
    
    return {
      status: 'connected',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown database error',
      timestamp: new Date().toISOString()
    }
  }
}
```

### 4. System Performance Metrics
```typescript
const getSystemMetrics = () => {
  return {
    uptime: {
      seconds: Math.floor(process.uptime()),
      formatted: formatUptime(process.uptime())
    },
    memory: getMemoryUsage(),
    cpu: {
      usage: process.cpuUsage(),
      load: process.loadavg ? process.loadavg() : null
    },
    version: {
      node: process.version,
      platform: process.platform,
      arch: process.arch
    }
  }
}

const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  return `${days}d ${hours}h ${minutes}m ${secs}s`
}
```

### 5. Environment Configuration Check
```typescript
const checkEnvironmentConfig = () => {
  const requiredEnvVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'REDIS_HOST',
    'REDIS_PORT'
  ]
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  return {
    environment: process.env.NODE_ENV || 'development',
    requiredVariables: requiredEnvVars.length,
    missingVariables: missingVars.length,
    missing: missingVars,
    timestamp: new Date().toISOString()
  }
}
```

### 6. Advanced Health Check with Multiple Services
```typescript
const performComprehensiveHealthCheck = async () => {
  const checks = {
    database: await checkDatabaseConnection(),
    redis: await checkRedisConnection(),
    environment: checkEnvironmentConfig(),
    system: getSystemMetrics(),
    services: await checkExternalServices()
  }
  
  const allHealthy = Object.values(checks).every(check => 
    check.status === 'connected' || check.status === 'healthy'
  )
  
  return {
    status: allHealthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString()
  }
}

const checkRedisConnection = async () => {
  try {
    const startTime = Date.now()
    await redis.ping()
    const responseTime = Date.now() - startTime
    
    return {
      status: 'connected',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown Redis error',
      timestamp: new Date().toISOString()
    }
  }
}
```

### 7. Health Check with Caching
```typescript
let healthCache: any = null
let lastHealthCheck = 0
const CACHE_DURATION = 30000 // 30 seconds

export async function GET() {
  const now = Date.now()
  
  // Return cached health check if recent
  if (healthCache && (now - lastHealthCheck) < CACHE_DURATION) {
    return NextResponse.json(healthCache, { status: 200 })
  }
  
  try {
    const health = await performComprehensiveHealthCheck()
    
    // Cache the result
    healthCache = health
    lastHealthCheck = now
    
    const statusCode = health.status === 'healthy' ? 200 : 503
    return NextResponse.json(health, { status: statusCode })
  } catch (error) {
    const errorHealth = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json(errorHealth, { status: 500 })
  }
}
```

### 8. Detailed Health Check Response
```typescript
const getDetailedHealthResponse = async () => {
  const health = await performComprehensiveHealthCheck()
  
  return {
    ...health,
    summary: {
      totalChecks: Object.keys(health.checks).length,
      healthyChecks: Object.values(health.checks).filter(check => 
        check.status === 'connected' || check.status === 'healthy'
      ).length,
      degradedServices: Object.entries(health.checks)
        .filter(([_, check]) => check.status !== 'connected' && check.status !== 'healthy')
        .map(([service, check]) => ({ service, ...check }))
    },
    recommendations: generateRecommendations(health.checks)
  }
}

const generateRecommendations = (checks: any) => {
  const recommendations = []
  
  if (checks.memory.heapUsed > 100) {
    recommendations.push('High memory usage detected. Consider optimizing memory usage.')
  }
  
  if (checks.database.responseTime > 1000) {
    recommendations.push('Slow database response. Check database performance.')
  }
  
  if (checks.environment.missingVariables > 0) {
    recommendations.push(`Missing environment variables: ${checks.environment.missing.join(', ')}`)
  }
  
  return recommendations
}
```

## 🚀 Performance Optimizasyonları
- **Caching**: Health check sonuçlarını önbellekleme
- **Async Operations**: Asenkron sağlık kontrolleri
- **Timeout Handling**: Zaman aşımı yönetimi
- **Error Recovery**: Hata kurtarma
- **Resource Monitoring**: Kaynak izleme

## 📱 Monitoring Features
- **Real-time Status**: Gerçek zamanlı durum
- **Historical Data**: Geçmiş veriler
- **Alert System**: Uyarı sistemi
- **Performance Tracking**: Performans takibi
- **Error Logging**: Hata kaydı

## 🔧 Configuration Options
- **Check Intervals**: Kontrol aralıkları
- **Timeout Settings**: Zaman aşımı ayarları
- **Threshold Values**: Eşik değerleri
- **Service Dependencies**: Servis bağımlılıkları
- **Custom Checks**: Özel kontroller

## 🛡️ Security Features
- **Access Control**: Erişim kontrolü
- **Rate Limiting**: Hız sınırlama
- **Authentication**: Kimlik doğrulama
- **Data Sanitization**: Veri temizleme
- **Audit Logging**: Denetim kaydı 