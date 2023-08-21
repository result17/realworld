import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
