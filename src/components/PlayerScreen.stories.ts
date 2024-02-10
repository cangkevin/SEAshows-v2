import PlayerScreen from './PlayerScreen'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof PlayerScreen> = {
  title: 'Screens/PlayerScreen',
  component: PlayerScreen,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PlayerScreen>

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/Fetching video/i)).toBeInTheDocument()
  },
}

export const WithSingleSource: Story = {
  args: {
    isLoading: false,
    sources: [
      {
        url: `${
          process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
        }randomVideoId`,
        language: '',
      },
    ],
  },
}

export const WithMultipleLanguageSources: Story = {
  args: {
    isLoading: false,
    sources: [
      {
        url: `${
          process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
        }randomVideoId`,
        language: 'Lang1',
      },
      {
        url: `${
          process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
        }randomVideoId2`,
        language: 'Lang2',
      },
    ],
  },
}
