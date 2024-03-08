import React from "react";
import { Link } from "react-router-dom";
import { IconLogo } from "../../../../components/Logo";

const SideBarTop = () => {
  return (
    <Link to="/dashboard">
      <IconLogo className="w-20" />
    </Link>
  );
};

export default SideBarTop;
