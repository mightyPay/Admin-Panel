import { useState } from "react";
import { Tab } from "@headlessui/react";
import clsxm from "../../utils/clsxm";

export default function TabsV1({ tabListClassName, tabClassName, tabs }: any) {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List
          className={clsxm(
            "flex space-x-1 rounded-md bg-white p-1",
            tabListClassName
          )}
        >
          {tabs?.map((tab: any) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                clsxm(
                  "w-full rounded-md py-2.5 text-sm font-medium leading-5 ",
                  "text-gray-500 hover:text-black",
                  selected && "bg-[#f2f3f8] text-black",
                  tabClassName && tabClassName({ selected })
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs?.map(({ Comp, ...tab }: any, index: number) => (
            <Tab.Panel key={tab.id} className={clsxm("p-3")}>
              <Comp {...tab} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
