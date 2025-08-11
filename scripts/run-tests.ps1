# 🧪 YemekZen Test Runner v1.0
# 
# Bu script tüm testleri çalıştırır ve sonuçları raporlar
# cekirdek.mdc prensiplerine uygun olarak kapsamlı test stratejisi

param(
    [Parameter(Mandatory=$false)]
    [string]$TestType = "all", # all, unit, e2e, performance, security
    
    [Parameter(Mandatory=$false)]
    [switch]$GenerateReport = $true,
    
    [Parameter(Mandatory=$false)]
    [switch]$StopOnFailure = $false,
    
    [Parameter(Mandatory=$false)]
    [string]$ReportPath = ".\test-results"
)

Write-Host "🧪 YemekZen Test Runner Başlatılıyor..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Test sonuçları klasörü oluştur
if (!(Test-Path $ReportPath)) {
    New-Item -ItemType Directory -Path $ReportPath -Force
    Write-Host "✅ Test sonuçları klasörü oluşturuldu: $ReportPath" -ForegroundColor Green
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$testResults = @{
    timestamp = $timestamp
    testType = $TestType
    results = @{}
    summary = @{
        total = 0
        passed = 0
        failed = 0
        skipped = 0
    }
}

# 1. Environment Kontrolü
Write-Host "🔧 Environment kontrolü yapılıyor..." -ForegroundColor Yellow

try {
    # Node.js versiyonu kontrol et
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Node.js bulunamadı!" -ForegroundColor Red
        exit 1
    }
    
    # NPM versiyonu kontrol et
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✅ NPM: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ NPM bulunamadı!" -ForegroundColor Red
        exit 1
    }
    
    # Environment dosyaları kontrol et
    if (Test-Path ".env.local") {
        Write-Host "✅ .env.local dosyası mevcut" -ForegroundColor Green
    } else {
        Write-Host "⚠️ .env.local dosyası bulunamadı" -ForegroundColor Yellow
    }
    
    # Prisma schema kontrol et
    if (Test-Path "prisma\schema.prisma") {
        Write-Host "✅ Prisma schema mevcut" -ForegroundColor Green
    } else {
        Write-Host "❌ Prisma schema bulunamadı!" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "❌ Environment kontrolü başarısız: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. Unit Tests
if ($TestType -eq "all" -or $TestType -eq "unit") {
    Write-Host ""
    Write-Host "🧪 Unit Testler Çalıştırılıyor..." -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
    
    try {
        $unitStartTime = Get-Date
        $unitResult = npm test 2>&1
        $unitEndTime = Get-Date
        $unitDuration = ($unitEndTime - $unitStartTime).TotalSeconds
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Unit testler başarılı! ($unitDuration saniye)" -ForegroundColor Green
            $testResults.results.unit = @{
                status = "passed"
                duration = $unitDuration
                output = $unitResult
            }
            $testResults.summary.passed++
        } else {
            Write-Host "❌ Unit testler başarısız! ($unitDuration saniye)" -ForegroundColor Red
            $testResults.results.unit = @{
                status = "failed"
                duration = $unitDuration
                output = $unitResult
            }
            $testResults.summary.failed++
            
            if ($StopOnFailure) {
                Write-Host "🛑 Test durduruldu (StopOnFailure aktif)" -ForegroundColor Red
                exit 1
            }
        }
        $testResults.summary.total++
    }
    catch {
        Write-Host "❌ Unit testler çalıştırılamadı: $($_.Exception.Message)" -ForegroundColor Red
        $testResults.results.unit = @{
            status = "error"
            error = $_.Exception.Message
        }
        $testResults.summary.failed++
    }
}

# 3. E2E Tests
if ($TestType -eq "all" -or $TestType -eq "e2e") {
    Write-Host ""
    Write-Host "🔍 E2E Testler Çalıştırılıyor..." -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
    
    try {
        # Development server'ı başlat
        Write-Host "🚀 Development server başlatılıyor..." -ForegroundColor Yellow
        Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Hidden
        
        # Server'ın başlaması için bekle
        Start-Sleep -Seconds 10
        
        $e2eStartTime = Get-Date
        $e2eResult = npx playwright test tests/e2e/core-functionality.spec.ts 2>&1
        $e2eEndTime = Get-Date
        $e2eDuration = ($e2eEndTime - $e2eStartTime).TotalSeconds
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ E2E testler başarılı! ($e2eDuration saniye)" -ForegroundColor Green
            $testResults.results.e2e = @{
                status = "passed"
                duration = $e2eDuration
                output = $e2eResult
            }
            $testResults.summary.passed++
        } else {
            Write-Host "❌ E2E testler başarısız! ($e2eDuration saniye)" -ForegroundColor Red
            $testResults.results.e2e = @{
                status = "failed"
                duration = $e2eDuration
                output = $e2eResult
            }
            $testResults.summary.failed++
            
            if ($StopOnFailure) {
                Write-Host "🛑 Test durduruldu (StopOnFailure aktif)" -ForegroundColor Red
                exit 1
            }
        }
        $testResults.summary.total++
        
        # Development server'ı durdur
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force
    }
    catch {
        Write-Host "❌ E2E testler çalıştırılamadı: $($_.Exception.Message)" -ForegroundColor Red
        $testResults.results.e2e = @{
            status = "error"
            error = $_.Exception.Message
        }
        $testResults.summary.failed++
    }
}

