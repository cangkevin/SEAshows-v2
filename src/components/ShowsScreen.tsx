import Layout from './Layout'
import Loader from './Loader'
import ResourcePagination from './ResourcePagination'
import ShowListing from './ShowListing'

import type { ResourcePaginationLink, ShowFeedItem } from '~/utils/types'

type ShowsScreenProps = {
  title: string
  page: number
  category: string
  shows?: ShowFeedItem[]
  nextPage?: ResourcePaginationLink
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
    <div className='container mx-auto px-2'>
      <h2 className='text-2xl'>{pageTitle}</h2>
      <div className='min-h-[calc(100dvh-6rem)]'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
          {shows.map((show) => (
            <ShowListing
              key={show.id}
              id={show.id}
              name={show.title}
              thumbnailUrl={show.imageUrl}
            />
          ))}
        </div>

        <ResourcePagination
          currentPage={page}
          resourceUri={`/shows/${category}`}
          nextPage={nextPage}
        />
      </div>
    </div>
  ) : (
    <div className='flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center'>
      No shows found
    </div>
  )

  return (
    <Layout title={pageTitle}>
      {isLoading ? (
        <Loader className='min-h-[calc(100dvh-6rem)]' text='Fetching shows' />
      ) : (
        showsElement
      )}
    </Layout>
  )
}

export default ShowsScreen
