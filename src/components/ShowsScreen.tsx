import Layout from './Layout'
import Loader from './Loader'
import Pagination from './Pagination'
import Image from 'next/image'
import Link from 'next/link'

import type { ShowFeedItem, PaginationLink } from '~/utils/types'

type ShowsScreenProps = {
  title: string
  page: number
  category: string
  shows?: ShowFeedItem[]
  nextPage?: PaginationLink
  isLoading: boolean
}

const ShowsScreen = ({
  title,
  page,
  category,
  shows,
  nextPage,
  isLoading,
}: ShowsScreenProps) => {
  const pageTitle = `${title} - Page ${page}`

  const showsElement = shows ? (
    <>
      <h2 className='text-2xl'>{pageTitle}</h2>
      <div className='min-h-[calc(100vh-6rem)]'>
        <div className='grid grid-cols-4 gap-9'>
          {shows.map((show) => (
            <div key={show.id} className='flex flex-col'>
              <Link
                className='relative h-24 border-4'
                href={`/episodes/${show.id}`}
              >
                <Image src={show.imageUrl} alt='' fill />
              </Link>
              <div className='text-center text-xl'>
                <Link
                  href={`/episodes/${show.id}`}
                  className='hover:text-blue-700'
                >
                  {show.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={page}
          resourceUri={`/shows/${category}`}
          nextPage={nextPage}
        />
      </div>
    </>
  ) : (
    <Loader text='No shows found' />
  )

  return (
    <Layout title={pageTitle}>
      {isLoading ? <Loader text='Fetching shows' /> : showsElement}
    </Layout>
  )
}

export default ShowsScreen
