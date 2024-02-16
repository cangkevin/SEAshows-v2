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

  test(`pagination links on ${category.name}`, async ({ page }) => {
    await page.goto(`/shows/${category.key}`)

    const nextPageLink = page.getByRole('link', { name: '2', exact: true })
    await expect(nextPageLink).toBeVisible()

    await nextPageLink.click()
    await expect(page).toHaveTitle(new RegExp(`${category.name} - Page 2`))
    await expect(page).toHaveURL(new RegExp(`/shows/${category.key}\\?page=2`))

    const prevPageLink = page.getByRole('link', { name: '1', exact: true })
    await expect(prevPageLink).toBeVisible()

    await prevPageLink.click()
    await expect(page).toHaveTitle(new RegExp(`${category.name} - Page 1`))
    await expect(page).toHaveURL(new RegExp(`/shows/${category.key}\\?page=1`))
  })
})
