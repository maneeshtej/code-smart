import React from "react";

const QuestionTabComponent = ({ result }) => {
  if (!result) return null;

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Title & Difficulty */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{result.title}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            result.difficulty === "Easy"
              ? "bg-green-800 text-green-200"
              : result.difficulty === "Medium"
              ? "bg-yellow-800 text-yellow-200"
              : "bg-red-800 text-red-200"
          }`}
        >
          {result.difficulty}
        </span>
      </div>

      {/* Question Summary */}
      <div>
        <h2 className="text-lg font-semibold">Question</h2>
        <p className="text-gray-300">{result.question}</p>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold">Description</h2>
        <p className="text-gray-300 whitespace-pre-line">
          {result.description}
        </p>
      </div>

      {/* Examples */}
      <div>
        <h2 className="text-lg font-semibold">Examples</h2>
        <div className="space-y-4">
          {result.examples &&
            result.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-bg-dark rounded-md p-4 border border-border-light"
              >
                <p>
                  <span className="font-semibold text-gray-400">Input:</span>{" "}
                  {ex.input}
                </p>
                <p>
                  <span className="font-semibold text-gray-400">Output:</span>{" "}
                  {ex.output}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Function */}
      <div>
        <h2 className="text-lg font-semibold">Function Signature</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-sm">
          <code>{result.function}</code>
        </pre>
      </div>

      {/* Main/Test */}
      <div>
        <h2 className="text-lg font-semibold">Test Case</h2>
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-sm">
          <code>{result.main}</code>
        </pre>
      </div>
    </div>
  );
};

export default QuestionTabComponent;
