import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabBar({ tabList, onChange }: any) {
  return (
    <div className="w-full">
      <Tab.Group
        onChange={(index: number) => {
          onChange(tabList[index]);
        }}
      >
        <Tab.List className="flex space-x-1 rounded-xl p-1 bg-white shadow-md">
          {tabList?.map((tab: any) => (
            <Tab
              key={tab.title}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-400 px-5",
                  selected
                    ? " border-2 border-rose-700 text-rose-700 focus:outline-none"
                    : "hover:text-rose-700"
                )
              }
            >
              {tab?.title}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
