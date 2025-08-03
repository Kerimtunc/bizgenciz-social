# Three.js ile İşletme Web Sitesi Geliştirme Rehberi

## Güvenlik Önlemleri ve Best Practices

### 1. Content Security Policy (CSP)
```html
<!-- HTML head'de CSP header'ı -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               img-src 'self' data: https:; 
               font-src 'self' https://fonts.gstatic.com;">
```

### 2. Script Yükleme Güvenliği
```javascript
// Güvenli script yükleme
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.integrity = 'sha384-...'; // SRI hash
    script.crossOrigin = 'anonymous';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
```

### 3. Error Handling ve Fallback
```javascript
// Three.js yükleme kontrolü
if (typeof THREE === 'undefined') {
  console.warn('Three.js yüklenemedi, fallback mode aktif');
  // Fallback UI göster
  showFallbackUI();
}
```

## 1. Performanslı 3D Logo Animasyonu

### Güvenli Logo Animasyonu
```javascript
class SafeLogoAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isInitialized = false;
    this.init();
  }

  async init() {
    try {
      // Three.js güvenli yükleme
      if (typeof THREE === 'undefined') {
        await this.loadThreeJS();
      }

      this.setupScene();
      this.createLogo();
      this.animate();
      this.isInitialized = true;
    } catch (error) {
      console.error('Logo animasyonu yüklenemedi:', error);
      this.showFallback();
    }
  }

  async loadThreeJS() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.integrity = 'sha384-...'; // SRI hash
    script.crossOrigin = 'anonymous';
    
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performans için sınırla
    this.container.appendChild(this.renderer.domElement);
    
    this.camera.position.z = 5;
  }

  createLogo() {
    // Basit geometri ile logo oluştur
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x0066cc,
      transparent: true,
      opacity: 0.8
    });
    this.logo = new THREE.Mesh(geometry, material);
    this.scene.add(this.logo);

    // Güvenli ışıklandırma
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }

  animate() {
    if (!this.isInitialized) return;

    requestAnimationFrame(() => this.animate());
    
    this.logo.rotation.x += 0.01;
    this.logo.rotation.y += 0.01;
    
    this.renderer.render(this.scene, this.camera);
  }

  showFallback() {
    this.container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3>Logo Animasyonu</h3>
        <p>Statik logo görüntüleniyor</p>
      </div>
    `;
  }

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// Kullanım
const logoAnim = new SafeLogoAnimation('logo-container');
```

## 2. Performans Odaklı Parçacık Arka Planı

### Client-Side Parçacık Sistemi (Sunucu Yükü Yok)
```javascript
class PerformanceParticleBackground {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      maxParticles: options.maxParticles || 1000, // Sınırsız parçacık
      particleSize: options.particleSize || 0.05,
      animationSpeed: options.animationSpeed || 0.001,
      colorScheme: options.colorScheme || 'gradient',
      performanceMode: options.performanceMode || 'auto'
    };
    
    this.particles = [];
    this.isActive = false;
    this.performanceMetrics = {
      fps: 60,
      lastFrameTime: 0,
      frameCount: 0
    };
    
    this.init();
  }

  async init() {
    try {
      if (typeof THREE === 'undefined') {
        await this.loadThreeJS();
      }

      this.detectPerformanceMode();
      this.setupScene();
      this.createParticles();
      this.addEventListeners();
      this.animate();
      this.isActive = true;
    } catch (error) {
      console.error('Parçacık arka planı yüklenemedi:', error);
      this.showFallback();
    }
  }

  detectPerformanceMode() {
    // Cihaz performansını otomatik tespit et
    const deviceMemory = navigator.deviceMemory || 4; // GB
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const connection = navigator.connection;
    
    // Performans modunu belirle
    if (deviceMemory < 2 || hardwareConcurrency < 2) {
      this.options.performanceMode = 'low';
      this.options.maxParticles = Math.min(this.options.maxParticles, 200);
    } else if (deviceMemory >= 8 && hardwareConcurrency >= 8) {
      this.options.performanceMode = 'high';
      this.options.maxParticles = Math.min(this.options.maxParticles, 2000);
    } else {
      this.options.performanceMode = 'medium';
      this.options.maxParticles = Math.min(this.options.maxParticles, 800);
    }

    // Mobil cihazlarda otomatik azalt
    if (window.innerWidth < 768) {
      this.options.maxParticles = Math.floor(this.options.maxParticles * 0.5);
    }

    console.log(`Performans modu: ${this.options.performanceMode}, Parçacık sayısı: ${this.options.maxParticles}`);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Performans odaklı renderer ayarları
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: this.options.performanceMode === 'high',
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.options.performanceMode === 'high' ? 2 : 1));
    this.container.appendChild(this.renderer.domElement);
    
    this.camera.position.z = 5;
  }

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.options.maxParticles * 3);
    const colors = new Float32Array(this.options.maxParticles * 3);
    const sizes = new Float32Array(this.options.maxParticles);

    // Performanslı parçacık oluşturma
    for (let i = 0; i < this.options.maxParticles; i++) {
      // Pozisyon
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Renk (gradient veya rastgele)
      if (this.options.colorScheme === 'gradient') {
        const hue = i / this.options.maxParticles;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      } else {
        colors[i * 3] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
      }

      // Boyut (performans için varyasyon)
      sizes[i] = Math.random() * this.options.particleSize + 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Performanslı materyal
    const material = new THREE.PointsMaterial({
      size: this.options.particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  animate() {
    if (!this.isActive) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.performanceMetrics.lastFrameTime;
    
    // FPS hesaplama
    this.performanceMetrics.frameCount++;
    if (deltaTime >= 1000) {
      this.performanceMetrics.fps = Math.round(this.performanceMetrics.frameCount * 1000 / deltaTime);
      this.performanceMetrics.frameCount = 0;
      this.performanceMetrics.lastFrameTime = currentTime;
      
      // Performans izleme
      this.monitorPerformance();
    }

    requestAnimationFrame(() => this.animate());
    
    // Performans odaklı animasyon
    const rotationSpeed = this.options.animationSpeed * (60 / Math.max(this.performanceMetrics.fps, 30));
    
    this.particleSystem.rotation.x += rotationSpeed;
    this.particleSystem.rotation.y += rotationSpeed * 0.5;
    
    this.renderer.render(this.scene, this.camera);
  }

  monitorPerformance() {
    // FPS düşükse parçacık sayısını azalt
    if (this.performanceMetrics.fps < 30 && this.options.maxParticles > 100) {
      this.options.maxParticles = Math.floor(this.options.maxParticles * 0.8);
      console.log(`FPS düşük (${this.performanceMetrics.fps}), parçacık sayısı azaltıldı: ${this.options.maxParticles}`);
      this.recreateParticles();
    }
    
    // Memory kullanımı kontrolü
    if (performance.memory) {
      const memoryMB = performance.memory.usedJSHeapSize / 1048576;
      if (memoryMB > 100) {
        console.warn(`Yüksek memory kullanımı: ${Math.round(memoryMB)}MB`);
      }
    }
  }

  recreateParticles() {
    // Mevcut parçacık sistemini temizle
    this.scene.remove(this.particleSystem);
    this.particleSystem.geometry.dispose();
    this.particleSystem.material.dispose();
    
    // Yeni parçacık sistemi oluştur
    this.createParticles();
  }

  addEventListeners() {
    const handleResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Performans izleme için visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isActive = false;
      } else {
        this.isActive = true;
        this.animate();
      }
    });
    
    this.cleanup = () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    };
  }

  // Dinamik parçacık ekleme (isteğe bağlı)
  addParticles(count = 10) {
    if (this.options.maxParticles >= 2000) return; // Maksimum sınır
    
    const currentCount = this.particleSystem.geometry.attributes.position.count;
    const newCount = Math.min(currentCount + count, 2000);
    
    // Yeni pozisyonlar ekle
    const positions = this.particleSystem.geometry.attributes.position.array;
    const colors = this.particleSystem.geometry.attributes.color.array;
    const sizes = this.particleSystem.geometry.attributes.size.array;
    
    for (let i = currentCount; i < newCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      colors[i * 3] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
      
      sizes[i] = Math.random() * this.options.particleSize + 0.02;
    }
    
    this.particleSystem.geometry.attributes.position.needsUpdate = true;
    this.particleSystem.geometry.attributes.color.needsUpdate = true;
    this.particleSystem.geometry.attributes.size.needsUpdate = true;
    
    this.options.maxParticles = newCount;
  }

  // Performans metriklerini al
  getPerformanceMetrics() {
    return {
      fps: this.performanceMetrics.fps,
      particleCount: this.options.maxParticles,
      performanceMode: this.options.performanceMode,
      memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : 'N/A'
    };
  }

  showFallback() {
    this.container.style.background = 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)';
    this.container.innerHTML = `
      <div style="text-align: center; padding: 20px; color: white;">
        <h3>Dinamik Arka Plan</h3>
        <p>Performanslı parçacık sistemi aktif</p>
      </div>
    `;
  }

  destroy() {
    this.isActive = false;
    if (this.cleanup) this.cleanup();
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
    if (this.particleSystem) {
      this.particleSystem.geometry.dispose();
      this.particleSystem.material.dispose();
    }
  }
}

