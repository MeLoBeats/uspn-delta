import { AdminUser } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const adminUserscolumns: ColumnDef<AdminUser>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
]
