/**
 * Page Object para la página del Carrito de Compras de Sauce Demo
 * URL: https://www.saucedemo.com/cart.html
 * Responsabilidades:
 * - Visualización de productos agregados al carrito
 * - Eliminación de productos del carrito
 * - Navegación al checkout
 * - Validación de carrito vacío
 * - Continuar comprando
 * 
 * Cubre Criterio de Aceptación: 4
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // ==================== LOCALIZADORES ====================
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly cartItemName: Locator;
  private readonly cartItemPrice: Locator;
  private readonly cartQuantity: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  /**
   * Constructor que inicializa los localizadores
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    super(page);
    
    // Selectores basados en la página real de Sauce Demo
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.cartQuantity = page.locator('.cart_quantity');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE PÁGINA ====================

  /**
   * Verifica si la página del carrito está cargada
   * Step: "navego al carrito de compras"
   * @returns true si la página está cargada
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.pageTitle);
  }

  /**
   * Verifica si el título de la página es "Your Cart"
   * @returns true si el título es correcto
   */
  async isOnCartPage(): Promise<boolean> {
    const title = await this.getElementText(this.pageTitle);
    return title === 'Your Cart';
  }

  // ==================== MÉTODOS DE GESTIÓN DE PRODUCTOS ====================

  /**
   * Obtiene la cantidad de productos en el carrito
   * Step: "debo ver {int} productos en el carrito"
   * @returns Número de productos en el carrito
   */
  async getCartItemsCount(): Promise<number> {
    return await this.getElementCount(this.cartItems);
  }

  /**
   * Obtiene los nombres de todos los productos en el carrito
   * Step: "debo ver el producto {string} en el carrito"
   * @returns Array con los nombres de los productos
   */
  async getCartProductNames(): Promise<string[]> {
    const productNames: string[] = [];
    const nameElements = await this.cartItemName.all();
    
    for (const nameElement of nameElements) {
      const name = await nameElement.textContent();
      if (name) {
        productNames.push(name.trim());
      }
    }
    
    return productNames;
  }

  /**
   * Verifica si un producto específico está en el carrito
   * Step: "debo ver el producto {string} en el carrito"
   * @param productName - Nombre del producto a verificar
   * @returns true si el producto está en el carrito
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const productNames = await this.getCartProductNames();
    return productNames.includes(productName);
  }

  /**
   * Genera el locator del botón "Remove" para un producto específico en el carrito
   * @param productName - Nombre del producto
   * @returns Locator del botón Remove
   */
  private getRemoveButton(productName: string): Locator {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="remove-${formattedName}"]`);
  }

  /**
   * Elimina un producto del carrito por su nombre
   * Step: "remuevo el producto {string} del carrito"
   * @param productName - Nombre del producto a eliminar
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.getRemoveButton(productName);
    await this.clickElement(removeButton);
  }

  /**
   * Verifica si el carrito está vacío
   * Step: "el carrito debe estar vacío"
   * @returns true si el carrito no tiene productos
   */
  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartItemsCount();
    return count === 0;
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE DETALLES ====================

  /**
   * Verifica si el precio de un producto es visible
   * Step: "debo ver el precio del producto"
   * @returns true si hay al menos un precio visible
   */
  async isPriceVisible(): Promise<boolean> {
    return await this.isElementVisible(this.cartItemPrice);
  }

  /**
   * Verifica si la cantidad es visible y correcta
   * Step: "debo ver la cantidad correcta"
   * @returns true si la cantidad es visible
   */
  async isQuantityVisible(): Promise<boolean> {
    return await this.isElementVisible(this.cartQuantity);
  }

  /**
   * Obtiene el precio de un producto específico del carrito
   * @returns El precio como string (ej: "$29.99")
   */
  async getProductPrice(): Promise<string> {
    return await this.getElementText(this.cartItemPrice);
  }

  // ==================== MÉTODOS DE NAVEGACIÓN ====================

  /**
   * Hace clic en el botón Checkout para proceder con la compra
   * Step: "hago clic en el botón Checkout"
   */
  async clickCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }

  /**
   * Hace clic en Continue Shopping para volver a la página de productos
   */
  async clickContinueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
  }

  /**
   * Verifica si está en la página del carrito mediante URL
   * Step: "debo ser redirigido al carrito de compras"
   * @returns true si la URL contiene "cart.html"
   */
  async isOnCartPageByUrl(): Promise<boolean> {
    return await this.urlContains('cart.html');
  }
}
