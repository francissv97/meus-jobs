import { useAuth } from "../hooks/useAuth";
import { UserInfo } from "./UserInfo";
import { Logo } from "./Logo";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { AddNewJobModal } from "./AddNewJobModal";

interface Props {
  totalJobs: number;
  inProgressJobs: number;
  finalizedsJobs: number;
}

export function Header({ totalJobs, inProgressJobs, finalizedsJobs }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="bg-zinc-600 pt-4 pb-16 px-4">
      <div className="flex flex-col justify-between gap-6 max-w-4xl mx-auto">
        <div className="flex w-full items-center justify-between">
          <Logo />

          {user && <UserInfo name={user.name} avatar={user.avatar} />}
        </div>

        <div className="flex justify-between gap-x-2 gap-y-4 flex-wrap">
          <div className="flex gap-2">
            <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {totalJobs}
              </strong>
              Total
            </p>

            {/* <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {inProgressJobs}
              </strong>
              Em andamento
            </p> */}

            {/* <p className="flex flex-col text-zinc-300">
              <strong className="font-normal text-2xl text-zinc-100">
                {finalizedsJobs}
              </strong>
              Finalizados
            </p> */}
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
