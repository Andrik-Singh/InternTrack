'use client'
import { CreateCompany, fullNewCompanySchema } from "@/zod/auth/createCompany";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateCompanyForm from "./createCompanyform";
import CreateNewUser from "./createNewUser";
import { toast } from "sonner";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";
import { useRouter } from "next/navigation";

export default function CreateCompanyWrapper() {
  const [currentForm, setCurrentForm] = useState('company');
  const [currentAbortController, setCurrentAbortController] = useState<AbortController | null>(null)
  const router=useRouter()
  const methods = useForm<CreateCompany>({
    resolver: zodResolver(fullNewCompanySchema),
    mode: 'onTouched'
  })
  const {setError}=methods
  const changeFormState = useCallback((nextState: 'company' | 'user') => {
    setCurrentForm(nextState);
  }, [setCurrentForm]);
  const onSubmit = async(unsafeData: CreateCompany) => {
    if (currentAbortController) {
      toast.error("Request ongoing");
      return;
    }
    const abortController=new AbortController();
    setCurrentAbortController(abortController);
    setTimeout(() => {
      abortController.abort()
    },10000)
    try {
      const url = `${config.backendUrl}/companies/new`;
      const data = {
        userName: unsafeData.userName,
        email: unsafeData.email,
        password: unsafeData.password,
        companyName: unsafeData.name,
        description: unsafeData.description,
        website: unsafeData.website,
        address: unsafeData.address,
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
        signal: abortController.signal,
      })
      if (!res.ok) {
        const error = await res.json()
        const statusCode = res.status
        if (statusCode === 409) {
          setError("email", {
            type:"server",
            message:"Email is already used"
          }, {
            shouldFocus:true
          })
        }
        throw new Error(error.message)
      }
      const responseData = await res.json();
      if (responseData) {
        router.push('/dashboard')
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : typeof e === "string" ? e : "Server error try again later");
      logger.error(e)
    } finally {
      setCurrentAbortController(null)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-8">
      <div className="w-full sm:w-md md:w-xl  bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 ">
        <section className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Set up your workspace
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Tell us about your company, then create your admin account.
          </p>

          <div className="flex items-center mt-8 mb-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`rounded-full w-10 h-10 grid place-items-center text-sm font-semibold transition-colors ${
                  currentForm === 'company'
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-400 border border-neutral-200'
                }`}
              >
                1
              </div>
              <p
                className={`text-xs ${
                  currentForm === 'company' ? 'text-neutral-900 font-medium' : 'text-neutral-400'
                }`}
              >
                Company
              </p>
            </div>

            <div className="flex-1 h-px bg-neutral-200 mx-3 -translate-y-3" />

            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`rounded-full w-10 h-10 grid place-items-center text-sm font-semibold transition-colors ${
                  currentForm === 'user'
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-400 border border-neutral-200'
                }`}
              >
                2
              </div>
              <p
                className={`text-xs ${
                  currentForm === 'user' ? 'text-neutral-900 font-medium' : 'text-neutral-400'
                }`}
              >
                User
              </p>
            </div>
          </div>
        </section>

        <FormProvider {...methods}>
          {currentForm === 'company' ? <CreateCompanyForm changeFormState={changeFormState} /> : currentForm === 'user' ? <CreateNewUser onSubmit={onSubmit} changeFormState={changeFormState} /> : null}
        </FormProvider>
      </div>
    </div>
  );
}
