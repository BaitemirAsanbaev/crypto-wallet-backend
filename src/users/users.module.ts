import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';


@Module({
  providers: [UsersService],
  imports:[
    SequelizeModule.forFeature([User]),
    PostsModule,
    forwardRef(()=>AuthModule)
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
