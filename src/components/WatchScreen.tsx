import Layout from './Layout'
import Loader from './Loader'
import VideoPlayer from './VideoPlayer'
import { Spinner } from './ui/spinner'
import { clsx } from 'clsx'
import { type Dispatch, type SetStateAction } from 'react'
import { InView } from 'react-intersection-observer'

import { type EpisodeFeedItem } from '~/utils/types'

type EpisodesScreenProps = {
  title: string
  episodes: EpisodeFeedItem[]
  sources?: { language: string; url: string }[]
  selectedIndex: number
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
  selectedIndex,
  isLoadingShow,
  isLoadingSources,
  isFetchingNextPage,
  fetchNextPage,
  setSelected,
}: EpisodesScreenProps) => {
  return (
    <Layout title={title}>
      {isLoadingShow ? (
        <Loader className='min-h-[calc(100dvh-6rem)]' text='Fetching show' />
      ) : episodes && episodes.length > 0 ? (
        <div className='container mx-auto min-h-[calc(100dvh-6rem)] px-2 lg:px-4'>
          <h2 className='text-2xl'>{title}</h2>
          <div className='grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-6'>
            <div className='aspect-video max-h-[calc(720px)] max-w-[calc(1400px)] xl:col-span-10'>
              {isLoadingSources ? (
                <Loader className='h-full' text='Fetching video sources' />
              ) : sources && sources.length > 0 ? (
                <VideoPlayer
                  url={sources[0]?.url as string}
                  sources={sources}
                />
              ) : (
                <Loader
                  className='h-full'
                  text='Unable to load video sources'
                />
              )}
            </div>
            <div className='h-[calc(50dvh)] overflow-auto rounded-lg border text-center xl:col-span-2 xl:h-[calc(100dvh-8rem)]'>
              {episodes.map((episode, index) =>
                episode.id ? (
                  <EpisodeLink
                    key={`${episode.id}_${index}`}
                    id={`${episode.id}_${index}`}
                    selectedIndex={selectedIndex}
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
        <Loader className='min-h-[calc(100dvh-6rem)]' text='Show not found' />
      )}
    </Layout>
  )
}

type EpisodeLinkProps = {
  id: string
  selectedIndex: number
  title: string
  isPaginationTrigger: boolean
  fetchNextPage: () => void
  onClick: () => void
}

const EpisodeLink = ({
  id,
  selectedIndex,
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
      className={clsx(
        id.endsWith(`_${selectedIndex.toString()}`) && 'bg-neutral-300',
      )}
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
