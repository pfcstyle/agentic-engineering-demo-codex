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

test('uses the approved desktop, tablet, and mobile queue-to-detail treatments', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await page.goto('/')
  await expect(page.locator('.table-head')).toBeVisible()
  await page.getByRole('button', { name: /open incident inc-0003/i }).click()
  const selectedRow = page.getByRole('button', { name: /open incident inc-0003/i })
  await expect(selectedRow).toHaveAttribute('aria-current', 'true')
  await expect(selectedRow).toHaveClass(/queue-row-selected/)
  await expect(selectedRow).toHaveCSS('box-shadow', /rgb\(137, 180, 232\)/)
  await expect(page.locator('.drawer')).toHaveCSS('width', '420px')
  await page.getByRole('button', { name: 'Close incident details' }).click()

  await page.setViewportSize({ width: 900, height: 900 })
  await expect(page.locator('.queue-row .owner').first()).toBeHidden()
  await page.getByRole('button', { name: /open incident inc-0003/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Close incident details' }).click()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator('.table-head')).toBeHidden()
  await expect(page.locator('.queue-row').first()).toHaveCSS('border-radius', '8px')
  await page.getByRole('button', { name: /open incident inc-0003/i }).click()
  await expect(page.locator('.drawer')).toHaveCSS('width', '390px')
  await expect(page.locator('.drawer-top')).toHaveCSS('position', 'sticky')
})
