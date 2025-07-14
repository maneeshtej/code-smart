import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Question {
  id: string;
  title: string;
  question: string;
  description: string;
  examples: Example[];
  constraints: string[];
  edgeCases: string[];
  hints: string[];
  topics: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  timeComplexity: string;
  spaceComplexity: string;
}

interface Example {
  input: string;
  output: string;
}

interface QuestionStore {
  question: Question | null;
  setQuestion: (q: Question) => void;
  clearQuestion: () => void;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      question: null,
      setQuestion: (q) => set({ question: q }),
      clearQuestion: () => set({ question: null }),
    }),
    {
      name: "question-store",
    }
  )
);
