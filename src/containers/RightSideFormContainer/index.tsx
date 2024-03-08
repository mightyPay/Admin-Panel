import React from "react";
import BoxContainer from "../BoxContainer";
import { IContainer } from "../types";

const RightSideFormContainer = ({ children, classNames }: IContainer) => {
  return (
    <BoxContainer classNames="col-span-4">
      <div className={`flex flex-col gap-y-6 ${classNames}`}>{children}</div>
    </BoxContainer>
  );
};

export default RightSideFormContainer;
