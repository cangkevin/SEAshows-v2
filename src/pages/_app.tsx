import { type AppType } from 'next/app'

import Layout from '~/components/Layout'
import { ThemeProvider } from '~/components/ui/theme-provider'
import '~/styles/globals.css'
import { api } from '~/utils/api'

const MyApp: AppType = ({ Component, pageProps }) => {
  // NOTE reference the below links for dark mode implementation
  // https://ui.shadcn.com/docs/dark-mode/next
  // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-pages
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default api.withTRPC(MyApp)
