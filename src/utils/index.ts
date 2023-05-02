import { Timestamp } from "firebase/firestore";
import { Job } from "../types";

export function generateJobID() {
  return Math.floor(Date.now() * Math.random()).toString(36);
}

export function calculateUserValueHour(profile: {
  hoursPerDay: number;
  daysPerWeek: number;
  monthlyBudget: number;
  vacationPerYear: number;
}) {
  const { daysPerWeek, hoursPerDay, monthlyBudget, vacationPerYear } = profile;
  const weeksAYear = 52;
  const weeksAMonth = (weeksAYear - vacationPerYear) / 12;
  const totalHoursWorkedWeek = hoursPerDay * daysPerWeek;
  const hoursWorkedMonth = totalHoursWorkedWeek * weeksAMonth;
  const valueHour = monthlyBudget / hoursWorkedMonth;

  return parseFloat(valueHour.toFixed(2));
}

export function calculateJobValue(
  jobTotalHours: number,
  userValueHour: number
) {
  return jobTotalHours * userValueHour;
}

export function calculateJobDeadline(
  dailyHours: number,
  totalHours: number,
  createdAt: Timestamp
) {
  const daysRemaining = (totalHours / dailyHours).toFixed();
  const createdDate = new Date(createdAt.toMillis());
  const expirationDay = createdDate.getDate() + Number(daysRemaining);
  const expiryDayInMilliseconds = createdDate.setDate(expirationDay);
  const timeDifferenceInMilliseconds = expiryDayInMilliseconds - Date.now();
  const daysInMilliseconds = 1000 * 60 * 60 * 24;
  const daysDifference = Math.ceil(
    timeDifferenceInMilliseconds / daysInMilliseconds
  );

  return daysDifference;
}

export function countJobStatus(jobs: Job[]): {
  inProgress: number;
  closeds: number;
} {
  const { inProgress, closeds } = jobs.reduce(
    (acc, curr) => {
      if (!curr.markedAsDone) {
        acc.inProgress++;
      } else {
        acc.closeds++;
      }

      return acc;
    },
    { inProgress: 0, closeds: 0 }
  );

  return { inProgress, closeds };
}

function isJobUnfinished(job: Job): boolean {
  return !job.markedAsDone;
}

export function calculateFreeTimeDay(profileHoursPerDay: number, jobs: Job[]) {
  const unfinishedJobs = jobs.filter(isJobUnfinished);

  const jobDeadlines = unfinishedJobs.map((job) => {
    const deadline = calculateJobDeadline(
      job.dailyHours,
      job.totalHours,
      job.createdAt
    );

    return deadline > 0 ? job.dailyHours : 0;
  });

  const hoursPerDayAllJobs = jobDeadlines.reduce((acc, curr) => acc + curr, 0);

  return profileHoursPerDay - hoursPerDayAllJobs;
}
