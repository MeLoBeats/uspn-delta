import { useForm } from '@inertiajs/react'
import FormInput from '../form-input'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'

function AddAdminUserDialog() {
    const { data, post, errors, setData } = useForm({
        email: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                setData({ email: "" }); // Reset the form after successful submission
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='cursor-pointer'>Ajouter une demande</Button>
            </DialogTrigger>
            <DialogContent className='w-full sm:max-w-xl md:!max-w-2xl lg:!max-w-4xl max-h-screen'>
                <DialogHeader className='border-b pb-2'>
                    <DialogTitle>Ajouter un administrateur</DialogTitle>
                    <DialogDescription>
                            <span>
                                Remplis les informations ci-dessous pour ajouter un nouvel administrateur.
                            </span>
                    </DialogDescription>
                </DialogHeader>

                <form
                    className='flex flex-row flex-wrap items-center gap-2 space-y-2 lg:space-y-5 overflow-y-auto max-h-[calc(100vh-12rem)]'
                    onSubmit={handleSubmit}
                >
                    <FormInput  
                        errors={errors}
                        label="Email"
                        name="email"
                        type='email'
                        value={data.email}
                        onChange={(e) => setData('email', e as string)}
                        required
                    />
                    <Button type="submit" className='w-full cursor-pointer'>Ajouter</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAdminUserDialog
