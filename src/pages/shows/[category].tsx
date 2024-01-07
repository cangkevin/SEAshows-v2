import { categories } from '..'
import { type NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import Pagination from '~/components/Pagination'
import { api } from '~/utils/api'

const Shows: NextPage = () => {
  const router = useRouter()

  const category = router.query.category as string
  const page = parseInt(router.query.page as string) || 1

  const shows = api.shows.getShows.useQuery({ category, page })
  const categoryName = categories.find(
    (showCategory) => showCategory.key === category,
  )?.name as string
  const pageTitle = `${categoryName} - Page ${page}`

  const showsElement = shows.data?.shows ? (
    <>
      <div className='grid grid-cols-4 gap-9'>
        {shows.data.shows.map((show) => (
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
        nextPage={shows.data?.nextPage}
      />
    </>
  ) : (
    <Loader text='No shows found' />
  )

  return (
    <Layout title={pageTitle}>
      <h2 className='text-2xl'>{pageTitle}</h2>

      {shows.isLoading ? (
        <Loader text='Fetching shows' />
      ) : shows.isFetched ? (
        showsElement
      ) : null}
    </Layout>
  )
}

export default Shows
