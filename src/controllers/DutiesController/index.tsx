import React, { useState } from "react";
import { FaList, FaUserAlt } from "react-icons/fa";
import { ButtonWithRightIcon, RightSlide } from "../../components";
import { IShowSlide } from "../../components/type";
import { AddDriver, Duties } from "../../pageComponents";

const DutiesControl = () => {
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
        title="Duties"
        Icon={FaList}
        onClick={() => setPanelState({ ...panelState, isShow: true })}
      />
      <RightSlide onClose={onClose} state={panelState} width="w-3/4">
        <Duties />
      </RightSlide>
    </div>
  );
};

export default DutiesControl;
