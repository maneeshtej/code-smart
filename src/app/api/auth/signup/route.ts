import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password)
    return apiResponse(
      false,
      null,
      "email or password not provided",
      "Please provide Email and Password",
      400
    );

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error?.code === "user_already_exists")
      return apiResponse(
        false,
        null,
        "user already exists",
        "Duplicate user",
        400
      );

    if (error) return apiResponse(false, null, error, "Failed", 400);

    return apiResponse(true, data.user, null, "Successfully created user", 200);
  } catch (error) {
    if (error) return apiResponse(false, null, error, "Something Failed", 400);
  }
}
