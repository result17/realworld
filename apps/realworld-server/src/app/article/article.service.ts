import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { type PrismaService } from '../prisma/prisma.service'
import { type UserService } from '../user/user.service'

@Injectable()
export class ArticleService {

  constructor(private prisma: PrismaService, private user: UserService) {}

  async create(createArticleDto: CreateArticleDto, username: string) {
    const { slug, title, description, body, tags } = createArticleDto

    const { id } = await this.user.findByUsername(username)

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
          connectOrCreate: [...new Set(tags)].map((tag: string) => {
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
