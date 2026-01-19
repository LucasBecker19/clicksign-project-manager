"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";

import useCloseOnOutside from "@/hooks/useCloseOnOutside";
import RemoveProjectModal from "./RemoveProjectModal";
import useProjectStore from "@/store/projectStore";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter();
    const toggleFavorite = useProjectStore((state) => state.toggleFavorite);
    const deleteProject = useProjectStore((state) => state.deleteProject);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const menuRef = useCloseOnOutside<HTMLDivElement>(isMenuOpen, closeMenu);
    const menuId = useId();

    const handleToggleFavorite = () => {
        toggleFavorite(project.id);
    };

    const handleDeleteProject = () => {
        deleteProject(project.id);
        setIsRemoveModalOpen(false);
    };

    const handleEditProject = () => {
        setIsMenuOpen(false);
        router.push(`/projects/edit/${project.id}`);
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen((prevState) => !prevState);
    };

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return date.toLocaleDateString('pt-BR', { 
            year: 'numeric', 
            month: 'long', 
            day: '2-digit' 
        });
    };

    return (
        <div className="flex flex-col w-fit">
            <div className="rounded-tr-2xl rounded-tl-2xl relative w-[346px] h-[231px]">
                <Image
                    src={project.coverImage || "/images/project-card-placeholder.svg"}
                    alt={project.name}
                    fill
                    sizes="346px"
                    className="object-cover rounded-tr-2xl rounded-tl-2xl"
                />
                <button
                    type="button"
                    aria-pressed={project.isFavorite}
                    aria-label={project.isFavorite ? "Desfavoritar projeto" : "Favoritar projeto"}
                    className="absolute right-[72px] bottom-5 w-7 h-7 cursor-pointer bg-transparent p-0 border-0"
                    onClick={handleToggleFavorite}
                >
                    <Image
                        src={project.isFavorite ? "/images/favorite.svg" : "/images/favorite-outline.svg"}
                        alt=""
                        fill
                        className="object-cover hover-zoom"
                    />
                </button>
                <div ref={menuRef}>
                    <button
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls={menuId}
                        aria-label={isMenuOpen ? "Fechar menu do card" : "Abrir menu do card"}
                        className="absolute right-4 bottom-4 w-9 h-9 cursor-pointer bg-transparent p-0 border-0"
                        onClick={toggleMenu}
                    >
                        <Image src="/images/menu.svg" alt="" fill className="object-cover hover-zoom" />
                    </button>
                    {isMenuOpen && (
                        <div id={menuId}>
                            <div className="absolute right-[26px] bottom-0 bg-white rounded-[2px] h-4 w-4 border-0 rotate-45"></div>
                            <div className="absolute right-4 bottom-[-95px] bg-white rounded-lg min-w-[120px] z-10 overflow-hidden shadow-[0px_4px_4px_0px_#00000040]">
                                <button type="button" className="cursor-pointer w-full text-left px-5 py-[14px] hover:bg-gray-100 font-normal text-base leading-4 text-accent border-b border-line" onClick={handleEditProject}>
                                    <div className="flex items-center gap-3">
                                        <Image src="/images/edit.svg" alt="" width={24} height={24} />
                                        <span>Editar</span>
                                    </div>
                                </button>
                                <button type="button" className="cursor-pointer w-full text-left px-5 py-[14px] hover:bg-gray-100 font-normal text-base leading-4 text-accent" onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsRemoveModalOpen(true);
                                }}>
                                    <div className="flex items-center gap-3">
                                        <Image src="/images/trash.svg" alt="" width={24} height={24} />
                                        <span>Remover</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-br-2xl rounded-bl-2xl flex flex-col gap-4 p-6 border border-[#DCDCDC] bg-white">
                <div className="flex flex-col gap-3 border-b-1 border-line pb-4">
                    <p className="font-bold text-xl leading-none text-title">{project.name}</p>
                    <div className="flex items-center">
                        <span className="mr-2 font-bold text-base leading-none text-description">Cliente:</span>
                        <span className="font-normal text-base leading-none text-description">{project.client}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Image src="/images/calendar-day-light.svg" alt="Calendar day light icon" width={24} height={24} />
                        <span className="text-description">{formatDate(project.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Image src="/images/calendar-check-light.svg" alt="Calendar check light icon" width={24} height={24} />
                        <span className="text-description">{formatDate(project.endDate)}</span>
                    </div>
                </div>
            </div>
            <RemoveProjectModal 
                isOpen={isRemoveModalOpen} 
                onClose={() => setIsRemoveModalOpen(false)} 
                onConfirm={handleDeleteProject}
                projectName={project.name}
            />
        </div>
    );
}