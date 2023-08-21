import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

import { type User } from '@prisma/client'
import { type AuthPayload } from './types'

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const existingUserByEmail = await this.userService.findByEmail(email)
    if (!existingUserByEmail || existingUserByEmail.password !== password) {
      throw new UnauthorizedException()
    }
    return existingUserByEmail
  }

  login({ username, email, id }: User) {
    const payload: AuthPayload = { username, email, id }
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
