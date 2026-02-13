@checkout
Feature: Proceso de compra completo
  Como un cliente con productos en el carrito
  Quiero completar el proceso de compra
  Para adquirir los productos que necesito

  Background:
    Given que estoy en la página de login de Sauce Demo
    When ingreso el usuario "standard_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    And agrego el producto "Sauce Labs Backpack" al carrito
    And navego al carrito de compras
  # Criterio de Aceptación 5: El usuario puede completar el proceso de compra hasta la confirmación

  @smoke @e2e @happy-path
  Scenario: Completar el proceso de compra exitosamente
    When hago clic en el botón "Checkout"
    Then debo ser redirigido a "checkout-step-one.html"
    When ingreso el nombre "Juan"
    And ingreso el apellido "Pérez"
    And ingreso el código postal "15001"
    And hago clic en el botón "Continue"
    Then debo ser redirigido a "checkout-step-two.html"
    And debo ver el producto "Sauce Labs Backpack" en el resumen
    And debo ver la información de pago
    And debo ver la información de envío
    And debo ver el subtotal correcto
    And debo ver el impuesto calculado
    And debo ver el total correcto
    When hago clic en el botón "Finish"
    Then debo ser redirigido a "checkout-complete.html"
    And debo ver el mensaje "THANK YOU FOR YOUR ORDER"
    And debo ver la confirmación del pedido
  # Completar compra con múltiples productos

  @e2e @multiple-products
  Scenario: Completar compra con múltiples productos
    Given que tengo el producto "Sauce Labs Bike Light" en el carrito
    And que estoy en la página del carrito
    When hago clic en el botón "Checkout"
    And ingreso el nombre "Maria"
    And ingreso el apellido "Garcia"
    And ingreso el código postal "28001"
    And hago clic en el botón "Continue"
    Then debo ver 2 productos en el resumen
    When hago clic en el botón "Finish"
    Then debo ver el mensaje "THANK YOU FOR YOUR ORDER"
  # Validación de campos obligatorios en checkout

  @validation @negative
  Scenario: Validar campos obligatorios en información de checkout
    When hago clic en el botón "Checkout"
    And hago clic en el botón "Continue"
    Then debo ver un mensaje de error indicando "First Name is required"

  @validation @negative
  Scenario: Validar campo apellido obligatorio
    When hago clic en el botón "Checkout"
    And ingreso el nombre "Juan"
    And ingreso el código postal "15001"
    And hago clic en el botón "Continue"
    Then debo ver un mensaje de error indicando "Last Name is required"

  @validation @negative
  Scenario: Validar código postal obligatorio
    When hago clic en el botón "Checkout"
    And ingreso el nombre "Juan"
    And ingreso el apellido "Pérez"
    And hago clic en el botón "Continue"
    Then debo ver un mensaje de error indicando "Postal Code is required"
  # Cancelar proceso de checkout

  @cancel
  Scenario: Cancelar proceso de checkout desde información
    When hago clic en el botón "Checkout"
    And hago clic en el botón "Cancel"
    Then debo ser redirigido a "cart.html"

  @cancel
  Scenario: Cancelar proceso de checkout desde resumen
    When hago clic en el botón "Checkout"
    And ingreso el nombre "Carlos"
    And ingreso el apellido "López"
    And ingreso el código postal "08001"
    And hago clic en el botón "Continue"
    And hago clic en el botón "Cancel"
    Then debo estar de vuelta en la página de productos
  # Regresar a productos después de completar compra

  @navigation
  Scenario: Navegar a productos después de completar compra
    When completo el proceso de compra con la información "Ana", "Martínez", "41001"
    Then debo ver el mensaje "THANK YOU FOR YOUR ORDER"
    When hago clic en el botón "Back Home"
    Then debo estar de vuelta en la página de productos
