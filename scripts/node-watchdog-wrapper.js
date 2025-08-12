#!/usr/bin/env node
/**
 * Lightweight systemd notify wrapper for Node apps.
 * - Calls systemd-notify --ready if available
 * - Periodically sends watchdog notifications if systemd-notify exists
 * - Spawns the real server (first arg onwards)
 */
const { spawn, execSync } = require('child_process')

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: node-watchdog-wrapper.js <node> <server.js> [args...]')
  process.exit(2)
}

const notifyAvailable = (() => {
  try {
    execSync('which systemd-notify', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
})()

if (notifyAvailable) {
  try {
    execSync('systemd-notify --ready')
    console.info('systemd-notify: READY sent')
  } catch (e) {
    console.warn('systemd-notify --ready failed:', e.message || e)
  }
}

const child = spawn(args[0], args.slice(1), { stdio: 'inherit' })

// Periodic watchdog ping (if available)
let watchdogTimer = null
if (notifyAvailable) {
  const intervalMs = 20 * 1000 // send every 20s; systemd WatchdogSec should be > interval
  watchdogTimer = setInterval(() => {
    try {
      execSync('systemd-notify --watchdog')
    } catch (e) {
      // ignore
    }
  }, intervalMs)
}

function shutdown(code) {
  if (watchdogTimer) clearInterval(watchdogTimer)
  try { child.kill('SIGTERM') } catch (e) {}
  process.exit(code)
}

child.on('exit', (code, sig) => {
  if (sig) process.exit(1)
  process.exit(code === null ? 1 : code)
})

process.on('SIGINT', () => { shutdown(0) })
process.on('SIGTERM', () => { shutdown(0) })


