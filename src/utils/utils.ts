import { Timestamp } from "firebase/firestore";

export function generateJobID() {
  return Math.floor(Date.now() * Math.random()).toString(36);
}

export function calculateUserValueHour(
  hoursPerDay: number,
  daysPerWeek: number,
  monthlyBudget: number,
  vacationPerYear: number
) {
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
