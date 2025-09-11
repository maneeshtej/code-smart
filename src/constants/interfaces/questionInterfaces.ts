export interface Question {
  id?: string;
  userId: string;
  title: string;
  question: string;
  description: string;
  examples: Example[];
  constraints: string[];
  edgeCases: string[];
  hints: string[];
  topics: string[];
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  timeComplexity: string;
  spaceComplexity: string;
  createdAt?: string;
  editedAt?: string;
  solved?: boolean;
  status?: string;
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

export interface QuestionInfoInterface {
  id: string;
  questionId: string;
  created_at: string;
  edited_at: string;
  solved: boolean;
  status: string;
}

export interface fetchedQuestionInterface {
  id: string;
  user_id: string;
  title: string;
  question: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time_complexity: string;
  space_complexity: string;
  tags: string[]; // stored as JSON string in DB
  topics: string[]; // array
  constraints: string[]; // array
  edge_cases: string[]; // array
  hints: string[]; // array
  examples: string; // JSON string in DB, you may want to parse into array
  question_info: QuestionInfoInterface[]; // joined relation
}

export interface SubmissionInterface {
  id?: string;
  userID: string;
  questionID: string;
  name?: string;
  solved: boolean;
  output: string;
  message: string;
  submittedAt: string;
  runtimeSeconds: number;
  code: Record<string, string>;
}

export const questionMapSnakeCaseToCamelCase = (
  data: fetchedQuestionInterface
) => {
  const question: Question = {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    question: data.question,
    description: data.description,
    difficulty: data.difficulty,
    timeComplexity: data.time_complexity,
    spaceComplexity: data.space_complexity,
    tags: data.tags,
    topics: data.topics,
    constraints: data.constraints,
    edgeCases: data.edge_cases,
    hints: data.hints,
    examples: JSON.parse(data.examples),
    createdAt: data.question_info[0].created_at,
    editedAt: data.question_info[0].edited_at,
    solved: data.question_info[0].solved,
    status: data.question_info[0].status,
  };

  return question;
};
