"use client";

import React, { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";

const CodeEditorPanel = ({ code, setCode }) => {
  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("pitch-black", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "", foreground: "E5E9F0", background: "0B0C10" },
          { token: "comment", foreground: "5C6370", fontStyle: "italic" },
          { token: "keyword", foreground: "C678DD" },
          { token: "number", foreground: "D19A66" },
          { token: "string", foreground: "98C379" },
          { token: "variable", foreground: "E06C75" },
        ],
        colors: {
          "editor.background": "#121212",
          "editor.foreground": "#E5E9F0",
          "editorCursor.foreground": "#FFFFFF",
          "editorLineNumber.foreground": "#4B5263",
          "editorLineNumber.activeForeground": "#ABB2BF",
          "editor.lineHighlightBackground": "#1F1F1F",
          "editor.selectionBackground": "#3E4451",
        },
      });
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="pitch-black"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default CodeEditorPanel;
