# 🚀 GitHub CI/CD Kurulum Rehberi

Bu rehber, YemekZen projesi için GitHub CI/CD süreçlerini kurmanızı sağlar.

## 📋 İçindekiler

- [Ön Gereksinimler](#ön-gereksinimler)
- [GitHub Repository Kurulumu](#github-repository-kurulumu)
- [CI/CD Pipeline Yapılandırması](#cicd-pipeline-yapılandırması)
- [Local Runner Kurulumu](#local-runner-kurulumu)
- [Self-Hosted Runner Kurulumu](#self-hosted-runner-kurulumu)
- [GitHub Actions Secrets](#github-actions-secrets)
- [Test ve Doğrulama](#test-ve-doğrulama)
- [Sorun Giderme](#sorun-giderme)

## 🎯 Ön Gereksinimler

### Gerekli Araçlar
- [GitHub CLI](https://cli.github.com/) - GitHub repository yönetimi için
- [Node.js 18+](https://nodejs.org/) - Proje geliştirme için
- [Git](https://git-scm.com/) - Versiyon kontrolü için
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - Containerization için

### GitHub Hesabı
- GitHub hesabınızda repository oluşturma yetkisi
- GitHub Actions kullanım izni
- GitHub Packages erişimi (opsiyonel)

## 🔧 GitHub Repository Kurulumu

### 1. Otomatik Kurulum (Önerilen)

PowerShell script'ini kullanarak otomatik kurulum:

```powershell
# Script'i çalıştırma
.\scripts\github-setup.ps1 -RepositoryName "yemekzen-qr-menu" -GitHubUsername "your-username" -Private -InitializeLocal
```

### 2. Manuel Kurulum

#### 2.1 GitHub CLI Kurulumu
```powershell
# Chocolatey ile kurulum
choco install gh

# Veya winget ile
winget install GitHub.cli
```

#### 2.2 GitHub Authentication
```powershell
# GitHub'a giriş yapma
gh auth login
```

#### 2.3 Repository Oluşturma
```powershell
# Private repository oluşturma
gh repo create yemekzen-qr-menu --private --description "YemekZen QR Menu Elite Edition" --source
```

#### 2.4 Local Repository Ayarları
```powershell
# Remote origin ekleme
git remote add origin https://github.com/your-username/yemekzen-qr-menu.git

# Main branch ayarlama
git branch -M main

# İlk commit ve push
git add .
git commit -m "🚀 Initial commit: YemekZen QR Menu Elite Edition"
git push -u origin main
```

## 🔄 CI/CD Pipeline Yapılandırması

### Mevcut Pipeline Özellikleri

✅ **Kapsamlı Test Süreci**
- Cross-platform testing (Ubuntu, Windows)
- Multiple Node.js versions (18, 20)
- Unit tests (Jest)
- E2E tests (Playwright)
- Coverage reporting (Codecov)

✅ **Güvenlik Taramaları**
- npm audit
- Snyk security scanning
- CodeQL analysis
- Hadolint (Dockerfile linting)

✅ **Build ve Deployment**
- Multi-platform Docker builds (AMD64, ARM64)
- GitHub Container Registry
- Staging ve Production environments
- Performance ve Accessibility testing

✅ **Quality Assurance**
- ESLint linting
- TypeScript type checking
- Prettier formatting
- YAML linting

### Pipeline Akışı

```mermaid
graph TD
    A[Push/PR] --> B[Lint & Quality]
    B --> C[Security Scan]
    C --> D[Tests]
    D --> E[Build]
    E --> F[Docker Build]
    F --> G[Deploy Staging]
    G --> H[Performance Tests]
    H --> I[Deploy Production]
```

## 🤖 Local Runner Kurulumu

### 1. Self-Hosted Runner Script'i

```powershell
# Self-hosted runner kurulumu
.\scripts\setup-self-hosted-runner.ps1 -RepositoryName "yemekzen-qr-menu" -GitHubUsername "your-username" -RunnerName "local-runner" -InstallDependencies
```

### 2. Manuel Runner Kurulumu

#### 2.1 Runner Token Alma
1. GitHub repository'ye gidin
2. Settings > Actions > Runners
3. "New self-hosted runner" butonuna tıklayın
4. Windows x64 runner için token'ı kopyalayın

#### 2.2 Runner Kurulumu
```powershell
# Runner dizini oluşturma
mkdir C:\actions-runner
cd C:\actions-runner

# Runner dosyalarını indirme
Invoke-WebRequest -Uri "https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip" -OutFile "actions-runner-win-x64.zip"

# Dosyaları çıkarma
Expand-Archive -Path "actions-runner-win-x64.zip" -DestinationPath . -Force

# Runner'ı yapılandırma
.\config.cmd --url https://github.com/your-username/yemekzen-qr-menu --token YOUR_TOKEN --name local-runner --unattended

# Runner servisini kurma
.\svc.install
.\svc.start
```

### 3. Runner Yönetimi

```powershell
# Runner durumu kontrolü
.\svc.status

# Runner başlatma
.\svc.start

# Runner durdurma
.\svc.stop

# Runner kaldırma
.\svc.uninstall
```

## 🔐 GitHub Actions Secrets

### Gerekli Secrets

Aşağıdaki secrets'ları GitHub repository settings > Secrets and variables > Actions bölümünde ayarlayın:

#### 🔑 Temel Secrets
- `SNYK_TOKEN` - Snyk security scanning için
- `STAGING_URL` - Staging environment URL'i
- `PRODUCTION_URL` - Production environment URL'i

#### 🗄️ Database Secrets
- `DATABASE_URL` - Production database connection string
- `DIRECT_URL` - Direct database connection (Prisma için)

#### 🔐 Authentication Secrets
- `JWT_SECRET` - JWT token signing secret
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - NextAuth.js URL

#### ☁️ Supabase Secrets
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

#### 📧 Email Secrets
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

#### 📊 Monitoring Secrets
- `SENTRY_DSN` - Sentry error tracking DSN
- `SENTRY_AUTH_TOKEN` - Sentry authentication token

### Secret Ayarlama

```powershell
# GitHub CLI ile secret ayarlama (örnek)
gh secret set SNYK_TOKEN --body "your-snyk-token"
gh secret set DATABASE_URL --body "postgresql://user:pass@host:port/db"
```

## 🧪 Test ve Doğrulama

### 1. Pipeline Testi

```powershell
# Test workflow'u manuel tetikleme
gh workflow run "Local Runner Support" -f runner_type=local -f environment=development
```

### 2. Runner Testi

```powershell
# Runner durumu kontrolü
cd C:\actions-runner
.\svc.status

# Runner log'larını kontrol etme
Get-Content _diag\*.log
```

### 3. Local Test

```powershell
# Local test çalıştırma
npm run lint
npm test
npm run test:e2e
npm run build
```

## 🔧 Sorun Giderme

### Yaygın Sorunlar

#### ❌ Runner Bağlantı Sorunu
```powershell
# Runner'ı yeniden başlatma
cd C:\actions-runner
.\svc.stop
.\svc.start
```

#### ❌ Token Geçersiz
1. GitHub'da yeni runner token alın
2. Eski runner'ı kaldırın: `.\svc.uninstall`
3. Yeni token ile yeniden kurun

#### ❌ Docker Build Hatası
```powershell
# Docker service kontrolü
docker --version
docker ps

# Docker Desktop'ı yeniden başlatma
Restart-Service -Name "com.docker.service"
```

#### ❌ Node.js Versiyon Sorunu
```powershell
# Node.js versiyon kontrolü
node --version

# Node.js güncelleme
choco upgrade nodejs
```

### Log Kontrolü

```powershell
# GitHub Actions log'ları
gh run list --limit 10

# Belirli bir run'ın log'ları
gh run view RUN_ID --log

# Runner log'ları
Get-Content C:\actions-runner\_diag\*.log
```

## 📊 Monitoring ve Analytics

### GitHub Actions Metrics
- Workflow run sayısı
- Başarı oranı
- Ortalama çalışma süresi
- Queue time

### Runner Metrics
- Runner uptime
- Job completion rate
- Resource usage
- Error rate

### Performance Metrics
- Build time
- Test execution time
- Deployment time
- Resource consumption

## 🔄 Güncelleme ve Bakım

### Runner Güncelleme
```powershell
# Runner'ı güncelleme
cd C:\actions-runner
.\svc.stop
.\config.cmd remove --token YOUR_TOKEN
# Yeni runner versiyonunu indirin ve kurun
.\config.cmd --url https://github.com/your-username/yemekzen-qr-menu --token YOUR_TOKEN --name local-runner
.\svc.install
.\svc.start
```

### Pipeline Güncelleme
- `.github/workflows/ci-cd.yml` dosyasını güncelleyin
- Yeni özellikler ekleyin
- Performance optimizasyonları yapın

### Regular Maintenance
- Runner log'larını temizleme
- Disk space kontrolü
- Security updates
- Dependency updates

## 📚 Faydalı Linkler

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Self-Hosted Runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [GitHub CLI](https://cli.github.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🆘 Destek

Sorun yaşarsanız:
1. Bu rehberi tekrar kontrol edin
2. GitHub Actions log'larını inceleyin
3. Runner log'larını kontrol edin
4. GitHub Issues'da sorun bildirin 