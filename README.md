# 🎓 BizGenciz - Üniversitelilerin Sosyal Platformu

Üniversite öğrencileri için geliştirilmiş modern sosyal platform - T3 Stack ile geliştirilmiş web uygulaması.

## 🚀 Teknoloji Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4, Shadcn/ui
- **Backend:** tRPC, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Authentication:** NextAuth.js
- **State Management:** Zustand, React Query
- **3D Graphics:** Three.js, React Three Fiber
- **Testing:** Playwright, Jest
- **Deployment:** Docker, Vercel
- **CI/CD:** GitHub Actions, Cross-platform testing

## 📋 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- PostgreSQL veritabanı (Supabase önerilir)

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/Kerimtunc/bizgenciz-social.git
cd bizgenciz-social
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 3: Environment Variables

```bash
# env.example dosyasını .env olarak kopyalayın
cp env.example .env

# .env dosyasını düzenleyin
# Gerekli değerleri doldurun
```

### Adım 4: Veritabanı Kurulumu

```bash
# Prisma client'ı oluşturun
npx prisma generate

# Veritabanı migration'larını çalıştırın
npx prisma migrate dev

# Seed data'yı yükleyin (opsiyonel)
npx prisma db seed
```

### Adım 5: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🏗️ Proje Yapısı

```
bizgenciz-social/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Admin panel routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   └── 3d/               # Three.js components
├── lib/                   # Utility functions
│   ├── prisma.ts         # Database client
│   ├── trpc.ts           # tRPC configuration
│   └── auth.ts           # Authentication config
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
├── styles/               # Additional styles
├── tests/                # Test files
└── public/               # Static assets
```

## 🔧 Kullanılabilir Scriptler

```bash
# Geliştirme
npm run dev              # Geliştirme sunucusu
npm run build            # Production build
npm run start            # Production sunucusu

# Test
npm run test             # Jest unit tests
npm run test:e2e         # Playwright E2E tests
npm run test:ui          # Test UI
npm run test:headed      # Headed tests
npm run test:debug       # Debug tests

# Linting
npm run lint             # ESLint
npm run lint:fix         # ESLint fix

# Database
npx prisma studio        # Database GUI
npx prisma migrate dev   # Migration
npx prisma generate      # Client generation
```

## 🌐 Environment Variables

Gerekli environment variables:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

## 🚀 Deployment

### Vercel (Önerilen)

1. Vercel hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Environment variables'ları ayarlayın
4. Deploy edin

### Docker

```bash
# Build image
docker build -t bizgenciz-social .

# Run container
docker run -p 3000:3000 bizgenciz-social
```

## 🧪 CI/CD Pipeline

Proje hybrid CI/CD pipeline kullanır:

- **Self-hosted runner**: Local Windows environment
- **GitHub hosted runners**: Ubuntu, Windows, macOS
- **Cross-platform testing**: Node.js 18 & 20
- **Docker testing**: Production environment simulation

### Test Edilen Platformlar

- ✅ **Windows 11** (GitHub hosted + Self-hosted)
- ✅ **Ubuntu Latest** (GitHub hosted)
- ✅ **macOS Latest** (GitHub hosted)
- ✅ **Debian Linux** (Docker containers)

## 📱 Özellikler

- **Sosyal Profil:** Üniversite öğrencileri için profil sistemi
- **Arkadaşlık Sistemi:** Öğrenciler arası bağlantı kurma
- **Grup Oluşturma:** Üniversite grupları ve topluluklar
- **3D Görselleştirme:** Three.js ile 3D profil kartları
- **Responsive Design:** Mobile-first yaklaşım
- **Real-time Chat:** Canlı mesajlaşma
- **Multi-language:** Çoklu dil desteği
- **Analytics:** Platform kullanım istatistikleri
- **Cross-platform:** Tüm platformlarda test edilmiş

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

Sorunlarınız için GitHub Issues kullanın veya [destek@bizgenciz.com](mailto:destek@bizgenciz.com) adresine yazın.

---

**BizGenciz Team** 🎓