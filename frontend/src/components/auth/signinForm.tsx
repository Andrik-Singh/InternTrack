
"use client";

import { useRef, useState } from "react";
import { RiEye2Fill, RiEyeOffFill } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignInSchema, signInSchema } from "@/zod/auth/signin";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";
import { useRouter } from "next/navigation";

const FIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
  },
] as const;

export default function SigninForm() {
  const [viewPassword, setViewPassword] = useState(false);
  const abortController = useRef<AbortController | null>(null)
  const router=useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = async (unsafeData: SignInSchema) => {
    if (abortController.current) {
      toast.error("Please wait for the current request to complete.");
      return
    }
    const data = signInSchema.safeParse(unsafeData);
    if (!data.success) {
      toast.error("Invalid input");
      return
    }
    const controller = new AbortController();
    abortController.current = controller;
    setTimeout(() => {
      abortController.current?.abort();
      abortController.current = null;
    }, 10000)
    try {
      const res = await fetch(`${config.backendUrl}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(data.data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: controller.signal
      })
      if (!res.ok) {
        const statusText = res.statusText;
        throw new Error(statusText)
      }
      const responseData = await res.json();
      console.log(responseData)
      router.push(`/dashboard`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      logger.error(error)
    } finally {
      abortController.current =null
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 sm:p-8">

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Sign in to continue to your account.
            </p>
          </div>

          <form
            method="post"
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {FIELDS.map((field) => {
              const error = errors[field.name];

              const isPassword = field.name === "password";

              return (
                <Field key={field.name} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <Label
                      htmlFor={field.name}
                      className="text-sm font-medium text-neutral-800 shrink-0"
                    >
                      {field.label}
                    </Label>

                    {error && (
                      <p
                        id={`${field.name}-error`}
                        role="alert"
                        className="min-w-0 truncate text-xs text-red-600"
                      >
                        {error.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      id={field.name}
                      type={
                        field.name === "password" && viewPassword
                          ? "text"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      aria-invalid={!!error}
                      aria-describedby={
                        error ? `${field.name}-error` : undefined
                      }
                      className={error ? "border-red-500" : ""}
                      {...register(field.name)}
                    />

                    {field.name === "password" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="bg-transparent hover:bg-transparent active:translate-y-0 absolute right-1 inset-y-0 flex items-center"
                        onClick={() => setViewPassword((v) => !v)}
                        aria-label={viewPassword ? "Hide password" : "Show password"}
                      >
                        {viewPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeClosed size={18} />
                        )}
                      </Button>
                    )}
                  </div>
                </Field>
              );
            })}

            <Link
             href="/forgot-password"
              className="flex justify-end -mt-1">
              <Button
                variant="ghost"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                Forgot password?
              </Button>
            </Link>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Continue"}
            </Button>
          </form>
        </div>

        {/* Sign up */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/create-company"
            className="font-medium text-neutral-900 hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}
