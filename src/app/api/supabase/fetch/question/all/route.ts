import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST() {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*, question_info(*)");

    if (error) return apiResponse(false, null, error, "Unable to fetch", 400);
    return apiResponse(true, data, null, "Data fetched", 200);
  } catch (error) {
    return apiResponse(false, null, error, "Unable to fetch", 400);
  }
}
