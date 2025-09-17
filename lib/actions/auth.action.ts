"use server"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import db from "@/firebase/admin";
import { GetLatestInterviewsParams } from "@/types";

// 🔹 Define Interview Type
export interface Interview {
  id: string;
  userId: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  type: string;
  finalized: boolean;
  coverImage?: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  uid?: string;
}

// 🔹 Sign Up
export async function signUp({ email, password }: { email: string; password: string }): Promise<AuthResult> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, uid: userCredential.user.uid };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Sign In
export async function signIn({ email, password }: { email: string; password: string }): Promise<AuthResult> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Get Current User
export async function getCurrentUser() {
  const user = auth.currentUser;
  if (!user) return null;

  return {
    id: user.uid,
    email: user.email,
    name: user.displayName, // ✅ Firebase uses displayName
  };
}

// 🔹 Get Interviews by UserId
export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
  try {
    const interviewsSnapshot = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    if (interviewsSnapshot.empty) return null;

    return interviewsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return null;
  }
}

export async function getInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const {userId,limit = 20} = params
  const interview = await db
  .collection("interviews")
  .where("finalized","==", true)
  .orderBy("createdAt","desc")
  .where("userId","!=", userId)
  .limit(limit)
  .get();

  return interview.docs.map((doc) => ({
    id:doc.id,
    ...doc.data()
  })) as Interview[];

  
}
