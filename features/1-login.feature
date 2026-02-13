# language: es
@login
Característica: Autenticación en Sauce Demo
  Como un cliente de Sauce Demo
  Quiero poder iniciar sesión con mis credenciales
  Para acceder a la tienda y realizar compras

  # Criterio de Aceptación 1: El usuario puede iniciar sesión con credenciales válidas
  Escenario: Login exitoso con credenciales válidas
    # Implementar steps aquí

  # Criterio de Aceptación 2: El usuario no puede iniciar sesión con credenciales inválidas
  Escenario: Login fallido con credenciales inválidas
    # Implementar steps aquí

  # Especificación 4: Incluir escenarios para diferentes tipos de usuarios
  Esquema del escenario: Login con diferentes tipos de usuarios
    # Implementar steps con standard_user y locked_out_user
