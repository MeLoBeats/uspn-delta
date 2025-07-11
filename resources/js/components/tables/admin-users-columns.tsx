import { AdminUser } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import AdminUserTableDeleteAction from "../admin-users-table-delete-action";

export const adminUserscolumns: ColumnDef<AdminUser>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
            <AdminUserTableDeleteAction id={row.original.id} />
        ),
    },
]
