import type { CollectionSlug, Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding data...')

  await payload.create({
    collection: 'users' as CollectionSlug,
    data: {
      email: 'admin@innovixx.co.uk',
      password: 'Pa$$w0rd!',
    },
  })

  await payload.create({
    collection: 'pages' as CollectionSlug,
    data: {
      title: 'Home Page',
      slug: 'home',
      excerpt: 'This is the home page',
    },
  })

  await payload.create({
    collection: 'posts' as CollectionSlug,
    data: {
      title: 'Hello, world!',
      slug: 'hello-world',
      excerpt: 'This is a post',
    },
  })
}
