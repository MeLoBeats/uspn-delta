import { adminUserscolumns } from "@/components/tables/admin-users-columns";
import { DataTable } from "@/components/ui/data-table";
import AppLayout from "@/layouts/app-layout"
import { AdminUser, ResourceData } from "@/types"

interface IAdminUsersPage {
    users: ResourceData<AdminUser>;
}

const AdminUsersPage = ({ users }: IAdminUsersPage) => {
  console.log(users);
  
  return (
    <AppLayout active="admin.users.index">
        <div className="flex flex-col justify-center">
            <h1 className="title">Gestion des administrateurs</h1>
        </div>
        <DataTable columns={adminUserscolumns} data={users.data} />
    </AppLayout>
  )
}

export default AdminUsersPage