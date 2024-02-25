import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import WatchScreen from '~/components/WatchScreen'
import { api } from '~/utils/api'

const Watch: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  const showId = parseInt(id as string)

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
    api.episodes.getEpisodes.useInfiniteQuery(
      { showId },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialCursor: 1,
      },
    )
  const fetchedData = data?.pages.flat() || []
  const episodes = fetchedData.flatMap((page) => page.episodes)

  const [selected, setSelected] = useState(0)
  const { data: sourcesData, isLoading: isLoadingSources } =
    api.episodes.getEpisodeSources.useQuery(
      { episodeId: episodes[selected]?.id as string },
      { enabled: episodes && episodes.length > 0 },
    )
  const sources = sourcesData?.sources
  const title = fetchedData[0]?.title || ''

  return (
    <WatchScreen
      title={title}
      episodes={episodes}
      sources={sources}
      isLoadingShow={isLoading}
      isLoadingSources={isLoadingSources}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={() => !isFetching && void fetchNextPage()}
      setSelected={setSelected}
    />
  )
}

export default Watch
