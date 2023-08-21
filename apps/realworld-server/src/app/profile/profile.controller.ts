import { Controller, Get, Post, Delete, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ReqUser } from '../decorators/params';
import { AuthPayload } from '../auth/types';
import { type ProfileVo } from './vo'
import { type User } from '@prisma/client';

interface UsernameParam {
  username: string
}

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  private static buildProfileVo({ username, bio, image }: User, following: boolean): ProfileVo {
    return {
      profile: {
        username,
        bio,
        image,
        following
      }
    }
  }

  private static throwExceptionWithProfile(profile) {
    if (!profile) {
      throw new HttpException("User profile is not found", HttpStatus.NOT_FOUND);
    }
  }

  @Get(':username')
  async getProfile(@ReqUser() { username: curUsername }: AuthPayload, @Param() { username: profileUsername } : UsernameParam): Promise<ProfileVo> {
    const profile = await this.profileService.getProfile(profileUsername)

    ProfileController.throwExceptionWithProfile(profile)

    const { followedBy, ...user } = profile

    return ProfileController.buildProfileVo(user, followedBy.reduce((acc, { username }) => acc || (username === curUsername), false))
  }

  @Post(':username/follow')
  async followUser(@ReqUser() { id }: AuthPayload, @Param() { username: profileUsername }: UsernameParam) {
    const profile = await this.profileService.followUser(id, profileUsername)

    ProfileController.throwExceptionWithProfile(profile)

    const { followedBy, ...user } = profile

    return ProfileController.buildProfileVo(user, true)
  }

  @Delete(':username/follow')
  async unFollowUser(@ReqUser() { id }: AuthPayload, @Param() { username: profileUsername }: UsernameParam) {
    const profile = await this.profileService.unFollowUser(id, profileUsername)

    ProfileController.throwExceptionWithProfile(profile)

    const { followedBy, ...user } = profile

    return ProfileController.buildProfileVo(user, false)
  }
}
