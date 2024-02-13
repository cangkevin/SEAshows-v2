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

export const ClampedText: Story = {
  args: {
    id: 1,
    name: 'this is a super long string intended to generate a clamp',
    thumbnailUrl: '',
  },
  decorators: (Story) => (
    <div className='w-48'>
      <Story />
    </div>
  ),
}
