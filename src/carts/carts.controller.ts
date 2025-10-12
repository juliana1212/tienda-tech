// Autor: Angie
// Descripción: Rutas del carrito. Requiere usuario autenticado.

import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @Get()
  getMyCart(@Req() req: any) {
    return this.service.getMyCart(req.user.email);
  }

  @Post('items')
  addItem(@Req() req: any, @Body() dto: AddToCartDto) {
    return this.service.addItem(req.user.email, dto);
  }

  @Patch('items/:itemId')
  updateItem(@Req() req: any, @Param('itemId', ParseIntPipe) itemId: number, @Body() dto: UpdateCartItemDto) {
    return this.service.updateItem(req.user.email, itemId, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Req() req: any, @Param('itemId', ParseIntPipe) itemId: number) {
    return this.service.removeItem(req.user.email, itemId);
  }

  @Delete()
  clear(@Req() req: any) {
    return this.service.clear(req.user.email);
  }
}
