import ShowsScreen from './ShowsScreen'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof ShowsScreen> = {
  title: 'Screens/ShowsScreen',
  component: ShowsScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ShowsScreen>

const mockShows = [...Array(50).keys()].map((i) => {
  return { id: i, title: `title ${i}`, url: '', imageUrl: '' }
})

export const LoadingShows: Story = {
  args: {
    title: 'Title',
    page: 1,
    category: 'Category',
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/fetching shows/i)).toBeInTheDocument()
  },
}

export const NoShowsLoaded: Story = {
  args: {
    title: 'Title',
    page: 1,
    category: 'Category',
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(/no shows found/i)).toBeInTheDocument()
  },
}

export const ShowsLoaded: Story = {
  args: {
    title: 'Title',
    page: 1,
    category: 'Category',
    shows: mockShows,
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 2 }).textContent,
    ).toContain('Title - Page 1')
    await expect(canvas.getAllByRole('img')).toHaveLength(mockShows.length)
    await expect(canvas.getAllByRole('link', { name: /title/i })).toHaveLength(
      mockShows.length,
    )
    await expect(
      canvas.getByRole('link', { name: /page 1/i }),
    ).toBeInTheDocument()
  },
}

export const ShowsLoadedWithPaginationLink: Story = {
  args: {
    title: 'Title',
    page: 1,
    category: 'Category',
    shows: mockShows,
    nextPage: {
      linkText: 'Page 2',
      url: '',
    },
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 2 }).textContent,
    ).toContain(`Title - Page 1`)
    await expect(canvas.getAllByRole('img')).toHaveLength(50)
    await expect(canvas.getAllByRole('link', { name: /title/i })).toHaveLength(
      50,
    )
    await expect(
      canvas.getByRole('link', { name: /page 1/i }),
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole('link', { name: /page 2/i }),
    ).toBeInTheDocument()
  },
}
