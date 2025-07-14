"use client";

import { Editor } from "@monaco-editor/react";
import React, { useRef } from "react";
import * as monacoEditor from "monaco-editor";
import { useCodeStore } from "@/stores/useCodeStore";
import LanguageSelector from "./helpers/LanguageSelector";
import { Spacer } from "@/components/shared/utils";

const CodeComponent = () => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );
  // const [currentCode, setCurrentCode] =>
  const functionCode = useCodeStore((s) => s.getCurrentFunctionCode());
  const setFunctionCode = useCodeStore((s) => s.setCurrentFunctionCode);
  const language = useCodeStore((s) => s.currentLanguage);

  const handleEditorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-full w-full bg-background-dark rounded-xl flex flex-col items-end justify-end p-6">
      <div className="w-full">
        <LanguageSelector />
      </div>
      <Spacer height={20} />
      <div className="h-full w-full">
        <Editor
          theme="vs-dark"
          height="100%"
          language={language}
          value={functionCode}
          onChange={(value) => setFunctionCode(value || "")}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default CodeComponent;
