import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react'
import { useConfirmDialog } from '@/context/confirm-context'
import { useState } from 'react'

interface ITableActionsMenu {
    id: number
}

function TableActionsMenu({ id }: ITableActionsMenu) {
    const { confirm } = useConfirmDialog()
    const [open, setOpen] = useState(false)

    const handleEdit = () => {
        setOpen(false) // Fermer le dropdown
    }

    const handleDelete = () => {
        setOpen(false) // Fermer le dropdown d'abord

        // Petit délai pour laisser le dropdown se fermer complètement
        setTimeout(() => {
            confirm({
                onValid() {
                    console.log("validation : " + id)
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
                <DropdownMenuItem onClick={handleEdit}>
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Éditer
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
                    <TrashIcon color="red" className="h-4 w-4 mr-2" />
                    Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TableActionsMenu