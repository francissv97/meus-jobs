import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";

export function Home() {
  return (
    <div>
      <Header />

      <div id="ContainerJobsList" className="flex flex-col gap-4 mt-4 max-w-4xl mx-auto -translate-y-12">
        <JobCard />
        {/* <JobCard />
        <JobCard /> */}
      </div>
    </div>
  );
}
