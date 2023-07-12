import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import { api } from '~/utils/api'

const Episodes: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  const showId = parseInt(id as string)
  const page = parseInt(router.query.page as string) || 1

  const episodes = api.episodes.getEpisodes.useQuery({ showId, page })
  const pageTitle = episodes.data
    ? episodes.data.title + ` - Page ${page}`
    : null

  return (
    <Layout title={pageTitle}>
      <main>
        <header>
          <div className='container mx-auto'>
            {episodes.data ? (
              <div>
                <h1 className='text-4xl'>
                  {episodes.data.title} - Page {page}
                </h1>
              </div>
            ) : null}
          </div>
        </header>

        {episodes.isLoading ? <Loader text='Fetching episodes' /> : null}

        {episodes.isFetched ? (
          episodes.data?.episodes ? (
            <>
              <div
                style={{ minHeight: episodes.data.nextPage ? '100vh' : '95vh' }}
              >
                <div className='container mx-auto'>
                  <div className='grid grid-cols-1 gap-1 text-center'>
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
                    <div>
                      <nav>
                        <div className='mb-4 mt-4 flex justify-center'>
                          {page > 1 && (
                            <div>
                              <Link
                                className='ml-0 rounded-l-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                                href={`/episodes/${showId}?page=${page - 1}`}
                              >
                                Page {page - 1}
                              </Link>
                            </div>
                          )}
                          <div>
                            <Link
                              className='ml-0 border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                              href={`/episodes/${showId}?page=${page}`}
                            >
                              Page {page}
                            </Link>
                          </div>
                          {episodes.isFetched &&
                            (episodes.data?.nextPage ? (
                              <div>
                                <Link
                                  className='ml-0 rounded-r-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
                                  href={`/episodes/${showId}?page=${page + 1}`}
                                >
                                  Page {page + 1}
                                </Link>
                              </div>
                            ) : null)}
                        </div>
                      </nav>
                    </div>
                  ) : null}
                </div>
              </div>

              <footer>
                <div className='container mx-auto'>
                  <div>
                    This site does not store any files on its server. All
                    contents are provided by non-affiliated third parties.
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <Loader text='No episodes found' />
          )
        ) : null}
      </main>
    </Layout>
  )
}

export default Episodes
