import { type NextPage } from 'next'

import HomeScreen from '~/components/HomeScreen'

export const categories = [
  { key: 'hk-drama', name: 'HK Drama' },
  { key: 'hk-variety', name: 'HK Variety' },
  { key: 'korean-drama-englishsubtitles', name: 'KR Drama' },
]

const Home: NextPage = () => {
  return <HomeScreen categories={categories} />
}

export default Home
