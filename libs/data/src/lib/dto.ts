import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsEmail
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class CreateArticleDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  description: string;
  
  @IsString()
  @MinLength(5)
  @MaxLength(300)
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @MaxLength(20, {
    each: true,
  })
  tagList: string[];
}

export class CreateCommentDto {

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  body: string;
}

export class UpdateArticleDto {

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsOptional()
  description: string;
  
  @IsString()
  @MinLength(5)
  @MaxLength(300)
  @IsOptional()
  body: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  image: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  bio: string;

  @IsBoolean()
  @IsOptional()
  demo: boolean;
}

export class UpdateUserDto extends PickType(CreateUserDto, ['email', 'bio', 'image'] as const) {}

export const RegisterUserSuperDto = PickType(CreateUserDto, ['email', 'username', 'password'])

export class RegisterUserDto extends PickType(CreateUserDto, ['email', 'username', 'password']) {}
