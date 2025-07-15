"use client";
import EditorLayout from "@/components/editor/EditorLayout";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditorPage = () => {
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (id.startsWith("gen-")) {
      console.log("generate");
    } else {
      console.log("get from db");
    }
  }, [id]);

  return (
    <div className="bg-background text-text h-screen w-screen flex flex-row">
      <div className="flex flex-1">
        <EditorLayout id={id} />
      </div>
    </div>
  );
};

export default EditorPage;
