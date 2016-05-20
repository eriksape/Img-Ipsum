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
        "site":"http://sitio.site"
      }
    """
    Cuando hago una peticion POST a "/author"
    Entonces obtengo una respuesta 201 del servidor
    Y la propiedad "name" es igual a "autor"
    Y la propiedad "site" es igual a "http://sitio.site"
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

  Escenario: POST "/author" sin valores
    Dados los siguientes valores:
    """
      {
      }
    """
    Cuando hago una peticion POST a "/author"
    Entonces obtengo una respuesta 422 del servidor
    Y la propiedad "name" existe
    Y la propiedad "site" existe
    Y la propiedad "name" es de tipo array
    Y la propiedad "site" es de tipo array

  Escenario: POST "/author" site erroneo
    Dados los siguientes valores:
    """
      {
        "name":"author-test",
        "site":"site"
      }
    """
    Cuando hago una peticion POST a "/author"
    Entonces obtengo una respuesta 422 del servidor
    Y la propiedad "name" no existe
    Y la propiedad "site" existe

  Escenario: GET "/category"
    Cuando hago una peticion GET a "/category"
    Entonces obtengo una respuesta 200 del servidor

  Escenario: POST "/category"
    Dados los siguientes valores:
    """
      {
        "name":"autor"
      }
    """
    Cuando hago una peticion POST a "/category"
    Entonces obtengo una respuesta 201 del servidor
    Y la propiedad "name" es igual a "autor"
    Y la propiedad "id" es de tipo numerico

  Escenario: PUT "/category/2"
    Dados los siguientes valores:
    """
      {
        "name":"autor:acceptance"
      }
    """
    Cuando hago una peticion PUT a "/category/2"
    Entonces obtengo una respuesta 200 del servidor
    Y la propiedad "name" es igual a "autor:acceptance"
    Y la propiedad "id" es igual a "2"

  Escenario: DELETE "/category/2"
    Cuando hago una peticion DELETE a "/category/2"
    Entonces obtengo una respuesta 204 del servidor

  Escenario: POST "/category" sin valores
    Dados los siguientes valores:
    """
      {
      }
    """
    Cuando hago una peticion POST a "/category"
    Entonces obtengo una respuesta 422 del servidor
    Y la propiedad "name" existe
    Y la propiedad "name" es de tipo array

    Escenario: POST "/image"
      Dados los siguientes archivos:
      """
        {
          "image":"__DIRECTORY__/example.jpg"
        }
      """
      Y los siguientes valores:
      """
        {
        }
      """
      Cuando hago una peticion POST a "/image"
      Entonces obtengo una respuesta 201 del servidor
