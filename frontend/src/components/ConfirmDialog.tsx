import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import type { Expense } from "../types/expense";
import { api } from "../api/client";
import { Button, ButtonVariant } from "./Button";
import { FormError } from "./FormError";
import { useEffect, useState } from "react";

interface DialogProps {
    expense: Expense | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void
    onConfirmed: () => void;
}

export function ConfirmDialog({ expense, isOpen, onOpenChange, onConfirmed }: DialogProps) {
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setError('');
        }
    }, [isOpen])

    if (expense) {
        const handleSubmit = (async () => {
            try {
                await api.delete(`/expenses/${expense.id}`);
                onOpenChange(false);
                onConfirmed();
            } catch {
                setError("Erro ao excluir despesa, tente novamente.")
            }
        })

        return (
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogPortal>
                    <DialogOverlay className="fixed inset-0 bg-black/40" />
                    <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
                        <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
                        <DialogDescription>
                            Você está prestes a excluir o registro "{expense.description}" do seu histórico, tem certeza que deseja continuar?
                        </DialogDescription>
                        <div className="w-full flex justify-around gap-4 mt-2">
                            <Button variant={ButtonVariant.Secondary} onClick={() => { onOpenChange(false) }} className="w-full">
                                Cancelar
                            </Button>
                            <Button variant={ButtonVariant.Danger} onClick={handleSubmit} className="w-full">
                                Excluir
                            </Button>
                        </div>
                        <FormError message={error} />
                    </DialogContent>
                </DialogPortal>
            </Dialog >
        );
    }
}
