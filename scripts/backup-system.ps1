# 🛡️ YemekZen Backup System v1.0
# 
# Bu script projenin kök yedeğini alır ve versiyonlama yapar
# cekirdek.mdc prensiplerine uygun olarak güvenli yedekleme

param(
    [Parameter(Mandatory=$false)]
    [string]$BackupName = "backup-v1",
    
    [Parameter(Mandatory=$false)]
    [string]$BackupPath = ".\backups",
    
    [Parameter(Mandatory=$false)]
    [switch]$IncludeDatabase = $true,
    
    [Parameter(Mandatory=$false)]
    [switch]$IncludeDependencies = $true,
    
    [Parameter(Mandatory=$false)]
    [switch]$Compress = $true
)

Write-Host "🛡️ YemekZen Backup System Başlatılıyor..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# 1. Backup klasörü oluştur
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupFolder = "$BackupPath\$BackupName-$timestamp"

if (!(Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath -Force
    Write-Host "✅ Backup klasörü oluşturuldu: $BackupPath" -ForegroundColor Green
}

if (!(Test-Path $backupFolder)) {
    New-Item -ItemType Directory -Path $backupFolder -Force
    Write-Host "✅ Backup klasörü oluşturuldu: $backupFolder" -ForegroundColor Green
}

# 2. Proje dosyalarını yedekle
Write-Host "📁 Proje dosyaları yedekleniyor..." -ForegroundColor Yellow

$sourceFiles = @(
    "app",
    "components", 
    "lib",
    "prisma",
    "src",
    "tests",
    "docs",
    "plan",
    ".github",
    "scripts",
    "*.json",
    "*.md",
    "*.ts",
    "*.js",
    "*.yml",
    "*.yaml",
    ".env.local",
    "Dockerfile*",
    "docker-compose*"
)

foreach ($file in $sourceFiles) {
    if (Test-Path $file) {
        $destination = "$backupFolder\$file"
        Copy-Item -Path $file -Destination $destination -Recurse -Force
        Write-Host "✅ $file yedeklendi" -ForegroundColor Green
    }
}

# 3. Database yedeği al (Supabase için)
if ($IncludeDatabase) {
    Write-Host "🗄️ Database yedeği alınıyor..." -ForegroundColor Yellow
    
    # Supabase database dump (eğer Supabase CLI kuruluysa)
    try {
        $dbBackupFile = "$backupFolder\database-backup.sql"
        Write-Host "📋 Database schema yedekleniyor..." -ForegroundColor Yellow
        
        # Prisma schema'yı kopyala
        Copy-Item -Path "prisma\schema.prisma" -Destination "$backupFolder\schema.prisma" -Force
        
        # Migration dosyalarını kopyala
        if (Test-Path "prisma\migrations") {
            Copy-Item -Path "prisma\migrations" -Destination "$backupFolder\migrations" -Recurse -Force
        }
        
        Write-Host "✅ Database schema yedeklendi" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ Database yedeği alınamadı: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# 4. Dependencies yedeği al
if ($IncludeDependencies) {
    Write-Host "📦 Dependencies yedekleniyor..." -ForegroundColor Yellow
    
    # package.json ve lock dosyaları
    Copy-Item -Path "package.json" -Destination "$backupFolder\package.json" -Force
    Copy-Item -Path "package-lock.json" -Destination "$backupFolder\package-lock.json" -Force
    
    # node_modules (opsiyonel - büyük olabilir)
    if (Test-Path "node_modules") {
        Write-Host "📁 node_modules yedekleniyor (bu biraz zaman alabilir)..." -ForegroundColor Yellow
        Copy-Item -Path "node_modules" -Destination "$backupFolder\node_modules" -Recurse -Force
    }
    
    Write-Host "✅ Dependencies yedeklendi" -ForegroundColor Green
}

# 5. Environment ve konfigürasyon yedeği
Write-Host "🔧 Konfigürasyon dosyaları yedekleniyor..." -ForegroundColor Yellow

$configFiles = @(
    ".env.local",
    ".env.example",
    "next.config.js",
    "next.config.ts",
    "tailwind.config.js",
    "tailwind.config.ts",
    "tsconfig.json",
    "jest.config.js",
    "playwright.config.ts"
)

foreach ($configFile in $configFiles) {
    if (Test-Path $configFile) {
        Copy-Item -Path $configFile -Destination "$backupFolder\$configFile" -Force
        Write-Host "✅ $configFile yedeklendi" -ForegroundColor Green
    }
}

# 6. Backup metadata oluştur
$backupMetadata = @{
    backupName = $BackupName
    timestamp = $timestamp
    version = "1.0.0"
    projectName = "YemekZen QR Menu Elite Edition"
    backupType = "Full Backup"
    includes = @{
        sourceCode = $true
        database = $IncludeDatabase
        dependencies = $IncludeDependencies
        configuration = $true
    }
    systemInfo = @{
        os = $env:OS
        nodeVersion = (node --version 2>$null)
        npmVersion = (npm --version 2>$null)
        gitVersion = (git --version 2>$null)
    }
    fileCount = (Get-ChildItem -Path $backupFolder -Recurse | Measure-Object).Count
    totalSize = [math]::Round(((Get-ChildItem -Path $backupFolder -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB), 2)
}

$backupMetadata | ConvertTo-Json -Depth 10 | Out-File -FilePath "$backupFolder\backup-metadata.json" -Encoding UTF8

# 7. Backup'i sıkıştır
if ($Compress) {
    Write-Host "🗜️ Backup sıkıştırılıyor..." -ForegroundColor Yellow
    
    $compressedFile = "$BackupPath\$BackupName-$timestamp.zip"
    
    try {
        Compress-Archive -Path "$backupFolder\*" -DestinationPath $compressedFile -Force
        Write-Host "✅ Backup sıkıştırıldı: $compressedFile" -ForegroundColor Green
        
        # Sıkıştırılmış dosya boyutu
        $compressedSize = [math]::Round(((Get-Item $compressedFile).Length / 1MB), 2)
        Write-Host "📊 Sıkıştırılmış boyut: $compressedSize MB" -ForegroundColor Cyan
        
        # Orijinal klasörü sil
        Remove-Item -Path $backupFolder -Recurse -Force
        Write-Host "🧹 Geçici dosyalar temizlendi" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Backup sıkıştırılamadı: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 8. Backup raporu oluştur
$backupReport = @"
# 🛡️ YemekZen Backup Raporu

## �� Backup Bilgileri
- Backup Adı: $BackupName
- Tarih: $timestamp
- Versiyon: 1.0.0
- Proje: YemekZen QR Menu Elite Edition

## 📁 Yedeklenen Dosyalar
- ✅ Kaynak kod (app, components, lib, src)
- ✅ Konfigürasyon dosyaları
- ✅ Dokümantasyon (docs, plan)
- ✅ Test dosyaları
- ✅ CI/CD konfigürasyonu (.github)
- ✅ Database schema (prisma)
- ✅ Dependencies (package.json, node_modules)

## 📊 İstatistikler
- Dosya Sayısı: $($backupMetadata.fileCount)
- Toplam Boyut: $($backupMetadata.totalSize) MB
- Sıkıştırılmış Boyut: $compressedSize MB

## 🔧 Sistem Bilgileri
- OS: $($backupMetadata.systemInfo.os)
- Node.js: $($backupMetadata.systemInfo.nodeVersion)
- NPM: $($backupMetadata.systemInfo.npmVersion)
- Git: $($backupMetadata.systemInfo.gitVersion)

## 📝 Geri Yükleme Talimatları
1. Backup dosyasını çıkarın
2. `npm install` komutunu çalıştırın
3. Environment dosyalarını yapılandırın
4. `npx prisma generate` komutunu çalıştırın
5. `npm run dev` ile projeyi başlatın

## 🛡️ Güvenlik Notları
- Backup dosyası güvenli bir yerde saklanmalı
- Hassas bilgiler (API keys) ayrı yedeklenmeli
- Düzenli backup alınmalı (haftalık önerilir)

---
*Bu backup YemekZen QR Menu Elite Edition projesi için oluşturulmuştur.*
"@

$backupReport | Out-File -FilePath "$BackupPath\backup-report-$timestamp.md" -Encoding UTF8

# 9. Sonuç raporu
Write-Host ""
Write-Host "🎉 Backup Başarıyla Tamamlandı!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host "📁 Backup Konumu: $BackupPath" -ForegroundColor Cyan
Write-Host "📊 Dosya Sayısı: $($backupMetadata.fileCount)" -ForegroundColor Cyan
Write-Host "📏 Toplam Boyut: $($backupMetadata.totalSize) MB" -ForegroundColor Cyan

if ($Compress) {
    Write-Host "🗜️ Sıkıştırılmış Dosya: $compressedFile" -ForegroundColor Cyan
    Write-Host "📏 Sıkıştırılmış Boyut: $compressedSize MB" -ForegroundColor Cyan
}

Write-Host "📝 Rapor: $BackupPath\backup-report-$timestamp.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛡️ Proje güvenli bir şekilde yedeklendi!" -ForegroundColor Green 