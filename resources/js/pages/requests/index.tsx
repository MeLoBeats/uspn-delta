import { userRequestscolumns } from '@/components/tables/user-request-columns'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { useServerFilters } from '@/hooks/use-server-filters'
import AppLayout from '@/layouts/app-layout'
import { ResourceData, UserRequest } from '@/types'
import React from 'react'

type RequestHomePageProps = {
    requests: ResourceData<UserRequest>
}

function RequestHomePage({ requests }: RequestHomePageProps) {
    const { filters, updateFilters } = useServerFilters({ search: "", page: requests.meta.current_page })

    const handleSearchChange = (value: string) => {
        updateFilters({
            search: value,
            page: 1, // ← Reset pagination si recherche change
        })
    }

    return (
        <AppLayout>
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-sans font-bold mb-4">Tableau de mes demandes</h1>
                {/* Filters */}
                <div className='w-full flex items-center py-5'>
                    <Input value={filters.search} onClear={() => handleSearchChange("")} onChange={(e) => handleSearchChange(e.target.value)} placeholder='Recherche' containerClassName='w-1/2' />
                </div>
                <DataTable columns={userRequestscolumns} meta={requests.meta} data={requests.data} />
            </div>
        </AppLayout>
    )
}

export default RequestHomePage