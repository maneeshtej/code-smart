/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiResponseInterface } from "@/constants/interfaces/resposeInterfaces";
import { apiResponse } from "@/constants/responses/apiResponse";
import { supabase } from "../supabase/supabaseClient";

// Helper function
// Helper
export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: apiResponseInterface = await res.json();
    if (data.success && data.data.session) {
      await supabase.auth.setSession(data.data.session);
    }
    return data; // return the full apiResponse directly
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error,
      message: "Network error",
      statusCode: 500,
    };
  }
};

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST", // important!
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: any) {
    return apiResponse(
      false,
      null,
      error?.message || "Something went wrong",
      "Signup failed",
      400
    );
  }
};

export const getUserID = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session?.user) return;

  return session?.user.id;
};
