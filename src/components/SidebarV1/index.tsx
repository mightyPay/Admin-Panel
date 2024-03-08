import React, { useEffect, useState } from "react";
import { BsArrowRightShort, BsGrid1X2, BsUiChecksGrid } from "react-icons/bs";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import clsxm from "../../utils/clsxm";
import { IconLogo } from "../Logo";
import { useWindowSize, usePageLeave } from "react-use";
import { GrImage } from "react-icons/gr";
import { TbLayoutGrid } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import menuItems, { menuItemsBodyV1 } from "../../menu-items";
import { useAuth } from "../../hooks";

function SideBarV1({ width, menuItems, bottomMenuItemsBodyV1 }: any) {
  const [expend, setExpend] = useState<boolean>(true);
  const windowSize = useWindowSize();

  const show = () => setExpend(true);

  useEffect(() => {
    if (windowSize.width <= 768) {
      setExpend(false);
    } else {
      setExpend(true);
    }
  }, [windowSize]);

  return (
    <div
      className={clsxm(
        "h-screen shadow-md p-6 flex flex-col gap-y-10 items-center",
        "transition duration-150 ease-out",
        "grid",
        expend && "w-96"
      )}
      style={{
        gridTemplateRows: "max-content 1fr max-content",
      }}
    >
      <SideBarV1Top show={show} expend={expend} setExpend={setExpend} />
      <div className="w-full h-full overflow-y-scroll">
        <SideBarV1Body expend={expend} menuItems={menuItems} />
      </div>

      <SideBarV1Body expend={expend} menuItems={bottomMenuItemsBodyV1} />
    </div>
  );
}

export default SideBarV1;

function SideBarV1Top({ expend, setExpend, show }: any) {
  return (
    <div className="w-full grid gap-y-6">
      <div className="w-full grid gap-y-8">
        {/* Logo */}
        <div className="relative flex items-center justify-between">
          <IconLogo
            width={expend ? "92" : "60"}
            height={expend ? "42" : "30"}
          />

          <span
            onClick={() => setExpend(!expend)}
            className={clsxm(
              "h-6 w-6 rounded-md cursor-pointer",
              "hidden md:flex items-center justify-center",
              !expend && "absolute top-1/3 -right-10 bg-white shadow-md",
              expend &&
                "md:bg-[#f2f3f8] md:rotate-180 md:border md:border-[#304874]"
            )}
          >
            <BsArrowRightShort
              className={clsxm(
                "text-black text-2xl font-bold",
                !expend && "text-black"
              )}
            />
          </span>
        </div>
        {/* Logo End */}
        <div
          className={clsxm(
            "flex items-center bg-[#f2f3f8] gap-x-3 rounded-md py-4 md:py-3 px-2 justify-center",
            !expend && "justify-center cursor-pointer py-3"
          )}
        >
          <FiSearch
            className={clsxm("text-2xl text-gray-400", !expend && "text-2xl")}
            onClick={show}
          />
          <input
            placeholder="Search"
            className={clsxm(
              "bg-transparent focus:outline-none focus:border-none w-full",
              !expend && "hidden"
            )}
          />
        </div>
      </div>

      {expend ? <div className="h-[1px] bg-gray-300"></div> : null}
    </div>
  );
}

function SideBarV1Body({ expend, menuItems }: any) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <ul
      className={clsxm(
        "grid gap-y-6 w-full text-gray-500 place-self-start",
        expend && "px-2"
      )}
    >
      {menuItems?.map((item: any, index: number) => {
        if (item?.childrens) {
          return (
            <DropDownRowV1
              key={`d-item-${index}-${item.id}`}
              expend={expend}
              title={item.title}
              url={item.url}
              iconClass={item.IconClass}
              childrens={item.childrens}
              pathname={location.pathname}
              active={
                item.url === location.pathname ||
                location.pathname?.indexOf(item.url) > -1
              }
            />
          );
        }

        return (
          <SimpleRowV1
            key={item.id}
            expend={expend}
            title={item.title}
            iconClass={item.IconClass}
            url={item.url}
            active={
              item.url === location.pathname
              // location.pathname?.indexOf(item.url) > -1
            }
            onClick={item.type === "logout" ? logout : item.onClick}
          />
        );
      })}
    </ul>
  );
}

function SimpleRowV1({
  expend,
  title,
  active,
  iconClass,
  url,
  className,
  ...rest
}: any) {
  const location = useLocation();

  let content = (
    <li
      {...rest}
      className={clsxm(
        "group w-full cursor-pointer flex items-center gap-x-4 relative rounded-md p-2 hover:bg-[#f2f3f8]",
        "transition duration-150 ease-out",
        "hover:text-gray-900",
        !expend && "justify-center",
        active && "bg-[#f2f3f8]",
        className
      )}
    >
      {iconClass && (
        <i
          className={clsxm(
            iconClass,
            "text-2xl group-hover:text-black",
            !expend && "text-3xl",
            active && "text-black"
          )}
        ></i>
      )}
      <p className={clsxm(!expend && "hidden", active && "text-black")}>
        {title}
      </p>
    </li>
  );

  if (url) {
    return (
      <Link to={active ? location.pathname : url} className="">
        {content}
      </Link>
    );
  }

  return content;
}

function DropDownRowV1({
  expend,
  title,
  active,
  iconClass,
  url,
  childrens,
  pathname,
}: any) {
  return (
    <li className="group">
      <div
        className={clsxm(
          "group w-full cursor-pointer flex items-center gap-x-4 relative mb-2 rounded-md p-2 hover:bg-[#f2f3f8]",
          "transition duration-150 ease-out",
          "hover:text-gray-900",
          !expend && "justify-center",
          active && "bg-[#f2f3f8]"
        )}
      >
        {iconClass && (
          <i
            className={clsxm(
              iconClass,
              "text-2xl group-hover:text-black",
              !expend && "text-3xl",
              active && "text-black"
            )}
          ></i>
        )}
        <p className={clsxm(!expend && "hidden", active && "text-black")}>
          {title}
        </p>

        <FiChevronDown
          className={clsxm(
            "group-hover:text-black absolute right-2 h-5 w-5 group-hover:rotate-180 transition duration-300 delay-150 ease-in-out",
            !expend && "hidden",
            active && "text-black group-hover:rotate-0"
          )}
        />
      </div>
      {childrens?.length ? (
        <div
          className={clsxm(
            "pl-5 hidden group-hover:block transition",
            active && "block"
          )}
        >
          <ul
            className={clsxm(
              "border-l border-gray-700 pl-4",
              !expend && "hidden"
            )}
          >
            {childrens?.map((menu: any, index: number) => {
              return (
                <SimpleRowV1
                  key={`d-s-item-${index}-${menu?.id}`}
                  expend={expend}
                  title={menu?.title}
                  url={menu?.url}
                  iconClass={menu?.iconClass}
                  active={
                    menu.url === pathname || pathname?.indexOf(menu.url) > -1
                  }
                  className="mt-1"
                />
              );
            })}
          </ul>
        </div>
      ) : null}
    </li>
  );
}
