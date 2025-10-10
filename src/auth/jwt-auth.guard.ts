// Autor: Juliana Casas
// Descripción: Guarda que protege las rutas con token JWT
// Solo permite el acceso a usuarios autenticados

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
