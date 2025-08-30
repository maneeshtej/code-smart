"use client";

import { useParams } from "next/navigation";
import EditorLayout from "@/components/editor/EditorLayout";
import VideoRoom from "@/components/video/VideoRoom";

const RoomPage = () => {
  const { id } = useParams();

  if (typeof id !== "string") return null;

  return (
    <div className="h-screen w-screen flex flex-col xl:flex-row bg-background">
      {/* Sidebar - video area */}
      <div className="p-4 w-full xl:w-72 h-fit xl:h-full border-b xl:border-r border-border flex flex-row xl:flex-col gap-4 overflow-x-auto xl:overflow-y-auto">
        <VideoRoom roomId={id} userId={id} />
      </div>

      {/* Editor area */}
      <div className="flex-1 h-full w-full overflow-auto">
        <EditorLayout id={id} />
      </div>
    </div>
  );
};

export default RoomPage;
