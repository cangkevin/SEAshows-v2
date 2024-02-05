import Footer from './Footer'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByText(
        'This site does not store any files on its server. All contents are provided by non-affiliated third parties.',
      ),
    ).toBeInTheDocument()
  },
}
