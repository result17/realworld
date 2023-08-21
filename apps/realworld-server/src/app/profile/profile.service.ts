import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async getProfile(profileUsername: string) {
    return await this.prismaService.user.findUnique({
      where: {
        username: profileUsername,
      },
      include: {
        followedBy: true,
      },
    });
  }

  async followUser(curUserId: number, profileUsername: string) {
    return await this.prismaService.user.update({
      where: {
        username: profileUsername,
      },
      data: {
        followedBy: {
          connect: {
            id: curUserId,
          },
        },
      },
      include: {
        followedBy: true,
      },
    });
  }

  async unFollowUser(curUserId: number, profileUsername: string) {
    return await this.prismaService.user.update({
      where: {
        username: profileUsername,
      },
      data: {
        followedBy: {
          disconnect: {
            id: curUserId,
          },
        },
      },
      include: {
        followedBy: true,
      },
    });
  }
}
