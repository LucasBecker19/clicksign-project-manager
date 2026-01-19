"use client";

import Image from "next/image";
import Button from "./Button";

type RemoveProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    projectName: string;
};

export default function RemoveProjectModal({ isOpen, onClose, onConfirm, projectName }: RemoveProjectModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-[4px] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-[582px] text-center">
                <div className="flex justify-center items-center mx-auto mb-4 mt-[-64px] rounded-full bg-accent w-16 h-16 shadow-[var(--shadow-strong)]">
                    <Image src="/images/white_trash.svg" alt="Remover" width={20} height={20} />
                </div>
                <h2 className="text-[22px] font-semibold text-title mb-6">Remover projeto</h2>
                <div className="border-t-1 border-line flex flex-col">
                    <div className="flex flex-col gap-3 my-8">
                        <span className="font-normal text-base leading-[22px] text-center text-description">Essa ação removerá definitivamente o projeto:</span>
                        <span className="font-medium text-2xl leading-[32px] text-center text-dark">{projectName}</span>
                    </div>
                    <div className="flex m-auto justify-center items-center gap-8">
                        <Button title="Cancelar" action={onClose} variant="outline" size="large" width="226px" />
                        <Button title="Confirmar" action={onConfirm} variant="regular" size="large" width="260px" />
                    </div>
                </div>
            </div>
        </div>
    );
}
