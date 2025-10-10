// Autor: Juliana Casas
// Descripción: Módulo Users. neja la lógica de registro y gestión de usuarios (RF-001)

// Este módulo agrupa todo lo relacionado con los usuarios.
// Aquí se conectan el controlador, el servicio y la entidad del usuario.
// Además, se importa TypeOrmModule para poder usar la base de datos.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // permite usar la entidad User con TypeORM
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // opcional, por si se usa en Auth más adelante
})
export class UsersModule {}
