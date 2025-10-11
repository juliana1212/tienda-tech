// Autor: Angie
// Descripción: Orden de compra. Es una foto del carrito al comprar.

import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items!: OrderItem[];

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total!: string;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status!: OrderStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
