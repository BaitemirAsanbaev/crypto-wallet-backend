import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { JwtModule } from '@nestjs/jwt';
import { Purchases } from './purchases.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sales } from './sales.model';
import { Swaps } from './swaps.model';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports:[
    SequelizeModule.forFeature([Purchases, Sales, Swaps]),
    JwtModule.register({
        secret: process.env.SECRET_KEY || 'huita',
        signOptions: {
          expiresIn: '24h',
        },
      },
    ),
  ],
  exports: [HistoryService],
})
export class HistoryModule {
}
