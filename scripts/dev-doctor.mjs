#!/usr/bin/env node
import { spawnSync } from 'node:child_process'

function runStep(name, command, args = []) {
  console.log(`\n=== ${name} ===`)
  const res = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  if (res.status !== 0) {
    console.error(`\n${name} FAILED (exit ${res.status}).`)
    process.exit(res.status || 1)
  }
  console.log(`${name} OK`)
}

try {
  runStep('ENV CHECK', 'node', ['scripts/validate-env.mjs'])
  runStep('TRPC CHECK', 'node', ['scripts/check-trpc-procedures.mjs'])
  runStep('HEALTH CHECK', 'node', ['scripts/health-check.mjs'])
  console.log('\nAll doctor checks passed.')
  process.exit(0)
} catch (e) {
  console.error('Doctor script failed:', e)
  process.exit(1)
}


