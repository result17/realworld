import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  isArray,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
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
  tags: Set<string>;
}
