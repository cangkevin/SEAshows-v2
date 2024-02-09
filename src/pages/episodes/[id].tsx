import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import EpisodesScreen from '~/components/EpisodesScreen'
import { api } from '~/utils/api'

const Episodes: NextPage = () => {
  const router = useRouter()

  const { id } = router.query
  const showId = parseInt(id as string)
  const page = parseInt(router.query.page as string) || 1

  const episodes = api.episodes.getEpisodes.useQuery({ showId, page })
  const data = episodes.data

  return (
    <EpisodesScreen
      showId={showId}
      title={data?.title as string}
      episodes={data?.episodes}
      nextPage={data?.nextPage}
      page={page}
      isLoading={episodes.isLoading}
    />
  )
}

export default Episodes
