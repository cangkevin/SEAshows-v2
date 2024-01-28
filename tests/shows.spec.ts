import { expect, test } from '@playwright/test'

import { categories } from '~/pages'

categories.forEach((category) => {
  test(`load ${category.name} shows`, async ({ page }) => {
    await page.goto(`/shows/${category.key}`)

    await expect(page).toHaveTitle(new RegExp(`${category.name} - Page 1`))
    await expect(page).toHaveURL(new RegExp(`/shows/${category.key}`))
    await expect(page.getByRole('contentinfo')).toContainText(
      /does not store any files/,
    )

    await expect(page.locator('img').first()).toBeVisible()
  })
})
