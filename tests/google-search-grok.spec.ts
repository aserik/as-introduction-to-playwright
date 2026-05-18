import { test, expect, type Page } from '@playwright/test';

const SEARCH_QUERY = 'Grok xAI';
const SCREENSHOT_PATH = './test-results/google-search-grok.png';
const GOOGLE_HOME = 'https://www.google.com/?hl=en';
const GOOGLE_SEARCH_URL = `https://www.google.com/search?q=${encodeURIComponent(SEARCH_QUERY)}&hl=en`;

const consentButtonSelectors = [
  'button:has-text("Accept all")',
  'button:has-text("I agree")',
  'button:has-text("Agree")',
  'button:has-text("Reject all")',
  'button:has-text("Yes, I agree")',
  'button:has-text("Accept")',
].join(', ');

const searchInputSelector = [
  'input[name="q"]',
  'input[title="Search"]',
  'input[aria-label="Search"]',
  'input[class*="gLFyf"]',
].join(', ');

async function closeGoogleConsent(page: Page) {
  const consentButtons = page.locator(consentButtonSelectors);
  if (await consentButtons.count() > 0) {
    const visibleButton = consentButtons.filter({ has: page.locator('text=Accept all, text=I agree, text=Agree, text=Reject all, text=Yes, I agree, text=Accept') });
    if (await visibleButton.count() > 0) {
      await visibleButton.first().click();
      return;
    }
    await consentButtons.first().click();
    return;
  }

  for (const frame of page.frames()) {
    const frameButtons = frame.locator(consentButtonSelectors);
    if (await frameButtons.count() > 0) {
      await frameButtons.first().click();
      return;
    }
  }
}

async function openGoogleAndSearch(page: Page) {
  await page.goto(GOOGLE_HOME, { waitUntil: 'domcontentloaded' });
  await closeGoogleConsent(page);

  const searchInput = page.locator(searchInputSelector).first();
  if (!(await searchInput.isVisible().catch(() => false))) {
    await page.goto(GOOGLE_SEARCH_URL, { waitUntil: 'networkidle' });
  } else {
    await searchInput.fill(SEARCH_QUERY);
    await searchInput.press('Enter');
  }
}

test('searches Grok xAI on Google and captures a screenshot of the first result', async ({ page }) => {
  await openGoogleAndSearch(page);
  await closeGoogleConsent(page);

  const firstResult = page.locator('h3').first();
  await expect(firstResult).toBeVisible({ timeout: 30000 });
  await firstResult.click();

  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
});
