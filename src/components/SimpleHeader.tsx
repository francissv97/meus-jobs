import { ArrowUUpLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export function SimpleHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-tr from-zinc-700 via-zinc-600 to-zinc-500">
      <div className="flex items-center justify-between gap-1 max-w-4xl mx-auto p-4">
        <div
          onClick={() => navigate("/")}
          className="group cursor-pointer absolute"
        >
          <ArrowUUpLeft
            size={32}
            className="group text-zinc-400 group-hover:text-zinc-200"
          />
        </div>

        <div className="flex flex-1 justify-center">
          <strong className="text-xl text-zinc-300 font-normal">Perfil</strong>
        </div>
      </div>
    </div>
  );
}
