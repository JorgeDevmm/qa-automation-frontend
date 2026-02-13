/**
 * Page Object para Checkout Step One (Información del Cliente)
 * URL: https://www.saucedemo.com/checkout-step-one.html
 * Responsabilidades:
 * - Captura de información del cliente (First Name, Last Name, Postal Code)
 * - Validación de formulario
 * - Navegación al paso 2 del checkout
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {
  // Localizadores de elementos del formulario
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
    
    // TODO: Definir los selectores correctos basados en la página real
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Verifica si la página está cargada
   * @returns true si la página está cargada
   */
  async isPageLoaded(): Promise<boolean> {
    // TODO: Implementar
    return false;
  }

  /**
   * Ingresa el nombre en el formulario
   * @param firstName - Nombre del cliente
   */
  async enterFirstName(firstName: string): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Ingresa el apellido en el formulario
   * @param lastName - Apellido del cliente
   */
  async enterLastName(lastName: string): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Ingresa el código postal en el formulario
   * @param postalCode - Código postal del cliente
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Método de alto nivel que llena todo el formulario de información
   * @param firstName - Nombre del cliente
   * @param lastName - Apellido del cliente
   * @param postalCode - Código postal del cliente
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    // TODO: Implementar llenado completo del formulario
  }

  /**
   * Hace clic en el botón Continue para proceder al siguiente paso
   */
  async clickContinue(): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Hace clic en el botón Cancel para volver al carrito
   */
  async clickCancel(): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Obtiene el mensaje de error si existe
   * @returns Texto del mensaje de error
   */
  async getErrorMessage(): Promise<string> {
    // TODO: Implementar
    return '';
  }

  /**
   * Verifica si hay un mensaje de error visible
   * @returns true si hay un error visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    // TODO: Implementar
    return false;
  }
}
