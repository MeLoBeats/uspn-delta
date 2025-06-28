import AppNavbar from '@/components/app-navbar'
import { Toaster } from '@/components/ui/sonner'
import { SharedData } from '@/types'
import { usePage } from '@inertiajs/react'
import React, { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'

function AppLayout({ children, active }: PropsWithChildren<{ active: string }>) {
    const { flash: { error, success } } = usePage().props as unknown as SharedData

    useEffect(() => {
        if (error?.message) {
            toast.error(error.message, {
                richColors: true,
                duration: 5000,
                position: 'top-right'
            })
        }

        if (success?.message) {
            toast.success(success.message, {
                richColors: true,
                duration: 5000,
                position: 'top-right'
            })
        }
    }, [success.id, error.id, error.message, success.message]) // Utiliser les IDs comme dépendances

    return (
        <>
            <AppNavbar active={active} />
            <div className='wrapper mt-24 py-14'>{children}</div>
            <Toaster toastOptions={{
                className: "cursor-default"
            }} />
        </>
    )
}

export default AppLayout