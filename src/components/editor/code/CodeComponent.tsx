"use client";

import { Editor } from "@monaco-editor/react";
import React, { useRef } from "react";
import * as monacoEditor from "monaco-editor";
import { useCodeStore } from "@/stores/useCodeStore";

const CodeComponent = () => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );
  const functionCode = useCodeStore((s) => s.java.functionCode);
  const setFunctionCode = useCodeStore((s) => s.setFunctionCode);

  const handleEditorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-full w-full bg-background-dark rounded-xl flex flex-col items-end justify-end p-6">
      <div className="h-40 w-full"></div>
      <div className="h-full w-full">
        <Editor
          theme="vs-dark"
          height="100%"
          language="java"
          value={functionCode}
          onChange={(value) => setFunctionCode("java", value || "")}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default CodeComponent;
