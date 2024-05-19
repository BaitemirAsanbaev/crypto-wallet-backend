import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private walletService: WalletService) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);

  }


  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashedPassword });
    await this.walletService.createWallet(user.id);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email};
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Wrong email' });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Wrong password' });
    }
    return user;
  }
}