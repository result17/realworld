import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

const strategy = PassportStrategy(Strategy)

@Injectable()
export class LocalStrategy extends strategy {
  constructor(private authService: AuthService) {
    /**
     * so stupid
     * https://github.com/jaredhanson/passport-local/blob/master/lib/utils.js
     *  */
    super({
      usernameField: 'user][email]',
      passwordField: 'user][password]',
    });
  }

  async validate(email: string, password: string)  {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}