import { apiResponse } from "@/constants/responses/apiResponse";
import { getUserID } from "../auth/auth";
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";

export const fetchSelfQuestions = async () => {
  const userID = await getUserID();
  //   const userID = null;
  if (!userID)
    return apiResponse(false, null, "no_user_id", "Something failed", 400);
  console.log("fetching");
  try {
    const res = await fetch("/api/supabase/fetch/question/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID }),
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

export const fetchAllQuestions = async () => {
  const userID = await getUserID();
  if (!userID) console.error("no user ID");
  console.log("fetching");
  try {
    const res = await fetch("/api/supabase/fetch/question/all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
