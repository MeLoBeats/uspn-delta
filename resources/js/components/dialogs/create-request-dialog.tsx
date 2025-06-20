import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '../ui/dialog'
import { useForm, usePage } from '@inertiajs/react'
import { Button } from '../ui/button'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { ProtocolType, UserPortRequest } from '@/types'
import { useState } from 'react'
import FormInput from '../form-input'
import FormSelect from '../form-select'
import { toast } from 'sonner'

interface CreateRequestDialogProps {
    open: boolean
    openChange: (open: boolean) => void
}

interface PortFormProps {
    index: number
    port: UserPortRequest
    onChange: (index: number, updated: Partial<UserPortRequest>) => void
    onRemove: (index: number) => void
    isLast: boolean
    isFirst: boolean
    errors: {
        [key: string]: unknown
    };
    onAdd: () => void
}

const PortForm = ({ index, port, onChange, onRemove, isLast, isFirst, onAdd, errors }: PortFormProps) => {
    return (
        <div className='w-full flex justify-between gap-5 items-end'>
            <FormInput
                errors={errors}
                label='Port'
                name={`ports.${index}.port`}
                onChange={(e) => onChange(index, { port: e as string })}
                value={port.port}
                placeholder='80'
                required
            />
            <FormSelect
                data={[{ label: "TCP", value: "tcp" }, { label: "UDP", value: "udp" }, { label: "TCP + UDP", value: "all" }]}
                errors={errors}
                name={`ports.${index}.protocol`}
                id={`ports.${index}.protocol`}
                label='Protocole'
                onChange={(v) => onChange(index, { protocol: v as ProtocolType })}
                value={port.protocol}
                required
            />
            <FormInput
                errors={errors}
                label='Nom'
                name={`ports.${index}.name`}
                id={`ports.${index}.name`}
                onChange={(e) => onChange(index, { name: e as string })}
                value={port.name}
                required
            />
            <Button type='button' onClick={onAdd} variant='ghost' disabled={!isLast}>
                <PlusIcon />
            </Button>
            <Button type='button' onClick={() => onRemove(index)} disabled={isFirst} variant='destructive'>
                <TrashIcon />
            </Button>
        </div>
    )
}

const initialPort: UserPortRequest = {
    name: '',
    port: '',
    protocol: 'tcp'
}

function CreateRequestDialog({ open, openChange }: CreateRequestDialogProps) {
    const { errors } = usePage().props
    const [ports, setPorts] = useState<UserPortRequest[]>([initialPort])

    const { data, setData, post, reset } = useForm({
        ip_address: '',
        fqdn: '',
        ports: ports.map(p => ({
            name: p.name ?? '',
            port: p.port ?? '',
            protocol: p.protocol ?? ''
        })),
        exposed: false,
        description: '',
        vlan: '',
    })

    // Sync local ports state with inertia data
    const updatePort = (index: number, updated: Partial<UserPortRequest>) => {
        const newPorts = [...ports]
        newPorts[index] = { ...newPorts[index], ...updated }
        setPorts(newPorts)
        setData('ports', newPorts)
    }

    const removePort = (index: number) => {
        const newPorts = ports.filter((_, i) => i !== index)
        setPorts(newPorts)
        setData('ports', newPorts)
    }

    const addPort = () => {
        const newPorts = [...ports, initialPort]
        setPorts(newPorts)
        setData('ports', newPorts)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('request.store'), {
            onSuccess() {
                openChange(false)
                reset()
                setPorts([initialPort])
                toast.success("Votre demande à bien été envoyée", {
                    position: "top-right",
                    richColors: true,
                    duration: 5000
                })
            }
        }) // adapte la route à ton backend
    }

    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent className='w-full !max-w-4xl max-h-screen'>
                <DialogHeader className='border-b pb-2'>
                    <DialogTitle>Nouvelle demande</DialogTitle>
                    <DialogDescription>
                        Remplis les informations ci-dessous pour créer une nouvelle demande.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center justify-between space-y-5 overflow-y-auto max-h-[calc(100vh-12rem)]'
                >
                    <FormInput
                        required
                        id="ip_address"
                        label="Adresse IP"
                        value={data.ip_address}
                        onChange={(v) => setData('ip_address', v as string)}
                        placeholder='192.168.x.x'
                        errors={errors}
                        name="ip_address"
                    />

                    <FormInput
                        required
                        id="fqdn"
                        label="FQDN"
                        value={data.fqdn}
                        onChange={(v) => setData('fqdn', v as string)}
                        placeholder='delta.univ-spn.fr'
                        errors={errors}
                        name="fqdn"
                    />

                    <FormSelect
                        data={[
                            {
                                label: "Publique",
                                value: "true"
                            },
                            {
                                label: "Privée",
                                value: "false"
                            }
                        ]}
                        required
                        id="exposed"
                        label="Exposition"
                        value={data.exposed}
                        castToBoolean
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(v) => setData('exposed', v as any)}
                        errors={errors}
                        name="exposed"
                    />
                    {
                        !data.exposed && (
                            <FormInput
                                required
                                id="vlan"
                                label="VLAN"
                                value={data.vlan ?? ""}
                                onChange={(v) => setData('vlan', v as string)}
                                placeholder='ex: 123'
                                errors={errors}
                                name="vlan"
                            />
                        )
                    }

                    <FormInput
                        id="description"
                        label="Description"
                        value={data.description ?? ""}
                        onChange={(v) => setData('description', v as string)}
                        placeholder='Raison de la demande, usage...'
                        errors={errors}
                        name="description"
                    />

                    <h2 className='w-full font-semibold text-center py-2 border-t border-b'>Ports</h2>

                    {ports.map((port, index) => (
                        <PortForm
                            key={index}
                            index={index}
                            port={port}
                            errors={errors}
                            onChange={updatePort}
                            onRemove={removePort}
                            onAdd={addPort}
                            isLast={index === ports.length - 1}
                            isFirst={index === 0}
                        />
                    ))}

                    <Button type='submit' className='w-full'>
                        Créer la demande
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateRequestDialog
