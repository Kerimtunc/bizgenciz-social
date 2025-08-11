# 🔴 Redis Cloud Kurulum ve Konfigürasyon Rehberi

## 📋 Genel Bakış

YemekZen projesi Redis Cloud kullanarak cache, session management ve rate limiting işlemlerini gerçekleştirir.

## 🏗️ Redis Cloud Konfigürasyonu

### **Mevcut Konfigürasyon**
- **Database Name**: `database-MDX6NC2X`
- **Public Endpoint**: `redis-16231.c328.europe-west3-1.gce.redns.redis-cloud.com:16231`
- **Password**: `epxjss5B0HuaHK1J3wEC8x5JiyCXeG61`
- **Region**: Europe West 3 (Google Cloud)

### **API Keys**
- **API User Key**: `St7pm0fstbt6ol4jqv7x2wknskoejmmcht1lkzfg89wyhvmg1l`
- **API Account Key**: `A2u72551avs6spt55lise2av48dvag4ev8v2pa2oc7zt9r3ykrb`

## 🔧 Kurulum Adımları

### 1. Environment Variables
`.env` dosyasında aşağıdaki değişkenleri tanımlayın:

```bash
# Redis Cloud Konfigürasyonu
REDIS_HOST=redis-16231.c328.europe-west3-1.gce.redns.redis-cloud.com
REDIS_PORT=16231
REDIS_PASSWORD=epxjss5B0HuaHK1J3wEC8x5JiyCXeG61
REDIS_URL="redis://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}"

# Redis Cloud API Keys
REDIS_CLOUD_API_USER_KEY=St7pm0fstbt6ol4jqv7x2wknskoejmmcht1lkzfg89wyhvmg1l
REDIS_CLOUD_API_ACCOUNT_KEY=A2u72551avs6spt55lise2av48dvag4ev8v2pa2oc7zt9r3ykrb
```

### 2. Bağlantı Testi
Redis bağlantısını test etmek için:

```bash
npm run redis:test
```

### 3. Redis CLI Bağlantısı
Redis Cloud'a doğrudan bağlanmak için:

```bash
redis-cli -u redis://default:epxjss5B0HuaHK1J3wEC8x5JiyCXeG61@redis-16231.c328.europe-west3-1.gce.redns.redis-cloud.com:16231
```

## 🚀 Kullanım

### **Cache Service**
```typescript
import { cacheService } from '@/lib/redis';

// Veri cache'leme
await cacheService.set('menu:123', menuData, 3600);

// Cache'den veri okuma
const menu = await cacheService.get('menu:123');

// Cache temizleme
await cacheService.delete('menu:123');
```

### **Rate Limiting**
```typescript
// API rate limiting
const allowed = await cacheService.checkRateLimit('api:user123', 100, 60);

// Login rate limiting
const loginAllowed = await cacheService.checkRateLimit('login:user123', 5, 900);
```

### **Session Management**
```typescript
// Session kaydetme
await cacheService.setSession('session123', userData, 3600);

// Session okuma
const session = await cacheService.getSession('session123');

// Session silme
await cacheService.deleteSession('session123');
```

## 📊 Monitoring ve Yönetim

### **Redis Cloud Dashboard**
- **URL**: https://app.redislabs.com/
- **Database**: database-MDX6NC2X
- **Owner**: Kerim Bahadır Tunç (blackalternaworld@gmail.com)

### **Önemli Metrikler**
- **Memory Usage**: Cache kullanımını takip edin
- **Connection Count**: Aktif bağlantı sayısı
- **Commands/sec**: Redis komut performansı
- **Hit Rate**: Cache hit oranı

## 🔒 Güvenlik

### **Best Practices**
1. **Environment Variables**: Hassas bilgileri .env dosyasında saklayın
2. **Network Security**: Redis Cloud'un güvenlik ayarlarını kontrol edin
3. **Access Control**: API key'leri güvenli şekilde yönetin
4. **Monitoring**: Anormal aktiviteleri takip edin

### **Backup ve Recovery**
- Redis Cloud otomatik backup sağlar
- Kritik veriler için ek backup stratejileri uygulayın

## 🛠️ Troubleshooting

### **Yaygın Hatalar**

#### 1. Bağlantı Hatası
```bash
# Hata: ECONNREFUSED
# Çözüm: Redis Cloud endpoint'ini kontrol edin
```

#### 2. Authentication Hatası
```bash
# Hata: NOAUTH Authentication required
# Çözüm: Redis password'ünü kontrol edin
```

#### 3. Timeout Hatası
```bash
# Hata: ETIMEDOUT
# Çözüm: Network bağlantısını ve firewall ayarlarını kontrol edin
```

### **Debug Komutları**
```bash
# Redis bağlantı testi
npm run redis:test

# Redis CLI ile bağlantı
redis-cli -u redis://default:password@host:port

# Redis info komutu
INFO server
INFO memory
INFO clients
```

## 📈 Performance Optimization

### **Cache Stratejileri**
1. **TTL Ayarları**: Veri türüne göre uygun TTL belirleyin
2. **Memory Management**: Cache boyutunu optimize edin
3. **Key Naming**: Tutarlı key naming convention kullanın

### **Monitoring**
- **Cache Hit Rate**: %80+ hedefleyin
- **Memory Usage**: %70 altında tutun
- **Response Time**: <10ms hedefleyin

## 🔄 Migration

### **Local Redis'ten Redis Cloud'a**
1. Mevcut Redis verilerini export edin
2. Redis Cloud'a import edin
3. Environment variables'ları güncelleyin
4. Bağlantıyı test edin

### **Backup Stratejisi**
- **Automated**: Redis Cloud otomatik backup
- **Manual**: Kritik veriler için manuel backup
- **Testing**: Backup restore testleri yapın

---

## 📞 Destek

Redis Cloud ile ilgili sorunlar için:
- **Redis Cloud Support**: https://redislabs.com/support/
- **Documentation**: https://docs.redislabs.com/
- **Community**: https://community.redislabs.com/ 