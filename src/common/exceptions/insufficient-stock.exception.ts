// Autor: Angie
// Descripción: Excepción cuando no hay stock suficiente.

import { BadRequestException } from '@nestjs/common';

export class InsufficientStockException extends BadRequestException {
  constructor(productId: number) {
    super(`No hay stock suficiente para el producto con id ${productId}`);
  }
}
