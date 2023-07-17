import { useState } from "react";
import { Carousel } from "antd";
import { useAuth } from "../hooks/useAuth";
import { Dashboard } from "./Dashboard";
import { Logo } from "../components/Logo";
import { Loading } from "../components/Loading";
import { Footer } from "../components/Footer";
import { CircleNotch, GoogleLogo } from "phosphor-react";
import bgOne from "../assets/backgroundOne.jpg";
import bgTwo from "../assets/backgroundTwo.jpg";

export function Home() {
  const [loading, setLoading] = useState(false);
  const { user, signInWithGoogle } = useAuth();

  if (typeof user === "undefined") {
    return <Loading />;
  }

  if (!user) {
    return (
      <div>
        <header className="fixed top-0 left-0 right-0 w-full z-10 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-400 shadow-lg px-4 h-16 flex items-center">
          <Logo />
        </header>

        <div className="flex relative">
          <div className="w-0 sm:w-1/4 md:w-2/4 lg:3/4">
            <Carousel autoplay dots={false} speed={1600} autoplaySpeed={6000}>
              <img src={bgOne} alt="Background images signin page." className="h-screen object-cover" />

              <img src={bgTwo} alt="Background images signin page." className="h-screen object-cover" />
            </Carousel>
          </div>

          <div className="bg-orange-500/20 absolute w-full h-full inset-0" />

          <div className="flex flex-1 flex-col bg-gradient-to-t from-zinc-200 via-zinc-200 to-zinc-50 justify-between items-center px-4 relative pt-20">
            <div className="flex-1 flex gap-6 flex-col items-center">
              <div className="">
                <h1 className="font-medium text-zinc-700 text-3xl">
                  Boas-vindas ao <span className="text-orange-600">MeusJOBS!</span>
                </h1>

                <p className="text-lg mt-4">
                  O MeusJOBS é uma ferramenta de gerenciamento de trabalhos que permite que você organize
                  suas tarefas diárias, mantenha um registro de seus projetos em andamento e gerencie
                  suas prioridades.
                </p>

                <strong className="text-orange-600 font-medium text-lg block mt-4">Recursos</strong>

                <ul className="ml-4 text-lg flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600 text-[40px]">·</span> Organize tarefas diárias
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600 text-[40px]">·</span>
                    Mantenha um registro de seus projetos em andamento
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600 text-[40px]">·</span>
                    Defina prazos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-600 text-[40px]">·</span>
                    Calcule o valor de sua hora de trabalho
                  </li>
                </ul>

                <strong className="block mt-4 text-lg font-medium">Como usar</strong>

                <ul className="ml-4 text-lg flex flex-col gap-2">
                  <li>Faça login na plataforma</li>
                  <li>Preencha o formulário do cálculo de valor/hora</li>
                  <li>Adicione uma nova tarefa ou projeto</li>
                  <li>Atribua um prazo à sua tarefa ou projeto</li>
                </ul>
              </div>

              <div className="pt-4 flex-1 w-full max-w-sm flex flex-col justify-center items-center gap-2">
                <strong className="block font-medium text-xl text-zinc-600">Vamos Começar?</strong>

                <button
                  onClick={() => {
                    setLoading(true);
                    signInWithGoogle().finally(() => setLoading(false));
                  }}
                  className="flex items-center gap-1 text-xl p-4 rounded-lg duration-300 text-orange-500 bg-zinc-50 shadow-md hover:shadow-xl hover:text-orange-600"
                >
                  <GoogleLogo weight="bold" size={28} />
                  Continuar com o Google
                  {loading && <CircleNotch size={28} className="animate-spin" />}
                </button>
              </div>
            </div>

            <Footer className="pt-4 pb-2" />
          </div>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}
