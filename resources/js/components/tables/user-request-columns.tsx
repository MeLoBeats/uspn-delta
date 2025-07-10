import { StatusValue, UserRequest } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../status-badge"
import TableActionsMenu from "../table-actions-menu"
import PortBadge from "../port-badge"

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
        accessorKey: "description",
        header: "Description",
        cell: (props) => {
            const fullText = props.getValue() as string
            const truncated = fullText?.length > 50 ? fullText.slice(0, 50) + "…" : fullText

            return (
                <p
                    className="truncate max-w-[250px] text-sm text-muted-foreground"
                    title={fullText} // Affiche le texte complet au survol
                >
                    {truncated}
                </p>
            )
        },
    },
    {
        accessorKey: "ports",
        header: "Ports",
        cell: (p) => p.row.original.ports.map(port =>
            <div className="flex items-center justify-center flex-wrap gap-5 w-full">
                <PortBadge port={port} />
            </div>
        )
    },
    {
        accessorKey: "exposedLabel",
        header: "Exposition",
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: (v) => <StatusBadge reason={v.row.original.reason} status={v.getValue() as StatusValue} />,
    },
    {
        id: "actions",

        size: 40, // largeur max (~taille icône + padding)
        header: "Actions",
        cell: ({ row }) => <TableActionsMenu request={row.original} />
    }
]
