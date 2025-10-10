// Autor: Juliana Casas
// Descripción: Esta es la entidad User. Representa la tabla que se crea en la base de datos
// Aquí se definen las columnas que tendrá el usuario en la tabla

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  // Esta columna es el id principal que se genera automáticamente
  @PrimaryGeneratedColumn()
  id!: number;

  // Guarda el nombre del usuario
  @Column()
  name!: string;

  // Guarda el correo electrónico y no se puede repetir
  @Column({ unique: true })
  email!: string;

  // Guarda la contraseña (más adelante la encriptamos con bcrypt)
  @Column()
  password!: string;

  // Guarda el tipo de usuario: por defecto será CUSTOMER
  @Column({ default: 'CUSTOMER' })
  role!: string;

  // Fecha en que se creó el usuario automáticamente
  @CreateDateColumn()
  createdAt!: Date;
}
