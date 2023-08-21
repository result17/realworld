import { CreateArticleDto } from '../dto/create-article.dto'
import {
  IsNotEmpty, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'

export class CreateArticleRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateArticleDto)
  article: CreateArticleDto
}
