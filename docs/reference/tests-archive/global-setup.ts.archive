import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  // Pre-warm the application
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')
  
  await browser.close()
}

export default globalSetup 