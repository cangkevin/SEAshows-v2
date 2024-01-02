import axios from 'axios'
import Parser from 'rss-parser'
import { z } from 'zod'

import { env } from '~/env.mjs'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { type PaginationLink } from '~/utils/types'

export interface EpisodeUrl {
  language: string
  url: string
}

interface FeedItem {
  id: string | undefined
  title: string
  url: string
  alternateUrls?: EpisodeUrl[]
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
      const possiblePaginationItems = feed.items.filter(
        (item) => new URL(item.enclosure?.url as string).host === legacyHost,
      )

      const feedItems: FeedItem[] = [
        ...nonPaginationItems,
        ...possiblePaginationItems,
      ].map((item) => {
        const videoUrl = new URL(item.enclosure?.url as string)

        if (videoUrl.host === legacyHost) {
          const episodeId = videoUrl.searchParams.get('episodes') as string

          return {
            id: episodeId,
            title: item.title as string,
            url: videoUrl.href,
          }
        } else {
          return {
            id: videoUrl.pathname.split('/').pop(),
            title: item.title as string,
            url: item.enclosure?.url as string,
          }
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

  getEpisodeSources: publicProcedure
    .input(
      z.object({
        episodeId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      if (!Number.isInteger(Number(input.episodeId))) {
        return {
          sources: [
            {
              language: '',
              url: `${env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL}${input.episodeId}`,
            },
          ],
        }
      }

      const episodeSourcesResponses = await axios
        .get<string>(env.DATA_SOURCE_BASE_URL, {
          params: { episodes: input.episodeId, nocache: 1 },
        })
        .then((response) => response.data)

      const sources: EpisodeUrl[] = (
        await new Parser({}).parseString(episodeSourcesResponses)
      ).items.map((item) => {
        const language = item.title?.substring(
          item.title?.lastIndexOf('(') + 1,
          item.title?.length - 1,
        ) as string
        const videoId = item.enclosure?.url
          .split('?title')
          .shift()
          ?.split('/')
          .pop() as string

        return {
          language,
          url: `${env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL}${videoId}`,
        }
      })

      return { sources: sources }
    }),
})
