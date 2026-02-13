/**
 * Hooks de Cucumber
 * Define el comportamiento antes y después de cada escenario y suite de pruebas
 */
import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
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
    slowMo: 500          // Velocidad de ejecución (ms), útil para debugging
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
 * Captura screenshot si el escenario falló y limpia el contexto
 */
After(async function (this: CustomWorld, scenario) {
  // Si el escenario falló, capturar screenshot
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page!.screenshot();
    
    // Adjuntar screenshot al reporte de Cucumber
    this.attach(screenshot, 'image/png');
    
    // También guardar en carpeta screenshots/ con nombre descriptivo
    const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const timestamp = Date.now();
    await this.page!.screenshot({ 
      path: `screenshots/fail-${scenarioName}-${timestamp}.png`,
      fullPage: true
    });
  }
  
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

 * Capturar screenshots de TODOS los escenarios 
 * 
 * 
 * Si necesitas capturar pantallas de todas las ejecuciones
 * comenta el hook After de arriba y descomenta
 * este hook alternativo.
 * 
 */

/*
After(async function (this: CustomWorld, scenario) {
  // Capturar screenshot SIEMPRE (tanto si pasa como si falla)
  const screenshot = await this.page!.screenshot();
  const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const timestamp = Date.now();
  
  // Determinar el estado para el nombre del archivo
  const status = scenario.result?.status === Status.FAILED ? 'fail' : 'pass';
  
  // Adjuntar al reporte de Cucumber
  this.attach(screenshot, 'image/png');
  
  // Guardar en carpeta screenshots/ con estado en el nombre
  await this.page!.screenshot({ 
    path: `screenshots/${status}-${scenarioName}-${timestamp}.png`,
    fullPage: true
  });
  
  // Cerrar la página si existe
  if (this.page) {
    await this.page.close();
  }
  
  // Cerrar el contexto si existe
  if (this.context) {
    await this.context.close();
  }
});
*/

/**
 * Hook que se ejecuta UNA VEZ después de todos los escenarios
 * Cierra el navegador
 */
AfterAll(async function () {
  await browser.close();
});
