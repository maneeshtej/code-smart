/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LanguageKey } from "@/constants/interfaces/codeInterfaces";
import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { generateCurrentLanguageCodeWithGemini } from "@/lib/gemini/codeGenerate";
import { useCodeStore } from "@/stores/useCodeStore";
import { Editor } from "@monaco-editor/react";
import { Play } from "lucide-react";
import React, { useEffect, useState } from "react";

const CodeEditor = ({ question }: { question: Question | null }) => {
  const currentLanguage = useCodeStore((state) => state.currentLanguage);
  const functionCode = useCodeStore((state) => state.getCurrentFunctionCode());
  const setMainCode = useCodeStore((state) => state.setCurrentMainCode);
  const setFunctionCode = useCodeStore((state) => state.setCurrentFunctionCode);
  const setLanguage = useCodeStore((state) => state.setCurrentLanguage);

  // Loading states

  const [loading, setLoading] = useState<boolean>(false);

  const languages: LanguageKey[] = [
    "java",
    "python",
    "c",
    "cpp",
    "javascript",
    "csharp",
  ];

  const fetchCurrentLangaugeCode = async () => {
    try {
      setLoading(true);
      const res: apiResponseInterface =
        await generateCurrentLanguageCodeWithGemini(
          currentLanguage,
          question?.title,
          question?.question,
          question?.description
        );

      if (!res.success) {
        console.error("Error");
        return;
      }

      setFunctionCode(res.data.functionCode);
      setMainCode(res.data.mainCode);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Define the theme in onMount
  const handleEditorMount = (editor: any, monaco: any) => {
    monaco.editor.defineTheme("pitch-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "C586C0" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "type", foreground: "4EC9B0" },
        { token: "function", foreground: "DCDCAA" },
      ],
      colors: {
        "editor.background": "#000000",
        "editor.lineHighlightBackground": "#2a2d2e",
        "editorCursor.foreground": "#AEAFAD",
        "editorLineNumber.foreground": "#858585",
        "editorLineNumber.activeForeground": "#c6c6c6",
        "editorIndentGuide.background": "#404040",
        "editorIndentGuide.activeBackground": "#707070",
      },
    });
    monaco.editor.setTheme("pitch-dark");
  };

  useEffect(() => {
    console.log("Current Language:", currentLanguage);

    if (functionCode && functionCode.trim() !== "") {
      console.log("Using cached function code, skipping API call.");
      return;
    }
    fetchCurrentLangaugeCode();
  }, [currentLanguage]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="w-full flex flex-row h-10 border-b border-borderc px-4 items-center">
        {!loading ? (
          <select
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value as LanguageKey)}
            className="bg-background-dark border border-borderc text-text text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brightPurple"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-32 h-8 bg-background rounded-md animate-pulse" />
        )}

        <button className="ml-auto flex flex-row items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-brightPurple hover:bg-brightPurple/10 transition-colors">
          <span>Run</span>
          <Play height={14} />
        </button>
      </div>
      <div className="flex w-full h-5"></div>

      {/* Editor */}

      <div className="flex-1 w-full bg-background-dark">
        {!loading ? (
          <Editor
            height="100%"
            defaultLanguage={currentLanguage || "javascript"}
            theme="pitch-dark"
            value={functionCode || ""}
            onChange={(value) => setFunctionCode(value || "")}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: true },
              fontSize: 12,
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              padding: { top: 0, bottom: 0 },
              automaticLayout: true,
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center animate-pulse">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
