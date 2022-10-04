import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";
import { Footer } from "../components/Footer";

export function Dashboard() {
  return (
    <>
      <Header />

      <div
        id="ContainerJobsList"
        className="flex flex-col gap-4 mt-4 max-w-4xl mx-auto -translate-y-12 min-h-[460px]"
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
      </div>

      <Footer />
    </>
  );
}
