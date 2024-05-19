import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { WalletModule } from '../wallet/wallet.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    ConfigModule,
    forwardRef(()=>UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'huita',
      signOptions:{
        expiresIn:'24h',
      },

    }),

    WalletModule,
  ],
  exports:[
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
