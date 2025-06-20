import AppNavbar from '@/components/app-navbar'
import { Toaster } from '@/components/ui/sonner'
import React, { PropsWithChildren } from 'react'

function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
            <AppNavbar />
            <div className='xl:px-20 px-14 mt-24 py-14'>{children}</div>
            <Toaster />
        </>
    )
}

export default AppLayout