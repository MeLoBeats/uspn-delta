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
    active: false
  },
]

function AppNavbar() {
  return (
    <div className='w-full h-24 bg-primary'>
      <div className='w-full h-full px-4 flex items-center justify-around'>
        {/* Nav Logo */}
        <div>
          <AppLogo />
        </div>
        {/* Nav Links */}
        <ul className='flex items-center h-full'>
          {navLinks.map((link) => (
            <NavLink key={link.name} name={link.name} href={link.href} active={link.active} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AppNavbar