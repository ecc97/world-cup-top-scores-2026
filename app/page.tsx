import { Header } from "@/app/components/Header";
import { ScorersList } from "@/app/components/ScorersList";


export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <ScorersList />
      </main>
    </div>
  );
}