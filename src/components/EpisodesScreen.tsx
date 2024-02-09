import Layout from './Layout'
import Loader from './Loader'
import Pagination from './Pagination'
import Link from 'next/link'

import type { EpisodeFeedItem, PaginationLink } from '~/utils/types'

type EpisodesScreenProps = {
  showId: number
  title: string
  page: number
  episodes?: EpisodeFeedItem[]
  nextPage?: PaginationLink
  isLoading: boolean
}

const EpisodesScreen = ({
  showId,
  title,
  page,
  episodes,
  nextPage,
  isLoading,
}: EpisodesScreenProps) => {
  const pageTitle = `${title} - Page ${page}`

  const episodesElement = episodes ? (
    <>
      <h2 className='text-2xl'>{pageTitle}</h2>
      <div className='min-h-[calc(100vh-8rem)]'>
        <div className='grid grid-cols-1 gap-1 text-center'>
          {episodes.map((episode, index) =>
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
      </div>

      {nextPage ? (
        <Pagination
          currentPage={page}
          resourceUri={`/episodes/${showId}`}
          nextPage={nextPage}
        />
      ) : null}
    </>
  ) : (
    <Loader text='No episodes found' />
  )

  return (
    <Layout title={pageTitle}>
      {isLoading ? <Loader text='Fetching episodes' /> : episodesElement}
    </Layout>
  )
}

export default EpisodesScreen
