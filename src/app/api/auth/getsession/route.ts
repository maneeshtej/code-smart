import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST() {
  try {
    const {
      data: { session, error },
    } = await supabase.auth.getSession();
    if (error || !session)
      return apiResponse(false, null, error, "No session", 400);

    const userID = session.user.id;

    return apiResponse(true, { userID, session }, null, "User exists", 200);
  } catch (error) {
    return apiResponse(false, null, error, "Something Failed", 400);
  }
}
