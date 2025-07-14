import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageKey = "java" | "python" | "c" | "cpp" | "javascript" | "csharp";

export interface LanguageCode {
  mainCode: string;
  functionCode: string;
}

export interface CodeState {
  currentLanguage: LanguageKey;
  java: LanguageCode;
  python: LanguageCode;
  c: LanguageCode;
  cpp: LanguageCode;
  javascript: LanguageCode;
  csharp: LanguageCode;
  setMainCode: (lang: LanguageKey, code: string) => void;
  setCurrentMainCode: (code: string) => void;
  setCurrentFunctionCode: (code: string) => void;
  setFunctionCode: (lang: LanguageKey, code: string) => void;
  setCurrentLanguage: (lang: LanguageKey) => void;
  getCurrentMainCode: () => string;
  getCurrentFunctionCode: () => string;
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
    (set, get) => ({
      java: { ...defaultLangCode },
      python: { ...defaultLangCode },
      c: { ...defaultLangCode },
      cpp: { ...defaultLangCode },
      csharp: { ...defaultLangCode },
      javascript: { ...defaultLangCode },
      currentLanguage: "java",

      setMainCode: (lang, code) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            mainCode: code,
          },
        })),

      setCurrentMainCode: (code) => {
        const lang = get().currentLanguage;
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            mainCode: code,
          },
        }));
      },

      setFunctionCode: (lang, code) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            functionCode: code,
          },
        })),

      setCurrentFunctionCode: (code) => {
        const lang = get().currentLanguage;
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            functionCode: code,
          },
        }));
      },

      setCurrentLanguage: (lang) =>
        set((state) => ({
          ...state,
          currentLanguage: lang,
        })),

      getCurrentMainCode: () => {
        const state = get();
        return state[state.currentLanguage].mainCode;
      },

      getCurrentFunctionCode: () => {
        const state = get();
        return state[state.currentLanguage].functionCode;
      },

      removeMainCode: (lang) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            mainCode: "",
          },
        })),

      removeFunctionCode: (lang) =>
        set((state) => ({
          ...state,
          [lang]: {
            ...state[lang],
            functionCode: "",
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
