# 🛡️ YemekZen Simple Backup System v1.0

param(
    [string]$BackupName = "backup-v1",
    [string]$BackupPath = ".\backups"
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
    "scripts"
)

foreach ($file in $sourceFiles) {
    if (Test-Path $file) {
        $destination = "$backupFolder\$file"
        Copy-Item -Path $file -Destination $destination -Recurse -Force
        Write-Host "✅ $file yedeklendi" -ForegroundColor Green
    }
}

# 3. Konfigürasyon dosyalarını yedekle
Write-Host "🔧 Konfigürasyon dosyaları yedekleniyor..." -ForegroundColor Yellow

$configFiles = @(
    "package.json",
    "package-lock.json",
    ".env.local",
    "next.config.js",
    "tailwind.config.js",
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

# 4. Backup'i sıkıştır
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

# 5. Sonuç raporu
Write-Host ""
Write-Host "🎉 Backup Başarıyla Tamamlandı!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host "📁 Backup Konumu: $BackupPath" -ForegroundColor Cyan
Write-Host "🗜️ Sıkıştırılmış Dosya: $compressedFile" -ForegroundColor Cyan
Write-Host "📏 Sıkıştırılmış Boyut: $compressedSize MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "🛡️ Proje güvenli bir şekilde yedeklendi!" -ForegroundColor Green 