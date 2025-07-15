import React from "react";
import TabLayout from "./tabs/TabLayout";
import CodeComponent from "./code/CodeComponent";
import { Spacer } from "../shared/utils";

type EditorProps = {
  id: string;
};

const EditorLayout = ({ id }: EditorProps) => {
  console.log(id);
  return (
    <div className="h-full w-full flex flex-col xl:flex-row overflow-y-auto xl:overflow-y-hidden gap-6 min-w-full pb-20">
      <div className=" min-h-[80dvh] xl:min-h-[100dvh] xl:flex xl:flex-1 overflow-auto">
        <TabLayout />
      </div>
      <div className="xl:hidden">
        <Spacer />
      </div>
      <div className=" min-h-[80dvh] xl:min-h-[100dvh] xl:flex xl:flex-1">
        <div className="h-full w-full flex p-4">
          <CodeComponent />
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
