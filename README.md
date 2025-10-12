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
  "password": "******",
  "role": "CUSTOMER"
}
```
login Post/auth/login

```json
{
  "email": "juliana@gmail.com",
  "password": "*****"
}
```
Ruta protegida

GET /users/perfil
Authorization: Bearer <token>



## Módulo de Catálogo y Productos (Natalia Flórez)

### Categorías

#### Crear una nueva categoría (solo ADMIN)
POST /categories

Body:
```json
{
  "name": "Computadores",
  "description": "Portátiles y notebooks para trabajo y estudio"
}
```

#### Listar todas las categorías
GET /categories

#### Obtener una categoría por ID
GET /categories/:id

#### Editar una categoría (solo ADMIN)
PUT /categories/:id

#### Eliminar una categoría (solo ADMIN)
DELETE /categories/:id


### Productos

#### Crear un nuevo producto (solo ADMIN)
POST /products

Body:
```json
{
  "name": "Laptop Lenovo IdeaPad 3",
  "description": "Laptop con procesador Ryzen 5 y 8GB RAM",
  "price": 2450000,
  "stock": 15,
  "categories": [1]
}
```

#### Listar todos los productos
GET /products

#### Obtener un producto por ID
GET /products/:id

#### Editar un producto (solo ADMIN)
PUT /products/:id

#### Eliminar un producto (solo ADMIN)
DELETE /products/:id


## Módulo de carrito y órdenes (Angie Diaz Abaunza)
> 🔒 Todas las rutas de este módulo requieren autenticación con token JWT (Bearer Token).

### Carrito

#### Ver carrito
GET /cart

#### Agregar producto al carrito (solo CUSTOMER)
POST /cart/items

Body:
```json
{
  "productId": 5,
  "quantity": 2
}
```

#### Actualizar cantidad de un producto (solo CUSTOMER)
PATCH /cart/items/:itemId
(Reemplazar :itemId por el id real del item a actualizar)

Body:
```json
{
  "quantity": 5
}
```

#### Eliminar producto del carrito (solo CUSTOMER)
DELETE /cart/items/:itemId
(Reemplazar :itemId por el id real del item a borrar)

#### Ordenes

#### Crear una orden desde el carrito (solo CUSTOMER)
POST /orders

#### Ver todas las órdenes (solo CUSTOMER)
GET /orders

#### Ver una orden específica por ID (solo CUSTOMER)
GET /orders/:id
(Reemplazar :itemId por el id real del item a consultar)


