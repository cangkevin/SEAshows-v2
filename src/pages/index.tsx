import { type NextPage } from 'next'
import Link from 'next/link'

import Layout from '~/components/Layout'

export const categories = [
  { key: 'hk-drama', name: 'HK Drama' },
  { key: 'hk-variety', name: 'HK Variety' },
]

const Home: NextPage = () => {
  return (
    <Layout title={'Home'}>
      <nav>
        <ul className='flex h-[calc(100vh-4rem)] flex-col justify-center text-center'>
          {categories.map((category) => (
            <li key={category.key}>
              <Link href={`/shows/${category.key}?page=1`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Layout>
  )
}

export default Home
