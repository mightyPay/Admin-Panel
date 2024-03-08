import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { ImNotification } from "react-icons/im";
import { ButtonWithRightIcon, RightSlide } from "../../components";
import { GoSettings } from "react-icons/go";
import { useLocation } from "react-router-dom";
import MenuItems, {
  IMenuItem,
  IMenuItemV1,
  menuItemsBodyV1,
} from "../../menu-items";
import AddDriver from "../AddDriver";
import { NewEntryControl, DutiesControl } from "../../controllers";
import { IPageHeader } from "../type";
import SettingDropDown from "../../HeaderTools/SettingDropDown";

const PageHeader = ({ ToolBar, menus }: IPageHeader) => {
  const newEntryAllow = ["drivers", "app-user", "users"];

  const [title, setTitle] = useState<string>("Dashboard");
  const location = useLocation();
  const [route, setRoute] = useState<IMenuItem | undefined>(undefined);

  function getCurrentRoute(
    url: string,
    routes: IMenuItemV1[]
  ): IMenuItemV1 | null {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.url === url) {
        return route;
      }
      if (route.childrens) {
        const childRoute = getCurrentRoute(url, route.childrens);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return null; // no matching route found
  }

  useEffect(() => {
    const route = getCurrentRoute(location.pathname, menuItemsBodyV1);

    // console.log({ route });
    if (route) {
      setTitle(route.title);
      setRoute(route);
    }
  }, [location]);

  return (
    <div className="flex items-center justify-between">
      {/* Title */}
      <div>
        <span className="text-4xl font-semibold">{title}</span>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-x-4">
        {newEntryAllow.includes(route?.id || "") && (
          <NewEntryControl
            title={route?.actions?.newEntry?.title || "puzzled"}
            Icon={route?.actions?.newEntry?.Icon || ImNotification}
            id={route?.id || ""}
          />
        )}
        {ToolBar && ToolBar}

        {menus?.length ? <SettingDropDown menus={menus} /> : null}
      </div>
    </div>
  );
};

export default PageHeader;
