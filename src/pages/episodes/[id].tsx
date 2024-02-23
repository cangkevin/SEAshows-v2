import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import EpisodesScreen from '~/components/EpisodesScreen'
import { api } from '~/utils/api'

const Episodes: NextPage = () => {
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
  const title = fetchedData[0]?.title || ''

  return (
    <EpisodesScreen
      title={title}
      episodes={episodes}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      // NOTE adding "void" since we don't use the return value - https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-3950935
      // also adding isFetching check as recommended practice - https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
      fetchNextPage={() => !isFetching && void fetchNextPage()}
    />
  )
}

export default Episodes
