import { useState } from "react";
import { Modal } from "antd";
import { Job, ProfileType, UserAuth } from "../types";
import {
  calculateJobDeadline,
  calculateJobValue,
  calculateUserValueHour,
} from "../utils";
import { EditJobModal } from "./EditJobModal";
import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { removeJob } from "../hooks/useFirestore";
import { useAuth } from "../hooks/useAuth";

interface JobCardProps {
  job: Job;
  profileData: ProfileType | undefined;
}

export function JobCard({ job, profileData }: JobCardProps) {
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);

  const { user } = useAuth();
  const { confirm } = Modal;

  const showConfirmDeleteJob = () => {
    confirm({
      content: (
        <>
          <div className="flex gap-4">
            <TrashSimple size={32} className="text-red-600 animate-bounce" />
            <strong className="font-normal text-zinc-600 text-xl">
              Excluir job?
            </strong>
          </div>

          <p className="text-lg text-zinc-600 mt-4">
            O job <span className="text-red-600 text-xl">{job.title}</span> será
            apagado permanentemente.
          </p>
        </>
      ),
      cancelText: "Cancelar",
      okText: "EXCLUIR",
      okType: "danger",
      icon: null,
      onOk: () => user && removeJob(user, job),
    });
  };

  const deadline = calculateJobDeadline(
    job.dailyHours,
    job.totalHours,
    job.createdAt
  );

  function handleEditJobModalClose() {
    setIsEditJobModalOpen(false);
  }

  const deadlineContent =
    deadline === 1
      ? `${deadline} dia para a entrega`
      : deadline > 1
      ? `${deadline} dias para a entrega`
      : `Encerrado`;

  const jobInProgress = deadline > 0;

  const jobValue =
    profileData &&
    calculateJobValue(
      job.totalHours,
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
          <span className="text-zinc-700 text-xl font-medium overflow-hidden text-ellipsis">
            {job.title}
          </span>
        </div>

        {deadline ? (
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500">Prazo</span>
            <span className="text-zinc-700">{deadlineContent}</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500">Prazo</span>
            <span className="text-zinc-700">Encerrado</span>
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

        <div className="flex justify-end gap-2 md:gap-4">
          <button
            onClick={() => setIsEditJobModalOpen(true)}
            className="flex items-center justify-center text-zinc-500 py-1 px-2 rounded-full border border-transparent transition hover:border-zinc-700 hover:text-zinc-700"
          >
            <PencilSimpleLine size={32} />
          </button>

          <button
            onClick={showConfirmDeleteJob}
            className="text-red-700 py-1 px-2 rounded-full border border-transparent transition hover:border-red-500 hover:text-red-500"
          >
            <TrashSimple size={32} />
          </button>
        </div>
      </div>

      {isEditJobModalOpen && (
        <EditJobModal
          open={isEditJobModalOpen}
          closeModal={handleEditJobModalClose}
          job={job}
        />
      )}
    </div>
  );
}
