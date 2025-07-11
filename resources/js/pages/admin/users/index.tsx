import AddAdminUserDialog from "@/components/dialogs/add-admin-users-dialog";
import { adminUserscolumns } from "@/components/tables/admin-users-columns";
import { DataTable } from "@/components/ui/data-table";
import AppLayout from "@/layouts/app-layout"
import { AdminUser, ResourceData } from "@/types"

interface IAdminUsersPage {
    users: ResourceData<AdminUser>;
}

const AdminUsersPage = ({ users }: IAdminUsersPage) => {
  return (
    <AppLayout active="admin.users.index">
        <div className="flex flex-row justify-between items-center mb-4">
            <h1 className="title">Gestion des administrateurs</h1>
            <AddAdminUserDialog />
        </div>
        <DataTable columns={adminUserscolumns} data={users.data} />
    </AppLayout>
  )
}

export default AdminUsersPage