import { CaretLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export function SimpleHeader() {
  const navigate = useNavigate();

  return (
    <div className="h-14 px-4 pt-4">
      <div className="flex items-center max-w-4xl w-full mx-auto h-10">
        <div
          onClick={() => navigate("/")}
          className="group cursor-pointer bg-black/10 rounded-full w-10 h-full flex justify-center items-center"
        >
          <CaretLeft size={24} weight="bold" className="group text-zinc-500 group-hover:text-zinc-600" />
        </div>
      </div>
    </div>
  );
}
