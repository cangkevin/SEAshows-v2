import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import { api } from '~/utils/api'

const Shows: NextPage = () => {
  const router = useRouter()

  const category = router.query.category as string
  const page = parseInt(router.query.page as string) || 1

  const shows = api.shows.getShows.useQuery({ category, page })
  const pageTitle = `${category} - Page ${page}`

  return (
    <Layout title={pageTitle}>
      <main className='container mx-auto'>
        <header>
          <h1 className='text-4xl'>{pageTitle}</h1>
        </header>

        {shows.isLoading ? (
          <Loader text='Fetching shows' />
        ) : shows.isFetched ? (
          shows.data?.shows ? (
            <>
              <div className='grid grid-cols-4 gap-9 pb-4 pt-4'>
                {shows.data.shows.map((show) => (
                  <div key={show.id}>
                    <div className='justify-center'>
                      <Link
                        className='relative flex h-24 border-4'
                        href={`/episodes/${show.id}`}
                      >
                        <Image src={show.imageUrl} alt='' fill />
                      </Link>
                    </div>
                    <div className='flex justify-center text-xl'>
                      <Link
                        href={`/episodes/${show.id}`}
                        className='hover:text-blue-700'
                      >
                        {show.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <footer>
                <nav className='flex justify-center'>
                  <ul className='inline-flex -space-x-px'>
                    {page > 1 && (
                      <li>
                        <Link
                          className='ml-0 rounded-l-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                          href={`/shows/${category}?page=${page - 1}`}
                        >
                          Page {page - 1}
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        className='ml-0 border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                        href={`/shows/${category}?page=${page}`}
                      >
                        Page {page}
                      </Link>
                    </li>
                    {shows.isFetched &&
                      (shows.data?.nextPage ? (
                        <li>
                          <Link
                            className='ml-0 rounded-r-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                            href={`/shows/${category}?page=${page + 1}`}
                          >
                            Page {page + 1}
                          </Link>
                        </li>
                      ) : null)}
                  </ul>
                </nav>
              </footer>
            </>
          ) : (
            <Loader text='No shows found' />
          )
        ) : null}
      </main>
    </Layout>
  )
}

export default Shows