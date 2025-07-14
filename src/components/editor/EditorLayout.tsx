import React from "react";
import TabLayout from "./tabs/TabLayout";
import { Question } from "@/stores/useQuestionStore";
import CodeComponent from "./code/CodeComponent";
import { Spacer } from "../shared/utils";

type EditorProps = {
  id: string;
  question: Question;
};

const EditorLayout = ({ id, question }: EditorProps) => {
  console.log(id);
  return (
    <div className="h-full w-full flex flex-col xl:flex-row overflow-y-auto gap-6">
      <div className=" min-h-[90dvh] xl:flex xl:flex-1">
        <TabLayout question={question} />
      </div>
      <div className="xl:hidden">
        <Spacer />
      </div>
      <div className=" min-h-[90dvh] xl:flex xl:flex-1">
        <div className="h-full w-full flex p-4">
          <CodeComponent />
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
