# ✨ Particle Canvas - Animasyonlu Arka Plan Sistemi

## 📋 Özellikler
- **Canvas Animation**: HTML5 Canvas tabanlı animasyonlar
- **Food-themed Particles**: Yemek emoji'li parçacıklar
- **Responsive Design**: Ekran boyutuna uyumlu
- **Theme Support**: Dark/Light tema desteği
- **Performance Optimized**: RequestAnimationFrame kullanımı
- **Smooth Movement**: Yumuşak hareket algoritması

## 🎯 Kullanım Alanları
- Dashboard arka plan animasyonları
- Landing page hero sections
- Loading screen animasyonları
- Interactive background effects
- Brand identity animasyonları

## 💡 En Etkileyici Özellikler

### 1. Food Particle Class Implementation
```typescript
class FoodParticle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  emoji: string

  constructor() {
    if (!canvas) {
      this.x = 0;
      this.y = 0;
      this.size = 10;
      this.speedX = 0;
      this.speedY = 0;
      this.color = theme === "dark" ? "#f97316" : "#ea580c";
      this.emoji = "🍕";
      return;
    }
    
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 20 + 10
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.color = theme === "dark" ? "#f97316" : "#ea580c"
    this.emoji = ["🍕", "🍔", "🍟", "🥗", "🍖"][Math.floor(Math.random() * 5)]
  }

  update() {
    if (!canvas) return;
    
    this.x += this.speedX
    this.y += this.speedY

    // Bounce off walls
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
  }

  draw() {
    if (!ctx) return;
    
    ctx.font = `${this.size}px Arial`
    ctx.fillText(this.emoji, this.x, this.y)
  }
}
```

### 2. Responsive Canvas Resizing
```typescript
const resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

// Initial resize
resizeCanvas()

// Handle window resize
window.addEventListener('resize', resizeCanvas)
```

### 3. Animation Loop with RequestAnimationFrame
```typescript
function animate() {
  if (!ctx || !canvas) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update and draw all particles
  particles.forEach(particle => {
    particle.update()
    particle.draw()
  })

  // Continue animation loop
  animationId = requestAnimationFrame(animate)
}

// Start animation
animate()
```

### 4. Theme-aware Color System
```typescript
this.color = theme === "dark" ? "#f97316" : "#ea580c"
this.emoji = ["🍕", "🍔", "🍟", "🥗", "🍖"][Math.floor(Math.random() * 5)]
```

## 🎨 Görsel Efektler
- **Emoji Particles**: Yemek temalı emoji'ler
- **Smooth Movement**: Yumuşak hareket algoritması
- **Wall Bouncing**: Kenarlara çarpma efekti
- **Random Sizing**: Rastgele boyutlandırma
- **Theme Colors**: Tema uyumlu renkler

## ⚡ Performans Optimizasyonları
- **RequestAnimationFrame**: Smooth 60fps animasyon
- **Canvas Clearing**: Efficient canvas temizleme
- **Particle Pooling**: Optimized particle yönetimi
- **Resize Handling**: Efficient window resize handling

## 🔧 Customization Options
- **Particle Count**: Configurable particle sayısı
- **Movement Speed**: Adjustable hareket hızı
- **Emoji Set**: Custom emoji koleksiyonu
- **Color Palette**: Theme-specific renkler
- **Size Range**: Configurable boyut aralığı

## 📱 Responsive Features
- **Full Screen**: Tam ekran canvas
- **Mobile Optimized**: Touch-friendly
- **Performance Scaling**: Device performance'a göre ölçekleme
- **Battery Friendly**: Optimized battery usage 