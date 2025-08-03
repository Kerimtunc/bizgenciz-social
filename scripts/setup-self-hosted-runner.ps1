# Self-Hosted GitHub Runner Kurulum Script'i
# Bu script local veya self-hosted runner kurulumu yapar

param(
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName,
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RunnerName = "local-runner",
    
    [Parameter(Mandatory=$false)]
    [switch]$InstallDependencies = $true
)

Write-Host "🤖 Self-Hosted GitHub Runner Kurulum Script'i" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# 1. Sistem kontrolü
Write-Host "📋 Sistem kontrolü yapılıyor..." -ForegroundColor Yellow

# Windows kontrolü
if ($PSVersionTable.Platform -eq "Unix") {
    Write-Host "❌ Bu script Windows için tasarlanmıştır" -ForegroundColor Red
    exit 1
}

# PowerShell versiyon kontrolü
if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-Host "❌ PowerShell 5.0 veya üzeri gerekli" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Sistem uyumlu" -ForegroundColor Green

# 2. Gerekli araçların kurulumu
if ($InstallDependencies) {
    Write-Host "📦 Gerekli araçlar kuruluyor..." -ForegroundColor Yellow
    
    # Chocolatey kontrolü ve kurulumu
    if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "🍫 Chocolatey kuruluyor..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    }
    
    # Node.js kurulumu
    if (!(Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Node.js kuruluyor..." -ForegroundColor Yellow
        choco install nodejs -y
    }
    
    # Git kurulumu
    if (!(Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Git kuruluyor..." -ForegroundColor Yellow
        choco install git -y
    }
    
    # Docker Desktop kurulumu (opsiyonel)
    if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "🐳 Docker Desktop kuruluyor..." -ForegroundColor Yellow
        choco install docker-desktop -y
    }
    
    Write-Host "✅ Gerekli araçlar kuruldu" -ForegroundColor Green
}

# 3. GitHub Runner kurulumu
Write-Host "🤖 GitHub Runner kuruluyor..." -ForegroundColor Yellow

# Runner dizini oluşturma
$runnerDir = "C:\actions-runner"
if (!(Test-Path $runnerDir)) {
    New-Item -ItemType Directory -Path $runnerDir -Force
    Write-Host "✅ Runner dizini oluşturuldu: $runnerDir" -ForegroundColor Green
}

# Runner token alma
Write-Host "🔐 Runner token alınıyor..." -ForegroundColor Yellow
Write-Host "GitHub'da repository settings > Actions > Runners bölümünden 'New self-hosted runner' butonuna tıklayın" -ForegroundColor Cyan
Write-Host "Windows x64 runner için token'ı kopyalayın" -ForegroundColor Cyan

$runnerToken = Read-Host "Runner token'ı girin"

if ([string]::IsNullOrEmpty($runnerToken)) {
    Write-Host "❌ Runner token gerekli" -ForegroundColor Red
    exit 1
}

# Runner kurulumu
Set-Location $runnerDir

# Runner dosyalarını indirme
$runnerUrl = "https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip"
$runnerZip = "actions-runner-win-x64.zip"

Write-Host "📥 Runner dosyaları indiriliyor..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $runnerUrl -OutFile $runnerZip

# Dosyaları çıkarma
Write-Host "📦 Runner dosyaları çıkarılıyor..." -ForegroundColor Yellow
Expand-Archive -Path $runnerZip -DestinationPath . -Force

# Runner'ı yapılandırma
Write-Host "⚙️ Runner yapılandırılıyor..." -ForegroundColor Yellow
$configCommand = ".\config.cmd --url https://github.com/$GitHubUsername/$RepositoryName --token $runnerToken --name $RunnerName --unattended"
Write-Host "Komut: $configCommand" -ForegroundColor Gray

try {
    Invoke-Expression $configCommand
    Write-Host "✅ Runner yapılandırıldı" -ForegroundColor Green
} catch {
    Write-Host "❌ Runner yapılandırma hatası: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 4. Runner servisini kurma
Write-Host "🔧 Runner servisi kuruluyor..." -ForegroundColor Yellow

try {
    .\svc.install
    .\svc.start
    Write-Host "✅ Runner servisi kuruldu ve başlatıldı" -ForegroundColor Green
} catch {
    Write-Host "❌ Runner servis kurulum hatası: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Environment variables ayarlama
Write-Host "🔧 Environment variables ayarlanıyor..." -ForegroundColor Yellow

$envVars = @{
    "NODE_ENV" = "production"
    "CI" = "true"
    "RUNNER_OS" = "Windows"
    "RUNNER_ARCH" = "X64"
}

foreach ($key in $envVars.Keys) {
    [Environment]::SetEnvironmentVariable($key, $envVars[$key], "Machine")
    Write-Host "✅ $key = $($envVars[$key])" -ForegroundColor Green
}

# 6. Runner durumu kontrolü
Write-Host "📊 Runner durumu kontrol ediliyor..." -ForegroundColor Yellow

try {
    $runnerStatus = .\svc.status
    Write-Host "✅ Runner durumu: $runnerStatus" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Runner durumu kontrol edilemedi" -ForegroundColor Yellow
}

# 7. Sonuç
Write-Host ""
Write-Host "🎉 Self-Hosted Runner Kurulumu Tamamlandı!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host "Runner Adı: $RunnerName" -ForegroundColor Cyan
Write-Host "Runner Dizini: $runnerDir" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan

Write-Host ""
Write-Host "📋 Yapılması Gerekenler:" -ForegroundColor Yellow
Write-Host "1. GitHub repository'de runner'ın görünür olduğunu kontrol edin" -ForegroundColor White
Write-Host "2. Runner'ın 'idle' durumunda olduğunu kontrol edin" -ForegroundColor White
Write-Host "3. Test workflow'u çalıştırarak runner'ı test edin" -ForegroundColor White
Write-Host "4. Runner log'larını kontrol edin: $runnerDir\_diag" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Faydalı Komutlar:" -ForegroundColor Yellow
Write-Host "- Runner durumu: .\svc.status" -ForegroundColor Cyan
Write-Host "- Runner başlatma: .\svc.start" -ForegroundColor Cyan
Write-Host "- Runner durdurma: .\svc.stop" -ForegroundColor Cyan
Write-Host "- Runner kaldırma: .\svc.uninstall" -ForegroundColor Cyan
Write-Host "- Runner log'ları: Get-Content $runnerDir\_diag\*.log" -ForegroundColor Cyan

Write-Host ""
Write-Host "⚠️ Önemli Notlar:" -ForegroundColor Yellow
Write-Host "- Runner'ı güvenli bir ortamda çalıştırın" -ForegroundColor White
Write-Host "- Düzenli olarak runner'ı güncelleyin" -ForegroundColor White
Write-Host "- Runner log'larını takip edin" -ForegroundColor White
Write-Host "- Runner'ı gerektiğinde yeniden başlatın" -ForegroundColor White 