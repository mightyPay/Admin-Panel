import React from "react";
import clsxm from "../../utils/clsxm";
import { IContainer } from "../types";

const BoxContainer = ({ children, classNames }: IContainer) => {
  return (
    <div className={clsxm(`bg-white rounded-md h-full w-full p-4`, classNames)}>
      {children}
    </div>
  );
};

export default BoxContainer;
