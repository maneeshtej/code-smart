interface ValidationMessage {
  type: "message" | "code";
  content: string;
}

export interface judgeResultInterface {
  pass: boolean; // true if code runs without errors
  progress: number; // 0-100, representing completeness
  message: ValidationMessage[]; // array of messages or code blocks
  expectedOutcome: string; // expected output or error description
}
