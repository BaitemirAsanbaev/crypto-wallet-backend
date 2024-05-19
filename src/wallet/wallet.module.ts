import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';
import { User } from '../users/user.model';
import { WalletController } from './wallet.controller';
import { JwtModule } from '@nestjs/jwt';
import { HistoryModule } from '../history/history.module';


@Module({
  providers: [WalletService],
  imports: [
    SequelizeModule.forFeature([Wallet, User]),
    JwtModule.register({
        secret: process.env.SECRET_KEY || 'huita',
        signOptions: {
          expiresIn: '24h',
        },
      },
    ),
    HistoryModule
  ],
  exports: [
    WalletService,
  ],
  controllers: [WalletController],
})
export class WalletModule {
}
