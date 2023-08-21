import { UpdateArticleDto } from '../dto/update-article.dto'
import {
  IsNotEmpty, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'

export class UpdateArticleRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  article: UpdateArticleDto
}
