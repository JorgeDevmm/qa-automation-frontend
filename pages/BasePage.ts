/**
 * Clase Base para todos los Page Objects
 * Contiene métodos y propiedades comunes a todas las páginas
 * Implementa el patrón Page Object Model (POM)
 */
import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected readonly baseURL = 'https://www.saucedemo.com';

  /**
   * Constructor base que recibe la instancia de Page de Playwright
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Espera a que la página termine de cargar (networkidle)
   * Útil después de navegaciones o acciones que causan carga de página
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Espera a que la página termine de cargar (domcontentloaded)
   * Más rápido que networkidle, útil para interacciones rápidas
   */
  async waitForDOMLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
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
   * Verifica si la URL actual contiene un texto específico
   * @param urlPart - Parte de la URL a verificar
   * @returns true si la URL contiene el texto especificado
   */
  async urlContains(urlPart: string): Promise<boolean> {
    return this.page.url().includes(urlPart);
  }

  /**
   * Toma una captura de pantalla de la página
   * @param name - Nombre del archivo de captura (sin extensión)
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Espera por un elemento específico que sea visible
   * @param locator - Locator del elemento a esperar
   * @param timeout - Tiempo máximo de espera en milisegundos (opcional)
   */
  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Hace clic en un elemento después de esperar que sea visible
   * @param locator - Locator del elemento a clickear
   */
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Llena un campo de texto después de esperar que sea visible
   * @param locator - Locator del campo de texto
   * @param text - Texto a ingresar
   */
  async fillField(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Obtiene el texto de un elemento
   * @param locator - Locator del elemento
   * @returns El texto del elemento
   */
  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.textContent() || '';
  }

  /**
   * Verifica si un elemento es visible
   * @param locator - Locator del elemento
   * @returns true si el elemento es visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el conteo de elementos que coinciden con un locator
   * @param locator - Locator de los elementos a contar
   * @returns Número de elementos encontrados
   */
  async getElementCount(locator: Locator): Promise<number> {
    try {
      return await locator.count();
    } catch {
      return 0;
    }
  }
}
