import { SubmissionInterface } from "@/constants/interfaces/questionInterfaces";
import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const submission: SubmissionInterface = body.data;

  if (!submission) return apiResponse(false, null, "no_data", "No Data", 400);

  try {
    console.log("sending to supaabse");
    const { data, error } = await supabase.rpc("insert_submission", {
      p_user_id: submission.userID,
      p_question_id: submission.questionID,
      p_name: submission.name,
      p_solved: submission.solved,
      p_output: submission.output,
      p_messages: submission.messages,
      p_runtime_seconds: submission.runtimeSeconds || 0.0,
      p_code: submission.code,
    });

    if (error) return apiResponse(false, null, error, "Failed");

    return apiResponse(true, data, null, "Uploaded");
  } catch (error) {
    return apiResponse(false, null, error, "Failed");
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const questionID = searchParams.get("questionID");
  const userID = searchParams.get("userID");

  try {
    let query = supabase.from("submissions").select("*");

    if (userID) query.eq("user_id", userID);

    if (questionID) query.eq("question_id", questionID);

    const { data, error } = await query;

    if (error) return apiResponse(false, null, error, "Something happened");

    return apiResponse(true, data, null, "Successful");
  } catch (error) {
    return apiResponse(false, null, error, "Something happened");
  }
}
