import { useEffect, useState } from 'react'
import Iframe from 'react-iframe'

import { type EpisodeUrl } from '~/utils/types'

type VideoPlayerProps = {
  url: string
  sources?: EpisodeUrl[]
}

const VideoPlayer = ({ url, sources = [] }: VideoPlayerProps) => {
  const [videoUrl, setVideoUrl] = useState<string>('')

  // NOTE - https://stackoverflow.com/a/76407090
  // https://devtrium.com/posts/async-functions-useeffect
  useEffect(() => {
    setVideoUrl(url)
  }, [url])

  return (
    <>
      <Iframe
        key={videoUrl} // NOTE to prevent from pushing on the history; https://www.aleksandrhovhannisyan.com/blog/react-iframes-back-navigation-bug/
        url={videoUrl}
        height='100%'
        width='100%'
        className='h-[calc(100vh-8rem)]'
      />
      <div className='flex h-8 flex-row justify-center space-x-4'>
        {sources.length > 1
          ? sources.map((source) => (
              <div
                key={source.url.split('/').pop()}
                onClick={() => {
                  setVideoUrl(source.url)
                }}
                className={`cursor-pointer rounded-md px-2 text-center leading-8 ${
                  videoUrl === source.url ? 'bg-blue-400' : 'bg-slate-200'
                }`}
              >
                {source.language}
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export default VideoPlayer
