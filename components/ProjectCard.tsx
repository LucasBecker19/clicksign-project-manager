"use client";

import Image from "next/image";
import { Project } from "@/types/project";

import { useHighlightText } from "@/hooks/useHighlightText";
import RemoveProjectModal from "./RemoveProjectModal";
import ProjectCardMenu from "./ProjectCardMenu";
import { useProjectCardMenu } from "@/hooks/useProjectCardMenu";
import { formatDate } from "@/utils/date";

interface ProjectCardProps {
  project: Project;
  highlightQuery?: string;
}

export default function ProjectCard({ project, highlightQuery }: ProjectCardProps) {
    const { renderHighlightedText } = useHighlightText();
    const {
        isMenuOpen,
        isRemoveModalOpen,
        menuRef,
        menuId,
        toggleMenu,
        handleToggleFavorite,
        handleEditProject,
        handleDeleteProject,
        openRemoveModal,
        closeRemoveModal,
    } = useProjectCardMenu(project);

    return (
        <div className="flex flex-col w-full max-w-[346px]">
            <div className="rounded-tr-2xl rounded-tl-2xl relative w-full aspect-video">
                <Image
                    src={project.coverImage || "/images/project-card-placeholder.svg"}
                    alt={project.name}
                    fill
                    sizes="(max-width: 346px) 100vw, 346px"
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
                    <ProjectCardMenu
                        isOpen={isMenuOpen}
                        menuRef={menuRef}
                        menuId={menuId}
                        onToggle={toggleMenu}
                        onEdit={handleEditProject}
                        onDelete={() => openRemoveModal()}
                    />
                </div>
            </div>
            <div className="rounded-br-2xl rounded-bl-2xl flex flex-col gap-4 p-6 border border-[var(--color-border-strong)] bg-white">
                <div className="flex flex-col gap-3 border-b-1 border-line pb-4">
                    <p className="font-bold text-xl leading-none text-title">{renderHighlightedText(project.name, highlightQuery)}</p>
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
                onClose={closeRemoveModal} 
                onConfirm={handleDeleteProject}
                projectName={project.name}
            />
        </div>
    );
}