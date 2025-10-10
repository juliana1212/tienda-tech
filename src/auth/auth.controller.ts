// Autor: Juliana Casas
// Descripción: Controlador que maneja las rutas de autenticación.
// Permite que un usuario inicie sesión y reciba su token JWT.

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta para login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
