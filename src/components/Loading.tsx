import { CircleNotch } from "phosphor-react";
import { Logo } from "./Logo";

export function Loading() {
  return (
    <div className="bg-gradient-to-t from-zinc-400 to-zinc-200 flex flex-col gap-4 items-center justify-center w-full min-h-screen">
      <Logo />

      <CircleNotch className="animate-spin text-orange-500" size={42} />
    </div>
  );
}
