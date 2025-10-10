// Autor: Juliana Casas
// descripción: Estrategia para validar el token JWT en cada peticin
// verifica que el token sea válido y devuelve los datos del usuario

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secreto-super-seguro', // Puedes moverlo a .env si quieres
    });
  }

  // Devuelve los datos del payload (email y rol)
  async validate(payload: any) {
    return { email: payload.email, role: payload.role };
  }
}
