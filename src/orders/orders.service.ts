// Autor: Angie
// Descripción: Lógica de órdenes. Valida stock, descuenta y vacía el carrito.

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../users/entities/user.entity';
import { Cart } from '../carts/entities/cart.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { InsufficientStockException } from '../common/exceptions/insufficient-stock.exception';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async createFromCart(userEmail: string, _dto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException('usuario no encontrado');

    const cart = await this.cartRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['items', 'items.product'],
    });
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new NotFoundException('el carrito está vacío');
    }

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      for (const item of cart.items) {
        const dbProduct = await qr.manager.findOne(Product, { where: { id: item.product.id } });
        if (!dbProduct) throw new NotFoundException(`producto ${item.product.id} no existe`);
        if (dbProduct.stock < item.quantity) {
          throw new InsufficientStockException(dbProduct.id);
        }
      }

      const order = this.orderRepo.create({
        user,
        items: [],
        status: 'PENDING',
        total: 0,
      });
      await qr.manager.save(order);

      let total = 0;

      for (const item of cart.items) {
        const p = await qr.manager.findOne(Product, { where: { id: item.product.id } });
        if (!p) throw new NotFoundException(`producto ${item.product.id} no existe`);

        p.stock = p.stock - item.quantity;
        await qr.manager.save(p);

        const lineTotal = Number(p.price) * item.quantity;
        total += lineTotal;

        const oi = new OrderItem();
        oi.order = order;
        oi.product = p;
        oi.productName = p.name;
        oi.unitPrice = Number(p.price);
        oi.quantity = item.quantity;
        oi.lineTotal = Number(lineTotal.toFixed(2));

        await qr.manager.save(oi);
      }

      order.total = Number(total.toFixed(2));
      order.status = 'SHIPPED';
      await qr.manager.save(order);

      await qr.manager.delete('cart_items', { cart: { id: cart.id } });

      await qr.commitTransaction();
      return await this.orderRepo.findOne({
        where: { id: order.id },
        relations: ['items', 'items.product'],
      });
    } catch (e) {
      await qr.rollbackTransaction();
      throw e;
    } finally {
      await qr.release();
    }
  }

  async myOrders(userEmail: string): Promise<Order[]> {
    const user = await this.userRepo.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException('usuario no encontrado');

    return this.orderRepo.find({
      where: { user: { id: user.id } },
      order: { id: 'DESC' as any },
      relations: ['items', 'items.product'],
    });
  }

  async getOne(userEmail: string, id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id }, relations: ['user', 'items', 'items.product'] });
    if (!order) throw new NotFoundException('orden no encontrada');
    if (order.user.email !== userEmail)
      throw new ForbiddenException('no puedes ver órdenes de otros');
    return order;
  }
}
