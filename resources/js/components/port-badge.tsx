import { UserPortRequest } from '@/types'
import React from 'react'
import { Badge } from './ui/badge'

type Props = {
    port: UserPortRequest
}

const PortBadge = ({ port }: Props) => {
    return (
        <Badge className='bg-secondary my-1'>
            <div>{port.port}</div>/
            <div>{port.protocol}</div>
        </Badge>
    )
}

export default PortBadge