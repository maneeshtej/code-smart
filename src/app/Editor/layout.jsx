// app/dashboard/layout.jsx

import HeaderBar from "@/components/Dashboard/Header/Header";
import React from "react";

export default function EditorLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <HeaderBar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
