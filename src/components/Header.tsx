import NavMenu from './NavMenu'
import Link from 'next/link'

type HeaderProps = {
  categories: Record<'key' | 'name', string>[]
}

const Header = ({ categories }: HeaderProps) => {
  return (
    <header className='sticky left-0 top-0 z-50 h-16 bg-white px-6 text-2xl'>
      <h1>
        <Link href='/'>SEAshows</Link>
      </h1>
      <NavMenu categories={categories} />
    </header>
  )
}

export default Header
