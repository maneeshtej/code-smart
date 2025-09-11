"use client";

import CodeEditor from "@/components/code-editor/CodeEditor";
import EditorTabs from "@/components/code-editor/EditorTabs";
import SideBar from "@/components/code-editor/SideBar";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

import React, { useState } from "react";

const EditorPage = () => {
  const question = useQuestionStore((s) => s.question);

  const [showSidebar, setShowSidebar] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <div className="h-screen w-screen bg-background-dark text-text font-open-sans flex flex-row relative">
      {/* left */}
      {showSidebar && (
        <div className="flex flex-col h-full flex-1 border-r-1 border-borderc transition-all duration-200 min-w-0">
          <SideBar question={question} />
        </div>
      )}
      {/* Toggle icon between left and middle */}
      <div
        className="flex items-center justify-center z-20"
        style={{
          width: "0px",
          minWidth: "0px",
          position: "relative",
        }}
      >
        <button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-dark border border-borderc rounded-full p-1 shadow-lg hover:bg-background transition"
          style={{
            zIndex: 30,
            marginLeft: showSidebar ? "30px" : "30px",
            marginRight: showSidebar ? "30px" : "30px",
          }}
          onClick={() => setShowSidebar((prev) => !prev)}
          aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
        >
          {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      {/* middle */}
      <div className="flex h-full flex-3 border-r-1 border-borderc min-w-0">
        <CodeEditor question={question} />
      </div>
      {/* Toggle icon between middle and right */}
      <div
        className="flex items-center justify-center z-20"
        style={{
          width: "0px",
          minWidth: "0px",
          position: "relative",
        }}
      >
        <button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-dark border border-borderc rounded-full p-1 shadow-lg hover:bg-background transition"
          style={{
            zIndex: 30,
            marginLeft: showRightPanel ? "-30px" : "-30px",
            marginRight: showRightPanel ? "-30px" : "-30x",
          }}
          onClick={() => setShowRightPanel((prev) => !prev)}
          aria-label={showRightPanel ? "Hide right panel" : "Show right panel"}
        >
          {showRightPanel ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>
      {/* right */}
      {showRightPanel && (
        <div className="flex h-full flex-2 flex-col overflow-hidden min-w-0">
          <EditorTabs question={question} />
        </div>
      )}
    </div>
  );
};

export default EditorPage;
