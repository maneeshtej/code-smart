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

export interface Example {
  input: string;
  output: string;
}

export interface QuestionStore {
  question: Question | null;
  setQuestion: (q: Question) => void;
  clearQuestion: () => void;
}
