#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
      walk(full, files)
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  const issues = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/\b(procedure)\b/.test(line)) {
      const context = (lines[i - 1] || '') + '\n' + line + '\n' + (lines[i + 1] || '')
      const compliant = /validatedProcedure\s*\(|\bpublicProcedure\b|\bprotectedProcedure\b/.test(context) || /validatedProcedure\s*\(/.test(content)
      if (!compliant) {
        issues.push({ line: i + 1, text: line.trim() })
      }
    }
  }

  return issues
}

function run() {
  const root = process.cwd()
  const targets = ['server', 'app', 'src']
  const files = []
  for (const t of targets) {
    const dir = path.join(root, t)
    if (fs.existsSync(dir)) {
      walk(dir, files)
    }
  }

  const report = []
  for (const f of files) {
    const issues = checkFile(f)
    if (issues.length) report.push({ file: path.relative(root, f), issues })
  }

  if (report.length === 0) {
    console.log('\x1b[32mTRPC procedure scan: no obvious issues found.\x1b[0m')
    return 0
  }

  console.log('\x1b[33mTRPC procedure scan: potential un-validated procedures found:\x1b[0m')
  for (const r of report) {
    console.log(`\n- ${r.file}`)
    for (const it of r.issues) {
      console.log(`  L${it.line}: ${it.text}`)
    }
  }

  console.log('\n\x1b[33mRecommendation:\x1b[0m Use `validatedProcedure(schema)` or `publicProcedure`/`protectedProcedure` for TRPC procedures. See docs/guides/saglamlastir.md')
  // return non-zero to fail CI when issues are detected
  return 2
}

try {
  const code = run()
  process.exitCode = code
} catch (e) {
  console.error('TRPC scan failed:', e)
  process.exitCode = 0
}


