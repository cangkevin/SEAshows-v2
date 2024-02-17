import NavMenu from './NavMenu'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof NavMenu> = {
  component: NavMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavMenu>

export const Default: Story = {
  args: {
    categories: [
      {
        key: 'cat1-key',
        name: 'Category 1',
      },
      {
        key: 'cat2-key',
        name: 'Category 2',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getAllByText(/category/i)).toHaveLength(2)
  },
}
