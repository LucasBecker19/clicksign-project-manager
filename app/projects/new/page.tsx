import Header from "@/components/Header";
import ProjectForm from "@/components/ProjectForm";
import Image from "next/image";
import Link from "next/link";

export default function NewProject() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
        <Header />

        <div className="py-[67px] px-[45px]">
            <Link href="/" className="flex items-center gap-2 cursor-pointer mb-2">
                <Image src="/images/arrow-left.svg" alt="back button" width={16} height={16} />
                <span className="align-middle text-accent">Voltar</span>
            </Link>

            <p className="heading-2xl mb-8">Novo projeto</p>
            <ProjectForm />
        </div>
    </main>
  );
}
