import { MessageSender, MessageStatus } from "../enums/messageEnums";

export interface MessageElement {
  sender: MessageSender;
  message: string;
  time: Date;
  status: MessageStatus;
}
