import { type NextPage } from 'next'
import Link from 'next/link'

import Layout from '~/components/Layout'

const Home: NextPage = () => {
  return (
    <Layout title={'Home'}>
      <nav>
        <ul className='flex h-[calc(100vh-4rem)] flex-col justify-center text-center'>
          <li>
            <Link href={`/shows/hk-variety?page=1`}>HK Variety</Link>
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default Home
