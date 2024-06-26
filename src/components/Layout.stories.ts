import Layout from './Layout'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { categories } from '~/pages'

const meta: Meta<typeof Layout> = {
  component: Layout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { name: /SEAshows/i }),
    ).toBeInTheDocument()
    await expect(canvas.getByRole('list')).toBeInTheDocument()
    await expect(canvas.getAllByRole('link')).toHaveLength(
      categories.length + 1,
    )
    await expect(
      canvas.getByText(/this site does not store any files on its server/i),
    ).toBeInTheDocument()
  },
}
