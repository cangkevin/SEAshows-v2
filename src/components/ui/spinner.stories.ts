import { Spinner } from './spinner'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Spinner>

export const DefaultSpinner: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('status')).toBeInTheDocument()
  },
}

export const LargeSpinner: Story = {
  args: {
    size: 'lg',
  },
}
