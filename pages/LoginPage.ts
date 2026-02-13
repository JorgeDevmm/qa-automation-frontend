/**
 * Page Object para la página de Login de Sauce Demo
 * URL: https://www.saucedemo.com/
 * Responsabilidades:
 * - Autenticación de usuarios
 * - Validación de credenciales
 * - Manejo de mensajes de error
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Localizadores de elementos de la página
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // TODO: Definir los selectores correctos basados en la página real de Sauce Demo
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navega a la página de login
   */
  async navigate(): Promise<void> {
    // TODO: Implementar navegación
  }

  /**
   * Ingresa el nombre de usuario en el campo correspondiente
   * @param username - Nombre de usuario a ingresar
   */
  async enterUsername(username: string): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Ingresa la contraseña en el campo correspondiente
   * @param password - Contraseña a ingresar
   */
  async enterPassword(password: string): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Hace clic en el botón de login
   */
  async clickLoginButton(): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Método de alto nivel que realiza el login completo
   * @param username - Nombre de usuario
   * @param password - Contraseña
   */
  async login(username: string, password: string): Promise<void> {
    // TODO: Implementar el flujo completo de login
  }

  /**
   * Obtiene el mensaje de error mostrado en la página
   * @returns El texto del mensaje de error
   */
  async getErrorMessage(): Promise<string> {
    // TODO: Implementar
    return '';
  }

  /**
   * Verifica si el mensaje de error es visible
   * @returns true si el mensaje de error está visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    // TODO: Implementar
    return false;
  }
}
