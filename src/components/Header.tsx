import Link from 'next/link'

import { categories } from '~/pages'

const Header = () => {
  return (
    <header className='sticky left-0 top-0 z-50 h-16 w-full bg-white text-2xl'>
      <h1>
        <Link href='/'>SEAshows</Link>
      </h1>
      <nav>
        <ul className='flex flex-row space-x-4 text-base'>
          {categories.map((category) => (
            <li key={category.key}>
              <Link href={`/shows/${category.key}?page=1`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
