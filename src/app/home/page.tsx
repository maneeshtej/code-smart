"use client";

import { showSideModal } from "@/components/code-editor/home/sideQuestionModal";
import { confirmAction } from "@/components/shared/asyncModal";
import { showToast } from "@/components/shared/showToast";
import {
  fetchedQuestionInterface,
  Question,
  questionMapSnakeCaseToCamelCase,
} from "@/constants/interfaces/questionInterfaces";
import { StandardResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { manageLogin } from "@/lib/auth/auth";
import { deleteQuestion } from "@/lib/supabase/supabaseDelete";

import {
  fetchUserQuestionDataInterface,
  fetchUserQuestions,
} from "@/lib/supabase/supabaseFetch";
import { getLocalItem, setLocalItem } from "@/lib/utils/localStorage";
import { useCodeStore } from "@/stores/useCodeStore";
import { useQuestionStore } from "@/stores/useQuestionStore";
import { Loader, Search, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const Home = () => {
  const [questions, setQuestion] = useState<
    fetchUserQuestionDataInterface | number
  >(0);
  const setEditorQuestion = useQuestionStore((s) => s.setQuestion);
  const clearAllCodes = useCodeStore((s) => s.clearAllCodes);
  const router = useRouter();

  const fetchQuestions = async (page: number) => {
    setQuestion(0);
    console.log("loading");
    const localKey = "local-questions";
    const localData = getLocalItem(localKey);
    if (localData) {
      console.log("Getting local data");
      const parsedLocalData: fetchUserQuestionDataInterface =
        JSON.parse(localData);
      setQuestion(parsedLocalData);
      return;
    }
    try {
      const res: StandardResponseInterface = await fetchUserQuestions(page, 10);
      if (res.error) {
        console.log(res);
        setQuestion(-1);
        return;
      }
      const data: fetchUserQuestionDataInterface = res.data;
      console.log(data.pagination.hasMore);
      console.log(data.pagination.page);
      setLocalItem(localKey, JSON.stringify(data), 5000);
      setQuestion(data);
    } catch (error) {
      console.error(error);
      setQuestion(-1);
    }
  };

  const showQuestionModal = (question: Question) => {
    showSideModal({
      title: "Question Details",
      content: (
        <div>
          <h3 className="text-lg font-semibold">{question.title}</h3>
          <p className="mt-2 text-sm opacity-90">{question.description}</p>
          <p className="mt-4 text-sm text-text-light">
            Difficulty: {question.difficulty}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-background rounded-md border border-borderc"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
      buttons: [
        {
          label: "Solve",
          onClick: () => {
            setEditorQuestion(question);
            clearAllCodes();
            router.push("/editor/");
          },
          closeOnClick: true,
        },
        {
          label: "Delete",
          onClick: async () => {
            const handleDelete = async () => {
              const confirm = await confirmAction({
                title: "Delete question",
                message: "Are you sure to delete the question?",
              });
              if (confirm) {
                const res: StandardResponseInterface = await deleteQuestion(
                  question.id || "none"
                );
                if (res.success) {
                  showToast({
                    message: "Successfully deleted",
                    duration: 1000,
                    type: "success",
                  });
                  fetchQuestions(
                    typeof questions !== "number"
                      ? questions.pagination.page
                      : 1
                  );
                } else if (!res.success) {
                  showToast({
                    message: "Error: deletion failed",
                    duration: 2000,
                    type: "error",
                  });
                }
              }
            };
            await handleDelete();
          },
          variant: "danger",
          closeOnClick: true,
        },
      ],
    });
  };
  useEffect(() => {
    fetchQuestions(1);
    manageLogin(router);
  }, []);
  return (
    <div className="h-screen w-full bg-background-dark text-text font-inter flex flex-col">
      {/* ---HEADER--- */}
      <div className="p-0 px-4 flex flex-row items-center border-b border-border">
        <h1 className="text-2xl font-bold mr-auto">
          Welcome <span className="text-green-300">Tej</span>
        </h1>
        {/* <div className="h-2/3 w-1/3 flex bg-background rounded-full p-2 px-4 flex-row items-center gap-4">
          <Search className="h-[80%]" />
          <input
            className="outline-none font-inter text-sm"
            placeholder="Enter to search"
          ></input>
        </div> */}
        <div className="flex flex-row items-center p-4 gap-10">
          <div className="bg-white rounded-full p-2">
            <UserIcon className="text-background-dark" height={15} width={15} />
          </div>
        </div>
      </div>
      {/* ---!HEADER--- */}
      {/* ---BODY--- */}
      <div className="h-full w-full flex flex-col gap-4 p-4">
        <h1 className="text-lg">Questions</h1>
        {typeof questions === "number" ? (
          questions === 0 ? (
            // Loading
            <div className="h-full w-full flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : questions === -1 ? (
            // Error
            <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
              <span>Failed to fetch</span>
              <button
                className="bg-text text-background-dark cursor-pointer px-4 py-2 rounded-full"
                onClick={() => fetchQuestions(1)}
              >
                Retry
              </button>
            </div>
          ) : null
        ) : (
          <div className="h-full w-full flex flex-col gap-4">
            {questions.data.length === 0 ? (
              <span>No questions found</span>
            ) : (
              questions.data.map((q) => {
                // color map for difficulty
                const difficultyColors: Record<string, string> = {
                  Easy: "bg-green-100 text-green-700 border-green-300",
                  Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
                  Hard: "bg-red-100 text-red-700 border-red-300",
                };

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-background border border-border shadow-sm hover:shadow-md transition 
                    flex flex-row items-center justify-between text-sm gap-4 cursor-pointer"
                    onClick={() => {
                      showQuestionModal(q);
                    }}
                  >
                    <span className="font-bold text-sm">{q.title}</span>
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row gap-4 items-center">
                        {q.topics.map((item, index) => (
                          <span
                            className="text-xs bg-text px-4 py-2 text-background-dark rounded-full"
                            key={index}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`${
                          q.difficulty === "Easy"
                            ? "text-green-400"
                            : q.difficulty === "Medium"
                            ? "text-orange-400"
                            : "text-red-400"
                        } flex items-center justify-center`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination Info */}
            <div className="text-xs text-gray-400 mt-auto flex flex-col w-full gap-4">
              {typeof questions !== "number" && (
                <div className="flex flex-row w-full gap-4 text-sm">
                  <button
                    className={`bg-text text-background-dark rounded-full px-4 py-2 cursor-pointer
                  ${
                    questions.pagination.page === 1
                      ? "bg-background cursor-not-allowed"
                      : "bg-text"
                  }`}
                  >
                    Previous
                  </button>
                  <button
                    className={`bg-text text-background-dark rounded-full px-4 py-2 cursor-pointer
                  ${
                    questions.pagination.hasMore ? "bg-text" : "bg-background"
                  }`}
                  >
                    Next
                  </button>
                </div>
              )}
              Page {questions.pagination.page} (limit{" "}
              {questions.pagination.limit}){" "}
              {questions.pagination.hasMore ? "– more available" : "– end"}
            </div>
          </div>
        )}
      </div>
      {/* ---!BODY--- */}
    </div>
  );
};

export default Home;
