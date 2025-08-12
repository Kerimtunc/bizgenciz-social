import { test, expect } from '@playwright/test'

test.describe('Groups limit UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addInitScript(() => {
      window.localStorage.setItem('maku_joined_groups_count', '0')
    })
    await page.goto('/')
  })

  test('shows popular groups and campus guides tabs', async ({ page }) => {
    await expect(page.getByText('Popüler Gruplar')).toBeVisible()
    await expect(page.getByText('Kampüs Rehberleri')).toBeVisible()
  })

  test('after joining 3 groups, limit banner appears and join buttons disable', async ({ page }) => {
    // Join 3 times by clicking first 3 join buttons if present
    const joinButtons = page.getByRole('button', { name: /Gruba Katıl|Keşfet/ })

    const count = await joinButtons.count()
    for (let i = 0; i < Math.min(3, count); i++) {
      const text = await joinButtons.nth(i).textContent()
      if (text && /Gruba Katıl/i.test(text)) {
        await joinButtons.nth(i).click()
      }
    }

    // Trigger list buttons as fallback
    const listButtons = page.getByRole('button', { name: /Gruba Katıl/ })
    const listCount = await listButtons.count()
    for (let i = 0; i < Math.min(3, listCount); i++) {
      await listButtons.nth(i).click()
    }

    await expect(page.getByText(/3'ten fazla gruba katıldınız|3 7en fazla gruba katıldınız/i)).toBeVisible()

    // First list button should be disabled now
    if (listCount > 0) {
      await expect(listButtons.nth(0)).toBeDisabled()
    }
  })
})