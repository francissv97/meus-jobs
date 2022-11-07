import { useContext } from "react";
import { AllJobsContext } from "../contexts/JobsContext";

export function useAllJobs() {
  return useContext(AllJobsContext);
}
