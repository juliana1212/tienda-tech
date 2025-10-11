// Autor: Natalia Flórez
// Descripción: DTO para actualizar productos existentes.


import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}