# 🚀 Automatización de Pruebas - Sauce Demo

Proyecto de automatización de pruebas end-to-end para la aplicación web [Sauce Demo](https://www.saucedemo.com/) utilizando **Playwright**, **Cucumber** y el patrón de diseño **Page Object Model (POM)**.

Este proyecto fue desarrollado como parte de un reto técnico de QA Automation, cubriendo los flujos principales de un e-commerce: autenticación, gestión de carrito y proceso de compra.

---

## 📋 Tabla de Contenidos

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución de Pruebas](#-ejecución-de-pruebas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Escenarios Cubiertos](#-escenarios-cubiertos)
- [Reportes](#-reportes)
- [Configuración](#%EF%B8%8F-configuración)
- [Credenciales de Prueba](#-credenciales-de-prueba)

---

## 🛠️ Tecnologías Utilizadas

- **[Playwright](https://playwright.dev/)** v1.58.2 - Framework de automatización de navegadores
- **[Cucumber](https://cucumber.io/)** v12.6.0 - Framework BDD (Behavior Driven Development)
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación tipado
- **[Node.js](https://nodejs.org/)** - Entorno de ejecución JavaScript
- **Gherkin** - Lenguaje para escribir escenarios de prueba legibles

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18 o superior ([Descargar aquí](https://nodejs.org/))
- **npm** (incluido con Node.js)
- **Git** ([Descargar aquí](https://git-scm.com/))

Para verificar que tienes Node.js y npm instalados, ejecuta:

```bash
node --version
npm --version
```

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd qa-automation-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará automáticamente:

- Playwright y sus navegadores
- Cucumber con TypeScript
- Todas las dependencias necesarias

### 3. Instalar navegadores de Playwright (solo la primera vez)

```bash
npx playwright install chromium
```

---

## ▶️ Ejecución de Pruebas

### Ejecutar todas las pruebas

```bash
npm run test:cucumber
```

Este comando ejecutará todos los escenarios de prueba (21 en total) y generará reportes automáticamente.

### Ejecutar pruebas por módulo

```bash
# Solo pruebas de Login (5 escenarios)
npm run test:login

# Solo pruebas de Carrito (6 escenarios)
npm run test:cart

# Solo pruebas de Checkout (10 escenarios)
npm run test:checkout
```

### Ejecutar pruebas por tags

```bash
# Solo escenarios marcados como @smoke
npm run test:cucumber:tags "@smoke"

# Solo escenarios de happy path
npm run test:cucumber:tags "@happy-path"

# Solo escenarios negativos
npm run test:cucumber:tags "@negative"
```

---

## 📁 Estructura del Proyecto

```
qa-automation-frontend/
├── features/                          # Archivos de características BDD
│   ├── 1-login.feature               # Escenarios de autenticación (5)
│   ├── 2-cart.feature                # Escenarios de carrito (6)
│   ├── 3-checkout.feature            # Escenarios de compra (10)
│   ├── step_definitions/             # Implementación de pasos en TypeScript
│   │   ├── login.steps.ts           # Steps de login
│   │   ├── cart.steps.ts            # Steps de carrito
│   │   └── checkout.steps.ts        # Steps de checkout
│   └── support/                      # Configuración de Cucumber
│       ├── hooks.ts                 # Ciclo de vida (Before/After)
│       └── world.ts                 # Contexto compartido
├── pages/                            # Page Object Model (POM)
│   ├── BasePage.ts                  # Clase base con métodos comunes
│   ├── LoginPage.ts                 # Página de login
│   ├── ProductsPage.ts              # Página de productos
│   ├── CartPage.ts                  # Página del carrito
│   ├── CheckoutStepOnePage.ts       # Formulario de datos
│   ├── CheckoutStepTwoPage.ts       # Resumen de orden
│   └── CheckoutCompletePage.ts      # Confirmación de compra
├── reports/                          # Reportes generados automáticamente
│   ├── cucumber-report.html         # Reporte HTML visual
│   └── cucumber-report.json         # Reporte JSON para CI/CD
├── screenshots/                      # Screenshots en caso de fallo
├── cucumber.js                       # Configuración de Cucumber
├── tsconfig.json                     # Configuración de TypeScript
├── playwright.config.ts              # Configuración de Playwright
└── package.json                      # Dependencias y scripts
```

---

## 🎯 Escenarios Cubiertos

### **Módulo 1: Autenticación (Login)**

- ✅ Login exitoso con usuario válido (standard_user)
- ✅ Login fallido con credenciales inválidas
- ✅ Bloqueo de usuario (locked_out_user)
- ✅ Validación de campos vacíos
- ✅ Prueba con múltiples usuarios

### **Módulo 2: Gestión de Carrito**

- ✅ Agregar producto al carrito
- ✅ Visualizar productos en el carrito
- ✅ Remover producto del carrito
- ✅ Agregar múltiples productos
- ✅ Verificar badge de cantidad
- ✅ Validar carrito vacío

### **Módulo 3: Proceso de Compra (Checkout)**

- ✅ Completar compra exitosamente
- ✅ Compra con múltiples productos
- ✅ Validar campos obligatorios (nombre, apellido, código postal)
- ✅ Verificar cálculos de precios (subtotal, impuesto, total)
- ✅ Cancelar proceso desde diferentes pasos
- ✅ Navegar de vuelta a productos después de comprar

**Total: 21 escenarios automatizados**

---

## 📊 Reportes

Después de cada ejecución, se generan reportes automáticos:

### Reporte HTML

- **Ubicación:** `reports/cucumber-report.html`
- **Cómo ver:** Abre el archivo en tu navegador
- **Contenido:** Resultados visuales con pasos, tiempos y estados (✅/❌)

### Reporte JSON

- **Ubicación:** `reports/cucumber-report.json`
- **Uso:** Integración con CI/CD y herramientas de análisis

Para abrir el reporte HTML rápidamente:

**Windows:**

```bash
start reports/cucumber-report.html
```

**Mac/Linux:**

```bash
open reports/cucumber-report.html
```

---

## ⚙️ Configuración

### Velocidad de Ejecución

Para cambiar la velocidad de las pruebas, edita `features/support/hooks.ts`:

```typescript
browser = await chromium.launch({
  headless: false, // true = sin interfaz, false = con navegador visible
  slowMo: 500, // milisegundos de espera entre acciones (0-2000)
});
```

**Valores recomendados:**

- `slowMo: 0` - Rápido (producción/CI)
- `slowMo: 300-500` - Velocidad normal
- `slowMo: 1000-2000` - Lento (debugging/demos)

### Modo Headless (sin interfaz)

Para ejecutar pruebas sin abrir el navegador (ideal para CI/CD):

```typescript
headless: true;
```

---

## 🔑 Credenciales de Prueba

El proyecto utiliza las siguientes credenciales de Sauce Demo:

| Usuario           | Contraseña     | Comportamiento       |
| ----------------- | -------------- | -------------------- |
| `standard_user`   | `secret_sauce` | ✅ Acceso completo   |
| `locked_out_user` | `secret_sauce` | ❌ Usuario bloqueado |

---

## 🧪 Patrón de Diseño

Este proyecto implementa el patrón **Page Object Model (POM)** en 3 capas:

### **Capa 1: Features (Gherkin)**

- Describe **QUÉ** se prueba en lenguaje natural
- Archivos: `*.feature`
- Ejemplo: `Given que estoy en la página de login`

### **Capa 2: Step Definitions**

- Define **CÓMO** ejecutar cada paso
- Archivos: `*.steps.ts`
- Orquesta los Page Objects y hace assertions

### **Capa 3: Page Objects**

- Encapsula la **interacción** con elementos de la página
- Archivos: `*Page.ts`
- Un archivo por cada página de la aplicación

**Ventajas:**

- 🔄 Código reutilizable
- 📝 Mantenimiento sencillo
- 🧩 Separación de responsabilidades
- 📖 Tests legibles por cualquier persona

---

## 🚀 Integración Continua (CI/CD)

Para integrar con pipelines de CI/CD, usa el modo headless y el reporte JSON:

**GitHub Actions (ejemplo):**

```yaml
- name: Run tests
  run: npm run test:cucumber
- name: Upload reports
  uses: actions/upload-artifact@v3
  with:
    name: test-reports
    path: reports/
```

---

## 🤝 Contribuciones

Este proyecto fue desarrollado como parte de un reto técnico de QA Automation.

---

## 📞 Contacto

Para consultas sobre este proyecto, por favor contacta al autor del repositorio.
