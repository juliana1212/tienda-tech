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
