/**
 * Page Object para la página de Productos de Sauce Demo
 * URL: https://www.saucedemo.com/inventory.html
 * Responsabilidades:
 * - Visualización del catálogo de productos
 * - Agregar productos al carrito
 * - Remover productos del carrito
 * - Navegación al carrito
 * - Verificación de badge del carrito
 * 
 * Cubre Criterio de Aceptación: 3
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // ==================== LOCALIZADORES ====================
  private readonly pageTitle: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly inventoryItems: Locator;
  private readonly burgerMenuButton: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // Selectores basados en la página real de Sauce Demo
    this.pageTitle = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.inventoryItems = page.locator('.inventory_item');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE PÁGINA ====================

  /**
   * Verifica si la página de productos está cargada
   * Step: "debo ser redirigido a la página de productos"
   * @returns true si el título de la página es visible
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.pageTitle);
  }

  /**
   * Alias para isPageLoaded - verifica que estamos en la página de productos
   * Step: "debo estar de vuelta en la página de productos"
   * @returns true si estamos en la página de productos
   */
  async isOnProductsPage(): Promise<boolean> {
    return await this.isPageLoaded();
  }

  /**
   * Obtiene el texto del título de la página
   * Debería ser "Products"
   * Step: "debo ver el título {string}"
   * @returns El texto del título
   */
  async getPageTitleText(): Promise<string> {
    return await this.getElementText(this.pageTitle);
  }

  // ==================== MÉTODOS DE GESTIÓN DE PRODUCTOS ====================

  /**
   * Genera el locator del botón "Add to cart" para un producto específico
   * Sauce Demo usa el patrón: data-test="add-to-cart-nombre-en-minusculas-con-guiones"
   * @param productName - Nombre del producto
   * @returns Locator del botón Add to cart
   */
  private getAddToCartButton(productName: string): Locator {
    // Convertir nombre del producto a formato de data-test
    // Ejemplo: "Sauce Labs Backpack" -> "sauce-labs-backpack"
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
  }

  /**
   * Genera el locator del botón "Remove" para un producto específico
   * @param productName - Nombre del producto
   * @returns Locator del botón Remove
   */
  private getRemoveButton(productName: string): Locator {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="remove-${formattedName}"]`);
  }

  /**
   * Agrega un producto al carrito por su nombre
   * Step: "agrego el producto {string} al carrito"
   * @param productName - Nombre del producto a agregar
   */
  async addProductToCart(productName: string): Promise<void> {
    const addButton = this.getAddToCartButton(productName);
    await this.clickElement(addButton);
  }

  /**
   * Remueve un producto del carrito desde la página de productos
   * @param productName - Nombre del producto a remover
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.getRemoveButton(productName);
    await this.clickElement(removeButton);
  }

  /**
   * Agrega múltiples productos al carrito
   * Útil para escenarios que requieren varios productos
   * @param productNames - Array con los nombres de los productos a agregar
   */
  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  /**
   * Verifica si el botón de un producto muestra "Remove" (producto agregado)
   * Step: "el botón del producto debe cambiar a Remove"
   * @param productName - Nombre del producto
   * @returns true si el botón es Remove (producto está en el carrito)
   */
  async isProductAdded(productName: string): Promise<boolean> {
    const removeButton = this.getRemoveButton(productName);
    return await this.isElementVisible(removeButton);
  }

  // ==================== MÉTODOS DE BADGE DEL CARRITO ====================

  /**
   * Obtiene la cantidad de productos en el carrito desde el badge
   * Step: "el badge del carrito debe mostrar {string}"
   * @returns Número de productos en el carrito, 0 si no hay badge
   */
  async getCartItemCount(): Promise<number> {
    try {
      const badgeText = await this.getElementText(this.shoppingCartBadge);
      return parseInt(badgeText) || 0;
    } catch {
      // Si el badge no está visible, retornar 0
      return 0;
    }
  }

  /**
   * Verifica si el badge del carrito es visible
   * Step: "el badge del carrito no debe ser visible"
   * @returns true si el badge está visible
   */
  async isCartBadgeVisible(): Promise<boolean> {
    return await this.isElementVisible(this.shoppingCartBadge);
  }

  /**
   * Verifica que el badge muestre el número esperado
   * Step: "el badge del carrito debe mostrar {string}"
   * @param expectedCount - Número esperado en el badge
   * @returns true si el badge muestra el número esperado
   */
  async cartBadgeShowsCount(expectedCount: number): Promise<boolean> {
    const actualCount = await this.getCartItemCount();
    return actualCount === expectedCount;
  }

  // ==================== MÉTODOS DE NAVEGACIÓN ====================

  /**
   * Hace clic en el ícono del carrito para navegar a la página del carrito
   * Step: "navego al carrito de compras"
   */
  async goToCart(): Promise<void> {
    await this.clickElement(this.shoppingCartLink);
  }

  // ==================== MÉTODOS DE CONSULTA DE PRODUCTOS ====================

  /**
   * Obtiene la lista de todos los nombres de productos disponibles
   * Útil para validaciones y reportes
   * @returns Array con los nombres de los productos
   */
  async getAvailableProducts(): Promise<string[]> {
    const productNames: string[] = [];
    const items = await this.inventoryItems.all();
    
    for (const item of items) {
      const nameLocator = item.locator('.inventory_item_name');
      const name = await nameLocator.textContent();
      if (name) {
        productNames.push(name);
      }
    }
    
    return productNames;
  }

  /**
   * Obtiene el número total de productos disponibles en la página
   * @returns Cantidad de productos en la página
   */
  async getProductCount(): Promise<number> {
    return await this.getElementCount(this.inventoryItems);
  }
}
