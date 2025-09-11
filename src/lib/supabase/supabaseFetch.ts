import {
  apiResponse,
  standardResponse,
} from "@/constants/responses/apiResponse";
import { getUserID } from "../auth/auth";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import {
  fetchedSubmissionInterface,
  SubmissionInterface,
  submissionMapSnakeCaseToCamelCase,
} from "@/constants/interfaces/questionInterfaces";

export const fetchSelfQuestions = async () => {
  const userID = await getUserID();
  //   const userID = null;
  if (!userID)
    return apiResponse(false, null, "no_user_id", "Something failed", 400);
  console.log("fetching");
  try {
    const res = await fetch(`/api/supabase/question?userID=${userID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data: apiResponseInterface = await res.json();

    return apiResponse(
      data.success,
      data.data,
      data.error,
      data.message,
      data.statusCode
    );
  } catch (error) {
    return apiResponse(false, null, error, "Something failed", 400);
  }
};

export const fetchLatestUserQuestion = async () => {
  const userID = await getUserID();
  //   const userID = null;
  if (!userID)
    return standardResponse(false, null, "no_user_id", "Something failed");
  console.log("fetching");
  try {
    const res = await fetch(
      `/api/supabase/question?userID=${userID}&filter=latest`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data: apiResponseInterface = await res.json();

    return standardResponse(data.success, data.data, data.error, data.message);
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
