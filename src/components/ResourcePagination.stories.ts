import ResourcePagination from './ResourcePagination'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof ResourcePagination> = {
  component: ResourcePagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const OnFirstPage: Story = {
  args: {
    currentPage: 1,
    nextPage: {
      linkText: 'Page 2',
      url: '',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('link', { name: /1/i })).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: /2/i })).toBeInTheDocument()
    await expect(
      canvas.getByRole('link', { name: /next/i }),
    ).toBeInTheDocument()
  },
}

export const OnSecondOrLargerPage: Story = {
  args: {
    ...OnFirstPage.args,
    currentPage: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: /previous/i }),
    ).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: /1/i })).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: /2/i })).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: /3/i })).toBeInTheDocument()
    await expect(
      canvas.getByRole('link', { name: /next/i }),
    ).toBeInTheDocument()
  },
}

export const NoNextPaginationLink: Story = {
  args: {
    currentPage: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: /previous/i }),
    ).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: /1/i })).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: /2/i })).toBeInTheDocument()
  },
}
