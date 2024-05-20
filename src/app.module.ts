import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/wallet.model';
import { HistoryModule } from './history/history.module';
import * as path from 'path';
import { Purchases } from './history/purchases.model';
import { Sales } from './history/sales.model';
import { Swaps } from './history/swaps.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      protocol: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Wallet, Purchases, Sales, Swaps],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: process.env.POSTGRES_SSL === 'true',
          rejectUnauthorized: false, // Adjust based on your security requirements
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    WalletModule,
    HistoryModule,
  ],
})
export class AppModule {

}