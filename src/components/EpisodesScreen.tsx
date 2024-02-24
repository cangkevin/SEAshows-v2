import Layout from './Layout'
import Loader from './Loader'
import { Spinner } from './ui/spinner'
import Link from 'next/link'
import { InView } from 'react-intersection-observer'

import type { EpisodeFeedItem } from '~/utils/types'

type EpisodeLinkProps = {
  id: string
  title: string
  isPaginationTrigger: boolean
  fetchNextPage: () => void
}

const EpisodeLink = ({
  id,
  title,
  isPaginationTrigger,
  fetchNextPage,
}: EpisodeLinkProps) => {
  // NOTE conditional rendering of components - https://stackoverflow.com/q/57945969
  const Comp = isPaginationTrigger ? InView : 'div'
  return (
    <Comp
      key={id}
      onChange={
        Comp === 'div' ? undefined : (inView) => inView && fetchNextPage()
      }
    >
      <Link className='text-xl hover:text-blue-700' href={`/videos/${id}`}>
        {title}
      </Link>
    </Comp>
  )
}

type EpisodesScreenProps = {
  title: string
  episodes?: EpisodeFeedItem[]
  isLoading: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

const EpisodesScreen = ({
  title,
  episodes,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
}: EpisodesScreenProps) => {
  const pageTitle = `${title} episodes`

  const episodesElement = episodes ? (
    <>
      <h2 className='text-2xl'>{pageTitle}</h2>
      <div className='min-h-[calc(100dvh-8rem)]'>
        <div className='grid grid-cols-1 gap-1 text-center'>
          {episodes.map((episode, index) =>
            episode.id ? (
              <EpisodeLink
                key={`${episode.id}_${index}`}
                id={episode.id}
                title={episode.title}
                isPaginationTrigger={index + 1 === episodes.length}
                fetchNextPage={fetchNextPage}
              />
            ) : null,
          )}
          {isFetchingNextPage && <Spinner className='flex justify-center items-center' />}
        </div>
      </div>
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
