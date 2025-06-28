import React, { useMemo } from 'react'
import AppLogo from './app-logo'
import type { NavbarLink, SharedData } from '@/types'
import NavLink from './navbar-link'
import { usePage } from '@inertiajs/react'


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
        label: 'Administration',
        href: '/admin/demandes',
        isHidden: !auth.isAdmin
      },
      {
        name: 'logout',
        label: 'Déconnexion',
        href: '/deconnexion',
        direct: true,
      },
    ]
  }, [auth.isAdmin])

  return (
    <div className='w-full h-24 bg-primary fixed top-0 left-0 z-20'>
      <div className='w-full h-full wrapper flex items-center justify-between'>
        {/* Nav Logo */}
        <div>
          <AppLogo />
        </div>
        {/* Nav Links */}
        <ul className='hidden md:flex items-center h-full'>
          {navLinks.filter(n => n.isHidden !== true).map((link) => (
            <NavLink key={link.name} active={link.name === active} {...link} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppNavbar