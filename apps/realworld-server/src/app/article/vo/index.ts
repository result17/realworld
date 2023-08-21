import { type Article, type User } from 'prisma/prisma-client'

type ArticleVo = Omit<Article, 'id' | 'authorId'> & {
  tagList: string[],
  favorited: boolean,
  favoritedCount: number,
  author: Pick<User, 'username' | 'bio' | 'image'> & {
    following: boolean
  }
}

export interface SingleArticleVo {
  article: ArticleVo
}
