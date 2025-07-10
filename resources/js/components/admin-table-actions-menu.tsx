import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { CheckIcon, MoreHorizontal, XIcon } from 'lucide-react'
import { useConfirmDialog } from '@/context/confirm-context'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import { UserRequest } from '@/types'

interface IAdminTableActionsMenu {
    request: UserRequest
}

function AdminTableActionsMenu({ request }: IAdminTableActionsMenu) {
    const { confirm } = useConfirmDialog()
    const [open, setOpen] = useState(false)

    const handleValidate = () => {
        setOpen(false) // Fermer le dropdown
        router.put(route('admin.requests.validate', { id: request.id }))
    }

    const handleReject = () => {
        setOpen(false) // Fermer le dropdown d'abord

        // Petit délai pour laisser le dropdown se fermer complètement
        setTimeout(() => {
            confirm({
                onValid() {
                    router.put(route('admin.requests.reject', { id: request.id }))
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
                <DropdownMenuItem onClick={handleValidate}>
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Valider la demande
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={handleReject}>
                    <XIcon color="red" className="h-4 w-4 mr-2" />
                    Rejeter la demande
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AdminTableActionsMenu