import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepo.create(dto);
  }

  async getByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email }, include: { all: true } });
  }


}
