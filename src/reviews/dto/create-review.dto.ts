// Autor: Natalia Flórez
// Descripción: DTO para crear reseñas

import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}