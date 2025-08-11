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

# 4) Create logs directory inside the repository (ignored by git)
#    e.g. C:\kod\cekirdek\logs\mcp-server-git
$logDir = Join-Path $RepoPath "logs\\mcp-server-git"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }

# 5) Optionally run mcp-server-git for the provided repo path
if ($RunNow) {
  # ensure archive dir
  $archiveDir = Join-Path $logDir "archive"
  if (-not (Test-Path $archiveDir)) { New-Item -ItemType Directory -Path $archiveDir -Force | Out-Null }

  # rotate old logs older than 7 days into archive
  Get-ChildItem -Path $logDir -Filter "*.log" -File -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } | ForEach-Object {
    Move-Item -Path $_.FullName -Destination (Join-Path $archiveDir $_.Name) -Force
  }

  $logFile = Join-Path $logDir ("mcp-server-git-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".log")
  Write-Output "Running mcp-server-git against $RepoPath; logs -> $logFile"
  # Run via pipx so it's isolated; redirect stdout/stderr to log file
  & pipx run mcp-server-git -r "$RepoPath" --verbose *> $logFile 2>&1

  Write-Output "Done. Tail of log:"
  Get-Content $logFile -Tail 200
} else {
  Write-Output "Setup complete. To run mcp-server-git now, re-run with -RunNow switch." 
}


