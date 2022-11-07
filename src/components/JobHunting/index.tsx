import Lottie from "lottie-react";
import { ClassAttributes } from "react";
import animationData from "./job-hunting.json";

interface Props extends ClassAttributes<HTMLDivElement> {
  className?: string;
}

export function JobHunting({ className }: Props) {
  return (
    <div className={className}>
      <Lottie animationData={animationData} />
    </div>
  );
}
