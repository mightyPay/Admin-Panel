import React from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TiThListOutline } from "react-icons/ti";
import { PageWrapper } from "../../components";

function BannerPage() {
  return (
    <PageWrapper
      menus={[
        {
          id: "notificationCreate",
          title: "Banner list",
          Icon: TiThListOutline,
          index: true,
          url: "/dashboard/app/banner/list",
        },
        {
          id: "notificationList",
          title: "Banner Create",
          Icon: MdOutlineCreateNewFolder,
          index: false,
          url: "/dashboard/app/banner/create",
        },
      ]}
    />
  );
}

export default BannerPage;
