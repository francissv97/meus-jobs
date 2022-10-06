import { useAuth } from "../hooks/useAuth";
import { createUserDocument } from "../hooks/useFirestore";
import { UserInfo } from "./UserInfo";
import { Logo } from "./Logo";
import { Plus } from "phosphor-react";

export function Header() {
  const { user } = useAuth();

  return (
    <div className="bg-zinc-600 pt-4 pb-16">
      <div className="flex flex-col items-center justify-between gap-6 max-w-4xl mx-auto">
        <div className="flex w-full items-center justify-between px-4">
          <Logo />

          {user !== "OFF" && user && (
            <UserInfo name={user.name} avatar={user.avatar} />
          )}
        </div>

        <button
          // onClick={() => createUserDocument("francissv97@gamil.com")}
          className="flex items-center gap-2 bg-orange-500 text-zinc-100 text-lg p-2 rounded self-end mx-4"
        >
          <Plus size={26} />
          Adicionar job
        </button>
      </div>
    </div>
  );
}
