// Autor: Angie
// Descripción: Item de la orden. Guarda nombre, precio y cantidad del momento de compra.

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Product, { eager: true })
  product!: Product;

  @Column({ type: 'varchar', length: 150 })
  productName!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice!: string;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  lineTotal!: string;
}
