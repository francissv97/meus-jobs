import { useState } from "react";
import { Modal } from "antd";
import { Job, ProfileType } from "../types";
import {
  calculateJobDeadline,
  calculateJobValue,
  calculateUserValueHour,
} from "../utils";
import { EditJobModal } from "./EditJobModal";
import { PencilSimpleLine, TrashSimple } from "phosphor-react";

interface JobCardProps extends Job {
  profileData: ProfileType | undefined;
  onClickRemoveJob: () => void;
}

export function JobCard({
  id,
  title,
  dailyHours,
  totalHours,
  createdAt,
  profileData,
  onClickRemoveJob,
}: JobCardProps) {
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);

  const { confirm } = Modal;

  const handleEditJobModalClose = () => setIsEditJobModalOpen(false);

  const showConfirmDeleteJob = () => {
    confirm({
      content: (
        <>
          <strong className="font-normal text-zinc-600 text-xl">
            Excluir job?
          </strong>

          <p className="text-lg text-zinc-600 mt-4">
            O job <span className="text-red-600 text-xl">{title}</span> será
            apagado permanentemente.
          </p>
        </>
      ),
      cancelText: "Cancelar",
      okText: "EXCLUIR",
      okType: "danger",
      onOk: onClickRemoveJob,
    });
  };

  const deadline = calculateJobDeadline(dailyHours, totalHours, createdAt);

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

        <div className="flex justify-end gap-4">
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

      <EditJobModal
        open={isEditJobModalOpen}
        closeModal={handleEditJobModalClose}
        id={id}
        title={title}
        dailyHours={dailyHours}
        totalHours={totalHours}
      />
    </div>
  );
}
