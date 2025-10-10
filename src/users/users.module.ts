// Autor: Juliana Casas
// Descripción: Módulo Users. neja la lógica de registro y gestión de usuarios (RF-001)

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
