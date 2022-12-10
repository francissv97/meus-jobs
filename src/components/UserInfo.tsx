import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Popover } from "antd";
import { CaretDown, User, SignOut } from "phosphor-react";

interface Props {
  name: string;
  avatar: string;
}

export function UserInfo({ name, avatar }: Props) {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  return (
    <Popover
      placement="bottomRight"
      content={
        <div className="flex flex-col gap-2">
          <strong className="font-medium text-lg text-zinc-600">{name}</strong>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center gap-1 p-1 text-base text-sky-600 border border-sky-600 hover:text-sky-500 hover:border-sky-500 rounded"
          >
            <User size={22} />
            Perfil
          </button>

          <button
            className="flex items-center justify-center gap-1 p-1 text-base text-red-600 border border-red-600 hover:text-red-500 hover:border-red-500 rounded"
            onClick={logOut}
          >
            <SignOut size={22} />
            Sair
          </button>
        </div>
      }
    >
      <div className="flex gap-1 items-center justify-center cursor-pointer">
        <img
          src={avatar}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-10 rounded-full"
        />

        <CaretDown size={16} className="text-zinc-300" />
      </div>
    </Popover>
  );
}
