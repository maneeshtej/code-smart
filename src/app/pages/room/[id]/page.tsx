"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditorLayout from "@/components/editor/EditorLayout";

const elems: number[] = [1, 2, 3, 4, 5, 7, 8, 9, 10];

const RoomPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const storedQuestion = localStorage.getItem(`room-${id}-question`);
      setQuestion(storedQuestion);
    }
  }, [id]);

  return (
    <div className="h-screen w-screen bg-background flex flex-col xl:flex-row">
      {/* Sidebar for video/user tiles */}
      <div className="p-4 w-full xl:w-72 h-fit xl:h-full border-b xl:border-r border-border flex flex-row xl:flex-col gap-4 overflow-x-auto xl:overflow-y-auto bg-background-light">
        {elems.map((elem, index) => (
          <div
            key={index}
            className="w-64 xl:w-full h-40 rounded-xl bg-background-dark text-text flex items-center justify-center flex-shrink-0"
          >
            <span className="text-sm text-muted">
              Video Placeholder {index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Main coding/video area */}
      <div className="flex-1 h-full w-full overflow-auto pb-4">
        <EditorLayout id={"string"} />
      </div>
    </div>
  );
};

export default RoomPage;
