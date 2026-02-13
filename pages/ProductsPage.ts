/**
 * Page Object para la página de Productos de Sauce Demo
 * URL: https://www.saucedemo.com/inventory.html
 * Responsabilidades:
 * - Visualización del catálogo de productos
 * - Agregar productos al carrito
 * - Navegación al carrito
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // Localizadores de elementos de la página
  private readonly pageTitle: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly shoppingCartLink: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // TODO: Definir los selectores correctos basados en la página real
    this.pageTitle = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Verifica si la página de productos está cargada
   * @returns true si el título de la página es visible
   */
  async isPageLoaded(): Promise<boolean> {
    // TODO: Implementar
    return false;
  }

  /**
   * Agrega un producto al carrito por su nombre
   * @param productName - Nombre del producto a agregar
   */
  async addProductToCart(productName: string): Promise<void> {
    // TODO: Implementar lógica para encontrar y hacer clic en el botón "Add to cart" del producto
  }

  /**
   * Agrega múltiples productos al carrito
   * @param productNames - Array con los nombres de los productos a agregar
   */
  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Obtiene la cantidad de productos en el carrito desde el badge
   * @returns Número de productos en el carrito
   */
  async getCartItemCount(): Promise<number> {
    // TODO: Implementar
    return 0;
  }

  /**
   * Hace clic en el ícono del carrito para navegar a la página del carrito
   */
  async goToCart(): Promise<void> {
    // TODO: Implementar
  }

  /**
   * Obtiene la lista de todos los productos disponibles
   * @returns Array con los nombres de los productos
   */
  async getAvailableProducts(): Promise<string[]> {
    // TODO: Implementar
    return [];
  }
}