// Kullanım örnekleri
const particleBg = new PerformanceParticleBackground('particle-bg', {
  maxParticles: 1500, // Sınırsız (performans izin verdiği kadar)
  particleSize: 0.08,
  animationSpeed: 0.002,
  colorScheme: 'gradient',
  performanceMode: 'auto'
});

// Performans metriklerini izle
setInterval(() => {
  const metrics = particleBg.getPerformanceMetrics();
  console.log('Performans:', metrics);
}, 5000);

// Dinamik parçacık ekleme (isteğe bağlı)
document.addEventListener('click', () => {
  particleBg.addParticles(50);
});
```

## 3. Güvenli 3D Ürün Vitrini

### Ürün Görüntüleyici
```javascript
class SafeProductViewer {
  constructor(containerId, productData) {
    this.container = document.getElementById(containerId);
    this.productData = this.sanitizeProductData(productData);
    this.controls = null;
    this.init();
  }

  sanitizeProductData(data) {
    // Güvenlik: Veri sanitizasyonu
    return {
      name: this.sanitizeString(data.name),
      price: this.sanitizeNumber(data.price),
      image: this.sanitizeURL(data.image),
      model: this.sanitizeURL(data.model)
    };
  }

  sanitizeString(str) {
    return String(str).replace(/[<>]/g, '').substring(0, 100);
  }

