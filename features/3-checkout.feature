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
    When hago clic en el botón Checkout
    Then debo ser redirigido a la página de información de checkout
    When ingreso el nombre "Juan"
    And ingreso el apellido "Pérez"
    And ingreso el código postal "15001"
    And hago clic en el botón Continue
    Then debo ser redirigido a la página de resumen de compra
    And debo ver el producto "Sauce Labs Backpack" en el resumen
    And debo ver la información de pago
    And debo ver la información de envío
    And debo ver el subtotal calculado correctamente
    And debo ver el impuesto calculado
    And debo ver el total calculado correctamente
    When hago clic en el botón Finish
    Then debo ser redirigido a la página de confirmación
    And debo ver el mensaje "Thank you for your order!"
    And debo ver el mensaje de confirmación de despacho
    And debo ver la imagen de confirmación

  # Completar compra con múltiples productos
  @e2e @multiple-products
  Scenario: Completar compra con múltiples productos
    Given que he agregado el producto "Sauce Labs Bike Light" al carrito desde la página de productos
    And navego al carrito de compras
    When hago clic en el botón Checkout
    And completo el formulario de información con nombre "Maria", apellido "Garcia" y código postal "28001"
    And hago clic en el botón Continue
    Then debo ver 2 productos en el resumen de compra
    When hago clic en el botón Finish
    Then debo ver el mensaje "Thank you for your order!"

  # Validación de campos obligatorios en checkout
  @validation @negative
  Scenario: Validar campos obligatorios en información de checkout
    When hago clic en el botón Checkout
    And dejo los campos de información vacíos
    And hago clic en el botón Continue
    Then debo ver un mensaje de error
    And el mensaje debe contener "First Name is required"

  @validation @negative
  Scenario: Validar campo apellido obligatorio
    When hago clic en el botón Checkout
    And ingreso el nombre "Juan"
    And ingreso el código postal "15001"
    And hago clic en el botón Continue
    Then debo ver un mensaje de error
    And el mensaje debe contener "Last Name is required"

  @validation @negative
  Scenario: Validar código postal obligatorio
    When hago clic en el botón Checkout
    And ingreso el nombre "Juan"
    And ingreso el apellido "Pérez"
    And hago clic en el botón Continue
    Then debo ver un mensaje de error
    And el mensaje debe contener "Postal Code is required"

  # Cancelar proceso de checkout
  @cancel
  Scenario: Cancelar proceso de checkout desde información
    When hago clic en el botón Checkout
    And hago clic en el botón Cancel
    Then debo ser redirigido al carrito de compras

  @cancel
  Scenario: Cancelar proceso de checkout desde resumen
    When hago clic en el botón Checkout
    And completo el formulario de información con nombre "Carlos", apellido "López" y código postal "08001"
    And hago clic en el botón Continue
    And hago clic en el botón Cancel desde el resumen
    Then debo ser redirigido a la página de productos

  # Regresar a productos después de completar compra
  @navigation
  Scenario: Navegar a productos después de completar compra
    When completo el proceso de compra con nombre "Ana", apellido "Martínez" y código postal "41001"
    Then debo ver el mensaje "Thank you for your order!"
    When hago clic en el botón Back Home
    Then debo ser redirigido a la página de productos
    And el carrito debe estar vacío
