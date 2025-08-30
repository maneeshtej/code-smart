export type LanguageKey =
  | "java"
  | "python"
  | "c"
  | "cpp"
  | "javascript"
  | "csharp";

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
