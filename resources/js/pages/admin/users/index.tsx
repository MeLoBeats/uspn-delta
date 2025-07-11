import AppLayout from "@/layouts/app-layout"

const AdminUsersPage = () => {
  return (
    <AppLayout active="admin.users.index">
        <div className="flex flex-col justify-center">
                <h1 className="title">Gestion des administrateurs</h1>
            </div>
    </AppLayout>
  )
}

export default AdminUsersPage