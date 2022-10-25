import { ArrowUUpLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export function SimpleHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-tr from-zinc-700 via-zinc-600 to-zinc-500">
      <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto p-4">
        <div
          onClick={() => navigate(-1)}
          className="group p-2 pl-0 cursor-pointer"
        >
          <ArrowUUpLeft
            size={32}
            className="group text-zinc-400 group-hover:text-zinc-200"
          />
        </div>
        <strong className="text-xl text-zinc-300 font-normal">Perfil</strong>
        <div></div>
      </div>
    </div>
  );
}
