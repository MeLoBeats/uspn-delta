import React, { useMemo } from 'react'
import AppLogo from './app-logo'
import type { NavbarLink, SharedData } from '@/types'
import NavLink from './navbar-link'
import { usePage } from '@inertiajs/react'



function AppNavbar() {
  const { auth } = usePage().props as unknown as SharedData
  const navLinks: NavbarLink[] = useMemo(() => {
    return [
      {
        name: 'Mes demandes',
        href: '/',
        active: true
      },
      {
        name: 'Administration',
        href: '/admin/demandes',
        active: false,
        isHidden: !auth.isAdmin
      },
      {
        name: 'Déconnexion',
        href: '/deconnexion',
        active: false,
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
            <NavLink direct={link.direct ?? false} key={link.name} name={link.name} href={link.href} active={link.active} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppNavbar