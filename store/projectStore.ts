import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, CreateProjectInput, UpdateProjectInput } from '@/types/project';
import { SEARCH } from '@/utils/constants';

export type SortOption = 'name' | 'startDate' | 'endDate';
export type SortDirection = 'asc' | 'desc';
export type FilterOption = 'all' | 'favorites';

interface ProjectState {
  projects: Project[];
  sortBy: SortOption;
  sortDirection: SortDirection;
  filter: FilterOption;
  searchQuery: string;
  searchHistory: string[];
  
  // Actions
  addProject: (project: CreateProjectInput) => void;
  updateProject: (project: UpdateProjectInput) => void;
  deleteProject: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  setSortBy: (sortBy: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  setFilter: (filter: FilterOption) => void;
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
  removeFromSearchHistory: (query: string) => void;
  getFilteredProjects: () => Project[];
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      sortBy: 'name',
      sortDirection: 'asc',
      filter: 'all',
      searchQuery: '',
      searchHistory: [],

      addProject: (projectInput: CreateProjectInput) => {
        const newProject: Project = {
          ...projectInput,
          id: crypto.randomUUID(),
          isFavorite: false,
        };
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
      },

      updateProject: (projectUpdate: UpdateProjectInput) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectUpdate.id
              ? {
                  ...project,
                  ...projectUpdate,
                }
              : project
          ),
        }));
      },

      deleteProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },

      toggleFavorite: (id: string) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  isFavorite: !project.isFavorite,
                }
              : project
          ),
        }));
      },

      getProjectById: (id: string) => {
        return get().projects.find((project) => project.id === id);
      },

      setSortBy: (sortBy: SortOption) => {
        set({ sortBy });
      },

      setSortDirection: (direction: SortDirection) => {
        set({ sortDirection: direction });
      },

      setFilter: (filter: FilterOption) => {
        set({ filter });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      addToSearchHistory: (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        set((state) => {
          const filteredHistory = state.searchHistory.filter(
            (item) => item.toLowerCase() !== trimmedQuery.toLowerCase()
          );
          const newHistory = [trimmedQuery, ...filteredHistory].slice(0, SEARCH.MAX_HISTORY);
          return { searchHistory: newHistory };
        });
      },

      removeFromSearchHistory: (query: string) => {
        set((state) => ({
          searchHistory: state.searchHistory.filter((item) => item !== query),
        }));
      },

      getFilteredProjects: () => {
        const { projects, filter, searchQuery, sortBy, sortDirection } = get();
        
        let filtered = projects;
        if (filter === 'favorites') {
          filtered = projects.filter((p) => p.isFavorite);
        }

        if (searchQuery.length >= 3) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(query) ||
              p.client.toLowerCase().includes(query)
          );
        }

        const sorted = [...filtered].sort((a, b) => {
          const aRaw = a[sortBy];
          const bRaw = b[sortBy];

          if (sortBy === 'startDate' || sortBy === 'endDate') {
            const aValue = Date.parse(aRaw as string) || 0;
            const bValue = Date.parse(bRaw as string) || 0;
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
          }

          const result = (aRaw as string).localeCompare(bRaw as string, undefined, { sensitivity: 'base' });
          return sortDirection === 'asc' ? result : -result;
        });

        return sorted;
      },
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;
