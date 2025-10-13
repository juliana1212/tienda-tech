// Autor: Natalia Flórez
// Descripción: Módulo de reseñas, conecta Review con User, Product y Ordenes

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product, Order, OrderItem])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
