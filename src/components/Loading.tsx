import { CircleNotch } from "phosphor-react";
import { Logo } from "./Logo";

export function Loading() {
  return (
    <div className="bg-zinc-200 flex flex-col gap-4 items-center justify-center w-full min-h-screen">
      <Logo />

      <CircleNotch weight="thin" className="animate-spin text-orange-500" size={52} />
    </div>
  );
}
