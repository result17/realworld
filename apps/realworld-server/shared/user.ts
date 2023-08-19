import {
  randEmail,
  randFullName,
  randLine,
  randPassword,
} from '@ngneat/falso';

export const generateRandomUser = () => ({
  email: randEmail(),
  username: randFullName(),
  password: randPassword(),
  image: 'https://api.realworld.io/images/demo-avatar.png',
  bio: randLine(),
  demo: true
})
