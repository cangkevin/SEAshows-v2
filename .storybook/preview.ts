// NOTE - https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/getting-started/tailwind.md
// https://storybook.js.org/recipes/tailwindcss#2-provide-tailwind-to-stories
import '../src/styles/globals.css'
import { withThemeByClassName } from '@storybook/addon-themes'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import { Preview, ReactRenderer } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      // NOTE - https://storybook.js.org/docs/essentials/viewport#use-a-detailed-set-of-devices
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
