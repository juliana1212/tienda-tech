// Autor: Natalia Flórez
// Descripción: Representa la tabla "categories" en la base de datos.
// Un producto puede tener varias categorías, y una categoría puede tener varios productos.

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products!: Product[];
}
