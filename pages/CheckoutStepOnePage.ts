/**
 * Page Object para Checkout Step One (Información del Cliente)
 * URL: https://www.saucedemo.com/checkout-step-one.html
 * Responsabilidades:
 * - Captura de información del cliente (First Name, Last Name, Postal Code)
 * - Validación de campos obligatorios
 * - Manejo de errores de validación
 * - Navegación al paso 2 del checkout
 * - Cancelar proceso de checkout
 * 
 * Parte del Criterio de Aceptación: 5 (paso 1 de 3)
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {
  // ==================== LOCALIZADORES ====================
  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // Selectores basados en la página real de Sauce Demo
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE PÁGINA ====================

  /**
   * Verifica si la página de información de checkout está cargada
   * Step: "debo ser redirigido a la página de información de checkout"
   * @returns true si la página está cargada
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.firstNameInput);
  }

  /**
   * Verifica si está en la página correcta mediante URL
   * @returns true si la URL contiene "checkout-step-one"
   */
  async isOnCheckoutStepOne(): Promise<boolean> {
    return await this.urlContains('checkout-step-one');
  }

  // ==================== MÉTODOS DE INGRESO DE DATOS ====================

  /**
   * Ingresa el nombre en el formulario
   * Step: "ingreso el nombre {string}"
   * @param firstName - Nombre del cliente
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.fillField(this.firstNameInput, firstName);
  }

  /**
   * Ingresa el apellido en el formulario
   * Step: "ingreso el apellido {string}"
   * @param lastName - Apellido del cliente
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.fillField(this.lastNameInput, lastName);
  }

  /**
   * Ingresa el código postal en el formulario
   * Step: "ingreso el código postal {string}"
   * @param postalCode - Código postal del cliente
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    await this.fillField(this.postalCodeInput, postalCode);
  }

  /**
   * Método de alto nivel que llena todo el formulario de información
   * Step: "completo el formulario de información con nombre {string}, apellido {string} y código postal {string}"
   * @param firstName - Nombre del cliente
   * @param lastName - Apellido del cliente
   * @param postalCode - Código postal del cliente
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  /**
   * Deja los campos del formulario vacíos (para validación)
   * Step: "dejo los campos de información vacíos"
   */
  async leaveFieldsEmpty(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.postalCodeInput.clear();
  }

  // ==================== MÉTODOS DE NAVEGACIÓN ====================

  /**
   * Hace clic en el botón Continue para proceder al siguiente paso
   * Step: "hago clic en el botón Continue"
   */
  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueButton);
  }

  /**
   * Hace clic en el botón Cancel para volver al carrito
   * Step: "hago clic en el botón Cancel"
   */
  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }

  // ==================== MÉTODOS DE VALIDACIÓN DE ERRORES ====================

  /**
   * Obtiene el mensaje de error si existe
   * Step: "el mensaje debe contener {string}"
   * @returns Texto del mensaje de error
   */
  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }

  /**
   * Verifica si hay un mensaje de error visible
   * Step: "debo ver un mensaje de error"
   * @returns true si hay un error visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Verifica si el mensaje de error contiene un texto específico
   * Step: "el mensaje debe contener {string}"
   * @param expectedText - Texto esperado en el error
   * @returns true si el mensaje contiene el texto
   */
  async errorMessageContains(expectedText: string): Promise<boolean> {
    const errorText = await this.getErrorMessage();
    return errorText.includes(expectedText);
  }
}
