//Aquí solo estoy probando que el servicio funciona.
//Cuando lo llame desde el controlador, debe mostrar el mensaje “Funciona el servicio de Auth”.
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getMessage(): string {
    return 'Funciona el servicio de Auth';
  }
}
