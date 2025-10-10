// Autor: Juliana Casas
// Descripción: Excepción cuando se intenta registrar un correo que ya existe

import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super('El correo ya está registrado');
  }
}
