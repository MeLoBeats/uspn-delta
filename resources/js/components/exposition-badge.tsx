import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type Props = {
    exposition: boolean;
    vlan?: string
}

function ExpositionBadge({ exposition, vlan }: Props) {
    console.log(exposition);
    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <Badge className={cn('px-4 w-24 overflow-hidden py-1.5 cursor-context-menu relative', exposition ? 'bg-primary/80' : 'bg-white text-black')}>
                    {exposition ? "Publique" : "Privée"}
                </Badge>
            </TooltipTrigger>
            {vlan && (
                <TooltipContent>
                    {vlan}
                </TooltipContent>
            )}
        </Tooltip>
    )
}

export default ExpositionBadge
