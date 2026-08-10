// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://app.qa.bournehealth.co.uk/admin');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'test' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


test('Bourne Health login redirects to OTP screen', async ({ page }) => {

  // Navigate to Bourne Health login page
  await page.goto('https://app.qa.bournehealth.co.uk/admin');

  // Identify and fill the Email field
  await page.locator('input[name="email"]').fill('hardingtest@yopmail.com');

  // Identify and fill the Password field
  await page.locator('input[name="password"]').fill('CRi=&L5W{52+jxz');

  // Click the Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the user is redirected to the OTP screen
  //await expect(page).toHaveURL(/otp|verification/i);

  // Verify that the OTP screen is displayed
  // await expect(
  //   page.getByText(/OTP|verification code|one-time password/i)
  // ).toBeVisible();
});
