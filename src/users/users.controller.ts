// Este archivo recibe las peticiones HTTP relacionadas con los usuarios
// Por ahora, solo tiene el endpoint para registrar un nuevo usuario
// Cuando alguien envíe un POST a /users/register, se ejecutará el método "register" 

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users') // indica que todas las rutas empiezan con /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Ruta POST para registrar un nuevo usuario
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
