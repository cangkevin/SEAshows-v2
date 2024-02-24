import { Spinner } from './spinner'
import { type Meta, type StoryObj } from '@storybook/react'

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Spinner>

export const DefaultSpinner: Story = {
  args: {},
}

export const LargeSpinner: Story = {
  args: {
    size: 'lg',
  },
}
