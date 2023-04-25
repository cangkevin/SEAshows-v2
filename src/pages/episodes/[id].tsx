import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { api } from '~/utils/api'

const Episodes: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  const showId = parseInt(id as string)
  const page = parseInt(router.query.page as string) || 1

  const episodes = api.episodes.getEpisodes.useQuery({ showId, page })

  return (
    <>
      <Head>
        <title>SEAshows</title>
        <meta name='description' content='SEAshows portal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto'>
        <header className='text-4xl'>
          {episodes.data ? episodes.data.title + ` - Page ${page}` : null}
        </header>

        {episodes.isLoading ? (
          <div className='container mx-auto'>
            <div className='absolute left-2/4 top-2/4'>Fetching episodes</div>
          </div>
        ) : null}

        {episodes.isFetched ? (
          episodes.data?.episodes ? (
            <div style={{ minHeight: episodes.data.nextPage ? '100vh' : '' }}>
              <div className='grid grid-cols-1 pb-4 text-center'>
                {episodes.data.episodes.map((episode, index) =>
                  episode.id ? (
                    <div key={`${episode.id}_${index}`}>
                      <Link
                        className='text-xl hover:text-blue-700'
                        href={`/videos/${episode.id}`}
                      >
                        {episode.title}
                      </Link>
                    </div>
                  ) : null,
                )}
              </div>

              {episodes.data.nextPage ? (
                <footer className='sticky top-[100vh]'>
                  <nav className='flex justify-center'>
                    <ul className='inline-flex -space-x-px'>
                      {page > 1 && (
                        <li>
                          <Link
                            className='ml-0 rounded-l-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                            href={`/episodes/${showId}?page=${page - 1}`}
                          >
                            Page {page - 1}
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          className='ml-0 border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                          href={`/episodes/${showId}?page=${page}`}
                        >
                          Page {page}
                        </Link>
                      </li>
                      {episodes.isFetched &&
                        (episodes.data?.nextPage ? (
                          <li>
                            <Link
                              className='ml-0 rounded-r-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                              href={`/episodes/${showId}?page=${page + 1}`}
                            >
                              Page {page + 1}
                            </Link>
                          </li>
                        ) : null)}
                    </ul>
                  </nav>
                </footer>
              ) : null}
            </div>
          ) : (
            <div className='container mx-auto' hidden={episodes.isLoading}>
              <div className='absolute left-2/4 top-2/4'>No episodes found</div>
            </div>
          )
        ) : null}
      </main>
    </>
  )
}

export default Episodes
