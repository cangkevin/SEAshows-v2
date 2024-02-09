import { categories } from '..'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import ShowsScreen from '~/components/ShowsScreen'
import { api } from '~/utils/api'

const Shows: NextPage = () => {
  const router = useRouter()

  const category = router.query.category as string
  const page = parseInt(router.query.page as string) || 1

  const shows = api.shows.getShows.useQuery({ category, page })
  const categoryName = categories.find(
    (showCategory) => showCategory.key === category,
  )?.name as string
  const data = shows.data

  return (
    <ShowsScreen
      title={categoryName}
      page={page}
      category={category}
      shows={data?.shows}
      nextPage={data?.nextPage}
      isLoading={shows.isLoading}
    />
  )
}

export default Shows
