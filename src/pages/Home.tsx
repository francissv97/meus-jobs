import { Logo } from "../components/Logo";

export function Home() {
  return (
    <div>
      <Logo />

      <div id="ContainerJobsList">
        <div id="ComponentHomeJob">
          <div id="JobName">
            <strong>JobName</strong>
          </div>

          <div id="JobPrazo">
            <span>Prazo</span>
            <span>Value</span>
          </div>

          <div id="JobValor">
            <span>Valor</span>
            <span>R$ 1.200,00</span>
          </div>

          <div id="JobStatus">Em andamento</div>

          <div id="JobHomeComponentButtons">
            <button id="JobEdit">Editar</button>
            <button id="JobRemove">Remover</button>
          </div>
        </div>
      </div>
    </div>
  );
}
