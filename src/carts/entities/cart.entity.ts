// Autor: Angie
// Descripción: Entidad carrito. Un usuario tiene un carrito con varios items.

import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartItem } from './cart-item.entity';


@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user!: User;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true, eager: true })
  items!: CartItem[];
}
