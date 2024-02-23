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
    title: 'Show title',
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/fetching episodes/i)).toBeInTheDocument()
  },
}

export const NoEpisodesLoaded: Story = {
  args: {
    title: 'Show title',
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/no episodes found/i)).toBeInTheDocument()
  },
}

export const EpisodesLoaded: Story = {
  args: {
    title: 'Show title',
    isLoading: false,
    episodes: mockEpisodes,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 2 }).textContent,
    ).toContain('Show title episodes')
    await expect(
      canvas.getAllByRole('link', { name: /episode/i }),
    ).toHaveLength(mockEpisodes.length)
  },
}

export const LoadingMoreEpisodes: Story = {
  args: {
    title: 'Show title',
    isLoading: false,
    episodes: mockEpisodes.slice(0, 10),
    isFetchingNextPage: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 2 }).textContent,
    ).toContain('Show title episodes')
    await expect(
      canvas.getAllByRole('link', { name: /episode/i }),
    ).toHaveLength(10)
    await expect(
      canvas.getByRole('img', { name: 'Loading' }),
    ).toBeInTheDocument()
  },
}
