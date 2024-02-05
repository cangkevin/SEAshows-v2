import ShowListing from './ShowListing'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ShowListing> = {
  component: ShowListing,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    name: 'Show Name',
    thumbnailUrl: '',
  },
}
