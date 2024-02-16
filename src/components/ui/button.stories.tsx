import { Button } from './button'
import { type Meta, type StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {},
  render: (args) => {
    return <Button {...args}>Button Text</Button>
  },
}
