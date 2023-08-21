import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Put } from '@nestjs/common';
import { ArticleService } from './article.service';

import { CreateArticleRequest, UpdateArticleRequest } from './request'
import { ReqUser } from '../decorators/params';
import { AuthPayload } from '../auth/types';

import { type SingleArticleVo } from './vo'
import { ArticleSlugParam } from './types'
import { Public } from '../decorators/auth';


@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  private static buildSingleArticleVo(product, userId?: number) {
    const { author: { username, bio, image, followedBy }, tagList, favoritedBy, id, slug, _count, ...rest } = product

    return {
      article: {
        ...rest,
        tagList: tagList.map(({ name }) => name),
        favorited: userId !== undefined ? favoritedBy.reduce((acc, { id }) => acc || id === userId, false) : false,
        favoritedCount: favoritedBy.length,
        author: {
          username,
          bio,
          image,
          following: userId !== undefined ? followedBy.reduce((acc, { id }) => acc || id === userId, false) : false,
        }
      }
    }
  }

  @Post()
  async create(@ReqUser() { id: curUserId }: AuthPayload, @Body() { article }: CreateArticleRequest): Promise<SingleArticleVo> {
    const product = await this.articleService.create(article, curUserId);

    if (!product) {
      throw new HttpException('Forbidden creating article!', HttpStatus.FORBIDDEN)
    }

    return ArticleController.buildSingleArticleVo(product, curUserId)
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param() { slug }: ArticleSlugParam, @ReqUser() user: AuthPayload | undefined) {
    const product = await this.articleService.getBySlug(slug)

    if (!product) {
      throw new HttpException('Article is not found!', HttpStatus.NOT_FOUND)
    }

    return ArticleController.buildSingleArticleVo(product, user?.id)
  }

  @Put(':slug')
  async updateBySlug(@Param() { slug }: ArticleSlugParam, @Body() { article }: UpdateArticleRequest , @ReqUser() { id }: AuthPayload) {
    
    const existingArticle = await this.articleService.findBySlug(slug)

    if (!existingArticle) {
      throw new HttpException('Article is not found', HttpStatus.NOT_FOUND)
    }

    console.log(article)

    const product = await this.articleService.updateBySlug(article, slug, id)

    if (!product) {
      throw new HttpException('Article is not found!', HttpStatus.NOT_FOUND)
    }

    return ArticleController.buildSingleArticleVo(product, id)
  }
}
