import {
  apiResponse,
  standardResponse,
} from "@/constants/responses/apiResponse";
import { getUserID } from "../auth/auth";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import {
  fetchedQuestionInterface,
  fetchedSubmissionInterface,
  Question,
  questionMapSnakeCaseToCamelCase,
  SubmissionInterface,
  submissionMapSnakeCaseToCamelCase,
} from "@/constants/interfaces/questionInterfaces";

export interface fetchUserQuestionDataInterface {
  data: Question[];
  pagination: { page: number; limit: number; hasMore: boolean };
}

export const fetchUserQuestions = async (page: number, limit: number) => {
  if (!page || !limit)
    return standardResponse(false, null, "no_params", "No parameters");
  try {
    const userID = await getUserID();
    if (!userID)
      return standardResponse(false, null, "no_user_ID", "No user ID");

    const res = await fetch(
      `/api/supabase/question?userID=${userID}&page=${page}&limit=${limit}`
    );
    const data: apiResponseInterface = await res.json();
    const parsedData = data.data.data.map((item: fetchedQuestionInterface) =>
      questionMapSnakeCaseToCamelCase(item)
    );

    return standardResponse(
      data.success,
      { data: parsedData, pagination: data.data.pagination },
      data.error,
      data.message
    );
  } catch (error) {
    return standardResponse(false, null, error, "Something failed");
  }
};

export const fetchUserQuestionSubmissions = async (
  questionID: string | null
) => {
  if (!questionID)
    return standardResponse(false, null, "no_id", "No question id");
  console.log("Getting user ID");
  const userID = await getUserID();
  try {
    console.log("fetching from supabase");
    const res = await fetch(
      `/api/supabase/submission?questionID=${questionID}&userID=${userID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data: apiResponseInterface = await res.json();
    const fetchedSubmissions: fetchedSubmissionInterface[] = data.data;
    const submissions: SubmissionInterface[] = fetchedSubmissions.map((item) =>
      submissionMapSnakeCaseToCamelCase(item)
    );
    return standardResponse(
      data.success,
      submissions,
      data.error,
      data.message
    );
  } catch (error) {
    return standardResponse(false, null, error, "none");
  }
};
