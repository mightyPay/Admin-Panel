import React from "react";
import { IButtonWithRightIcon } from "../type";

const ButtonWithRightIcon = ({
  title,
  Icon,
  color,
  onClick,
}: IButtonWithRightIcon) => {
  // alert(color);
  return (
    <span
      onClick={onClick}
      className={`flex items-center gap-x-2 py-3 bg-rose-800 shadow-md rounded-md px-4 text-white cursor-pointer hover:bg-opacity-80`}
    >
      <Icon className="text-md" />
      <span className="text-sm font-semibold">{title}</span>
    </span>
  );
};

export default ButtonWithRightIcon;
