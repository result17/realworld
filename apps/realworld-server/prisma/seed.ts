import {
  generateRandomUser,
  generateRandomArticle,
} from '../shared';
import { UserService } from '../src/app/user/user.service'
import { ArticleService } from '../src/app/article/article.service'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userService = new UserService(prisma)

const articleService = new ArticleService(prisma, userService)

const createUser = async () => {
  return await userService.create(generateRandomUser())
}

const createArticle = async (username: string) => {
  return await articleService.create(generateRandomArticle(), username)
}

async function main() {
  const users = await Promise.all(Array.from({ length: 30 }, () => createUser()));

  for await (const user of users) {
    await Promise.all(
      Array.from({ length: 3 }, () => createArticle(user.username)),
    );

    // eslint-disable-next-line no-restricted-syntax
    // for await (const article of articles) {
    //   await Promise.all(users.map(userItem => generateComment(userItem.username, article.slug)));
    // }
  }
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
