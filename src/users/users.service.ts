// Este archivo maneja toda la lógica de los usuarios.
// Aquí se crea un nuevo usuario y se guarda en la base de datos.
// También se encripta la contraseña antes de guardar para mayor seguridad.


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from '../common/exceptions/user_already_exists.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear usuario: valida correo único y encripta contraseña
  async create(createUserDto: CreateUserDto): Promise<User> {
    // verificar si ya existe un usuario con ese correo
    const exists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (exists) {
      throw new UserAlreadyExistsException();
    }

    // encriptar contraseña
    const hashed = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashed,
      role: createUserDto.role,
    });

    const saved = await this.userRepository.save(newUser);

    // opcional: no devolver la contraseña
    delete (saved as any).password;
    return saved;
  }

  // buscar por correo (se usa en login)
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
