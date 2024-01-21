import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import { type EpisodeUrl } from '~/server/api/routers/episodes'
import { api } from '~/utils/api'

const Videos: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [url, setUrl] = useState<string>('')
  const [sources, setSources] = useState<EpisodeUrl[]>([])

  const response = api.episodes.getEpisodeSources.useQuery({
    episodeId: id as string,
  })

  // NOTE - https://stackoverflow.com/a/76407090
  // https://devtrium.com/posts/async-functions-useeffect
  useEffect(() => {
    if (response.data) {
      setSources(response.data.sources)
      setUrl(response.data.sources[0]?.url as string)
    }
  }, [response.data])

  return (
    <Layout>
      {response.isLoading ? (
        <Loader text='Fetching video' />
      ) : response.isFetched ? (
        <>
          <Iframe
            key={url} // NOTE to prevent from pushing on the history; https://www.aleksandrhovhannisyan.com/blog/react-iframes-back-navigation-bug/
            url={url}
            height='100%'
            width='100%'
            className='h-[calc(100vh-8rem)]'
          />
          <div className='flex flex-row justify-center space-x-4'>
            {sources.map((source) => (
              <div
                key={source.url.split('/').pop()}
                onClick={() => {
                  setUrl(source.url)
                }}
                className={`cursor-pointer rounded-md px-2 ${
                  url === source.url ? 'bg-blue-400' : 'bg-slate-200'
                }`}
              >
                {source.language}
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader text='Unable to fetch video' />
      )}
    </Layout>
  )
}

export default Videos
