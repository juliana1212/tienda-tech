// Autor: Natalia Flórez
// Descripción: Rutas de reseñas, crear solo si compró y listar por producto mis reseñas.

import { Controller, Post, Get, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}


  // crear reseña (solo si está autenticado)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() dto: CreateReviewDto) {
    return await this.service.create(req.user.email, dto);
  }

  // listar reseñas de un producto
  @Get('product/:productId')
  async listByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return await this.service.listByProduct(productId);
  }

  // listar mis reseñas
  @UseGuards(JwtAuthGuard)
  @Get('mine')
  async myReviews(@Req() req: any) {
    return await this.service.myReviews(req.user.email);
  }
}
