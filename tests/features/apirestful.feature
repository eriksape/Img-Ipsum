# language: es
Característica: Rutas de API Básicas
  En orden para interactuar con mi aplicacion desde el Fron End
  Como desarrollador Fron End sin conocimiento de lo que hace la API
  Yo necesito una API asombrosa con la cual trabajar

  Escenario: GET "/author"
    Cuando hago una peticion GET a "/author"
    Entonces obtengo una respuesta 200 del servidor

  Escenario: POST "/author"
    Dados los siguientes valores:
    """
      {
        "name":"autor",
        "site":"sitio"
      }
    """
    Cuando hago una peticion POST a "/author"
    Entonces obtengo una respuesta 201 del servidor
    Y la propiedad "name" es igual a "autor"
    Y la propiedad "site" es igual a "sitio"
    Y la propiedad "id" es de tipo numerico

    Escenario: PUT "/author/2"
      Dados los siguientes valores:
      """
        {
          "name":"autor:acceptance",
          "site":"http://acceptance.com"
        }
      """
      Cuando hago una peticion PUT a "/author/2"
      Entonces obtengo una respuesta 200 del servidor
      Y la propiedad "name" es igual a "autor:acceptance"
      Y la propiedad "site" es igual a "http://acceptance.com"
      Y la propiedad "id" es igual a "2"

      Escenario: DELETE "/author/2"
        Cuando hago una peticion DELETE a "/author/2"
        Entonces obtengo una respuesta 204 del servidor
