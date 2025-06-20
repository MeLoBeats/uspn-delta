import CreateRequestDialog from '@/components/dialogs/create-request-dialog'
import { userRequestscolumns } from '@/components/tables/user-request-columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { useServerFilters } from '@/hooks/use-server-filters'
import AppLayout from '@/layouts/app-layout'
import { ResourceData, SharedData, UserRequest } from '@/types'
import { usePage } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

type RequestHomePageProps = {
    requests: ResourceData<UserRequest>
}

function RequestHomePage({ requests }: RequestHomePageProps) {
    const { auth } = usePage().props as unknown as SharedData
    const { filters, updateFilters } = useServerFilters({ search: "", page: requests.meta.current_page })
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const handleSearchChange = (value: string) => {
        updateFilters({
            search: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }

    return (
        <AppLayout>
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-sans font-bold mb-4">Tableau de mes demandes : {auth.user.full_name}</h1>
                {/* Filters */}
                <div className='w-full flex items-center justify-between py-5'>
                    <Input value={filters.search} onClear={() => handleSearchChange("")} onChange={(e) => handleSearchChange(e.target.value)} placeholder='Recherche' containerClassName='w-1/2' />
                    <Button onClick={() => setDialogOpen(true)} className='cursor-pointer'>Nouvelle demande <span><PlusIcon /></span></Button>
                </div>
                <DataTable columns={userRequestscolumns} meta={requests.meta} data={requests.data} />
            </div>
            <CreateRequestDialog open={dialogOpen} openChange={open => setDialogOpen(open)} />
        </AppLayout>
    )
}

export default RequestHomePage