import React from "react";
import { BiCategory } from "react-icons/bi";
import { FaHistory, FaRegChartBar, FaUserAlt, FaUsers } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { BsFillImageFill } from "react-icons/bs";
import { AiTwotoneNotification } from "react-icons/ai";
import { MdCleaningServices } from "react-icons/md";

export interface IActions {
  newEntry: {
    title: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
}

export interface IMenuItem {
  id: string;
  title: string;
  type: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url?: string;
  childrens?: IMenuItem[];
  onClick?: (e: any) => void;
  actions?: IActions;
  showChilds?: boolean;
}
export interface IMenuItemV1 {
  id: string;
  title: string;
  type: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconClass?: string;
  url?: string;
  childrens?: IMenuItemV1[];
  actions?: IActions;
  onClick?: (e: any) => void;
}

export interface IMenuItems {
  bodyItems: IMenuItem[];
  bottomItems: IMenuItem[];
}

const menuItems: IMenuItems = {
  bodyItems: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      Icon: FaRegChartBar,
      childrens: [],
    },
    {
      id: "users",
      title: "Users",
      type: "item",
      url: "/dashboard/users",
      Icon: FaUsers,
      actions: {
        newEntry: {
          title: "Add User",
          Icon: FaUserAlt,
        },
      },
      childrens: [],
    },
    {
      id:"cleanly",
      title:"Cleanly Services",
      type: "item",
      url:"/dashboard/cleanly",
      Icon:MdCleaningServices,
      childrens:[]
    },
    {
      id: "transactions",
      title: "Transactions",
      type: "item",
      url: "/dashboard/transactions",
      Icon: FaHistory,
      childrens: [],
    },
    
    {
      id: "assets-management",
      title: "Assets",
      type: "button",
      url: "/dashboard/assets",
      Icon: BsFillImageFill,
      showChilds: false,
      childrens: [
        {
          id: "banner-management",
          title: "Banners Manage",
          type: "item",
          url: "/dashboard/assets/banner",
          childrens: [],
        },
        {
          id: "banner-upload",
          title: "Upload Banner",
          type: "item",
          url: "/dashboard/assets/banner",
          childrens: [],
        },
        {
          id: "banner-set",
          title: "Set Current Banner",
          type: "item",
          url: "/dashboard/assets/banner",
          childrens: [],
        },
      ],
    },
  ],
  bottomItems: [
    {
      id: "logout",
      title: "Logout",
      type: "button",
      url: "/logout",
      Icon: RiLogoutBoxRFill,
      childrens: [],
    },
  ],
};

export default menuItems;

export const menuItemsBodyV1: IMenuItemV1[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    url: "/dashboard",
    Icon: FaRegChartBar,
    IconClass: "ri-dashboard-line",
  },
  {
    id: "transactions",
    title: "Transactions",
    type: "item",
    url: "/dashboard/transactions",
    Icon: FaHistory,
    IconClass: "ri-article-line",
  },
  {
    id: "merchants",
    title: "Merchants",
    type: "item",
    url: "/dashboard/merchants",
    Icon: FaHistory,
    IconClass: "ri-building-4-line",
  },
  {
    id:"cleanly",
    title:"Cleanly Services",
    type: "item",
    url:"/dashboard/cleanly",
    Icon:MdCleaningServices,
    IconClass: "ri-file-code-line"
  },
  {
    id: "users",
    title: "Manage Users",
    type: "button",
    url: "/dashboard/users",
    Icon: BsFillImageFill,
    IconClass: "ri-group-line",
    childrens: [
      {
        id: "user-create",
        title: "Create User",
        type: "item",
        url: "/dashboard/users/create",
        childrens: [],
      },
      {
        id: "user-list",
        title: "User List",
        type: "item",
        url: "/dashboard/users/list",
        childrens: [],
      },
    ],
  },

  {
    id: "app-reward",
    title: "Offer & Rewards",
    type: "button",
    url: "/dashboard/rewards",
    Icon: BsFillImageFill,
    IconClass: "ri-wallet-3-line",
    childrens: [
      {
        id: "reward-rule-create",
        title: "Create Rule",
        type: "item",
        url: "/dashboard/rewards/create",
        childrens: [],
      },
      {
        id: "reward-rule-list",
        title: "Reward Rules",
        type: "item",
        url: "/dashboard/rewards/list",
        childrens: [],
      },
    ],
  },
  {
    id: "app-campaign",
    title: "Manage Campaigns",
    type: "button",
    url: "/dashboard/campaign",
    Icon: BsFillImageFill,
    IconClass: "ri-global-line",
    childrens: [
      {
        id: "reward-rule-create",
        title: "Create Campaign",
        type: "item",
        url: "/dashboard/campaign/create",
        childrens: [],
      },
      {
        id: "reward-rule-list",
        title: "Campaign List",
        type: "item",
        url: "/dashboard/campaign/list",
        childrens: [],
      },
    ],
  },
  {
    id: "notifications",
    title: "Template Manage",
    type: "button",
    url: "/dashboard/template",
    Icon: AiTwotoneNotification,
    IconClass: "ri-send-plane-2-line",
    childrens: [
      {
        id: "template/create",
        title: "Create Template",
        type: "item",
        url: "/dashboard/template/create",
        childrens: [],
      },
      {
        id: "template/list",
        title: "Template List",
        type: "item",
        url: "/dashboard/template/list",
        childrens: [],
      },
    ],
  },

  {
    id: "app-config",
    title: "App Config",
    type: "button",
    url: "/dashboard/app",
    Icon: BsFillImageFill,
    IconClass: "ri-file-code-line",
    childrens: [
      {
        id: "banner-management",
        title: "Banners",
        type: "item",
        url: "/dashboard/app/banner",
        childrens: [],
      },
    ],
  },
];
export const bottomMenuItemsBodyV1: IMenuItemV1[] = [
  {
    id: "logout",
    title: "Logout",
    type: "logout",
    Icon: RiLogoutBoxRFill,
    IconClass: "ri-logout-circle-r-line",
  },
];
