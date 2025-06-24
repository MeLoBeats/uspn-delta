// context/confirm-context.tsx
import React, { createContext, useContext, PropsWithChildren, useState, useCallback } from 'react'
import ConfirmDialog from '@/components/dialogs/confirm-dialog'

interface ConfirmOptions {
    onValid: () => void
    onCancel?: () => void
}

interface ConfirmContextType {
    confirm: (opts: ConfirmOptions) => void
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

export function ConfirmProvider({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false)
    const [opts, setOpts] = useState<ConfirmOptions>({
        onValid() { },
        onCancel: undefined
    })

    const confirm = useCallback((options: ConfirmOptions) => {
        setOpen(true)
        setOpts(options)
    }, [])

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <ConfirmDialog
                open={open}
                onValid={opts.onValid}
                onCancel={opts.onCancel}
                onOpenChange={setOpen}
            />
        </ConfirmContext.Provider>
    )
}

export function useConfirmDialog() {
    const context = useContext(ConfirmContext)
    if (!context) {
        throw new Error('useConfirmDialog must be used within ConfirmProvider')
    }
    return context
}