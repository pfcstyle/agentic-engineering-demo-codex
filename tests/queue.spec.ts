import { expect, test } from '@playwright/test'

test('desktop queue supports AND filtering and both zero states', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('20 of 20 incidents')).toBeVisible()
  await page.getByLabel('Search incidents').fill('payments')
  await page.getByLabel('Critical').check()
  await page.getByLabel('New').check()
  await expect(page.getByText('1 of 20 incidents')).toBeVisible()
  await expect(page.getByText('INC-0002')).toBeVisible()

  await page.getByLabel('Search incidents').fill('')
  await page.getByLabel('New').uncheck()
  await page.getByLabel('Identified').check()
  await expect(page.getByRole('heading', { name: 'No results' })).toBeVisible()

  await page.getByLabel('Queue source').selectOption('empty')
  await expect(page.getByRole('heading', { name: 'Empty source' })).toBeVisible()
})
