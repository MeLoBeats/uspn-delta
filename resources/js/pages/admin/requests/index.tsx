import { adminRequestscolumns } from '@/components/tables/admin-requests-columns'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useServerFilters } from '@/hooks/use-server-filters'
import AppLayout from '@/layouts/app-layout'
import { status } from '@/lib/constants'
import { ResourceData, UserRequest } from '@/types'

interface IAdminRequestsHome {
    requests: ResourceData<UserRequest>
}

function AdminRequestsHome({ requests }: IAdminRequestsHome) {

    const { filters, updateFilters } = useServerFilters({ search: "", page: requests.meta.current_page, status: "" })

    const handleSearchChange = (value: string) => {
        updateFilters({
            search: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }

    const handleStatusChange = (value: string) => {
        console.log(value);
        updateFilters({
            status: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }
    return (
        <AppLayout active="admin.requests.index">
            <div className="flex flex-col justify-center">
                <h1 className="title">Administration des demandes</h1>
                {/* Filters */}
                <div className='w-full flex items-center sm:justify-between gap-5 flex-col sm:flex-row py-5'>
                    <Input value={filters.search} onClear={() => handleSearchChange("")} onChange={(e) => handleSearchChange(e.target.value)} placeholder='Recherche' containerClassName='w-full sm:w-1/2' />
                    <div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='status' className='font-semibold text-xs'>Statut</Label>
                            <Select onValueChange={handleStatusChange}>
                                <SelectTrigger id='status'>
                                    <SelectValue placeholder="Statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={" "}>
                                        Toutes
                                    </SelectItem>
                                    {Object.keys(status).map((s) => {
                                        const key = s as keyof typeof status;
                                        return (
                                            <SelectItem key={key} value={status[key].value}>
                                                {status[key].label}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* <Button onClick={create} className='w-full sm:w-fit cursor-pointer'>Nouvelle demande <span><PlusIcon /></span></Button> */}
                </div>
                <DataTable columns={adminRequestscolumns} meta={requests.meta} data={requests.data} />
            </div>
        </AppLayout>
    )
}

export default AdminRequestsHome