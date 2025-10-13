// Autor: Juliana Casas
// Descripción: Este archivo carga los módulos principales del proyecto
// Aquí se configura la base de datos de Railway usando las variables del archivo .env
// Se usa la URL completa (DB_URL) para evitar errores de conexión

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
//
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';

import { ReviewsModule } from './reviews/reviews.module';


@Module({
  imports: [
    // Carga global de variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexión con la base de datos MySQL (Railway)
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL, // usa la URL completa de conexión
      autoLoadEntities: true, // carga automáticamente todas las entidades
      synchronize: true, // crea las tablas automáticamente en desarrollo
    }),

    // Módulos principales
    AuthModule,
    UsersModule,

        // Módulos del catálogo (Natalia)
    ProductsModule,
    CategoriesModule,
        // Módulos de carrito y ordenes
    CartsModule,
    OrdersModule,

    //Modulo de reseñas (Natalia)
    ReviewsModule,

  ],
})
export class AppModule {}
