import { Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto, CreateCommentDto } from './dto';
import { PrismaService } from '../prisma/prisma.service'
import slugify from 'slugify';
import type { ArticlesRequireFilterParam, ArticlesParam } from './types'

@Injectable()
export class ArticleService {

  constructor(private prisma: PrismaService) { }

  private static buildArticlesQueries(param: ArticlesRequireFilterParam) {
    const queries = [];
    if ('tag' in param) {
      queries.push({
        tagList: {
          some: {
            name: param.tag,
          },
        },
      });
    }

    if ('favorited' in param) {
      queries.push({
        favoritedBy: {
          some: {
            username: {
              equals: param.favorited
            }
          },
        },
      });
    }

    if ('author' in param) {
      queries.push({
        author: {
          username: {
            equals: param.author
          }
        }
      })
    }

    return queries
  }

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

  async addCommentToArticle({ body }: CreateCommentDto, articleId: number, userId: number) {

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

  async favoriteArticle(articleId: number, userId: number) {
    return await this.prisma.article.update({
      where: { id: articleId },
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

  async unfavoriteArticle(articleId: number, userId: number) {
    return await this.prisma.article.update({
      where: { id: articleId },
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

  async getArticles(param: ArticlesRequireFilterParam) {
    const andQueries = ArticleService.buildArticlesQueries(param);

    const articlesCount = await this.prisma.article.count({
      where: {
        AND: andQueries,
      },
    });

    const articles = await this.prisma.article.findMany({
      where: { AND: andQueries },
      orderBy: {
        createdAt: 'desc',
      },
      skip: param.offset,
      take: param.limit,
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
    });

    return {
      articles,
      articlesCount
    }
  }

  async getFeedArticles({ offset, limit }: ArticlesParam, userId: number) {
    const articlesCount = await this.prisma.article.count({
      where: {
        author: {
          followedBy: { some: { id: userId } },
        },
      },
    })

    const articles = await this.prisma.article.findMany({
      where: {
        author: {
          followedBy: { some: { id: userId } },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
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
    });
    return {
      articlesCount,
      articles
    }
  }
}
