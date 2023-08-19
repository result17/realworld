import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail
} from 'class-validator';

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
