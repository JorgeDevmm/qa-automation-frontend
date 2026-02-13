/**
 * Clase Base para todos los Page Objects
 * Contiene métodos y propiedades comunes a todas las páginas
 * Implementa el patrón Page Object Model (POM)
 */
import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  /**
   * Constructor base que recibe la instancia de Page de Playwright
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Espera a que la página termine de cargar
   * Útil después de navegaciones o acciones que causan carga de página
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Obtiene el título de la página actual
   * @returns El título de la página
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Obtiene la URL actual de la página
   * @returns La URL completa de la página actual
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Toma una captura de pantalla de la página
   * @param name - Nombre del archivo de captura (sin extensión)
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * Espera por un elemento específico
   * @param selector - Selector del elemento a esperar
   * @param timeout - Tiempo máximo de espera en milisegundos (opcional)
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
