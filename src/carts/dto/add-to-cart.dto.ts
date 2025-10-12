// Autor: Angie
// Descripción: DTO para agregar producto al carrito.

import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  productId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}
