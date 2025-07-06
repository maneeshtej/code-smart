import React from "react";

export default function DashboardPage() {
  return (
    <div className="h-full w-full overflow-auto flex flex-col">
      <div className="flex flex-col xl:flex-row p-4 gap-4 min-h-full">
        {/* Left Panel */}
        <div className="flex-1 bg-bg-dark rounded-lg min-h-[70vh] xl:h-full"></div>

        {/* Right Panel */}
        <div className="flex-1 bg-bg-dark rounded-lg min-h-[70vh] xl:h-full"></div>
      </div>
    </div>
  );
}
