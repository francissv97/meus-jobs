export interface Profile {
  monthlyBudget: number;
  hoursPerDay: number;
  daysPerWeek: number;
  vacationPerYear: number;
  valueHour: number;
}

export interface Job {
  id: number;
  name: string;
  dailyHours: number;
  totalHours: number;
  createdAt: number;
}
