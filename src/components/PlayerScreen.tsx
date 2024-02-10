import Layout from './Layout'
import Loader from './Loader'
import VideoPlayer from './VideoPlayer'

import { type EpisodeUrl } from '~/utils/types'

type PlayerScreenProps = {
  sources?: EpisodeUrl[]
  isLoading: boolean
}

const PlayerScreen = ({ sources, isLoading }: PlayerScreenProps) => {
  return (
    <Layout>
      {isLoading ? (
        <Loader text='Fetching video' />
      ) : sources && sources.length >= 1 ? (
        <VideoPlayer url={sources[0]?.url as string} sources={sources} />
      ) : (
        <Loader text='Unable to fetch video sources' />
      )}
    </Layout>
  )
}

export default PlayerScreen
