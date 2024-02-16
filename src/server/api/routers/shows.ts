import axios from 'axios'
import { parse } from 'node-html-parser'
import Parser from 'rss-parser'
import { z } from 'zod'

import { env } from '~/env.mjs'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import type { ResourcePaginationLink, ShowFeedItem } from '~/utils/types'

export const showsRouter = createTRPCRouter({
  getShows: publicProcedure
    .input(
      z.object({
        category: z.string().default('hk-drama'),
        page: z.number().min(1).optional().default(1),
      }),
    )
    .query(async ({ input }) => {
      const showsResponse = await axios
        .get<string>(env.DATA_SOURCE_BASE_URL, {
          params: { channel: input.category, nocache: 1, page: input.page },
        })
        .then((response) => response.data)

      const feed = await new Parser({}).parseString(showsResponse)

      const feedItems: ShowFeedItem[] = feed.items.map((item) => {
        return {
          id: parseInt(
            new URL(item.enclosure?.url as string).searchParams.get(
              'film',
            ) as string,
          ),
          title: item.title as string,
          url: item.enclosure?.url as string,
          imageUrl: parse(item.content as string)
            .querySelector('img')
            ?.getAttribute('src') as string,
        }
      })
      // check if last entry in feedItems is a pagination link
      const lastEntry =
        feedItems.length > 0 ? feedItems[feedItems.length - 1] : undefined

      const shows = feedItems
      let nextPage: ResourcePaginationLink | undefined = undefined
      if (lastEntry?.title.startsWith('Page ')) {
        nextPage = { linkText: lastEntry.title, url: lastEntry.url }
        shows.pop()
      }

      return {
        shows,
        nextPage,
      }
    }),
})
