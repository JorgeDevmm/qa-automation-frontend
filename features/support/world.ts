/**
 * World de Cucumber
 * Define el contexto compartido entre todos los steps
 * Contiene instancias de Browser, Context y Page de Playwright
 */
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

/**
 * Interface que define las propiedades disponibles en el World
 */
export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

/**
 * Clase que implementa el World customizado
 * Esta clase es accesible en todos los step definitions a través de 'this'
 */
export class CustomWorldImpl extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// Registrar el World customizado en Cucumber
setWorldConstructor(CustomWorldImpl);
