'use client'

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowLeft,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  finalUserSchema,
  INewUserSchemaInput,
  INewUserSchemaOutput,
} from "@/zod/auth/createUser"

const FIELDS = [
  {
    name: "userName",
    label: "Username",
    type: "text",
    placeholder: "e.g. andrik123",
    hint: "Pick a unique name for this member.",
    autocomplete: "nickname",
    icon: UserRound,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "name@company.com",
    hint: "",
    autocomplete: "email",
    icon: Mail,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a strong password",
    hint: "",
    autocomplete: "new-password",
    icon: LockKeyhole,
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Re-enter the password",
    hint: "",
    autocomplete: "new-password",
    icon: LockKeyhole,
  },
] as const

const ROLES = [
  {
    label: "Admin",
    value: "ADMIN",
    description: "Manage the workspace and its members.",
  },
  {
    label: "Mentor",
    value: "MENTOR",
    description: "Guide interns and review their progress.",
  },
  {
    label: "Intern",
    value: "INTERN",
    description: "Work on assigned tasks and track progress.",
  },
] as const

/**
 * Display-only rewrite of terse validation messages into guidance.
 * Best fix: change the messages inside the zod schema itself, then
 * delete this map.
 */
const FRIENDLY_MESSAGES: Record<string, string> = {
  "User name is required": "Enter a username for this member.",
  "Username is required": "Enter a username for this member.",
  "Invalid email": "Enter a valid email, like name@company.com.",
}

/**
 * Password guidance shown live under the password field.
 * Keep these in sync with the rules in your zod schema.
 */
