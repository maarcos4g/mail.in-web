import { useState } from "react";
import { GetPlans } from "@/api/get-plans"
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterUser } from "@/api/register-user";
import { RequestAuthCode } from "@/api/request-authentication-code";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/button";
import { PlanWidget } from "@/components/plan";
import { Input } from "@/components/ui/input";

import { Loader2Icon } from "lucide-react";

const signUpSchema = z.object({
  planId: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);

  const {
    data: result,
    isFetching: isFetchingPlans,
    isLoading: isLoadingPlans
  } = useQuery({
    queryKey: ['getAllPlans'],
    queryFn: () => GetPlans()
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: RegisterUser
  })

  const { mutateAsync: requestAuthCode } = useMutation({
    mutationFn: RequestAuthCode
  })

  async function handleRegisterUser({ email, planId, name }: SignUpSchema) {
    try {
      await registerUser({ email, name, planId })
      await requestAuthCode({ email })

      toast.success('Cadastro realizado com sucesso!')
      navigate('/auth/code')
    } catch (error) {
      toast.error('Erro ao criar conta!')
    }
  }

  const handleNextStep = () => setStep((prev) => prev + 1);

  return (
    <form
      className="flex flex-col gap-6 min-w-[402px] items-center"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <h1 className="text-[28px] font-bold">
        Crie sua conta mail.in
      </h1>

      <div className="w-full flex flex-col items-center justify-center">
        {isFetchingPlans && (
          <Loader2Icon className="h-5 w-5 animate-spin text-zinc-400" />
        )}

        {/* {isLoadingPlans && !result && (
          <h1>Plans skeleton</h1>
        )} */}

        <div className="w-full flex flex-col gap-2">
          <span className="text-xs font-light text-zinc-600">
            Tipo de plano
          </span>

          {result && result.plans.map((plan) => {
            return <PlanWidget
              key={plan.id}
              data={plan}
              onCheckedChange={(checked) => {
                if (checked) {
                  setValue('planId', plan.id)
                  handleNextStep()
                }
              }}
            />
          })}
        </div>

      </div>

      {step === 2 && (
        <div className="w-full">
          <label htmlFor="name" className="text-xs font-light text-zinc-600">
            Seu nome
          </label>
          <Input
            id="name"
            type="text"
            autoCorrect="off"
            {...register('name')}
          />
        </div>
      )}

      {step === 3 && (
        <div className="w-full">
          <label htmlFor="email" className="text-xs font-light text-zinc-600">
            Seu e-mail
          </label>
          <Input
            id="email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register('email')}
          />
        </div>
      )}

      <Button
        label="Continuar"
        variant="default"
        type={step === 3 ? 'submit' : 'button'}
        disabled={
          isSubmitting ||
          (step === 1 && !watch('planId')) ||
          (step === 2 && !watch('name')) ||
          (step === 3 && !watch('email'))}
        onClick={() => {
          if (step < 3) {
            handleNextStep()
          }
        }}
      />

      <div className="w-full h-[1px] bg-zinc-50" />

      <span className="text-[10px] text-center">
        Ao criar a conta, você concorda com nossos <br />
        <strong>Termos de uso</strong> e <strong>Política de Privacidade</strong>
      </span>
    </form>
  )
}