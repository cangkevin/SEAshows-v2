import Layout from './Layout'
import Loader from './Loader'
import Pagination from './Pagination'
import ShowListing from './ShowListing'

import type { PaginationLink, ShowFeedItem } from '~/utils/types'

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
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5'>
          {shows.map((show) => (
            <ShowListing
              key={show.id}
              id={show.id}
              name={show.title}
              thumbnailUrl={show.imageUrl}
            />
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
