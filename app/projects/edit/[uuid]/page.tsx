'use client';

import Header from "@/components/Header";
import ProjectForm from "@/components/ProjectForm";
import Image from "next/image";
import Link from "next/link";
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
            <Link href="/" className="flex items-center gap-2 cursor-pointer mb-2 w-fit">
                <Image src="/images/arrow-left.svg" alt="back button" width={16} height={16} />
                <span className="align-middle text-accent">Voltar</span>
            </Link>

            <p className="heading-2xl mb-8">Editar projeto</p>
            <ProjectForm initialProject={project} isEditMode={true} />
        </div>
    </main>
  );
}
