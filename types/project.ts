export interface Project {
  id: string;
  name: string;
  client: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
}

export type CreateProjectInput = Omit<Project, 'id' | 'isFavorite'>;
export type UpdateProjectInput = Partial<CreateProjectInput> & { id: string };
