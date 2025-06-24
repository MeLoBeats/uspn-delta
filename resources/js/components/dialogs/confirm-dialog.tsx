// components/dialogs/confirm-dialog.tsx
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface IConfirmDialog {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    onValid?: () => void;
    onCancel?: () => void;
}

function ConfirmDialog({ open, onOpenChange, onValid, onCancel }: IConfirmDialog) {
    const handleValid = () => {
        onValid?.()
        onOpenChange?.(false) // Fermer le dialog après validation
    }

    const handleCancel = () => {
        onCancel?.()
        onOpenChange?.(false) // Fermer le dialog après annulation
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est définitive et ne pourra être révoquée.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleValid}>
                        Continuer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog