// Autor: Juliana Casas
// Descripción: Validaciones básicas para el registro de usuario.

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsEmail({}, { message: 'El correo debe ser válido' })
  email: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role: string; // CUSTOMER o ADMIN
}
