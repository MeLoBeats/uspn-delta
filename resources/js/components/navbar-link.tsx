import type { NavbarLink } from '@/types';
import { Link } from '@inertiajs/react';


function NavbarLink({ active, href, label, direct = false }: NavbarLink & { active: boolean }) {
    return (
        <li className={`font-semibold h-full flex items-center border-b-accent ${active ? 'text-accent border-b-2' : 'text-white hover:text-secondary'} transition-colors duration-300`}>
            {direct ? (
                <a href={href} className="px-4 py-2">
                    {label}
                </a>
            ) : (
                <Link href={href} className="px-4 py-2">
                    {label}
                </Link>
            )}
        </li>
    )
}

export default NavbarLink