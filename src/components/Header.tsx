import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserInfo } from "./UserInfo";
import { Logo } from "./Logo";
import { AddNewJobModal } from "./AddNewJobModal";
import { Job } from "../types";
import { calculateJobsNumbers } from "../utils";
import { Plus } from "phosphor-react";

interface Props {
  jobs: Job[] | undefined;
}

export function Header({ jobs }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const numbers = jobs && calculateJobsNumbers(jobs);

  const { user } = useAuth();

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="bg-zinc-600 pt-4 pb-16">
      <div className="flex flex-col justify-between gap-6 max-w-4xl mx-auto">
        <div className="flex w-full items-center justify-between px-4">
          <Logo />

          {user && <UserInfo name={user.name} avatar={user.avatar} />}
        </div>

        <div className="flex justify-between gap-x-2 gap-y-4 flex-wrap px-4">
          <div className="flex gap-2">
            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {jobs?.length}
              </strong>
              Total
            </p>

            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {numbers?.inProgress}
              </strong>
              Em andamento
            </p>

            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {numbers?.closeds}
              </strong>
              Encerrados
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 text-zinc-100 text-lg p-2 rounded ml-auto"
          >
            <Plus size={26} />
            Adicionar job
          </button>
        </div>
      </div>

      <AddNewJobModal open={isModalOpen} closeModal={handleModalClose} />
    </div>
  );
}
