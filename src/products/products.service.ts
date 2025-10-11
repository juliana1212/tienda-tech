// Autor: Natalia Flórez
// Descripción: Este servicio maneja la lógica de negocio de los productos.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Crear producto
// Crear producto (solo ADMIN)
async create(dto: CreateProductDto): Promise<Product> {
  // Si el producto tiene categorías, las convertimos en entidades parciales
  const categories = dto.categories?.map((id) => ({ id })) || [];

  // Creamos el producto combinando los datos con las categorías procesadas
  const product = this.productRepository.create({
    ...dto,
    categories,
  });

  // Guardamos el producto en la base de datos
  return await this.productRepository.save(product);
}


  // Listar todos los productos
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Buscar por id
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  // Actualizar producto
  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  // Eliminar producto
  async remove(id: number): Promise<string> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return `Producto con id ${id} eliminado correctamente`;
  }
}
