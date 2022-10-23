import { useAuth } from "../hooks/useAuth";
import { UserInfo } from "./UserInfo";
import { Logo } from "./Logo";
import { Plus } from "phosphor-react";
import { addNewJob } from "../hooks/useFirestore";
import { useState } from "react";
import { AddNewJobModal } from "./AddNewJobModal";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="bg-zinc-600 pt-4 pb-16">
      <div className="flex flex-col items-center justify-between gap-6 max-w-4xl mx-auto">
        <div className="flex w-full items-center justify-between px-4">
          <Logo />

          {user && <UserInfo name={user.name} avatar={user.avatar} />}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 text-zinc-100 text-lg p-2 rounded self-end mx-4"
        >
          <Plus size={26} />
          Adicionar job
        </button>
      </div>

      <AddNewJobModal open={isModalOpen} closeModal={handleModalClose} />
    </div>
  );
}
