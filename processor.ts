import { type Page } from '@playwright/test'
import { expect } from '@playwright/test'

export async function loadHomePage(page: Page) {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /SEAShows/i })).toBeVisible()
}

export async function loadHKDramaCategoryPage(page: Page) {
  await page.goto('/shows/hk-drama')

  await expect(page.getByRole('heading', { name: /HK Drama/i })).toBeVisible()
  expect(page.getByRole('img')).toBeTruthy()
}

export async function loadHKVarietyCategoryPage(page: Page) {
  await page.goto('/shows/hk-variety')

  await expect(page.getByRole('heading', { name: /HK Variety/i })).toBeVisible()
  expect(page.getByRole('img')).toBeTruthy()
}

export async function loadKRDramaCategoryPage(page: Page) {
  await page.goto('/shows/korean-drama-englishsubtitles')

  await expect(page.getByRole('heading', { name: /KR Drama/i })).toBeVisible()
  expect(page.getByRole('img')).toBeTruthy()
}
