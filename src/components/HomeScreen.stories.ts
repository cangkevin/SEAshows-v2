import HomeScreen from './HomeScreen'
import { type Meta, type StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof HomeScreen> = {
  title: 'Screens/HomeScreen',
  component: HomeScreen,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HomeScreen>

export const Default: Story = {
  args: {
    categories: [
      { key: 'key1', name: 'Name1' },
      { key: 'key2', name: 'Name2' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getAllByRole('link', { name: /name/i })).toHaveLength(2)
  },
}
