import { StatusValue } from '@/types'
import React from 'react'
import { Badge } from './ui/badge'
import { status } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Props = {
    status: StatusValue
}

const statusColors: Record<StatusValue, string> = {
    approved: 'bg-green-500/80',
    pending: 'bg-zinc-500/80',
    rejected: 'bg-red-500/80',
}

function StatusBadge({ status: statusKey }: Props) {
    return (
        <Badge className={cn('px-4 py-1.5 cursor-context-menu', statusColors[statusKey])}>
            {status[statusKey].label}
        </Badge>
    )
}

export default StatusBadge
