import { IconLabel } from "@/components/shared/utils";
import { Question } from "@/stores/useQuestionStore";
import {
  ChevronLeft,
  PenLine,
  User,
  Play,
  Bot,
  Lightbulb,
  Files,
} from "lucide-react";
import React from "react";
import QuestionTab from "./QuestionTab";

type TabProps = {
  question: Question;
};

const menuItems = [
  { name: "Question", icon: PenLine },
  { name: "Run", icon: Play },
  { name: "Assistant", icon: Bot },
  { name: "Solution", icon: Lightbulb },
  { name: "Related", icon: Files },
];

const TabLayout = ({ question }: TabProps) => {
  return (
    <div className="h-full w-full flex flex-col xl:flex-row">
      <div className=" border-b-1 xl:border-r-1 xl:border-b-0 border-border flex flex-row xl:flex-col pb-2">
        <div className="p-4 cursor-pointer flex items-center justify-center">
          <ChevronLeft size={30} />
        </div>
        <div className="flex flex-1 flex-row fixed xl:static bottom-0 left-0 right-0 border-t-1 xl:border-t-0 border-border bg-background xl:flex-col items-center justify-between xl:justify-center">
          {menuItems &&
            menuItems.map((item, index) => {
              return (
                <div className="p-4 cursor-pointer" key={index}>
                  <IconLabel icon={<item.icon />} label={item.name} />
                </div>
              );
            })}
        </div>
        <div className="p-4 cursor-pointer flex items-center justify-center">
          <User size={20} />
        </div>
      </div>
      <div>
        <QuestionTab question={question} />
      </div>
    </div>
  );
};

export default TabLayout;
