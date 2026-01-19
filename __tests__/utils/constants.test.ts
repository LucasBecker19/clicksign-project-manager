import { SORT_CONFIG, SEARCH } from '@/utils/constants';

describe('constants', () => {
  describe('SORT_CONFIG', () => {
    it('should have alphabetical, recent, and deadline options', () => {
      expect(SORT_CONFIG.alphabetical).toBeDefined();
      expect(SORT_CONFIG.recent).toBeDefined();
      expect(SORT_CONFIG.deadline).toBeDefined();
    });

    it('alphabetical should sort by name asc', () => {
      expect(SORT_CONFIG.alphabetical.sortBy).toBe('name');
      expect(SORT_CONFIG.alphabetical.sortDirection).toBe('asc');
    });

    it('recent should sort by startDate desc', () => {
      expect(SORT_CONFIG.recent.sortBy).toBe('startDate');
      expect(SORT_CONFIG.recent.sortDirection).toBe('desc');
    });

    it('deadline should sort by endDate asc', () => {
      expect(SORT_CONFIG.deadline.sortBy).toBe('endDate');
      expect(SORT_CONFIG.deadline.sortDirection).toBe('asc');
    });
  });

  describe('SEARCH', () => {
    it('should have debounce, min length, and max history', () => {
      expect(SEARCH.DEBOUNCE_MS).toBe(300);
      expect(SEARCH.MIN_LENGTH).toBe(3);
      expect(SEARCH.MAX_HISTORY).toBe(5);
    });
  });
});
