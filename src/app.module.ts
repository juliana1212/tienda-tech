// Autor: Juliana Casas
// Descripción: Este archivo carga los módulos principales del proyecto
// Aquí se configura la base de datos usando las variables del archivo .env

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // Carga las variables del archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configura la base de datos MySQL con TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, // Crea automáticamente las tablas según las entidades
    }),

    // Módulos del proyecto
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
