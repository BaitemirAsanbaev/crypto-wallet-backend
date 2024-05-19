import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto{

  @IsString({message:"Must be string"})
  @IsEmail({}, {message:"Must be email format"})
  email:string

  @IsString({message:"Must be string"})
  firstname:string

  @IsString({message:"Must be string"})
  lastname:string

  @ApiProperty({example:"123123", description:"user's password"})
  @IsString({message:"Must be string"})
  @Length(4, 16, {message:"Must be 4-16 characters"})
  password:string
}