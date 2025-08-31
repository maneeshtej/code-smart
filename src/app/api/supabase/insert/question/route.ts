import { Question } from "@/constants/interfaces/questionInterfaces";
import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "@/lib/supabase/supabaseClient";

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
