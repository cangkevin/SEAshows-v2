import Pagination from './Pagination'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  component: Pagination,
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
}

export const OnSecondOrLargerPage: Story = {
  args: {
    ...OnFirstPage.args,
    currentPage: 2,
  },
}

export const NoNextPaginationLink: Story = {
  args: {
    currentPage: 1,
  },
}
