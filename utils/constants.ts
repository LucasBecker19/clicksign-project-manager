import { SortDirection, SortOption } from '@/store/projectStore';

export const SEARCH = {
  DEBOUNCE_MS: 300,
  MIN_LENGTH: 3,
  MAX_HISTORY: 5,
} as const;

export type SortOptionUI = 'alphabetical' | 'recent' | 'deadline';

export const SORT_CONFIG = {
  alphabetical: { sortBy: 'name' as SortOption, sortDirection: 'asc' as SortDirection },
  recent: { sortBy: 'startDate' as SortOption, sortDirection: 'desc' as SortDirection },
  deadline: { sortBy: 'endDate' as SortOption, sortDirection: 'asc' as SortDirection },
} as const satisfies Record<SortOptionUI, { sortBy: SortOption; sortDirection: SortDirection }>;
