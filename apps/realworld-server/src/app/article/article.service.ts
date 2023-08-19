import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import prisma from '../../../prisma/prisma-client';

@Injectable()
export class ArticleService {
  async create(createArticleDto: CreateArticleDto) {
    // const { slug, title, description, body } = createArticleDto
    // await prisma.article.create({
    //   data: {
    //     slug,
    //     title,
    //     description,
    //     body
    //   }
    // })

    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
