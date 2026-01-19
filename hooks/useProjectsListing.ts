import { useCallback, useEffect, useMemo, useState } from "react";
import useProjectStore, { FilterOption, SortDirection, SortOption } from "@/store/projectStore";
import { Project } from "@/types/project";
import { SORT_CONFIG, SortOptionUI } from "@/utils/constants";

type UseProjectsListingResult = {
  projects: Project[];
  filter: FilterOption;
  sortOption: SortOptionUI;
  isEmpty: boolean;
  isSearchActive: boolean;
  filteredProjects: Project[];
  hasHydrated: boolean;
  searchQuery: string;
  setFilter: (filter: FilterOption) => void;
  setSearchQuery: (query: string) => void;
  handleSortChange: (value: SortOptionUI) => void;
};

const deriveSortOption = (by: SortOption, direction: SortDirection): SortOptionUI => {
  return (
    Object.entries(SORT_CONFIG).find(
      ([, config]) => config.sortBy === by && config.sortDirection === direction
    )?.[0] as SortOptionUI
  ) ?? "alphabetical";
};

export function useProjectsListing(): UseProjectsListingResult {
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
      return;
    }
    const unsub = useProjectStore.persist?.onFinishHydration?.(() => setHasHydrated(true));
    return () => unsub?.();
  }, []);

  const sortOption = useMemo(() => deriveSortOption(sortBy, sortDirection), [sortBy, sortDirection]);

  const filteredProjects = hasHydrated ? getFilteredProjects() : [];
  const isSearchActive = searchQuery.length >= 3;
  const isEmpty = projects.length === 0;

  const handleSortChange = useCallback(
    (value: SortOptionUI) => {
      const config = SORT_CONFIG[value];
      setSortBy(config.sortBy);
      setSortDirection(config.sortDirection);
    },
    [setSortBy, setSortDirection]
  );

  return {
    projects,
    filter,
    sortOption,
    isEmpty,
    isSearchActive,
    filteredProjects,
    hasHydrated,
    searchQuery,
    setFilter,
    setSearchQuery,
    handleSortChange,
  };
}
