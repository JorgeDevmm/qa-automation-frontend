# Estructura del Proyecto

Este documento describe la estructura completa del proyecto de automatización.

## 📁 Estructura de Carpetas

```
qa-automation-frontend/
├── features/                           # Archivos de características BDD
│   ├── 1-login.feature                # Escenarios de autenticación
│   ├── 2-cart.feature                 # Escenarios de gestión del carrito
│   ├── 3-checkout.feature             # Escenarios de proceso de compra
│   ├── step_definitions/              # Definiciones de pasos
│   │   ├── login.steps.ts
│   │   ├── cart.steps.ts
│   │   └── checkout.steps.ts
│   └── support/                       # Archivos de soporte
│       ├── hooks.ts                   # Hooks del ciclo de vida
│       └── world.ts                   # Contexto compartido
├── pages/                             # Page Object Model
│   ├── BasePage.ts                    # Clase base con métodos comunes
│   ├── LoginPage.ts                   # Página de login
│   ├── ProductsPage.ts                # Página de productos
│   ├── CartPage.ts                    # Página del carrito
│   ├── CheckoutStepOnePage.ts         # Checkout - Información
│   ├── CheckoutStepTwoPage.ts         # Checkout - Resumen
│   └── CheckoutCompletePage.ts        # Checkout - Confirmación
├── reports/                           # Reportes de ejecución (generados)
├── screenshots/                       # Capturas de pantalla (generadas)
├── tests/                             # Tests de Playwright (opcional)
├── cucumber.js                        # Configuración de Cucumber
├── tsconfig.json                      # Configuración de TypeScript
├── playwright.config.ts               # Configuración de Playwright
└── package.json                       # Dependencias y scripts
```

## 🏗️ Arquitectura: 3 Capas del POM

### Capa 1: Features (Gherkin)
- Define **QUÉ** se prueba en lenguaje natural
- Ubicación: `features/*.feature`
- Sintaxis: Gherkin (Given, When, Then)

### Capa 2: Step Definitions
- Define **CÓMO** se ejecutan las pruebas
- Ubicación: `features/step_definitions/*.steps.ts`
- Orquesta los Page Objects
- Contiene assertions

### Capa 3: Page Objects
- Define **DÓNDE** están los elementos de UI
- Ubicación: `pages/*.ts`
- Encapsula selectores y acciones
- Métodos reutilizables

## 📋 Mapeo de Criterios de Aceptación

| Criterio | Feature | Page Objects |
|----------|---------|--------------|
| 1. Login válido | 1-login.feature | LoginPage, ProductsPage |
| 2. Login inválido | 1-login.feature | LoginPage |
| 3. Agregar producto | 2-cart.feature | ProductsPage |
| 4. Ver carrito | 2-cart.feature | CartPage |
| 5. Completar compra | 3-checkout.feature | CartPage, CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage |

## 🚀 Scripts Disponibles

```bash
npm run test:cucumber      # Ejecuta todos los tests de Cucumber
npm run test:playwright    # Ejecuta tests de Playwright
npm run test:login         # Ejecuta solo tests de login (@login)
npm run test:cart          # Ejecuta solo tests de carrito (@cart)
npm run test:checkout      # Ejecuta solo tests de checkout (@checkout)
```

## 📊 Reportes

Los reportes se generan automáticamente en:
- `reports/cucumber-report.html` - Reporte HTML visual
- `reports/cucumber-report.json` - Reporte JSON para integración CI/CD

## ✅ Estado Actual

- ✅ Cucumber instalado y configurado
- ✅ Estructura POM creada
- ✅ 3 Features definidos
- ✅ 7 Page Objects estructurados
- ✅ Hooks y World configurados
- ⏳ Implementación de steps pendiente
- ⏳ Implementación de métodos en Page Objects pendiente
