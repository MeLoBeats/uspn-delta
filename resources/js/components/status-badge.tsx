import { StatusValue } from '@/types'
import React from 'react'
import { Badge } from './ui/badge'
import { status } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type Props = {
    status: StatusValue
    reason?: string
}

const statusColors: Record<StatusValue, string> = {
    approved: 'bg-green-500/80',
    pending: 'bg-zinc-500/80',
    rejected: 'bg-red-500/80',
}

function StatusBadge({ status: statusKey, reason }: Props) {
    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Badge className={cn('px-4 w-24 overflow-hidden py-1.5 cursor-context-menu relative', statusColors[statusKey])}>
                    {status[statusKey].label}
                </Badge>
            </TooltipTrigger>
            {reason && (
                <TooltipContent>
                    {reason}
                </TooltipContent>
            )}
        </Tooltip>
    )
}

export default StatusBadge
