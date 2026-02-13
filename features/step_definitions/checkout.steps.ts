/**
 * Step Definitions para los escenarios de Proceso de Compra
 * Implementa los pasos definidos en 3-checkout.feature
 * Cubre el Criterio de Aceptación 5
 */
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

// ==================== GIVEN STEPS ====================

/**
 * Step: Given que tengo productos en el carrito
 * Pre-condición: agrega un producto genérico al carrito
 */
Given('que tengo productos en el carrito', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.addProductToCart('Sauce Labs Backpack');
});

/**
 * Step: Given que tengo el producto "string" en el carrito
 * Pre-condición: agrega un producto específico al carrito
 */
Given('que tengo el producto {string} en el carrito', async function (this: CustomWorld, productName: string) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.addProductToCart(productName);
});

/**
 * Step: Given que estoy en la página del carrito
 * Pre-condición: navega a la página del carrito
 */
Given('que estoy en la página del carrito', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.goToCart();
});

/**
 * Step: Given que estoy en el paso 1 del checkout
 * Pre-condición: navega hasta el formulario de datos del cliente
 */
Given('que estoy en el paso {int} del checkout', async function (this: CustomWorld, stepNumber: number) {
  const productsPage = new ProductsPage(this.page!);
  await productsPage.goToCart();
  
  const cartPage = new CartPage(this.page!);
  await cartPage.clickCheckout();
  
  if (stepNumber === 2) {
    // Si necesitamos estar en el paso 2, completar el paso 1
    const checkoutStepOne = new CheckoutStepOnePage(this.page!);
    await checkoutStepOne.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutStepOne.clickContinue();
  }
});

// ==================== WHEN STEPS ====================

/**
 * Step: When hago clic en el botón "Checkout"
 * Inicia el proceso de checkout desde el carrito
 */
When('hago clic en el botón {string}', async function (this: CustomWorld, buttonText: string) {
  if (buttonText === 'Checkout') {
    const cartPage = new CartPage(this.page!);
    await cartPage.clickCheckout();
  } else if (buttonText === 'Continue') {
    const checkoutStepOne = new CheckoutStepOnePage(this.page!);
    await checkoutStepOne.clickContinue();
  } else if (buttonText === 'Finish') {
    const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
    await checkoutStepTwo.clickFinish();
  } else if (buttonText === 'Cancel') {
    // Maneja el botón Cancel según en qué página estemos
    const url = this.page!.url();
    if (url.includes('checkout-step-one')) {
      const checkoutStepOne = new CheckoutStepOnePage(this.page!);
      await checkoutStepOne.clickCancel();
    } else if (url.includes('checkout-step-two')) {
      const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
      await checkoutStepTwo.clickCancel();
    }
  } else if (buttonText === 'Back Home') {
    const checkoutComplete = new CheckoutCompletePage(this.page!);
    await checkoutComplete.clickBackHome();
  }
});

/**
 * Step: When ingreso el nombre "string"
 * Completa el campo First Name en el formulario de checkout
 */
When('ingreso el nombre {string}', async function (this: CustomWorld, firstName: string) {
  const checkoutStepOne = new CheckoutStepOnePage(this.page!);
  await checkoutStepOne.enterFirstName(firstName);
});

/**
 * Step: When ingreso el apellido "string"
 * Completa el campo Last Name en el formulario de checkout
 */
When('ingreso el apellido {string}', async function (this: CustomWorld, lastName: string) {
  const checkoutStepOne = new CheckoutStepOnePage(this.page!);
  await checkoutStepOne.enterLastName(lastName);
});

/**
 * Step: When ingreso el código postal "string"
 * Completa el campo Postal Code en el formulario de checkout
 */
When('ingreso el código postal {string}', async function (this: CustomWorld, postalCode: string) {
  const checkoutStepOne = new CheckoutStepOnePage(this.page!);
  await checkoutStepOne.enterPostalCode(postalCode);
});

/**
 * Step: When completo el proceso de compra con la información "string", "string", "string"
 * Flujo de alto nivel: completa todo el checkout desde el carrito hasta la confirmación
 */
When('completo el proceso de compra con la información {string}, {string}, {string}', 
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    // Paso 1: Ir al checkout desde el carrito
    const cartPage = new CartPage(this.page!);
    await cartPage.clickCheckout();
    
    // Paso 2: Completar información del cliente
    const checkoutStepOne = new CheckoutStepOnePage(this.page!);
    await checkoutStepOne.fillCheckoutInformation(firstName, lastName, postalCode);
    await checkoutStepOne.clickContinue();
    
    // Paso 3: Finalizar compra desde el resumen
    const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
    await checkoutStepTwo.clickFinish();
});

/**
 * Step: When dejo el campo "string" vacío
 * No completa un campo específico del formulario (para testing de validaciones)
 */
When('dejo el campo {string} vacío', async function (this: CustomWorld, fieldName: string) {
  // No hacemos nada, el campo queda vacío por defecto
  // Este step es declarativo para los escenarios de validación
});

// ==================== THEN STEPS ====================

/**
 * Step: Then debo ser redirigido a "string"
 * Verifica que la URL actual corresponda a la página esperada
 */
