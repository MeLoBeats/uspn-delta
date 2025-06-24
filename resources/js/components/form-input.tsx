import React, { ComponentProps } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
    value: string | number
    name: string
    onChange: (value: string) => void;
    label: string;
    wrapperClassName?: string;
} & ComponentProps<"input">

function FormInput({ errors, value, onChange, id, name, label, required, wrapperClassName, ...props }: Props) {
    return (
        <div className={cn("w-full", wrapperClassName)}>
            <Label htmlFor={id}>{label}{required && <span className='text-red-500 ml-1'>*</span>}</Label>
            <Input
                id={id}
                isError={errors && typeof errors[name] === "string"}
                value={value}
                onChange={(e) => onChange(e.target.value as string)}
                {...props}
            />
            {errors && errors[name] && (
                <p className='text-red-500 text-sm'>{errors[name]}</p>
            )}
        </div>
    )
}

export default FormInput