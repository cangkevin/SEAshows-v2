import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import Iframe from 'react-iframe'

import Layout from '~/components/Layout'
import { env } from '~/env.mjs'

const Videos: NextPage = () => {
  const router = useRouter()

  const { id } = router.query

  const url = `${env.NEXT_PUBLIC_VIDEO_SOURCE_BASE_URL}${id as string}`

  return (
    <Layout>
      <Iframe
        url={url}
        height='100%'
        width='100%'
        className='h-[calc(100vh-4rem)]'
      />
    </Layout>
  )
}

export default Videos
