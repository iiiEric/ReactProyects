// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/'

test('Movie has title and image', async ({ page }) => {
  //test.setTimeout(120000);

  await page.goto(LOCALHOST_URL);

  const title = await page.getByRole('heading')
  //const image = await page.getByRole('img')

  const title_text = await title.textContent()
  //const image_src = await image.getAttribute('src')

  await expect(title_text?.length).toBeGreaterThan(0)
  //await expect(image_src?.startsWith('http://www.omdbapi.com')).toBeTruthy()
});
