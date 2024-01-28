import { type Page } from '@playwright/test'

export async function loadHomePage(page: Page) {
  await page.goto('/')

  await page.getByRole('heading', { name: /SEAShows/ }).isVisible()
}

export async function loadHKDramaCategoryPage(page: Page) {
  await page.goto('/shows/hk-drama')

  await page.getByRole('heading', { name: /HK Drama/ }).isVisible()
  await page.locator('img').isVisible()
}

export async function loadHKVarietyCategoryPage(page: Page) {
  await page.goto('/shows/hk-variety')

  await page.getByRole('heading', { name: /HK Variety/ }).isVisible()
  await page.locator('img').isVisible()
}

export async function loadKRDramaCategoryPage(page: Page) {
  await page.goto('/shows/korean-drama-englishsubtitles')

  await page.getByRole('heading', { name: /KR Drama/ }).isVisible()
  await page.locator('img').isVisible()
}
