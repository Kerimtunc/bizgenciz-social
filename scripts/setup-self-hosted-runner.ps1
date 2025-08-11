# Self-Hosted GitHub Runner Setup Script
# This script sets up a local or self-hosted runner

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

Write-Host "🤖 Self-Hosted GitHub Runner Setup Script" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# 1. System check
Write-Host "📋 Checking system compatibility..." -ForegroundColor Yellow

# Windows check
if ($PSVersionTable.Platform -eq "Unix") {
    Write-Host "❌ This script is designed for Windows" -ForegroundColor Red
    exit 1
}

# PowerShell version check
if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-Host "❌ PowerShell 5.0 or higher required" -ForegroundColor Red
    exit 1
}

Write-Host "✅ System compatible" -ForegroundColor Green

# 2. Install required tools
if ($InstallDependencies) {
    Write-Host "📦 Installing required tools..." -ForegroundColor Yellow
    
    # Check and install Chocolatey
    if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "🍫 Installing Chocolatey..." -ForegroundColor Yellow
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    }
    
    # Install Node.js
    if (!(Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Installing Node.js..." -ForegroundColor Yellow
        choco install nodejs -y
    }
    
    # Install Git
    if (!(Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Host "📦 Installing Git..." -ForegroundColor Yellow
        choco install git -y
    }
    
    # Install Docker Desktop (optional)
    if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "🐳 Installing Docker Desktop..." -ForegroundColor Yellow
        choco install docker-desktop -y
    }
    
    Write-Host "✅ Required tools installed" -ForegroundColor Green
}

# 3. GitHub Runner setup
Write-Host "🤖 Setting up GitHub Runner..." -ForegroundColor Yellow

# Create runner directory
$runnerDir = "C:\actions-runner"
if (!(Test-Path $runnerDir)) {
    New-Item -ItemType Directory -Path $runnerDir -Force
    Write-Host "✅ Runner directory created: $runnerDir" -ForegroundColor Green
}

# Get runner token
Write-Host "🔐 Getting runner token..." -ForegroundColor Yellow
Write-Host "Go to GitHub repository settings > Actions > Runners" -ForegroundColor Cyan
Write-Host "Click 'New self-hosted runner' and copy the Windows x64 token" -ForegroundColor Cyan

$runnerToken = Read-Host "Enter runner token"

if ([string]::IsNullOrEmpty($runnerToken)) {
    Write-Host "❌ Runner token required" -ForegroundColor Red
    exit 1
}

# Setup runner
Set-Location $runnerDir

# Download runner files
$runnerUrl = "https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip"
$runnerZip = "actions-runner-win-x64.zip"

Write-Host "📥 Downloading runner files..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $runnerUrl -OutFile $runnerZip

# Extract files
Write-Host "📦 Extracting runner files..." -ForegroundColor Yellow
Expand-Archive -Path $runnerZip -DestinationPath . -Force

# Configure runner
Write-Host "⚙️ Configuring runner..." -ForegroundColor Yellow
$configCommand = ".\config.cmd --url https://github.com/$GitHubUsername/$RepositoryName --token $runnerToken --name $RunnerName --unattended"
Write-Host "Command: $configCommand" -ForegroundColor Gray

try {
    Invoke-Expression $configCommand
    Write-Host "✅ Runner configured" -ForegroundColor Green
} catch {
    Write-Host "❌ Runner configuration error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 4. Install runner service
Write-Host "🔧 Installing runner service..." -ForegroundColor Yellow

try {
    .\svc.install
    .\svc.start
    Write-Host "✅ Runner service installed and started" -ForegroundColor Green
} catch {
    Write-Host "❌ Runner service installation error: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Set environment variables
Write-Host "🔧 Setting environment variables..." -ForegroundColor Yellow

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

# 6. Check runner status
Write-Host "📊 Checking runner status..." -ForegroundColor Yellow

try {
    $runnerStatus = .\svc.status
    Write-Host "✅ Runner status: $runnerStatus" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Could not check runner status" -ForegroundColor Yellow
}

# 7. Results
Write-Host ""
Write-Host "🎉 Self-Hosted Runner Setup Completed!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host "Runner Name: $RunnerName" -ForegroundColor Cyan
Write-Host "Runner Directory: $runnerDir" -ForegroundColor Cyan
Write-Host "Repository: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Cyan

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Check if runner is visible in GitHub repository" -ForegroundColor White
Write-Host "2. Verify runner is in 'idle' status" -ForegroundColor White
Write-Host "3. Test runner with a workflow" -ForegroundColor White
Write-Host "4. Check runner logs: $runnerDir\_diag" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Useful Commands:" -ForegroundColor Yellow
Write-Host "- Runner status: .\svc.status" -ForegroundColor Cyan
Write-Host "- Start runner: .\svc.start" -ForegroundColor Cyan
Write-Host "- Stop runner: .\svc.stop" -ForegroundColor Cyan
Write-Host "- Uninstall runner: .\svc.uninstall" -ForegroundColor Cyan
Write-Host "- Check logs: Get-Content $runnerDir\_diag\*.log" -ForegroundColor Cyan

Write-Host ""
Write-Host "⚠️ Important Notes:" -ForegroundColor Yellow
Write-Host "- Run runner in a secure environment" -ForegroundColor White
Write-Host "- Update runner regularly" -ForegroundColor White
Write-Host "- Monitor runner logs" -ForegroundColor White
Write-Host "- Restart runner when needed" -ForegroundColor White 