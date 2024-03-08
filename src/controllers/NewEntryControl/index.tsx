import React, { Fragment, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { ButtonWithRightIcon, RightSlide } from "../../components";
import { IShowSlide } from "../../components/type";
import { AddAppUser, AddDriver } from "../../pageComponents";

type Props = {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  id: string;
};

const AddDriverControl = ({ title, Icon, id }: Props) => {
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
        title={title}
        Icon={Icon}
        onClick={() => setPanelState({ ...panelState, isShow: true })}
      />
      <RightSlide onClose={onClose} state={panelState} width={"w-1/3"}>
        <Fragment>
          {id === "drivers" && <AddDriver title={title} completed={onClose} />}
          {id === "app-user" && (
            <AddAppUser title={title} completed={onClose} />
          )}
        </Fragment>
      </RightSlide>
    </div>
  );
};

export default AddDriverControl;
