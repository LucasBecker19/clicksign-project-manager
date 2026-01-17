"use client";

import Image from "next/image";
import Button from "./Button";
import CustomSwitch from "./CustomSwitch";

const ProjectsEmptyState = (
    <div className="bg-content-background my-15 mx-card-x flex flex-1 justify-center items-center rounded">
        <div className="flex flex-col justify-center items-center gap-6">
            <p className="text-title font-semibold text-2xl leading-none text-center align-middle">Nenhum projeto</p>
            <span className="text-description mb-2 font-normal text-base leading-22 text-center">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>
            <Button 
                icon={<Image src="/images/plus-circle.svg" alt="Plus Circle" width={24} height={24} />} 
                title="Novo projeto" 
                action={() => undefined} 
            />
        </div>
    </div>
);

export default function Projects () {
    const isEmpty = false;

    if (isEmpty) {
        return ProjectsEmptyState;
    }

    return (
        <div className="my-15 mx-card-x">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <p>Projetos</p>
                    <span>(9)</span>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <CustomSwitch />
                        <span>Apenas Favoritos</span>
                    </div>

                    <div>Ordem alfabética</div>

                    <Button 
                        icon={<Image src="/images/plus-circle.svg" alt="Plus Circle" width={24} height={24} />} 
                        title="Novo projeto" 
                        action={() => undefined} 
                    />
                </div>
            </div>
        </div>
    );
}