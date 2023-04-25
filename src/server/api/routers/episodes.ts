import axios from 'axios'
import Parser from 'rss-parser'
import { z } from 'zod'

import { env } from '~/env.mjs'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

interface FeedItem {
  id: string | undefined
  title: string
  url: string
  videoSourceUrl?: string
}

interface PaginationLink {
  linkText: string
  url: string
}

export const episodesRouter = createTRPCRouter({
  getEpisodes: publicProcedure
    .input(
      z.object({
        showId: z.number(),
        page: z.number().min(1).optional().default(1),
      }),
    )
    .query(async ({ input }) => {
      const episodesResponse = await axios
        .get<string>(env.DATA_SOURCE_BASE_URL, {
          params: { film: input.showId, nocache: 1, page: input.page },
        })
        .then((response) => response.data)

      const feed = await new Parser({}).parseString(episodesResponse)

      const feedItems: FeedItem[] = feed.items.map((item) => {
        const videoUrl = new URL(item.enclosure?.url as string)

        return {
          id: videoUrl.pathname.split('/').pop(),
          title: item.title as string,
          url: item.enclosure?.url as string, // NOTE this could also be a video source as well
        }
      })

      // check if url string last entry in feedItems is a pagination link
      const lastEntry =
        feedItems.length > 0 ? feedItems[feedItems.length - 1] : undefined

      const episodes = feedItems
      let nextPage: PaginationLink | undefined = undefined
      if (lastEntry?.title.startsWith('Page ')) {
        nextPage = { linkText: lastEntry.title, url: lastEntry.url }
        episodes.pop()
      }

      return {
        title: feed.title as string,
        episodes,
        nextPage,
      }
    }),
})
