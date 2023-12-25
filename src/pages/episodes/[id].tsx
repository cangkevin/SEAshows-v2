import { type NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import Pagination from '~/components/Pagination'
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
      {episodes.data ? (
        <h2 className='text-2xl'>
          {episodes.data.title} - Page {page}
        </h2>
      ) : null}

      {episodes.isLoading ? <Loader text='Fetching episodes' /> : null}

      {episodes.isFetched ? (
        episodes.data?.episodes ? (
          <>
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
              <Pagination
                currentPage={page}
                resourceUri={`/episodes/${showId}`}
                nextPage={episodes.data?.nextPage}
              />
            ) : null}
          </>
        ) : (
          <Loader text='No episodes found' />
        )
      ) : null}
    </Layout>
  )
}

export default Episodes
