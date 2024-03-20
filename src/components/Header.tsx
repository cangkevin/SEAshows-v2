import NavMenu from './NavMenu'
import ThemeSwitch from './ui/theme-switch'
import Link from 'next/link'

type HeaderProps = {
  categories: Record<'key' | 'name', string>[]
}

const Header = ({ categories }: HeaderProps) => {
  return (
    <header className='sticky top-0 z-50 h-16 bg-background px-6 text-2xl'>
      <div className='flex justify-between'>
        <h1>
          <Link href='/'>SEAshows</Link>
        </h1>
        <ThemeSwitch />
      </div>
      <NavMenu categories={categories} />
    </header>
  )
}

export default Header
