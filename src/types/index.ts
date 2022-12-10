import { Timestamp } from "firebase/firestore";

export interface UserAuth {
  id: string;
  name: string;
  avatar: string;
  email: string | null;
}

export interface UserFirestoreDocData {
  profile: ProfileType;
  jobs: Job[];
}

export interface ProfileType {
  daysPerWeek: number;
  hoursPerDay: number;
  monthlyBudget: number;
  vacationPerYear: number;
}

export interface AddNewJobFieldValues {
  title: string;
  dailyHours: number;
  totalHours: number;
}

export interface Job {
  id: string;
  title: string;
  dailyHours: number;
  totalHours: number;
  createdAt: Timestamp;
}
