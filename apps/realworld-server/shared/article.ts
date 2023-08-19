import { randFood, randParagraph, randWord, randFullAddress  } from "@ngneat/falso";

export const generateRandomArticle = () => {
  const food = randFood()
  return {
    slug: food,
    title: food,
    description: randFullAddress(),
    body: randParagraph(),
    tags: randWord({ length: 4 }),
  };
};
