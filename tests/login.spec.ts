import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

const EMAIL = 'test@example.com';
const PASSWORD = 'password123';

test.describe('Login page', () => {
  test('should log in and show welcome text', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillEmail(EMAIL);
    await loginPage.fillPassword(PASSWORD);
    await loginPage.clickLogin();
    await loginPage.assertWelcomeVisible();
  });
});