Then('debo ser redirigido a {string}', async function (this: CustomWorld, expectedPath: string) {
  await this.page!.waitForURL(`**/${expectedPath}`, { timeout: 5000 });
  expect(this.page!.url()).toContain(expectedPath);
});

/**
 * Step: Then debo ver el producto "string" en el resumen
 * Verifica que un producto específico esté listado en el resumen del pedido
 */
Then('debo ver el producto {string} en el resumen', async function (this: CustomWorld, productName: string) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const isInSummary = await checkoutStepTwo.isProductInSummary(productName);
  expect(isInSummary).toBeTruthy();
});

/**
 * Step: And debo ver la información de pago
 * Verifica que la sección Payment Information sea visible
 */
Then('debo ver la información de pago', async function (this: CustomWorld) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const isPaymentInfoVisible = await checkoutStepTwo.isPaymentInfoVisible();
  expect(isPaymentInfoVisible).toBeTruthy();
});

/**
 * Step: And debo ver la información de envío
 * Verifica que la sección Shipping Information sea visible
 */
Then('debo ver la información de envío', async function (this: CustomWorld) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const isShippingInfoVisible = await checkoutStepTwo.isShippingInfoVisible();
  expect(isShippingInfoVisible).toBeTruthy();
});

/**
 * Step: And debo ver el subtotal correcto
 * Verifica que el subtotal sea un valor numérico válido
 */
Then('debo ver el subtotal correcto', async function (this: CustomWorld) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const subtotal = await checkoutStepTwo.getSubtotal();
  expect(subtotal).toBeGreaterThan(0);
});

/**
 * Step: And debo ver el impuesto calculado
 * Verifica que el impuesto sea un valor numérico válido
 */
Then('debo ver el impuesto calculado', async function (this: CustomWorld) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const tax = await checkoutStepTwo.getTax();
  expect(tax).toBeGreaterThanOrEqual(0);
});

/**
 * Step: And debo ver el total correcto
 * Verifica que el total sea igual a subtotal + impuesto
 */
Then('debo ver el total correcto', async function (this: CustomWorld) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const isValid = await checkoutStepTwo.verifyPriceCalculations();
  expect(isValid).toBeTruthy();
});

/**
 * Step: Then debo ver el mensaje "THANK YOU FOR YOUR ORDER"
 * Verifica que el mensaje de agradecimiento sea visible en la página de confirmación
 */
Then('debo ver el mensaje {string}', async function (this: CustomWorld, expectedMessage: string) {
  const checkoutComplete = new CheckoutCompletePage(this.page!);
  
  if (expectedMessage === 'THANK YOU FOR YOUR ORDER') {
    const isDisplayed = await checkoutComplete.isThankYouMessageDisplayed();
    expect(isDisplayed).toBeTruthy();
  } else if (expectedMessage.includes('dispatch')) {
    const isDisplayed = await checkoutComplete.isDispatchMessageDisplayed();
    expect(isDisplayed).toBeTruthy();
  }
});

/**
 * Step: And debo ver la confirmación del pedido
 * Verifica todos los elementos de confirmación de orden completa
 */
Then('debo ver la confirmación del pedido', async function (this: CustomWorld) {
  const checkoutComplete = new CheckoutCompletePage(this.page!);
  const isComplete = await checkoutComplete.verifyOrderComplete();
  expect(isComplete).toBeTruthy();
});

/**
 * Step: Then debo ver un mensaje de error indicando "string"
 * Verifica que se muestre un mensaje de error específico en el formulario
 */
Then('debo ver un mensaje de error indicando {string}', async function (this: CustomWorld, expectedErrorPart: string) {
  const checkoutStepOne = new CheckoutStepOnePage(this.page!);
  const errorMessage = await checkoutStepOne.getErrorMessage();
  expect(errorMessage.toLowerCase()).toContain(expectedErrorPart.toLowerCase());
});

/**
 * Step: And debo permanecer en "string"
 * Verifica que no haya habido navegación y la URL actual sea la esperada
 */
Then('debo permanecer en {string}', async function (this: CustomWorld, expectedPath: string) {
  await this.page!.waitForTimeout(1000); // Pequeña espera para confirmar que no hay navegación
  expect(this.page!.url()).toContain(expectedPath);
});

/**
 * Step: Then debo ver {int} productos en el resumen
 * Verifica que el resumen del pedido contenga exactamente N productos
 */
Then('debo ver {int} productos en el resumen', async function (this: CustomWorld, expectedCount: number) {
  const checkoutStepTwo = new CheckoutStepTwoPage(this.page!);
  const productNames = await checkoutStepTwo.getProductNames();
  expect(productNames.length).toBe(expectedCount);
});

/**
 * Step: Then debo estar de vuelta en la página de productos
 * Verifica que se haya navegado de regreso a la página de inventario
 */
Then('debo estar de vuelta en la página de productos', async function (this: CustomWorld) {
  await this.page!.waitForURL('**/inventory.html', { timeout: 5000 });
  const productsPage = new ProductsPage(this.page!);
  const isOnProductsPage = await productsPage.isOnProductsPage();
  expect(isOnProductsPage).toBeTruthy();
});
