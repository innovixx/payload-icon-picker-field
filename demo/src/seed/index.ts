import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding data...')

  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@innovixx.co.uk',
      password: 'Pa$$w0rd!',
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home Page',
      slug: 'home',
      excerpt: 'This is the home page',
    },
  })

  await payload.create({
    collection: 'posts',
    data: {
      title: 'Hello, world!',
      slug: 'hello-world',
      excerpt: 'This is a post',
    },
  })
}
