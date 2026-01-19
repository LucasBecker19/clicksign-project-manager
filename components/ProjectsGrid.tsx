"use client";

import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectsGridProps {
  projects: Project[];
  highlightQuery: string;
}

export default function ProjectsGrid({ projects, highlightQuery }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} highlightQuery={highlightQuery} />
      ))}
    </div>
  );
}
