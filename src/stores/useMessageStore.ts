import { create } from "zustand";
import { MessageElement } from "@/constants/interfaces/messageInterfaces";
import { messages } from "@/constants/dev";

interface MessageStore {
  messages: MessageElement[];
  addMessage: (msg: MessageElement) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: messages,
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
  clearMessages: () => set({ messages: [] }),
}));
