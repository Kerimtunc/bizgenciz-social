# PowerShell script to install and run mcp-server-git (installer + tester)
param(
  [string]$RepoPath = "C:\\kod\\cekirdek",
  [switch]$RunNow
)

Write-Output "== MCP Server Git Installer Script =="
Write-Output "RepoPath: $RepoPath"

# 1) Ensure Python and pip are available
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Output "Python not found in PATH. Please install Python 3.10+ and rerun this script."; exit 1
}

# 2) Ensure pipx is installed
if (-not (Get-Command pipx -ErrorAction SilentlyContinue)) {
  Write-Output "pipx not found. Installing pipx via pip..."
  python -m pip install --user pipx
  python -m pipx ensurepath
  Write-Output "Please restart your shell if pipx is not on PATH yet.";
}

# 3) Install mcp-server-git using pipx (isolated)
Write-Output "Installing mcp-server-git via pipx (may be slow)..."
pipx install mcp-server-git || pipx upgrade mcp-server-git

# 4) Create logs directory
$logDir = Join-Path $RepoPath "..\\logs\\mcp-server-git"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }

# 5) Optionally run mcp-server-git for the provided repo path
if ($RunNow) {
  $logFile = Join-Path $logDir ("mcp-server-git-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".log")
  Write-Output "Running mcp-server-git against $RepoPath; logs -> $logFile"
  Start-Process -FilePath "pipx" -ArgumentList "run mcp-server-git -r `"$RepoPath`" --verbose" -NoNewWindow -RedirectStandardOutput $logFile -RedirectStandardError $logFile -Wait
  Write-Output "Done. Tail of log:"
  Get-Content $logFile -Tail 200
} else {
  Write-Output "Setup complete. To run mcp-server-git now, re-run with -RunNow switch." 
}


