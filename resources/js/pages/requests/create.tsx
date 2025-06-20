import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH1 } from '@/components/ui/h1'
import { Input } from '@/components/ui/input'
import AppLayout from '@/layouts/app-layout'
import React from 'react'

function CreateRequestPage() {
    return (
        <AppLayout>
            <div className='w-full items-center justify-center flex flex-col'>
                <TypographyH1>Formulaire de nouvelle demande</TypographyH1>
                <Card className='mt-20 w-2/3'>
                    <CardHeader className='border-b pb-5'>
                        <CardTitle className='text-2xl text-center'>Ouverture de port</CardTitle>
                        <CardDescription>sfjsdljf</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input placeholder='test' />
                            <Input placeholder='test' />
                            <Input placeholder='test' />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}

export default CreateRequestPage