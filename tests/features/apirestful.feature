# language: es
Característica: Rutas de API Básicas
  En orden para interactuar con mi aplicacion desde el Fron End
  Como desarrollador Fron End sin conocimiento de lo que hace la API
  Yo necesito una API asombrosa con la cual trabajar

  Escenario: GET "/author"
    Cuando hago una peticion GET a "/author"
    Entonces obtengo una respuesta 200 del servidor

  Escenario: POST "/author"
    Dado que tengo los siguientes valores:
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
    Dado que tengo los siguientes valores:
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
    Dado que tengo los siguientes valores:
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
    Dado que tengo los siguientes valores:
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
    Dado que tengo los siguientes valores:
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
    Dado que tengo los siguientes valores:
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
    Dado que tengo los siguientes valores:
    """
      {
      }
    """
    Cuando hago una peticion POST a "/category"
    Entonces obtengo una respuesta 422 del servidor
    Y la propiedad "name" existe
    Y la propiedad "name" es de tipo array

  Escenario: POST y DELETE "/files"
    Dado que tengo los siguientes archivos:
    """
      {
        "file":"__DIRECTORY__/example.jpg"
      }
    """
    Cuando hago una peticion POST a "/files/image"
    Entonces obtengo una respuesta 201 del servidor
    Y la propiedad "id" existe
    Y la propiedad "id" es igual a "1"
    Y la propiedad "size" existe
    Y la propiedad "filename" existe
    Cuando hago una peticion DELETE a "/files/1"
    Entonces obtengo una respuesta 204 del servidor

  Escenario: Subiendo Imagenes
    Dado que tengo los siguientes archivos:
    """
      {
        "file":"__DIRECTORY__/example2.jpg"
      }
    """
    Cuando hago una peticion POST a "/files/image"
    Entonces obtengo una respuesta 201 del servidor
    Y la propiedad "id" existe
    Y la propiedad "id" es igual a "1"
    Y la propiedad "size" existe
    Y la propiedad "filename" existe
    Dado que reinicio los valores
    Y que tengo los siguientes valores:
    """
      {
        "origin_url":"http://google.com",
        "category_id":1,
        "author_id":1,
        "file_storage_id":1
      }
    """
    Cuando hago una peticion POST a "/bank"
    Entonces obtengo una respuesta 201 del servidor
    Y la propiedad "id" existe
    Y la propiedad "id" es igual a "1"
    Y la propiedad "origin_url" es igual a "http://google.com"
    Y la propiedad "category_id" es igual a "1"
    Y la propiedad "author_id" es igual a "1"
    Y la propiedad "file_storage_id" es igual a "1"
    Dado que reinicio los valores
    Y que tengo los siguientes valores:
    """
      {
        "origin_url":"http://google.com",
        "category_id":2,
        "author_id":2,
        "file_storage_id":1
      }
    """
    Cuando hago una peticion PUT a "/bank/1"
    Entonces obtengo una respuesta 200 del servidor
    Y la propiedad "id" existe
    Y la propiedad "id" es igual a "1"
    Y la propiedad "origin_url" es igual a "http://google.com"
    Y la propiedad "category_id" es igual a "2"
    Y la propiedad "author_id" es igual a "2"
    Y la propiedad "file_storage_id" es igual a "1"
    Cuando hago una peticion DELETE a "/bank/1"
    Entonces obtengo una respuesta 204 del servidor
