import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Job } from "../types";

interface AllJobsInterface {
  allJobs: Job[] | undefined;
  setAllJobs: Dispatch<SetStateAction<Job[] | undefined>>;
}

interface AllJobsContextProviderProps {
  children: ReactNode;
}

export const AllJobsContext = createContext({} as AllJobsInterface);

export function AllJobsContextProvider({ children }: AllJobsContextProviderProps) {
  const [allJobs, setAllJobs] = useState<Job[]>();

  return (
    <AllJobsContext.Provider value={{ allJobs, setAllJobs }}>
      {children}
    </AllJobsContext.Provider>
  );
}
