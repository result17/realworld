import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  /**
   * {
   *   "username": "xxxx",
   *   "password": "xxxx"
   * }
   * it must be above
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req)
    return req.user;
  }
}
