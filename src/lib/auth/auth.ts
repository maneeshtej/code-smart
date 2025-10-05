/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  apiResponseInterface,
  StandardResponseInterface,
} from "@/constants/interfaces/resposeInterfaces";
import { standardResponse } from "@/constants/responses/apiResponse";
import { supabase } from "../supabase/supabaseClient";
import { useRouter } from "next/navigation";

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
    return standardResponse(data.success, data.data, data.error, data.message);
  } catch (error) {
    return standardResponse(false, null, error, "Network error");
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

    const data: apiResponseInterface = await res.json();
    console.log(data);
    return data;
  } catch (error: any) {
    return standardResponse(
      false,
      null,
      error?.message || "Something went wrong",
      "Signup failed"
    );
  }
};

export const getSessionData = async () => {
  try {
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error || !sessionData?.session?.user) {
      return standardResponse(false, null, error, "No session");
    }

    const userID = sessionData.session.user.id;

    return standardResponse(
      true,
      { userID, session: sessionData.session },
      null,
      "User exists"
    );
  } catch (error) {
    return standardResponse(false, null, error, "Something failed");
  }
};

export const getUserID = async () => {
  const sessionData = await getSessionData();
  const userID = sessionData.data.userID;
  if (!userID) return null;
  return userID;
};

export const manageLogin = async (router: ReturnType<typeof useRouter>) => {
  const data: StandardResponseInterface = await getSessionData();
  if (!data.success) {
    router.push("/auth/login");
  }
};
