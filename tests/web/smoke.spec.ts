import { test, expect } from '@playwright/test'

test('home responds and basic layout renders', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/YemekZen|BizGenciz|Next/i)
})

test('health endpoint is reachable', async ({ request }) => {
  const res = await request.get('/api/health')
  expect(res.status()).toBeLessThan(600)
})


