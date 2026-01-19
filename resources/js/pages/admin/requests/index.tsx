import { adminRequestscolumns } from '@/components/tables/admin-requests-columns'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useServerFilters } from '@/hooks/use-server-filters'
import AppLayout from '@/layouts/app-layout'
import { expositions, status } from '@/lib/constants'
import { ResourceData, UserRequest } from '@/types'

interface IAdminRequestsHome {
    requests: ResourceData<UserRequest>
}

function AdminRequestsHome({ requests }: IAdminRequestsHome) {

    const { filters, updateFilters } = useServerFilters<Record<string, undefined | string | number>>({ search: "", port: "", page: requests.meta.current_page, status: undefined, exposed: undefined })

    const handleSearchChange = (value: string) => {
        updateFilters({
            search: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }

    const handleStatusChange = (value: string) => {
        updateFilters({
            status: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }

    const handlePortChange = (value: string) => {
        updateFilters({
            port: value,
            page: 1,
        })
    }

    const handleExposedChange = (value: string) => {
        updateFilters({
            exposed: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }
    return (
        <AppLayout active="admin.requests.index">
            <div className="flex flex-col justify-center">
                <h1 className="title">Administration des demandes</h1>
                {/* Filters */}
                <div className='w-full flex items-end sm:justify-between gap-5 flex-col sm:flex-row pb-5'>
                    <div className='w-full sm:w-1/2 flex flex-col sm:flex-row gap-3'>
                        <Input value={filters.search} onClear={() => handleSearchChange("")} onChange={(e) => handleSearchChange(e.target.value)} placeholder='Recherche' containerClassName='w-full sm:w-1/2' />
                        <Input value={filters.port ?? ""} onClear={() => handlePortChange("")} onChange={(e) => handlePortChange(e.target.value)} placeholder='Port' type='number' containerClassName='w-full sm:w-1/2' />
                    </div>
                    <div className='flex items-center gap-5 flex-row-reverse'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='status' className='font-semibold text-xs'>Statut</Label>
                            <Select onValueChange={handleStatusChange}>
                                <SelectTrigger id='status'>
                                    <SelectValue placeholder="Toutes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={null!}>
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
                        <div className='flex flex-col gap-2'>

                            <Label htmlFor='exposed' className='font-semibold text-xs'>Exposition</Label>
                            <Select onValueChange={handleExposedChange}>
                                <SelectTrigger id='exposed'>
                                    <SelectValue placeholder="Toutes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={null!}>
                                        Toutes
                                    </SelectItem>
                                    {expositions.map((e, id) => {
                                        return (
                                            <SelectItem key={id} value={e.value.toString()}>
                                                {e.label}
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
