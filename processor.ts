import { type Page } from '@playwright/test'

export async function loadHomePage(page: Page) {
  await page.goto('/')
}

export async function loadHKDramaCategoryPage(page: Page) {
  await page.goto('/shows/hk-drama')
}

export async function loadHKVarietyCategoryPage(page: Page) {
  await page.goto('/shows/hk-variety')
}

export async function loadKRDramaCategoryPage(page: Page) {
  await page.goto('/shows/korean-drama-englishsubtitles')
}
