import Head from 'next/head'
import React from 'react'

type LayoutProps = {
  title?: string | null
  children: React.ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - SEAshows` : 'SEAshows'}</title>
        <meta name='description' content='SEAshows portal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {children}
    </>
  )
}

export default Layout
