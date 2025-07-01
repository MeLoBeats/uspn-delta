export const status = {
    approved: {
        value: "approved",
        label: "Approuvée"
    },
    rejected: {
        value: "rejected",
        label: "Rejetée"
    },
    pending: {
        value: "pending",
        label: "En attente"
    },
} as const

export const expositions = [
    {
        label: "Privée",
        value: 0
    },
    {
        label: "Publique",
        value: 1
    },
] as const

