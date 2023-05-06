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
    calculateJobValue(job.totalHours, calculateUserValueHour(profileData));

  return (
    <div
      className={`flex flex-col bg-zinc-100 gap-2 p-4 rounded shadow-xl ${
        job.markedAsDone
          ? "border-l-4 border-green-600"
          : jobInProgress
          ? "border-l-4 border-sky-700"
          : "border-l-4 border-red-700"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row-reverse flex-wrap gap-x-2">
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
              } py-1 px-2 rounded-full duration-300`}
            >
              {job.markedAsDone ? (
                <Checks size={32} />
              ) : (
                <CheckCircle size={32} />
              )}
            </button>
          </div>

          <span className="text-zinc-700 text-lg md:text-xl font-medium mt-2 mr-auto">
            {job.title}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-zinc-500">Prazo</span>
          <span className="text-zinc-700 text-base">
            {job.markedAsDone
              ? "Encerrado"
              : jobInProgress
              ? deadlineContent
              : "PRAZO MAX. ATINGIDO"}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm text-zinc-600">Valor</span>
          <span className="text-zinc-700 text-base min-h-[20px]">
            {jobValue &&
              jobValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </div>

        <div className="ml-auto">
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
      </div>

      <EditJobModal
        open={isEditJobModalOpen}
        closeModal={handleEditJobModalClose}
        job={job}
      />
    </div>
  );
}
