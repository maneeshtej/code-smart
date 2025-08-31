import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST(request: Request) {
  const { userID } = await request.json();
  if (!userID)
    return apiResponse(
      false,
      null,
      "missing_user_id",
      "User ID is missing",
      400
    );
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*, question_info(*)")
      .eq("user_id", userID);

    if (error) return apiResponse(false, null, error, "Unable to fetch", 400);
    return apiResponse(true, data, null, "Data fetched", 200);
  } catch (error) {
    return apiResponse(false, null, error, "Unable to fetch", 400);
  }
}
