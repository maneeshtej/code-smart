import { Heading, Spacer, Title } from "@/components/shared/utils";
import { useQuestionStore } from "@/stores/useQuestionStore";
import React from "react";
import ReactMarkdown from "react-markdown";

const QuestionTab = () => {
  const question = useQuestionStore((s) => s.question);
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto max-w-full pb-20">
      <div className="p-6">
        <Heading text={question?.title || "unknown"} />
      </div>
      <div className="pl-6 flex flex-col items-start w-full">
        <span className="font-medium text-xl">
          {question?.question || "Unknown"}{" "}
        </span>
        <Spacer height={15} />
        <div className="flex flex-row">
          <h3
            className={`inline-block
               ${
                 question?.difficulty === "Easy"
                   ? "bg-brightBlue"
                   : question?.difficulty === "Medium"
                   ? "bg-brightOrange"
                   : "bg-brightPink "
               }
                text-text px-3 py-1 rounded-full text-sm`}
          >
            {question?.difficulty || "Unknown"}
          </h3>
          <div className="flex flex-row">
            {question?.topics.map((topic, key) => (
              <h3
                className="bg-brightGreen text-text px-3 py-1 rounded-full text-sm ml-2"
                key={key}
              >
                {topic}
              </h3>
            ))}
          </div>
        </div>
        <Spacer height={15} />
      </div>
      <div className="px-6">
        <ReactMarkdown>{question && question?.description}</ReactMarkdown>
        <Spacer height={30} />
        <div className="flex flex-col">
          <Title text="Example" />
          <Spacer height={10} />
          <div className="bg-background-dark p-4 rounded-lg">
            {question &&
              question?.examples.map((example, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex flex-row gap-2">
                    <span className="text-brightGreen">Input: </span>
                    <span>{example.input}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <span className="text-brightGreen">Output: </span>
                    <span>{example.output}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Spacer height={30} />
        <div className="flex flex-col">
          <Title text="Constraints" />
          <Spacer />
          <div className="bg-background-dark p-4 rounded-lg font-mono text-sm">
            {question &&
              question?.constraints.map((constraint, index) => (
                <h3 key={index}>{constraint}</h3>
              ))}
          </div>
        </div>
        <Spacer height={30} />
        <div className="flex flex-col">
          <Title text="Edge cases" />
          <Spacer />
          <div className="pl-4 text-sm">
            {question &&
              question?.edgeCases.map((edgeCase, index) => (
                <h3 key={index}>{edgeCase}</h3>
              ))}
          </div>
        </div>
        <Spacer height={30} />
        <div className="flex flex-col">
          <Title text="Hints" />
          <Spacer />
          <div className="pl-4 text-sm">
            {question &&
              question?.hints.map((hint, index) => <h3 key={index}>{hint}</h3>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTab;
