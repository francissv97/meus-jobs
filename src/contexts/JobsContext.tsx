import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Job } from "../types";

interface AllJobsInterface {
  jobs: Job[] | undefined;
  setJobs: Dispatch<SetStateAction<Job[] | undefined>>;
}

interface AllJobsContextProviderProps {
  children: ReactNode;
}

export const JobsContext = createContext({} as AllJobsInterface);

export function JobsContextProvider({ children }: AllJobsContextProviderProps) {
  const [jobs, setJobs] = useState<Job[]>();

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
}
