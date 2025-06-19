import { UserRequest } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

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
        accessorKey: "exposed",
        header: "Exposition",
    },
    {
        accessorKey: "vlan",
        header: "VLAN",
    },
    {
        accessorKey: "statusLabel",
        header: "Status",
    },
]