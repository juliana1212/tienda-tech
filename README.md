# Tienda-Tech Backend

## Módulo de Autenticación (Juliana Casas)

### Endpoints

#### Registrar usuario
POST /users/register  
Body:
```json
{
  "name": "Juliana Casas",
  "email": "juliana@gmail.com",
  "password": "123456",
  "role": "CUSTOMER"
}

login Post/auth/login


{
  "email": "juliana@gmail.com",
  "password": "123456"
}

Ruta protegida

GET /users/perfil
Authorization: Bearer <token>



## Módulo de Catálogo y Productos (Natalia Flórez)

###Categorías

####Crear una nueva categoría (solo ADMIN)
POST /categories
Body:
{
  "name": "Computadores",
  "description": "Portátiles y notebooks para trabajo y estudio"
}

####Listar todas las categorías
GET /categories

####Obtener una categoría por ID
GET /categories/:id


####Editar una categoría (solo ADMIN)
PUT /categories/:id

####Eliminar una categoría (solo ADMIN)
DELETE /categories/:id

###Productos

####Listar todos los productos
GET /products

####Obtener un producto por ID
GET /products/:id

####Crear un nuevo producto (solo ADMIN)
POST /products
Body:
{
  "name": "Laptop Lenovo IdeaPad 3",
  "description": "Laptop con procesador Ryzen 5 y 8GB RAM",
  "price": 2450000,
  "stock": 15,
  "categories": [1]
}

####Editar un producto (solo ADMIN)
PUT /products/:id

####Eliminar un producto (solo ADMIN)
DELETE /products/:id
