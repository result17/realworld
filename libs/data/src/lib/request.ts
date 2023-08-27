import { CreateArticleDto, CreateCommentDto, UpdateArticleDto, UpdateUserDto, RegisterUserDto } from './dto'
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

export class CreateCommentRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCommentDto)
  comment: CreateCommentDto
}

export class UpdateArticleRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  article: UpdateArticleDto
}

export interface ArticleSlugParam {
  slug: string
}

export interface ArticleSlugWithCommentIdParam {
  slug: string,
  id: number,
}

export interface ArticlesParam {
  limit: number,
  offset: number
}

interface ArticlesFilterParam {
  tag?: string,
  author?: string,
  favorited?: string,
}

export interface ArticleOptionalFilterParam extends ArticlesFilterParam, ArticlesParam {}

export interface ArticlesRequireFilterParam extends ArticlesFilterParam, Required<ArticlesParam> {}

export class UpdateUserRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto
}

export class RegisterUserRequest {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RegisterUserDto)
  user: RegisterUserDto
}

