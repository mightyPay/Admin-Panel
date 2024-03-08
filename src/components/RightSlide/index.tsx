import React, { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IRightSlide } from "../type";

const RightSlide = ({ width, state, children, onClose }: IRightSlide) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const onOutClick = (e: any) => {
    if (state.isShow && ref.current && !ref.current.contains(e.target)) {
      setShow(false);
      // onClose();
      setTimeout(onClose, 500);
    }
  };

  const onCloseClick = (e: any) => {
    setShow(false);
    // onClose();
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    if (state.isShow) setShow(true);
  }, [state]);

  return (
    <div
      onClick={onOutClick}
      className={`z-10 absolute top-0 left-0 right-0 h-screen bg-black bg-opacity-50 overflow-hidden   ${
        !state.isShow && "hidden"
      }`}
    >
      <div
        ref={ref}
        className={`absolute top-0 right-0 bg-white shadow-xl transition transform ease-in-out duration-300 h-screen overflow-y-scroll no-scrollbar ${width} ${
          show ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative">
          <GrClose
            onClick={onCloseClick}
            className="text-2xl absolute right-4 top-4 font-bold cursor-pointer"
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default RightSlide;
