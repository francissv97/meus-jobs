import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Popover } from "antd";
import { SignOut, DotsThreeOutlineVertical } from "phosphor-react";

interface Props {
  name: string;
  avatar: string;
}

export function UserInfo({ name, avatar }: Props) {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  return (
    <Popover
      showArrow={false}
      placement="bottomRight"
      overlayStyle={{ paddingTop: 4, paddingInline: 0 }}
      overlayInnerStyle={{ width: 192, borderRadius: 8 }}
      content={
        <div className="flex flex-col gap-2 p-0">
          <strong className="block font-medium text-lg text-zinc-600 truncate mx-auto">{name}</strong>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center gap-1 p-1 text-base text-sky-600 hover:bg-zinc-100 transition rounded-lg"
          >
            Meu valor/hora
          </button>

          <button
            className="flex items-center justify-center gap-1 p-1 text-base text-red-600 hover:bg-zinc-100 transition rounded-lg"
            onClick={logOut}
          >
            <SignOut size={28} />
            Sair
          </button>
        </div>
      }
    >
      <div className="flex items-center justify-center cursor-pointer">
        <img src={avatar} alt={name} referrerPolicy="no-referrer" className="w-10 rounded-full" />

        <DotsThreeOutlineVertical weight="fill" size={24} className="text-zinc-100" />
      </div>
    </Popover>
  );
}
