import React from "react";
import { CgSpinner } from "react-icons/cg";
import clsxm from "../../utils/clsxm";

type Props = {
  title: string;
  className?: string;
  loading: boolean;
  onClick: (e: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({ title, className, loading, onClick, type }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsxm(
        "flex items-center relative justify-center h-14 gap-x-2 py-3 bg-rose-800 shadow-2xl shadow-rose-800 rounded-md px-4 hover:bg-opacity-80 text-white cursor-pointer z-0",
        className,
        loading && "text-rose-800 cursor-progress"
      )}
    >
      <span className="">{title}</span>
      {loading && (
        <div className="absolute flex items-center justify-center h-full w-full top-0 left-0 z-0">
          <CgSpinner className={`animate-spin text-5xl text-white`} />
        </div>
      )}
    </button>
  );
};

export default Button;
