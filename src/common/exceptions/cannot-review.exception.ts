// Autor: Natalia Flórez
// Descripción: Excepción para cuando un usuario intente reseñar sin haber comprado

import { ForbiddenException } from '@nestjs/common';

export class CannotReviewException extends ForbiddenException {
  constructor() {
    super('No puedes reseñar este producto porque no lo has comprado.');
  }
}