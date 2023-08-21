import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
