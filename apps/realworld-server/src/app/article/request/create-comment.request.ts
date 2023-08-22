import { CreateCommentDto } from '../dto/create-comment.dto'

import {
  IsNotEmpty, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'

export class CreateCommentRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCommentDto)
  comment: CreateCommentDto
}

