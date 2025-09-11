import { SubmissionInterface } from "@/constants/interfaces/questionInterfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubmissionStore {
  submissions: SubmissionInterface[];
  addSubmission: (submission: SubmissionInterface) => void;
  updateSubmission: (id: string, updates: Partial<SubmissionInterface>) => void;
  removeSubmission: (id: string) => void;
  clearSubmissions: () => void;
}

export const useSubmissionStore = create(
  persist<SubmissionStore>(
    (set) => ({
      submissions: [],
      addSubmission: (submission) =>
        set((state) => ({
          submissions: [...state.submissions, submission],
        })),
      updateSubmission: (id, updates) =>
        set((state) => ({
          submissions: state.submissions.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      removeSubmission: (id) =>
        set((state) => ({
          submissions: state.submissions.filter((s) => s.id !== id),
        })),
      clearSubmissions: () => set({ submissions: [] }),
    }),
    {
      name: "submission-storage", // key in localStorage
    }
  )
);
