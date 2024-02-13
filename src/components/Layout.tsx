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

      <div className='container mx-auto flex flex-col px-4'>
        <Header categories={categories} />
        <main className='flex-1'>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
