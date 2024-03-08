import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { GoSettings } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export default function SettingDropDown(props: any) {
  const location = useLocation();
  const { menus } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-white p-3 rounded-md shadow-md cursor-pointer">
          <GoSettings className="text-xl" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 flex flex-col gap-y-2">
            {menus?.map((menu: any, index: number) => {
              const { Icon, url } = menu || {};
              return (
                <Link to={url}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active || location.pathname === url
                            ? "bg-[#f2f3f8] text-black"
                            : "text-gray-500"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active || location.pathname === url ? (
                          <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
                        ) : (
                          <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
                        )}
                        {menu.title}
                      </button>
                    )}
                  </Menu.Item>
                </Link>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
