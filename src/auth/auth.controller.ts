import { Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  register(@Body() userDto: CreateUserDto,
           @UploadedFile() avatar:any) {
    return this.authService.register(userDto, avatar);
  }
}
