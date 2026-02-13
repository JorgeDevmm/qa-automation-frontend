/**
 * Page Object para Checkout Step Two (Resumen de la Orden)
 * URL: https://www.saucedemo.com/checkout-step-two.html
 * Responsabilidades:
 * - Visualización del resumen de productos
 * - Visualización de información de pago y envío
 * - Cálculo y visualización de precios (subtotal, tax, total)
 * - Verificación de cálculos correctos
 * - Finalización de la compra
 * - Cancelar orden
 * 
 * Parte del Criterio de Aceptación: 5 (paso 2 de 3)
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  // ==================== LOCALIZADORES ====================
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly cartItemName: Locator;
  private readonly paymentInfo: Locator;
  private readonly shippingInfo: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

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
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
  }

  // ==================== MÉTODOS DE VERIFICACIÓN DE PÁGINA ====================

  /**
   * Verifica si la página está cargada
   * Step: "debo ser redirigido a la página de resumen de compra"
   * @returns true si la página está cargada
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.pageTitle);
  }

  /**
   * Verifica si está en la página correcta mediante URL
   * @returns true si la URL contiene "checkout-step-two"
   */
  async isOnCheckoutStepTwo(): Promise<boolean> {
    return await this.urlContains('checkout-step-two');
  }

  // ==================== MÉTODOS DE CONSULTA DE PRODUCTOS ====================

  /**
   * Obtiene los nombres de los productos en el resumen
   * Step: "debo ver el producto {string} en el resumen"
   * @returns Array con los nombres de los productos
   */
  async getProductNames(): Promise<string[]> {
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
   * Verifica si un producto específico está en el resumen
   * Step: "debo ver el producto {string} en el resumen"
   * @param productName - Nombre del producto a verificar
   * @returns true si el producto está en el resumen
   */
  async isProductInSummary(productName: string): Promise<boolean> {
    const productNames = await this.getProductNames();
    return productNames.includes(productName);
  }

  /**
   * Obtiene la cantidad de productos en el resumen
   * Step: "debo ver {int} productos en el resumen de compra"
   * @returns Número de productos
   */
  async getProductCount(): Promise<number> {
    return await this.getElementCount(this.cartItems);
  }

  // ==================== MÉTODOS DE INFORMACIÓN Y PRECIOS ====================

  /**
   * Verifica si la información de pago está visible
   * Step: "debo ver la información de pago"
   * @returns true si la información de pago es visible
   */
  async isPaymentInfoVisible(): Promise<boolean> {
    return await this.isElementVisible(this.paymentInfo);
  }

  /**
   * Verifica si la información de envío está visible
   * Step: "debo ver la información de envío"
   * @returns true si la información de envío es visible
   */
  async isShippingInfoVisible(): Promise<boolean> {
    return await this.isElementVisible(this.shippingInfo);
  }

  /**
   * Obtiene el subtotal de la orden (sin impuestos)
   * Step: "debo ver el subtotal calculado correctamente"
   * @returns Valor del subtotal como número
   */
  async getSubtotal(): Promise<number> {
    const subtotalText = await this.getElementText(this.subtotalLabel);
    // Extrae el número del formato "Item total: $29.99"
    const match = subtotalText.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Obtiene el monto del impuesto (tax)
   * Step: "debo ver el impuesto calculado"
   * @returns Valor del impuesto como número
   */
  async getTax(): Promise<number> {
    const taxText = await this.getElementText(this.taxLabel);
    // Extrae el número del formato "Tax: $2.40"
    const match = taxText.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Obtiene el total de la orden (subtotal + tax)
   * Step: "debo ver el total calculado correctamente"
   * @returns Valor total como número
   */
  async getTotal(): Promise<number> {
    const totalText = await this.getElementText(this.totalLabel);
    // Extrae el número del formato "Total: $32.39"
    const match = totalText.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Verifica que los cálculos sean correctos (subtotal + tax = total)
   * Step: "debo ver el total calculado correctamente"
   * @returns true si los cálculos son correctos (con margen de 0.01 por redondeo)
   */
  async verifyPriceCalculations(): Promise<boolean> {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    const calculatedTotal = subtotal + tax;
    
    // Verificar con margen de error de 0.01 por decimales
    return Math.abs(calculatedTotal - total) < 0.01;
  }

  // ==================== MÉTODOS DE NAVEGACIÓN ====================

  /**
   * Hace clic en el botón Finish para completar la compra
   * Step: "hago clic en el botón Finish"
   */
  async clickFinish(): Promise<void> {
    await this.clickElement(this.finishButton);
  }

  /**
   * Hace clic en el botón Cancel para cancelar la orden
   * Step: "hago clic en el botón Cancel desde el resumen"
   */
  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }
}
