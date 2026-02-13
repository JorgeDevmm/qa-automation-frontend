@login
Feature: Autenticación en Sauce Demo
  Como un cliente de Sauce Demo
  Quiero poder iniciar sesión con mis credenciales
  Para acceder a la tienda y realizar compras

  Background:
    Given que estoy en la página de login de Sauce Demo

  # Criterio de Aceptación 1: El usuario puede iniciar sesión con credenciales válidas
  @smoke @happy-path
  Scenario: Login exitoso con usuario estándar
    When ingreso el usuario "standard_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debo ser redirigido a la página de productos
    And la URL debe contener "/inventory.html"
    And debo ver el título "Products"

  # Criterio de Aceptación 2: El usuario no puede iniciar sesión con credenciales inválidas
  @negative
  Scenario: Login fallido con credenciales inválidas
    When ingreso el usuario "usuario_invalido"
    And ingreso la contraseña "password_incorrecta"
    And hago clic en el botón de login
    Then debo ver un mensaje de error
    And el mensaje debe contener "Username and password do not match"
    And debo permanecer en la página de login

  # Especificación 4: Incluir escenarios para diferentes tipos de usuarios - locked_out_user
  @locked-user @negative
  Scenario: Login fallido con usuario bloqueado
    When ingreso el usuario "locked_out_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debo ver un mensaje de error
    And el mensaje debe contener "Sorry, this user has been locked out"
    And debo permanecer en la página de login

  # Validación de campos vacíos
  @validation @negative
  Scenario: Login fallido con campos vacíos
    When dejo los campos de usuario y contraseña vacíos
    And hago clic en el botón de login
    Then debo ver un mensaje de error
    And el mensaje debe contener "Username is required"

  # Scenario Outline para probar múltiples usuarios - standard_user y locked_out_user
  @outline
  Scenario Outline: Validar login con diferentes tipos de usuarios
    When ingreso el usuario "<usuario>"
    And ingreso la contraseña "<password>"
    And hago clic en el botón de login
    Then debo ver "<resultado_esperado>"

    Examples:
      | usuario           | password      | resultado_esperado     |
      | standard_user     | secret_sauce  | página de productos    |
      | locked_out_user   | secret_sauce  | mensaje de error       |
      | invalid_user      | wrong_pass    | mensaje de error       |
