import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User)
              private userRepo: typeof User,
              private fileService:FilesService) {
  }

  async createUser(dto: CreateUserDto, image:any) {
    const fileName = await this.fileService.createFile(image);
    return await this.userRepo.create({ ...dto, avatar:fileName });
  }

  async getByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email }, include: { all: true } });
  }


}
