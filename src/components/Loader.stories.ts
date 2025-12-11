import Loader from './Loader'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof Loader> = {
  component: Loader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Input text',
  },
}
