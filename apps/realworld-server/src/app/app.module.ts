import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProfileModule } from './profile/profile.module'
import { ArticleModule } from './article/article.module'
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProfileModule,
    ArticleModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}
