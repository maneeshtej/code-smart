import { QuestionStore } from "@/constants/interfaces/questionInterfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
