import React from 'react'
import { Button } from './ui/button'
import { useConfirmDialog } from '@/context/confirm-context'
import { router } from '@inertiajs/react'

type Props = {
    id: number
}

const AdminUserTableDeleteAction = ({ id }: Props) => {
    const { confirm } = useConfirmDialog()
  return (
    <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() => {
                    confirm({
                        onValid: () => {
                            router.delete(route('admin.users.destroy', { id }))
                        }
                    })
                }}
            >
                Supprimer
            </Button>
  )
}

export default AdminUserTableDeleteAction