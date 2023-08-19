import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { generateRandomUser } from '../../../shared/user'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    const newUser = generateRandomUser()
    const { username } = await service.create(newUser)
    expect(username).toStrictEqual(newUser.username)
  })
});


