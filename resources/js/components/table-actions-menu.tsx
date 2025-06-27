import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react'
import { useConfirmDialog } from '@/context/confirm-context'
import { useMemo, useState } from 'react'
import { router } from '@inertiajs/react'
import { useRequestDialog } from '@/context/request-context'
import { UserRequest } from '@/types'

interface ITableActionsMenu {
    request: UserRequest
}

function TableActionsMenu({ request }: ITableActionsMenu) {
    const { confirm } = useConfirmDialog()
    const { edit } = useRequestDialog()
    const [open, setOpen] = useState(false)
    const isPending = useMemo(() => {
        return request.status === "pending"
    }, [request])

    const handleEdit = () => {
        setOpen(false) // Fermer le dropdown
        setTimeout(() => {
            edit(request)
        }, 100)

    }

    const handleDelete = () => {
        setOpen(false) // Fermer le dropdown d'abord

        // Petit délai pour laisser le dropdown se fermer complètement
        setTimeout(() => {
            confirm({
                onValid() {
                    router.delete(route('request.destroy', { id: request.id }))
                }
            })
        }, 100)
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4}>
                <DropdownMenuItem onClick={handleEdit} disabled={!isPending}>
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Éditer
                </DropdownMenuItem>
                <DropdownMenuItem disabled={!isPending} className="text-red-500" onClick={handleDelete}>
                    <TrashIcon color="red" className="h-4 w-4 mr-2" />
                    Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableActionsMenu