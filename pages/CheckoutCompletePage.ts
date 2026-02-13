/**
 * Page Object para Checkout Complete (Confirmación de Compra)
 * URL: https://www.saucedemo.com/checkout-complete.html
 * Responsabilidades:
 * - Visualización del mensaje de confirmación de compra
 * - Verificación de orden completada exitosamente
 * - Navegación de regreso a la página de productos
 * - Validación de elementos de confirmación
 * 
 * Parte del Criterio de Aceptación: 5 (paso 3 de 3 - confirmación final)
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  // ==================== LOCALIZADORES ====================
  private readonly pageTitle: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly ponyExpressImage: Locator;
  private readonly backHomeButton: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // Selectores basados en la página real de Sauce Demo
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('#back-to-products');
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE PÁGINA ====================

  /**
   * Verifica si la página de confirmación está cargada
   * Step: "debo ser redirigido a la página de confirmación"
   * @returns true si la página está cargada
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.completeHeader);
  }

  /**
   * Verifica si está en la página correcta mediante URL
   * @returns true si la URL contiene "checkout-complete"
   */
  async isOnCheckoutComplete(): Promise<boolean> {
    return await this.urlContains('checkout-complete');
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE MENSAJES ====================

  /**
   * Obtiene el texto del encabezado de confirmación
   * Debe ser: "Thank you for your order!" o "THANK YOU FOR YOUR ORDER"
   * Step: "debo ver el mensaje {string}"
   * @returns Texto del encabezado
   */
  async getCompleteHeader(): Promise<string> {
    return await this.getElementText(this.completeHeader);
  }

  /**
   * Obtiene el texto del mensaje de confirmación
   * Debe contener información sobre el despacho de la orden
   * Step: "debo ver el mensaje de confirmación de despacho"
   * @returns Texto del mensaje de confirmación
   */
  async getCompleteText(): Promise<string> {
    return await this.getElementText(this.completeText);
  }

  /**
   * Verifica si el encabezado de confirmación contiene "Thank you"
   * Step: "debo ver el mensaje Thank you for your order!"
   * @returns true si el mensaje de agradecimiento está presente
   */
  async isThankYouMessageDisplayed(): Promise<boolean> {
    const header = await this.getCompleteHeader();
    return header.toLowerCase().includes('thank you for your order');
  }

  /**
   * Verifica si el mensaje de confirmación menciona el despacho
   * Step: "debo ver el mensaje de confirmación de despacho"
   * @returns true si menciona "dispatch" o "despacho"
   */
  async isDispatchMessageDisplayed(): Promise<boolean> {
    const text = await this.getCompleteText();
    return text.toLowerCase().includes('dispatch') || 
           text.toLowerCase().includes('shipped');
  }

  /**
   * Verifica si la imagen de confirmación (Pony Express) es visible
   * Step: "debo ver la imagen de confirmación"
   * @returns true si la imagen está visible
   */
  async isConfirmationImageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.ponyExpressImage);
  }

  // ==================== MÉTODOS DE NAVEGACIÓN ====================

  /**
   * Hace clic en el botón Back Home para volver a la página de productos
   * Step: "hago clic en el botón Back Home"
   */
  async clickBackHome(): Promise<void> {
    await this.clickElement(this.backHomeButton);
  }

  // ==================== MÉTODOS DE VERIFICACIÓN COMPLETA ====================

  /**
   * Verifica que todos los elementos de confirmación estén presentes
   * Útil para validación completa de la página
   * @returns true si todos los elementos están presentes
   */
  async verifyOrderComplete(): Promise<boolean> {
    const headerVisible = await this.isThankYouMessageDisplayed();
    const textVisible = await this.isDispatchMessageDisplayed();
    const imageVisible = await this.isConfirmationImageVisible();
    const buttonVisible = await this.isElementVisible(this.backHomeButton);
    
    return headerVisible && textVisible && imageVisible && buttonVisible;
  }
}
