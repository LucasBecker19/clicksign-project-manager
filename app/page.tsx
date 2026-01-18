import Header from "@/components/Header";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Header />
      <Projects />
    </main>
  );
}
