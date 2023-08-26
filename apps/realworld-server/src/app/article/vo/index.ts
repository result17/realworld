import { type Article, type User, type Comment } from 'prisma/prisma-client'

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

export interface MultipleArticlesVo {
  articles: ArticleVo[],
  articlesCount: number,
}

export type CommentVo = Omit<Comment, 'articleId' | 'authorId'> & {
  author: Pick<User, 'username' | 'bio' | 'image'> & {
    following: boolean
  }
}

export interface SingleCommentVo {
  comment: CommentVo
}

export interface MultipleCommentsVo {
  comments: CommentVo[]
}
