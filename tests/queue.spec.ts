import { expect, test } from '@playwright/test'
test('lead can recover the Version 7 owner-save regression', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: /open incident inc-0003/i }).click()
  await page.getByLabel('Owner').selectOption('Chen Wei'); await page.getByLabel('Save outcome').selectOption('failure')
  await page.getByRole('button', { name: 'Save owner change' }).click(); await expect(page.getByRole('alert')).toContainText('not saved')
  await page.getByLabel('Save outcome').selectOption('success'); await page.getByRole('button', { name: 'Retry owner change' }).click()
  await expect(page.getByText(/saved for this browser session/i)).toBeVisible()
})
test('load error retries through loading and returns the deterministic queue', async ({ page }) => {
  await page.goto('/'); await page.getByLabel('Queue source').selectOption('error'); await expect(page.getByRole('alert')).toBeVisible()
  await page.getByRole('button', { name: /retry loading queue/i }).click(); await expect(page.getByRole('heading', { name: 'Loading incidents' })).toBeVisible(); await expect(page.getByText('20 of 20 incidents')).toBeVisible()
})
test('drawer keeps keyboard focus contained and supports reverse wrapping', async ({ page }) => {
  await page.goto('/'); await page.getByRole('button', { name: /open incident inc-0003/i }).click()
  const close = page.getByRole('button', { name: 'Close incident details' }); const save = page.getByRole('button', { name: 'Save owner change' })
  await save.focus(); await page.keyboard.press('Tab'); await expect(close).toBeFocused()
  await close.focus(); await page.keyboard.press('Shift+Tab'); await expect(save).toBeFocused()
})
