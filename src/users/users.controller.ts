// Autor: Juliana Casas
// Descripción: Este archivo maneja las rutas relacionadas con los usuarios
// Aquí se pueden registrar nuevos usuarios y también acceder a rutas protegidas con token JWT

import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Protege las rutas con el token

@Controller('users') // Todas las rutas empiezan con /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  //  ensayito con ruta protegida, solo se puede acceder si el usuario tiene token válido
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getPerfil(@Req() req) {
    // Devuelve los datos del usuario autenticado
    return {
      message: 'Ruta protegida. Usuario autenticado',
      usuario: req.user,
    };
  }
}
