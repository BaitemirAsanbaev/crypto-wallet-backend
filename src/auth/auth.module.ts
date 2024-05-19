import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { WalletModule } from '../wallet/wallet.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    forwardRef(()=>UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions:{
        expiresIn:'24h',
      }
    }),
    WalletModule,
  ],
  exports:[
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
