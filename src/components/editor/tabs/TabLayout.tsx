"use client";

import { IconLabel } from "@/components/shared/utils";
import {
  ChevronLeft,
  PenLine,
  User,
  Play,
  Bot,
  Lightbulb,
  Files,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import QuestionTab from "./QuestionTab";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: 0, name: "Question", icon: PenLine, component: QuestionTab },
  { id: 1, name: "Run", icon: Play, component: null },
  { id: 2, name: "Assistant", icon: Bot, component: null },
  { id: 3, name: "Solution", icon: Lightbulb, component: null },
  { id: 4, name: "Related", icon: Files, component: null },
];

const DummyComponent = () => {
  return <div className="flex items-center justify-center">Dummy</div>;
};

const TabLayout = () => {
  const router = useRouter();
  const [currentTabID, setCurrentTabID] = useState<number>(0);
  const CurrentComponent = menuItems.find(
    (item) => item.id === currentTabID
  )?.component;

  const navToDash = () => {
    router.back();
  };

  const handleTabChange = (id: number) => {
    if (currentTabID === id) return;

    setCurrentTabID(id);
  };

  useEffect(() => {
    console.log(menuItems.filter((item) => item.id === currentTabID));
  }, [currentTabID]);

  return (
    <div className="h-full w-full flex flex-col xl:flex-row">
      <div className=" border-b-1 xl:border-r-1 xl:border-b-0 border-border flex flex-row xl:flex-col pb-2">
        <div
          className="p-4 cursor-pointer flex items-center justify-center"
          onClick={navToDash}
        >
          <ChevronLeft size={30} />
        </div>
        <div
          className="flex flex-1 flex-row fixed xl:static bottom-0 left-0 right-0 border-t-1 xl:border-t-0
         border-border bg-background xl:flex-col items-center justify-between xl:justify-center z-10"
        >
          {menuItems &&
            menuItems.map((item, index) => {
              return (
                <div
                  className="p-4 cursor-pointer"
                  key={index}
                  onClick={() => handleTabChange(item.id)}
                >
                  <IconLabel
                    icon={
                      <item.icon
                        className={`${
                          currentTabID === item.id && "text-brightGreen"
                        } transition-all duration-200 ease-in-out`}
                      />
                    }
                    label={item.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="p-4 cursor-pointer flex items-center justify-center">
          <User size={20} />
        </div>
      </div>
      <div>{CurrentComponent ? <CurrentComponent /> : <DummyComponent />}</div>
    </div>
  );
};

export default TabLayout;
