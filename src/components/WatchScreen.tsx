import Layout from './Layout'
import Loader from './Loader'
import VideoPlayer from './VideoPlayer'
import { Spinner } from './ui/spinner'
import { type Dispatch, type SetStateAction } from 'react'
import { InView } from 'react-intersection-observer'

import { type EpisodeFeedItem } from '~/utils/types'

type EpisodesScreenProps = {
  title: string
  episodes: EpisodeFeedItem[]
  sources?: { language: string; url: string }[]
  isLoadingShow: boolean
  isLoadingSources: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  setSelected: Dispatch<SetStateAction<number>>
}

const WatchScreen = ({
  title,
  episodes,
  sources,
  isLoadingShow,
  isLoadingSources,
  isFetchingNextPage,
  fetchNextPage,
  setSelected,
}: EpisodesScreenProps) => {
  return (
    <Layout title={title}>
      {isLoadingShow ? (
        <Loader text='Fetching show' />
      ) : episodes && episodes.length > 0 ? (
        <div className='container mx-auto px-6'>
          <h2 className='text-2xl'>{title}</h2>
          <div className='grid min-h-[calc(100dvh-8rem)] grid-cols-1 justify-start gap-4 md:grid-cols-12 md:gap-6'>
            <div className='max-h-[calc(720px)] max-w-[calc(1400px)] md:col-span-10'>
              {isLoadingSources ? (
                <Loader text='Fetching video sources' />
              ) : sources && sources.length > 0 ? (
                <VideoPlayer
                  url={sources[0]?.url as string}
                  sources={sources}
                />
              ) : (
                <Loader text='Unable to load video sources' />
              )}
            </div>
            <div className='max-h-[calc(50dvh)] overflow-auto rounded-lg border text-center md:col-span-2 md:max-h-[calc(100dvh-8rem)]'>
              {episodes.map((episode, index) =>
                episode.id ? (
                  <EpisodeLink
                    key={`${episode.id}_${index}`}
                    id={episode.id}
                    title={episode.title}
                    isPaginationTrigger={index + 1 === episodes.length}
                    fetchNextPage={fetchNextPage}
                    onClick={() => setSelected(index)}
                  />
                ) : null,
              )}
              {isFetchingNextPage && (
                <Spinner className='flex items-center justify-center' />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader text='Show not found' />
      )}
    </Layout>
  )
}

type EpisodeLinkProps = {
  id: string
  title: string
  isPaginationTrigger: boolean
  fetchNextPage: () => void
  onClick: () => void
}

const EpisodeLink = ({
  id,
  title,
  isPaginationTrigger,
  fetchNextPage,
  onClick,
}: EpisodeLinkProps) => {
  // NOTE conditional rendering of components - https://stackoverflow.com/q/57945969
  const Comp = isPaginationTrigger ? InView : 'div'
  return (
    <Comp
      key={id}
      onClick={onClick}
      onChange={
        Comp === 'div' ? undefined : (inView) => inView && fetchNextPage()
      }
    >
      <span className='cursor-pointer text-xl hover:text-blue-700'>
        {title}
      </span>
    </Comp>
  )
}

export default WatchScreen
