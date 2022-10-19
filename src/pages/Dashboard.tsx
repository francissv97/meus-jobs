import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";
import { Footer } from "../components/Footer";

export function Dashboard() {
  return (
    <div className="flex flex-col justify-between bg-gradient-to-t from-zinc-400 via-zinc-300 to-zinc-200 min-h-screen">
      <Header />

      <div
        className="flex flex-col gap-4 mt-4 max-w-4xl mx-auto -translate-y-12 w-full px-4"
      >
        <JobCard
          name=" JobWorkFrellaNamessssssssssss"
          deadline="ENCERRADO"
          value={450.75}
          status="CLOSED"
        />

        <JobCard
          name=" JobWorkFrellaNamessssssssssss"
          deadline="ENCERRADO"
          value={450.75}
          status="CLOSED"
        />

        <JobCard
          name=" JobWorkFrellaNamessssssssssss"
          deadline="ENCERRADO"
          value={450.75}
          status="CLOSED"
        />
      </div>

      <Footer />
    </div>
  );
}
