import Footer from './Footer'
import Header from './Header'
import Head from 'next/head'
import React from 'react'

import { categories } from '~/pages'

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

      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
