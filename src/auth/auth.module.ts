//quí uno el controlador con el servicio
//Este módulo se importa en el principal (app.module.ts) para que funcione todo el sistema
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
