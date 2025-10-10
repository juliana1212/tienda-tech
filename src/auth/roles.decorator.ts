// Autor: Juliana Casas
// Descripción: Decorador para definir roles permitidos en las rutas.

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
