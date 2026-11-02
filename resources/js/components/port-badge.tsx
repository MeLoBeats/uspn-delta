import { UserPortRequest } from '@/types'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type Props = {
    port: UserPortRequest
}

export const isPortRange = (port: string | number) => String(port).includes('-')

const PortBadge = ({ port }: Props) => {
    const isRange = isPortRange(port.port)

    return (
        <Tooltip>
            <TooltipTrigger>
                <Badge className={cn('min-w-24 my-1', isRange ? 'bg-amber-500/90 text-black' : 'bg-zinc-500/80')}>
                    {isRange && <span className='font-bold'>Plage</span>}
                    <div>{port.port}</div>/
                    <div>{port.protocol}</div>
                </Badge>
            </TooltipTrigger>
            <TooltipContent>
                {port.name}
                {isRange && (
                    <div className='font-semibold'>
                        Plage de ports : la règle doit être créée sur la plage complète (règle de type range).
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    )
}

export default PortBadge
