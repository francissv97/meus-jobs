import Lottie from "lottie-react";
import animationData from "./girlWorking.json";

export function GirlWorking() {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  // return <Lottie ={animationData} />

  return (
    <div className="max-w-md mx-auto">
      <Lottie animationData={animationData} />
    </div>
  );
}
