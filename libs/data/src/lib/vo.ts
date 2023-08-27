import type { Article, User, Comment } from '@prisma/client'

export interface ProfileVo {
  profile: {
    username: string,
    bio: string,
    image: string,
    following: boolean
  }
}

export interface TagsVo {
  tags: string[]
}

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

export interface AuthUserVo {
  user: Omit<User, 'id' | 'demo' | 'password'> & {
    token: string
  }
}
