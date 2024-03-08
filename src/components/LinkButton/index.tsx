import React from "react";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import clsxm from "../../utils/clsxm";

type Props = {
  title: string;
  to?: string;
  className?: string;
};

const LinkButton = ({ title, className, to }: Props) => {
  return (
    <Link
      className={clsxm(
        `flex items-center decoration-0 text-white relative justify-center h-14 gap-x-2 py-3 bg-rose-800 rounded-md px-4 hover:bg-opacity-80`,
        className
      )}
      to={to || "#"}
    >
      <span className="">{title}</span>
    </Link>
  );
};

export default LinkButton;
