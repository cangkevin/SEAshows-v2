import VideoPlayer from './VideoPlayer'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof VideoPlayer> = {
  component: VideoPlayer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof VideoPlayer>

export const WithSingleSource: Story = {
  args: {
    url: `${
      process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
    }randomVideoId`,
  },
}

export const WithMultipleSources: Story = {
  args: {
    url: `${
      process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
    }randomVideoId`,
    sources: [
      {
        url: `${
          process.env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL as string
        }randomVideoId`,
        language: 'Lang1',
      },
      { url: '', language: 'Lang2' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getAllByText(/Lang/i)).toHaveLength(2)
  },
}
