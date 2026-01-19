"use client";

import BackButton from "./BackButton";
import ProjectsEmpty from "./ProjectsEmpty";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsGrid from "./ProjectsGrid";
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

    if (isEmpty) {
        return <ProjectsEmpty onCreateProject={() => router.push('/projects/new')} />;
    }

    return (
        <div className="my-15 mx-card-x">
            {!isSearchActive ? (
                <ProjectsFilters
                    totalCount={projects.length}
                    filter={filter}
                    sortOption={sortOption}
                    onFilterChange={setFilter}
                    onSortChange={(value) => {
                        switch (value) {
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
                    onCreateProject={() => router.push('/projects/new')}
                />
            ) : (
                <div className="mt-2">
                    <BackButton href="/" onClick={() => setSearchQuery("")} />

                    <p className="heading-2xl mb-8">Resultado da busca</p>
                </div>
            )}

            <ProjectsGrid projects={filteredProjects} highlightQuery={searchQuery} />
        </div>
    );
}