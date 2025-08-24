import { test, expect } from '@playwright/test'

test('i18n toggle + shop flow', async ({ page }) => {
  await page.goto('/en')
  await expect(page.getByRole('heading', { name: /Rudrakhchya/i })).toBeVisible()
  await page.getByRole('link', { name: 'Shop' }).click()
  await page.getByRole('heading', { name: /Shop/i }).isVisible()
  await page.getByRole('link', { name: /5 Mukhi/i }).click()
  await expect(page.getByText('X‑ray ✓')).toBeVisible()
  await page.getByRole('link', { name: 'Download X‑ray PDF' }).isVisible()
})
