/**
 * Hooks de Cucumber
 * Define el comportamiento antes y después de cada escenario y suite de pruebas
 */
import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: Browser;

/**
 * Hook que se ejecuta UNA VEZ antes de todos los escenarios
 * Inicializa el navegador
 */
BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,      // Cambiar a true para ejecución sin interfaz gráfica
    slowMo: 2000          // Velocidad de ejecución (ms), útil para debugging
  });
});

/**
 * Hook que se ejecuta ANTES de cada escenario
 * Crea un nuevo contexto de navegador y una nueva página
 */
Before(async function (this: CustomWorld) {
  // Crear nuevo contexto (sesión aislada)
  this.context = await browser.newContext();
  
  // Crear nueva página dentro del contexto
  this.page = await this.context.newPage();
});

/**
 * Hook que se ejecuta DESPUÉS de cada escenario
 * Limpia el contexto y cierra la página
 */
After(async function (this: CustomWorld) {
  // Cerrar la página si existe
  if (this.page) {
    await this.page.close();
  }
  
  // Cerrar el contexto si existe
  if (this.context) {
    await this.context.close();
  }
});

/**
 * Hook que se ejecuta UNA VEZ después de todos los escenarios
 * Cierra el navegador
 */
AfterAll(async function () {
  await browser.close();
});
