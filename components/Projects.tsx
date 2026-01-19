"use client";

import BackButton from "./BackButton";
import ProjectsEmpty from "./ProjectsEmpty";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsGrid from "./ProjectsGrid";
import { useRouter } from "next/navigation";
import { useProjectsListing } from "@/hooks/useProjectsListing";

export default function Projects () {
    const router = useRouter();
    const {
        projects,
        filter,
        sortOption,
        isEmpty,
        isSearchActive,
        filteredProjects,
        hasHydrated,
        setFilter,
        searchQuery,
        setSearchQuery,
        handleSortChange,
    } = useProjectsListing();

    if (!hasHydrated) {
        return null;
    }

    if (isEmpty) {
        return <ProjectsEmpty onCreateProject={() => router.push('/projects/new')} />;
    }

    return (
        <div className="my-15 mx-[38px]">
            {!isSearchActive ? (
                <ProjectsFilters
                    totalCount={projects.length}
                    filter={filter}
                    sortOption={sortOption}
                    onFilterChange={setFilter}
                    onSortChange={handleSortChange}
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