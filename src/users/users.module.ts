import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';


@Module({
  providers: [UsersService],
  imports:[
    SequelizeModule.forFeature([User]),
    forwardRef(()=>AuthModule),
    FilesModule
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
