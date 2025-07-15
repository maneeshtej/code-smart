import { MessageSender, MessageStatus } from "./enums/messageEnums";
import { MessageElement } from "./interfaces/messageInterfaces";

export const messages: MessageElement[] = [
  {
    sender: MessageSender.User,
    message: "Can you explain recursion with an example?",
    time: new Date(Date.now()),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message:
      "Sure! Recursion is a function calling itself. For example, calculating factorial of a number:",
    time: new Date(Date.now() - 9500),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message: `int factorial(int n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }`,
    time: new Date(Date.now() - 9000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.User,
    message: "Show me the iterative version.",
    time: new Date(Date.now() - 4000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message: "Sure, give me a second...",
    time: new Date(Date.now() - 3500),
    status: MessageStatus.Processing,
  },
  {
    sender: MessageSender.System,
    message: "AI is taking longer than usual. You can retry or wait.",
    time: new Date(Date.now() - 2000),
    status: MessageStatus.Failed,
  },
  {
    sender: MessageSender.User,
    message: "Can you explain recursion with an example?",
    time: new Date(Date.now() - 1000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message:
      "Sure! Recursion is a function calling itself. For example, calculating factorial of a number:",
    time: new Date(Date.now() - 9500),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message: `int factorial(int n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }`,
    time: new Date(Date.now() - 9000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.User,
    message: "Show me the iterative version.",
    time: new Date(Date.now() - 4000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message: "Sure, give me a second...",
    time: new Date(Date.now() - 3500),
    status: MessageStatus.Processing,
  },
  {
    sender: MessageSender.System,
    message: "AI is taking longer than usual. You can retry or wait.",
    time: new Date(Date.now() - 2000),
    status: MessageStatus.Failed,
  },
  {
    sender: MessageSender.User,
    message: "Can you explain recursion with an example?",
    time: new Date(Date.now() - 1000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message:
      "Sure! Recursion is a function calling itself. For example, calculating factorial of a number:",
    time: new Date(Date.now() - 9500),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message: `int factorial(int n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }`,
    time: new Date(Date.now() - 9000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.User,
    message: "Show me the iterative version.",
    time: new Date(Date.now() - 4000),
    status: MessageStatus.Processed,
  },
  {
    sender: MessageSender.Assistant,
    message: "Sure, give me a second...",
    time: new Date(Date.now() - 3500),
    status: MessageStatus.Processing,
  },
  {
    sender: MessageSender.System,
    message: "AI is taking longer than usual. You can retry or wait.",
    time: new Date(Date.now() - 2000),
    status: MessageStatus.Failed,
  },
];
