import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  async vaildateUser(email: string, password: string) {
    const existingUserByEmail = await this.userService.findByEmail(email)
    if (!existingUserByEmail || existingUserByEmail.password !== password) {
      throw new UnauthorizedException()
    }
    return existingUserByEmail
  }
}
