import { type User } from '@prisma/client'

export interface AuthUserVo {
  user: Omit<User, 'id' | 'demo' | 'password'> & {
    token: string
  }
}
