// Autor: Natalia Flórez
// Descripción: Lógica de reseñas, se valida que el usuario realizó una compra de un producto (SHIPPED)

import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { CannotReviewException } from '../common/exceptions/cannot-review.exception';


@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepo: Repository<OrderItem>,
  ) {}


  // crear reseña si el usuario tiene una orden SHIPPED con ese producto
  async create(userEmail: string, dto: CreateReviewDto) {
    const user = await this.userRepo.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    // Validar si ya hizo una reseña del mismo producto
    const exists = await this.reviewRepo.findOne({
      where: { user: { id: user.id }, product: { id: product.id } },
    });
    if (exists) throw new ConflictException('Ya creaste una reseña para este producto');

    // Validar que el usuario tenga una orden SHIPPED con ese producto
    const hasPurchased = await this.orderRepo
      .createQueryBuilder('o')
      .innerJoin('o.items', 'oi')
      .innerJoin('oi.product', 'p')
      .where('o.user_id = :userId', { userId: user.id })
      .andWhere('o.status = :status', { status: 'SHIPPED' })
      .andWhere('p.id = :productId', { productId: product.id })
      .getOne();

    if (!hasPurchased) {
      throw new CannotReviewException(); 
    }

    const review = this.reviewRepo.create({
      user,
      product,
      rating: dto.rating,
      comment: dto.comment,
    });

    const saved = await this.reviewRepo.save(review);
    return {
      message: 'Reseña creada',
      data: saved,
    };
  }

  //  Listar reseñas por producto
  async listByProduct(productId: number) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const reviews = await this.reviewRepo.find({
      where: { product: { id: productId } },
      order: { id: 'DESC' as any },
      relations: ['user'],
    });

    return {
      producto: { id: product.id, nombre: product.name },
      totalReseñas: reviews.length,
      reseñas: reviews,
    };
  }

  // Listar reseñas del usuario autenticado
  async myReviews(userEmail: string) {
    const user = await this.userRepo.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const reviews = await this.reviewRepo.find({
      where: { user: { id: user.id } },
      order: { id: 'DESC' as any },
      relations: ['product'],
    });

    return {
      usuario: { id: user.id, email: user.email },
      total: reviews.length,
      reseñas: reviews,
    };
  }
}