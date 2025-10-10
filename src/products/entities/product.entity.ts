// Autor: Natalia Flórez
// Descripción: Esta clase representa la tabla "products" en la base de datos
// Un producto puede tener muchas categorías, y cada categoría puede tener muchos productos.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
  // Identificador único del producto
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  // Precio 
  @Column('decimal',{ precision: 10, scale: 2 })
  price!: number;

  // Cantidad en inventario
  @Column({ default: 0 })
  stock!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // Relación con categorías de muchos a muchos
  @ManyToMany(() => Category, (category) => category.products, { eager: true })
  @JoinTable({
    name: 'products_categories', // tabla intermedia
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories!: Category[];
}
