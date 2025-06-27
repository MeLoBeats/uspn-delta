import { status } from '@/lib/constants';
import type { Config } from 'ziggy-js';

export interface ResourceData<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    },
    meta: MetaPagination;
}

export interface MetaPagination {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export type StatusType = {
    value: "pending" | "approved" | "rejected";
    label: "En attente" | "Approuvée" | "Rejetée"
}

export type StatusKey = keyof typeof status
export type StatusValue = typeof status[StatusKey]['value']
export type StatusLabel = typeof status[StatusKey]['label']


export interface UserRequest {
    id: number;
    ipAddress: string;
    fqdn: string;
    status: "pending" | "rejected" | "approved";
    reason?: string;
    exposed: boolean;
    exposedLabel: string;
    vlan?: string;
    ports: UserPortRequest[];
    user: Pick<User, "full_name">;
    description?: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface StoreUserRequest {
    ip_address: string;
    fqdn: string;
    ports: UserPortRequest[];
    exposed: boolean;
    vlan?: string;
    description?: string;
}

export interface UserPortRequest {
    name: string;
    port: string;
    protocol: ProtocolType;
}

export type ProtocolType = "tcp" | "udp" | "all"

export interface NavbarLink {
    name: string;
    href: string;
    direct?: boolean;
    active: boolean;
    isHidden?: boolean;
}

export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    auth: {
        user: string,
        isAdmin: boolean
    };
    flash: {
        error: {
            message: string;
            id: string;
        };
        success: {
            message: string;
            id: string;
        };
    }
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    full_name: string;
    email: string;
    admin: boolean;
}
