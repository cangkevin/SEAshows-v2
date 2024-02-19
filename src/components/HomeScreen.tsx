import Layout from './Layout'
import Link from 'next/link'

type HomeScreenProps = {
  categories: Record<'key' | 'name', string>[]
}

const HomeScreen = ({ categories }: HomeScreenProps) => {
  return (
    <Layout title={'Home'}>
      <nav className='flex min-h-[calc(100dvh-6rem)] flex-col justify-center text-center'>
        <ul>
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

export default HomeScreen
