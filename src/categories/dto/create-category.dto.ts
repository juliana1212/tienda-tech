// Autor: Natalia Flórez
// Descripción: DTO para crear categorías

import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}
