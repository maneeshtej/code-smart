"use client";

import { useParams } from "next/navigation";
import React from "react";

const EditorPage = () => {
  const params = useParams();
  const id = params.id;
  return <div>EditorPage : {id}</div>;
};

export default EditorPage;
