"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp, signIn, AuthResult } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Form validation schema
const authSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthFormType = z.infer<typeof authSchema>;
type FormType = "sign-in" | "sign-up";

interface AuthFormProps {
  type: FormType;
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  const form = useForm<AuthFormType>({
    resolver: zodResolver(authSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<AuthFormType> = async (values) => {
    try {
      let result: AuthResult;

      if (type === "sign-up") {
        result = await signUp({
          email: values.email,
          password: values.password,
        });

        if (!result.success) {
          toast.error(result.message || "Sign up failed");
          return;
        }

        toast.success("Account created!");
        router.push("/sign-in");
      } else {
        result = await signIn({
          email: values.email,
          password: values.password,
        });

        if (!result.success) {
          toast.error(result.message || "Sign in failed");
          return;
        }

        toast.success("Signed in successfully!");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {type === "sign-up" ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {type === "sign-up" && (
            <input
              {...form.register("name")}
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            {...form.register("email")}
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            autoComplete={type === "sign-up" ? "new-password" : "current-password"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {type === "sign-up" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {type === "sign-up" && (
          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        )}

        {type === "sign-in" && (
          <p className="text-sm text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
