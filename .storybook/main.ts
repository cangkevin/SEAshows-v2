import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-themes',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
}
export default config
