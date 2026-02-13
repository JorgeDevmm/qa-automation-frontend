# language: es
@checkout
Característica: Proceso de compra completo
  Como un cliente con productos en el carrito
  Quiero completar el proceso de compra
  Para adquirir los productos que necesito

  Antecedentes:
    # Dado que el usuario está autenticado y tiene productos en el carrito

  # Criterio de Aceptación 5: El usuario puede completar el proceso de compra hasta la confirmación
  Escenario: Completar el proceso de compra exitosamente
    # Implementar el flujo completo:
    # 1. Navegar al carrito
    # 2. Ir a checkout
    # 3. Llenar información del cliente (CheckoutStepOne)
    # 4. Verificar resumen de orden (CheckoutStepTwo)
    # 5. Finalizar compra
    # 6. Verificar página de confirmación (CheckoutComplete)
