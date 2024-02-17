import clsx from 'clsx'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu'

type NavMenuProps = {
  categories: Record<'key' | 'name', string>[]
}

const NavMenu = ({ categories }: NavMenuProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/shows/${category.key}?page=1`}
            legacyBehavior
            passHref
          >
            <NavigationMenuItem
              asChild
              className={clsx(navigationMenuTriggerStyle(), 'cursor-pointer')}
            >
              <NavigationMenuLink>{category.name}</NavigationMenuLink>
            </NavigationMenuItem>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu
