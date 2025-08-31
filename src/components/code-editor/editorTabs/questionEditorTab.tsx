import { Question } from "@/constants/interfaces/questionInterfaces";

const QuestionTabContent = ({ question }: { question: Question | null }) => {
  if (!question) {
    return <div className="p-4 text-sm text-border">No question selected.</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Title */}
      <div className="font-bold text-3xl">{question.title}</div>
      {/* Question */}
      <div className="text-lg font-semibold">Question:</div>
      <div className="text-base text-border">{question.question}</div>
      {/* Description */}
      <div className="text-lg font-semibold mt-2">Description:</div>
      <div className="text-base text-border">{question.description}</div>
      {/* Examples */}
      <div className="text-lg font-semibold mt-2">Examples:</div>
      <div className="flex flex-col gap-2">
        {question.examples && question.examples.length > 0 ? (
          question.examples.map((ex, idx) => (
            <div key={idx} className="bg-background-dark rounded p-2">
              <div>
                <span className="font-bold">Input:</span> {ex.input}
              </div>
              <div>
                <span className="font-bold">Output:</span> {ex.output}
              </div>
            </div>
          ))
        ) : (
          <div className="text-border">No examples provided.</div>
        )}
      </div>
      {/* Constraints */}
      <div className="text-lg font-semibold mt-2">Constraints:</div>
      <div className="list-disc list-inside text-base text-border">
        {question.constraints && question.constraints.length > 0 ? (
          question.constraints.map((c, idx) => (
            <div key={idx} className="font-mono text-blue-400 text-sm pl-4">
              {c}
            </div>
          ))
        ) : (
          <div>No constraints provided.</div>
        )}
      </div>
      {/* Edge Cases */}
      <div className="text-lg font-semibold mt-2">Edge Cases:</div>
      <ul className="list-disc list-inside text-base text-border">
        {question.edgeCases && question.edgeCases.length > 0 ? (
          question.edgeCases.map((e, idx) => (
            <li key={idx} className="">
              {e}
            </li>
          ))
        ) : (
          <li>No edge cases provided.</li>
        )}
      </ul>
      {/* Time & Space Complexity */}
      <div className="flex flex-row gap-8 mt-2">
        <div>
          <span className="font-semibold">Time Complexity:</span>{" "}
          <span className="text-border">{question.timeComplexity}</span>
        </div>
        <div>
          <span className="font-semibold">Space Complexity:</span>{" "}
          <span className="text-border">{question.spaceComplexity}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionTabContent;
