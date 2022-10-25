import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserInfo } from "./UserInfo";
import { Logo } from "./Logo";
import { AddNewJobModal } from "./AddNewJobModal";
import { Job } from "../types";
import { calculateFreeTimeDay, calculateJobsNumbers } from "../utils";
import { CircleNotch, Plus } from "phosphor-react";
import { Divider } from "antd";

interface Props {
  jobs: Job[] | undefined;
  profileHoursPerDay: number | undefined;
}

export function Header({ jobs, profileHoursPerDay }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const numbers = jobs && calculateJobsNumbers(jobs);
  const freeTimeDay =
    profileHoursPerDay &&
    jobs &&
    calculateFreeTimeDay(profileHoursPerDay, jobs);

  const { user } = useAuth();

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="bg-gradient-to-t from-zinc-700 via-zinc-600 to-zinc-600 pt-4 pb-16">
      <div className="flex flex-col justify-between max-w-4xl mx-auto">
        <div className="flex w-full items-center justify-between px-4">
          <Logo />

          {user && <UserInfo name={user.name} avatar={user.avatar} />}
        </div>

        <div className="px-4">
          <Divider style={{ borderColor: "#71717a" }}>
            {!freeTimeDay ? (
              <CircleNotch className="text-zinc-500 animate-spin" size={32} />
            ) : freeTimeDay > 1 ? (
              <p className="text-sm sm:text-base text-emerald-500 font-normal">{`${freeTimeDay} horas livres ao dia`}</p>
            ) : freeTimeDay == 1 ? (
              <p className="text-sm sm:text-base text-amber-500 font-normal">{`${freeTimeDay} hora livre ao dia`}</p>
            ) : (
              <p className="text-sm sm:text-base text-red-500 font-normal">
                Sem horas livres ao dia
              </p>
            )}
          </Divider>
        </div>

        <div className="flex justify-between gap-x-2 gap-y-4 flex-wrap px-4">
          <div className="flex">
            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {jobs?.length}
              </strong>
              Total
            </p>

            <div className="bg-zinc-500 h-full w-[1px] mx-2"></div>

            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {numbers?.inProgress}
              </strong>
              Em andamento
            </p>

            <div className="bg-zinc-500 h-full w-[1px] mx-2"></div>

            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {numbers?.closeds}
              </strong>
              Encerrados
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-orange-500 text-zinc-100 text-base sm:text-lg p-2 h-fit my-auto rounded ml-auto"
          >
            <Plus size={22} />
            Adicionar job
          </button>
        </div>
      </div>

      <AddNewJobModal open={isModalOpen} closeModal={handleModalClose} />
    </div>
  );
}
