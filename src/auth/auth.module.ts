import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret:'mini-jwt-secter',
       signOptions: {
        expiresIn: '1h',
      },
    }),
    UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService,JwtModule]

})
export class AuthModule {}
