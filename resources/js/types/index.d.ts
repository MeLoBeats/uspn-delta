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

export interface UserRequest {
    id: number;
    ipAddress: string;
    fqdn: string;
    status: string;
    reason?: string;
    exposed: boolean;
    vlan?: string;
    ports: UserPortRequest[];
    description?: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UserPortRequest {
    name: string;
    port: string;
    protocol: "tcp" | "udp" | "all";
}

export interface NavbarLink {
    name: string;
    href: string;
    active: boolean;
}

export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
