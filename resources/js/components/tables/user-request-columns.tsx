import { StatusValue, UserRequest } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../status-badge"
import TableActionsMenu from "../table-actions-menu"

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
        cell: (v) => <StatusBadge reason={v.row.original.reason} status={v.getValue() as StatusValue} />,
    },
    {
        id: "actions",
        enableHiding: false, // optionnel : garde la colonne toujours visible
        size: 40, // largeur max (~taille icône + padding)
        enablePinning: true,
        header: "Actions",
        cell: ({ row }) => <TableActionsMenu request={row.original} />
    }
]
