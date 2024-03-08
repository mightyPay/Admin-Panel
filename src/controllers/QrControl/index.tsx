import React, { useState } from "react";
import QRCode from "qrcode.react";
import { IQrControl } from "../type";
import { RightSlide } from "../../components";
import { FaQrcode } from "react-icons/fa";
import { IShowSlide } from "../../components/type";
import { BoxContainer } from "../../containers";

const QrControl = ({ value, onClick }: IQrControl) => {
  const [panelState, setPanelState] = useState<IShowSlide>({
    isShow: false,
    title: undefined,
    type: undefined,
  });

  const onClose = () =>
    setPanelState({ isShow: false, title: undefined, type: undefined });

  return (
    <div>
      <div className="bg-green-500 bg-opacity-20 p-3 rounded-md cursor-pointer">
        <FaQrcode
          className="text-xl text-green-500"
          onClick={() => setPanelState({ ...panelState, isShow: true })}
        />
      </div>
      <RightSlide onClose={onClose} state={panelState} width="w-1/3">
        <BoxContainer classNames="col-span-4 h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-8">
            <QRCode size={200} value={value} renderAs="canvas" />
            <h2>{value}</h2>
          </div>
        </BoxContainer>
      </RightSlide>
    </div>
  );
};

export default QrControl;
