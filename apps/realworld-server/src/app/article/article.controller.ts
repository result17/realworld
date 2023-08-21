import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UpdateArticleDto } from './dto/update-article.dto';

import { CreateArticleRequest } from './request'
import { ReqUser } from '../decorators/params';
import { AuthPayload } from '../auth/types';

import { type SingleArticleVo } from './vo'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  async create(@ReqUser() { id: curUserId }: AuthPayload, @Body() { article }: CreateArticleRequest): Promise<SingleArticleVo> {
    const product = await this.articleService.create(article, curUserId);

    const { author: { username, bio, image }, tagList, favoritedBy, ...rest }  = product

    return {
      article: {
        ...rest,
        tagList: tagList.map(({ name }) => name),
        favorited: favoritedBy.reduce((acc, { id }) => acc || id === curUserId, false),
        favoritedCount: favoritedBy.length,
        author: {
          username,
          bio,
          image,
          following: false,
        }
      }
    }

  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
