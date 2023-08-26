export interface ArticleSlugParam {
  slug: string
}

export interface ArticleSlugWithCommentIdParam {
  slug: string,
  id: number,
}

export interface ArticlesParam {
  limit: number,
  offset: number
}

interface ArticlesFilterParam {
  tag?: string,
  author?: string,
  favorited?: string,
}

export interface ArticleOptionalFilterParam extends ArticlesFilterParam, ArticlesParam {}

export interface ArticlesRequireFilterParam extends ArticlesFilterParam, Required<ArticlesParam> {}
