import React from 'react'

type Props = {
    name: string;
    href: string;
    active: boolean;
}

function NavbarLink({ active, href, name }: Props) {
    return (
        <li className={`font-semibold h-full flex items-center border-b-accent ${active ? 'text-accent border-b-2' : 'text-white hover:text-secondary'} transition-colors duration-300`}>
            <a href={href} className="px-4 py-2">
                {name}
            </a>
        </li>
    )
}

export default NavbarLink