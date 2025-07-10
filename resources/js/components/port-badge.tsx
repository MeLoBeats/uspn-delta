import { UserPortRequest } from '@/types'
import React from 'react'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type Props = {
    port: UserPortRequest
}

const PortBadge = ({ port }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <Badge className='w-24 bg-zinc-500/80 my-1'>
                    <div>{port.port}</div>/
                    <div>{port.protocol}</div>
                </Badge>
            </TooltipTrigger>
            <TooltipContent>
                {port.name}
            </TooltipContent>
        </Tooltip>
    )
}

export default PortBadge