# 4. Performance Tests
if ($TestType -eq "all" -or $TestType -eq "performance") {
    Write-Host ""
    Write-Host "⚡ Performance Testler Çalıştırılıyor..." -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
    
    try {
        $perfStartTime = Get-Date
        
        # Ana sayfa yükleme süresi testi
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing
        $loadTime = ($response.BaseResponse.ResponseTime) / 1000 # milisaniye to saniye
        
        # Health check API süresi testi
        $healthResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing
        $healthTime = ($healthResponse.BaseResponse.ResponseTime) / 1000
        
        $perfEndTime = Get-Date
        $perfDuration = ($perfEndTime - $perfStartTime).TotalSeconds
        
        $performanceResults = @{
            mainPageLoadTime = $loadTime
            healthCheckTime = $healthTime
            mainPageStatus = $response.StatusCode
            healthCheckStatus = $healthResponse.StatusCode
        }
        
        # Performance kriterleri kontrol et
        $performancePassed = $true
        $performanceIssues = @()
        
        if ($loadTime -gt 3) {
            $performancePassed = $false
            $performanceIssues += "Ana sayfa yükleme süresi çok yavaş: $loadTime saniye"
        }
        
        if ($healthTime -gt 1) {
            $performancePassed = $false
            $performanceIssues += "Health check API çok yavaş: $healthTime saniye"
        }
        
        if ($response.StatusCode -ne 200) {
            $performancePassed = $false
            $performanceIssues += "Ana sayfa HTTP status: $($response.StatusCode)"
        }
        
        if ($healthResponse.StatusCode -ne 200) {
            $performancePassed = $false
            $performanceIssues += "Health check HTTP status: $($healthResponse.StatusCode)"
        }
        
        if ($performancePassed) {
            Write-Host "✅ Performance testler başarılı! ($perfDuration saniye)" -ForegroundColor Green
            Write-Host "📊 Ana sayfa: $loadTime saniye" -ForegroundColor Cyan
            Write-Host "📊 Health check: $healthTime saniye" -ForegroundColor Cyan
            $testResults.results.performance = @{
                status = "passed"
                duration = $perfDuration
                metrics = $performanceResults
            }
            $testResults.summary.passed++
        } else {
            Write-Host "❌ Performance testler başarısız! ($perfDuration saniye)" -ForegroundColor Red
            foreach ($issue in $performanceIssues) {
                Write-Host "⚠️ $issue" -ForegroundColor Yellow
            }
            $testResults.results.performance = @{
                status = "failed"
                duration = $perfDuration
                metrics = $performanceResults
                issues = $performanceIssues
            }
            $testResults.summary.failed++
        }
        $testResults.summary.total++
    }
    catch {
        Write-Host "❌ Performance testler çalıştırılamadı: $($_.Exception.Message)" -ForegroundColor Red
        $testResults.results.performance = @{
            status = "error"
            error = $_.Exception.Message
        }
        $testResults.summary.failed++
    }
}

