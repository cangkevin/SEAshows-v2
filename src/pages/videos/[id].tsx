import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import PlayerScreen from '~/components/PlayerScreen'
import { api } from '~/utils/api'

const Videos: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const response = api.episodes.getEpisodeSources.useQuery({
    episodeId: id as string,
  })
  const sources = response.data?.sources

  return <PlayerScreen sources={sources} isLoading={response.isLoading} />
}

export default Videos
