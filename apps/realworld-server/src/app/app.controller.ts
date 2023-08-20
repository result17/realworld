import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Public } from './decorators/auth'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  /**
   * {
   *   "username": "xxxx",
   *   "password": "xxxx"
   * }
   * must be like above
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
