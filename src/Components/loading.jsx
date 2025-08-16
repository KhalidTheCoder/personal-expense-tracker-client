import Lottie from "lottie-react";
import loading from "../assets/lottie/loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#F5EFFF] flex items-center justify-center">
      <div>
        <Lottie animationData={loading}></Lottie>
      </div>
    </div>
  );
};

export default Loading;