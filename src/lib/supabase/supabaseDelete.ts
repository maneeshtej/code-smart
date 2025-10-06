import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { standardResponse } from "@/constants/responses/apiResponse";
import { getUserID } from "../auth/auth";

/**
 * Delete a question by ID
 * @param questionID - the ID of the question to delete
 */
export const deleteQuestion = async (questionID: string) => {
  if (!questionID)
    return standardResponse(
      false,
      null,
      "missing_question_id",
      "Question ID is required"
    );

  try {
    const userID = await getUserID();
    if (!userID)
      return standardResponse(false, null, "no_login", "Please check login");
    const res = await fetch(`/api/supabase/question?questionID=${questionID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data: apiResponseInterface = await res.json();

    console.log(data);

    return standardResponse(data.success, data.data, data.error, data.message);
  } catch (error) {
    return standardResponse(false, null, error, "Unable to delete question.");
  }
};
