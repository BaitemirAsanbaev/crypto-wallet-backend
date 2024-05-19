import { Module } from '@nestjs/common';

import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/wallet.model';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Wallet],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    WalletModule,
  ],
})
export class AppModule {

}