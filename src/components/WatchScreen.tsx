import Loader from './Loader'
import VideoPlayer from './VideoPlayer'
import { ScrollArea } from './ui/scroll-area'
import { Spinner } from './ui/spinner'
import { clsx } from 'clsx'
import Head from 'next/head'
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
    <>
      <Head>
        <title>{title.length > 0 ? `${title} - SEAshows` : 'SEAshows'}</title>
        <meta name='description' content={title} />
      </Head>

      {isLoadingShow ? (
        <Loader text='Fetching show' />
      ) : episodes && episodes.length > 0 ? (
        <div className='container mx-auto px-6'>
          <h2 className='text-2xl'>{title}</h2>
          <div className='grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-6'>
            <div className='aspect-video max-h-[calc(720px)] max-w-[calc(1280px)] xl:col-span-10'>
              {isLoadingSources ? (
                <Loader className='h-full' text='Fetching video sources' />
              ) : sources && sources.length > 0 ? (
                <VideoPlayer
                  url={sources[0]?.url as string}
                  sources={sources}
                />
              ) : (
                <div className='flex h-full flex-col items-center justify-center'>
                  Unable to load video sources
                </div>
              )}
            </div>
            <ScrollArea className='h-[calc(50dvh)] rounded-lg border text-center xl:col-span-2 xl:h-[calc(100dvh-8rem)]'>
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
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>Show not found</div>
      )}
    </>
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
        'rounded-md hover:bg-muted',
        id.endsWith(`_${selectedIndex.toString()}`) && 'bg-muted-foreground',
      )}
      onClick={onClick}
      onChange={
        Comp === 'div' ? undefined : (inView) => inView && fetchNextPage()
      }
    >
      <span className='cursor-pointer text-xl'>{title}</span>
    </Comp>
  )
}

export default WatchScreen
