import SideBarRow from "../Row";
import MenuItems from "../../../../menu-items";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SidebarBody = () => {
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState<any>(
    MenuItems.bodyItems.find((item) => item.url === location.pathname)
  );

  return (
    <div>
      <div className="sidebar flex flex-col items-center gap-y-2">
        {MenuItems.bodyItems.map((item, index) => (
          <SideBarRow
            key={index}
            {...item}
            isActive={selectedRow?.id === item.id}
            onClick={
              item?.onClick
                ? item.onClick
                : () => {
                    setSelectedRow(item);
                  }
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarBody;
