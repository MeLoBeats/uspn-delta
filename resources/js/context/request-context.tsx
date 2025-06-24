// context/Request-context.tsx
import React, { createContext, useContext, PropsWithChildren, useState, useCallback } from 'react'
import RequestDialog from '@/components/dialogs/request-dialog'
import { UserRequest } from '@/types'

interface RequestContextType {
    create: () => void
    edit: (opts: UserRequest) => void
}

const RequestContext = createContext<RequestContextType | undefined>(undefined)

export function RequestProvider({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false)
    const [opts, setOpts] = useState<UserRequest | undefined>(undefined)

    const create = useCallback(() => {
        setOpen(true)
        setOpts(undefined)
    }, [])

    const edit = useCallback((opts: UserRequest) => {
        setOpen(true)
        setOpts(opts)
    }, [])

    return (
        <RequestContext.Provider value={{ create, edit }}>
            {children}
            <RequestDialog
                key={opts?.id ?? 789}
                open={open}
                openChange={setOpen}
                request={opts}
            />
        </RequestContext.Provider>
    )
}

export function useRequestDialog() {
    const context = useContext(RequestContext)
    if (!context) {
        throw new Error('useRequestDialog must be used within RequestProvider')
    }
    return context
}