import React from "react";
import { LineWaveScreenFit } from "../LineWaveLoader";

const SuspenseLoader = () => {
  return (
    <div className="h-screen w-full fixed top-0 left-0 flex items-center justify-center">
      <LineWaveScreenFit />
    </div>
  );
};

export default SuspenseLoader;
