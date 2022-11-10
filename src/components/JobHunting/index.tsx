import Lottie from "lottie-react";
import { ClassAttributes } from "react";
import { Footer } from "../Footer";
import animationData from "./job-hunting.json";

interface Props extends ClassAttributes<HTMLDivElement> {
  className?: string;
}

export function JobHunting({ className }: Props) {
  return (
    <div
      className={`${className} max-w-[240px] md:max-w-xs lg:max-w-md mx-auto`}
    >
      <Lottie animationData={animationData} />
    </div>
  );
}