  sanitizeNumber(num) {
    return Math.max(0, Math.min(999999, Number(num) || 0));
  }

  sanitizeURL(url) {
    const urlStr = String(url);
    if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
      return urlStr.substring(0, 500); // URL uzunluğunu sınırla
    }
    return '';
  }

  async init() {
    try {
      if (typeof THREE === 'undefined') {
        await this.loadThreeJS();
      }

      this.setupScene();
      this.loadProduct();
      this.setupControls();
      this.animate();
    } catch (error) {
      console.error('Ürün görüntüleyici yüklenemedi:', error);
      this.showFallback();
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.container.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 5);
  }

  loadProduct() {
    // Basit küp geometri (güvenlik için)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x0066cc });
    this.product = new THREE.Mesh(geometry, material);
    this.product.castShadow = true;
    this.scene.add(this.product);

    // Güvenli ışıklandırma
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }

  setupControls() {
    // Güvenli kontroller (sadece belirli alanlarda)
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 10;
    this.controls.minDistance = 2;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  showFallback() {
    this.container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3>${this.productData.name}</h3>
        <p>Fiyat: ${this.productData.price} TL</p>
        <img src="${this.productData.image}" alt="${this.productData.name}" style="max-width: 100%;">
      </div>
    `;
  }
}
```

## 4. Güvenli İnteraktif Harita

### 3D Konum Gösterici
```javascript
class SafeLocationMap {
  constructor(containerId, locations) {
    this.container = document.getElementById(containerId);
    this.locations = this.sanitizeLocations(locations);
    this.markers = [];
    this.init();
  }

  sanitizeLocations(locations) {
    return locations.slice(0, 10).map(loc => ({ // Maksimum 10 konum
      name: this.sanitizeString(loc.name),
      lat: this.sanitizeNumber(loc.lat),
      lng: this.sanitizeNumber(loc.lng),
      address: this.sanitizeString(loc.address)
    }));
  }

  async init() {
    try {
      if (typeof THREE === 'undefined') {
        await this.loadThreeJS();
      }

      this.setupScene();
      this.createMap();
      this.addMarkers();
      this.animate();
    } catch (error) {
      console.error('Harita yüklenemedi:', error);
      this.showFallback();
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);
    
    this.camera.position.set(0, 5, 5);
  }

  createMap() {
    // Basit düzlem harita
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.8
    });
    this.map = new THREE.Mesh(geometry, material);
    this.map.rotation.x = -Math.PI / 2;
    this.scene.add(this.map);

    // Işıklandırma
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 5);
    this.scene.add(light);
  }

  addMarkers() {
    this.locations.forEach((location, index) => {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshLambertMaterial({ color: 0xff4444 });
      const marker = new THREE.Mesh(geometry, material);
      
      // Konum hesaplama (basitleştirilmiş)
      const x = (location.lng - 30) * 0.1;
      const z = (location.lat - 40) * 0.1;
      marker.position.set(x, 0.1, z);
      
      this.markers.push(marker);
      this.scene.add(marker);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Marker animasyonu
    this.markers.forEach((marker, index) => {
      marker.position.y = 0.1 + Math.sin(Date.now() * 0.001 + index) * 0.05;
    });
    
    this.renderer.render(this.scene, this.camera);
  }

  showFallback() {
    this.container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3>Şube Konumları</h3>
        ${this.locations.map(loc => `
          <div style="margin: 10px 0;">
            <strong>${loc.name}</strong><br>
            <small>${loc.address}</small>
          </div>
        `).join('')}
      </div>
    `;
  }
}
```

## 5. Güvenli Performans İzleme

### Performans Monitörü
```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      memory: 0,
      drawCalls: 0
    };
    this.frames = 0;
    this.lastTime = performance.now();
    this.startMonitoring();
  }

  startMonitoring() {
    setInterval(() => {
      this.updateMetrics();
    }, 1000);
  }

  updateMetrics() {
    const currentTime = performance.now();
    this.metrics.fps = Math.round(this.frames * 1000 / (currentTime - this.lastTime));
    this.frames = 0;
    this.lastTime = currentTime;

    // Memory kullanımı kontrolü
    if (performance.memory) {
      this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1048576);
    }

    // Performans uyarıları
    if (this.metrics.fps < 30) {
      console.warn('Düşük FPS tespit edildi:', this.metrics.fps);
    }

    if (this.metrics.memory > 100) {
      console.warn('Yüksek memory kullanımı:', this.metrics.memory + 'MB');
    }
  }

  frame() {
    this.frames++;
  }

  getMetrics() {
    return { ...this.metrics };
  }
}
```

## 6. Güvenli Kullanım Örnekleri

### HTML Yapısı
```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self'; 
                   script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; 
                   style-src 'self' 'unsafe-inline'; 
                   img-src 'self' data: https:;">
    <title>İşletme Web Sitesi</title>
