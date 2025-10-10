// Este archivo maneja toda la lógica de los usuarios.
// Aquí se crea un nuevo usuario y se guarda en la base de datos.
// También se encripta la contraseña antes de guardar para mayor seguridad.

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // permite acceder a la tabla de usuarios
  ) {}

  // Esta función crea un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Ciframos la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Creamos el nuevo usuario con los datos del DTO
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Guardamos el usuario en la base de datos
    return this.userRepository.save(newUser);
  }

  // Esta función busca un usuario por su correo util para el login
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
