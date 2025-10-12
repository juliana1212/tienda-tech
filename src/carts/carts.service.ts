// Autor: Angie
// Descripción: Lógica del carrito. Solo el dueño puede ver y modificar su carrito.

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private readonly itemRepo: Repository<CartItem>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  private async getOrCreateCartByEmail(userEmail: string): Promise<Cart> {
    const user = await this.userRepo.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException('usuario no encontrado');

    let cart = await this.cartRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      cart = this.cartRepo.create({ user, items: [] });
      cart = await this.cartRepo.save(cart);
    }

    return cart;
  }

  async getMyCart(userEmail: string): Promise<any> {
    const cart = await this.getOrCreateCartByEmail(userEmail);

    if (!cart.items || cart.items.length === 0) {
      return {
        message: 'Carrito vacío',
        items: [],
      };
    }

    return cart;
  }

  async addItem(userEmail: string, dto: AddToCartDto): Promise<any> {
    const cart = await this.getOrCreateCartByEmail(userEmail);
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('producto no encontrado');

    const existing = cart.items?.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += dto.quantity;
      await this.itemRepo.save(existing);
    } else {
      const item = this.itemRepo.create({ cart, product, quantity: dto.quantity });
      await this.itemRepo.save(item);
    }

    return {
      message: 'Producto agregado al carrito',
      cart: await this.getOrCreateCartByEmail(userEmail),
    };
  }

  async updateItem(userEmail: string, itemId: number, dto: UpdateCartItemDto): Promise<any> {
    const cart = await this.getOrCreateCartByEmail(userEmail);
    const item = await this.itemRepo.findOne({ where: { id: itemId }, relations: ['cart'] });
    if (!item) throw new NotFoundException('item no encontrado');

    if (item.cart.id !== cart.id) {
      throw new ForbiddenException('Acceso denegado: este carrito pertenece a otro usuario');
    }

    item.quantity = dto.quantity;
    await this.itemRepo.save(item);

    return {
      message: 'Producto actualizado correctamente',
      cart: await this.getOrCreateCartByEmail(userEmail),
    };
  }

  async removeItem(userEmail: string, itemId: number): Promise<any> {
    const cart = await this.getOrCreateCartByEmail(userEmail);
    const item = await this.itemRepo.findOne({ where: { id: itemId }, relations: ['cart'] });
    if (!item) throw new NotFoundException('item no encontrado');

    if (item.cart.id !== cart.id) {
      throw new ForbiddenException('Acceso denegado: este carrito pertenece a otro usuario');
    }

    await this.itemRepo.remove(item);

    return {
      message: 'Producto eliminado del carrito',
      cart: await this.getOrCreateCartByEmail(userEmail),
    };
  }

  async clear(userEmail: string): Promise<any> {
    const cart = await this.getOrCreateCartByEmail(userEmail);
    await this.itemRepo.remove(cart.items || []);

    return {
      message: 'Carrito vaciado correctamente',
      cart: await this.getOrCreateCartByEmail(userEmail),
    };
  }
}


