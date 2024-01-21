import { type Page, expect, test } from '@playwright/test'

import { categories } from '~/pages'

test('home page loads', async ({ page }) => {
  await loadHomePage(page)
})

export async function loadHomePage(page: Page) {
  await page.goto('/')

  await expect(page).toHaveTitle(/SEAshows/)

  await Promise.all(
    categories.map(async (category) => {
      await expect(
        page.getByRole('banner').getByRole('link', { name: category.name }),
      ).toBeVisible()

      await expect(
        page.getByRole('main').getByRole('link', { name: category.name }),
      ).toBeVisible()
    }),
  )

  await expect(page.getByRole('contentinfo')).toContainText(
    /does not store any files/,
  )
}

categories.forEach((category) => {
  test(`navigate to ${category.name} category`, async ({ page }) => {
    await page.goto('/')

    await page
      .getByRole('main')
      .getByRole('link', { name: new RegExp(category.name) })
      .click()

    await expect(page).toHaveURL(new RegExp(`${category.key}\\?page=1`))
  })
})
