import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  apiResponse(
    false,
    null,
    "email or password not provided",
    "Please provide Email and Password",
    400
  );

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.code === "invalid_credentials")
      return apiResponse(false, null, error.code, "Invalid Credentials", 400);

    if (error) return apiResponse(false, null, error, "Failed", 400);

    return apiResponse(
      true,
      { user: data.user, session: data.session },
      null,
      "Successfully logged in",
      200
    );
  } catch (error) {
    if (error) return apiResponse(false, null, error, "Something Failed", 400);
  }
}
