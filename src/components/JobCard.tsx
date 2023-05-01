import { useState } from "react";
import { Modal } from "antd";
import { Job, ProfileType } from "../types";
import {
  calculateJobDeadline,
  calculateJobValue,
  calculateUserValueHour,
} from "../utils";
import { EditJobModal } from "./EditJobModal";
import {
  PencilSimpleLine,
  TrashSimple,
  CheckCircle,
  Checks,
} from "phosphor-react";
import { markJobAsDone, removeJob } from "../services/firestore";
import { useAuth } from "../hooks/useAuth";
import { useAllJobs } from "../hooks/useAllJobs";

interface JobCardProps {
  job: Job;
  profileData: ProfileType | undefined;
}

export function JobCard({ job, profileData }: JobCardProps) {
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const { user } = useAuth();
  const { allJobs } = useAllJobs();
  const { confirm } = Modal;

  const confirmMarkAsDoneJob = () => {
    confirm({
      content: (
        <p className="text-lg text-zinc-600">
          Marcar o job{" "}
          <span className="text-green-700 text-xl">{job.title}</span> como
          concluído?
        </p>
      ),
      style: { paddingInline: "8px" },
      cancelText: "Cancelar",
      cancelButtonProps: { type: "text" },
      okText: "Marcar como concluído",
      okType: "ghost",
      icon: null,
      onOk: () => {
        if (user && allJobs) markJobAsDone(user, allJobs, job);
      },
    });
  };

  const confirmDeleteJob = () => {
    confirm({
      content: (
        <>
          <div className="flex gap-4">
            <TrashSimple size={32} className="text-red-600" />
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
      style: { paddingInline: "8px" },
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
    <div
      className={`grid grid-cols-3 bg-zinc-100 gap-4 px-4 py-6 rounded shadow-xl ${
        job.markedAsDone
          ? "border-l-4 border-green-600"
          : jobInProgress
          ? "border-l-4 border-sky-700"
          : "border-l-4 border-red-700"
      }`}
    >
      <div className="flex col-span-2 flex-col gap-2">
        <div id="JobName" className="flex items-center">
          <span className="text-zinc-700 text-xl font-medium overflow-hidden text-ellipsis">
            {job.title}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-zinc-500">Prazo</span>
          <span className="text-zinc-700">
            {job.markedAsDone
              ? "Encerrado"
              : jobInProgress
              ? deadlineContent
              : "PRAZO MAX. ATINGIDO"}
          </span>
        </div>

        <div id="JobValor" className="flex flex-col justify-center">
          <span className="text-sm text-zinc-500">Valor</span>
          <span className="text-zinc-700 min-h-[20px] leading-none">
            {jobValue &&
              jobValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex self-end items-center">
          <div
            className={`${
              job.markedAsDone
                ? "bg-green-300/20 text-green-700"
                : jobInProgress
                ? "bg-sky-300/20 text-sky-700"
                : "bg-red-300/20 text-red-700"
            } px-2 py-1 text-sm text-center rounded h-fit w-fit`}
          >
            <span className="whitespace-nowrap font-medium">
              {job.markedAsDone
                ? "ENCERRADO"
                : jobInProgress
                ? "EM ANDAMENTO"
                : "PRAZO MAX. ATINGIDO"}
            </span>
          </div>

          <button
            onClick={confirmMarkAsDoneJob}
            disabled={job.markedAsDone}
            className={`${
              job.markedAsDone
                ? "text-green-700"
                : "text-zinc-500 hover:bg-green-50 hover:text-green-700 hover:shadow-lg"
            } py-1 px-1 ml-1 rounded-full duration-300`}
          >
            {job.markedAsDone ? (
              <Checks size={32} />
            ) : (
              <CheckCircle size={32} />
            )}
          </button>
        </div>

        <div className="flex justify-end gap-2 md:gap-4">
          {!job.markedAsDone && (
            <button
              onClick={() => setIsEditJobModalOpen(true)}
              className="text-zinc-500 py-1 px-2 rounded-full duration-300 hover:bg-zinc-50 hover:shadow-lg"
            >
              <PencilSimpleLine size={32} />
            </button>
          )}

          <button
            onClick={confirmDeleteJob}
            className="text-red-700 py-1 px-2 rounded-full duration-300 hover:bg-red-100 hover:shadow-lg"
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
