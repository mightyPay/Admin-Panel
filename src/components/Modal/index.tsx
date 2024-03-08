import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IModel } from "../type";

const RightSlide = ({ state, children, onClose, closeIcon }: IModel) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const onOutClick = (e: any) => {
    if (e.target !== e.currentTarget) return;

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
      className={`z-10 fixed top-0 left-0 right-0 h-screen bg-black bg-opacity-50 overflow-hidden flex items-center justify-center ${
        !state.isShow && "hidden"
      }`}
    >
      <div
        ref={ref}
        className={`min-h-max min-w-max rounded-md bg-white shadow-xl transition transform ease-in-out duration-300`}
      >
        <div className="relative">
          {closeIcon && (
            <GrClose
              onClick={onCloseClick}
              className="text-xl absolute right-4 top-4 font-bold cursor-pointer"
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default RightSlide;
