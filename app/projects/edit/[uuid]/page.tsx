'use client';

import Header from "@/components/Header";
import ProjectForm from "@/components/ProjectForm";
import BackButton from "@/components/BackButton";
import { use } from "react";
import useProjectStore from "@/store/projectStore";
import { redirect } from "next/navigation";

interface EditProjectProps {
  params: Promise<{ uuid: string }>;
}

export default function EditProject({ params }: EditProjectProps) {
  const resolvedParams = use(params);
  const getProjectById = useProjectStore((state) => state.getProjectById);
  const project = getProjectById(resolvedParams.uuid);

  if (!project) {
    redirect('/');
  }

  return (
    <main className="bg-background min-h-screen flex flex-col">
        <Header />
        
        <div className="py-[67px] px-[45px]">
          <BackButton href="/" />

            <p className="heading-2xl mb-8">Editar projeto</p>
            <ProjectForm initialProject={project} isEditMode={true} />
        </div>
    </main>
  );
}
