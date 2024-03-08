import React from "react";
import { Outlet } from "react-router-dom";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import SideBarLayoutBody from "./Body";
import SideBarLayoutHeader from "./Header";
import { RightSlide, SideBarV1 } from "../../components";
import { menuItemsBodyV1, bottomMenuItemsBodyV1 } from "../../menu-items";

const SideBarLayout = () => {
  return (
    <div className="h-screen w-full flex items-stretch">
      <SideBarV1
        menuItems={menuItemsBodyV1}
        bottomMenuItemsBodyV1={bottomMenuItemsBodyV1}
      />
      <div className="bg-[#f2f3f8] overflow-y-scroll w-full">
        <SideBarLayoutBody>
          <div className="grid gap-y-8">
            <SideBarLayoutHeader />
            <Outlet />
          </div>
        </SideBarLayoutBody>
      </div>
      {/* SlideComponent */}
      {/* <RightSlide
        width="w-1/2"
        state={{ isShow: true, title: "checking", type: "test" }}
      >
        <RightSlide
          width="w-1/2"
          state={{ isShow: true, title: "checking", type: "test" }}
        >
          <h2>hello sir</h2>
        </RightSlide>
      </RightSlide> */}
    </div>
  );
};

export default SideBarLayout;
