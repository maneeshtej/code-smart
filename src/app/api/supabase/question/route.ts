import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const question: Question = body.question;

  if (!question)
    return apiResponse(false, null, "no_question", "No question", 400);

  try {
    const { data, error } = await supabase.rpc("insert_question_with_info", {
      p_user_id: question.userId,
      p_title: question.title,
      p_question: question.question,
      p_description: question.description,
      p_examples: JSON.stringify(question.examples), // ensure JSONB format
      p_constraints: question.constraints,
      p_edge_cases: question.edgeCases,
      p_hints: question.hints,
      p_topics: question.topics,
      p_difficulty: question.difficulty,
      p_time_complexity: question.timeComplexity,
      p_space_complexity: question.spaceComplexity,
      p_tags: question.tags,
    });

    if (error) return apiResponse(false, null, error, "Insert failed", 400);

    return apiResponse(true, data, null, "Successfully recieved", 200);
  } catch (error) {
    return apiResponse(false, null, error, "Insert failed", 400);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("userID");
  const filter = searchParams.get("filter");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!userID)
    return apiResponse(
      false,
      null,
      "missing_user_id",
      "User ID is missing",
      400
    );

  let query = supabase.from("questions").select("*, question_info(*)");

  if (userID !== "all") {
    query = query.eq("user_id", userID);
  }

  if (filter === "latest") {
    query = query
      .order("created_at", {
        ascending: false,
        referencedTable: "question_info",
      })
      .limit(1);
  }

  const from = (page - 1) * limit;
  const to = from + limit;
  query = query.range(from, to);

  try {
    const { data, error } = await query;

    if (error) return apiResponse(false, null, error, "Unable to fetch", 400);
    return apiResponse(
      true,
      { data, pagination: { page, limit, hasMore: data.length === limit } },
      null,
      "Data fetched",
      200
    );
  } catch (error) {
    return apiResponse(false, null, error, "Unable to fetch", 400);
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const questionID = url.searchParams.get("questionID");

  if (!questionID) {
    return apiResponse(
      false,
      null,
      "missing_question_id",
      "Question ID is required",
      400
    );
  }

  const { data, error } = await supabase
    .from("questions")
    .delete()
    .eq("id", questionID);

  if (error) return apiResponse(false, null, error, "Delete failed", 400);

  return apiResponse(true, data, null, "Question deleted successfully", 200);
}
