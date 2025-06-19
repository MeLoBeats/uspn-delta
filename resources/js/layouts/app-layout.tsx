import AppNavbar from '@/components/app-navbar'
import React, { PropsWithChildren } from 'react'

function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
            <AppNavbar />
            <div>{children}</div>
        </>
    )
}

export default AppLayout