// Autor: Natalia Flórez
// Descripción: Lógica para las categorías, CRUD básico con validaciones.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Crear una categoría
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  // Listar todas las categorías
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Buscar una categoría por ID
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    return category;
  }

  // Actualizar una categoría
  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return await this.categoryRepository.save(category);
  }

  // Eliminar una categoría
  async remove(id: number): Promise<string> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return `Categoría con id ${id} eliminada correctamente`;
  }
}