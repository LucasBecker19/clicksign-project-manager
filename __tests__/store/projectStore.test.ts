import useProjectStore from '@/store/projectStore';

// Reset store state before each test
beforeEach(() => {
  useProjectStore.setState({
    projects: [],
    sortBy: 'name',
    sortDirection: 'asc',
    filter: 'all',
    searchQuery: '',
    searchHistory: [],
  });
});

describe('projectStore', () => {
  describe('addProject', () => {
    it('should add a new project', () => {
      const state = useProjectStore.getState();
      state.addProject({
        name: 'Test Project',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      const projects = useProjectStore.getState().projects;
      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe('Test Project');
      expect(projects[0].isFavorite).toBe(false);
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite status', () => {
      const state = useProjectStore.getState();
      state.addProject({
        name: 'Test Project',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      let projects = useProjectStore.getState().projects;
      const projectId = projects[0].id;

      state.toggleFavorite(projectId);
      projects = useProjectStore.getState().projects;
      expect(projects[0].isFavorite).toBe(true);

      state.toggleFavorite(projectId);
      projects = useProjectStore.getState().projects;
      expect(projects[0].isFavorite).toBe(false);
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', () => {
      const state = useProjectStore.getState();
      state.addProject({
        name: 'Test Project',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      let projects = useProjectStore.getState().projects;
      const projectId = projects[0].id;

      state.deleteProject(projectId);
      projects = useProjectStore.getState().projects;
      expect(projects).toHaveLength(0);
    });
  });

  describe('setFilter', () => {
    it('should set filter to favorites', () => {
      const state = useProjectStore.getState();
      state.setFilter('favorites');
      
      const filter = useProjectStore.getState().filter;
      expect(filter).toBe('favorites');
    });

    it('should set filter to all', () => {
      const state = useProjectStore.getState();
      state.setFilter('all');
      
      const filter = useProjectStore.getState().filter;
      expect(filter).toBe('all');
    });
  });

  describe('setSortBy', () => {
    it('should set sort by field', () => {
      const state = useProjectStore.getState();
      state.setSortBy('startDate');
      
      const sortBy = useProjectStore.getState().sortBy;
      expect(sortBy).toBe('startDate');
    });
  });

  describe('addToSearchHistory', () => {
    it('should add query to search history', () => {
      const state = useProjectStore.getState();
      state.addToSearchHistory('test query');
      
      const history = useProjectStore.getState().searchHistory;
      expect(history).toContain('test query');
    });

    it('should limit history to 5 items', () => {
      const state = useProjectStore.getState();
      
      for (let i = 0; i < 10; i++) {
        state.addToSearchHistory(`query ${i}`);
      }
      
      const history = useProjectStore.getState().searchHistory;
      expect(history).toHaveLength(5);
    });

    it('should not add empty queries', () => {
      const state = useProjectStore.getState();
      state.addToSearchHistory('');
      state.addToSearchHistory('   ');
      
      const history = useProjectStore.getState().searchHistory;
      expect(history).toHaveLength(0);
    });
  });

  describe('getFilteredProjects', () => {
    it('should filter projects by favorites', () => {
      const state = useProjectStore.getState();
      
      state.addProject({
        name: 'Project 1',
        client: 'Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      state.addProject({
        name: 'Project 2',
        client: 'Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      const projects = useProjectStore.getState().projects;
      state.toggleFavorite(projects[0].id);

      state.setFilter('favorites');
      const filtered = state.getFilteredProjects();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Project 1');
    });

    it('should search projects by name', () => {
      const state = useProjectStore.getState();
      
      state.addProject({
        name: 'Design Project',
        client: 'Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      state.addProject({
        name: 'Development Project',
        client: 'Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      state.setSearchQuery('design');
      const filtered = state.getFilteredProjects();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Design Project');
    });
  });
});