# 5. Security Tests
if ($TestType -eq "all" -or $TestType -eq "security") {
    Write-Host ""
    Write-Host "🔐 Security Testler Çalıştırılıyor..." -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
    
    try {
        $securityStartTime = Get-Date
        
        # NPM audit çalıştır
        $npmAuditResult = npm audit --audit-level=moderate 2>&1
        $npmAuditExitCode = $LASTEXITCODE
        
        # Environment güvenlik kontrolü
        $envSecurityIssues = @()
        
        # Hassas bilgilerin client-side'da görünüp görünmediğini kontrol et
        if (Test-Path ".env.local") {
            $envContent = Get-Content ".env.local"
            foreach ($line in $envContent) {
                if ($line -match "DATABASE_URL|DIRECT_URL|JWT_SECRET|SUPABASE_SERVICE_ROLE_KEY") {
                    $envSecurityIssues += "Hassas bilgi client-side'da görünüyor: $line"
                }
            }
        }
        
        $securityEndTime = Get-Date
        $securityDuration = ($securityEndTime - $securityStartTime).TotalSeconds
        
        $securityPassed = $true
        $securityIssues = @()
        
        if ($npmAuditExitCode -ne 0) {
            $securityPassed = $false
            $securityIssues += "NPM audit güvenlik açıkları buldu"
        }
        
        if ($envSecurityIssues.Count -gt 0) {
            $securityPassed = $false
            $securityIssues += $envSecurityIssues
        }
        
        if ($securityPassed) {
            Write-Host "✅ Security testler başarılı! ($securityDuration saniye)" -ForegroundColor Green
            $testResults.results.security = @{
                status = "passed"
                duration = $securityDuration
                npmAuditResult = $npmAuditResult
            }
            $testResults.summary.passed++
        } else {
            Write-Host "❌ Security testler başarısız! ($securityDuration saniye)" -ForegroundColor Red
            foreach ($issue in $securityIssues) {
                Write-Host "⚠️ $issue" -ForegroundColor Yellow
            }
            $testResults.results.security = @{
                status = "failed"
                duration = $securityDuration
                npmAuditResult = $npmAuditResult
                issues = $securityIssues
            }
            $testResults.summary.failed++
        }
        $testResults.summary.total++
    }
    catch {
        Write-Host "❌ Security testler çalıştırılamadı: $($_.Exception.Message)" -ForegroundColor Red
        $testResults.results.security = @{
            status = "error"
            error = $_.Exception.Message
        }
        $testResults.summary.failed++
    }
}

# 6. Test Raporu Oluştur
if ($GenerateReport) {
    Write-Host ""
    Write-Host "📊 Test Raporu Oluşturuluyor..." -ForegroundColor Yellow
    
    $reportFile = "$ReportPath\test-report-$timestamp.json"
    $testResults | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportFile -Encoding UTF8
    
    # Markdown raporu oluştur
    $markdownReport = @"
# 🧪 YemekZen Test Raporu

## 📋 Test Bilgileri
- **Tarih:** $timestamp
- **Test Tipi:** $TestType
- **Toplam Test:** $($testResults.summary.total)
- **Başarılı:** $($testResults.summary.passed)
- **Başarısız:** $($testResults.summary.failed)
- **Atlanan:** $($testResults.summary.skipped)

## 📊 Test Sonuçları

### Unit Tests
- **Durum:** $($testResults.results.unit.status)
- **Süre:** $($testResults.results.unit.duration) saniye

### E2E Tests
- **Durum:** $($testResults.results.e2e.status)
- **Süre:** $($testResults.results.e2e.duration) saniye

### Performance Tests
- **Durum:** $($testResults.results.performance.status)
- **Süre:** $($testResults.results.performance.duration) saniye

### Security Tests
- **Durum:** $($testResults.results.security.status)
- **Süre:** $($testResults.results.security.duration) saniye

## 🎯 Öneriler
- Başarısız testler düzeltilmeli
- Performance sorunları optimize edilmeli
- Security açıkları kapatılmalı

---
*Bu rapor YemekZen QR Menu Elite Edition projesi için oluşturulmuştur.*
"@

    $markdownReportFile = "$ReportPath\test-report-$timestamp.md"
    $markdownReport | Out-File -FilePath $markdownReportFile -Encoding UTF8
    
    Write-Host "✅ Test raporu oluşturuldu: $markdownReportFile" -ForegroundColor Green
}

# 7. Sonuç Raporu
Write-Host ""
Write-Host "🎉 Test Çalıştırma Tamamlandı!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host "📊 Toplam Test: $($testResults.summary.total)" -ForegroundColor Cyan
Write-Host "✅ Başarılı: $($testResults.summary.passed)" -ForegroundColor Green
Write-Host "❌ Başarısız: $($testResults.summary.failed)" -ForegroundColor Red
Write-Host "⏭️ Atlanan: $($testResults.summary.skipped)" -ForegroundColor Yellow

$successRate = if ($testResults.summary.total -gt 0) { 
    [math]::Round(($testResults.summary.passed / $testResults.summary.total) * 100, 2) 
} else { 
    0 
}

Write-Host "📈 Başarı Oranı: $successRate%" -ForegroundColor Cyan

if ($testResults.summary.failed -gt 0) {
    Write-Host ""
    Write-Host "⚠️ Bazı testler başarısız oldu. Detaylar için raporu kontrol edin." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host ""
    Write-Host "🎉 Tüm testler başarılı!" -ForegroundColor Green
} 