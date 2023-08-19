import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto
    })
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: { username }
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  async updateByUsername(username: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { username },
      data: updateUserDto
    })
  }

  async removeById(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    })
  }

  async removeByUsername(username: string) {
    return await this.prisma.user.delete({
      where: { username },
    })
  }

  async removeAll() {
    return await this.prisma.user.deleteMany()
  }
}
