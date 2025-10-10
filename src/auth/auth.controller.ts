//El controlador recibe las peticiones.
//Cuando entre a la ruta /auth, muestra el mensaje que viene del servicio.
//Así pruebo que todo está conectado bien.
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  obtenerMensaje(): string {
    return this.authService.getMessage();
  }
}
