@cart
Feature: Gestión del carrito de compras
  Como un cliente autenticado en Sauce Demo
  Quiero agregar productos al carrito y visualizarlos
  Para preparar mi orden de compra

  Background:
    Given que estoy en la página de login de Sauce Demo
    When ingreso el usuario "standard_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debo ser redirigido a la página de productos

  # Criterio de Aceptación 3: El usuario puede agregar un producto al carrito desde la página de productos
  @smoke @add-to-cart
  Scenario: Agregar un producto al carrito desde la página de productos
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el badge del carrito debe mostrar "1"
    And el botón del producto debe cambiar a "Remove"

  # Criterio de Aceptación 4: El usuario puede ver los productos agregados en el carrito de compras
  @view-cart
  Scenario: Visualizar productos agregados en el carrito
    Given que he agregado el producto "Sauce Labs Backpack" al carrito
    When navego al carrito de compras
    Then debo ver el producto "Sauce Labs Backpack" en el carrito
    And debo ver el precio del producto
    And debo ver la cantidad correcta

  # Agregar múltiples productos
  @multiple-products
  Scenario: Agregar múltiples productos al carrito
    When agrego el producto "Sauce Labs Backpack" al carrito
    And agrego el producto "Sauce Labs Bike Light" al carrito
    And agrego el producto "Sauce Labs Bolt T-Shirt" al carrito
    Then el badge del carrito debe mostrar "3"
    When navego al carrito de compras
    Then debo ver 3 productos en el carrito
    And debo ver el producto "Sauce Labs Backpack" en el carrito
    And debo ver el producto "Sauce Labs Bike Light" en el carrito
    And debo ver el producto "Sauce Labs Bolt T-Shirt" en el carrito

  # Remover producto del carrito
  @remove-product
  Scenario: Remover un producto del carrito
    Given que he agregado el producto "Sauce Labs Backpack" al carrito
    When navego al carrito de compras
    And remuevo el producto "Sauce Labs Backpack" del carrito
    Then el carrito debe estar vacío
    And el badge del carrito no debe ser visible

  # Validar carrito vacío
  @empty-cart
  Scenario: Visualizar carrito vacío
    When navego al carrito de compras
    Then el carrito debe estar vacío
    And no debo ver productos en el carrito
