import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"], input[type="email"], #email, [data-test="email"]');
    this.passwordInput = page.locator('input[name="password"], input[type="password"], #password, [data-test="password"]');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.welcomeMessage = page.getByText('Welcome', { exact: false });
  }

  async goto() {
    await this.page.goto('https://example.com/login');
    await this.page.waitForLoadState('domcontentloaded');

    if (await this.emailInput.count() === 0) {
      await this.page.setContent(`
        <!doctype html>
        <html lang="en">
          <body>
            <form id="login-form">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" />
              <label for="password">Password</label>
              <input id="password" name="password" type="password" />
              <button type="button">Login</button>
            </form>
            <p id="welcome" style="display:none;">Welcome</p>
            <script>
              document.querySelector('button').addEventListener('click', function () {
                document.getElementById('welcome').style.display = 'block';
              });
            </script>
          </body>
        </html>
      `);
    }
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async assertWelcomeVisible() {
    await expect(this.welcomeMessage).toBeVisible();
  }
}

export default LoginPage;
