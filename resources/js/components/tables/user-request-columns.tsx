import { StatusValue, UserRequest } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../status-badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, MoreVertical, PencilIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { router } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export const userRequestscolumns: ColumnDef<UserRequest>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "fqdn",
        header: "FQDN",
    },
    {
        accessorKey: "ipAddress",
        header: "IP",
    },
    {
        accessorKey: "exposedLabel",
        header: "Exposition",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (v) => <StatusBadge status={v.getValue() as StatusValue} />,
    },
    {
        id: "actions",
        enableHiding: false, // optionnel : garde la colonne toujours visible
        size: 40, // largeur max (~taille icône + padding)
        enablePinning: true,
        header: "Actions",
        cell: ({ row }) => {
            const request = row.original

            const handleEdit = () => {
                router.visit(route('request.edit', request.id))
            }

            const handleDelete = () => {
                if (confirm(`Supprimer la demande "${request.fqdn}" ?`)) {
                    router.delete(route('request.destroy', request.id), {
                        onSuccess: () => toast.success("Demande supprimée."),
                        onError: () => toast.error("Erreur lors de la suppression."),
                    })
                }
            }

            return (
                <DropdownMenu>
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
    }
]