const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  {
    label: "Upper and lower case letters",
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { label: "At least one number", test: (v: string) => /\d/.test(v) },
  {
    label: "At least one symbol",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
] as const

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"] as const
const STRENGTH_COLORS = [
  "bg-muted",
  "bg-red-600",
  "bg-amber-500",
  "bg-lime-600",
  "bg-green-600",
] as const

type Props = {
  changeFormState: (state: "company") => void
}

const CreateNewMemberForm = ({ changeFormState }: Props) => {
  const [visiblePasswords, setVisiblePasswords] = useState(false)

  const methods = useForm<
    INewUserSchemaInput,
    unknown,
    INewUserSchemaOutput
  >({
    resolver: zodResolver(finalUserSchema),
    // Errors only appear after a field has been touched or on submit.
    mode: "onTouched",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "INTERN",
    },
  })

  const {
    register,
    control,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = methods

  // Start the task with the cursor in the first field.
  useEffect(() => {
    setFocus("userName")
  }, [setFocus])

  const passwordValue = (watch("password") ?? "") as string
  const confirmValue = (watch("confirmPassword") ?? "") as string
  const rulesMet = PASSWORD_RULES.filter((r) => r.test(passwordValue)).length
  const strength = passwordValue ? Math.max(1, rulesMet) : 0
  const passwordsMatch = confirmValue.length > 0 && confirmValue === passwordValue

  const onSubmit = async (data: INewUserSchemaOutput) => {
    console.log(data)
    // Call your server action or API here.
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => changeFormState("company")}
          disabled={isSubmitting}
          className="mb-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>

        {/* Serif is kept for the page title only */}
        <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          Create a team member
        </h2>

        <p className="mt-2 max-w-lg font-sans text-sm leading-6 text-muted-foreground">
          Set up an account and assign a role. All fields are required.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid items-start gap-6 font-sans lg:grid-cols-[minmax(0,1fr)_340px]"
      >
        {/* Account details */}
        <section
          aria-labelledby="account-details-heading"
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8"
        >
          <h3
            id="account-details-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Account details
          </h3>

          {/* Field groups are clearly separated (gap-7); label, input and
              message inside a group stay tight (gap-1.5). */}
          <div className="mt-6 space-y-7">
            {FIELDS.map((field) => {
              const error = errors[field.name]
              const Icon = field.icon
              const isPassword = field.type === "password"
              const isNewPassword = field.name === "password"
              const isConfirm = field.name === "confirmPassword"
              const errorText = error?.message
                ? FRIENDLY_MESSAGES[error.message] ?? error.message
                : undefined

              const describedBy =
                [
                  error ? `${field.name}-error` : null,
                  field.hint ? `${field.name}-hint` : null,
                  isNewPassword ? "password-requirements" : null,
                ]
                  .filter(Boolean)
                  .join(" ") || undefined

              return (
                <Field key={field.name} className="space-y-1.5">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                  </Label>

                  <div className="relative">
                    <Icon
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                      id={field.name}
                      type={
                        isPassword && visiblePasswords ? "text" : field.type
                      }
                      autoComplete={field.autocomplete}
                      placeholder={field.placeholder}
                      aria-invalid={!!error}
                      aria-describedby={describedBy}
                      className={`h-11 pl-10 font-sans text-sm placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/15 ${
                        isPassword ? "pr-11" : ""
                      }`}
                      {...register(field.name)}
                    />

                    {isPassword && (
                      <button
                        type="button"
                        aria-label={
                          visiblePasswords
                            ? "Hide passwords"
                            : "Show passwords"
                        }
                        aria-pressed={visiblePasswords}
                        onClick={() =>
                          setVisiblePasswords((current) => !current)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {visiblePasswords ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Error: icon + text so it never relies on colour alone */}
                  {errorText ? (
                    <p
                      id={`${field.name}-error`}
                      role="alert"
                      className="flex items-start gap-1.5 text-sm text-destructive"
                    >
                      <CircleAlert
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0"
                      />
                      {errorText}
                    </p>
                  ) : (
                    field.hint && (
                      <p
                        id={`${field.name}-hint`}
                        className="text-xs leading-5 text-muted-foreground"
                      >
                        {field.hint}
                      </p>
                    )
                  )}

                  {/* Password strength + live requirements */}
                  {isNewPassword && (
                    <div id="password-requirements" className="space-y-2 pt-1">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex flex-1 gap-1"
                          role="progressbar"
                          aria-label="Password strength"
                          aria-valuemin={0}
                          aria-valuemax={4}
                          aria-valuenow={strength}
                          aria-valuetext={STRENGTH_LABELS[strength]}
                        >
                          {[1, 2, 3, 4].map((segment) => (
                            <span
                              key={segment}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                segment <= strength
                                  ? STRENGTH_COLORS[strength]
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          aria-live="polite"
                          className="w-16 text-right text-xs font-medium text-muted-foreground"
                        >
                          {passwordValue ? STRENGTH_LABELS[strength] : ""}
                        </span>
                      </div>

                      <ul className="grid gap-1 sm:grid-cols-2">
                        {PASSWORD_RULES.map((rule) => {
                          const met = rule.test(passwordValue)
                          return (
                            <li
                              key={rule.label}
                              className={`flex items-center gap-1.5 text-xs ${
                                met
                                  ? "text-green-700 dark:text-green-500"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {met ? (
                                <Check
                                  aria-hidden="true"
                                  className="size-3.5 shrink-0"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="ml-1 mr-0.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                                />
                              )}
                              {rule.label}
                              <span className="sr-only">
                                {met ? " (met)" : " (not met yet)"}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                  {isConfirm && passwordsMatch && !error && (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-500">
                      <Check aria-hidden="true" className="size-3.5" />
                      Passwords match
                    </p>
                  )}
                </Field>
              )
            })}
          </div>

          <div className="mt-8 rounded-lg bg-muted/50 p-3">
            <div className="flex items-start gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              />
              <p className="text-xs leading-5 text-muted-foreground">
                Use a unique password. Avoid reusing credentials from other
                accounts.
              </p>
            </div>
          </div>
        </section>
        <aside className="space-y-4 lg:sticky lg:top-6">
          <section
            aria-labelledby="role-heading"
            className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6"
          >
            <h3
              id="role-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Workspace role
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose the permissions this member should receive.
            </p>

            <div className="mt-5">
              <Controller
                name="role"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-1.5">
                    <Label htmlFor="role" className="text-sm font-medium">
                      Select a role
                    </Label>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="role"
                        className="h-11 w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Choose a role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {ROLES.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.error?.message ? (
                      <p
                        role="alert"
                        className="flex items-start gap-1.5 text-sm text-destructive"
                      >
                        <CircleAlert
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0"
                        />
                        {fieldState.error.message}
                      </p>
                    ) : (
                      <p className="text-xs leading-5 text-muted-foreground">
                        {
                          ROLES.find((role) => role.value === field.value)
                            ?.description
                        }
                      </p>
                    )}
                  </Field>
                )}
              />
            </div>
          </section>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full"
              onClick={() => changeFormState("company")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            This adds a new member to your workspace.
          </p>
        </aside>
      </form>
    </div>
  )
}

export default CreateNewMemberForm
