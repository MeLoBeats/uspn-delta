import React from 'react'
import { Label } from './ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
    value: string | boolean
    name: string
    onChange: (value: string | boolean) => void
    label: string
    required?: boolean
    id: string
    data: {
        label: string
        value: string
    }[]
    castToBoolean?: boolean
}

function FormSelect({
    errors,
    value,
    onChange,
    id,
    name,
    label,
    data,
    required = false,
    castToBoolean = false
}: Props) {
    const handleChange = (v: string) => {
        const finalValue = castToBoolean ? v === 'true' : v
        onChange(finalValue)
    }

    return (
        <div className='w-full'>
            <Label htmlFor={id}>
                {label}
                {required && <span className='text-red-500 ml-1'>*</span>}
            </Label>
            <Select
                value={String(value)} // pour supporter boolean initial
                onValueChange={handleChange}
            >
                <SelectTrigger id={id}>
                    <SelectValue placeholder="Sélectionner une valeur" />
                </SelectTrigger>
                <SelectContent>
                    {data.map((d) => (
                        <SelectItem value={d.value} key={d.value}>
                            {d.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors[name] && (
                <p className='text-red-500 text-sm'>{errors[name]}</p>
            )}
        </div>
    )
}

export default FormSelect
