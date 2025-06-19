import AppNavbar from '@/components/app-navbar'
import React, { PropsWithChildren } from 'react'

function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
            <AppNavbar />
            <div className='xl:px-20 px-14 mt-24 py-14'>{children}</div>
        </>
    )
}

export default AppLayout