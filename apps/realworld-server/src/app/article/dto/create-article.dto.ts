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
  @MaxLength(20)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
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
  tags: string[];
}
