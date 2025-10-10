// Autor: Juliana Casas
// Descripción: Controlador que maneja las rutas /users

import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  obtenerUsuarios() {
    return this.usersService.listarUsuarios();
  }
}
