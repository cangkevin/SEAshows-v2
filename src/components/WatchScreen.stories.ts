import WatchScreen from './WatchScreen'
import { type Meta, type StoryObj } from '@storybook/react'

import { type EpisodeFeedItem } from '~/utils/types'

const meta: Meta<typeof WatchScreen> = {
  title: 'Screens/WatchScreen',
  component: WatchScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof WatchScreen>

const mockEpisodes: EpisodeFeedItem[] = [...Array(50).keys()].map((i) => {
  return { id: i.toString(), title: `Episode ${i}`, url: '' }
})
const mockSources = [
  {
    language: '',
    url: `${
      process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
    }randomVideoId`,
  },
]

export const FetchingShow: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: true,
  },
}

export const NoShowFetched: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    episodes: [],
  },
}

export const LoadingSources: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    isLoadingSources: true,
    episodes: mockEpisodes,
  },
}

export const UnableToLoadSources: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    isLoadingSources: false,
    episodes: mockEpisodes,
    sources: undefined,
  },
}

export const ShowEpisodesFetched: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    isLoadingSources: false,
    episodes: mockEpisodes.slice(0, 10),
    sources: mockSources,
  },
}

export const ShowEpisodesFetchedWithOverflow: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    isLoadingSources: false,
    episodes: mockEpisodes,
    sources: mockSources,
  },
}

export const FetchingMoreEpisodes: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    isLoadingSources: false,
    episodes: mockEpisodes,
    sources: mockSources,
    isFetchingNextPage: true,
  },
}

export const WithMultipleVideoSources: Story = {
  args: {
    title: 'Show name',
    selectedIndex: 0,
    isLoadingShow: false,
    isLoadingSources: false,
    episodes: mockEpisodes,
    isFetchingNextPage: true,
    sources: [
      {
        language: 'Lang1',
        url: `${
          process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
        }randomVideoId1`,
      },
      {
        language: 'Lang2',
        url: `${
          process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
        }randomVideoId2`,
      },
    ],
  },
}
