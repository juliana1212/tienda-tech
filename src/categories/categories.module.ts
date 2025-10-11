// Autor: Natalia Flórez
// Descripción: Este módulo gestiona las categorías de los productos
// Conectamos el controlador, servicio y la entidad Category con TypeORM


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule, CategoriesService],
})
export class CategoriesModule {}

