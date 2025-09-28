"use client";

import { confirmAction } from "@/components/shared/asyncModal";
import SideModal from "@/components/ui/modals";
import { judgeResultInterface } from "@/constants/interfaces/aiResponseInterfaces";
import {
  Question,
  SubmissionInterface,
} from "@/constants/interfaces/questionInterfaces";
import { StandardResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { judgeWithGemini } from "@/lib/gemini/assistant";
import { fetchUserQuestionSubmissions } from "@/lib/supabase/supabaseFetch";
import { uploadSubmission } from "@/lib/supabase/supabaseInsert";
import { LoadingScreen } from "@/lib/utils/commonUtils";
import { getLocalItem, setLocalItem } from "@/lib/utils/localStorage";
import { useCodeStore } from "@/stores/useCodeStore";
import { title } from "process";
import React, { useEffect, useState } from "react";

const RunTabContent = ({ question }: { question: Question | null }) => {
  const codeStore = useCodeStore();
  const mainCode = codeStore.getCurrentMainCode();
  const functionCode = codeStore.getCurrentFunctionCode();
  const currentLanguage = useCodeStore((s) => s.currentLanguage);

  const [judgeResponse, setJudgeResponse] =
    useState<judgeResultInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);

  const [activeTab, setActiveTab] = useState<"run" | "submissions">("run"); // <-- new tab state
  const [submissions, setSubmissions] = useState<SubmissionInterface[]>();

  const fetchJudgeResponse = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res: StandardResponseInterface = await judgeWithGemini(
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

  const insertSubmissions = async () => {
    if (
      !judgeResponse ||
      !judgeResponse.expectedOutcome ||
      !judgeResponse.message ||
      !question ||
      !question.id
    ) {
      console.error("missing data");
      return;
    }

    const stringMessages = judgeResponse.message.map((item) =>
      JSON.stringify(item)
    );

    setLoading(true);

    try {
      const data: StandardResponseInterface = await uploadSubmission(
        functionCode,
        "First sub",
        judgeResponse?.expectedOutcome,
        stringMessages,
        currentLanguage,
        question?.id
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmission = async () => {
    if (!judgeResponse || !judgeResponse.pass === true) return;

    const confirm = await confirmAction({
      title: "Submit",
      message: "Are you to submit?",
    });
    if (confirm) await insertSubmissions();
  };

  const getUserQuestionSubmissions = async () => {
    setLoading(true);
    const LOCALKEY = "local-submission";
    try {
      const localSubmissions = getLocalItem(LOCALKEY);
      if (!localSubmissions) {
        console.log("fetching subs");
        const data = await fetchUserQuestionSubmissions(question?.id || null);

        setLocalItem(LOCALKEY, data.data, 5000);
        console.log(data);

        setSubmissions(data.data);
        return;
      }
      console.log("fetching subs locally");

      setSubmissions(localSubmissions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickSubmission = async () => {
    const result = await confirmAction({ title: "Test" });
    console.log(result);
  };

  useEffect(() => {
    if (activeTab === "submissions") {
      getUserQuestionSubmissions();
    }
  }, [activeTab]);

  return (
    <div className="h-full w-full flex flex-col p-4 text-gray-100">
      <LoadingScreen isLoading={loading} />
      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-700">
        <button
          className={`px-4 py-2 -mb-px font-semibold ${
            activeTab === "run"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("run")}
        >
          Run
        </button>
        <button
          className={`px-4 py-2 -mb-px font-semibold ${
            activeTab === "submissions"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "run" && (
        <>
          {/* Existing Run Tab Content */}
          <div className="flex items-center mb-4">
            <button
              onClick={fetchJudgeResponse}
              className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 disabled:opacity-50"
              disabled={loading || !question}
            >
              {loading ? "Judging..." : "Judge"}
            </button>
          </div>

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
                <p className="text-sm text-text-light mb-1">Expected Outcome</p>
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
                <div className="text-gray-400">
                  No messages returned from AI.
                </div>
              )
            )}
          </div>

          {/* Submissions */}
          <div className="flex items-center justify-center mt-auto p-4">
            <h1
              className={`bg-text text-background-dark p-2 px-4 rounded-full ${
                !judgeResponse && !loading
                  ? "opacity-50 cursor-not-allowed"
                  : " cursor-pointer"
              }`}
              onClick={handleSubmission}
            >
              {loading ? "Submitting" : "Submit"}
            </h1>
          </div>
        </>
      )}

      {activeTab === "submissions" && (
        <div className="flex flex-col w-full h-full">
          <h2 className="text-xl font-bold mb-4">Submissions</h2>
          <div className="h-full w-full flex flex-1 flex-col gap-4">
            {submissions &&
              submissions.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border-border border-1 rounded-md flex flex-row gap-4 items-center cursor-pointer"
                  onClick={handleClickSubmission}
                >
                  {new Date(
                    item.submittedAt || "2025-01-01T00:00:00.000Z"
                  ).toLocaleDateString()}
                  <span className="text-sm font-bold text-pastelPurple">
                    {item.code.language}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RunTabContent;
