import React from 'react'
import AppLogo from './app-logo'
import type { NavbarLink } from '@/types'
import NavLink from './navbar-link'

const navLinks: NavbarLink[] = [
  {
    name: 'Mes demandes',
    href: '/',
    active: true
  },
  {
    name: 'Déconnexion',
    href: '/deconnexion',
    active: false,
    direct: true,
  },
]

function AppNavbar() {
  return (
    <div className='w-full h-24 bg-primary fixed top-0 left-0 z-20'>
      <div className='w-full h-full xl:px-20 px-14 flex items-center justify-between'>
        {/* Nav Logo */}
        <div>
          <AppLogo />
        </div>
        {/* Nav Links */}
        <ul className='flex items-center h-full'>
          {navLinks.map((link) => (
            <NavLink direct={link.direct ?? false} key={link.name} name={link.name} href={link.href} active={link.active} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppNavbar