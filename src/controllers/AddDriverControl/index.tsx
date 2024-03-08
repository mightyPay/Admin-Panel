import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { ButtonWithRightIcon, RightSlide } from "../../components";
import { IShowSlide } from "../../components/type";
import { AddDriver } from "../../pageComponents";

const AddDriverControl = () => {
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  return (
    <div>
      <ButtonWithRightIcon
        color="#4d47c3"
        title="Add Driver"
        Icon={FaUserAlt}
        onClick={() => setPanelState({ ...panelState, isShow: true })}
      />
      <RightSlide onClose={onClose} state={panelState} width={"w-1/3"}>
        <AddDriver completed={onClose} title={""} />
      </RightSlide>
    </div>
  );
};

export default AddDriverControl;
