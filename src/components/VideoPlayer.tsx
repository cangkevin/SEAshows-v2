import { AspectRatio } from './ui/aspect-ratio'
import { Button } from './ui/button'
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
      <AspectRatio ratio={16 / 9}>
        <Iframe
          key={videoUrl} // NOTE to prevent from pushing on the history; https://www.aleksandrhovhannisyan.com/blog/react-iframes-back-navigation-bug/
          url={videoUrl}
          height='99.7%'
          width='100%'
          className='md:rounded-2xl'
        />
      </AspectRatio>

      {sources.length > 1 && (
        <div className='flex h-8 flex-row justify-center'>
          {sources.map((source) => (
            <Button
              key={source.url.split('/').pop()}
              onClick={() => {
                setVideoUrl(source.url)
              }}
              className='h-8'
              variant={videoUrl === source.url ? 'default' : 'secondary'}
            >
              {source.language}
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

export default VideoPlayer
