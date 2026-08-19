import { test, expect } from '@playwright/test';

test('Patient Request - Nurse Contraception - Patch', async ({ page }) => {

  // ============================================================
  // 1. Navigate to Patient Facing Form
  // ============================================================

  await page.goto(
    'https://app.qa.bournehealth.co.uk/pathways-public/home?id=35'
  );

  await expect(
    page.getByText('Nurse appointment', { exact: true })
  ).toBeVisible();


  // ============================================================
  // 2. Select "Nurse appointment"
  // ============================================================

  await page
    .getByText('Nurse appointment', { exact: true })
    .click();

  // Verify that Contraception option is loaded
  await expect(
    page.getByText('Contraception', { exact: true })
  ).toBeVisible();


  // ============================================================
  // 3. Select "Contraception"
  // ============================================================

  await page
    .getByText('Contraception', { exact: true })
    .click();


  // ============================================================
  // 4. Warning screen
  // Click "I need something else - continue"
  // ============================================================

  await page
    .getByRole('button', {
      name: 'I need something else - continue'
    })
    .click();


  // ============================================================
  // 5. Are you already on contraception?
  //
  // Select YES
  // Fill 100 characters
  // Click Continue
  // ============================================================

  const contraceptionQuestion =
    page.locator(
      'input[name="are_you_already_on_contraception?"][value="yes"]'
    );

  await expect(contraceptionQuestion).toBeVisible();

  await contraceptionQuestion.check();

  // Verify Yes is selected
  await expect(contraceptionQuestion).toBeChecked();

  // Textarea appears after selecting Yes
  const contraceptionDetails = page.locator(
    'textarea[name="are_you_already_on_contraception?/what_are_you_taking?"]'
  );

  await expect(contraceptionDetails).toBeVisible();

  // Exactly 100 characters
  const contraceptionText =
    'Patient is currently taking a combined oral contraceptive pill as prescribed and reports no current concerns.';

  console.log(
    'Character count:',
    contraceptionText.length
  );

  await contraceptionDetails.fill(contraceptionText);

  // Verify text was entered
  await expect(contraceptionDetails).toHaveValue(
    contraceptionText
  );

  // Click Continue
  await page
    .getByRole('button', { name: 'Continue', exact: true })
    .click();


  // ============================================================
  // 6. Do you need a review of your contraception?
  //
  // Select NO
  // Continue
  // ============================================================

  const contraceptionReviewNo = page.locator(
    'input[name="do_you_need_a_review_of_your_contraception?"][value="no"]'
  );

  await expect(contraceptionReviewNo).toBeVisible();

  await contraceptionReviewNo.check();

  // Verify No is selected
  await expect(contraceptionReviewNo).toBeChecked();

  await page
    .getByRole('button', { name: 'Continue', exact: true })
    .click();


  // ============================================================
  // 7. I would like to start contraception but not sure which
  //
  // Select NO
  // Continue
  // ============================================================

  const notSureNo = page.locator(
    'input[name="i_would_like_to_start_contraception_but_not_sure_which_one_to_start?"][value="no"]'
  );

  await expect(notSureNo).toBeVisible();

  await notSureNo.check();

  // Verify No is selected
  await expect(notSureNo).toBeChecked();

  await page
    .getByRole('button', { name: 'Continue', exact: true })
    .click();


  // ============================================================
  // 8. I know which contraception I want to start
  //
  // Select YES
  // Select PATCH
  // Continue
  // ============================================================

  const knowContraceptionYes = page.locator(
    'input[name="i_know_which_contraception_I_want_to_start_and_would_like_to_book_an_appointment"][value="yes"]'
  );

  await expect(knowContraceptionYes).toBeVisible();

  await knowContraceptionYes.check();

  // Verify Yes is selected
  await expect(knowContraceptionYes).toBeChecked();


  // Select PATCH
  const patchOption = page.locator(
    'input[name="i_know_which_contraception_I_want_to_start_and_would_like_to_book_an_appointment/type"][value="patch"]'
  );

  await expect(patchOption).toBeVisible();

  await patchOption.check();

  // Verify Patch is selected
  await expect(patchOption).toBeChecked();


  // Click Continue
  await page
    .getByRole('button', { name: 'Continue', exact: true })
    .click();


  // ============================================================
  // 9. Final patient information screen
  // ============================================================

  await expect(
    page.getByText('Fill in your information below.', {
      exact: true
    })
  ).toBeVisible();


  // ============================================================
  // 10. Select "Myself"
  // ============================================================

  const myselfOption = page.locator(
    'input[name="pid.submission_for"][value="myself"]'
  );

  await expect(myselfOption).toBeVisible();

  await myselfOption.check();

  await expect(myselfOption).toBeChecked();


  // ============================================================
  // STOP HERE
  //
  // You said you want to manually fill the final patient form.
  // Playwright Inspector will pause the test here.
  // ============================================================

  await page.pause();
});