"use client";

import { judgeResultInterface } from "@/constants/interfaces/aiResponseInterfaces";
import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { judgeWithGemini } from "@/lib/gemini/assistant";
import { useCodeStore } from "@/stores/useCodeStore";
import React, { useState } from "react";

const RunTabContent = ({ question }: { question: Question | null }) => {
  const codeStore = useCodeStore();
  const mainCode = codeStore.getCurrentMainCode(); // main/test code
  const functionCode = codeStore.getCurrentFunctionCode(); // user function code

  const [judgeResponse, setJudgeResponse] =
    useState<judgeResultInterface | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJudgeResponse = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res: apiResponseInterface = await judgeWithGemini(
        mainCode,
        functionCode,
        question
      );

      if (!res.success) {
        console.error("Failed to judge:", res);
        setLoading(false);
        return;
      }

      const data: judgeResultInterface = res.data;
      console.log("Judge Response:", data);
      setJudgeResponse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-4 text-gray-100">
      {/* Judge button */}
      <div className="flex items-center mb-4">
        <button
          onClick={fetchJudgeResponse}
          className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 disabled:opacity-50"
          disabled={loading || !question}
        >
          {loading ? "Judging..." : "Judge"}
        </button>
      </div>

      {/* Pass/Fail */}
      {loading ? (
        <div className="h-10 w-24 bg-gray-700 rounded animate-pulse mb-4" />
      ) : (
        judgeResponse && (
          <h1
            className={`text-4xl font-bold mb-4 ${
              judgeResponse.pass ? "text-green-500" : "text-red-500"
            }`}
          >
            {judgeResponse.pass ? "Pass" : "Fail"}
          </h1>
        )
      )}

      {/* Progress */}
      {loading ? (
        <div className="mb-4 w-full">
          <div className="h-2 w-full bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-10 bg-gray-700 rounded animate-pulse mt-2" />
        </div>
      ) : (
        judgeResponse && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Progress</p>
            <div className="w-full h-2 bg-background rounded">
              <div
                className="h-2 bg-text rounded transition-all duration-500"
                style={{ width: `${judgeResponse.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {judgeResponse.progress}%
            </p>
          </div>
        )
      )}

      {/* Expected outcome */}
      {loading ? (
        <div className="mb-4">
          <div className="h-4 w-32 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-16 w-full bg-gray-700 rounded animate-pulse" />
        </div>
      ) : (
        judgeResponse?.expectedOutcome && (
          <div className="mb-4">
            <p className="text-sm text-border mb-1">Expected Outcome</p>
            <pre className="bg-background p-3 rounded font-mono text-sm whitespace-pre-wrap">
              <code>{judgeResponse.expectedOutcome}</code>
            </pre>
          </div>
        )
      )}

      {/* Messages */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] relative z-0">
        {loading ? (
          <>
            <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
            <div className="h-20 w-full bg-gray-700 rounded animate-pulse" />
          </>
        ) : judgeResponse?.message && judgeResponse.message.length > 0 ? (
          judgeResponse.message.map((item, index) => (
            <div
              key={index}
              className={item.type === "code" ? "font-mono text-sm" : ""}
            >
              {item.content}
            </div>
          ))
        ) : (
          !loading && (
            <div className="text-gray-400">No messages returned from AI.</div>
          )
        )}
      </div>
    </div>
  );
};

export default RunTabContent;
