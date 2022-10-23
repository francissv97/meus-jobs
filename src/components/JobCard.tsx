import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { Job, ProfileType } from "../types";
import {
  calculateJobDeadline,
  calculateJobValue,
  calculateUserValueHour,
} from "../utils";

interface JobCardProps extends Job {
  profileData: ProfileType | undefined;
}

export function JobCard(props: JobCardProps) {
  const { title, dailyHours, totalHours, createdAt, profileData } = props;

  const deadline = calculateJobDeadline(dailyHours, totalHours, createdAt);

  const deadlineContent =
    deadline > 1
      ? `${deadline} dias para a entrega`
      : deadline == 1
      ? `${deadline} dia para a entrega`
      : `Encerrado`;

  const jobInProgress = deadline > 0;

  const jobValue =
    profileData &&
    calculateJobValue(
      totalHours,
      calculateUserValueHour(
        profileData.hoursPerDay,
        profileData.daysPerWeek,
        profileData.monthlyBudget,
        profileData.vacationPerYear
      )
    );

  return (
    <div className="grid grid-cols-3 bg-zinc-100 gap-4 px-4 py-6 rounded shadow-xl">
      <div className="flex col-span-2 flex-col gap-2">
        <div id="JobName" className="flex items-center">
          <span className="text-zinc-700 text-xl font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
        </div>

        {deadline && (
          <div id="JobPrazo" className="flex flex-col">
            <span className="text-sm text-zinc-500">Prazo</span>
            <span className="text-zinc-700">{deadlineContent}</span>
          </div>
        )}

        <div id="JobValor" className="flex flex-col justify-center">
          <span className="text-sm text-zinc-500">Valor</span>
          <span className="text-zinc-700">
            {jobValue &&
              jobValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div
          className={`${
            jobInProgress
              ? "bg-green-300/20 text-green-700"
              : "bg-red-300/20 text-red-700 "
          } px-2 py-1 text-sm text-center rounded w-fit self-end`}
        >
          <span className="whitespace-nowrap">
            {jobInProgress ? "EM ANDAMENTO" : "ENCERRADO"}
          </span>
        </div>

        <div id="JobHomeComponentButtons" className="flex justify-end gap-2">
          <button
            id="JobEdit"
            className="flex items-center justify-center bg-zinc-500 text-white py-1 px-2 rounded transition hover:bg-zinc-400"
          >
            <PencilSimpleLine size={26} />
          </button>

          <button
            id="JobRemove"
            className="flex items-center justify-center bg-red-700 text-white py-1 px-2 rounded transition hover:bg-red-600"
          >
            <TrashSimple size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}
