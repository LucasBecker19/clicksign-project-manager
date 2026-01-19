import { projectFormSchema } from '@/components/ProjectForm';

describe('projectFormSchema', () => {
  describe('name validation', () => {
    it('should require at least two words', () => {
      const result = projectFormSchema.safeParse({
        name: 'OnlyOneWord',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(false);
    });

    it('should accept two or more words', () => {
      const result = projectFormSchema.safeParse({
        name: 'Two Words',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(true);
    });

    it('should trim whitespace', () => {
      const result = projectFormSchema.safeParse({
        name: '  Two Words  ',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('client validation', () => {
    it('should require at least one word', () => {
      const result = projectFormSchema.safeParse({
        name: 'Test Project',
        client: '',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(false);
    });

    it('should accept one or more words', () => {
      const result = projectFormSchema.safeParse({
        name: 'Test Project',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('date validation', () => {
    it('should require startDate', () => {
      const result = projectFormSchema.safeParse({
        name: 'Test Project',
        client: 'Test Client',
        startDate: '',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(false);
    });

    it('should require endDate', () => {
      const result = projectFormSchema.safeParse({
        name: 'Test Project',
        client: 'Test Client',
        startDate: '2026-01-19',
        endDate: '',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('valid form', () => {
    it('should accept valid form data', () => {
      const result = projectFormSchema.safeParse({
        name: 'My Amazing Project',
        client: 'ACME Corp',
        startDate: '2026-01-19',
        endDate: '2026-02-19',
      });

      expect(result.success).toBe(true);
    });
  });
});
