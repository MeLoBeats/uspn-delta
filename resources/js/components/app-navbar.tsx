import React, { useMemo } from 'react'
import AppLogo from './app-logo'
import type { NavbarLink, SharedData } from '@/types'
import NavLink from './navbar-link'
import { usePage } from '@inertiajs/react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './ui/navigation-menu'


type AppNavbarProps = {
  active: string
}

function AppNavbar({ active }: AppNavbarProps) {
  const { auth } = usePage().props as unknown as SharedData
  const navLinks: NavbarLink[] = useMemo(() => {
    return [
      {
        name: 'requests.index',
        label: 'Mes demandes',
        href: '/',
      },
      {
        name: 'admin.requests.index',
        label: 'Demandes',
        href: '/admin/demandes',
        isAdmin: true,
        isDropdown: true,
      },
      {
        name: 'admin.users.index',
        label: 'Utilisateurs',
        href: '/admin/users',
        isAdmin: true,
        isDropdown: true,
      },
      {
        name: 'logout',
        label: 'Déconnexion',
        href: '/deconnexion',
        direct: true,
      },
    ]
  }, [])

  return (
    <div className='w-full h-24 bg-primary fixed top-0 left-0 z-20'>
      <div className='w-full h-full wrapper flex items-center justify-between'>
        {/* Nav Logo */}
        <div>
          <AppLogo />
        </div>
        {/* Nav Links */}
        <ul className='hidden md:flex items-center h-full'>
          {/* Liens principaux hors admin et déconnexion */}
          {navLinks.filter(n => !n.isAdmin && n.name !== 'logout' && n.isHidden !== true).map((link) => (
            <NavLink key={link.name} active={link.name === active} {...link} />
          ))}
          {/* Menu déroulant Administration */}
          {auth.isAdmin && (
            <li className="font-semibold h-full flex items-center border-b-accent transition-colors duration-300">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-white text-base font-semibold hover:text-secondary px-4 py-2 border-0 shadow-none focus:ring-0 focus:outline-none data-[state=open]:text-accent">
                      Administration
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[180px]">
                      <ul className="flex flex-col gap-1 p-2">
                        {navLinks.filter(l => l.isDropdown).map(link => (
                          <li key={link.name}>
                            <NavigationMenuLink asChild>
                              <a
                                href={link.href}
                                className={`block px-4 py-2 rounded hover:text-accent ${active === link.name ? 'text-accent font-bold' : ''}`}
                              >
                                {link.label}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
          )}
          {/* Déconnexion toujours en dernier */}
          {navLinks.filter(n => n.name === 'logout' && n.isHidden !== true).map((link) => (
            <NavLink key={link.name} active={link.name === active} {...link} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppNavbar