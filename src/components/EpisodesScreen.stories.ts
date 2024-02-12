import EpisodesScreen from './EpisodesScreen'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { type EpisodeFeedItem } from '~/utils/types'

const meta: Meta<typeof EpisodesScreen> = {
  title: 'Screens/EpisodeScreen',
  component: EpisodesScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof EpisodesScreen>

const mockEpisodes: EpisodeFeedItem[] = [...Array(50).keys()].map((i) => {
  return { id: i.toString(), title: `Episode ${i}`, url: '' }
})

export const LoadingEpisodes: Story = {
  args: {
    showId: 1,
    title: 'Show title',
    page: 1,
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/fetching episodes/i)).toBeInTheDocument()
  },
}

export const NoEpisodesLoaded: Story = {
  args: {
    showId: 1,
    title: 'Show title',
    page: 1,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/no episodes found/i)).toBeInTheDocument()
  },
}

export const EpisodesLoaded: Story = {
  args: {
    showId: 1,
    title: 'Show title',
    page: 1,
    isLoading: false,
    episodes: mockEpisodes,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 2 }).textContent,
    ).toContain('Show title - Page 1')
    await expect(
      canvas.getAllByRole('link', { name: /episode/i }),
    ).toHaveLength(mockEpisodes.length)
  },
}

export const EpisodesLoadedWithPagination: Story = {
  args: {
    showId: 1,
    title: 'Show title',
    page: 1,
    isLoading: false,
    episodes: mockEpisodes,
    nextPage: {
      linkText: 'Page 2',
      url: '',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 2 }).textContent,
    ).toContain('Show title - Page 1')
    await expect(
      canvas.getAllByRole('link', { name: /episode/i }),
    ).toHaveLength(mockEpisodes.length)
    await expect(
      canvas.getByRole('link', { name: /page 1/i }),
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole('link', { name: /page 2/i }),
    ).toBeInTheDocument()
  },
}
