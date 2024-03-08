import React from "react";
import { LineWave } from "react-loader-spinner";

const ScreenFit = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <LineWave
        color="#a01338"
        height={300}
        width={300}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default ScreenFit;
