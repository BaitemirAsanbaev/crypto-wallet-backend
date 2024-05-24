import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  register(@Body() dto: CreateUserDto,
           @UploadedFile() avatar:any) {
    return this.authService.register(dto, avatar);
  }
}
