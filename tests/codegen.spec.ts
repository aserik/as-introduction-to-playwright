// npx playwright codegen https://сайт.ua
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dg%26oq%3Dg%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDIwNTdqMGoyqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3Dd5wMavucEq-I9u8PlL2FsQI&q=EgQuIvgfGPe4stAGIjD6DA1k4Ct1bt5QjfTGh66wWtP_Zda0fvDpTcBUA_fboRQ1WjvUu2GC_zX8M_mCFaAyAVJaAUM');
  await page.locator('iframe[name="a-ayete1x52ctd"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-ayete1x52ctd"]').contentFrame().locator('[id="8"]').click();
  await page.locator('iframe[name="c-ayete1x52ctd"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-ayete1x52ctd"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-ayete1x52ctd"]').contentFrame().locator('[id="5"]').click();
  await page.locator('iframe[name="c-ayete1x52ctd"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.locator('div').filter({ hasText: 'sk‪Slovenčina‬‪Deutsch‬‪' }).nth(1).click();
  await page.getByRole('button', { name: 'Odmietnuť všetko' }).click();
  await page.getByRole('combobox', { name: 'Hľadať' }).click();
  await page.getByRole('combobox', { name: 'Hľadať' }).fill('test');
    await page.getByRole('combobox', { name: 'Hľadať' }).press('Enter');
    

});