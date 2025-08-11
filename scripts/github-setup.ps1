# GitHub Repository Kurulum Script'i
# Bu script GitHub repository'yi kurar ve gerekli ayarları yapar

param(
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName,
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [switch]$Private = $true,
    
    [Parameter(Mandatory=$false)]
    [switch]$InitializeLocal = $false
)

Write-Host "🚀 GitHub Repository Kurulum Script'i" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# 1. GitHub CLI kontrolü
Write-Host "📋 GitHub CLI kontrol ediliyor..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version
    Write-Host "✅ GitHub CLI mevcut: $ghVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub CLI bulunamadı. Lütfen önce GitHub CLI'yi yükleyin:" -ForegroundColor Red
    Write-Host "   https://cli.github.com/" -ForegroundColor Cyan
    exit 1
}

# 2. GitHub authentication kontrolü
Write-Host "🔐 GitHub authentication kontrol ediliyor..." -ForegroundColor Yellow
try {
    $authStatus = gh auth status
    Write-Host "✅ GitHub authentication başarılı" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub authentication gerekli. Lütfen giriş yapın:" -ForegroundColor Red
    gh auth login
}

# 3. Repository oluşturma
Write-Host "📦 Repository oluşturuluyor: $RepositoryName" -ForegroundColor Yellow

$repoFlags = @(
    "--private" # Private repository
    "--description", "YemekZen QR Menu Elite Edition - Gelişmiş QR kod tabanlı dijital menü sistemi"
    "--homepage", "https://github.com/$GitHubUsername/$RepositoryName"
    "--source"
    "--enable-issues"
    "--enable-projects"
    "--enable-wiki"
    "--enable-discussions"
    "--add-readme"
    "--gitignore", "Node"
    "--license", "MIT"
)

$createCommand = "gh repo create $RepositoryName " + ($repoFlags -join " ")
Write-Host "Komut: $createCommand" -ForegroundColor Gray

try {
    Invoke-Expression $createCommand
    Write-Host "✅ Repository başarıyla oluşturuldu!" -ForegroundColor Green
} catch {
    Write-Host "❌ Repository oluşturulurken hata oluştu" -ForegroundColor Red
    Write-Host "Hata: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 4. Local repository ayarları
if ($InitializeLocal) {
    Write-Host "🔧 Local repository ayarları yapılıyor..." -ForegroundColor Yellow
    
    # Git remote ekleme
    $remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
    Write-Host "Remote URL: $remoteUrl" -ForegroundColor Gray
    
    try {
        git remote add origin $remoteUrl
        Write-Host "✅ Remote origin eklendi" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Remote origin zaten mevcut olabilir" -ForegroundColor Yellow
    }
    
    # Branch ayarları
    try {
        git branch -M main
        Write-Host "✅ Main branch ayarlandı" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Branch ayarlama hatası" -ForegroundColor Yellow
    }
    
    # İlk commit ve push
    Write-Host "📤 İlk commit ve push yapılıyor..." -ForegroundColor Yellow
    try {
        git add .
        git commit -m "🚀 Initial commit: YemekZen QR Menu Elite Edition"
        git push -u origin main
        Write-Host "✅ İlk commit ve push başarılı!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Commit/push hatası: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 5. Repository ayarları
Write-Host "⚙️ Repository ayarları yapılıyor..." -ForegroundColor Yellow

# Branch protection rules
Write-Host "🛡️ Branch protection rules ayarlanıyor..." -ForegroundColor Yellow
try {
    gh api repos/$GitHubUsername/$RepositoryName/branches/main/protection --method PUT --field required_status_checks='{"strict":true,"contexts":["ci-cd"]}' --field enforce_admins=true --field required_pull_request_reviews='{"required_approving_review_count":1}' --field restrictions=null
    Write-Host "✅ Branch protection rules ayarlandı" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Branch protection rules ayarlanamadı" -ForegroundColor Yellow
}

# 6. GitHub Actions ayarları
Write-Host "🔧 GitHub Actions ayarları kontrol ediliyor..." -ForegroundColor Yellow

# Secrets kontrolü
$requiredSecrets = @(
    "SNYK_TOKEN",
    "STAGING_URL",
    "PRODUCTION_URL",
    "DATABASE_URL",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "JWT_SECRET"
)

Write-Host "🔐 Gerekli secrets:" -ForegroundColor Yellow
foreach ($secret in $requiredSecrets) {
    Write-Host "   - $secret" -ForegroundColor Gray
}

Write-Host "📝 Bu secrets'ları GitHub repository settings > Secrets and variables > Actions bölümünde ayarlamanız gerekiyor." -ForegroundColor Cyan

# 7. Sonuç
Write-Host ""
Write-Host "🎉 GitHub Repository Kurulumu Tamamlandı!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Repository URL: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan
Write-Host "Actions URL: https://github.com/$GitHubUsername/$RepositoryName/actions" -ForegroundColor Cyan
Write-Host "Settings URL: https://github.com/$GitHubUsername/$RepositoryName/settings" -ForegroundColor Cyan

Write-Host ""
Write-Host "📋 Yapılması Gerekenler:" -ForegroundColor Yellow
Write-Host "1. GitHub repository settings'de secrets'ları ayarlayın" -ForegroundColor White
Write-Host "2. Branch protection rules'ı kontrol edin" -ForegroundColor White
Write-Host "3. GitHub Actions'ı test edin" -ForegroundColor White
Write-Host "4. Collaborators ekleyin (gerekirse)" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Faydalı Linkler:" -ForegroundColor Yellow
Write-Host "- GitHub CLI: https://cli.github.com/" -ForegroundColor Cyan
Write-Host "- GitHub Actions: https://docs.github.com/en/actions" -ForegroundColor Cyan
Write-Host "- Repository Settings: https://github.com/$GitHubUsername/$RepositoryName/settings" -ForegroundColor Cyan 