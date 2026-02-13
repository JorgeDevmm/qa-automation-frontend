/**
 * Step Definitions para los escenarios de Login
 * Implementa los pasos definidos en 1-login.feature
 * Cubre los Criterios de Aceptación 1 y 2
 * Cubre Especificación 4: diferentes tipos de usuarios (standard_user, locked_out_user)
 */
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

// ==================== GIVEN STEPS ====================

/**
 * Step: Given que estoy en la página de login de Sauce Demo
 * Navega a la página de login antes de cada escenario
 */
Given('que estoy en la página de login de Sauce Demo', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.navigate();
});

// ==================== WHEN STEPS ====================

/**
 * Step: When ingreso el usuario "string"
 * Ingresa el nombre de usuario en el campo correspondiente
 */
When('ingreso el usuario {string}', async function (this: CustomWorld, username: string) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.enterUsername(username);
});

/**
 * Step: And ingreso la contraseña "string"
 * Ingresa la contraseña en el campo correspondiente
 */
When('ingreso la contraseña {string}', async function (this: CustomWorld, password: string) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.enterPassword(password);
});

/**
 * Step: And hago clic en el botón de login
 * Hace clic en el botón de login para autenticarse
 */
When('hago clic en el botón de login', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.clickLoginButton();
});

/**
 * Step: When dejo los campos de usuario y contraseña vacíos
 * Deja ambos campos vacíos para probar validación
 */
When('dejo los campos de usuario y contraseña vacíos', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.leaveFieldsEmpty();
});

// ==================== THEN STEPS ====================

/**
 * Step: Then debo ser redirigido a la página de productos
 * Verifica que después del login exitoso, se cargue la página de productos
 */
Then('debo ser redirigido a la página de productos', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  const isLoaded = await productsPage.isPageLoaded();
  expect(isLoaded).toBeTruthy();
});

/**
 * Step: And la URL debe contener "string"
 * Verifica que la URL actual contenga el texto especificado
 */
Then('la URL debe contener {string}', async function (this: CustomWorld, urlPart: string) {
  const currentURL = await this.page!.url();
  expect(currentURL).toContain(urlPart);
});

/**
 * Step: And debo ver el título "string"
 * Verifica que el título de la página sea el esperado
 */
Then('debo ver el título {string}', async function (this: CustomWorld, expectedTitle: string) {
  const productsPage = new ProductsPage(this.page!);
  const actualTitle = await productsPage.getPageTitleText();
  expect(actualTitle).toBe(expectedTitle);
});

/**
 * Step: Then debo ver un mensaje de error
 * Verifica que se muestre un mensaje de error en la página de login
 */
Then('debo ver un mensaje de error', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const isVisible = await loginPage.isErrorMessageVisible();
  expect(isVisible).toBeTruthy();
});

/**
 * Step: And el mensaje debe contener "string"
 * Verifica que el mensaje de error contenga el texto especificado
 */
Then('el mensaje debe contener {string}', async function (this: CustomWorld, expectedText: string) {
  const loginPage = new LoginPage(this.page!);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedText);
});

/**
 * Step: And debo permanecer en la página de login
 * Verifica que el usuario siga en la página de login (login falló)
 */
Then('debo permanecer en la página de login', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const isOnLoginPage = await loginPage.isOnLoginPage();
  expect(isOnLoginPage).toBeTruthy();
});

/**
 * Step: Then debo ver "string"
 * Step genérico para Scenario Outline que verifica diferentes resultados
 */
Then('debo ver {string}', async function (this: CustomWorld, expectedResult: string) {
  if (expectedResult === 'página de productos') {
    const productsPage = new ProductsPage(this.page!);
    const isLoaded = await productsPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
  } else if (expectedResult === 'mensaje de error') {
    const loginPage = new LoginPage(this.page!);
    const isVisible = await loginPage.isErrorMessageVisible();
    expect(isVisible).toBeTruthy();
  }
});
