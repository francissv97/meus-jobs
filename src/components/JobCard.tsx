import { Button } from "antd";
import { PencilSimpleLine, Trash } from "phosphor-react";

interface Props {
  name: string;
  deadline: string;
  value: number;
  status: "IN-PROGRESS" | "CLOSED";
}

export function JobCard({ name, deadline, value, status }: Props) {
  return (
    <div className="grid grid-cols-3 bg-zinc-100 gap-4 px-4 py-6 rounded mx-4 shadow-xl">
      <div className="flex col-span-2 flex-col gap-2">
        <div id="JobName" className="flex items-center">
          <span className="text-zinc-700 text-xl font-medium overflow-hidden text-ellipsis">
            {name}
          </span>
        </div>

        <div id="JobPrazo" className="flex flex-col">
          <span className="text-sm text-zinc-500">Prazo</span>
          <span className="text-zinc-700">{deadline}</span>
        </div>

        <div id="JobValor" className="flex flex-col justify-center">
          <span className="text-sm text-zinc-500">Valor</span>
          <span className="text-zinc-700">
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div
          id="JobStatus"
          className="bg-red-300/20 text-red-700 px-2 py-1 text-sm text-center rounded w-fit self-end"
        >
          <span className="whitespace-nowrap">
            {status == "CLOSED" ? "ENCERRADO" : "EM ANDAMENTO"}
          </span>
        </div>

        <div id="JobHomeComponentButtons" className="flex justify-end gap-2">
          <Button
            id="JobEdit"
            icon={<PencilSimpleLine size={22} />}
            className="flex items-center justify-center bg-zinc-500 text-white p-2 rounded transition hover:bg-zinc-600"
          />
          <Button
            id="JobRemove"
            shape="circle"
            icon={<Trash size={22} />}
            className="flex items-center justify-center bg-red-700 text-white p-2 rounded transition hover:bg-red-800"
          />
        </div>
      </div>
    </div>
  );
}
