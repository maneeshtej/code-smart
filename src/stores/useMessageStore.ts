import { create } from "zustand";
import { MessageElement } from "@/constants/interfaces/messageInterfaces";
import { persist, PersistOptions } from "zustand/middleware";

interface MessageStore {
  messages: MessageElement[];
  addMessage: (msg: MessageElement) => void;
  clearMessages: () => void;
}

const defaultMessages: MessageElement[] = [];

type MessageStorePersist = PersistOptions<MessageStore>;

export const useMessageStore = create<MessageStore>()(
  persist<MessageStore, [], [], MessageStorePersist>(
    (set) => ({
      messages: defaultMessages,
      addMessage: (msg) =>
        set((state) => ({
          messages: [...state.messages, msg],
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "messageStore", // key in localStorage
    }
  )
);
