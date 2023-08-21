import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '../prisma/prisma.service'
import slugify from 'slugify';

@Injectable()
export class ArticleService {

  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, id: number) {
    const { title, description, body, tagList } = createArticleDto

    const slug = `${slugify(title)}-${id}`;

    return await this.prisma.article.create({
      data: {
        slug,
        title,
        description,
        body,
        author: {
          connect: { id }
        },
        tagList: {
          connectOrCreate: [...new Set(tagList)].map((tag: string) => {
            return ({
              create: { name: tag },
              where: { name: tag },
            })
          })
        }
      },
      include: {
        tagList: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
            followedBy: true,
          },
        },
        favoritedBy: true,
        _count: {
          select: {
            favoritedBy: true,
          },
        },
      },
    })
  }

  async getBySlug(slug: string) {
    return await this.prisma.article.findUnique({
      where: { slug },
      include: {
        tagList: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
            followedBy: true,
          },
        },
        favoritedBy: true,
        _count: {
          select: {
            favoritedBy: true,
          },
        },
      },
    })
  }

  async findBySlug(slug: string) {
    return await this.prisma.article.findUnique({
      where: { slug }
    })
  }

  async updateBySlug({ title, ...rest }: UpdateArticleDto, slug: string, id: number) {

    return await this.prisma.article.update({
      where: { slug },
      data: {
        ...(title !== undefined ? {
          ...rest,
          title,
          slug: `${slugify(title)}-${id}`,
        } : rest),
        updatedAt: new Date().toISOString(),
        author: {
          connect: { id }
        },
      },
      include: {
        tagList: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
            followedBy: true,
          },
        },
        favoritedBy: true,
        _count: {
          select: {
            favoritedBy: true,
          },
        },
      },
    })
  }
}
