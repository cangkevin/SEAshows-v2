import Header from './Header'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    categories: [
      { key: 'category1', name: 'Category Name' },
      { key: 'category2', name: 'Category2 Name' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const header = canvas.getByRole('heading', { name: /SEAshows/i })
    await expect(header).toBeInTheDocument()

    const categories = canvas.getByRole('list')
    await expect(categories).toBeInTheDocument()

    await expect(canvas.getAllByRole('link')).toHaveLength(3)
  },
}
