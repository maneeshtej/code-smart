"use client";

import React, { useState } from "react";
import QuestionTabComponent from "./tabs/QuestionTabComponent";
import AssistantComponent from "./tabs/AssistantTabComponent";

const ContentComponent = ({ result, code }) => {
  const tabs = [
    { id: 0, name: "Question", component: QuestionTabComponent },
    { id: 1, name: "Run", component: null },
    { id: 2, name: "Assistant", component: AssistantComponent },
    { id: 3, name: "Solution", component: null },
    { id: 4, name: "Playlist", component: null },
  ];

  const [activeTabID, setActiveTabID] = useState(0);
  const ActiveComponent = tabs.find((tab) => tab.id === activeTabID).component;

  return (
    <div className="h-full w-full flex flex-col">
      <div className=" border-border-light border-b-1 w-full overflow-x-scroll overflow-y-hidden">
        <div className="flex gap-10 p-6 min-w-max">
          {tabs.map((tab, index) => {
            const id = tab.id;
            const name = tab.name;
            return (
              <span
                className={`gap-10 cursor-pointer ${
                  activeTabID === id ? "text-pastel-orange" : ""
                }`}
                key={index}
                onClick={() => setActiveTabID(id)}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        <div className="h-full">
          {ActiveComponent && <ActiveComponent result={result} code={code} />}
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;
