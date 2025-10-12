// Autor: Angie
// Descripción: Rutas de órdenes. Crea la orden desde el carrito y lista órdenes del usuario.

import { Controller, Post, Get, Param, ParseIntPipe, UseGuards, Req, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  createFromCart(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.service.createFromCart(req.user.email, dto);
  }

  @Get()
  myOrders(@Req() req: any) {
    return this.service.myOrders(req.user.email);
  }

  @Get(':id')
  getOne(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.getOne(req.user.email, id);
  }
}
