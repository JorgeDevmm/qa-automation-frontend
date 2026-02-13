# 📋 Informe de Estrategia de Automatización

## Proyecto: Sauce Demo Test Automation

---

## 1. 🎯 Resumen Ejecutivo

Este documento describe la estrategia de automatización implementada para la aplicación web Sauce Demo, un e-commerce de demostración. El proyecto utiliza un enfoque BDD (Behavior Driven Development) con Playwright y Cucumber, implementando el patrón de diseño Page Object Model para garantizar código mantenible, escalable y legible.

**Cobertura alcanzada:**

- ✅ 21 escenarios automatizados
- ✅ 3 módulos funcionales (Login, Carrito, Checkout)
- ✅ 5 criterios de aceptación cumplidos al 100%
- ✅ Escenarios positivos y negativos
- ✅ Validaciones de 2 tipos de usuarios

---

## 2. 🏗️ Arquitectura y Patrones de Diseño

### 2.1. Page Object Model (POM)

Elegimos el patrón **Page Object Model** por las siguientes razones:

**✅ Ventajas:**

- **Reutilización de código:** Cada página tiene métodos que pueden usarse en múltiples escenarios
- **Mantenibilidad:** Si cambia un selector, solo se actualiza en un lugar
- **Legibilidad:** Los tests son más claros y fáciles de entender
- **Escalabilidad:** Fácil agregar nuevas páginas sin afectar el código existente

**Implementación:**

```
BasePage (clase padre)
    ↓
LoginPage, ProductsPage, CartPage, CheckoutPages (clases hijas)
```

### 2.2. Arquitectura en 3 Capas

```
┌─────────────────────────────────────┐
│  CAPA 1: Features (Gherkin)        │  ← Lenguaje natural (QUÉ se prueba)
│  1-login.feature                    │
│  2-cart.feature                     │
│  3-checkout.feature                 │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  CAPA 2: Step Definitions (TS)     │  ← Lógica de prueba (CÓMO se prueba)
│  login.steps.ts                     │
│  cart.steps.ts                      │
│  checkout.steps.ts                  │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  CAPA 3: Page Objects (TS)         │  ← Interacción con la UI (DÓNDE)
│  BasePage.ts                        │
│  LoginPage.ts                       │
│  ProductsPage.ts, CartPage.ts, etc │
└─────────────────────────────────────┘
```

**Flujo de ejecución:**

1. Cucumber lee el archivo `.feature` (Gherkin)
2. Busca el step definition correspondiente
3. El step definition llama a métodos del Page Object
4. El Page Object interactúa con Playwright
5. Playwright ejecuta acciones en el navegador

---

## 3. 🧪 Estrategia de Pruebas

### 3.1. Enfoque BDD (Behavior Driven Development)

**¿Por qué BDD?**

- 📝 **Lenguaje natural:** Los escenarios pueden ser escritos y leídos por cualquier persona del equipo (QA, devs, PO, clientes)
- 🤝 **Colaboración:** Facilita la comunicación entre equipos técnicos y no técnicos
- 📖 **Documentación viva:** Los archivos `.feature` sirven como documentación actualizada del comportamiento del sistema

**Sintaxis Gherkin:**

```gherkin
Feature: Describe la funcionalidad
  Scenario: Describe un caso de prueba
    Given [contexto inicial]
    When [acción del usuario]
    Then [resultado esperado]
```

### 3.2. Cobertura de Escenarios

#### **Módulo 1: Autenticación (5 escenarios)**

| #   | Escenario                                     | Tipo        | Tag                 |
| --- | --------------------------------------------- | ----------- | ------------------- |
| 1   | Login exitoso con usuario válido              | Positivo    | @smoke, @happy-path |
| 2   | Login fallido con credenciales inválidas      | Negativo    | @negative           |
| 3   | Login con usuario bloqueado (locked_out_user) | Negativo    | @negative           |
| 4   | Validación de campos vacíos                   | Negativo    | @validation         |
| 5   | Validación de múltiples usuarios              | Data-driven | @data-driven        |

**Objetivo:** Garantizar que solo usuarios autorizados pueden acceder al sistema.

#### **Módulo 2: Gestión de Carrito (6 escenarios)**

| #   | Escenario                           | Tipo       | Tag    |
| --- | ----------------------------------- | ---------- | ------ |
| 1   | Agregar producto al carrito         | Positivo   | @smoke |
| 2   | Visualizar producto en el carrito   | Positivo   | @cart  |
| 3   | Agregar múltiples productos         | Positivo   | @cart  |
| 4   | Remover producto del carrito        | Positivo   | @cart  |
| 5   | Validar badge con cantidad correcta | Validación | @cart  |
| 6   | Verificar carrito vacío             | Edge case  | @cart  |

