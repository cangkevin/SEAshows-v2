import { episodesRouter } from './routers/episodes'
import { showsRouter } from './routers/shows'

import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shows: showsRouter,
  episodes: episodesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
