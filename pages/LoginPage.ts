/**
 * Page Object para la página de Login de Sauce Demo
 * URL: https://www.saucedemo.com/
 * Responsabilidades:
 * - Autenticación de usuarios (standard_user, locked_out_user, etc.)
 * - Validación de credenciales
 * - Manejo de mensajes de error
 * 
 * Cubre Criterios de Aceptación: 1 y 2
 * Cubre Especificación: 4 (diferentes tipos de usuarios)
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // ==================== LOCALIZADORES ====================
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly errorButton: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // Selectores basados en la página real de Sauce Demo
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('.error-button');
  }

  // ==================== MÉTODOS DE NAVEGACIÓN ====================

  /**
   * Navega a la página de login de Sauce Demo
   * Step: "que estoy en la página de login de Sauce Demo"
   */
  async navigate(): Promise<void> {
    await this.page.goto(this.baseURL);
    await this.waitForPageLoad();
  }

  // ==================== MÉTODOS DE ACCIÓN ====================

  /**
   * Ingresa el nombre de usuario en el campo correspondiente
   * Step: "ingreso el usuario {string}"
   * @param username - Nombre de usuario a ingresar
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
  }

  /**
   * Ingresa la contraseña en el campo correspondiente
   * Step: "ingreso la contraseña {string}"
   * @param password - Contraseña a ingresar
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInput, password);
  }

  /**
   * Hace clic en el botón de login
   * Step: "hago clic en el botón de login"
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Método de alto nivel que realiza el login completo
   * Este método encapsula todo el flujo de autenticación
   * Útil para reutilizar en Backgrounds y simplificar steps
   * @param username - Nombre de usuario
   * @param password - Contraseña
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Deja los campos de login vacíos (para pruebas de validación)
   * Step: "dejo los campos de usuario y contraseña vacíos"
   */
  async leaveFieldsEmpty(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  // ==================== MÉTODOS DE VERIFICACIÓN ====================

  /**
   * Obtiene el mensaje de error mostrado en la página
   * Step: "el mensaje debe contener {string}"
   * @returns El texto del mensaje de error
   */
  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }

  /**
   * Verifica si el mensaje de error es visible
   * Step: "debo ver un mensaje de error"
   * @returns true si el mensaje de error está visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Verifica si el mensaje de error contiene un texto específico
   * Step: "el mensaje debe contener {string}"
   * @param expectedText - Texto esperado en el mensaje de error
   * @returns true si el mensaje contiene el texto esperado
   */
  async errorMessageContains(expectedText: string): Promise<boolean> {
    const errorText = await this.getErrorMessage();
    return errorText.includes(expectedText);
  }

  /**
   * Verifica si todavía está en la página de login
   * Útil para validar que el login falló
   * Step: "debo permanecer en la página de login"
   * @returns true si sigue en la página de login
   */
  async isOnLoginPage(): Promise<boolean> {
    return await this.isElementVisible(this.loginButton);
  }
}
