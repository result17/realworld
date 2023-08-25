import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from '../prisma/prisma.service'
import slugify from 'slugify';
import { CreateCommentDto } from './dto/create-comment.dto';

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

  async deleteById(id: number) {
    return await this.prisma.article.delete({
      where: { id }
    })
  }

  async addCommentToArticle({ body  }: CreateCommentDto, articleId: number, userId: number) {
    
    return await this.prisma.comment.create({
      data: {
        body,
        article: {
          connect: {
            id: articleId
          }
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
            followedBy: true,
          },
        },
      }
    })
  }

  async getCommentById(commentId: number) {
    return await this.prisma.comment.findUnique({
      where: { id: commentId },
    })
  }

  async getCommentsOfArticle(articleId: number) {
    return await this.prisma.comment.findMany({
      where: { articleId },
      include: {
        author: {
          select: {
            username: true,
            bio: true,
            image: true,
            followedBy: true,
          },
        },
      } 
    })
  }

  async deleteCommentsById(commentId: number) {
    return await this.prisma.comment.delete({
      where: { id: commentId }
    })
  }

   async favoriteArticle(acrticleId: number, userId: number) {
    return await this.prisma.article.update({
      where: { id: acrticleId },
      data: {
        favoritedBy: {
           connect: {
            id: userId
           }
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

   async unfavoriteArticle(acrticleId: number, userId: number) {
    return await this.prisma.article.update({
      where: { id: acrticleId },
      data: {
        favoritedBy: {
           disconnect: {
            id: userId
           }
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

}
