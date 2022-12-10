import { useNavigate } from "react-router-dom";
import { ManLost } from "../components/ManLost";
import { Footer } from "../components/Footer";
import { ArrowBendUpLeft, HouseLine } from "phosphor-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-gradient-to-t from-zinc-500 via-zinc-200 to-zinc-200 justify-center items-center px-2 relative">
      <div className="flex flex-1 flex-col justify-center">
        <ManLost />

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 p-2 text-xl text-zinc-600 border-2 rounded w-fit mx-auto transition border-zinc-600 hover:border-orange-600 hover:text-orange-600"
        >
          <ArrowBendUpLeft size={32} />
          {"Voltar para a Home"}
          <HouseLine size={32} />
        </button>
      </div>

      <Footer className="pb-4" />
    </div>
  );
}
