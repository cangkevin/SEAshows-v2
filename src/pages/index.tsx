import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SEAshows</title>
        <meta name='description' content='SEAshows portal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
          <Link href={`/shows/hk-variety?page=1`}>HK Variety</Link>
        </div>
      </main>
    </>
  )
}

export default Home
