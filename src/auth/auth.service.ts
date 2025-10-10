// Autor: Juliana Casas
// Descripción: Este servicio maneja el login y la generación de tokens JWT
// Verifica las credenciales del usuario, valida la contraseña encriptada
// y genera un token de acceso con el rol correspondiente

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Verifica si el usuario existe y la contraseña es correcta
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Login del usuario (devuelve token JWT)
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login exitoso',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
