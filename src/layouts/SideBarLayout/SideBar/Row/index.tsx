import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import { IMenuItem } from "../../../../menu-items";
import clsxm from "../../../../utils/clsxm";

interface ISideBarRow extends IMenuItem {
  onClick?: (e: any) => void;
  isActive?: boolean;
  isChild?: boolean;
}

const SideBarRow = ({
  title,
  Icon,
  url,
  type,
  onClick,
  id,
  isActive,
  childrens,
  showChilds,
  isChild,
}: ISideBarRow) => {
  const [showChildrens, setShowChildrens] = useState<boolean | undefined>(
    showChilds
  );
  const [childSelected, setChildSelected] = useState<any>(undefined);
  const { logout } = useAuth();

  return (
    <div className={clsxm("w-full", childrens?.length && "grid gap-y-2")}>
      <div className={clsxm("w-full px-4")}>
        {type === "button" ? (
          <div
            onClick={
              id === "logout"
                ? logout
                : (e) => {
                    setShowChildrens(!showChildrens);
                    onClick && onClick(e);
                    if (childrens?.length && !childSelected) {
                      setChildSelected(childrens[0]);
                    }
                  }
            }
            className={clsxm(
              "sidebar-row cursor-pointer transition-all duration-500 flex items-center gap-x-4 rounded-md py-3 px-4 hover:bg-[#f2f3f8] active:bg-[#f2f3f8] relative",
              isActive && "bg-[#f2f3f8]",
              isChild && "pl-14"
            )}
          >
            {Icon && (
              <Icon
                className={clsxm("text-2xl text-gray-400", [
                  isActive && ["text-rose-800"],
                ])}
              />
            )}
            <span className="text-sm font-medium">{title}</span>
            {childrens?.length ? (
              <HiOutlineChevronDown
                className={clsxm(
                  "text-2xl absolute top-3 right-3",
                  "transition duration-150 ease-out hover:ease-in",
                  showChildrens && "rotate-180"
                )}
              />
            ) : null}
          </div>
        ) : (
          <Link
            onClick={(e) => {
              setShowChildrens(!showChildrens);
              onClick && onClick(e);

              if (childrens?.length && !childSelected) {
                setChildSelected(childrens[0]);
              }
            }}
            to={url || "#"}
            className={clsxm(
              "sidebar-row transition-all duration-500 flex items-center gap-x-4 rounded-md py-3 px-4 hover:bg-[#f2f3f8] active:bg-[#f2f3f8] relative",
              (isActive || isChild) && "bg-[#f2f3f8]",
              isChild && "pl-14"
            )}
          >
            {Icon && (
              <Icon
                className={clsxm("text-2xl text-gray-400", [
                  isActive && ["text-rose-800"],
                ])}
              />
            )}
            <span className="text-sm font-medium">{title}</span>

            {childrens?.length ? (
              <HiOutlineChevronDown
                className={clsxm(
                  "text-2xl absolute top-3 right-3",
                  "transition duration-150 ease-out hover:ease-in",
                  showChildrens && "rotate-180"
                )}
              />
            ) : null}
          </Link>
        )}
      </div>
      {showChildrens && childrens?.length ? (
        <div className="w-full">
          {childrens?.length
            ? childrens.map((item) => {
                // console.log({})

                return (
                  <SideBarRow
                    key={item.id}
                    {...item}
                    isChild={true}
                    isActive={item.id === childSelected?.id}
                  />
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default SideBarRow;