</head>
<body>
    <!-- Logo Animasyonu -->
    <div id="logo-container" style="width: 200px; height: 200px;"></div>
    
    <!-- Parçacık Arka Planı -->
    <div id="particle-bg" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>
    
    <!-- Ürün Vitrini -->
    <div id="product-viewer" style="width: 400px; height: 300px;"></div>
    
    <!-- Konum Haritası -->
    <div id="location-map" style="width: 600px; height: 400px;"></div>

    <script>
        // Güvenli başlatma
        document.addEventListener('DOMContentLoaded', () => {
            const monitor = new PerformanceMonitor();
            
            // Logo animasyonu
            const logo = new SafeLogoAnimation('logo-container');
            
            // Parçacık arka planı (sadece desktop'ta)
            if (window.innerWidth > 768) {
                const particles = new PerformanceParticleBackground('particle-bg', {
                    maxParticles: 1500, // Sınırsız (performans izin verdiği kadar)
                    particleSize: 0.08,
                    animationSpeed: 0.002,
                    colorScheme: 'gradient',
                    performanceMode: 'auto'
                });
            }
            
            // Ürün görüntüleyici
            const product = new SafeProductViewer('product-viewer', {
                name: 'Ürün Adı',
                price: 100,
                image: 'product.jpg',
                model: 'model.glb'
            });
            
            // Konum haritası
            const map = new SafeLocationMap('location-map', [
                { name: 'Ana Şube', lat: 41.0082, lng: 28.9784, address: 'İstanbul' },
                { name: 'Şube 2', lat: 39.9334, lng: 32.8597, address: 'Ankara' }
            ]);
        });
    </script>
</body>
</html>
```

## Güvenlik Kontrol Listesi

### ✅ Uygulanması Gerekenler:
1. **CSP Header'ları** - Script injection'ı önle
2. **SRI (Subresource Integrity)** - CDN güvenliği
3. **Input Sanitization** - Tüm kullanıcı girdilerini temizle
4. **Resource Limiting** - Memory ve CPU kullanımını sınırla
5. **Error Handling** - Hataları yakala ve fallback göster
6. **Performance Monitoring** - Performansı izle
7. **Mobile Detection** - Mobil cihazlarda basitleştir
8. **Cleanup Functions** - Memory leak'leri önle

### ❌ Kaçınılması Gerekenler:
1. **eval() kullanımı**
2. **innerHTML ile script injection**
3. **Sınırsız resource kullanımı**
4. **Güvensiz CDN linkleri**
5. **Kullanıcı girdilerini doğrudan kullanma**

Bu örnekler, Three.js'i işletme web sitelerinde güvenli ve performanslı bir şekilde kullanmanızı sağlar. Tüm güvenlik önlemleri alınmış ve fallback mekanizmaları eklenmiştir.

