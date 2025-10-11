// Autor: Angie
// Descripción: DTO para actualizar cantidad de un item.

import { IsInt, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  quantity!: number;
}