**Objetivo:** Asegurar que los usuarios pueden gestionar su carrito de compras correctamente.

#### **Módulo 3: Proceso de Compra (10 escenarios)**

| #   | Escenario                               | Tipo       | Tag          |
| --- | --------------------------------------- | ---------- | ------------ |
| 1   | Completar compra exitosamente           | Positivo   | @smoke, @e2e |
| 2   | Compra con múltiples productos          | Positivo   | @e2e         |
| 3   | Validar campo nombre obligatorio        | Negativo   | @validation  |
| 4   | Validar campo apellido obligatorio      | Negativo   | @validation  |
| 5   | Validar campo código postal obligatorio | Negativo   | @validation  |
| 6   | Verificar cálculos de precios           | Validación | @checkout    |
| 7   | Cancelar desde formulario de datos      | Negativo   | @cancel      |
| 8   | Cancelar desde resumen de orden         | Negativo   | @cancel      |
| 9   | Navegar de vuelta después de comprar    | Navegación | @navigation  |
| 10  | Verificar confirmación de orden         | Validación | @checkout    |

**Objetivo:** Validar el flujo completo de compra desde el carrito hasta la confirmación.

---

## 4. 🔧 Decisiones Técnicas

### 4.1. ¿Por qué Playwright?

- ✅ **Multi-navegador:** Soporta Chrome, Firefox, Safari, Edge
- ✅ **Auto-wait:** Espera automáticamente a que los elementos estén listos
- ✅ **API moderna:** Basada en Promesas con async/await
- ✅ **Screenshots y videos:** Captura evidencia automáticamente
- ✅ **Velocidad:** Más rápido que Selenium
- ✅ **Documentación excelente:** [playwright.dev](https://playwright.dev)

### 4.2. ¿Por qué Cucumber?

- ✅ **BDD nativo:** Diseñado específicamente para Behavior Driven Development
- ✅ **Gherkin:** Sintaxis universalmente reconocida
- ✅ **Reportes ricos:** HTML y JSON out-of-the-box
- ✅ **Tags:** Permite filtrar y organizar escenarios fácilmente
- ✅ **Hooks:** Control completo del ciclo de vida de las pruebas

### 4.3. ¿Por qué TypeScript?

- ✅ **Tipado estático:** Menos errores en tiempo de desarrollo
- ✅ **IntelliSense:** Autocompletado en el IDE
- ✅ **Refactoring seguro:** El compilador detecta problemas
- ✅ **Escalabilidad:** Mejor para proyectos grandes
- ✅ **Standard en la industria:** Ampliamente adoptado

### 4.4. Gestión de Selectores

**Estrategia adoptada:**

1. **Prioridad 1:** `data-test` attributes (más estables)

   ```typescript
   page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
   ```

2. **Prioridad 2:** IDs únicos

   ```typescript
   page.locator("#user-name");
   ```

3. **Prioridad 3:** Clases CSS (cuando son semánticas)
   ```typescript
   page.locator(".shopping_cart_badge");
   ```

**Ventaja:** Los selectores basados en `data-test` son más resistentes a cambios de diseño.

---

## 5. 🎭 Manejo de Usuarios

El proyecto valida 2 tipos de usuarios según las especificaciones:

### **standard_user**

- **Comportamiento esperado:** ✅ Acceso completo a todas las funcionalidades
- **Escenarios cubiertos:** Login exitoso, agregar al carrito, completar compra
- **Validaciones:** Navegación correcta, cálculos de precios, confirmación de orden

### **locked_out_user**

- **Comportamiento esperado:** ❌ Acceso bloqueado con mensaje de error
- **Escenarios cubiertos:** Login fallido con usuario bloqueado
- **Validaciones:** Mensaje de error "Epic sadface: Sorry, this user has been locked out"

---

## 6. 📈 Estrategia de Ejecución

### 6.1. Hooks (Ciclo de Vida)

Implementamos 4 hooks principales:

```typescript
BeforeAll → Lanza el navegador UNA VEZ (reutilización)
Before → Crea contexto y página nueva ANTES de cada escenario (aislamiento)
After → Cierra página y contexto DESPUÉS de cada escenario (limpieza)
AfterAll → Cierra el navegador UNA VEZ al finalizar (cleanup)
```

**Ventaja:** Cada escenario se ejecuta en un contexto limpio (sin cookies, localStorage, etc.)

### 6.2. Scripts de Ejecución

```json
"test:cucumber": "cucumber-js",               // Todos los escenarios
"test:login": "cucumber-js --tags @login",    // Solo login
"test:cart": "cucumber-js --tags @cart",      // Solo carrito
"test:checkout": "cucumber-js --tags @checkout" // Solo checkout
```

**Uso en diferentes contextos:**

- **Desarrollo:** `npm run test:login` (prueba rápida del módulo en desarrollo)
- **Smoke tests:** `npm run test:cucumber:tags "@smoke"` (escenarios críticos)
- **Regresión completa:** `npm run test:cucumber` (todos los escenarios)

---

## 7. 📊 Reportes y Evidencia

### 7.1. Reportes Generados

**Reporte HTML:**

- Resultados visuales con estados (✅ pass, ❌ fail, ⊘ skipped)
- Tiempo de ejecución por escenario
- Stack traces de errores
- Navegable por módulos

**Reporte JSON:**

- Formato estructurado para CI/CD
- Integrable con herramientas como Jenkins, GitLab CI, GitHub Actions
- Puede alimentar dashboards personalizados

### 7.2. Capturas de Pantalla

Configurado para capturar screenshots automáticamente en caso de fallo:

```typescript
const screenshot = await page.screenshot({ path: "screenshots/error.png" });
```

---

## 8. ✅ Cumplimiento de Requisitos

| Requisito                               | Estado | Evidencia                                             |
| --------------------------------------- | ------ | ----------------------------------------------------- |
| Configurar Playwright + Cucumber        | ✅     | `package.json`, `cucumber.js`, `playwright.config.ts` |
| Crear features en Gherkin               | ✅     | 3 archivos `.feature` con 21 escenarios               |
| Aplicar patrón de diseño (POM)          | ✅     | 7 Page Objects implementados                          |
| Incluir standard_user y locked_out_user | ✅     | Escenarios en `1-login.feature`                       |
| Implementar step definitions            | ✅     | 3 archivos `.steps.ts` completos                      |
| README con instrucciones                | ✅     | `README.md` completo                                  |
| Repositorio Git                         | ✅     | Proyecto versionado con commits                       |

---

## 9. 🚀 Mejoras Futuras

### 9.1. Corto Plazo

- [ ] Agregar más validaciones de UI (colores, imágenes, textos)
- [ ] Implementar pruebas de accesibilidad (WCAG)
- [ ] Agregar escenarios con diferentes productos
- [ ] Validar ordenamiento de productos

### 9.2. Mediano Plazo

- [ ] Integración con CI/CD (GitHub Actions, GitLab CI)
- [ ] Pruebas en múltiples navegadores (Firefox, Safari)
- [ ] Pruebas en diferentes resoluciones (mobile, tablet)
- [ ] Dashboard de métricas con histórico de ejecuciones

### 9.3. Largo Plazo

- [ ] Pruebas de performance (tiempos de carga)
- [ ] Visual regression testing (comparación de screenshots)
- [ ] Pruebas de carga básicas
- [ ] Integración con herramientas de gestión de tests (TestRail, Xray)

---

## 10. 📝 Conclusiones

### Logros del Proyecto

1. **Cobertura completa:** Se automatizaron todos los criterios de aceptación solicitados
2. **Código de calidad:** Implementación con TypeScript, tipado estático y buenas prácticas
3. **Arquitectura escalable:** POM de 3 capas permite agregar nuevos escenarios fácilmente
4. **Documentación clara:** README y este informe facilitan la comprensión y mantenimiento
5. **Preparado para CI/CD:** Reportes JSON y configuración headless lista para pipelines

### Lecciones Aprendidas

- **BDD facilita la comunicación:** Los escenarios en Gherkin son entendibles por todos
- **POM ahorra tiempo:** Cambios en selectores se hacen una sola vez
- **Playwright es potente:** Auto-wait y API moderna reducen flakiness
- **Hooks son esenciales:** Gestión correcta del ciclo de vida evita falsos negativos

### Valor Entregado

Este proyecto de automatización proporciona:

- ✅ **Confianza** en los despliegues (regresión automatizada)
- ✅ **Velocidad** en validación de cambios (21 escenarios en minutos vs horas manuales)
- ✅ **Documentación viva** del comportamiento del sistema
- ✅ **Base escalable** para agregar más funcionalidades

---
