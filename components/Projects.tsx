"use client";

import Image from "next/image";
import Button from "./Button";
import CustomSwitch from "./CustomSwitch";
import { Select, MenuItem } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectsEmptyState = (
    <div className="bg-content-background my-15 mx-card-x flex flex-1 justify-center items-center rounded">
        <div className="flex flex-col justify-center items-center gap-6">
            <p className="heading-2xl text-center align-middle">Nenhum projeto</p>
            <span className="text-description mb-2 font-normal text-base leading-22 text-center">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>
            <Button 
                variant="large"
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
            <div className="flex items-center justify-between mb-[22px]">
                <div className="flex items-center gap-2">
                    <p className="heading-2xl">Projetos</p>
                    <span className="text-accent font-normal text-[17px] leading-none tracking-normal align-middle">(9)</span>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <CustomSwitch />
                        <span className="font-normal text-base leading-22 tracking-normal text-text-dark">Apenas Favoritos</span>
                    </div>

                    <div>
                        <Select
                            name="orderBy"
                            id="orderBy"
                            defaultValue="alphabetical"
                            className="border border-accent bg-white w-[296px] h-10"
                            sx={{
                                borderRadius: '8px',
                            }}
                        >
                            <MenuItem sx={{ borderBottom: '1px solid #ECECEC'}} value="alphabetical">Ordem alfabética</MenuItem>
                            <MenuItem sx={{ borderBottom: '1px solid #ECECEC'}} value="recent">Iniciados mais recentes</MenuItem>
                            <MenuItem value="deadline">Prazo mais próximo</MenuItem>
                        </Select>
                    </div>

                    <Button 
                        variant="medium"
                        icon={<Image src="/images/plus-circle.svg" alt="Plus Circle" width={24} height={24} />} 
                        title="Novo projeto" 
                        action={() => undefined} 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    );
}