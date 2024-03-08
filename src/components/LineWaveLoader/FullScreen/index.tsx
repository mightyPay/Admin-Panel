import React from "react";
import { LineWave } from "react-loader-spinner";

const FullScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
      <LineWave
        color="blue"
        height={300}
        width={300}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default FullScreen;
