import { type NextPage } from 'next'
import Link from 'next/link'

import Layout from '~/components/Layout'

const Home: NextPage = () => {
  return (
    <Layout title={'Home'}>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
          <Link href={`/shows/hk-variety?page=1`}>HK Variety</Link>
        </div>
      </main>
    </Layout>
  )
}

export default Home
