"use client";

import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const model = editor.getModel();
    if (!model) return;

    const current = model.getValue();
    if (current == functionCode) return;

    editor.pushUndoStop();
    editor.executeEdits(null, [
      {
        range: model.getFullModelRange(),
        text: functionCode,
        forceMoveMarkers: true,
      },
    ]);
    editor.popUndoStop();
  }, [functionCode]);

  return (
    <div className="h-full w-full bg-background-dark rounded-xl flex flex-col items-end justify-end p-6">
      <div className="w-full">
        <LanguageSelector loading={loading} setLoading={setLoading} />
      </div>
      <Spacer height={20} />
      <div className={`h-full w-full ${loading ? "animate-pulse" : ""}`}>
        <Editor
          theme="vs-dark"
          height="100%"
          language={language}
          onChange={(value) => setFunctionCode(value || "")}
          onMount={handleEditorDidMount}
          options={{
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default CodeComponent;
