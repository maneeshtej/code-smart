"use client";

import { Spacer } from "@/components/shared/utils";
import { messages } from "@/constants/dev";
import { MessageSender, MessageStatus } from "@/constants/enums/messageEnums";
import { MessageElement } from "@/constants/interfaces/messageInterfaces";
import {
  Bot,
  BotMessageSquare,
  Send,
  TriangleAlertIcon,
  User,
} from "lucide-react";
import React, { useRef } from "react";

const AssistantTab = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const message: string | undefined = inputRef.current?.value.trim();
    if (!message) return;

    const messageElement: MessageElement = {
      sender: MessageSender.User,
      message: message,
      time: new Date(),
      status: MessageStatus.Processing,
    };

    messages.push(messageElement);

    inputRef.current!.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden max-w-full pl-4 pb-4">
      <div className="flex-1 overflow-y-auto w-full flex flex-col-reverse gap-4 py-2">
        {messages &&
          messages.map((message, index) => {
            const user: boolean = message.sender === MessageSender.User;
            const assistant: boolean =
              message.sender === MessageSender.Assistant;
            const system: boolean = message.sender === MessageSender.System;
            return (
              <div
                key={index}
                className={`flex ${
                  user ? "flex-row-reverse" : "flex-row"
                } items-center gap-4 w-full`}
              >
                {user ? (
                  <User size={20} />
                ) : assistant ? (
                  <Bot size={20} />
                ) : (
                  <TriangleAlertIcon size={20} />
                )}

                <div
                  className={`p-4 rounded-xl ${
                    user
                      ? "bg-brightBlue"
                      : assistant
                      ? "bg-brightGreen"
                      : "border-2 border-brightPink"
                  } ${system ? "w-full" : "max-w-[60%]"}`}
                >
                  {message.message}
                </div>
              </div>
            );
          })}
      </div>
      <Spacer />
      <div className="flex h-17 w-ful">
        <div className="h-full w-full bg-background-dark flex flex-row items-center gap-4 px-4 rounded-xl">
          <BotMessageSquare size={20} />
          <input
            className="flex w-full h-full focus:outline-none"
            placeholder="Ask Assistant"
            onKeyDown={handleKeyDown}
          />
          <button className="h-full cursor-pointer" onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantTab;
