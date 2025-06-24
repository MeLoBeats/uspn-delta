import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalize(value: string): string {
    const base = value.toLowerCase()
    return base.charAt(0).toUpperCase() + base.slice(1)
}

export function showFullName(value: string) {
    return value
        .split('.')
        .filter(v => v.trim() !== '')
        .map(v => capitalize(v))
        .join(" ")
}