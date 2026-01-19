import { formatDate } from '@/utils/date';

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const result = formatDate('2026-01-19');
    expect(result).toContain('19');
    expect(result).toContain('janeiro');
    expect(result).toContain('2026');
  });

  it('should handle different dates', () => {
    const result = formatDate('2025-12-25');
    expect(result).toContain('25');
    expect(result).toContain('dezembro');
  });
});
