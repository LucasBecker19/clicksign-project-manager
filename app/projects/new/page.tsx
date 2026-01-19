import Header from "@/components/Header";
import ProjectForm from "@/components/ProjectForm";
import BackButton from "@/components/BackButton";

export default function NewProject() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
        <Header />

        <div className="py-[67px] px-[45px]">
            <BackButton href="/" />

            <p className="heading-2xl mb-8">Novo projeto</p>
            <ProjectForm />
        </div>
    </main>
  );
}
