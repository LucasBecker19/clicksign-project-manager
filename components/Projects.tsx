"use client";

import Image from "next/image";
import Button from "./Button";
import CustomSwitch from "./CustomSwitch";
import { Select, MenuItem } from "@mui/material";
import ProjectCard from "./ProjectCard";
import BackButton from "./BackButton";
import useProjectStore, { SortDirection, SortOption } from "@/store/projectStore";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function Projects () {
    const router = useRouter();
    const projects = useProjectStore((state) => state.projects);
    const filter = useProjectStore((state) => state.filter);
    const sortBy = useProjectStore((state) => state.sortBy);
    const sortDirection = useProjectStore((state) => state.sortDirection);
    const searchQuery = useProjectStore((state) => state.searchQuery);
    const setFilter = useProjectStore((state) => state.setFilter);
    const setSortBy = useProjectStore((state) => state.setSortBy);
    const setSortDirection = useProjectStore((state) => state.setSortDirection);
    const setSearchQuery = useProjectStore((state) => state.setSearchQuery);
    const getFilteredProjects = useProjectStore((state) => state.getFilteredProjects);

    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        if (useProjectStore.persist?.hasHydrated?.()) {
            Promise.resolve().then(() => setHasHydrated(true));
        }
        const unsub = useProjectStore.persist?.onFinishHydration?.(() => setHasHydrated(true));
        return () => unsub?.();
    }, []);

    useEffect(() => {
        if (hasHydrated) {
            setSortBy('name');
            setSortDirection('asc');
            setFilter('all');
        }
    }, [hasHydrated, setSortBy, setSortDirection, setFilter]);

    const deriveSortOption = (by: SortOption, direction: SortDirection) => {
        if (by === 'name' && direction === 'asc') return 'alphabetical';
        if (by === 'startDate' && direction === 'asc') return 'recent';
        if (by === 'endDate' && direction === 'asc') return 'deadline';
        return 'alphabetical';
    };

    const sortOption = useMemo(() => deriveSortOption(sortBy, sortDirection), [sortBy, sortDirection]);

    const filteredProjects = hasHydrated ? getFilteredProjects() : [];
    const isSearchActive = searchQuery.length >= 3;

    if (!hasHydrated) {
        return null;
    }

    const isEmpty = projects.length === 0;

    const ProjectsEmptyState = (
        <div className="bg-content-background my-15 mx-card-x flex flex-1 justify-center items-center rounded">
            <div className="flex flex-col justify-center items-center gap-6">
                <p className="heading-2xl text-center align-middle">Nenhum projeto</p>
                <span className="text-description mb-2 font-normal text-base leading-22 text-center">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>
                <Button 
                    variant="regular"
                    size="large"
                    icon={<Image src="/images/plus-circle.svg" alt="Plus Circle" width={24} height={24} />} 
                    title="Novo projeto" 
                    action={() => router.push('/projects/new')} 
                />
            </div>
        </div>
    );

    if (isEmpty) {
        return ProjectsEmptyState;
    }

    return (
        <div className="my-15 mx-card-x">
            {!isSearchActive ? (
                <div className="flex items-center justify-between mb-[22px]">
                    <div className="flex items-center gap-2">
                        <p className="heading-2xl">Projetos</p>
                        <span className="text-accent font-normal text-[17px] leading-none tracking-normal align-middle">({projects.length})</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <CustomSwitch 
                                checked={filter === 'favorites'}
                                onChange={(_event, checked) => setFilter(checked ? 'favorites' : 'all')}
                            />
                            <span className="font-normal text-base leading-22 tracking-normal text-text-dark">Apenas Favoritos</span>
                        </div>

                        <div>
                            <Select
                                name="orderBy"
                                id="orderBy"
                                value={sortOption}
                                onChange={(e) => {
                                    const value = e.target.value as string;
                                    
                                    switch(value) {
                                        case 'alphabetical':
                                            setSortBy('name');
                                            setSortDirection('asc');
                                            break;
                                        case 'recent':
                                            setSortBy('startDate');
                                            setSortDirection('asc');
                                            break;
                                        case 'deadline':
                                            setSortBy('endDate');
                                            setSortDirection('asc');
                                            break;
                                    }
                                }}
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
                            variant="regular"
                            size="medium"
                            icon={<Image src="/images/plus-circle.svg" alt="Plus Circle" width={24} height={24} />} 
                            title="Novo projeto" 
                            action={() => router.push('/projects/new')} 
                        />
                    </div>
                </div>
            ) : (
                <div className="mt-2">
                    <BackButton href="/" onClick={() => setSearchQuery("")} />

                    <p className="heading-2xl mb-8">Resultado da busca</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} highlightQuery={searchQuery} />
                ))}
            </div>
        </div>
    );
}