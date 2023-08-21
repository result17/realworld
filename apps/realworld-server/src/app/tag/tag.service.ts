import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.tag.findMany()
  }
}
