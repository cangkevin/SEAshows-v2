import Head from 'next/head'
import Link from 'next/link'

type HomeScreenProps = {
  categories: Record<'key' | 'name', string>[]
}

const HomeScreen = ({ categories }: HomeScreenProps) => {
  return (
    <>
      <Head>
        <title>SEAshows</title>
        <meta name='description' content='SEAshows home page' />
      </Head>

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
    </>
  )
}

export default HomeScreen
