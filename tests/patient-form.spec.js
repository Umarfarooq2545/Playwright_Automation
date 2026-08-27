import { test, expect } from '@playwright/test';

test('orders regular medication and completes patient details', async ({
  page
}) => {
  await page.goto(
    'https://qa-medicspot.31g.co.uk/patient/form/C00000'
  );

  // Select medication pathway
  await page
    .getByText('My medication or question about it', { exact: true })
    .click();

  await page
    .getByText(
      'I need to order a medication which is on my regular list',
      { exact: true }
    )
    .click();

  // Medication details
  await page
    .locator(
      'h3[title="Please check your previous medication and list each medication, including the strength you are requesting"]'
    )
    .locator('xpath=..')
    .locator('input')
    .fill('Test medication 10 mg');

  // Pharmacy
  await page
    .locator(
      'h3[title="Which pharmacy do you want to pick it up at?"]'
    )
    .locator('xpath=..')
    .locator('textarea:not([aria-hidden="true"])')
    .fill('Keston and Moorings medical practice');

  await page
    .locator('#btn-continue')
    .click();

  // Patient details
  await page
    .getByRole('radio', { name: 'For myself', exact: true })
    .check();

  const timestamp = Date.now();

  const patient = {
    firstName: `Test${timestamp}`,
    middleName: 'QA',
    surname: 'Patient',
    postcode: 'M1 1AA',
    email: `qa.patient.${timestamp}@example.com`
  };

  await page
    .getByLabel('Patient first name')
    .fill(patient.firstName);

  await page
    .getByLabel('Patient middle name')
    .fill(patient.middleName);

  await page
    .getByLabel('Patient family name')
    .fill(patient.surname);

  // Date of birth: 15 June 1995
  const dateOfBirthFields = page.getByRole('combobox');

  await dateOfBirthFields.nth(0).click();
  await page.getByRole('option', { name: '15', exact: true }).click();

  await dateOfBirthFields.nth(1).click();
  await page.getByRole('option', { name: 'June', exact: true }).click();

  await dateOfBirthFields.nth(2).click();
  await page.getByRole('option', { name: '1995', exact: true }).click();

  await page.getByLabel('Sex').fill('Female');
  await page.getByRole('option', { name: 'Female', exact: true }).click();

  await page
    .getByLabel('Post code')
    .fill(patient.postcode);

  // Select email as the preferred contact method
  await page
    .getByRole('radio', { name: 'Email', exact: true })
    .check();


  // Pause for manual review before continuing.
  await page.pause();
});