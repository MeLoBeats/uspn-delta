import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'

type FilterOptions = {
    debounce?: number
    preserveScroll?: boolean
    preserveState?: boolean
    replace?: boolean
}

function cleanFilters<T extends Record<string, string | number>>(filters: T): Partial<T> {
    const cleaned: Partial<T> = {}
    for (const key in filters) {
        const value = filters[key]
        if (value !== null && value !== undefined && value !== '') {
            cleaned[key] = value
        }
    }
    return cleaned
}

export function useServerFilters<T extends Record<string, string | number>>(
    initialFilters: T,
    options: FilterOptions = {}
) {
    const {
        debounce = 400,
        preserveScroll = true,
        preserveState = true,
        replace = true,
    } = options

    const [filters, setFilters] = useState<T>(initialFilters)
    const [debouncedFilters, setDebouncedFilters] = useState<T>(initialFilters)

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters)
        }, debounce)

        return () => clearTimeout(handler)
    }, [filters, debounce])

    // Trigger Inertia request with cleaned filters
    useEffect(() => {
        const cleaned = cleanFilters(debouncedFilters)

        router.get(route(route().current()!), cleaned, {
            preserveScroll,
            preserveState,
            replace,
        })
    }, [debouncedFilters])

    const updateFilters = (newValues: Partial<T>) => {
        setFilters(prev => ({
            ...prev,
            ...newValues,
        }))
    }

    return {
        filters,
        updateFilters,
    }
}
