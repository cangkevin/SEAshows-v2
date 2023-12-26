import axios from 'axios'
import Parser from 'rss-parser'
import { z } from 'zod'

import { env } from '~/env.mjs'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { type PaginationLink } from '~/utils/types'

interface FeedItem {
  id: string | undefined
  title: string
  url: string
  videoSourceUrl?: string
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
      const legacyHost = new URL(env.DATA_SOURCE_BASE_URL).host

      // NOTE - collect items that already have the video source URL directly in the response
      const nonPaginationItems = feed.items.filter(
        (item) => new URL(item.enclosure?.url as string).host !== legacyHost,
      )

      // NOTE - collect items that don't have a direct video source URL
      let possiblePaginationItems = feed.items.filter(
        (item) => new URL(item.enclosure?.url as string).host === legacyHost,
      )

      if (possiblePaginationItems.length > 0) {
        possiblePaginationItems = await Promise.all(
          possiblePaginationItems.map(async (item) => {
            const videoUrl = new URL(item.enclosure?.url as string)

            if (!item.title?.startsWith('Page ')) {
              const nestedEpisodeResponse = await axios
                .get<string>(videoUrl.href)
                .then((response) => response.data)

              const nestedEpisodesFeed = await new Parser({}).parseString(
                nestedEpisodeResponse,
              )

              if (nestedEpisodesFeed.items.length > 0) {
                item.enclosure = {
                  url: nestedEpisodesFeed.items[0]?.enclosure?.url as string,
                }
              }
            }

            return item
          }),
        )
      }

      const feedItems: FeedItem[] = [
        ...nonPaginationItems,
        ...possiblePaginationItems,
      ].map((item) => {
        const videoUrl = new URL(item.enclosure?.url as string)

        return {
          id: videoUrl.pathname.split('/').pop(),
          title: item.title as string,
          url: item.enclosure?.url as string,
        }
      })

      // check if last entry in feedItems is a pagination link
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
