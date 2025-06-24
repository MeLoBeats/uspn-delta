import AppNavbar from '@/components/app-navbar'
import { Toaster } from '@/components/ui/sonner'
import { SharedData } from '@/types'
import { usePage } from '@inertiajs/react'
import React, { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'

function AppLayout({ children }: PropsWithChildren) {
    const { flash: { error, success } } = usePage().props as unknown as SharedData

    useEffect(() => {
        if (error) {
            toast.error(error, {
                richColors: true,
                duration: 3000,
                position: 'top-right'
            })
        }
        if (success) {
            toast.success(success, {
                richColors: true,
                duration: 3000,
                position: 'top-right'
            })
        }
    }, [success, error])

    return (
        <>
            <AppNavbar />
            <div className='wrapper mt-24 py-14'>{children}</div>
            <Toaster />
        </>
    )
}

export default AppLayout