import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageKey = "java" | "python" | "c" | "cpp" | "javascript" | "csharp";

export interface LanguageCode {
  mainCode: string;
  functionCode: string;
}

export interface CodeState {
  java: LanguageCode;
  python: LanguageCode;
  c: LanguageCode;
  cpp: LanguageCode;
  javascript: LanguageCode;
  csharp: LanguageCode;
  setMainCode: (lang: LanguageKey, code: string) => void;
  setFunctionCode: (lang: LanguageKey, code: string) => void;
  removeMainCode: (lang: LanguageKey) => void;
  removeFunctionCode: (lang: LanguageKey) => void;
  clearAllCodes: () => void;
}

// Default blank code block
const defaultLangCode: LanguageCode = {
  mainCode: "",
  functionCode: "",
};

export const useCodeStore = create<CodeState>()(
  persist(
    (set) => ({
      java: { ...defaultLangCode },
      python: { ...defaultLangCode },
      c: { ...defaultLangCode },
      cpp: { ...defaultLangCode },
      csharp: { ...defaultLangCode },
      javascript: { ...defaultLangCode },

      setMainCode: (lang, code) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            mainCode: code,
          },
        })),

      setFunctionCode: (lang, code) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            functionCode: code,
          },
        })),

      removeMainCode: (lang) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            main: "",
          },
        })),

      removeFunctionCode: (lang) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            function: "",
          },
        })),

      clearAllCodes: () =>
        set(() => ({
          java: { ...defaultLangCode },
          python: { ...defaultLangCode },
          c: { ...defaultLangCode },
          cpp: { ...defaultLangCode },
          javascript: { ...defaultLangCode },
          csharp: { ...defaultLangCode },
        })),
    }),
    { name: "code-store" }
  )
);
