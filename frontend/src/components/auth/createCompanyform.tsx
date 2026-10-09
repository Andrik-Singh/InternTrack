'use client'

import { CreateCompany, fullNewCompanySchema } from "@/zod/auth/createCompany";
import { useForm, useFormContext, useFormState } from "react-hook-form";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
const FIELDS = [
  { name: "name", label: "Company name", type: "text", placeholder: "Acme Inc." },
  { name: "description", label: "Description", type: "textbox", placeholder: "This company specializes in...." },
  { name: "website", label: "Website", type: "url", placeholder: "https://yourCompany.com" },
  { name: "address", label: "Address", type: "text", placeholder: "Your address" },
] as const;
const COMPANY_FIELDS: (keyof CreateCompany)[] = FIELDS.map(f => f.name);
export default function CreateCompanyForm({
  changeFormState,
}: {
  changeFormState: (form: 'company' | 'user') => void;
  }) {
  const { register, trigger, control } = useFormContext<CreateCompany>()
  const { errors } = useFormState<CreateCompany>({ control })
  return (
    <div>
      <h2 className="text-xl font-bold">Company Information</h2>
      <form
        method="post"
        className="space-y-5 mt-5"
        onSubmit={async (e) => {
          e.preventDefault()
          const isValid=await trigger(COMPANY_FIELDS,{shouldFocus:true})
          console.log(isValid)
          if (isValid) {
            changeFormState('user')
          }
        }}>
        {FIELDS.map((field) => {
          const error = errors[field.name]
          return (
          <Field
            key={field.name}
            className="space-y-2"
          >
            <div className="flex justify-between items-center w-full">
            <Label
              htmlFor={field.name}
              className="text-md"
            >{field.label}</Label>
              {error && <span className="text-red-500 text-sm md:text-md">{error?.message}</span>}
            </div>
              {field.type === 'textbox' ?
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  {...register(field.name)} />
                :
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  aria-invalid={!!error}
                />}
          </Field>
        )})}
        <div className="flex items-center w-full">
          <Button
            className="ml-auto h-10 px-4 rounded-xl font-semibold"
            type="submit"
            variant="default"
            size="default"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
