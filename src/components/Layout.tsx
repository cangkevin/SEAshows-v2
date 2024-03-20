import Footer from './Footer'
import Header from './Header'
import Head from 'next/head'
import React from 'react'

import { categories } from '~/pages'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header categories={categories} />
      <main className='grid min-h-[calc(100dvh-6rem)]'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
