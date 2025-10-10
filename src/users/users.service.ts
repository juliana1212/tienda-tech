// Autor: Juliana Casas
// Descripción: Servicio base de usuarios. uego se conectará a la base de datos

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private usuarios = [
    { id: 1, nombre: 'Ejemplo', email: 'ejemplo@correo.com', rol: 'CUSTOMER' },
  ];

  listarUsuarios() {
    return this.usuarios;
  }
}
