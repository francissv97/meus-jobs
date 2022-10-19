export interface ProfileFieldValues {
  daysPerWeek: number;
  hoursPerDay: number;
  monthlyBudget: number;
  vacationPerYear: number;
}
export interface Profile extends ProfileFieldValues {
  valueHour: number;
}

export interface Job {
  id: number;
  name: string;
  dailyHours: number;
  totalHours: number;
  createdAt: number;
}
