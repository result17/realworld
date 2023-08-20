import { type User } from '@prisma/client'

export interface LoginUserVo {
  user: Omit<User, 'id' | 'demo' | 'password'> & {
    token: string
  }
}
