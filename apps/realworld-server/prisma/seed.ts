import {
  generateRandomUser,
} from '../shared/user';
import { UserService } from '../src/app/user/user.service'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userService = new UserService(prisma)

const createUser = async () => {
  return await userService.create(generateRandomUser())
}

async function main() {
  return await Promise.all(Array.from({ length: 30 }, () => createUser()));
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
