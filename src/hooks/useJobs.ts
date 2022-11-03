import { useContext } from "react";
import { JobsContext } from "../contexts/JobsContext";

export function useJobs() {
  return useContext(JobsContext);
}
