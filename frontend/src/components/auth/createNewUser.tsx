import { CreateCompany } from "@/zod/auth/createCompany";
import { Field } from "../ui/field";
import { useFormContext, useFormState } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { is } from "zod/v4/locales";
const FIELDS = [
  { name: "userName", label: "User name", type: "text", placeholder: "Admin1" },
  { name: "email", label: "Email", type: "email", placeholder: "xyz@gmail.com" },
  { name: "password", label: "Password", type: "password", placeholder: "@#1234asdVdsaa",  },
  { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "@#1234asdVdsaa" },
] as const;
export default function CreateNewUser({
  changeFormState,
  onSubmit
}: {
  changeFormState: (form: 'company' | 'user') => void;
  onSubmit: (data: CreateCompany) => void;
  }) {
  const { handleSubmit, register,control } = useFormContext<CreateCompany>();
  const {errors,isSubmitting}=useFormState({control})
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Create your admin account
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This account will manage your workspace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {FIELDS.map((field) => {
          const error = errors[field.name];

          return (
            <Field key={field.name} className="space-y-2">
              <div className="flex justify-between items-center w-full">
                <Label htmlFor={field.name}>
                  {field.label}
                </Label>
                {error && (
                  <p className="text-sm text-destructive">
                    {error.message}
                  </p>
                )}
              </div>

              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name)}
                aria-invalid={!!error}
              />
            </Field>
          );
        })}

        <div className="flex items-center justify-between pt-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => changeFormState("company")}
          >
            ← Back
          </Button>

          <Button
            type="submit"
            className="px-6"
            disabled={isSubmitting}
          >
            Create workspace →
          </Button>
        </div>
      </form>
    </div>
  );
}
